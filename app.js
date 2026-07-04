/* ============================================================
   MOTO-MAINTAIN | app.js
   Vanilla JavaScript SPA — No frameworks
   LocalStorage-backed motorcycle maintenance tracker
   ============================================================ */

'use strict';

// ── ============================================================
//    DATA SCHEMA — Bike models with service intervals & costs
// ── ============================================================
const BIKE_DATA = {
  bikes: [
    {
      id: 'streetfighter_160',
      name: '2016 Streetfighter 160cc',
      shortName: 'Streetfighter 160',
      engine: '160cc',
      type: 'Streetfighter',
      avatar: '🏍️',
      serviceIntervals: [
        {
          id: 'oil_change',
          task: 'Engine Oil Change',
          intervalKm: 3000,
          diyPartsCostINR: 450,
          scLaborCostINR: 200,
          scPartsCostINR: 500,
          priority: 'critical',
          icon: '🛢️',
          tip: 'Use 10W-30 mineral oil or 10W-40 semi-synthetic.'
        },
        {
          id: 'air_filter',
          task: 'Air Filter Cleaning',
          intervalKm: 5000,
          diyPartsCostINR: 0,
          scLaborCostINR: 100,
          scPartsCostINR: 0,
          priority: 'high',
          icon: '💨',
          tip: 'Clean with compressed air. Replace if torn.'
        },
        {
          id: 'chain_slack',
          task: 'Chain Slack Adjustment',
          intervalKm: 1000,
          diyPartsCostINR: 0,
          scLaborCostINR: 80,
          scPartsCostINR: 0,
          priority: 'high',
          icon: '⛓️',
          tip: '20–30mm free play at mid-point of chain.'
        },
        {
          id: 'chain_lube',
          task: 'Chain Lubrication',
          intervalKm: 500,
          diyPartsCostINR: 80,
          scLaborCostINR: 60,
          scPartsCostINR: 0,
          priority: 'medium',
          icon: '🔗',
          tip: 'Apply chain lube after every wash or 500 km.'
        },
        {
          id: 'spark_plug',
          task: 'Spark Plug Replacement',
          intervalKm: 10000,
          diyPartsCostINR: 180,
          scLaborCostINR: 100,
          scPartsCostINR: 200,
          priority: 'medium',
          icon: '⚡',
          tip: 'NGK or Bosch iridium plug recommended.'
        },
        {
          id: 'brake_pad',
          task: 'Brake Pad Inspection',
          intervalKm: 5000,
          diyPartsCostINR: 0,
          scLaborCostINR: 100,
          scPartsCostINR: 0,
          priority: 'high',
          icon: '🛑',
          tip: 'Replace if pad thickness is below 2mm.'
        },
        {
          id: 'coolant',
          task: 'Coolant Check / Top-Up',
          intervalKm: 10000,
          diyPartsCostINR: 120,
          scLaborCostINR: 80,
          scPartsCostINR: 150,
          priority: 'medium',
          icon: '🌡️',
          tip: 'Use OEM-grade coolant mixed with distilled water (50:50).'
        },
        {
          id: 'valve_clearance',
          task: 'Valve Clearance Check',
          intervalKm: 20000,
          diyPartsCostINR: 0,
          scLaborCostINR: 500,
          scPartsCostINR: 0,
          priority: 'critical',
          icon: '🔩',
          tip: 'Inlet: 0.10–0.15mm | Exhaust: 0.17–0.22mm (cold engine).'
        },
        {
          id: 'tyre_pressure',
          task: 'Tyre Pressure Check',
          intervalKm: 500,
          diyPartsCostINR: 0,
          scLaborCostINR: 30,
          scPartsCostINR: 0,
          priority: 'medium',
          icon: '🔴',
          tip: 'Front: 29 psi | Rear: 32 psi (solo rider, cold).'
        },
        {
          id: 'bike_wash',
          task: 'Full Bike Wash & Lube',
          intervalKm: 1000,
          diyPartsCostINR: 50,
          scLaborCostINR: 250,
          scPartsCostINR: 0,
          priority: 'low',
          icon: '🪣',
          tip: 'Avoid pressure washing directly on bearings and seals.'
        }
      ]
    },
    {
      id: 'cruiser_350',
      name: '350cc Royal Cruiser',
      shortName: 'Royal Cruiser 350',
      engine: '350cc',
      type: 'Cruiser',
      avatar: '🏕️',
      serviceIntervals: [
        {
          id: 'oil_change',
          task: 'Engine Oil Change',
          intervalKm: 5000,
          diyPartsCostINR: 850,
          scLaborCostINR: 300,
          scPartsCostINR: 950,
          priority: 'critical',
          icon: '🛢️',
          tip: 'Use 20W-50 mineral or 15W-50 semi-synthetic (API SL/SM).'
        },
        {
          id: 'oil_filter',
          task: 'Oil Filter Replacement',
          intervalKm: 10000,
          diyPartsCostINR: 220,
          scLaborCostINR: 150,
          scPartsCostINR: 280,
          priority: 'critical',
          icon: '🔧',
          tip: 'Use genuine or OEM-equivalent filter. Torque to 17 Nm.'
        },
        {
          id: 'air_filter',
          task: 'Air Filter Replacement',
          intervalKm: 10000,
          diyPartsCostINR: 350,
          scLaborCostINR: 150,
          scPartsCostINR: 420,
          priority: 'high',
          icon: '💨',
          tip: 'Replace paper element. Do not oil foam inserts on stock filter.'
        },
        {
          id: 'chain_slack',
          task: 'Chain Slack Adjustment',
          intervalKm: 2500,
          diyPartsCostINR: 0,
          scLaborCostINR: 100,
          scPartsCostINR: 0,
          priority: 'high',
          icon: '⛓️',
          tip: '30–40mm free play at mid-point of chain (check owner manual).'
        },
        {
          id: 'chain_lube',
          task: 'Chain Lubrication',
          intervalKm: 500,
          diyPartsCostINR: 120,
          scLaborCostINR: 80,
          scPartsCostINR: 0,
          priority: 'medium',
          icon: '🔗',
          tip: 'Apply motorcycle-specific O-ring safe chain lube.'
        },
        {
          id: 'spark_plug',
          task: 'Spark Plug Replacement',
          intervalKm: 10000,
          diyPartsCostINR: 320,
          scLaborCostINR: 120,
          scPartsCostINR: 380,
          priority: 'medium',
          icon: '⚡',
          tip: 'Genuine NGK plug (part: DCPR8E). Gap: 0.8–0.9mm.'
        },
        {
          id: 'brake_fluid',
          task: 'Brake Fluid Check',
          intervalKm: 10000,
          diyPartsCostINR: 180,
          scLaborCostINR: 100,
          scPartsCostINR: 250,
          priority: 'high',
          icon: '🛑',
          tip: 'Use DOT 4 brake fluid. Flush if fluid is dark/cloudy.'
        },
        {
          id: 'fork_oil',
          task: 'Front Fork Oil Change',
          intervalKm: 20000,
          diyPartsCostINR: 400,
          scLaborCostINR: 600,
          scPartsCostINR: 500,
          priority: 'medium',
          icon: '🔄',
          tip: 'Use 10W fork oil. Fill level: 110mm from top of tube (uncompressed).'
        },
        {
          id: 'valve_clearance',
          task: 'Valve Clearance Check',
          intervalKm: 20000,
          diyPartsCostINR: 0,
          scLaborCostINR: 800,
          scPartsCostINR: 0,
          priority: 'critical',
          icon: '🔩',
          tip: 'Inlet: 0.08–0.12mm | Exhaust: 0.12–0.16mm (cold engine).'
        },
        {
          id: 'tyre_pressure',
          task: 'Tyre Pressure Check',
          intervalKm: 500,
          diyPartsCostINR: 0,
          scLaborCostINR: 30,
          scPartsCostINR: 0,
          priority: 'medium',
          icon: '🔴',
          tip: 'Front: 26 psi | Rear: 32 psi (solo rider, cold tyres).'
        },
        {
          id: 'battery',
          task: 'Battery Terminal Cleaning',
          intervalKm: 5000,
          diyPartsCostINR: 30,
          scLaborCostINR: 100,
          scPartsCostINR: 0,
          priority: 'low',
          icon: '🔋',
          tip: 'Clean with baking soda & water. Apply petroleum jelly on terminals.'
        }
      ]
    }
  ]
};

// ── ============================================================
//    LOCALSTORAGE HELPERS
// ── ============================================================
const LS_KEY_GARAGE   = 'motomaintain_garage';
const LS_KEY_SERVICE  = 'motomaintain_service_records';
const LS_KEY_LOG      = 'motomaintain_log';

const Storage = {
  getGarage()         { return JSON.parse(localStorage.getItem(LS_KEY_GARAGE)   || 'null'); },
  saveGarage(data)    { localStorage.setItem(LS_KEY_GARAGE, JSON.stringify(data)); },
  getRecords()        { return JSON.parse(localStorage.getItem(LS_KEY_SERVICE)  || '{}'); },
  saveRecords(data)   { localStorage.setItem(LS_KEY_SERVICE, JSON.stringify(data)); },
  getLog()            { return JSON.parse(localStorage.getItem(LS_KEY_LOG)      || '[]'); },
  saveLog(data)       { localStorage.setItem(LS_KEY_LOG, JSON.stringify(data)); },
  clearAll() {
    localStorage.removeItem(LS_KEY_GARAGE);
    localStorage.removeItem(LS_KEY_SERVICE);
    localStorage.removeItem(LS_KEY_LOG);
  }
};

// ── ============================================================
//    UTILITY FUNCTIONS
// ── ============================================================
const Utils = {
  /** Format number as Indian Rupee */
  formatINR(amount) {
    if (amount === 0) return '₹0';
    return '₹' + amount.toLocaleString('en-IN');
  },

  /** Format number with commas (km) */
  formatKm(km) {
    return Number(km).toLocaleString('en-IN');
  },

  /** Format a date to readable string */
  formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  /** Get bike data object by ID */
  getBikeById(id) {
    return BIKE_DATA.bikes.find(b => b.id === id) || null;
  },

  /** Calculate task status based on current odo, last service, interval */
  getTaskStatus(currentOdo, lastServiceOdo, intervalKm) {
    const kmSinceService = currentOdo - lastServiceOdo;
    const pct = kmSinceService / intervalKm;
    if (pct >= 1.0)  return 'overdue';
    if (pct >= 0.80) return 'due-soon';
    return 'ok';
  },

  /** Progress percentage (capped at 100) */
  getProgressPct(currentOdo, lastServiceOdo, intervalKm) {
    const kmSinceService = currentOdo - lastServiceOdo;
    return Math.min(100, Math.round((kmSinceService / intervalKm) * 100));
  },

  /** Km remaining until next service (negative means overdue) */
  getKmRemaining(currentOdo, lastServiceOdo, intervalKm) {
    const nextDueAt = lastServiceOdo + intervalKm;
    return nextDueAt - currentOdo;
  },

  /** Next due odometer reading */
  getNextDueOdo(lastServiceOdo, intervalKm) {
    return lastServiceOdo + intervalKm;
  },

  /** Sort order: overdue → due-soon → ok */
  statusSortOrder(status) {
    return { 'overdue': 0, 'due-soon': 1, 'ok': 2 }[status] ?? 3;
  }
};

// ── ============================================================
//    TOAST MODULE
// ── ============================================================
const Toast = {
  _timer: null,
  show(message, type = 'success', duration = 3000) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.className = `toast ${type === 'danger' ? 'danger' : ''}`;
    el.classList.remove('hidden');
    clearTimeout(this._timer);
    this._timer = setTimeout(() => el.classList.add('hidden'), duration);
  }
};

// ── ============================================================
//    MODAL MODULE
// ── ============================================================
const Modal = {
  show(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      // Focus first input or button
      setTimeout(() => {
        const inp = el.querySelector('input, button');
        if (inp) inp.focus();
      }, 50);
    }
  },
  hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }
};

// ── ============================================================
//    GARAGE MODULE — Setup screen & bike registration
// ── ============================================================
const GarageModule = {
  selectedBikeId: null,

  init() {
    this.renderBikeSelector();
    this.bindEvents();
  },

  renderBikeSelector() {
    const grid = document.getElementById('bike-selector-grid');
    grid.innerHTML = BIKE_DATA.bikes.map(bike => `
      <div class="bike-option-card" 
           data-bike-id="${bike.id}" 
           role="radio" 
           aria-checked="false"
           tabindex="0"
           aria-label="Select ${bike.name}">
        <span class="bike-opt-icon" aria-hidden="true">${bike.avatar}</span>
        <span class="bike-opt-name">${bike.name}</span>
        <span class="bike-opt-engine">${bike.engine} &bull; ${bike.type}</span>
      </div>
    `).join('');

    // Click handlers
    grid.querySelectorAll('.bike-option-card').forEach(card => {
      card.addEventListener('click', () => this.selectBike(card.dataset.bikeId));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectBike(card.dataset.bikeId);
        }
      });
    });
  },

  selectBike(bikeId) {
    this.selectedBikeId = bikeId;
    document.querySelectorAll('.bike-option-card').forEach(c => {
      const isSelected = c.dataset.bikeId === bikeId;
      c.classList.toggle('selected', isSelected);
      c.setAttribute('aria-checked', String(isSelected));
    });
    this.updateStartButton();
  },

  bindEvents() {
    const odoInput = document.getElementById('odometer-input');
    odoInput.addEventListener('input', () => this.updateStartButton());

    document.getElementById('btn-start-tracking').addEventListener('click', () => {
      this.startTracking();
    });
  },

  updateStartButton() {
    const odo = parseInt(document.getElementById('odometer-input').value, 10);
    const btn = document.getElementById('btn-start-tracking');
    btn.disabled = !(this.selectedBikeId && !isNaN(odo) && odo >= 0);
  },

  startTracking() {
    const odo = parseInt(document.getElementById('odometer-input').value, 10);
    const errEl = document.getElementById('setup-error');

    if (!this.selectedBikeId) {
      errEl.textContent = 'Please select your bike model.';
      errEl.classList.remove('hidden');
      return;
    }
    if (isNaN(odo) || odo < 0) {
      errEl.textContent = 'Please enter a valid odometer reading.';
      errEl.classList.remove('hidden');
      return;
    }

    errEl.classList.add('hidden');

    const garage = {
      bikeId: this.selectedBikeId,
      odometer: odo,
      setupDate: new Date().toISOString()
    };

    Storage.saveGarage(garage);

    // Initialize all service records at 0
    const bike = Utils.getBikeById(this.selectedBikeId);
    const records = {};
    bike.serviceIntervals.forEach(si => {
      records[si.id] = { lastServiceOdo: 0, lastServiceDate: null };
    });
    Storage.saveRecords(records);

    App.launchDashboard(garage);
  }
};

// ── ============================================================
//    TRACKER MODULE — Service interval calculations & rendering
// ── ============================================================
const TrackerModule = {
  bike: null,
  garage: null,

  init(garage) {
    this.garage = garage;
    this.bike = Utils.getBikeById(garage.bikeId);
    this.renderBikeHeader();
    this.renderTasks();
    this.renderStatusSummary();
  },

  renderBikeHeader() {
    const g = this.garage;
    const b = this.bike;
    document.getElementById('bike-avatar').textContent = b.avatar;
    document.getElementById('bike-name-display').textContent = b.name;
    document.getElementById('bike-engine-display').textContent = b.engine;
    document.getElementById('bike-type-display').textContent = b.type;
    document.getElementById('current-odo-display').textContent = Utils.formatKm(g.odometer);
  },

  getTasksWithStatus() {
    const records = Storage.getRecords();
    const odo = this.garage.odometer;

    return this.bike.serviceIntervals.map(si => {
      const record = records[si.id] || { lastServiceOdo: 0, lastServiceDate: null };
      const status = Utils.getTaskStatus(odo, record.lastServiceOdo, si.intervalKm);
      const pct = Utils.getProgressPct(odo, record.lastServiceOdo, si.intervalKm);
      const kmRemaining = Utils.getKmRemaining(odo, record.lastServiceOdo, si.intervalKm);
      const nextDueOdo = Utils.getNextDueOdo(record.lastServiceOdo, si.intervalKm);
      return { ...si, status, pct, kmRemaining, nextDueOdo, lastServiceOdo: record.lastServiceOdo, lastServiceDate: record.lastServiceDate };
    }).sort((a, b) => Utils.statusSortOrder(a.status) - Utils.statusSortOrder(b.status));
  },

  renderStatusSummary() {
    const tasks = this.getTasksWithStatus();
    const counts = { overdue: 0, 'due-soon': 0, ok: 0 };
    tasks.forEach(t => { counts[t.status] = (counts[t.status] || 0) + 1; });
    document.getElementById('count-overdue').textContent = counts['overdue'];
    document.getElementById('count-due-soon').textContent = counts['due-soon'];
    document.getElementById('count-ok').textContent = counts['ok'];
  },

  renderTasks() {
    const tasks = this.getTasksWithStatus();
    const grid = document.getElementById('tasks-grid');

    if (tasks.length === 0) {
      grid.innerHTML = `<div class="log-empty"><span class="empty-icon">✅</span><p>No tasks to show.</p></div>`;
      return;
    }

    grid.innerHTML = tasks.map((t, i) => this.buildTaskCard(t, i)).join('');

    // Bind Mark as Done buttons
    grid.querySelectorAll('.btn-mark-done').forEach(btn => {
      btn.addEventListener('click', () => this.markAsDone(btn.dataset.taskId));
    });
  },

  buildTaskCard(t, index) {
    const statusLabel = {
      'overdue':  'OVERDUE',
      'due-soon': 'DUE SOON',
      'ok':       'OK'
    }[t.status];

    const badgeClass = {
      'overdue':  'badge-overdue',
      'due-soon': 'badge-due-soon',
      'ok':       'badge-ok'
    }[t.status];

    const progressClass = t.status;

    const kmRemainingText = t.kmRemaining <= 0
      ? `${Utils.formatKm(Math.abs(t.kmRemaining))} km overdue`
      : `${Utils.formatKm(t.kmRemaining)} km remaining`;

    const lastServiceText = t.lastServiceDate
      ? `${Utils.formatKm(t.lastServiceOdo)} km (${Utils.formatDate(t.lastServiceDate)})`
      : t.lastServiceOdo > 0
        ? `${Utils.formatKm(t.lastServiceOdo)} km`
        : 'Not yet recorded';

    const priorityDotClass = {
      critical: 'dot-critical',
      high:     'dot-high',
      medium:   'dot-medium',
      low:      'dot-low'
    }[t.priority] || 'dot-medium';

    return `
      <div class="task-card status-${t.status}" role="listitem" 
           style="animation-delay: ${index * 0.05}s" 
           id="task-card-${t.id}"
           aria-label="${t.task} — ${statusLabel}">
        <div class="task-card-header">
          <span class="task-name">
            <span class="priority-dot ${priorityDotClass}" title="${t.priority} priority" aria-hidden="true"></span>
            ${t.icon} ${t.task}
          </span>
          <span class="task-badge ${badgeClass}" aria-label="Status: ${statusLabel}">${statusLabel}</span>
        </div>
        <div class="task-progress-wrap">
          <div class="task-meta-row">
            <span>Every <span class="meta-val">${Utils.formatKm(t.intervalKm)} km</span></span>
            <span class="meta-val">${t.pct}%</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="${t.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${t.task} progress">
            <div class="progress-fill ${progressClass}" style="width: ${Math.min(t.pct, 100)}%"></div>
          </div>
        </div>
        <div class="task-meta-row" style="margin-top:10px; font-size:0.68rem;">
          <span>Last done: <span class="meta-val" style="font-size:0.68rem;">${lastServiceText}</span></span>
        </div>
        <div class="task-card-footer">
          <div class="task-next-due">
            <span>Next: </span>
            <strong>${Utils.formatKm(t.nextDueOdo)} km</strong>
            <span style="display:block; font-size:0.65rem; color:var(--text-muted); margin-top:2px;">${kmRemainingText}</span>
          </div>
          <button class="btn-mark-done" data-task-id="${t.id}" aria-label="Mark ${t.task} as done at current odometer ${Utils.formatKm(this.garage.odometer)} km">
            ✓ MARK DONE
          </button>
        </div>
        ${t.tip ? `<div style="margin-top:12px; padding:10px; background:rgba(57,255,20,0.04); border:1px solid rgba(57,255,20,0.12); border-radius:6px; font-size:0.7rem; color:var(--text-muted); line-height:1.5;">
          💡 ${t.tip}
        </div>` : ''}
      </div>
    `;
  },

  markAsDone(taskId) {
    const odo = this.garage.odometer;
    const records = Storage.getRecords();
    records[taskId] = {
      lastServiceOdo: odo,
      lastServiceDate: new Date().toISOString()
    };
    Storage.saveRecords(records);

    // Add to log
    const task = this.bike.serviceIntervals.find(si => si.id === taskId);
    const log = Storage.getLog();
    log.unshift({
      taskId,
      taskName: task ? task.task : taskId,
      taskIcon: task ? task.icon : '🔧',
      odometer: odo,
      date: new Date().toISOString()
    });
    Storage.saveLog(log);

    // Flash animation
    const card = document.getElementById(`task-card-${taskId}`);
    if (card) card.classList.add('done-flash');

    // Re-render tracker and summary
    this.renderTasks();
    this.renderStatusSummary();

    // Refresh calculator if visible
    CalculatorModule.render();

    // Refresh log if visible
    LogModule.render();

    Toast.show(`✓ ${task ? task.task : 'Task'} marked as done at ${Utils.formatKm(odo)} km`);
  },

  updateOdometer(newOdo) {
    this.garage.odometer = newOdo;
    Storage.saveGarage(this.garage);
    this.renderBikeHeader();
    this.renderTasks();
    this.renderStatusSummary();
    CalculatorModule.render();
    Toast.show(`Odometer updated to ${Utils.formatKm(newOdo)} km`);
  }
};

// ── ============================================================
//    CALCULATOR MODULE — DIY vs Service Center cost comparison
// ── ============================================================
const CalculatorModule = {
  showAll: false,
  checkedTasks: new Set(),

  init(garage) {
    this.garage = garage;
    this.bike = Utils.getBikeById(garage.bikeId);
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('toggle-all-tasks').addEventListener('change', e => {
      this.showAll = e.target.checked;
      document.getElementById('filter-hint').textContent = this.showAll
        ? 'Showing all service tasks'
        : 'Showing due & overdue tasks only';
      this.render();
    });
  },

  getFilteredTasks() {
    const records = Storage.getRecords();
    const odo = this.garage.odometer;

    return this.bike.serviceIntervals
      .map(si => {
        const record = records[si.id] || { lastServiceOdo: 0 };
        const status = Utils.getTaskStatus(odo, record.lastServiceOdo, si.intervalKm);
        return { ...si, status };
      })
      .filter(t => this.showAll || t.status === 'overdue' || t.status === 'due-soon')
      .sort((a, b) => Utils.statusSortOrder(a.status) - Utils.statusSortOrder(b.status));
  },

  render() {
    const tasks = this.getFilteredTasks();
    const tbody = document.getElementById('cost-table-body');
    const tfoot = document.getElementById('cost-table-foot');
    const emptyEl = document.getElementById('cost-table-empty');
    const tableEl = document.getElementById('cost-table');

    if (tasks.length === 0) {
      tableEl.classList.add('hidden');
      emptyEl.classList.remove('hidden');
      this.updateSavingsMeter(0, 0);
      return;
    }

    tableEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');

    // Initialize checked state for new tasks
    tasks.forEach(t => {
      if (!this.checkedTasks.has(t.id)) this.checkedTasks.add(t.id);
    });

    tbody.innerHTML = tasks.map(t => {
      const scTotal = t.scLaborCostINR + t.scPartsCostINR;
      const diySave = scTotal - t.diyPartsCostINR;
      const isChecked = this.checkedTasks.has(t.id);
      const statusLabel = { 'overdue': 'OVERDUE', 'due-soon': 'DUE SOON', 'ok': 'OK' }[t.status];
      const badgeClass  = { 'overdue': 'badge-overdue', 'due-soon': 'badge-due-soon', 'ok': 'badge-ok' }[t.status];

      return `
        <tr class="${!isChecked ? 'excluded' : ''}" id="calc-row-${t.id}">
          <td>
            <input type="checkbox" class="table-check" 
                   data-task-id="${t.id}" 
                   ${isChecked ? 'checked' : ''}
                   aria-label="Include ${t.task} in total calculation" />
          </td>
          <td><span class="td-task-name">${t.icon} ${t.task}</span></td>
          <td><span class="task-badge ${badgeClass}" style="font-size:0.52rem;">${statusLabel}</span></td>
          <td class="td-diy">${Utils.formatINR(t.diyPartsCostINR)}</td>
          <td class="td-sc">${Utils.formatINR(scTotal)}</td>
          <td class="td-save">${diySave > 0 ? Utils.formatINR(diySave) : '—'}</td>
        </tr>
      `;
    }).join('');

    // Bind checkboxes
    tbody.querySelectorAll('.table-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const taskId = cb.dataset.taskId;
        if (cb.checked) {
          this.checkedTasks.add(taskId);
        } else {
          this.checkedTasks.delete(taskId);
        }
        const row = document.getElementById(`calc-row-${taskId}`);
        if (row) row.classList.toggle('excluded', !cb.checked);
        this.updateTotals(tasks);
      });
    });

    this.updateTotals(tasks);
  },

  updateTotals(tasks) {
    let totalDiy = 0;
    let totalSc = 0;

    tasks.forEach(t => {
      if (this.checkedTasks.has(t.id)) {
        totalDiy += t.diyPartsCostINR;
        totalSc  += t.scLaborCostINR + t.scPartsCostINR;
      }
    });

    const totalSaved = totalSc - totalDiy;

    document.getElementById('cost-table-foot').innerHTML = `
      <tr>
        <td colspan="3" class="td-total-label">SELECTED TOTALS</td>
        <td class="td-total-diy">${Utils.formatINR(totalDiy)}</td>
        <td class="td-total-sc">${Utils.formatINR(totalSc)}</td>
        <td class="td-total-save">${totalSaved > 0 ? Utils.formatINR(totalSaved) : '—'}</td>
      </tr>
    `;

    this.updateSavingsMeter(totalDiy, totalSc);
  },

  updateSavingsMeter(diy, sc) {
    const saved   = Math.max(0, sc - diy);
    const savePct = sc > 0 ? Math.round((saved / sc) * 100) : 0;

    document.getElementById('savings-pct').textContent = `${savePct}%`;
    document.getElementById('total-diy').textContent   = Utils.formatINR(diy);
    document.getElementById('total-sc').textContent    = Utils.formatINR(sc);
    document.getElementById('total-saved').textContent = Utils.formatINR(saved);

    const fillEl  = document.getElementById('savings-bar-fill');
    const trackEl = document.getElementById('savings-bar-track');
    fillEl.style.width = `${savePct}%`;
    trackEl.setAttribute('aria-valuenow', savePct);
  }
};

// ── ============================================================
//    LOG MODULE — Service history
// ── ============================================================
const LogModule = {
  init() {
    this.render();
    document.getElementById('btn-clear-log').addEventListener('click', () => {
      if (confirm('Clear all maintenance history? This cannot be undone.')) {
        Storage.saveLog([]);
        this.render();
        Toast.show('Maintenance log cleared.', 'danger');
      }
    });
  },

  render() {
    const log     = Storage.getLog();
    const listEl  = document.getElementById('log-list');
    const emptyEl = document.getElementById('log-empty');

    if (!log || log.length === 0) {
      listEl.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }

    emptyEl.classList.add('hidden');
    listEl.innerHTML = log.map((entry, i) => `
      <div class="log-entry" role="listitem" style="animation-delay: ${i * 0.04}s">
        <div class="log-icon" aria-hidden="true">${entry.taskIcon || '🔧'}</div>
        <div>
          <div class="log-entry-name">${entry.taskName}</div>
          <div class="log-entry-meta">${Utils.formatDate(entry.date)}</div>
        </div>
        <div class="log-entry-right">
          <span class="log-odo">${Utils.formatKm(entry.odometer)}</span>
          <span class="log-odo-label">KM</span>
        </div>
      </div>
    `).join('');
  }
};

// ── ============================================================
//    NAVIGATION MODULE — Tab switching
// ── ============================================================
const NavModule = {
  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });
  },

  switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    // Update panels
    document.querySelectorAll('.tab-content').forEach(panel => {
      const isActive = panel.id === `tab-content-${tabId}`;
      panel.classList.toggle('active', isActive);
    });

    // Refresh calculator when switching to it
    if (tabId === 'calculator') CalculatorModule.render();
    if (tabId === 'log') LogModule.render();
  }
};

// ── ============================================================
//    ODOMETER UPDATE MODAL
// ── ============================================================
const OdoModal = {
  init() {
    document.getElementById('btn-update-odo').addEventListener('click', () => {
      document.getElementById('modal-odo-input').value = '';
      document.getElementById('modal-error').classList.add('hidden');
      Modal.show('odo-modal');
    });

    document.getElementById('btn-modal-cancel').addEventListener('click', () => {
      Modal.hide('odo-modal');
    });

    document.getElementById('btn-modal-save').addEventListener('click', () => {
      this.save();
    });

    document.getElementById('modal-odo-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') this.save();
    });

    // Close on overlay click
    document.getElementById('odo-modal').addEventListener('click', e => {
      if (e.target === e.currentTarget) Modal.hide('odo-modal');
    });
  },

  save() {
    const newOdo = parseInt(document.getElementById('modal-odo-input').value, 10);
    const errEl  = document.getElementById('modal-error');
    const curOdo = TrackerModule.garage ? TrackerModule.garage.odometer : 0;

    if (isNaN(newOdo) || newOdo < 0) {
      errEl.textContent = 'Please enter a valid odometer reading.';
      errEl.classList.remove('hidden');
      return;
    }

    if (newOdo < curOdo) {
      errEl.textContent = `New reading (${Utils.formatKm(newOdo)} km) cannot be less than current (${Utils.formatKm(curOdo)} km).`;
      errEl.classList.remove('hidden');
      return;
    }

    errEl.classList.add('hidden');
    Modal.hide('odo-modal');
    TrackerModule.updateOdometer(newOdo);
  }
};

// ── ============================================================
//    RESET MODAL
// ── ============================================================
const ResetModal = {
  init() {
    document.getElementById('btn-reset-garage').addEventListener('click', () => {
      Modal.show('reset-modal');
    });

    document.getElementById('btn-reset-cancel').addEventListener('click', () => {
      Modal.hide('reset-modal');
    });

    document.getElementById('btn-reset-confirm').addEventListener('click', () => {
      Storage.clearAll();
      Modal.hide('reset-modal');
      App.init();
    });

    document.getElementById('reset-modal').addEventListener('click', e => {
      if (e.target === e.currentTarget) Modal.hide('reset-modal');
    });
  }
};

// ── ============================================================
//    APP — Main controller
// ── ============================================================
const App = {
  _globalListenersAttached: false,

  init() {
    const garage = Storage.getGarage();

    if (garage && Utils.getBikeById(garage.bikeId)) {
      // Returning user — go straight to dashboard
      this.launchDashboard(garage);
    } else {
      // New user — show setup screen
      this.showSetup();
    }
  },

  showSetup() {
    // Reset garage module selection state
    GarageModule.selectedBikeId = null;
    document.getElementById('garage-setup').classList.add('active');
    document.getElementById('app-screen').classList.remove('active');
    GarageModule.init();
  },

  launchDashboard(garage) {
    document.getElementById('garage-setup').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');

    // Attach global listeners only once (prevents duplicates on reset)
    if (!this._globalListenersAttached) {
      NavModule.init();
      OdoModal.init();
      ResetModal.init();
      this._globalListenersAttached = true;
    }

    // Always re-init data-driven modules
    NavModule.switchTab('tracker');
    TrackerModule.init(garage);
    CalculatorModule.init(garage);
    LogModule.init();
  }
};

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
