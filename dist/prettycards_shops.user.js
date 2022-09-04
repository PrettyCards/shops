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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shop_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shop_layout */ \"./src/shop_layout.js\");\n/* harmony import */ var _standard_talk_screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../standard_talk_screen */ \"./src/standard_talk_screen.js\");\n/* harmony import */ var _underscript_checker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../underscript_checker */ \"./src/underscript_checker.js\");\n\r\n\r\n\r\n\r\n\r\nvar art_setting = Object(_underscript_checker__WEBPACK_IMPORTED_MODULE_2__[\"addSetting\"])({\r\n    'key': 'artifacts_shops_toggle',\r\n    'name': 'Enable Artifacts Shop Override', // Name in settings page\r\n    'type': 'boolean',\r\n    'refresh': true, // true to add note \"Will require you to refresh the page\"\r\n    'default': true, // default value\r\n});\r\n\r\nif (_underscript_checker__WEBPACK_IMPORTED_MODULE_2__[\"us_loaded\"] && art_setting.value() && underscript.onPage('Artifacts')) {\r\n    underscript.utils.compoundEvent(\"PrettyCardsShops:CSSReady\", \"PrettyCards:TranslationExtReady\", function () {\r\n    //plugin.events.on(\"PrettyCardsShops:CSSReady PrettyCards:TranslationExtReady\", function() {\r\n        var shop = new _shop_layout__WEBPACK_IMPORTED_MODULE_0__[\"Shop\"](\"gerson\");\r\n        shop.AddMenuOption(\"buy\");\r\n        shop.AddMenuOption(\"check\");\r\n        shop.AddMenuOption(\"talk\");\r\n        shop.AddMenuOption(\"exit\");\r\n        document.getElementsByClassName(\"mainContent\")[0].prepend(shop.container);\r\n\r\n        var talkScreen = new _standard_talk_screen__WEBPACK_IMPORTED_MODULE_1__[\"StandardTalkScreen\"](shop);\r\n        talkScreen.AddTalkOption(\"pc-shops-gerson-talk-title-aboutyou\", \"pc-shops-gerson-talk-aboutyou\");\r\n\r\n        var talkBase = shop.GetPageElement(2);\r\n        talkBase.appendChild(talkScreen.container);\r\n        talkScreen.Render();\r\n        /*\r\n        setTimeout(function() {\r\n            shop.SetDialogue(\"[instant]Hi![w:500] I'm [style:red]Gerson[style:]![speed:500] [instant:off][style:cyan]\\rNice to meet you![speed:33] \\nNow I will have an insanely long monologue for testing purposes!\");\r\n        }, 500);\r\n        */\r\n        \r\n    })\r\n}\n\n//# sourceURL=webpack:///./src/pages/artifacts_page.js?");

/***/ }),

/***/ "./src/shop_layout.js":
/*!****************************!*\
  !*** ./src/shop_layout.js ***!
  \****************************/
/*! exports provided: Shop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shop\", function() { return Shop; });\n/* harmony import */ var _text_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_engine */ \"./src/text_engine.js\");\n/* harmony import */ var _underscript_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./underscript_checker */ \"./src/underscript_checker.js\");\n\r\n\r\n\r\nvar translate;\r\n\r\n_underscript_checker__WEBPACK_IMPORTED_MODULE_1__[\"plugin\"].events.on(\"PrettyCards:onPageLoad\", function() {\r\n    window.prettycards.utility.loadCSSFromGH(\"Shop\", \"shops\").then(_underscript_checker__WEBPACK_IMPORTED_MODULE_1__[\"plugin\"].events.emit(\"PrettyCardsShops:CSSReady\"));\r\n    translate = window.prettycards.translationManager.getStringOrList.bind(window.prettycards.translationManager);\r\n})\r\n\r\nclass Shop {\r\n\r\n    constructor(id) {\r\n        this.id = id;\r\n        this.pages = [];\r\n        this.InitShopBase();\r\n        setTimeout(function() {\r\n            if (!this.lastDialogue) {\r\n                this.SetDialogue(translate(`pc-shops-${this.id}-dial-intro`));\r\n            }\r\n        }.bind(this), 500);\r\n    }\r\n\r\n    AddMenuOption(transKey, action = function() {}) {\r\n        const page = document.createElement(\"DIV\");\r\n        page.className = \"PrettyCards_Hidden\";\r\n        this.buyContainer.appendChild(page);\r\n        this.pages.push(page);\r\n\r\n        var option = document.createElement(\"BUTTON\");\r\n        option.className = \"PrettyCards_ShopMenu_Option\";\r\n        option.innerHTML = window.$.i18n(`pc-shops-option-${transKey}`);\r\n        option.onclick = function() {\r\n            this.pages.forEach((p) => {\r\n                p.classList.add(\"PrettyCards_Hidden\");\r\n            })\r\n            page.classList.remove(\"PrettyCards_Hidden\");\r\n            this.SetDialogue(translate(`pc-shops-${this.id}-dial-${transKey}`));\r\n            action();\r\n        }.bind(this);\r\n        this.menuContainer.appendChild(option);\r\n        return option;\r\n    }\r\n\r\n    GetPageElement(nr) {\r\n        return this.pages[nr];\r\n    }\r\n\r\n    InitShopBase() {\r\n        this.container = document.createElement(\"DIV\");\r\n        this.container.className = \"PrettyCards_ShopContainer\";\r\n\r\n        this.left = document.createElement(\"DIV\");\r\n        this.left.className = \"PrettyCards_ShopLeft\";\r\n        this.container.appendChild(this.left);\r\n\r\n        this.buyContainer = document.createElement(\"DIV\");\r\n        this.buyContainer.className = \"PrettyCards_ShopBuyContainer\";\r\n        this.left.appendChild(this.buyContainer);\r\n\r\n        this.dialogueContainer = document.createElement(\"DIV\");\r\n        this.dialogueContainer.className = \"PrettyCards_ShopDialogueContainer\";\r\n        this.dialogueContainer.onclick = function() {\r\n            //console.log(\"AREA PRESSED!\", this.lastDialogue);\r\n            if (this.lastDialogue) {\r\n                if (this.lastDialogue.IsPageDone()) {\r\n                    this.lastDialogue.NextPage();\r\n                } else {\r\n                    this.lastDialogue.UserSkip();\r\n                }\r\n            }\r\n        }.bind(this);\r\n        this.left.appendChild(this.dialogueContainer);\r\n\r\n        this.right = document.createElement(\"DIV\");\r\n        this.right.className = \"PrettyCards_ShopRight\";\r\n        this.container.appendChild(this.right);\r\n\r\n        this.shopkeeperContainer = document.createElement(\"DIV\");\r\n        this.shopkeeperContainer.className = \"PrettyCards_ShopkeeperContainer\";\r\n        this.right.appendChild(this.shopkeeperContainer);\r\n\r\n        this.menuContainer = document.createElement(\"DIV\");\r\n        this.menuContainer.className = \"PrettyCards_ShopMenuContainer\";\r\n        this.right.appendChild(this.menuContainer);\r\n        return this.container;\r\n    }\r\n\r\n    SetDialogue(text) {\r\n        if (this.lastDialogue) {\r\n            this.lastDialogue.Remove();\r\n        }\r\n        this.lastDialogue = new _text_engine__WEBPACK_IMPORTED_MODULE_0__[\"TypedText\"](text, this.dialogueContainer);\r\n        //console.log(\"NEW TEXT\", this.lastDialogue, this);\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/shop_layout.js?");

/***/ }),

/***/ "./src/standard_talk_screen.js":
/*!*************************************!*\
  !*** ./src/standard_talk_screen.js ***!
  \*************************************/
/*! exports provided: StandardTalkScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StandardTalkScreen\", function() { return StandardTalkScreen; });\n\r\n\r\nclass StandardTalkScreen {\r\n\r\n    constructor(shop) {\r\n        this.talkOptions = [];\r\n        this.container = document.createElement(\"DIV\");\r\n        this.shop = shop;\r\n    }\r\n\r\n    AddTalkOption(titleKey, dialogueKey, locked = false, unlocks = \"\") {\r\n        this.talkOptions.push({\r\n            titleKey : titleKey,\r\n            dialogueKey : dialogueKey,\r\n            locked: locked,\r\n            unlocks: \"\"\r\n        })\r\n    }\r\n\r\n    Render() {\r\n        const self = this;\r\n        this.container.innerHTML = \"\";\r\n        this.talkOptions.forEach((option) => {\r\n            if (option.locked) {\r\n                return;\r\n            }\r\n            var ele = document.createElement(\"DIV\");\r\n            ele.className = \"PrettyCards_ShopTalkOption\";\r\n            ele.innerHTML = window.$.i18n(option.titleKey);\r\n            ele.onclick = function() {\r\n                self.OnOptionPressed(option);\r\n            };\r\n            this.container.appendChild(ele);\r\n        });\r\n    }\r\n\r\n    OnOptionPressed(option) {\r\n        this.shop.SetDialogue(window.prettycards.translationManager.getStringOrList(option.dialogueKey));\r\n        if (option.unlocks && option.unlocks !== \"\") {\r\n            for (var i=0; i < this.talkOptions.length; i++) {\r\n                var o = this.talkOptions[i];\r\n                if (o.titleKey === this.unlocks) {\r\n                    o.locked = false;\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/standard_talk_screen.js?");

/***/ }),

/***/ "./src/text_engine.js":
/*!****************************!*\
  !*** ./src/text_engine.js ***!
  \****************************/
/*! exports provided: TypedText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TypedText\", function() { return TypedText; });\n\r\n\r\nclass TypedText {\r\n\r\n    constructor(text, parent) {\r\n        this.defaultSpeed = 33;\r\n        this.speed = this.defaultSpeed; // The miliseconds between displaying letters.\r\n        this.nextWait = this.speed;\r\n        this.container = document.createElement(\"DIV\");\r\n        parent.appendChild(this.container);\r\n        this.text = text;\r\n        this.currentPage = -1;\r\n        this.currentLetter = 0;\r\n        this.instant = false;\r\n        this.userInstant = false;\r\n        this.noskip = false;\r\n        if (typeof(text) == \"string\") {\r\n            this.text = [text];\r\n        }\r\n        this.InitTextCommands();\r\n        this.NextPage();\r\n    }\r\n\r\n    ResetTextArea() {\r\n        this.container.innerHTML = \"\";\r\n        this.StartNewParagraph(true);\r\n        this.currentLetter = 0;\r\n    }\r\n\r\n    SetHeight(sizeParent = true) {\r\n        while (!this.IsPageDone()) {\r\n            this.Progress();\r\n        }\r\n        var sizeElem = sizeParent ? this.container.parentElement : this.container;\r\n        var copy = sizeElem.cloneNode(true);\r\n        copy.style.height = \"\";\r\n        copy.style.width = sizeElem.getBoundingClientRect().width + \"px\";\r\n        copy.style.transition = \"none\";\r\n        document.body.appendChild(copy);\r\n        var height = copy.getBoundingClientRect().height;\r\n        sizeElem.style.height = height + \"px\";\r\n        copy.remove();\r\n        this.ResetTextArea();\r\n    }\r\n\r\n    NextPage() {\r\n        this.userInstant = false;\r\n        this.ResetTextArea();\r\n        this.currentPage++;\r\n        if (this.currentPage >= this.text.length) {\r\n            this.Remove();\r\n            return;\r\n        }\r\n        this.SetHeight();\r\n        this.Progress();\r\n        this.TimeLoop();\r\n    }\r\n\r\n    InitTextCommands() {\r\n        // Returns true if a new iteration of the Progress function should be called immediately after.\r\n        this.textCommands = {\r\n            style: (className) => {\r\n                this.StartNewSpan(className);\r\n                return true;\r\n            },\r\n            speed: (ms) => {\r\n                if (ms === \"default\" || ms === \"reset\") {\r\n                    this.speed = this.defaultSpeed;\r\n                } else {\r\n                    this.speed = Number(ms);\r\n                }\r\n                return false;\r\n            },\r\n            w: (ms) => {\r\n                this.nextWait = Number(ms) || 0;\r\n                return false;\r\n            },\r\n            instant: (arg) => {\r\n                this.instant = arg === \"\" || arg === \"on\" || arg === \"true\";\r\n                /*\r\n                if (this.instant) {\r\n                    clearTimeout(this.lastTimeout);\r\n                } else {\r\n                    this.TimeLoop();\r\n                }\r\n                */\r\n                return false;\r\n            },\r\n            noskip: (arg) => {\r\n                this.noskip = arg === \"\" || arg === \"on\" || arg === \"true\";\r\n                if (this.noskip) {\r\n                    this.userInstant = false;\r\n                }\r\n                return true;\r\n            }\r\n        }\r\n    }\r\n\r\n    UserSkip() {\r\n        if (!this.noskip) {\r\n            this.userInstant = true;\r\n            this.Progress();\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n\r\n    Remove() {\r\n        clearTimeout(this.lastTimeout);\r\n        this.container.remove();\r\n    }\r\n\r\n    StartNewParagraph(reset = false) {\r\n        this.currentParagraph = document.createElement(\"DIV\"); // Bootstrap and other stuff mess with paragraphs, so I had to change this.\r\n        this.currentParagraph.className = \"PrettyCards_UTTextParagraph\";\r\n        this.container.appendChild(this.currentParagraph);\r\n        this.StartNewSpan((this.currentSpan && !reset) ? this.currentSpan.className : \"\");\r\n        //this.StartNewSpan(\"\");\r\n        return this.currentParagraph;\r\n    }\r\n\r\n    StartNewSpan(className) {\r\n        this.currentSpan = document.createElement(\"SPAN\");\r\n        this.currentSpan.className = className;\r\n        this.currentParagraph.appendChild(this.currentSpan);\r\n        return this.currentSpan;\r\n    }\r\n\r\n    Progress() {\r\n        if (this.IsPageDone()) {\r\n            return;\r\n        }\r\n        var currStr = this.text[this.currentPage];\r\n        var isSkipped = this.currentLetter > 0 && currStr.charAt(this.currentLetter-1) === \"\\\\\";\r\n        var nextChar = currStr.charAt(this.currentLetter);\r\n        // \"[\" indicated the beginning of a command UNLESS skipped, therefore should be redirected to the outer if's \"else\" part.\r\n        // \"\\\\\" indicates the skipping of a character (unless skipped), but it should not be displayed, therefore nothing should happen in that case.\r\n        if (nextChar !== \"[\" || isSkipped) {\r\n            if (nextChar !== \"\\\\\" || isSkipped) {\r\n                if (nextChar === \"\\n\") {\r\n                    this.StartNewParagraph();\r\n                } else if (nextChar === \"\\r\") {\r\n                    this.currentSpan.innerHTML += \"<br>\";\r\n                } else {\r\n                    this.currentSpan.innerHTML += nextChar;\r\n                }\r\n            }\r\n            this.currentLetter++;\r\n        } else {\r\n            // Command Code. Buckle up, cuz this will be a wild ride!\r\n            var commandEnd = currStr.indexOf(\"]\", this.currentLetter);\r\n            if (commandEnd < 0) {\r\n                throw \"Error in command parsing for string: \" + currStr;\r\n            }\r\n            var commandStr = currStr.substring(this.currentLetter, commandEnd + 1);\r\n            var argSepPos = commandStr.indexOf(\":\");\r\n            var cmdName;\r\n            var cmdArg = \"\";\r\n            if (argSepPos < 0) {\r\n                cmdName = commandStr.substring(1, commandStr.length-1);\r\n            } else {\r\n                cmdName = commandStr.substring(1, argSepPos);\r\n                cmdArg = commandStr.substring(argSepPos + 1, commandStr.length-1);\r\n            }\r\n\r\n            this.currentLetter = commandEnd + 1;\r\n\r\n            var cmdFunc = this.textCommands[cmdName];\r\n            if (!cmdFunc) {\r\n                throw `Invalid command name \"${cmdName}\" in string: ${currStr}`;\r\n            }\r\n            if (cmdFunc(cmdArg)) {\r\n                this.Progress();\r\n            }\r\n        }\r\n        if ( (this.instant || this.userInstant) && !this.IsPageDone()) {\r\n            this.Progress();\r\n        }\r\n    }\r\n\r\n    IsPageDone() {\r\n        return this.currentLetter >= this.text[this.currentPage].length;\r\n    }\r\n\r\n    TimeLoop() {\r\n        if (!this.IsPageDone()) {\r\n            this.lastTimeout = setTimeout(function() {\r\n                this.nextWait = this.speed;\r\n                this.Progress();\r\n                this.TimeLoop();\r\n            }.bind(this), this.nextWait);\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/text_engine.js?");

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