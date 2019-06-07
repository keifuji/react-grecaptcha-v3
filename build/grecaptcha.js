"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grecaptchaGetScore = exports.grecaptchaLoadAndGetToken = exports.grecaptchaGetToken = exports.grecaptchaLoad = exports.isGrecaptchaLoaded = void 0;

require("babel-polyfill");

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _loadScript = _interopRequireDefault(require("load-script"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * makeScriptSourceUrl
 *
 * @param {string} siteKey
 * @returns {string}
 */
var makeScriptSourceUrl = function makeScriptSourceUrl(siteKey) {
  return "https://www.google.com/recaptcha/api.js?render=".concat(siteKey);
};

var scriptIsLoaded = false;
/**
 * isGrecaptchaLoaded
 *
 * Has grecapthca script loaded?
 *
 * @returns {bool}
 */

var isGrecaptchaLoaded = function isGrecaptchaLoaded() {
  return scriptIsLoaded;
};
/**
 * grecaptchaLoad
 *
 * Load grecaptcha script tag.
 *
 * スクリプトタグを追加してgrecaptchaを読み込む
 *
 * @param {string} siteKey
 */


exports.isGrecaptchaLoaded = isGrecaptchaLoaded;

var grecaptchaLoad = function grecaptchaLoad(siteKey) {
  return new Promise(function (resolve, reject) {
    try {
      if (isGrecaptchaLoaded()) {
        resolve();
      } else {
        (0, _loadScript["default"])(makeScriptSourceUrl(siteKey), function (err, res) {
          if (err) {
            reject(err);
          }

          scriptIsLoaded = true;
          resolve();
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
/**
 * grecaptchaGetToken
 *
 * grecaptchaを実行
 *
 * @param {string} siteKey
 * @param {string} action Action name (accepts only alphabet or '/')
 * @returns {Promise}
 */


exports.grecaptchaLoad = grecaptchaLoad;

var grecaptchaGetToken = function grecaptchaGetToken(siteKey, action) {
  return new Promise(function (resolve, reject) {
    try {
      grecaptcha.ready(function () {
        grecaptcha.execute(siteKey, {
          action: action
        }).then(function (token) {
          //console.log('For testing: ', 
          //	`curl -F secret=YOUR_SECRET_KEY -F response=${token} https://www.google.com/recaptcha/api/siteverify`
          //)
          resolve(token);
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};
/**
 * grecaptchaLoadAndGetToken
 *
 * Loads grecaptcha script and gets token from Google.
 *
 * @param {string} siteKey
 * @param {string} action Action name (accepts only alphabet or '/')
 * @return {string} token
 */


exports.grecaptchaGetToken = grecaptchaGetToken;

var grecaptchaLoadAndGetToken =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(siteKey, action) {
    var token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return grecaptchaLoad(siteKey);

          case 2:
            _context.next = 4;
            return grecaptchaGetToken(siteKey, action);

          case 4:
            token = _context.sent;

            if (token) {
              _context.next = 7;
              break;
            }

            throw new Error("[react-grecaptcha-v3] no token received for ".concat(action));

          case 7:
            return _context.abrupt("return", token);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function grecaptchaLoadAndGetToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * grecaptchaGetScore
 *
 * Send token to your server and get score.
 *
 * サーバーのエンドポイント(url)にtokenを送信して、結果(score)を取得する
 *
 * @param {string} url Endpoint URL which receives a token and returns its score.
 * @param {object} options Options for fetch
 * @param {string} token 
 * @returns score
 */


exports.grecaptchaLoadAndGetToken = grecaptchaLoadAndGetToken;

var grecaptchaGetScore =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url) {
    var options,
        token,
        res,
        json,
        success,
        score,
        errors,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            token = _args2.length > 2 ? _args2[2] : undefined;
            _context2.next = 4;
            return (0, _isomorphicFetch["default"])(url, _objectSpread({
              mode: 'cors',
              method: 'POST'
            }, options, {
              body: JSON.stringify({
                token: token
              })
            }));

          case 4:
            res = _context2.sent;

            if (res) {
              _context2.next = 7;
              break;
            }

            throw new Error("[react-grecaptcha-v3] no response from ".concat(url));

          case 7:
            if (res.ok) {
              _context2.next = 9;
              break;
            }

            throw new Error("[react-grecaptcha-v3] failed to fetch: ".concat(res.status, " ").concat(res.statusText));

          case 9:
            _context2.next = 11;
            return res.json();

          case 11:
            json = _context2.sent;
            success = json.success, score = json.score, errors = json['error-codes'];

            if (success) {
              _context2.next = 16;
              break;
            }

            console.warn('[react-grecaptcha-v3] error-codes:', errors);
            throw new Error("[react-grecaptcha-v3] failed to get score: ".concat(errors && errors[0]));

          case 16:
            return _context2.abrupt("return", score);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function grecaptchaGetScore(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.grecaptchaGetScore = grecaptchaGetScore;