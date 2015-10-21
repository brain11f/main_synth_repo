// requires instrumentModule import first!!!

var ctx = ctx || new AudioContext();
var scale = generateScale(440); 

var state = {

  keys: {}, // keys currently held down
  pads: [], // pads in write mode

};

var Instrument = function(state) {

  this.el = document.getElementById('instrument');
  this.keys = [];
  this.keyElements = this.el.querySelectorAll('div');
  for (var i=0; i<this.keyElements.length; i++) {
    this.keys[i] = new Key(ctx, this.keyElements[i], 'A4', new Generator(ctx,scale[i]), state); 
  }
  state.keys = this.keys;

};

var Key = function(ctx, el, note, soundSource, state) {

  this.el = el;
  this.note = note;
  this.soundSource = soundSource; 

  this.checkPads = function() {
    // read active pads from state
  };


  this.el.addEventListener('touchstart', function(){

    console.log('BEFORE:', state);
    state.keys[this.soundSource.noteName] = {
      id: this.el.id.split('-')[1],
      startTime: new Date().getTime(),
      duration: null,
    };

    this.soundSource.start();

  }.bind(this));

  this.el.addEventListener('touchend', function(){
    state.keys[this.soundSource.noteName].duration = 
        state.keys[this.soundSource.noteName].startTime - new Date().getTime();

    this.soundSource.stop();
    console.log('AFTER:', state);

  }.bind(this));
   
};

var Sequencer = function(state) {

  // cache dom
  this.el = document.getElementById('sequencer');
  this.stopButton = document.getElementById('stop');
  this.playButton = document.getElementById('play');
  this.pad_elements = this.el.querySelectorAll('div');

  // model initialization
  this.pads = [];
  for (var i = 0; i < this.pad_elements.length; i++) {
    var padId = this.pad_elements[i].id.split('-')[1];
    this.pads[i] = new Pad(state, padId);
  }
  state.pads = this.pads;
  console.log(state.pads);

  // event Handlers
  var toggleWrite = function(e) {
    if (e.target.className.split(' ')[0] === 'pad') {
      var padId = e.target.id.split('-')[1];
      this.pads[padIndex].writeMode = !this.pads[padIndex].writeMode;
    }
  };
  var getPlayedNotes = function() {

  };

  this.el.addEventListener('touchstart', toggleWrite);
  this.el.addEventListener('touchend', getPlayedNotes);

};

var Pad = function(state,id) {
  this.sounds = [];
  this.id = id;
  this.writeMode = false;
};

var instrument = new Instrument(state);
var sequencer = new Sequencer(state);
