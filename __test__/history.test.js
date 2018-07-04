'use strict';

const data = require('./data');
const History = require('../lib/history');
const faker = require('faker');
require('jest');

describe('History Module', function() {
  var history = new History(50);

  describe('Valid', function() {
    //generates fake urls to add to history object  
    for(let i = 0 ; i < 48; i++) history.addToHistory(faker.internet.url());
    

    it('should read the correct amount of items in each object after 48 items were added to history', function() { 
      expect(history.countPrev).toEqual(48);
      expect(history.countFwd).toEqual(0);
    });

    it('should read the correct amount of items in each objec after 4 go back calls', function() {
      for (let i = 0; i< 46; i++) history.goBack(); 

      expect(history.countPrev).toEqual(2);
      expect(history.countFwd).toEqual(46);
    });

    it('should read the correct amount of items in each object after 2 go forward calls', function() {
      for (let i = 0; i< 10; i++) history.goForward(); 
  
      expect(history.countPrev).toEqual(12);
      expect(history.countFwd).toEqual(36);
    });

    it('should zero out the count forward when a new history is added to the previous stack and add one to previous', function() {
      history.addToHistory(faker.internet.url()); 
    
      expect(history.countPrev).toEqual(13);
      expect(history.countFwd).toEqual(0);
    });

    it('should clear everything in history and reset counters to zero when', function() {
      history.clear();
      expect(history.countPrev).toEqual(0);
      expect(history.countFwd).toEqual(0);
    });

    it('should allow add values by count starting at 1', function() {
      for(let i = 0 ; i <50 ; i++) history.addToHistory(data.before[i]);
      expect(history.previous).toEqual(data.after);
      expect(history.countPrev).toEqual(50);
      expect(history.countFwd).toEqual(0);
    });

    it('should check that numbers added are appended to the top of the stack and removed from bottom', function() {
      for(let i = 0 ; i <4 ; i++) history.addToHistory(data.add[i]);
      expect(history.previous).toEqual(data.afterAdd);
      expect(history.countPrev).toEqual(50);
      expect(history.countFwd).toEqual(0);
    });

  });
});
