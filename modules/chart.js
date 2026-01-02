/**
 * Chart Module - Better Sleep
 * Renders a 7-day sleep duration bar chart
 */

const Chart = {
  // Chart configuration
  config: {
    barColor: 'rgba(94, 234, 212, 0.7)',
    barHoverColor: 'rgba(94, 234, 212, 1)',
    gridColor: 'rgba(148, 163, 184, 0.1)',
    textColor: '#94a3b8',
    backgroundColor: 'transparent',
    barRadius: 4,
    barGap: 8,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 35,
    paddingRight: 10,
    maxHours: 12
  },

  // Store for hover detection
  bars: [],
  hoveredBar: null,

  /**
   * Initialize the chart
   */
  init(canvasId, tooltipId) {
    this.canvas = document.getElementById(canvasId);
    this.tooltip = document.getElementById(tooltipId);
    this.ctx = this.canvas?.getContext('2d');
    
    if (!this.canvas || !this.ctx) return;

    // Set up high DPI canvas
    this.setupCanvas();
    
    // Add mouse handlers
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
  },

  /**
   * Set up canvas for high DPI displays
   */
  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    
    this.width = rect.width;
    this.height = rect.height;
  },

  /**
   * Render the chart with given data
   */
  async render() {
    if (!this.ctx) return;

    const logs = await Storage.getWeeklyLogs();
    const data = this.processLogs(logs);
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw components
    this.drawGrid();
    this.drawBars(data);
    this.drawLabels(data);
  },

  /**
   * Process logs into chart data
   */
  processLogs(logs) {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create 7 days of data
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const log = logs.find(l => l.date === dateStr);
      let duration = 0;
      let sleepTime = null;
      let wakeTime = null;
      
      if (log && log.sleepTime && log.wakeTime) {
        const sleep = new Date(log.sleepTime);
        const wake = new Date(log.wakeTime);
        duration = (wake - sleep) / (1000 * 60 * 60); // hours
        sleepTime = sleep.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        wakeTime = wake.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      
      days.push({
        label: dayNames[date.getDay()],
        date: dateStr,
        duration: duration,
        sleepTime: sleepTime,
        wakeTime: wakeTime
      });
    }
    
    return days;
  },

  /**
   * Draw grid lines
   */
  drawGrid() {
    const { paddingTop, paddingBottom, paddingLeft, paddingRight, gridColor, textColor, maxHours } = this.config;
    const chartHeight = this.height - paddingTop - paddingBottom;
    const chartWidth = this.width - paddingLeft - paddingRight;
    
    this.ctx.strokeStyle = gridColor;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = textColor;
    this.ctx.font = '10px Inter, sans-serif';
    this.ctx.textAlign = 'right';
    
    // Draw horizontal grid lines (every 3 hours)
    for (let hours = 0; hours <= maxHours; hours += 3) {
      const y = paddingTop + chartHeight - (hours / maxHours) * chartHeight;
      
      this.ctx.beginPath();
      this.ctx.moveTo(paddingLeft, y);
      this.ctx.lineTo(this.width - paddingRight, y);
      this.ctx.stroke();
      
      // Y-axis labels
      this.ctx.fillText(`${hours}h`, paddingLeft - 5, y + 3);
    }
  },

  /**
   * Draw bars
   */
  drawBars(data) {
    const { paddingTop, paddingBottom, paddingLeft, paddingRight, barGap, barRadius, maxHours, barColor } = this.config;
    const chartHeight = this.height - paddingTop - paddingBottom;
    const chartWidth = this.width - paddingLeft - paddingRight;
    const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;
    
    this.bars = [];
    
    data.forEach((day, index) => {
      const x = paddingLeft + index * (barWidth + barGap);
      const barHeight = (Math.min(day.duration, maxHours) / maxHours) * chartHeight;
      const y = paddingTop + chartHeight - barHeight;
      
      // Store bar position for hover detection
      this.bars.push({
        x,
        y,
        width: barWidth,
        height: barHeight,
        data: day
      });
      
      // Determine if this bar is hovered
      const isHovered = this.hoveredBar === index;
      
      // Draw bar
      if (day.duration > 0) {
        this.ctx.fillStyle = isHovered ? this.config.barHoverColor : barColor;
        this.roundRect(x, y, barWidth, barHeight, barRadius);
      } else {
        // Draw placeholder for missing data
        this.ctx.fillStyle = 'rgba(148, 163, 184, 0.1)';
        this.roundRect(x, paddingTop + chartHeight - 2, barWidth, 2, 1);
      }
    });
  },

  /**
   * Draw day labels
   */
  drawLabels(data) {
    const { paddingTop, paddingBottom, paddingLeft, paddingRight, barGap, textColor } = this.config;
    const chartWidth = this.width - paddingLeft - paddingRight;
    const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;
    
    this.ctx.fillStyle = textColor;
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    
    data.forEach((day, index) => {
      const x = paddingLeft + index * (barWidth + barGap) + barWidth / 2;
      const y = this.height - 10;
      
      this.ctx.fillText(day.label, x, y);
    });
  },

  /**
   * Draw rounded rectangle
   */
  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  },

  /**
   * Handle mouse move for tooltips
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    let found = false;
    
    this.bars.forEach((bar, index) => {
      if (x >= bar.x && x <= bar.x + bar.width &&
          y >= bar.y && y <= bar.y + bar.height) {
        if (bar.data.duration > 0) {
          this.showTooltip(event, bar.data);
          this.hoveredBar = index;
          found = true;
        }
      }
    });
    
    if (!found) {
      this.hideTooltip();
      if (this.hoveredBar !== null) {
        this.hoveredBar = null;
        this.render();
      }
    } else {
      this.render();
    }
  },

  /**
   * Handle mouse leave
   */
  handleMouseLeave() {
    this.hideTooltip();
    if (this.hoveredBar !== null) {
      this.hoveredBar = null;
      this.render();
    }
  },

  /**
   * Show tooltip
   */
  showTooltip(event, data) {
    if (!this.tooltip) return;
    
    const hours = Math.floor(data.duration);
    const minutes = Math.round((data.duration - hours) * 60);
    
    this.tooltip.innerHTML = `
      <div><strong>${data.label}</strong></div>
      <div>Sleep: ${data.sleepTime}</div>
      <div>Wake: ${data.wakeTime}</div>
      <div>Duration: ${hours}h ${minutes}m</div>
    `;
    
    const rect = this.canvas.getBoundingClientRect();
    this.tooltip.style.left = `${event.clientX - rect.left + 10}px`;
    this.tooltip.style.top = `${event.clientY - rect.top - 10}px`;
    this.tooltip.classList.add('visible');
  },

  /**
   * Hide tooltip
   */
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.classList.remove('visible');
    }
  }
};
