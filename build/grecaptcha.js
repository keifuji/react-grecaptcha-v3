'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.grecaptchaGetScore = exports.grecaptchaLoadAndGetToken = exports.grecaptchaGetToken = exports.grecaptchaLoad = exports.isGrecaptchaLoaded = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //import { polyfill } from 'es6-promise'
//import 'babel-core/register'


/**
 * makeScriptSourceUrl
 *
 * @param {string} siteKey
 * @returns {string}
 */
var makeScriptSourceUrl = function makeScriptSourceUrl(siteKey) {
	return 'https://www.google.com/recaptcha/api.js?render=' + siteKey;
};

var scriptIsLoaded = false;

/**
 * isGrecaptchaLoaded
 *
 * Has grecapthca script loaded?
 *
 * @returns {bool}
 */
var isGrecaptchaLoaded = exports.isGrecaptchaLoaded = function isGrecaptchaLoaded() {
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
var grecaptchaLoad = exports.grecaptchaLoad = function grecaptchaLoad(siteKey) {
	return new Promise(function (resolve, reject) {
		try {
			if (isGrecaptchaLoaded()) {
				resolve();
			} else {
				(0, _loadScript2.default)(makeScriptSourceUrl(siteKey), function (err, res) {
					if (err) {
						reject(err);
					}

					console.log('grecaptchaLoad: ', res);

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
var grecaptchaGetToken = exports.grecaptchaGetToken = function grecaptchaGetToken(siteKey, action) {
	return new Promise(function (resolve, reject) {
		try {
			grecaptcha.ready(function () {
				grecaptcha.execute(siteKey, { action: action }).then(function (token) {
					console.log('For testing: ', 'curl -F secret=YOUR_SECRET_KEY -F response=' + token + ' https://www.google.com/recaptcha/api/siteverify');
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
var grecaptchaLoadAndGetToken = exports.grecaptchaLoadAndGetToken = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(siteKey, action) {
		var token;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return grecaptchaLoad(siteKey);

					case 3:
						_context.next = 5;
						return grecaptchaGetToken(siteKey, action);

					case 5:
						token = _context.sent;
						return _context.abrupt('return', token);

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](0);
						throw _context.t0;

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 9]]);
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
var grecaptchaGetScore = exports.grecaptchaGetScore = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var token = arguments[2];
		var res, json, success, score, errors;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return (0, _isomorphicFetch2.default)(url, _extends({
							mode: 'cors',
							method: 'POST'
						}, options, {
							body: JSON.stringify({ token: token })
						}));

					case 2:
						res = _context2.sent;

						if (res) {
							_context2.next = 5;
							break;
						}

						throw new Error('[react-grecaptcha-v3] no response from ' + url);

					case 5:
						if (res.ok) {
							_context2.next = 7;
							break;
						}

						throw new Error('[react-grecaptcha-v3] failed to fetch: ' + res.status + ' ' + res.statusText);

					case 7:
						_context2.next = 9;
						return res.json();

					case 9:
						json = _context2.sent;
						success = json.success, score = json.score, errors = json['error-codes'];

						if (success) {
							_context2.next = 14;
							break;
						}

						console.warn('[react-grecaptcha-v3] error-codes:', errors);
						throw new Error('[react-grecaptcha-v3] failed to get score: ' + (errors && errors[0]));

					case 14:
						return _context2.abrupt('return', score);

					case 15:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function grecaptchaGetScore(_x4) {
		return _ref2.apply(this, arguments);
	};
}();