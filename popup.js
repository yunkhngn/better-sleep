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
}

/**
 * Cache DOM elements
 */
function cacheElements() {
  elements = {
    // Panels
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
    plannerTimeInput: document.getElementById('plannerTimeInput'),
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
    reminderTime: document.getElementById('reminderTime'),
    
    // Name modal
    nameModal: document.getElementById('nameModal'),
    nameInput: document.getElementById('nameInput'),
    nameSubmit: document.getElementById('nameSubmit'),
    
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
    tab.addEventListener('click', () => switchPlannerMode(tab.dataset.mode));
  });
  
  // Planner inputs
  elements.plannerTimeInput.addEventListener('change', updateSuggestions);
  elements.latencyInput.addEventListener('change', updateSuggestions);
  
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
    elements.dateText.textContent = now.toLocaleDateString('en-US', options);
  }
}

/**
 * Update time of day (day/night mode)
 */
function updateTimeOfDay() {
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 6;
  
  state.isNightMode = isNight;
  
  if (isNight) {
    elements.dayPanel.classList.add('hidden');
    elements.nightPanel.classList.remove('hidden');
    elements.actionPanel.classList.add('light-mode');
  } else {
    elements.dayPanel.classList.remove('hidden');
    elements.nightPanel.classList.add('hidden');
    elements.actionPanel.classList.remove('light-mode');
  }
}

/**
 * Update UI based on current state
 */
async function updateUI() {
  const moonSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const sunSVG = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>';
  
  if (state.isSleeping) {
    elements.primaryActionText.textContent = "I'm awake";
    elements.primaryActionIcon.innerHTML = sunSVG;
    elements.primaryAction.classList.remove('primary');
  } else {
    elements.primaryActionText.textContent = "Going to sleep";
    elements.primaryActionIcon.innerHTML = moonSVG;
    elements.primaryAction.classList.add('primary');
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
  
  elements.plannerInputLabel.textContent = mode === 'wake' 
    ? 'Target wake time' 
    : 'Target sleep time';
  
  updateSuggestions();
}

/**
 * Update suggestions based on input
 */
function updateSuggestions() {
  const time = elements.plannerTimeInput.value;
  const latency = parseInt(elements.latencyInput.value) || 15;
  
  let suggestions;
  if (state.plannerMode === 'wake') {
    suggestions = Planner.calculateSleepTimes(time, latency);
  } else {
    suggestions = Planner.calculateWakeTimes(time, latency);
  }
  
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
    item.querySelector('.suggestion-cycles').innerHTML = 'Click to set<br>as bedtime';
    
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
  item.querySelector('.suggestion-cycles').innerHTML = 'Reminder set!';
  
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
  const schedule = await Storage.getEffectiveSchedule();
  const reminderState = await Storage.get('reminderState');
  
  elements.reminderEnabled.checked = reminderState?.enabled || false;
  elements.targetBedtime.value = schedule.bedtime || '22:30';
  elements.graceMinutes.value = schedule.graceMinutes || 15;
  elements.latencyInput.value = schedule.sleepLatency || 15;
  
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
  const originalText = btn.textContent;
  btn.textContent = 'Saved!';
  btn.style.background = 'var(--accent-teal)';
  
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
    elements.sleepDuration.textContent = 'No data';
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
    if (minutesPast < 60) {
      elements.reminderTime.textContent = `Past bedtime by ${minutesPast} min`;
    } else {
      const hours = Math.floor(minutesPast / 60);
      const mins = minutesPast % 60;
      elements.reminderTime.textContent = `Past bedtime by ${hours}h ${mins}m`;
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
    btn.textContent = 'Click again to confirm';
    btn.style.background = '#fef2f2';
    btn.style.borderColor = '#dc2626';
    
    // Reset after 3 seconds
    setTimeout(() => {
      if (btn.dataset.confirm) {
        delete btn.dataset.confirm;
        btn.textContent = 'Delete All Data';
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
    btn.textContent = 'Data deleted';
    btn.style.color = 'var(--accent-teal)';
    btn.style.borderColor = 'var(--accent-teal)';
    btn.style.background = '';
    
    // Reset state
    state.isSleeping = false;
    await updateUI();
    await loadSettings();
    
    setTimeout(() => {
      btn.textContent = 'Delete All Data';
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
    state.userName = name;
    await Storage.set({ userName: name });
    elements.nameModal.classList.add('hidden');
    continueInit();
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
  // Note: Full UI translation would update all data-i18n elements
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
