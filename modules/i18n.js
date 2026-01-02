/**
 * i18n Module - Better Sleep
 * Multi-language support (EN/VI/JP)
 */

const i18n = {
  // Available languages
  languages: ['en', 'vi', 'jp', 'fr', 'zh', 'ko'],
  
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
      personalization: 'Personalization',
      displayName: 'Display Name',
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
      madeBy: 'Developed by'
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
      personalization: 'Cá nhân hóa',
      displayName: 'Tên hiển thị',
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
      madeBy: 'Phát triển bởi'
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
      personalization: '個人設定',
      displayName: '表示名',
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
    },
    
    fr: {
      // Greetings
      greetingMorning: 'Bonjour, {name}',
      greetingAfternoon: 'Bon après-midi, {name}',
      greetingEvening: 'Bonsoir, {name}',
      greetingNight: 'Dormez bien, {name}',
      sleepWell: 'Dormez bien',
      defaultName: 'ami',
      
      // Reminder banner
      timeToSleep: 'Il est l\'heure de dormir, {name}',
      pastBedtimeBy: 'Heure du coucher dépassée de {time}',
      alarm: 'Alarme',
      
      // Main actions
      goingToSleep: 'Je vais dormir',
      imAwake: 'Je suis réveillé',
      howDoYouFeel: 'Comment vous sentez-vous ?',
      refreshed: 'Reposé',
      okay: 'Ça va',
      tired: 'Fatigué',
      
      // Navigation
      planner: 'Planificateur',
      settings: 'Paramètres',
      summary: 'Résumé',
      
      // Planner
      sleepPlanner: 'Planificateur de sommeil',
      planSleepCycles: 'Planifiez vos cycles de sommeil',
      wantToWakeAt: 'Je veux me réveiller à',
      wantToSleepAt: 'Je veux dormir à',
      targetWakeTime: 'Heure de réveil cible',
      targetSleepTime: 'Heure de coucher cible',
      timeToFallAsleep: 'Temps pour s\'endormir',
      suggestedTimes: 'Heures suggérées',
      cycles: 'cycles',
      clickToSetBedtime: 'Cliquez pour définir\ncomme heure de coucher',
      reminderSet: 'Rappel défini !',
      
      // Settings
      settingsTitle: 'Paramètres',
      customizeExperience: 'Personnalisez votre expérience',
      reminder: 'Rappel',
      weekly: 'Hebdomadaire',
      bedtimeReminder: 'Rappel de l\'heure du coucher',
      targetBedtime: 'Heure de coucher cible',
      gentleReminderHint: 'Vous recevrez un rappel doux après cette heure.',
      gracePeriod: 'Période de grâce',
      gracePeriodHint: 'Minutes après l\'heure du coucher avant le rappel.',
      applyTo: 'Appliquer à',
      everyDay: 'Tous les jours',
      tomorrowOnly: 'Demain seulement',
      saveSettings: 'Enregistrer',
      saved: 'Enregistré !',
      personalization: 'Personnalisation',
      displayName: 'Nom d\'affichage',
      changeName: 'Changer le nom',
      
      // Danger zone
      deleteAllData: 'Supprimer toutes les données',
      deleteHint: 'Ceci supprimera tous vos journaux de sommeil et réinitialisera les paramètres.',
      deleteButton: 'Tout supprimer',
      clickToConfirm: 'Cliquez à nouveau pour confirmer',
      dataDeleted: 'Données supprimées',
      
      // Summary
      sleepSummary: 'Résumé du sommeil',
      lastNight: 'La nuit dernière',
      sleepDuration: 'Durée du sommeil',
      sleepInfo: 'Infos sommeil',
      seeGraph: 'Voir le graphique',
      wentToSleep: 'S\'est couché',
      wokeUp: 'S\'est réveillé',
      backToHome: 'Retour à l\'accueil',
      noData: 'Pas de données',
      
      // Insights
      insightMidCycle: "Vous vous êtes réveillé au milieu d'un cycle. Vous pouvez vous sentir fatigué.",
      insightShort: "Un sommeil plus court peut affecter votre énergie.",
      insightLong: "Dormir plus longtemps n'est pas toujours mieux. La qualité compte.",
      insightTired: "Bon timing, mais la fatigue peut avoir d'autres causes.",
      insightGood: "Vous vous êtes réveillé à la fin d'un cycle. C'est généralement mieux.",
      
      // Chart
      mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim',
      
      // Planner Extras
      minutes: 'min',
      cycleExplanation: 'Un cycle de sommeil dure ~90 min. Se réveiller entre les cycles aide à se sentir reposé.',
      
      // Language
      language: 'Langue',
      
      // Name input
      welcomeTitle: 'Bienvenue !',
      whatsYourName: 'Comment vous appelez-vous ?',
      enterName: 'Entrez votre nom',
      continueBtn: 'Continuer',
      
      // Footer
      medicalDisclaimer: 'Cette extension ne fournit pas de conseils médicaux.',
      madeBy: 'Développé par'
    },
    
    zh: {
      // Greetings
      greetingMorning: '早上好，{name}',
      greetingAfternoon: '下午好，{name}',
      greetingEvening: '晚上好，{name}',
      greetingNight: '晚安，{name}',
      sleepWell: '睡个好觉',
      defaultName: '朋友',
      
      // Reminder banner
      timeToSleep: '该睡觉了，{name}',
      pastBedtimeBy: '超过就寝时间 {time}',
      alarm: '闹钟',
      
      // Main actions
      goingToSleep: '我要睡觉了',
      imAwake: '我醒了',
      howDoYouFeel: '你感觉如何？',
      refreshed: '精神焕发',
      okay: '还可以',
      tired: '累',
      
      // Navigation
      planner: '计划',
      settings: '设置',
      summary: '摘要',
      
      // Planner
      sleepPlanner: '睡眠计划',
      planSleepCycles: '规划你的睡眠周期',
      wantToWakeAt: '我想在...醒来',
      wantToSleepAt: '我想在...睡觉',
      targetWakeTime: '目标起床时间',
      targetSleepTime: '目标就寝时间',
      timeToFallAsleep: '入睡所需时间',
      suggestedTimes: '建议时间',
      cycles: '周期',
      clickToSetBedtime: '点击设为\n就寝时间',
      reminderSet: '提醒已设置！',
      
      // Settings
      settingsTitle: '设置',
      customizeExperience: '自定义体验',
      reminder: '提醒',
      weekly: '每周',
      bedtimeReminder: '就寝提醒',
      targetBedtime: '目标就寝时间',
      gentleReminderHint: '过后你会收到温柔的提醒。',
      gracePeriod: '宽限期',
      gracePeriodHint: '就寝后多少分钟提醒。',
      applyTo: '应用于',
      everyDay: '每天',
      tomorrowOnly: '仅明天',
      saveSettings: '保存设置',
      saved: '已保存！',
      personalization: '个性化',
      displayName: '显示名称',
      changeName: '更改名称',
      
      // Danger zone
      deleteAllData: '删除所有数据',
      deleteHint: '这将删除所有睡眠记录并重置设置。',
      deleteButton: '删除所有数据',
      clickToConfirm: '再次点击确认',
      dataDeleted: '数据已删除',
      
      // Summary
      sleepSummary: '睡眠摘要',
      lastNight: '昨晚',
      sleepDuration: '睡眠时长',
      sleepInfo: '睡眠信息',
      seeGraph: '查看图表',
      wentToSleep: '入睡',
      wokeUp: '醒来',
      backToHome: '返回主页',
      noData: '无数据',
      
      // Insights
      insightMidCycle: "你在周期中间醒来。可能会感到昏昏沉沉。",
      insightShort: "睡眠时间较短可能会影响白天的状态。",
      insightLong: "睡得越久不一定越好。质量也很重要。",
      insightTired: "时机不错，但疲劳可能有其他原因。",
      insightGood: "你在周期结束时醒来。通常感觉更好。",
      
      // Chart
      mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六', sun: '日',
      
      // Planner Extras
      minutes: '分钟',
      cycleExplanation: '睡眠周期约为90分钟。在周期之间醒来有助于精神焕发。',
      
      // Language
      language: '语言',
      
      // Name input
      welcomeTitle: '欢迎！',
      whatsYourName: '你叫什么名字？',
      enterName: '输入你的名字',
      continueBtn: '继续',
      
      // Footer
      medicalDisclaimer: '此扩展不提供医疗建议。',
      madeBy: '由...开发'
    },
    
    ko: {
      // Greetings
      greetingMorning: '좋은 아침입니다, {name}',
      greetingAfternoon: '안녕하세요, {name}',
      greetingEvening: '좋은 저녁입니다, {name}',
      greetingNight: '안녕히 주무세요, {name}',
      sleepWell: '안녕히 주무세요',
      defaultName: '친구',
      
      // Reminder banner
      timeToSleep: '잘 시간입니다, {name}',
      pastBedtimeBy: '취침 시간이 {time} 지났습니다',
      alarm: '알람',
      
      // Main actions
      goingToSleep: '자러 가기',
      imAwake: '일어났어요',
      howDoYouFeel: '기분이 어떠신가요?',
      refreshed: '상쾌해요',
      okay: '괜찮아요',
      tired: '피곤해요',
      
      // Navigation
      planner: '플래너',
      settings: '설정',
      summary: '요약',
      
      // Planner
      sleepPlanner: '수면 플래너',
      planSleepCycles: '수면 사이클 계획',
      wantToWakeAt: '기상 시간',
      wantToSleepAt: '취침 시간',
      targetWakeTime: '목표 기상 시간',
      targetSleepTime: '목표 취침 시간',
      timeToFallAsleep: '잠들기까지 걸리는 시간',
      suggestedTimes: '추천 시간',
      cycles: '사이클',
      clickToSetBedtime: '클릭하여\n취침 시간으로 설정',
      reminderSet: '알림이 설정되었습니다!',
      
      // Settings
      settingsTitle: '설정',
      customizeExperience: '사용자 맞춤 설정',
      reminder: '알림',
      weekly: '주간',
      bedtimeReminder: '취침 알림',
      targetBedtime: '목표 취침 시간',
      gentleReminderHint: '이 시간 이후 부드러운 알림을 받게 됩니다.',
      gracePeriod: '유예 시간',
      gracePeriodHint: '취침 시간 후 알림 전 대기 분.',
      applyTo: '적용 대상',
      everyDay: '매일',
      tomorrowOnly: '내일만',
      saveSettings: '설정 저장',
      saved: '저장됨!',
      personalization: '개인 설정',
      displayName: '나의 이름',
      changeName: '이름 변경',
      
      // Danger zone
      deleteAllData: '모든 데이터 삭제',
      deleteHint: '모든 수면 기록이 삭제되고 설정이 초기화됩니다.',
      deleteButton: '모든 데이터 삭제',
      clickToConfirm: '다시 클릭하여 확인',
      dataDeleted: '데이터 삭제됨',
      
      // Summary
      sleepSummary: '수면 요약',
      lastNight: '지난밤',
      sleepDuration: '수면 시간',
      sleepInfo: '수면 정보',
      seeGraph: '그래프 보기',
      wentToSleep: '취침',
      wokeUp: '기상',
      backToHome: '홈으로',
      noData: '데이터 없음',
      
      // Insights
      insightMidCycle: "수면 사이클 중간에 깼습니다. 피곤할 수 있습니다.",
      insightShort: "수면 시간이 부족하면 하루 컨디션에 영향을 줄 수 있습니다.",
      insightLong: "오래 잔다고 무조건 좋은 것은 아닙니다. 수면의 질이 중요합니다.",
      insightTired: "타이밍은 좋지만, 피로에는 다른 원인이 있을 수 있습니다.",
      insightGood: "사이클이 끝날 때 일어났습니다. 상쾌한 기분이 들 것입니다.",
      
      // Chart
      mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일',
      
      // Planner Extras
      minutes: '분',
      cycleExplanation: '수면 사이클은 약 90분입니다. 사이클 사이에 일어나면 상쾌합니다.',
      
      // Language
      language: '언어',
      
      // Name input
      welcomeTitle: '환영합니다!',
      whatsYourName: '이름이 무엇인가요?',
      enterName: '이름 입력',
      continueBtn: '계속',
      
      // Footer
      medicalDisclaimer: '이 확장 프로그램은 의학적 조언을 제공하지 않습니다.',
      madeBy: 'Developed by'
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
      jp: '日本語',
      fr: 'Français',
      zh: '中文',
      ko: '한국어'
    };
    return names[lang] || lang;
  }
};
