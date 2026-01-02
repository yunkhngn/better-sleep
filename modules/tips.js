/**
 * Tips Module - Better Sleep
 * Provides gentle, non-medical sleep tips
 */

const Tips = {
  // Pool of gentle, non-prescriptive tips
  tipPool: [
    "Consistent wake times help regulate your internal clock.",
    "Caffeine late in the day can delay sleep.",
    "A cool room often helps with falling asleep.",
    "Bright screens before bed may keep you alert.",
    "A wind-down routine can signal it's time to rest.",
    "Regular physical activity supports better rest.",
    "Large meals close to bedtime can be uncomfortable.",
    "Daylight exposure during the day helps nighttime sleep.",
    "Quiet, dark environments are often more restful.",
    "Writing down tomorrow's tasks can ease a busy mind.",
    "Reading a book can be a calming pre-sleep activity.",
    "Consistent sleep times help your body's rhythm.",
    "Alcohol may help you fall asleep but can disrupt rest.",
    "A comfortable mattress and pillow make a difference.",
    "Naps later than 3 PM might affect nighttime sleep."
  ],

  // Track which tip index we're on for variety
  lastTipIndex: -1,

  /**
   * Get a random tip that hasn't been shown recently
   */
  getRandomTip() {
    let index;
    do {
      index = Math.floor(Math.random() * this.tipPool.length);
    } while (index === this.lastTipIndex && this.tipPool.length > 1);
    
    this.lastTipIndex = index;
    return this.tipPool[index];
  },

  /**
   * Check if a tip should be shown (max 1 per day)
   */
  async shouldShowTip() {
    const wasShown = await Storage.wasTipShownToday();
    return !wasShown;
  },

  /**
   * Get today's tip if one should be shown
   */
  async getTodaysTip() {
    const shouldShow = await this.shouldShowTip();
    if (!shouldShow) {
      return null;
    }
    
    await Storage.recordTipShown();
    return this.getRandomTip();
  },

  /**
   * Show tip in the tooltip badge (not a notification)
   */
  async showTipBadge() {
    const tip = await this.getTodaysTip();
    if (tip) {
      // We just return the tip - the UI will handle display
      return tip;
    }
    return null;
  }
};
