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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layer = __webpack_require__(7);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import './layer.less';
function layer() {
    return {
        name: 'layer',
        tpl: _layer2.default
    };
}

exports.default = layer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?importLoaders=1!../../node_modules/_postcss-loader@2.0.5@postcss-loader/lib/index.js!./common.css", function() {
			var newContent = require("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?importLoaders=1!../../node_modules/_postcss-loader@2.0.5@postcss-loader/lib/index.js!./common.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _layer = __webpack_require__(2);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
	var dom = document.getElementById('app');
	var layer = new _layer2.default();
	dom.innerHTML = layer.tpl;
};
//require('./css/common.css');


new App();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(6), "");

// module
exports.push([module.i, "*{\r\n\tmargin:0;\r\n\tpadding: 0;\r\n}\r\nhtml,body{\r\n\tbackground: orange;\r\n\tcolor: #FFF;\r\n\tfont-size: 30px;\r\n}\r\n\r\nul,ol,li{\r\n\tlist-style: none;\r\n\r\n}\r\n\r\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".flex{\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\tborder-radius: 20px;\r\n\tbackground-size: 20px 30px;\r\n\tbackground-image: url(" + __webpack_require__(1) + ");\r\n}\r\n\r\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"layer\">\r\n    <div><img src=\"" + __webpack_require__(1) + "\" /></div>  \r\n\t<div>this is layer!!!</div>\r\n</div>";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);

	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map