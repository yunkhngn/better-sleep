/**
 * i18n Module - Better Sleep
 * Multi-language support (EN/VI/JP)
 */

const i18n = {
  // Available languages
  languages: ['en', 'vi', 'jp'],
  
  // Current language (default: English)
  currentLang: 'en',
  
  // Translations
  strings: {
    en: {
      // Greetings (with {name} placeholder)
      greetingMorning: 'Good morning, {name}',
      greetingAfternoon: 'Good afternoon, {name}',
      greetingEvening: 'Good evening, {name}',
      greetingNight: 'Sleep well, {name}',
      sleepWell: 'Sleep well, {name}',
      defaultName: 'friend',
      
      // Reminder banner
      timeToSleep: 'Time to sleep, {name}',
      timeToSleep: 'Time to sleep, {name}',
      pastBedtimeBy: 'Past bedtime by {time}',
      alarm: 'Alarm',
      
      // Main actions
      goingToSleep: 'Going to sleep',
      imAwake: "I'm awake",
      howDoYouFeel: 'How do you feel?',
      refreshed: 'Refreshed',
      okay: 'Okay', 
      tired: 'Tired',
      
      // Navigation
      planner: 'Planner',
      settings: 'Settings',
      summary: 'Summary',
      
      // Planner
      sleepPlanner: 'Sleep Planner',
      planSleepCycles: 'Plan your sleep cycles',
      wantToWakeAt: 'I want to wake at',
      wantToSleepAt: 'I want to sleep at',
      targetWakeTime: 'Target wake time',
      targetSleepTime: 'Target sleep time',
      timeToFallAsleep: 'Time to fall asleep',
      suggestedTimes: 'Suggested times',
      cycles: 'cycles',
      clickToSetBedtime: 'Click to set\nas bedtime',
      reminderSet: 'Reminder set!',
      
      // Settings
      settingsTitle: 'Settings',
      customizeExperience: 'Customize your experience',
      reminder: 'Reminder',
      weekly: 'Weekly',
      bedtimeReminder: 'Bedtime reminder',
      targetBedtime: 'Target bedtime',
      gentleReminderHint: "You'll get a gentle reminder after this time.",
      gracePeriod: 'Grace period',
      gracePeriodHint: 'Minutes after bedtime before reminder.',
      applyTo: 'Apply to',
      everyDay: 'Every day',
      tomorrowOnly: 'Tomorrow only',
      saveSettings: 'Save Settings',
      saved: 'Saved!',
      personalization: 'Personalization',
      changeName: 'Change Name',
      
      // Danger zone
      deleteAllData: 'Delete all data',
      deleteHint: 'This will remove all your sleep logs and reset settings.',
      deleteButton: 'Delete All Data',
      clickToConfirm: 'Click again to confirm',
      dataDeleted: 'Data deleted',
      
      // Summary
      sleepSummary: 'Sleep Summary',
      lastNight: 'Last night',
      sleepDuration: 'Sleep Duration',
      sleepInfo: 'Sleep Information',
      seeGraph: 'See Graph',
      wentToSleep: 'Went to sleep',
      wokeUp: 'Woke up',
      backToHome: 'Back to Home',
      backToHome: 'Back to Home',
      noData: 'No data',
      
      // Insights
      insightMidCycle: "You woke up mid-cycle. This can feel groggy.",
      insightShort: "Shorter sleep may affect how you feel during the day.",
      insightLong: "Longer sleep isn't always better. Quality matters too.",
      insightTired: "Good timing, but tiredness can have other causes.",
      insightGood: "You woke up near the end of a cycle. This usually feels better.",
      
      // Chart
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
      
      // Planner Extras
      minutes: 'min',
      cycleExplanation: 'A sleep cycle lasts ~90 mins. Waking up between cycles helps you feel refreshed.',
      
      // Language
      language: 'Language',
      
      // Name input
      welcomeTitle: 'Welcome!',
      whatsYourName: "What's your name?",
      enterName: 'Enter your name',
      continueBtn: 'Continue',
      
      // Footer
      medicalDisclaimer: 'This extension does not provide medical advice.',
      madeBy: 'Made by'
    },
    
    vi: {
      // Lời chào
      greetingMorning: 'Chào buổi sáng, {name}',
      greetingAfternoon: 'Chào buổi chiều, {name}',
      greetingEvening: 'Chào buổi tối, {name}',
      greetingNight: 'Chúc ngủ ngon, {name}',
      sleepWell: 'Ngủ ngon nhé',
      defaultName: 'bạn',
      
      // Banner nhắc nhở
      timeToSleep: 'Đến giờ ngủ rồi, {name}',
      timeToSleep: 'Đến giờ ngủ rồi, {name}',
      pastBedtimeBy: 'Đã quá giờ ngủ {time}',
      alarm: 'Báo thức',
      
      // Hành động chính
      goingToSleep: 'Đi ngủ thôi',
      imAwake: 'Tôi thức dậy rồi',
      howDoYouFeel: 'Bạn cảm thấy thế nào?',
      refreshed: 'Khỏe khoắn',
      okay: 'Bình thường',
      tired: 'Mệt mỏi',
      
      // Điều hướng
      planner: 'Lên kế hoạch',
      settings: 'Cài đặt',
      summary: 'Tổng kết',
      
      // Lên kế hoạch
      sleepPlanner: 'Lên kế hoạch ngủ',
      planSleepCycles: 'Lên kế hoạch chu kỳ giấc ngủ',
      wantToWakeAt: 'Tôi muốn dậy lúc',
      wantToSleepAt: 'Tôi muốn ngủ lúc',
      targetWakeTime: 'Giờ thức dậy',
      targetSleepTime: 'Giờ đi ngủ',
      timeToFallAsleep: 'Thời gian chìm vào giấc ngủ',
      suggestedTimes: 'Gợi ý thời gian',
      cycles: 'chu kỳ',
      clickToSetBedtime: 'Nhấn để đặt\ngiờ đi ngủ',
      reminderSet: 'Đã đặt nhắc nhở!',
      
      // Cài đặt
      settingsTitle: 'Cài đặt',
      customizeExperience: 'Tùy chỉnh trải nghiệm của bạn',
      reminder: 'Nhắc nhở',
      weekly: 'Tuần',
      bedtimeReminder: 'Nhắc nhở đi ngủ',
      targetBedtime: 'Giờ đi ngủ',
      gentleReminderHint: 'Bạn sẽ được nhắc nhở nhẹ nhàng sau giờ này.',
      gracePeriod: 'Thời gian ân hạn',
      gracePeriodHint: 'Phút sau giờ ngủ trước khi nhắc nhở.',
      applyTo: 'Áp dụng cho',
      everyDay: 'Mỗi ngày',
      tomorrowOnly: 'Chỉ ngày mai',
      saveSettings: 'Lưu cài đặt',
      saved: 'Đã lưu!',
      personalization: 'Cá nhân hóa',
      changeName: 'Đổi tên',
      
      // Vùng nguy hiểm
      deleteAllData: 'Xóa tất cả dữ liệu',
      deleteHint: 'Thao tác này sẽ xóa toàn bộ nhật ký giấc ngủ và đặt lại cài đặt.',
      deleteButton: 'Xóa tất cả',
      clickToConfirm: 'Nhấn lại để xác nhận',
      dataDeleted: 'Đã xóa dữ liệu',
      
      // Tổng kết
      sleepSummary: 'Tổng kết giấc ngủ',
      lastNight: 'Đêm qua',
      sleepDuration: 'Thời lượng ngủ',
      sleepInfo: 'Thông tin giấc ngủ',
      seeGraph: 'Xem biểu đồ',
      wentToSleep: 'Đã đi ngủ',
      wokeUp: 'Thức dậy',
      backToHome: 'Về trang chính',
      noData: 'Chưa có dữ liệu',
      
      // Insights
      insightMidCycle: "Bạn thức dậy giữa chu kỳ. Có thể sẽ thấy hơi mệt.",
      insightShort: "Ngủ ít có thể ảnh hưởng đến năng lượng trong ngày.",
      insightLong: "Ngủ nhiều chưa chắc đã tốt. Chất lượng mới quan trọng.",
      insightTired: "Thời điểm tốt, nhưng mệt mỏi có thể do lý do khác.",
      insightGood: "Bạn thức dậy vào cuối chu kỳ. Thường sẽ thấy khỏe hơn.",
      
      // Chart
      mon: 'T2', tue: 'T3', wed: 'T4', thu: 'T5', fri: 'T6', sat: 'T7', sun: 'CN',
      
      // Planner Extras
      minutes: 'phút',
      cycleExplanation: 'Mỗi chu kỳ khoảng 90 phút. Thức dậy giữa các chu kỳ giúp bạn tỉnh táo hơn.',
      
      // Ngôn ngữ
      language: 'Ngôn ngữ',
      
      // Nhập tên
      welcomeTitle: 'Chào mừng!',
      whatsYourName: 'Bạn tên là gì?',
      enterName: 'Nhập tên của bạn',
      continueBtn: 'Tiếp tục',
      
      // Footer
      medicalDisclaimer: 'Extension này không cung cấp lời khuyên y tế.',
      madeBy: 'Được tạo bởi'
    },
    
    jp: {
      // 挨拶
      greetingMorning: 'おはよう、{name}',
      greetingAfternoon: 'こんにちは、{name}',
      greetingEvening: 'こんばんは、{name}',
      greetingNight: 'おやすみ、{name}',
      sleepWell: 'ゆっくり休んでね',
      defaultName: 'ともだち',
      
      // リマインダーバナー
      timeToSleep: '寝る時間だよ、{name}',
      timeToSleep: '寝る時間だよ、{name}',
      pastBedtimeBy: '就寝時間を{time}過ぎています',
      alarm: 'アラーム',
      
      // メインアクション
      goingToSleep: '寝ます',
      imAwake: '起きました',
      howDoYouFeel: '気分はどう？',
      refreshed: 'スッキリ',
      okay: 'まあまあ',
      tired: '疲れた',
      
      // ナビゲーション
      planner: 'プランナー',
      settings: '設定',
      summary: 'まとめ',
      
      // プランナー
      sleepPlanner: '睡眠プランナー',
      planSleepCycles: '睡眠サイクルを計画する',
      wantToWakeAt: '起きたい時間',
      wantToSleepAt: '寝たい時間',
      targetWakeTime: '目標起床時間',
      targetSleepTime: '目標就寝時間',
      timeToFallAsleep: '入眠までの時間',
      suggestedTimes: 'おすすめの時間',
      cycles: 'サイクル',
      clickToSetBedtime: 'クリックで\n就寝時間に設定',
      reminderSet: 'リマインダー設定済み！',
      
      // 設定
      settingsTitle: '設定',
      customizeExperience: '体験をカスタマイズ',
      reminder: 'リマインダー',
      weekly: '週間',
      bedtimeReminder: '就寝リマインダー',
      targetBedtime: '目標就寝時間',
      gentleReminderHint: 'この時間の後に優しくお知らせします。',
      gracePeriod: '猶予期間',
      gracePeriodHint: 'リマインダーまでの猶予分。',
      applyTo: '適用',
      everyDay: '毎日',
      tomorrowOnly: '明日だけ',
      saveSettings: '設定を保存',
      saved: '保存しました！',
      personalization: 'パーソナライズ',
      changeName: '名前を変更',
      
      // 危険ゾーン
      deleteAllData: 'すべてのデータを削除',
      deleteHint: 'すべての睡眠記録と設定がリセットされます。',
      deleteButton: 'すべて削除',
      clickToConfirm: 'もう一度クリックで確認',
      dataDeleted: 'データ削除済み',
      
      // まとめ
      sleepSummary: '睡眠まとめ',
      lastNight: '昨夜',
      sleepDuration: '睡眠時間',
      sleepInfo: '睡眠情報',
      seeGraph: 'グラフを見る',
      wentToSleep: '就寝',
      wokeUp: '起床',
      backToHome: 'ホームに戻る',
      noData: 'データなし',
      
      // Insights
      insightMidCycle: "サイクルの途中で起きました。眠気を感じるかもしれません。",
      insightShort: "睡眠不足は日中の気分に影響する可能性があります。",
      insightLong: "長く寝れば良いわけではありません。質が重要です。",
      insightTired: "タイミングは良いですが、疲れには他の原因があるかもしれません。",
      insightGood: "サイクルの終わりに起きました。すっきり目覚められます。",
      
      // Chart
      mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日',
      
      // Planner Extras
      minutes: '分',
      cycleExplanation: '睡眠サイクルは約90分です。サイクルの合間に起きるとすっきりします。',
      
      // 言語
      language: '言語',
      
      // 名前入力
      welcomeTitle: 'ようこそ！',
      whatsYourName: 'お名前は？',
      enterName: '名前を入力',
      continueBtn: '続ける',
      
      // フッター
      medicalDisclaimer: 'この拡張機能は医療アドバイスを提供しません。',
      madeBy: '作成者'
    }
  },
  
  /**
   * Get translated string
   */
  t(key, replacements = {}) {
    let str = this.strings[this.currentLang]?.[key] || this.strings.en[key] || key;
    
    // Replace placeholders
    Object.entries(replacements).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
    
    return str;
  },
  
  /**
   * Set current language
   */
  async setLanguage(lang) {
    if (this.languages.includes(lang)) {
      this.currentLang = lang;
      await Storage.set({ language: lang });
    }
  },
  
  /**
   * Load language from storage
   */
  async loadLanguage() {
    const lang = await Storage.get('language');
    if (lang && this.languages.includes(lang)) {
      this.currentLang = lang;
    }
  },
  
  /**
   * Get language display name
   */
  getLanguageName(lang) {
    const names = {
      en: 'English',
      vi: 'Tiếng Việt',
      jp: '日本語'
    };
    return names[lang] || lang;
  }
};
