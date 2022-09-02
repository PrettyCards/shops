// ==UserScript==
// @name        PrettyCards Shops
// @version     1.0.0
// @author      CMD_God
// @description A small userscript to change how the shops in the game look, adding NPCs and menus to them.
// @homepage    https://github.com/PrettyCardsProjects/shops
// @supportURL  https://github.com/PrettyCardsProjects/shops
// @match       https://*.undercards.net/*
// @exclude     https://*.undercards.net/*/*
// @grant       none
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _underscript_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscript_checker */ \"./src/underscript_checker.js\");\n/* harmony import */ var _shop_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shop_layout */ \"./src/shop_layout.js\");\n/* harmony import */ var _pages_artifacts_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/artifacts_page */ \"./src/pages/artifacts_page.js\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pages/artifacts_page.js":
/*!*************************************!*\
  !*** ./src/pages/artifacts_page.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shop_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shop_layout */ \"./src/shop_layout.js\");\n/* harmony import */ var _underscript_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../underscript_checker */ \"./src/underscript_checker.js\");\n\r\n\r\n\r\n\r\nvar art_setting = Object(_underscript_checker__WEBPACK_IMPORTED_MODULE_1__[\"addSetting\"])({\r\n    'key': 'artifacts_shops_toggle',\r\n    'name': 'Enable Artifacts Shop Override', // Name in settings page\r\n    'type': 'boolean',\r\n    'refresh': true, // true to add note \"Will require you to refresh the page\"\r\n    'default': true, // default value\r\n});\r\n\r\nif (_underscript_checker__WEBPACK_IMPORTED_MODULE_1__[\"us_loaded\"] && art_setting.value() && underscript.onPage('Artifacts')) {\r\n    var shop = new _shop_layout__WEBPACK_IMPORTED_MODULE_0__[\"Shop\"]();\r\n    document.getElementsByClassName(\"mainContent\")[0].prepend(shop.container);\r\n}\n\n//# sourceURL=webpack:///./src/pages/artifacts_page.js?");

/***/ }),

/***/ "./src/shop_layout.js":
/*!****************************!*\
  !*** ./src/shop_layout.js ***!
  \****************************/
/*! exports provided: Shop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shop\", function() { return Shop; });\n/* harmony import */ var _underscript_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscript_checker */ \"./src/underscript_checker.js\");\n\r\n\r\n_underscript_checker__WEBPACK_IMPORTED_MODULE_0__[\"plugin\"].events.on(\"PrettyCards:onPageLoad\", function() {\r\n    window.prettycards.utility.loadCSSFromGH(\"Shop\", \"shops\");\r\n})\r\n\r\nclass Shop {\r\n\r\n    constructor() {\r\n        this.InitShopBase();\r\n    }\r\n\r\n    InitShopBase() {\r\n        this.container = document.createElement(\"DIV\");\r\n        this.container.className = \"PrettyCards_ShopContainer\";\r\n\r\n        this.left = document.createElement(\"DIV\");\r\n        this.container.appendChild(this.left);\r\n\r\n        this.buyContainer = document.createElement(\"DIV\");\r\n        this.left.appendChild(this.buyContainer);\r\n\r\n        this.dialogueContainer = document.createElement(\"DIV\");\r\n        this.left.appendChild(this.dialogueContainer);\r\n\r\n        this.right = document.createElement(\"DIV\");\r\n        this.container.appendChild(this.right);\r\n\r\n        this.shopkeeperContainer = document.createElement(\"DIV\");\r\n        this.right.appendChild(this.shopkeeperContainer);\r\n\r\n        this.menuContainer = document.createElement(\"DIV\");\r\n        this.right.appendChild(this.menuContainer);\r\n        return this.container;\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/shop_layout.js?");

/***/ }),

/***/ "./src/underscript_checker.js":
/*!************************************!*\
  !*** ./src/underscript_checker.js ***!
  \************************************/
/*! exports provided: us_loaded, settings, plugin, addSetting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"us_loaded\", function() { return us_loaded; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"plugin\", function() { return plugin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addSetting\", function() { return addSetting; });\n\r\nvar us_loaded = false;\r\nvar plugin;\r\nvar settings = {};\r\n\r\nfunction addSetting(data) {\r\n    if (data.note && typeof(data.note) != \"function\") {\r\n        data.note = `<div style=\"max-width: 600px;\">${data.note}</div>`;\r\n    }\r\n    //data.category = categories[data.category || \"misc\"];\r\n    var setting = plugin.settings().add(data);\r\n    settings[data.key] = setting;\r\n    return setting;\r\n}\r\n\r\nif (underscript) {\r\n    us_loaded = true;\r\n    plugin = window.underscript.plugin(\"PrettyCards Shops\");\r\n}\r\n\r\nif (us_loaded) {\r\n\r\n    addSetting({\r\n        'key': 'all_shops_toggle',\r\n        'name': 'Toggle All', // Name in settings page\r\n        'type': 'boolean',\r\n        'note': 'When changed, all other settings will be set to the value of this.',\r\n        'refresh': true, // true to add note \"Will require you to refresh the page\"\r\n        'default': true, // default value\r\n        'onChange' : function(newVal, oldVal) {\r\n            console.log(\"Changing all Boolean Settings to\", newVal);\r\n            for (var key in settings) {\r\n                console.log(key);\r\n                var setting = settings[key];\r\n                if (key != \"all_shops_toggle\" && typeof(setting.value()) == \"boolean\") {\r\n                    settings[key].set(newVal);\r\n                }\r\n            }\r\n        }\r\n    });\r\n\r\n    plugin.events.on(\"PrettyCards:onPageLoad\", function() {\r\n        window.prettycards.utility.addCSSSourceData(\"shops\", {\r\n\t\t\teventName: \"PrettyCardsShops:CommitCSSLoad\",\r\n\t\t\tapiLink: \"https://api.github.com/repos/PrettyCards/shops/commits\",\r\n\t\t\turlLinkFunc: (data, name) => `https://cdn.jsdelivr.net/gh/PrettyCards/shops@${data}/css/${name}.css`\r\n\t\t})\r\n    })\r\n\r\n} else {\r\n    \r\n}\r\n\r\nconsole.log(settings);\r\n\r\n\n\n//# sourceURL=webpack:///./src/underscript_checker.js?");

/***/ })

/******/ });