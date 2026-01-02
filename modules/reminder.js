/**
 * Reminder Module - Better Sleep
 * Handles bedtime reminder notifications
 */

const Reminder = {
  ALARM_NAME: 'bedtimeReminder',
  SKIP_ALARM_NAME: 'skipReminder',

  /**
   * Schedule a bedtime reminder
   */
  async scheduleReminder() {
    const schedule = await Storage.getEffectiveSchedule();
    const reminderState = await Storage.get('reminderState');
    
    if (!reminderState.enabled || !schedule.bedtime) {
      await this.clearReminder();
      return;
    }

    // Calculate when to fire the alarm
    const [hours, minutes] = schedule.bedtime.split(':').map(Number);
    const graceMinutes = schedule.graceMinutes || 15;
    
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes + graceMinutes, 0, 0);
    
    // If the time has already passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    // Clear any existing alarm
    await chrome.alarms.clear(this.ALARM_NAME);
    
    // Schedule new alarm
    await chrome.alarms.create(this.ALARM_NAME, {
      when: reminderTime.getTime()
    });

    console.log('Bedtime reminder scheduled for:', reminderTime.toLocaleString());
  },

  /**
   * Clear the bedtime reminder
   */
  async clearReminder() {
    await chrome.alarms.clear(this.ALARM_NAME);
    await chrome.alarms.clear(this.SKIP_ALARM_NAME);
  },

  /**
   * Show the bedtime notification
   */
  async showNotification() {
    const schedule = await Storage.getEffectiveSchedule();
    
    await chrome.notifications.create('bedtimeReminder', {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Time for bed',
      message: `It's past your bedtime (${schedule.bedtime}). Ready to sleep?`,
      buttons: [
        { title: 'Going to sleep' },
        { title: 'Skip 15 min' }
      ],
      requireInteraction: true,
      silent: false
    });
  },

  /**
   * Handle skip action
   */
  async handleSkip() {
    const now = new Date();
    const skipUntil = new Date(now.getTime() + 15 * 60 * 1000);
    
    await Storage.updateReminderState({
      lastSkipped: now.toISOString(),
      skipUntil: skipUntil.toISOString()
    });

    // Set badge
    await this.updateBadge();

    // Schedule next reminder in 15 minutes
    await chrome.alarms.create(this.SKIP_ALARM_NAME, {
      when: skipUntil.getTime()
    });
  },

  /**
   * Handle going to sleep action
   */
  async handleGoingToSleep() {
    await Storage.startSleep();
    await this.clearBadge();
    await Storage.updateReminderState({
      lastSkipped: null,
      skipUntil: null
    });
  },

  /**
   * Update badge to show time past bedtime
   */
  async updateBadge() {
    const schedule = await Storage.getEffectiveSchedule();
    const reminderState = await Storage.get('reminderState');
    
    if (!reminderState.lastSkipped) {
      await this.clearBadge();
      return;
    }

    const [hours, minutes] = schedule.bedtime.split(':').map(Number);
    const bedtime = new Date();
    bedtime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    
    // If bedtime was yesterday (it's now past midnight)
    if (now.getHours() < hours) {
      bedtime.setDate(bedtime.getDate() - 1);
    }
    
    const minutesPast = Math.floor((now - bedtime) / (1000 * 60));
    
    if (minutesPast > 0) {
      await chrome.action.setBadgeText({ text: `${minutesPast}m` });
      await chrome.action.setBadgeBackgroundColor({ color: '#5eead4' });
      await chrome.action.setTitle({ title: `Past bedtime by ${minutesPast} min` });
    }
  },

  /**
   * Clear the badge
   */
  async clearBadge() {
    await chrome.action.setBadgeText({ text: '' });
    await chrome.action.setTitle({ title: 'Better Sleep' });
  },

  /**
   * Check if should show notification based on idle state
   */
  async shouldShowNotification() {
    return new Promise((resolve) => {
      chrome.idle.queryState(60, (state) => {
        // Only show if user is active
        resolve(state === 'active');
      });
    });
  },

  /**
   * Check and clear badge if new day or user idle
   */
  async checkBadgeClear() {
    const reminderState = await Storage.get('reminderState');
    
    if (!reminderState.lastSkipped) return;

    const lastSkipped = new Date(reminderState.lastSkipped);
    const now = new Date();
    
    // Clear if it's a new day
    if (lastSkipped.toDateString() !== now.toDateString()) {
      await Storage.updateReminderState({
        lastSkipped: null,
        skipUntil: null
      });
      await this.clearBadge();
    }
  }
};
