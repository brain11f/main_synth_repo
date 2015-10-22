var Generator = function(ctx, frequency) {
  this.patchName = 'spaceBass';
  this.noteName = 'A0';
  this.osc = ctx.createOscillator();
  this.osc.frequency.value = frequency;
  this.gainNode = ctx.createGain();
  this.osc.connect(this.gainNode);
  this.gainNode.connect(ctx.destination);
  this.gainNode.gain.value = 0;
  this.osc.start(0);
};

Generator.prototype.start = function() {
  this.gainNode.gain.value = 1;
  this.osc.start(0);
};

Generator.prototype.stop = function() {
  this.gainNode.gain.value = 0;
};

Generator.prototype.playFor = function(duration) {
  this.start();
  var self = this;
  setTimeout(function(){
      self.stop();
  }, duration);

};


Generator.prototype.export = function() {
  window.synthExport = {
    patchName : this.patchName, 
    freqRange: {
        min: 440,
        max: 880
    },
    src: 'oscillator',
    processing: ['gain'], 

  };
};
