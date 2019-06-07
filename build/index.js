"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  withGrecaptchaToken: true
};
Object.defineProperty(exports, "withGrecaptchaToken", {
  enumerable: true,
  get: function get() {
    return _withToken["default"];
  }
});

var _grecaptcha = require("./grecaptcha");

Object.keys(_grecaptcha).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grecaptcha[key];
    }
  });
});

var _withToken = _interopRequireDefault(require("./with-token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }