/**
 * Planner Module - Better Sleep
 * Calculates suggested sleep/wake times based on sleep cycles
 */

const Planner = {
  // Sleep cycle duration in minutes (heuristic)
  CYCLE_MINUTES: 90,
  
  // Number of cycles to suggest (4-6 is typical)
  MIN_CYCLES: 4,
  MAX_CYCLES: 6,

  /**
   * Calculate suggestions based on mode
   */
  calculateSuggestions(time, mode, latency) {
    if (mode === 'wake') {
      return this.calculateSleepTimes(time, latency);
    } else {
      return this.calculateWakeTimes(time, latency);
    }
  },

  /**
   * Parse time string (HH:mm) to minutes since midnight
   */
  timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  },

  /**
   * Convert minutes since midnight to time string (HH:mm)
   */
  minutesToTime(minutes) {
    // Handle negative minutes (previous day) and overflow (next day)
    let normalizedMinutes = minutes;
    while (normalizedMinutes < 0) normalizedMinutes += 24 * 60;
    normalizedMinutes = normalizedMinutes % (24 * 60);
    
    const hours = Math.floor(normalizedMinutes / 60);
    const mins = normalizedMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  },

  /**
   * Calculate suggested sleep times given a wake time
   * @param {string} wakeTime - Target wake time (HH:mm)
   * @param {number} latencyMinutes - Time to fall asleep (default 15)
   * @returns {Array} Array of suggestion objects
   */
  calculateSleepTimes(wakeTime, latencyMinutes = 15) {
    const wakeMinutes = this.timeToMinutes(wakeTime);
    const suggestions = [];

    for (let cycles = this.MAX_CYCLES; cycles >= this.MIN_CYCLES; cycles--) {
      const sleepDuration = cycles * this.CYCLE_MINUTES;
      const sleepMinutes = wakeMinutes - sleepDuration - latencyMinutes;
      
      suggestions.push({
        time: this.minutesToTime(sleepMinutes),
        cycles: cycles,
        duration: this.formatDuration(sleepDuration)
      });
    }

    return suggestions;
  },

  /**
   * Calculate suggested wake times given a sleep time
   * @param {string} sleepTime - Target sleep time (HH:mm)
   * @param {number} latencyMinutes - Time to fall asleep (default 15)
   * @returns {Array} Array of suggestion objects
   */
  calculateWakeTimes(sleepTime, latencyMinutes = 15) {
    const sleepMinutes = this.timeToMinutes(sleepTime);
    const suggestions = [];

    for (let cycles = this.MIN_CYCLES; cycles <= this.MAX_CYCLES; cycles++) {
      const sleepDuration = cycles * this.CYCLE_MINUTES;
      const wakeMinutes = sleepMinutes + latencyMinutes + sleepDuration;
      
      suggestions.push({
        time: this.minutesToTime(wakeMinutes),
        cycles: cycles,
        duration: this.formatDuration(sleepDuration)
      });
    }

    return suggestions;
  },

  /**
   * Format duration in hours and minutes
   */
  formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
  },

  /**
   * Calculate number of complete cycles between two times
   */
  calculateCycles(sleepTime, wakeTime, latencyMinutes = 15) {
    const sleepDate = new Date(sleepTime);
    const wakeDate = new Date(wakeTime);
    
    // Total sleep time in minutes, minus latency
    const totalMinutes = (wakeDate - sleepDate) / (1000 * 60) - latencyMinutes;
    
    if (totalMinutes <= 0) return 0;
    
    return totalMinutes / this.CYCLE_MINUTES;
  },

  /**
   * Get a description of the sleep quality based on cycle completion
   */
  getCycleInsight(cycles) {
    const completeCycles = Math.floor(cycles);
    const remainder = cycles - completeCycles;
    
    if (remainder < 0.2) {
      // Woke up near end of cycle
      return null; // No insight needed, good timing
    } else if (remainder > 0.3 && remainder < 0.7) {
      // Woke up mid-cycle
      return "You woke up mid-cycle. This can feel groggy.";
    }
    
    return null;
  }
};
