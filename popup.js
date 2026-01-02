/**
 * Popup Script - Better Sleep
 * Main UI controller for the extension popup
 */

// DOM Elements
let elements = {};

// Current state
let state = {
  isSleeping: false,
  isNightMode: false,
  currentView: 'main',
  plannerMode: 'wake',
  settingsTab: 'reminder',
  scheduleScope: 'everyday',
  userName: null,
  currentLang: 'en'
};

/**
 * Initialize the popup
 */
async function init() {
  cacheElements();
  await loadState();
  await i18n.loadLanguage();
  state.currentLang = i18n.currentLang;
  
  // Check if user name is set
  const userName = await Storage.get('userName');
  if (!userName) {
    showNameModal();
    return; // Wait for name input before continuing
  }
  state.userName = userName;
  
  continueInit();
}

/**
 * Continue initialization after name is set
 */
async function continueInit() {
  setupEventListeners();
  startClock();
  updateTimeOfDay();
  updateGreeting();
  await updateUI();
  await loadSettings();
  await showTipIfAvailable();
  await checkBedtimeReminder();
  generateStars();
  updateLanguageUI();
  updateAllText();
}

/**
 * Cache DOM elements
 */
function cacheElements() {
  elements = {
    // Panels
    // Containers
    mainContainer: document.getElementById('app'),
    dayPanel: document.getElementById('dayPanel'),
    nightPanel: document.getElementById('nightPanel'),
    actionPanel: document.getElementById('actionPanel'),
    
    // Time displays
    currentTime: document.getElementById('currentTime'),
    dateText: document.getElementById('dateText'),
    alarmTime: document.getElementById('alarmTime'),
    
    // Primary action
    primaryAction: document.getElementById('primaryAction'),
    primaryActionText: document.getElementById('primaryActionText'),
    primaryActionIcon: document.getElementById('primaryActionIcon'),
    
    // Quick actions
    openPlanner: document.getElementById('openPlanner'),
    openSettings: document.getElementById('openSettings'),
    openSummary: document.getElementById('openSummary'),
    
    // Mood selector
    moodSelector: document.getElementById('moodSelector'),
    moodBtns: document.querySelectorAll('.mood-btn'),
    
    // Views
    plannerView: document.getElementById('plannerView'),
    settingsView: document.getElementById('settingsView'),
    summaryView: document.getElementById('summaryView'),
    closePlanner: document.getElementById('closePlanner'),
    closeSettings: document.getElementById('closeSettings'),
    closeSummary: document.getElementById('closeSummary'),
    backToHome: document.getElementById('backToHome'),
    
    // Planner
    plannerTabs: document.querySelectorAll('.planner-tab'),
    plannerInputLabel: document.getElementById('plannerInputLabel'),
    plannerHour: document.getElementById('plannerHour'),
    plannerMinute: document.getElementById('plannerMinute'),
    latencyInput: document.getElementById('latencyInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    
    // Settings tabs
    navTabs: document.querySelectorAll('.nav-tab'),
    reminderTab: document.getElementById('reminderTab'),
    weeklyTab: document.getElementById('weeklyTab'),
    
    // Settings controls
    reminderEnabled: document.getElementById('reminderEnabled'),
    reminderSettings: document.getElementById('reminderSettings'),
    targetBedtime: document.getElementById('targetBedtime'),
    graceMinutes: document.getElementById('graceMinutes'),
    scopeBtns: document.querySelectorAll('.scope-btn'),
    saveSettings: document.getElementById('saveSettings'),
    deleteAllData: document.getElementById('deleteAllData'),
    
    // Personalization
    changeNameRow: document.getElementById('changeNameRow'),
    currentNameDisplay: document.getElementById('currentNameDisplay'),
    
    // Summary
    cycleCount: document.getElementById('cycleCount'),
    cycleProgress: document.getElementById('cycleProgress'),
    sleepDuration: document.getElementById('sleepDuration'),
    sleepTimeValue: document.getElementById('sleepTimeValue'),
    wakeTimeValue: document.getElementById('wakeTimeValue'),
    insightText: document.getElementById('insightText'),
    summaryInsight: document.getElementById('summaryInsight'),
    seeGraphLink: document.getElementById('seeGraphLink'),
    
    // Weekly chart
    weeklyChart: document.getElementById('weeklyChart'),
    chartTooltip: document.getElementById('chartTooltip'),
    
    // Tip
    tipBanner: document.getElementById('tipBanner'),
    tipText: document.getElementById('tipText'),
    
    // Reminder banner
    reminderBanner: document.getElementById('reminderBanner'),
    reminderTitle: document.querySelector('.reminder-title'),
    reminderTime: document.getElementById('reminderTime'),
    
    // Name modal
    nameModal: document.getElementById('nameModal'),
    nameInput: document.getElementById('nameInput'),
    nameSubmit: document.getElementById('nameSubmit'),
    changeNameBtn: document.getElementById('changeNameBtn'),
    currentNameDisplay: document.getElementById('currentNameDisplay'),
    
    // Celestial icons
    celestialDisplay: document.getElementById('celestialDisplay'),
    sunriseIcon: document.getElementById('sunriseIcon'),
    noonIcon: document.getElementById('noonIcon'),
    sunsetIcon: document.getElementById('sunsetIcon'),
    moonNightIcon: document.getElementById('moonNightIcon'),

    // Language buttons
    langBtns: document.querySelectorAll('.lang-btn'),
    
    // Greeting elements
    greetingText: document.querySelector('.greeting-text'),
    
    // Stars container
    starsContainer: document.getElementById('starsContainer')
  };
}

/**
 * Generate stars for night mode
 */
function generateStars() {
  if (!elements.starsContainer) return;
  
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    elements.starsContainer.appendChild(star);
  }
}

/**
 * Load current state from storage
 */
async function loadState() {
  state.isSleeping = await Storage.isSleeping();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Primary action button
  elements.primaryAction.addEventListener('click', handlePrimaryAction);
  
  // Mood buttons
  elements.moodBtns.forEach(btn => {
    btn.addEventListener('click', () => handleMoodSelect(btn.dataset.mood));
  });
  
  // View navigation
  elements.openPlanner.addEventListener('click', () => showView('planner'));
  elements.openSettings.addEventListener('click', () => showView('settings'));
  elements.openSummary.addEventListener('click', () => showView('summary'));
  elements.closePlanner.addEventListener('click', () => hideAllViews());
  elements.closeSettings.addEventListener('click', () => hideAllViews());
  elements.closeSummary.addEventListener('click', () => hideAllViews());
  elements.backToHome.addEventListener('click', () => hideAllViews());
  
  // See Graph link
  elements.seeGraphLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllViews();
    showView('settings');
    switchSettingsTab('weekly');
  });
  
  // Planner tabs
  elements.plannerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchPlannerMode(tab.dataset.mode);
    });
  });
  
  // Planner Time Picker
  if (elements.plannerHour && elements.plannerMinute) {
    populateTimeSelects();
    elements.plannerHour.addEventListener('change', updateSuggestions);
    elements.plannerMinute.addEventListener('change', updateSuggestions);
  }
  
  // Suggestions interaction
  elements.suggestionsList.addEventListener('click', handleSuggestionClick);
  
  // Settings tabs
  elements.navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchSettingsTab(tab.dataset.tab));
  });
  
  // Reminder toggle
  elements.reminderEnabled.addEventListener('change', toggleReminderSettings);
  
  // Scope buttons
  elements.scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.scopeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.scheduleScope = btn.dataset.scope;
      loadSettings(); // Reload settings when scope changes
    });
  });
  
  // Language buttons
  elements.langBtns.forEach(btn => {
    btn.addEventListener('click', () => handleLanguageChange(btn.dataset.lang));
  });
  
  // Save settings
  elements.saveSettings.addEventListener('click', saveSettings);
  
  // Delete all data
  elements.deleteAllData.addEventListener('click', handleDeleteAllData);

  // Change Name
  // Change Name
  if (elements.changeNameRow) {
    elements.changeNameRow.addEventListener('click', showNameModal);
  }
}

/**
 * Start the clock
 */
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Update the clock display
 */
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  if (elements.currentTime) {
    elements.currentTime.textContent = `${hours}:${minutes}`;
  }
  
  // Update date text
  if (elements.dateText) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // Map internal lang code to locale string
    const locales = {
      en: 'en-US',
      vi: 'vi-VN',
      jp: 'ja-JP'
    };
    const locale = locales[state.currentLang] || 'en-US';
    elements.dateText.textContent = now.toLocaleDateString(locale, options);
  }
}

/**
 * Update time of day (day/night mode)
 */
/**
 * Update time of day (day/night mode and celestial icons)
 */
function updateTimeOfDay() {
  const hour = new Date().getHours();
  // Night: 20-5, Sunrise: 5-11, Noon: 11-14, Sunset: 14-20
  const isNight = hour >= 20 || hour < 5;
  const isSunrise = hour >= 5 && hour < 11;
  const isNoon = hour >= 11 && hour < 14;
  const isSunset = hour >= 14 && hour < 20;
  
  state.isNightMode = isNight;
  
  // Toggle panels
  if (isNight) {
    elements.dayPanel.classList.add('hidden');
    elements.nightPanel.classList.remove('hidden');
    elements.actionPanel.classList.add('light-mode');
  } else {
    elements.dayPanel.classList.remove('hidden');
    elements.nightPanel.classList.add('hidden');
    elements.actionPanel.classList.remove('light-mode');
  }
  
  // Toggle celestial icons
  if (elements.sunriseIcon) {
    elements.sunriseIcon.classList.toggle('hidden', !isSunrise);
    elements.noonIcon.classList.toggle('hidden', !isNoon);
    elements.sunsetIcon.classList.toggle('hidden', !isSunset);
    elements.moonNightIcon.classList.toggle('hidden', !isNight);
  }
}

/**
 * Update UI based on current state
 */
async function updateUI() {
  const moonSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const sunSVG = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>';
  
  if (!state.isSleeping) {
    elements.primaryActionText.dataset.i18n = 'goingToSleep';
    elements.primaryActionText.textContent = i18n.t('goingToSleep');
    elements.primaryActionIcon.innerHTML = moonSVG;
    
    // Update main container class
    elements.mainContainer.classList.remove('sleeping-mode');
  } else {
    elements.primaryActionText.dataset.i18n = 'imAwake';
    elements.primaryActionText.textContent = i18n.t('imAwake');
    elements.primaryActionIcon.innerHTML = sunSVG;
    
    // Update main container class
    elements.mainContainer.classList.add('sleeping-mode');
  }
  
  // Update alarm time from schedule
  const schedule = await Storage.getEffectiveSchedule();
  if (elements.alarmTime && schedule.wakeTime) {
    elements.alarmTime.textContent = schedule.wakeTime;
  }
}

/**
 * Handle primary action button click
 */
async function handlePrimaryAction() {
  if (state.isSleeping) {
    // Show mood selector
    elements.moodSelector.classList.remove('hidden');
    elements.actionPanel.classList.add('hidden');
  } else {
    // Start sleep
    await Storage.startSleep();
    state.isSleeping = true;
    await updateUI();
    
    // Switch to night mode
    elements.dayPanel.classList.add('hidden');
    elements.nightPanel.classList.remove('hidden');
    
    // Hide reminder banner
    elements.reminderBanner.classList.add('hidden');
    
    // Notify background to clear badge
    try {
      chrome.runtime.sendMessage({ action: 'sleepStarted' });
    } catch (e) {
      console.log('Running outside extension context');
    }
  }
}

/**
 * Handle mood selection
 */
async function handleMoodSelect(mood) {
  // Visual feedback
  elements.moodBtns.forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
  
  // Save sleep log with mood
  const logEntry = await Storage.endSleep(mood);
  state.isSleeping = false;
  
  // Hide mood selector
  setTimeout(() => {
    elements.moodSelector.classList.add('hidden');
    elements.actionPanel.classList.remove('hidden');
    elements.moodBtns.forEach(btn => btn.classList.remove('selected'));
  }, 300);
  
  await updateUI();
  updateTimeOfDay();
  
  // Show summary if we have data
  if (logEntry) {
    showView('summary');
    loadSummaryData(logEntry);
  }
}

/**
 * Show a view
 */
function showView(view) {
  hideAllViews();
  
  // Hide main panels
  elements.dayPanel.classList.add('hidden');
  elements.nightPanel.classList.add('hidden');
  elements.actionPanel.classList.add('hidden');
  elements.moodSelector.classList.add('hidden');
  
  if (view === 'planner') {
    elements.plannerView.classList.add('active');
    updateSuggestions();
  } else if (view === 'settings') {
    elements.settingsView.classList.add('active');
    if (state.settingsTab === 'weekly') {
      initChart();
    }
  } else if (view === 'summary') {
    elements.summaryView.classList.add('active');
    loadSummary();
  }
  
  state.currentView = view;
}

/**
 * Hide all views
 */
function hideAllViews() {
  elements.plannerView.classList.remove('active');
  elements.settingsView.classList.remove('active');
  elements.summaryView.classList.remove('active');
  
  // Show main panels
  if (state.isNightMode || state.isSleeping) {
    elements.nightPanel.classList.remove('hidden');
    elements.dayPanel.classList.add('hidden');
  } else {
    elements.dayPanel.classList.remove('hidden');
    elements.nightPanel.classList.add('hidden');
  }
  elements.actionPanel.classList.remove('hidden');
  
  state.currentView = 'main';
}

/**
 * Switch planner mode
 */
function switchPlannerMode(mode) {
  state.plannerMode = mode;
  
  elements.plannerTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });
  
  elements.plannerInputLabel.dataset.i18n = mode === 'wake' 
    ? 'targetWakeTime' 
    : 'targetSleepTime';
    
  elements.plannerInputLabel.textContent = i18n.t(elements.plannerInputLabel.dataset.i18n);
  
  updateSuggestions();
}

/**
 * Populate hour and minute select elements
 */
function populateTimeSelects() {
  for (let i = 0; i < 24; i++) {
    const option = document.createElement('option');
    option.value = String(i).padStart(2, '0');
    option.textContent = String(i).padStart(2, '0');
    elements.plannerHour.appendChild(option);
  }
  for (let i = 0; i < 60; i += 5) { // Increment by 5 minutes
    const option = document.createElement('option');
    option.value = String(i).padStart(2, '0');
    option.textContent = String(i).padStart(2, '0');
    elements.plannerMinute.appendChild(option);
  }

  // Set default to current time
  const now = new Date();
  elements.plannerHour.value = String(now.getHours()).padStart(2, '0');
  elements.plannerMinute.value = String(Math.round(now.getMinutes() / 5) * 5).padStart(2, '0');
}

/**
 * Update suggestions based on input
 */
async function updateSuggestions() {
  const schedule = await Storage.getEffectiveSchedule();
  const mode = state.plannerMode;
  const hour = elements.plannerHour.value;
  const minute = elements.plannerMinute.value;
  const time = `${hour}:${minute}`;
  
  const suggestions = Planner.calculateSuggestions(time, mode, schedule.sleepLatency);
  
  // Clear list
  elements.suggestionsList.innerHTML = '';
  
  if (!suggestions || suggestions.length === 0) return;

  elements.suggestionsList.innerHTML = suggestions.map(s => `
    <div class="suggestion-item" data-time="${s.time}" data-wake="${time}">
      <span class="suggestion-time">${s.time}</span>
      <span class="suggestion-cycles">${s.cycles} cycles<br>${s.duration}</span>
    </div>
  `).join('');
  // Add click handlers for suggestions
  elements.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => handleSuggestionClick(item));
  });
}

/**
 * Handle clicking on a suggested time
 */
async function handleSuggestionClick(item) {
  const sleepTime = item.dataset.time;
  const wakeTime = item.dataset.wake;
  
  // First click - show confirmation
  if (!item.dataset.confirm) {
    item.dataset.confirm = 'true';
    item.classList.add('confirming');
    item.querySelector('.suggestion-cycles').innerHTML = i18n.t('clickToSetBedtime').replace('\n', '<br>');
    
    // Reset after 3 seconds
    setTimeout(() => {
      if (item.dataset.confirm) {
        delete item.dataset.confirm;
        item.classList.remove('confirming');
        updateSuggestions(); // Refresh to reset text
      }
    }, 3000);
    return;
  }
  
  // Second click - set reminder
  delete item.dataset.confirm;
  
  // Update schedule with sleep time as bedtime and wake time
  await Storage.updateSchedule({
    bedtime: sleepTime,
    wakeTime: wakeTime,
    graceMinutes: 15
  }, 'everyday');
  
  // Enable reminder
  await Storage.updateReminderState({ enabled: true });
  
  // Visual feedback
  item.classList.remove('confirming');
  item.classList.add('confirmed');
  item.querySelector('.suggestion-cycles').textContent = i18n.t('reminderSet');
  
  // Go to settings view to show updated values
  setTimeout(async () => {
    showView('settings');
    await loadSettings(); // Reload settings to show new values
  }, 1000);
}

/**
 * Switch settings tab
 */
function switchSettingsTab(tab) {
  state.settingsTab = tab;
  
  elements.navTabs.forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  
  // Show/hide tab content
  document.querySelectorAll('.settings-tab').forEach(t => {
    t.classList.remove('active');
  });
  
  if (tab === 'reminder') {
    elements.reminderTab.classList.add('active');
  } else if (tab === 'weekly') {
    elements.weeklyTab.classList.add('active');
    initChart();
  }
}

/**
 * Toggle reminder settings visibility
 */
function toggleReminderSettings() {
  const enabled = elements.reminderEnabled.checked;
  elements.reminderSettings.style.opacity = enabled ? '1' : '0.5';
  elements.reminderSettings.style.pointerEvents = enabled ? 'auto' : 'none';
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  // Load based on current scope to show what user is editing
  const defaultSchedule = await Storage.get('defaultSchedule') || Storage.defaults.defaultSchedule;
  let scheduleToDisplay = defaultSchedule;
  
  if (state.scheduleScope === 'tomorrow') {
    const override = await Storage.get('temporaryOverride');
    // Use override if valid for tomorrow (or future)
    if (override) {
      scheduleToDisplay = { ...defaultSchedule, ...override };
    }
  }

  const reminderState = await Storage.get('reminderState') || Storage.defaults.reminderState;
  
  elements.reminderEnabled.checked = reminderState.enabled || false;
  elements.targetBedtime.value = scheduleToDisplay.bedtime || '22:30';
  elements.graceMinutes.value = scheduleToDisplay.graceMinutes || 15;
  elements.latencyInput.value = scheduleToDisplay.sleepLatency || 15;
  
  if (elements.currentNameDisplay) {
    elements.currentNameDisplay.textContent = state.userName || i18n.t('defaultName');
  }

  toggleReminderSettings();
}

/**
 * Save settings
 */
async function saveSettings() {
  const schedule = {
    bedtime: elements.targetBedtime.value,
    graceMinutes: parseInt(elements.graceMinutes.value) || 15,
    sleepLatency: parseInt(elements.latencyInput.value) || 15
  };
  
  await Storage.updateSchedule(schedule, state.scheduleScope);
  await Storage.updateReminderState({
    enabled: elements.reminderEnabled.checked
  });
  
  // Recheck reminder to update badge
  await checkBedtimeReminder();
  
  // Notify background to update alarms
  try {
    chrome.runtime.sendMessage({ action: 'settingsUpdated' });
  } catch (e) {
    console.log('Running outside extension context');
  }
  
  // Visual feedback
  const btn = elements.saveSettings;
  const originalText = i18n.t('saveSettings'); // Use key to get current language text
  btn.textContent = i18n.t('saved'); // Saved!
  btn.style.background = 'var(--accent-teal)';
  
  // Reload settings to confirm persistence
  await loadSettings();
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 1500);
}

/**
 * Load summary data
 */
async function loadSummary() {
  const lastLog = await Storage.getLastLog();
  
  if (lastLog) {
    loadSummaryData(lastLog);
  } else {
    elements.cycleCount.textContent = '-';
    elements.sleepDuration.textContent = i18n.t('noData');
    elements.sleepTimeValue.textContent = '--:--';
    elements.wakeTimeValue.textContent = '--:--';
    elements.summaryInsight.classList.add('hidden');
  }
}

/**
 * Load summary data from a log entry
 */
function loadSummaryData(logEntry) {
  const summary = Summary.generateSummary(logEntry);
  
  if (summary) {
    elements.cycleCount.textContent = summary.completeCycles;
    elements.sleepDuration.textContent = summary.duration;
    elements.sleepTimeValue.textContent = summary.sleepTime;
    elements.wakeTimeValue.textContent = summary.wakeTime;
    
    // Update circle progress
    const cycles = Math.min(summary.completeCycles, 6);
    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (cycles / 6) * circumference;
    elements.cycleProgress.style.strokeDashoffset = offset;
    
    // Update insight
    if (summary.insight) {
      elements.insightText.textContent = summary.insight;
      elements.summaryInsight.classList.remove('hidden');
    } else {
      elements.summaryInsight.classList.add('hidden');
    }
  }
}

/**
 * Initialize weekly chart
 */
function initChart() {
  Chart.init('weeklyChart', 'chartTooltip');
  Chart.render();
}

/**
 * Show tip if available
 */
async function showTipIfAvailable() {
  const tip = await Tips.getTodaysTip();
  
  if (tip) {
    elements.tipText.textContent = tip;
    elements.tipBanner.classList.remove('hidden');
  }
}

/**
 * Clear badge from extension icon
 */
function clearBadge() {
  try {
    chrome.action.setBadgeText({ text: '' });
  } catch (e) {
    // Running outside extension context
  }
}

/**
 * Check if past bedtime and show reminder banner
 */
async function checkBedtimeReminder() {
  // Skip if already sleeping
  if (state.isSleeping) {
    elements.reminderBanner.classList.add('hidden');
    clearBadge();
    return;
  }
  
  const reminderState = await Storage.get('reminderState');
  if (!reminderState?.enabled) {
    elements.reminderBanner.classList.add('hidden');
    clearBadge();
    return;
  }
  
  const schedule = await Storage.getEffectiveSchedule();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Parse bedtime
  const [bedHour, bedMin] = schedule.bedtime.split(':').map(Number);
  const bedtimeMinutes = bedHour * 60 + bedMin;
  const graceMinutes = schedule.graceMinutes || 15;
  const reminderMinutes = bedtimeMinutes + graceMinutes;
  
  // Parse wake time
  const [wakeHour, wakeMin] = (schedule.wakeTime || '07:00').split(':').map(Number);
  const wakeMinutes = wakeHour * 60 + wakeMin;
  
  // Check if current time is past bedtime+grace but before wake time
  let isPastBedtime = false;
  let minutesPast = 0;
  
  // Handle overnight (bedtime after midnight scenarios)
  if (bedtimeMinutes < wakeMinutes) {
    // Normal case: bedtime < wake time (e.g., 22:30 to 07:00)
    isPastBedtime = currentMinutes >= reminderMinutes && currentMinutes < wakeMinutes;
    minutesPast = currentMinutes - reminderMinutes;
  } else {
    // bedtime after wake time means overnight
    isPastBedtime = currentMinutes >= reminderMinutes || currentMinutes < wakeMinutes;
    if (currentMinutes >= reminderMinutes) {
      minutesPast = currentMinutes - reminderMinutes;
    } else {
      minutesPast = (24 * 60 - reminderMinutes) + currentMinutes;
    }
  }
  
  if (isPastBedtime && minutesPast >= 0) {
    // Show reminder
    elements.reminderBanner.classList.remove('hidden');
    
    // Update time text
    // Update time text
    const name = state.userName || i18n.t('friend');
    if (elements.reminderTitle) {
      elements.reminderTitle.textContent = i18n.t('timeToSleep', { name });
    }

    if (minutesPast < 60) {
      elements.reminderTime.textContent = i18n.t('pastBedtimeBy', { time: `${minutesPast} min` });
    } else {
      const hours = Math.floor(minutesPast / 60);
      const mins = minutesPast % 60;
      elements.reminderTime.textContent = i18n.t('pastBedtimeBy', { time: `${hours}h ${mins}m` });
    }
    
    // Set badge on extension icon
    try {
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' });
    } catch (e) {
      console.log('Running outside extension context');
    }
  } else {
    elements.reminderBanner.classList.add('hidden');
    clearBadge();
  }
}

/**
 * Handle delete all data
 */
async function handleDeleteAllData() {
  const btn = elements.deleteAllData;
  
  // First click - show confirmation
    if (!btn.dataset.confirm) {
    btn.dataset.confirm = 'true';
    btn.textContent = i18n.t('clickToConfirm');
    btn.style.background = '#fef2f2';
    btn.style.borderColor = '#dc2626';
    
    // Reset after 3 seconds
    setTimeout(() => {
      if (btn.dataset.confirm) {
        delete btn.dataset.confirm;
        btn.textContent = i18n.t('deleteButton');
        btn.style.background = '';
        btn.style.borderColor = '';
      }
    }, 3000);
    return;
  }
  
  // Second click - delete
  delete btn.dataset.confirm;
  
  try {
    await Storage.clearAll();
    
    // Visual feedback
    btn.textContent = i18n.t('dataDeleted');
    btn.style.color = 'var(--accent-teal)';
    btn.style.borderColor = 'var(--accent-teal)';
    btn.style.background = '';
    
    // Reset state
    state.isSleeping = false;
    await updateUI();
    await loadSettings();
    
    setTimeout(() => {
      btn.textContent = i18n.t('deleteButton');
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  } catch (e) {
    console.log('Running outside extension context');
    btn.textContent = 'Delete All Data';
    btn.style.background = '';
    btn.style.borderColor = '';
  }
}

/**
 * Show name input modal
 */
function showNameModal() {
  elements.nameModal.classList.remove('hidden');
  elements.nameInput.focus();
  
  // Handle submit
  elements.nameSubmit.addEventListener('click', handleNameSubmit);
  elements.nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleNameSubmit();
  });
}

/**
 * Handle name submission
 */
async function handleNameSubmit() {
  const name = elements.nameInput.value.trim();
  if (name) {
    await Storage.set({ userName: name });
    
    // Hide modal
    elements.nameModal.classList.add('hidden');
    
    // Update state and UI
    state.userName = name;
    updateGreeting();
    await updateUI(); // Update dynamic elements
    
    // Update settings display if visible
    if (elements.currentNameDisplay) {
      elements.currentNameDisplay.textContent = name;
    }
    
    // Continue init if first run
    if (!state.userName) { // This condition seems to be intended for a first-run check, but `state.userName` is set above.
      continueInit();
    }
  } else {
    elements.nameInput.focus();
    elements.nameInput.style.borderColor = '#dc2626';
    setTimeout(() => {
      elements.nameInput.style.borderColor = '';
    }, 1000);
  }
}

/**
 * Update greeting with user's name
 */
function updateGreeting() {
  if (!elements.greetingText) return;
  
  const hour = new Date().getHours();
  const name = state.userName || i18n.t('defaultName');
  
  let greetingKey;
  if (hour >= 5 && hour < 12) {
    greetingKey = 'greetingMorning';
  } else if (hour >= 12 && hour < 17) {
    greetingKey = 'greetingAfternoon';
  } else if (hour >= 17 && hour < 21) {
    greetingKey = 'greetingEvening';
  } else {
    greetingKey = 'greetingNight';
  }
  
  elements.greetingText.textContent = i18n.t(greetingKey, { name });
}

/**
 * Update language UI (button states)
 */
function updateLanguageUI() {
  elements.langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
  });
}

/**
 * Handle language change
 */
async function handleLanguageChange(lang) {
  state.currentLang = lang;
  await i18n.setLanguage(lang);
  updateLanguageUI();
  updateGreeting();
  updateClock(); // Update date format
  updateAllText();
  // Update dynamic elements (e.g. primary action text, reminder banner)
  await updateUI();
}

/**
 * Populate custom time picker selects
 */
function populateTimeSelects() {
  // Hours (00-23)
  elements.plannerHour.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const val = i.toString().padStart(2, '0');
    const option = document.createElement('option');
    option.value = val;
    option.textContent = val;
    if (i === 7) option.selected = true; // Default 07:00
    elements.plannerHour.appendChild(option);
  }
  
  // Minutes (00-55, step 5)
  elements.plannerMinute.innerHTML = '';
  for (let i = 0; i < 60; i += 5) {
    const val = i.toString().padStart(2, '0');
    const option = document.createElement('option');
    option.value = val;
    option.textContent = val;
    elements.plannerMinute.appendChild(option);
  }
}

/**
 * Update all text elements with i18n translations
 */
function updateAllText() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = i18n.t(key);
  });
  
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = i18n.t(key);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
