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

var _withToken = require('./with-token');

Object.defineProperty(exports, 'withGrecaptchaToken', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withToken).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }