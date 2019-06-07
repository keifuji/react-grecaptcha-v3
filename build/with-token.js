"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recompose = require("recompose");

var _grecaptcha = require("./grecaptcha");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var asyncSetToken =
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
            return (0, _grecaptcha.grecaptchaLoad)(siteKey);

          case 2:
            _context.next = 4;
            return (0, _grecaptcha.grecaptchaGetToken)(siteKey, action);

          case 4:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function asyncSetToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var withGrecaptchaToken = (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _this = this;

    var _this$props = this.props,
        siteKey = _this$props.siteKey,
        action = _this$props.action;

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
    })["catch"](function (error) {
      _this.setState({
        token: null,
        error: error
      });
    });
  }
});
var _default = withGrecaptchaToken;
exports["default"] = _default;