ư/**
 * Summary Module - Better Sleep
 * Generates sleep summaries with simple insights
 */

const Summary = {
  /**
   * Generate a summary for a sleep log entry
   */
  generateSummary(logEntry) {
    if (!logEntry || !logEntry.sleepTime || !logEntry.wakeTime) {
      return null;
    }

    const sleepDate = new Date(logEntry.sleepTime);
    const wakeDate = new Date(logEntry.wakeTime);
    
    // Calculate duration
    const durationMs = wakeDate - sleepDate;
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    // Calculate cycles (assuming 15 min latency)
    const effectiveMinutes = durationMinutes - 15;
    const cycles = effectiveMinutes / 90;
    
    return {
      sleepTime: this.formatTime(sleepDate),
      wakeTime: this.formatTime(wakeDate),
      duration: `${hours}h ${minutes}m`,
      durationMinutes: durationMinutes,
      cycles: cycles.toFixed(1),
      completeCycles: Math.floor(cycles),
      insight: this.getInsight(cycles, logEntry.mood),
      mood: logEntry.mood
    };
  },

  /**
   * Format a date to time string
   */
  formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },

  /**
   * Get a simple, rule-based insight
   * Returns at most ONE insight
   */
  getInsight(cycles, mood) {
    const completeCycles = Math.floor(cycles);
    const remainder = cycles - completeCycles;
    
    // Check for mid-cycle wake
    if (remainder > 0.3 && remainder < 0.7) {
      return i18n.t('insightMidCycle');
    }
    
    // Check for very short sleep
    if (completeCycles < 4) {
      return i18n.t('insightShort');
    }
    
    // Check for very long sleep
    if (completeCycles > 7) {
      return i18n.t('insightLong');
    }
    
    // If mood is tired but good cycle count
    if (mood === 'tired' && completeCycles >= 5 && remainder < 0.3) {
      return i18n.t('insightTired');
    }
    
    // Good timing
    if (remainder < 0.2 || remainder > 0.8) {
      return i18n.t('insightGood');
    }
    
    return null;
  },

  /**
   * Generate HTML for the summary display
   */
  generateSummaryHTML(summary) {
    if (!summary) {
      return '<p class="text-muted" style="text-align: center;">No sleep data yet. Start by logging your sleep!</p>';
    }

    let moodEmoji = '';
    if (summary.mood === 'refreshed') moodEmoji = '😊';
    else if (summary.mood === 'okay') moodEmoji = '😐';
    else if (summary.mood === 'tired') moodEmoji = '😴';

    let html = `
      <div class="summary-stats">
        <div class="summary-stat">
          <span class="stat-label">Slept at</span>
          <span class="stat-value">${summary.sleepTime}</span>
        </div>
        <div class="summary-stat">
          <span class="stat-label">Woke at</span>
          <span class="stat-value">${summary.wakeTime}</span>
        </div>
        <div class="summary-stat">
          <span class="stat-label">~Cycles</span>
          <span class="stat-value">${summary.completeCycles}</span>
        </div>
      </div>
      <div class="summary-stats" style="grid-template-columns: 1fr 1fr;">
        <div class="summary-stat">
          <span class="stat-label">Duration</span>
          <span class="stat-value">${summary.duration}</span>
        </div>
        ${summary.mood ? `
        <div class="summary-stat">
          <span class="stat-label">Mood</span>
          <span class="stat-value">${moodEmoji}</span>
        </div>
        ` : ''}
      </div>
    `;

    if (summary.insight) {
      html += `
        <div class="summary-insight">
          <p class="insight-text">${summary.insight}</p>
        </div>
      `;
    }

    return html;
  }
};
