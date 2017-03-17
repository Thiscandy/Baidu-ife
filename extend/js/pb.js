/**
  *
  * Waterfall v0.0.1
  * desciption, by StevenYu.
  * use with waterfall.css or just set .waterfallColumn {float: left;}
  * @author StevenYu
  */

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Waterfall = factory();
  }
}(this, function() {

  'use strict';

  /**
    * @param {Object} opts - options used in plugin
    * @constructor
    */

  var Waterfall = function(opts) {

    var opts = opts || {};
    var containerSelector = opts.containerSelector || 'waterfallContainer';
    var boxSelector = opts.boxSelector || 'waterfallBox';
    this.column = opts.column || 1;
    this.container = document.querySelector(containerSelector);
    this.boxes = this.container ? Array.prototype.slice.call(this.container.querySelectorAll(boxSelector)) : [];
    // init waterfall
    this.compose();
    // make box in order due to the first init the first column has the highest height
    var that =this;
    window.onload = function() {
      that.compose(true);
    }
  }

  /**
    * Plugin prototype definition.
    */

  Waterfall.prototype = {

    /**
      * init columns
      * @param {Number} columnNum - the numbers of the column
      */

    initColumn: function(columnNum) {
      // create column div
      this.columns = [];
      for (var i = 0; i < columnNum; i++) {
        var columnDiv = document.createElement('div');
        columnDiv.style.width = (100/columnNum) + '%';
        columnDiv.setAttribute('class','waterfallColumn');
        this.columns.push(columnDiv);
        this.container.appendChild(columnDiv);
      }
    },

    /**
      * get the index of shortest column
      * @return {Number} index
      */

    getMinHeightIndex: function() {
      var min = this.columns[0].clientHeight;
      var index = 0;
      for (var i = 0; i < this.columns.length; i++) {
        if (this.columns[i].clientHeight < min) {
          min = this.columns[i].clientHeight;
          index = i;
        }
      }
      return index;
    },

    /**
      * init columns and add boxes
      * @param {Boolean} force - choose whether to remove the old columns
      */

    compose: function(force) {
      // remove old columns
      if (force) {
        for (var i = 0; i < this.columns.length; i++) {
          this.columns[i].remove();
        }
      }
      // init new column
      this.initColumn(this.column);
      // compose
      for (var i = 0, l = this.boxes.length; i < l; i++) {
          var box = this.boxes[i];
          this.addBox(box);
        }
    },

    /**
      * compose all boxs in column
      * @param - the element which add in the box
      */

    addBox: function(ele) {
        var index = this.getMinHeightIndex();
        var column = this.columns[index];
        column.appendChild(ele);
    }
  }

  return Waterfall;
  
}));


var waterfall = new Waterfall({
  containerSelector: '.waterfall',
  boxSelector: '.waterfallBox',
  column: 4
});

buttonEvent();
displayImage();
loadMore();


// add button event
function buttonEvent() {
  var header = document.getElementsByTagName('header')[0];
  header.addEventListener('click', function(event) {
    switch (event.target.id) {
      case 'addColumn':
        waterfall.column++;
        waterfall.compose(true);
        break;
      case 'delColumn':
        if (waterfall.column > 0){
          waterfall.column--;
          waterfall.compose(true);
        }
        break;
      case 'addBox':
        waterfall.addBox(newNode()());
        waterfall.boxes.push(newNode()())
        break;
    }
  }, false)
}

// add scroll event
function loadMore() {
  window.onscroll = function() {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
    var container = waterfall.columns[waterfall.getMinHeightIndex()];
    var containerHeight = container.offsetTop  + container.offsetHeight;
    if (containerHeight < screenHeight) {
      waterfall.addBox(newNode()());
      waterfall.boxes.push(newNode()())
    }
  }
}

// add click event and display the images
function displayImage() {
  document.querySelector('.waterfall').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
      var display = document.querySelector('.display');
      var img = display.querySelector('img');
      img.setAttribute('src', event.target.getAttribute('src'));
      display.className = 'display';
      display.addEventListener('click', function() {
        display.className = 'display hidden';
      })
    }
  }, false)
}

// add new node
function newNode() {
  var size = ['660x250', '300x400', '350x500', '200x320', '300x300'];
  var color = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
  var i = parseInt(Math.random() * 5);

  return function() {

    var box = document.createElement('div');
    box.className = 'waterfallBox';
    var image = document.createElement('img');
    image.src = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
    box.appendChild(image);
    var content = document.createElement('div');
    content.className = 'content';
    var title = document.createElement('h3');
    title.appendChild(document.createTextNode('Heading'));
    content.appendChild(title);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Content'));
    content.appendChild(p);
    box.appendChild(content);

    return box;
  };
}