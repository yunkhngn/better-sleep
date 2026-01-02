/**
 * Background Service Worker - Better Sleep
 * Handles alarms, notifications, and badge updates
 */

// Import modules (service worker context)
importScripts(
  'modules/storage.js',
  'modules/planner.js',
  'modules/reminder.js',
  'modules/summary.js',
  'modules/tips.js'
);

/**
 * Initialize on install/update
 */
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Better Sleep extension installed/updated');
  
  // Set default badge
  await chrome.action.setBadgeText({ text: '' });
  await chrome.action.setTitle({ title: 'Better Sleep' });
  
  // Schedule reminder if enabled
  await Reminder.scheduleReminder();
});

/**
 * Handle alarms
 */
chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('Alarm fired:', alarm.name);
  
  if (alarm.name === Reminder.ALARM_NAME || alarm.name === Reminder.SKIP_ALARM_NAME) {
    // Check if user is active
    const shouldShow = await Reminder.shouldShowNotification();
    
    if (shouldShow) {
      // Check if user is not currently sleeping
      const isSleeping = await Storage.isSleeping();
      
      if (!isSleeping) {
        await Reminder.showNotification();
      }
    }
    
    // Reschedule for next day if it was the main alarm
    if (alarm.name === Reminder.ALARM_NAME) {
      await Reminder.scheduleReminder();
    }
  }
});

/**
 * Handle notification button clicks
 */
chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (notificationId === 'bedtimeReminder') {
    if (buttonIndex === 0) {
      // "Going to sleep"
      await Reminder.handleGoingToSleep();
      await chrome.notifications.clear(notificationId);
    } else if (buttonIndex === 1) {
      // "Skip 15 min"
      await Reminder.handleSkip();
      await chrome.notifications.clear(notificationId);
    }
  }
});

/**
 * Handle notification clicks
 */
chrome.notifications.onClicked.addListener(async (notificationId) => {
  if (notificationId === 'bedtimeReminder') {
    // Open popup
    await chrome.action.openPopup();
  }
});

/**
 * Handle messages from popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message).then(sendResponse);
  return true; // Keep channel open for async response
});

async function handleMessage(message) {
  switch (message.action) {
    case 'sleepStarted':
      await Reminder.clearBadge();
      await Storage.updateReminderState({
        lastSkipped: null,
        skipUntil: null
      });
      return { success: true };
      
    case 'settingsUpdated':
      await Reminder.scheduleReminder();
      return { success: true };
      
    case 'getBadgeInfo':
      const reminderState = await Storage.get('reminderState');
      return { reminderState };
      
    default:
      return { success: false, error: 'Unknown action' };
  }
}

/**
 * Handle idle state changes
 */
chrome.idle.onStateChanged.addListener(async (newState) => {
  console.log('Idle state changed:', newState);
  
  if (newState === 'idle' || newState === 'locked') {
    // Clear badge after extended idle (user might be sleeping)
    const reminderState = await Storage.get('reminderState');
    
    if (reminderState.lastSkipped) {
      // Clear if idle for more than 30 minutes (assumed sleeping)
      setTimeout(async () => {
        const currentState = await new Promise(resolve => {
          chrome.idle.queryState(60, resolve);
        });
        
        if (currentState !== 'active') {
          await Reminder.clearBadge();
          await Storage.updateReminderState({
            lastSkipped: null,
            skipUntil: null
          });
        }
      }, 30 * 60 * 1000);
    }
  }
  
  if (newState === 'active') {
    // Check if badge should be cleared (new day)
    await Reminder.checkBadgeClear();
  }
});

/**
 * Periodic badge update (every minute)
 */
chrome.alarms.create('updateBadge', {
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'updateBadge') {
    const reminderState = await Storage.get('reminderState');
    
    if (reminderState.lastSkipped) {
      await Reminder.updateBadge();
    }
    
    // Also check for new day
    await Reminder.checkBadgeClear();
  }
});

console.log('Better Sleep background service worker loaded');
