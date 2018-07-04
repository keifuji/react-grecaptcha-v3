'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _grecaptcha = require('./grecaptcha');

Object.keys(_grecaptcha).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grecaptcha[key];
    }
  });
});