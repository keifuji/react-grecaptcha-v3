'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.grecaptchaGetToken = exports.grecaptchaLoad = undefined;

var _grecaptcha = require('./grecaptcha');

Object.defineProperty(exports, 'grecaptchaLoad', {
	enumerable: true,
	get: function get() {
		return _grecaptcha.grecaptchaLoad;
	}
});
Object.defineProperty(exports, 'grecaptchaGetToken', {
	enumerable: true,
	get: function get() {
		return _grecaptcha.grecaptchaGetToken;
	}
});

var _recompose = require('recompose');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var asyncSetToken = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(siteKey, action) {
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
						return _context.abrupt('return', token);

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function asyncSetToken(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var withGrecaptchaToken = (0, _recompose.lifecycle)({
	componentDidMount: function componentDidMount() {
		var _this = this;

		var _props = this.props,
		    siteKey = _props.siteKey,
		    action = _props.action;

		if (!siteKey) {
			throw new Error('[grecapthca-react-v3] No siteKey supplied.');
		}
		if (!action) {
			throw new Error('[grecapthca-react-v3] No action supplied.');
		}
		asyncSetToken(siteKey, action).then(function (token) {
			_this.setState({
				token: token,
				error: null
			});
		}).catch(function (error) {
			_this.setState({
				token: null,
				error: error
			});
		});
	}
});

exports.default = withGrecaptchaToken;