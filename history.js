
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

class History {
  constructor(max) {
    this.countPrev = 0;
    this.previous = {};
    this.countFwd =0;
    this.forward = {};
    this.max = max;
  }

  addToHistory (value) {

    if (this.countPrev <= 50) {
      this.previous[this.countPrev] = value;
      this.forward = {};
      this.countPrev++;
      return this;
    } else {
        console.log('over 50');
    }
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
}

var history = new History(50);
history.addToHistory('A');
history.addToHistory('B');
history.addToHistory('C');
history.addToHistory('D');

console.log (history, ': before ');

history.goBack();
history.goBack();
history.goBack();
history.goBack(),
console.log (history, ':previous');
history.goForward();


console.log(history, ': forward');

console.log(history, 'add new his');



// history.push('A')
// history.push('B')
// history.push('C')
// history.push('D')

// history.pop()
// console.log(history, ': after')
// console.log(history.storage[0], ': count')


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