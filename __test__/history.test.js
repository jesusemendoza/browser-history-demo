'use strict';

const data = require('./data');
const History = require('../lib/history');
const faker = require('faker');
require('jest');

describe('History Module', function() {
  var history = new History(50);

  describe('Valid', function() {
    //generates fake urls to add to history object  
    for(let i = 0 ; i < 4; i++) history.addToHistory(faker.internet.url());
    

    it('should read the correct amount of items in each object after 4 items were added to history', function() { 
      console.log(history, ': right before first test');
      expect(history.countPrev).toEqual(4);
      expect(history.countFwd).toEqual(0);
    });

    it('should read the correct amount of items in each objec after 4 go back calls', function() {
      for (let i = 0; i< 4; i++) history.goBack(); 

      expect(history.countPrev).toEqual(0);
      expect(history.countFwd).toEqual(4);
    });

    it('should read the correct amount of items in each object after 2 go forward calls', function() {
      for (let i = 0; i< 2; i++) history.goForward(); 
  
      expect(history.countPrev).toEqual(2);
      expect(history.countFwd).toEqual(2);
    });

    it('should zero out the count forward when a new history is added to the previous stack and add one to previous', function() {
      history.addToHistory(faker.internet.url()); 
    
      expect(history.countPrev).toEqual(3);
      expect(history.countFwd).toEqual(0);
    });

    it('should allow a maximum of 50 items at any given time on the history', function() {
      for(let i = 0 ; i < 48; i++) history.addToHistory(faker.internet.url());
      expect(history.countPrev).toEqual(history.max-1);
      expect(history.countFwd).toEqual(0);
    });


  });
});


// var history = new History(50)
// history.addToHistory('A')
// history.addToHistory('B')
// history.addToHistory('C')
// history.addToHistory('D')

// console.log (history, ': before ');


// console.log (history, ':previous');
// history.goForward();


// console.log(history, ': forward');

// console.log(history, 'add new his');