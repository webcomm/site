'use strict';

$(document).ready(function () {

  function App(config) {
    this.config = $.extend(true, {

      // The DOM selector for the main navigation trigger
      navigationTrigger: '#js-navigation-trigger',

      // The dom selector for the main navigation
      navigation: '#js-main-navigation'

    }, config);

    this.$body = $('body');
  }

  App.prototype = {
    constructor: App,

    // This is the main entry point into the App object
    start: function () {
      this
        .attachFastClick()
        .attachNavigation();
    },

    // Fastclick is a drop-in library that, on touch devices, eliminates that
    // 300ms delay that occurs when click events are fired. This allows the
    // website to feel faster on a mobile device, keeping users happy.
    attachFastClick: function() {
      FastClick.attach(document.body);

      return this;
    },

    // When the navigation trigger is clicked or tapped, we will open
    // the navigation menu by adding a class to the body element.
    attachNavigation: function () {
      var that = this;
      $navigationTrigger = $(this.config.navigationTrigger);

      $navigationTrigger.on('click', function () {
        that.$body.toggleClass('navigation-opened');
      });

      return this;
    }
  };

  // Instantiate the app object and kick it off!
  var app = new App();
  app.start();
});
