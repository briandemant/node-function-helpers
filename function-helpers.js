(function() {
	"use strict";

	var h = {};
	var slice = Array.prototype.slice;

	/**
	 * wraps a function so that it can only be called every `wait` millis
	 *
	 * @params fn function to be throttled
	 * @params timeout time between calls to fn
	 * @type {Function}
	 */
	var throttle = h.throttle = function throttle(fn, wait) {
		var timeout, nextWait, result;
		var last = 0;

		return function throttleFn() {
			var context = this;
			var args = slice.call(arguments);
			var now = +new Date();
			nextWait = Math.min(wait, Math.max(wait - (now - last), 0));
			if (!nextWait) {
				result = fn.apply(context, args);
				last = now;
			} else if (!timeout) {
				timeout = setTimeout(function() {
					timeout = null;
					fn.apply(context, args);
					last = +new Date();
				}, nextWait);
			}
			return result;
		};
	};

	/**
	 * wrap a function so that it only will be execute once.
	 * returns the first result on every consecutive call
	 *
	 * @params fn function to be wrapped
	 * @type {Function}
	 */
	var once = h.once = function once(fn) {
		var done = false, result;
		return function onceFn() {
			if (!done) {
				done = true;
				result = fn.apply(this, arguments);
			}
			return result;
		};
	};
	/**
	 * wrap a function so that it only will be execute once.
	 * returns the first result on every consecutive call
	 *
	 * @params fn function to be wrapped
	 * @type {Function}
	 */
	var memoize = h.memoize = function(fn, keyFn) {
		var results = {};
		keyFn = keyFn || function(obj) {
			return obj;
		};
		return function() {
			var key = keyFn.apply(this, arguments);
			if (!results[key]) {
				results[key] = fn.apply(this, arguments);
			}
			return results[key];
		};
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = h;
	} else {

		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return h;
			});
		}
		else {  
			var 	oldH = window.h; 
			h.noConflict = function() {
				window.h = oldH;
				return h;
			};
			window.h = h;
		}
	}
})();