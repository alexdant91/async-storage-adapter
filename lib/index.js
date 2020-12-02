"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isJSON = void 0;

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Utility function to check if is JSON format
 * Return if is JSON string or not
 * @param {string} str
 */
var isJSON = function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};
/**
 * Utility wrapper to interact with AsyncStorage in React Native projects
 */


exports.isJSON = isJSON;

var AsyncStorageAdapter =
/**
 * @param {string} GlobalKeyName Required name for global key to store data e.g. `@MyAppName`
 */
function AsyncStorageAdapter() {
  var _this = this;

  var GlobalKeyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, AsyncStorageAdapter);

  _defineProperty(this, "storeData", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
      var parseToJson, parsedValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parseToJson = _typeof(value) === "object" || Array.isArray(value);
              _context.prev = 1;
              parsedValue = parseToJson ? JSON.stringify(value) : value;
              _context.next = 5;
              return _asyncStorage["default"].setItem("".concat(_this.GLOBAL_KEY_NAME, ":").concat(key), parsedValue);

            case 5:
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              // error saving value
              console.error(_context.t0);
              return _context.abrupt("return", false);

            case 11:
              return _context.abrupt("return", true);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "storeMultipleData", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keyValues) {
      var savePair;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              savePair = Object.keys(keyValues).map(function (key) {
                var value = keyValues[key];
                var parsedValue = parseToJson ? JSON.stringify(value) : value;
                return [key, parsedValue];
              });
              _context2.prev = 1;
              _context2.next = 4;
              return _asyncStorage["default"].multiSet(savePair);

            case 4:
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](1);
              //save error
              console.error(_context2.t0);
              return _context2.abrupt("return", false);

            case 10:
              return _context2.abrupt("return", true);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 6]]);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getData", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
      var jsonValue;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _asyncStorage["default"].getItem("".concat(_this.GLOBAL_KEY_NAME, ":").concat(key));

            case 3:
              jsonValue = _context3.sent;
              return _context3.abrupt("return", jsonValue != null && isJSON(jsonValue) ? JSON.parse(jsonValue) : null);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              // error reading value
              console.error(_context3.t0);
              return _context3.abrupt("return", false);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getMultipleData", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(keys) {
      var values, parsedValue, parsedKeys;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              parsedValue = {};
              parsedKeys = keys.map(function (key) {
                return "".concat(_this.GLOBAL_KEY_NAME, ":").concat(key);
              });
              _context4.prev = 2;
              _context4.next = 5;
              return _asyncStorage["default"].multiGet(parsedKeys);

            case 5:
              values = _context4.sent;
              _context4.next = 12;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](2);
              // read error
              console.error(_context4.t0);
              return _context4.abrupt("return", false);

            case 12:
              values.forEach(function (el) {
                parsedValue[el[0].replace("".concat(_this.GLOBAL_KEY_NAME, ":"), "")] = isJSON(el[1]) ? JSON.parse(el[1]) : el[1];
              });
              return _context4.abrupt("return", parsedValue);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 8]]);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getAllData", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var values, parsedValue, allKeys;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            parsedValue = {};
            _context5.prev = 1;
            _context5.next = 4;
            return getAllKeys();

          case 4:
            allKeys = _context5.sent;
            _context5.next = 7;
            return getMultipleData(allKeys.map(function (key) {
              return key.replace("".concat(_this.GLOBAL_KEY_NAME, ":"), "");
            }));

          case 7:
            values = _context5.sent;
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            // read error
            console.error(_context5.t0);
            return _context5.abrupt("return", false);

          case 14:
            Object.keys(values).forEach(function (key) {
              parsedValue[key.replace("".concat(_this.GLOBAL_KEY_NAME, ":"), "")] = isJSON(values[key]) ? JSON.parse(values[key]) : values[key];
            });
            return _context5.abrupt("return", parsedValue);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  })));

  _defineProperty(this, "removeData", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _asyncStorage["default"].removeItem("".concat(_this.GLOBAL_KEY_NAME, ":").concat(key));

            case 3:
              _context6.next = 9;
              break;

            case 5:
              _context6.prev = 5;
              _context6.t0 = _context6["catch"](0);
              // error removing data
              console.error(_context6.t0);
              return _context6.abrupt("return", false);

            case 9:
              return _context6.abrupt("return", true);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 5]]);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeMultipleData", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(keys) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _asyncStorage["default"].multiRemove(keys);

            case 3:
              _context7.next = 9;
              break;

            case 5:
              _context7.prev = 5;
              _context7.t0 = _context7["catch"](0);
              // remove error
              console.error(_context7.t0);
              return _context7.abrupt("return", false);

            case 9:
              return _context7.abrupt("return", true);

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 5]]);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getAllKeys", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var keys;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            keys = [];
            _context8.prev = 1;
            _context8.next = 4;
            return _asyncStorage["default"].getAllKeys();

          case 4:
            keys = _context8.sent;
            _context8.next = 11;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](1);
            // read key error
            console.error(_context8.t0);
            return _context8.abrupt("return", false);

          case 11:
            return _context8.abrupt("return", keys);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 7]]);
  })));

  _defineProperty(this, "clearAll", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _asyncStorage["default"].clear();

          case 3:
            _context9.next = 9;
            break;

          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            // clear error
            console.error(_context9.t0);
            return _context9.abrupt("return", false);

          case 9:
            return _context9.abrupt("return", true);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  })));

  if (GlobalKeyName === null) throw new Error("`GlobalKeyName` is required in order to set keys in storage.");
  this.GLOBAL_KEY_NAME = GlobalKeyName;
}
/**
 * @param {string} key Set key to identify your data in storage
 * @param {any} value Value to save
 * @description Store data from async storage
 * @returns Boolean result of the save process
 */
;

exports["default"] = AsyncStorageAdapter;