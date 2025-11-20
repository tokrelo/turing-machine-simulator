var H5P = H5P || {};

H5P.TuringMachine = (function ($) {
  'use strict';

  /**
   * Turing Machine Constructor
   */
  function TuringMachine(params, contentId) {
    this.params = params;
    this.contentId = contentId;
    
    // Default parameters
    this.params = $.extend({
      welcomeMessage: 'Turing Machine Simulator',
      defaultInput: '',
      defaultTransitions: '',
      defaultAcceptingStates: ''
    }, this.params);

    // Machine state
    this.tape = [];
    this.headPosition = 0;
    this.currentState = 'q0';
    this.transitions = {};
    this.acceptingStates = new Set();
    this.history = [];
    this.isRunning = false;
    this.runInterval = null;
    this.halted = false;
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page
   */
  TuringMachine.prototype.attach = function ($container) {
    var self = this;
    this.$container = $container;
    
    $container.addClass('h5p-turing-machine');
    $container.html(this.createHTML());
    
    // Cache DOM elements
    this.$tapeDisplay = $container.find('.tm-tape');
    this.$stateDisplay = $container.find('.tm-state-display');
    this.$statusDisplay = $container.find('.tm-status');
    this.$inputBox = $container.find('.tm-input-box');
    this.$transitionsBox = $container.find('.tm-transitions-box');
    this.$acceptingBox = $container.find('.tm-accepting-box');
    
    // Set default values
    this.$inputBox.val(this.params.defaultInput);
    this.$transitionsBox.val(this.params.defaultTransitions);
    this.$acceptingBox.val(this.params.defaultAcceptingStates);
    
    // Attach event handlers
    this.attachEventHandlers();
    
    // Initialize machine
    this.reset();
  };

  /**
   * Create HTML structure
   */
  TuringMachine.prototype.createHTML = function () {
    return `
      <div class="tm-header">${this.params.welcomeMessage}</div>
      
      <div class="tm-status"></div>
      
      <div class="tm-tape-container">
        <div class="tm-state-display"></div>
        <div class="tm-tape"></div>
      </div>
      
      <div class="tm-controls">
        <button class="tm-button step" data-action="step-back">⏮ Step Back</button>
        <button class="tm-button" data-action="run">▶ Run</button>
        <button class="tm-button pause" data-action="pause" disabled>⏸ Pause</button>
        <button class="tm-button step" data-action="step-forward">⏭ Step Forward</button>
        <button class="tm-button" data-action="reset">🔄 Reset</button>
      </div>
      
      <div class="tm-input-section">
        <div class="tm-section-title">Input Tape:</div>
        <input type="text" class="tm-input tm-input-box" placeholder="Enter input string...">
        <div class="tm-help-text">Enter the initial content of the tape</div>
      </div>
      
      <div class="tm-transitions-section">
        <div class="tm-section-title">State Transition Function:</div>
        <textarea class="tm-textarea tm-transitions-box" placeholder="Enter transitions (one per line)&#10;Format: q0, x > q1, y, D&#10;Example: q0, 0 > q1, 1, R"></textarea>
        <div class="tm-help-text">Format: currentState, readSymbol > nextState, writeSymbol, Direction (L/R/N)</div>
      </div>
      
      <div class="tm-accepting-section">
        <div class="tm-section-title">Accepting States:</div>
        <input type="text" class="tm-input tm-accepting-box" placeholder="q_accept, qf, ...">
        <div class="tm-help-text">Comma-separated list of accepting states</div>
      </div>
      
      <div class="tm-file-operations">
        <button class="tm-file-button" data-action="save">💾 Save to File</button>
        <button class="tm-file-button" data-action="load">📂 Load from File</button>
        <input type="file" class="tm-file-input" accept=".tm">
      </div>
    `;
  };

  /**
   * Attach event handlers
   */
  TuringMachine.prototype.attachEventHandlers = function () {
    var self = this;
    
    // Control buttons
    this.$container.find('[data-action="step-back"]').click(function () {
      self.stepBack();
    });
    
    this.$container.find('[data-action="run"]').click(function () {
      self.run();
    });
    
    this.$container.find('[data-action="pause"]').click(function () {
      self.pause();
    });
    
    this.$container.find('[data-action="step-forward"]').click(function () {
      self.stepForward();
    });
    
    this.$container.find('[data-action="reset"]').click(function () {
      self.reset();
    });
    
    // File operations
    this.$container.find('[data-action="save"]').click(function () {
      self.saveToFile();
    });
    
    this.$container.find('[data-action="load"]').click(function () {
      self.$container.find('.tm-file-input').click();
    });
    
    this.$container.find('.tm-file-input').change(function (e) {
      self.loadFromFile(e.target.files[0]);
    });
    
    // Input changes should reset the machine
    this.$inputBox.on('input', function () {
      if (!self.isRunning) {
        self.reset();
      }
    });
  };

  /**
   * Parse transitions from text
   */
  TuringMachine.prototype.parseTransitions = function (text) {
    var transitions = {};
    var lines = text.split('\n');
    
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;
      
      // Parse: q0, x > q1, y, D
      var match = line.match(/^\s*(\w+)\s*,\s*(.)\s*>\s*(\w+)\s*,\s*(.)\s*,\s*([LRN])\s*$/);
      if (match) {
        var currentState = match[1];
        var readSymbol = match[2];
        var nextState = match[3];
        var writeSymbol = match[4];
        var direction = match[5];
        
        var key = currentState + ',' + readSymbol;
        transitions[key] = {
          nextState: nextState,
          writeSymbol: writeSymbol,
          direction: direction
        };
      }
    }
    
    return transitions;
  };

  /**
   * Parse accepting states
   */
  TuringMachine.prototype.parseAcceptingStates = function (text) {
    var states = new Set();
    var parts = text.split(',');
    
    for (var i = 0; i < parts.length; i++) {
      var state = parts[i].trim();
      if (state) {
        states.add(state);
      }
    }
    
    return states;
  };

  /**
   * Initialize/Reset the machine
   */
  TuringMachine.prototype.reset = function () {
    this.pause();
    
    // Parse transitions and accepting states
    this.transitions = this.parseTransitions(this.$transitionsBox.val());
    this.acceptingStates = this.parseAcceptingStates(this.$acceptingBox.val());
    
    // Initialize tape from input
    var input = this.$inputBox.val();
    this.tape = input ? input.split('') : ['_'];
    this.headPosition = 0;
    this.currentState = 'q0';
    this.history = [];
    this.halted = false;
    
    this.saveState();
    this.updateDisplay();
    this.showStatus('Machine reset', 'info');
  };

  /**
   * Save current state to history
   */
  TuringMachine.prototype.saveState = function () {
    this.history.push({
      tape: this.tape.slice(),
      headPosition: this.headPosition,
      currentState: this.currentState,
      halted: this.halted
    });
  };

  /**
   * Step forward one transition
   */
  TuringMachine.prototype.stepForward = function () {
    if (this.halted) {
      this.showStatus('Machine has halted', 'info');
      return;
    }
    
    // Extend tape if needed
    if (this.headPosition < 0) {
      this.tape.unshift('_');
      this.headPosition = 0;
    } else if (this.headPosition >= this.tape.length) {
      this.tape.push('_');
    }
    
    var currentSymbol = this.tape[this.headPosition];
    var key = this.currentState + ',' + currentSymbol;
    var transition = this.transitions[key];
    
    if (!transition) {
      this.halted = true;
      
      if (this.acceptingStates.has(this.currentState)) {
        this.showStatus('ACCEPTED - Machine halted in accepting state: ' + this.currentState, 'success');
      } else {
        this.showStatus('REJECTED - No transition defined for state "' + this.currentState + '" with symbol "' + currentSymbol + '"', 'error');
      }
      
      this.updateDisplay();
      return;
    }
    
    // Apply transition
    this.tape[this.headPosition] = transition.writeSymbol;
    this.currentState = transition.nextState;
    
    // Move head
    if (transition.direction === 'L') {
      this.headPosition--;
    } else if (transition.direction === 'R') {
      this.headPosition++;
    }
    // 'N' means no movement
    
    this.saveState();
    this.updateDisplay();
  };

  /**
   * Step back one transition
   */
  TuringMachine.prototype.stepBack = function () {
    if (this.history.length <= 1) {
      this.showStatus('Already at initial state', 'info');
      return;
    }
    
    // Remove current state
    this.history.pop();
    
    // Restore previous state
    var prevState = this.history[this.history.length - 1];
    this.tape = prevState.tape.slice();
    this.headPosition = prevState.headPosition;
    this.currentState = prevState.currentState;
    this.halted = prevState.halted;
    
    this.updateDisplay();
    this.showStatus('Stepped back', 'info');
  };

  /**
   * Run the machine continuously
   */
  TuringMachine.prototype.run = function () {
    var self = this;
    
    if (this.halted) {
      this.showStatus('Machine has already halted', 'info');
      return;
    }
    
    this.isRunning = true;
    this.$container.find('[data-action="run"]').prop('disabled', true);
    this.$container.find('[data-action="pause"]').prop('disabled', false);
    this.$container.find('[data-action="step-forward"]').prop('disabled', true);
    this.$container.find('[data-action="step-back"]').prop('disabled', true);
    this.showStatus('Running...', 'running');
    
    this.runInterval = setInterval(function () {
      self.stepForward();
      
      if (self.halted) {
        self.pause();
      }
    }, 500);
  };

  /**
   * Pause the machine
   */
  TuringMachine.prototype.pause = function () {
    this.isRunning = false;
    
    if (this.runInterval) {
      clearInterval(this.runInterval);
      this.runInterval = null;
    }
    
    this.$container.find('[data-action="run"]').prop('disabled', false);
    this.$container.find('[data-action="pause"]').prop('disabled', true);
    this.$container.find('[data-action="step-forward"]').prop('disabled', false);
    this.$container.find('[data-action="step-back"]').prop('disabled', false);
    
    if (!this.halted) {
      this.showStatus('Paused', 'info');
    }
  };

  /**
   * Update the display
   */
  TuringMachine.prototype.updateDisplay = function () {
    // Update state display
    var stateText = 'Current State: ' + this.currentState;
    if (this.halted) {
      stateText += ' (HALTED)';
    }
    this.$stateDisplay.text(stateText);
    
    // Update tape display
    var minPos = Math.min(0, this.headPosition - 5);
    var maxPos = Math.max(this.tape.length - 1, this.headPosition + 5);
    
    var html = '';
    for (var i = minPos; i <= maxPos; i++) {
      var symbol = (i >= 0 && i < this.tape.length) ? this.tape[i] : '_';
      var isActive = (i === this.headPosition);
      
      html += '<div class="tm-cell' + (isActive ? ' active' : '') + '">';
      if (isActive) {
        html += '<div class="tm-arrow">↓</div>';
        html += '<div class="tm-state-label">' + this.currentState + '</div>';
      }
      html += symbol;
      html += '</div>';
    }
    
    this.$tapeDisplay.html(html);
  };

  /**
   * Show status message
   */
  TuringMachine.prototype.showStatus = function (message, type) {
    this.$statusDisplay
      .removeClass('success error info running')
      .addClass(type)
      .text(message);
    
    var self = this;
    if (type === 'info') {
      setTimeout(function () {
        self.$statusDisplay.removeClass('info').text('');
      }, 3000);
    }
  };

  /**
   * Save machine definition to file
   */
  TuringMachine.prototype.saveToFile = function () {
    var content = '# Turing Machine Definition\n';
    content += '# Format: currentState, readSymbol > nextState, writeSymbol, Direction\n\n';
    content += '[Transitions]\n';
    content += this.$transitionsBox.val() + '\n\n';
    content += '[Accepting States]\n';
    content += this.$acceptingBox.val() + '\n\n';
    content += '[Input]\n';
    content += this.$inputBox.val() + '\n';
    
    var blob = new Blob([content], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'turing-machine.tm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showStatus('File saved', 'success');
  };

  /**
   * Load machine definition from file
   */
  TuringMachine.prototype.loadFromFile = function (file) {
    var self = this;
    
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function (e) {
      var content = e.target.result;
      
      // Parse sections
      var transitions = '';
      var acceptingStates = '';
      var input = '';
      
      var lines = content.split('\n');
      var currentSection = '';
      
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        
        if (line === '[Transitions]') {
          currentSection = 'transitions';
        } else if (line === '[Accepting States]') {
          currentSection = 'accepting';
        } else if (line === '[Input]') {
          currentSection = 'input';
        } else if (line && !line.startsWith('#')) {
          if (currentSection === 'transitions') {
            transitions += line + '\n';
          } else if (currentSection === 'accepting') {
            acceptingStates += line;
          } else if (currentSection === 'input') {
            input += line;
          }
        }
      }
      
      // Update UI
      self.$transitionsBox.val(transitions.trim());
      self.$acceptingBox.val(acceptingStates.trim());
      self.$inputBox.val(input.trim());
      
      self.reset();
      self.showStatus('File loaded successfully', 'success');
    };
    
    reader.readAsText(file);
  };

  return TuringMachine;
})(H5P.jQuery);
