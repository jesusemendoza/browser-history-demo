
// Note: Can do this in python, Clojure, JS or any other language too!

// You may also decide to create class or object to wrap this - your call!

// Browser history: Build the object to support browser history.
// Browser should support URL bar, forward and back buttons

// creates the history object - use a class, record, or other structure if you want!
// stores at most `max-count` URLs in the history
// Creates a stack

// Returns the length of the stack
// Stack.prototype.size = function() {
//     return this.count;
// }

module.exports = class {
  constructor(max) {
    this.countPrev = 0;
    this.previous = {};
    this.countFwd =0;
    this.forward = {};
    this.max = max;
  }

  addToHistory (url) {

    if (this.countPrev < 50) {
      this.countPrev++;
      this.previous[this.countPrev] = url;
      //resets forward stack to zero when the user add something to history
      this.forward = {};
      this.countFwd = 0;

      return this.previous;
    } else {
      return this.restructureHistory(url);

    }
  }

  restructureHistory (url) {
    delete this.previous[1];
    for(let i = 1; i <= 50; i++) this.previous[i] = this.previous[i + 1];
    this.previous[50] = url;
    return this.previous;

  }


  popPrev () {
    // Check to see if the stack is empty
    if (this.countPrev === 0) {
      return undefined;
    }
    
    this.countPrev--;
    var result = this.previous[this.countPrev];
    delete this.previous[this.countPrev];
    return result;
  }

  popFwd () {
    // Check to see if the stack is empty
    if (this.countFwd === 0) {
      return undefined;
    }
    
    this.countFwd--;
    var result = this.forward[this.countFwd];
    delete this.forward[this.countFwd];
    return result;
  }

  goBack () {
    var newFwd = this.popPrev();
    this.forward[this.countFwd] = newFwd;
    this.countFwd++;
    return newFwd;
  }

  goForward () {
    var newPrev = this.popFwd();
    this.previous[this.countPrev] = newPrev;
    this.countPrev++;
    return newPrev;

  }

  size () {
    return this.countPrev;
  }

  clear () {
    this.countFwd = 0;
    this.countPrev = 0;
    this.previous = {};
    this.forward = {};
  }
};

// // to support â€œclick a linkâ€ on the browser
// function store-visit(store-object, url)
// // . . .
// )

// // to support â€œgo backâ€ on the browser
// function store-back-move(store-object)
// // . . .
// )

// // to support â€œgo forwardâ€ on the browser
// function store-fwd-move (store-object)
// //  . . . 
// )

// // Bonus: look up matching URLs by substring
// function lookup(store-object, substring)
// // . . . 
// )