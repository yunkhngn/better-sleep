/**
 * Storage Module - Better Sleep
 * Handles all local storage operations
 */

const Storage = {
  // Default data structure
  defaults: {
    sleepLogs: [],
    defaultSchedule: {
      bedtime: '22:30',
      wakeTime: '07:00',
      sleepLatency: 15,
      graceMinutes: 15
    },
    temporaryOverride: null,
    reminderState: {
      enabled: false,
      lastSkipped: null,
      skipUntil: null
    },
    lastTipDate: null,
    currentSleepSession: null,
    userName: null,
    language: 'en'
  },

  /**
   * Get all data from storage
   */
  async getAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.defaults, (data) => {
        resolve(data);
      });
    });
  },

  /**
   * Get specific key from storage
   */
  async get(key) {
    const data = await this.getAll();
    return data[key];
  },

  /**
   * Set data in storage
   */
  async set(data) {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, resolve);
    });
  },

  /**
   * Start a sleep session
   */
  async startSleep() {
    const now = new Date().toISOString();
    await this.set({
      currentSleepSession: {
        sleepTime: now,
        wakeTime: null,
        mood: null
      }
    });
    return now;
  },

  /**
   * End a sleep session and log it
   */
  async endSleep(mood = null) {
    const session = await this.get('currentSleepSession');
    if (!session || !session.sleepTime) {
      return null;
    }

    const now = new Date().toISOString();
    const logs = await this.get('sleepLogs') || [];
    
    const logEntry = {
      date: new Date().toISOString().split('T')[0],
      sleepTime: session.sleepTime,
      wakeTime: now,
      mood: mood
    };

    logs.push(logEntry);
    
    // Keep only last 30 days of logs
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const filteredLogs = logs.filter(log => new Date(log.date) >= thirtyDaysAgo);

    await this.set({
      sleepLogs: filteredLogs,
      currentSleepSession: null
    });

    return logEntry;
  },

  /**
   * Get sleep logs for a date range
   */
  async getLogsForRange(startDate, endDate) {
    const logs = await this.get('sleepLogs') || [];
    return logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
  },

  /**
   * Get last 7 days of logs
   */
  async getWeeklyLogs() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    return this.getLogsForRange(startDate, endDate);
  },

  /**
   * Get the most recent log
   */
  async getLastLog() {
    const logs = await this.get('sleepLogs') || [];
    return logs.length > 0 ? logs[logs.length - 1] : null;
  },

  /**
   * Update schedule settings
   */
  async updateSchedule(schedule, scope = 'everyday') {
    if (scope === 'everyday') {
      const current = await this.get('defaultSchedule');
      await this.set({
        defaultSchedule: { ...current, ...schedule },
        temporaryOverride: null
      });
    } else {
      // Tomorrow only
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await this.set({
        temporaryOverride: {
          date: tomorrow.toISOString().split('T')[0],
          ...schedule
        }
      });
    }
  },

  /**
   * Get effective schedule for today
   */
  async getEffectiveSchedule() {
    const defaultSchedule = await this.get('defaultSchedule');
    const override = await this.get('temporaryOverride');
    
    if (override) {
      const today = new Date().toISOString().split('T')[0];
      if (override.date === today) {
        return { ...defaultSchedule, ...override };
      } else if (override.date < today) {
        // Clear expired override
        await this.set({ temporaryOverride: null });
      }
    }
    
    return defaultSchedule;
  },

  /**
   * Update reminder state
   */
  async updateReminderState(state) {
    const current = await this.get('reminderState');
    await this.set({
      reminderState: { ...current, ...state }
    });
  },

  /**
   * Check if user is currently sleeping
   */
  async isSleeping() {
    const session = await this.get('currentSleepSession');
    return session && session.sleepTime && !session.wakeTime;
  },

  /**
   * Record tip shown today
   */
  async recordTipShown() {
    const today = new Date().toISOString().split('T')[0];
    await this.set({ lastTipDate: today });
  },

  /**
   * Check if tip was shown today
   */
  async wasTipShownToday() {
    const lastTipDate = await this.get('lastTipDate');
    const today = new Date().toISOString().split('T')[0];
    return lastTipDate === today;
  },

  /**
   * Clear all data and reset to defaults
   */
  async clearAll() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        chrome.storage.local.set(this.defaults, resolve);
      });
    });
  }
};
