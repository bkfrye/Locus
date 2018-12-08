/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/**
 * @license
 * Video.js 7.3.0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("global/window"),require("global/document")):"function"==typeof define&&define.amd?define(["global/window","global/document"],e):t.videojs=e(t.window,t.document)}(this,function(v,d){v=v&&v.hasOwnProperty("default")?v.default:v,d=d&&d.hasOwnProperty("default")?d.default:d;var p="7.3.0";function f(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e,i){return(s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,i){var n=[null];n.push.apply(n,e);var r=new(Function.bind.apply(t,n));return i&&a(r,i.prototype),r}).apply(null,arguments)}function m(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function e(t,e){return e||(e=t.slice(0)),t.raw=e,t}var u=[],t=function(s,o){return function(t,e,i){var n=o.levels[e],r=new RegExp("^("+n+")$");if("log"!==t&&i.unshift(t.toUpperCase()+":"),i.unshift(s+":"),u&&u.push([].concat(i)),v.console){var a=v.console[t];a||"debug"!==t||(a=v.console.info||v.console.log),a&&n&&r.test(t)&&a[Array.isArray(i)?"apply":"call"](v.console,i)}}};var g=function e(i){var n,r="info",a=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];n("log",r,e)};return n=t(i,a),a.createLogger=function(t){return e(i+": "+t)},a.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:r},a.level=function(t){if("string"==typeof t){if(!a.levels.hasOwnProperty(t))throw new Error('"'+t+'" in not a valid log level');r=t}return r},(a.history=function(){return u?[].concat(u):[]}).filter=function(e){return(u||[]).filter(function(t){return new RegExp(".*"+e+".*").test(t[0])})},a.history.clear=function(){u&&(u.length=0)},a.history.disable=function(){null!==u&&(u.length=0,u=null)},a.history.enable=function(){null===u&&(u=[])},a.error=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n("error",r,e)},a.warn=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n("warn",r,e)},a.debug=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n("debug",r,e)},a}("VIDEOJS"),y=g.createLogger;var _=function(t){for(var e="",i=0;i<arguments.length;i++)e+=t[i].replace(/\n\r?\s*/g,"")+(arguments[i+1]||"");return e},i=Object.prototype.toString,r=function(t){return l(t)?Object.keys(t):[]};function o(e,i){r(e).forEach(function(t){return i(e[t],t)})}function b(i){for(var t=arguments.length,e=new Array(1<t?t-1:0),n=1;n<t;n++)e[n-1]=arguments[n];return Object.assign?Object.assign.apply(Object,[i].concat(e)):(e.forEach(function(t){t&&o(t,function(t,e){i[e]=t})}),i)}function l(t){return!!t&&"object"==typeof t}function c(t){return l(t)&&"[object Object]"===i.call(t)&&t.constructor===Object}function n(t,e){if(!t||!e)return"";if("function"!=typeof v.getComputedStyle)return"";var i=v.getComputedStyle(t);return i?i[e]:""}function h(){var t=e(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]);return h=function(){return t},t}function T(t){return"string"==typeof t&&/\S/.test(t)}function S(t){if(/\s/.test(t))throw new Error("class has illegal whitespace characters")}function k(){return d===v.document}function w(t){return l(t)&&1===t.nodeType}function C(){try{return v.parent!==v.self}catch(t){return!0}}function E(n){return function(t,e){if(!T(t))return d[n](null);T(e)&&(e=d.querySelector(e));var i=w(e)?e:d;return i[n]&&i[n](t)}}function A(t,i,e,n){void 0===t&&(t="div"),void 0===i&&(i={}),void 0===e&&(e={});var r=d.createElement(t);return Object.getOwnPropertyNames(i).forEach(function(t){var e=i[t];-1!==t.indexOf("aria-")||"role"===t||"type"===t?(g.warn(_(h(),t,e)),r.setAttribute(t,e)):"textContent"===t?L(r,e):r[t]=e}),Object.getOwnPropertyNames(e).forEach(function(t){r.setAttribute(t,e[t])}),n&&X(r,n),r}function L(t,e){return"undefined"==typeof t.textContent?t.innerText=e:t.textContent=e,t}function O(t,e){e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}function P(t,e){return S(e),t.classList?t.classList.contains(e):(i=e,new RegExp("(^|\\s)"+i+"($|\\s)")).test(t.className);var i}function U(t,e){return t.classList?t.classList.add(e):P(t,e)||(t.className=(t.className+" "+e).trim()),t}function x(t,e){return t.classList?t.classList.remove(e):(S(e),t.className=t.className.split(/\s+/).filter(function(t){return t!==e}).join(" ")),t}function I(t,e,i){var n=P(t,e);if("function"==typeof i&&(i=i(t,e)),"boolean"!=typeof i&&(i=!n),i!==n)return i?U(t,e):x(t,e),t}function D(i,n){Object.getOwnPropertyNames(n).forEach(function(t){var e=n[t];null===e||"undefined"==typeof e||!1===e?i.removeAttribute(t):i.setAttribute(t,!0===e?"":e)})}function R(t){var e={},i=",autoplay,controls,playsinline,loop,muted,default,defaultMuted,";if(t&&t.attributes&&0<t.attributes.length)for(var n=t.attributes,r=n.length-1;0<=r;r--){var a=n[r].name,s=n[r].value;"boolean"!=typeof t[a]&&-1===i.indexOf(","+a+",")||(s=null!==s),e[a]=s}return e}function M(t,e){return t.getAttribute(e)}function B(t,e,i){t.setAttribute(e,i)}function N(t,e){t.removeAttribute(e)}function j(){d.body.focus(),d.onselectstart=function(){return!1}}function F(){d.onselectstart=function(){return!0}}function V(t){if(t&&t.getBoundingClientRect&&t.parentNode){var e=t.getBoundingClientRect(),i={};return["bottom","height","left","right","top","width"].forEach(function(t){void 0!==e[t]&&(i[t]=e[t])}),i.height||(i.height=parseFloat(n(t,"height"))),i.width||(i.width=parseFloat(n(t,"width"))),i}}function H(t){var e;if(t.getBoundingClientRect&&t.parentNode&&(e=t.getBoundingClientRect()),!e)return{left:0,top:0};var i=d.documentElement,n=d.body,r=i.clientLeft||n.clientLeft||0,a=v.pageXOffset||n.scrollLeft,s=e.left+a-r,o=i.clientTop||n.clientTop||0,u=v.pageYOffset||n.scrollTop,l=e.top+u-o;return{left:Math.round(s),top:Math.round(l)}}function q(t,e){var i={},n=H(t),r=t.offsetWidth,a=t.offsetHeight,s=n.top,o=n.left,u=e.pageY,l=e.pageX;return e.changedTouches&&(l=e.changedTouches[0].pageX,u=e.changedTouches[0].pageY),i.y=Math.max(0,Math.min(1,(s-u+a)/a)),i.x=Math.max(0,Math.min(1,(l-o)/r)),i}function z(t){return l(t)&&3===t.nodeType}function W(t){for(;t.firstChild;)t.removeChild(t.firstChild);return t}function G(t){return"function"==typeof t&&(t=t()),(Array.isArray(t)?t:[t]).map(function(t){return"function"==typeof t&&(t=t()),w(t)||z(t)?t:"string"==typeof t&&/\S/.test(t)?d.createTextNode(t):void 0}).filter(function(t){return t})}function X(e,t){return G(t).forEach(function(t){return e.appendChild(t)}),e}function Y(t,e){return X(W(t),e)}function $(t){return void 0===t.button&&void 0===t.buttons||(0===t.button&&void 0===t.buttons||0===t.button&&1===t.buttons)}var K=E("querySelector"),Q=E("querySelectorAll"),J=Object.freeze({isReal:k,isEl:w,isInFrame:C,createEl:A,textContent:L,prependTo:O,hasClass:P,addClass:U,removeClass:x,toggleClass:I,setAttributes:D,getAttributes:R,getAttribute:M,setAttribute:B,removeAttribute:N,blockTextSelection:j,unblockTextSelection:F,getBoundingClientRect:V,findPosition:H,getPointerPosition:q,isTextNode:z,emptyEl:W,normalizeContent:G,appendContent:X,insertContent:Y,isSingleLeftClick:$,$:K,$$:Q}),Z=1;function tt(){return Z++}var et={},it="vdata"+(new Date).getTime();function nt(t){var e=t[it];return e||(e=t[it]=tt()),et[e]||(et[e]={}),et[e]}function rt(t){var e=t[it];return!!e&&!!Object.getOwnPropertyNames(et[e]).length}function at(e){var t=e[it];if(t){delete et[t];try{delete e[it]}catch(t){e.removeAttribute?e.removeAttribute(it):e[it]=null}}}function st(t,e){var i=nt(t);0===i.handlers[e].length&&(delete i.handlers[e],t.removeEventListener?t.removeEventListener(e,i.dispatcher,!1):t.detachEvent&&t.detachEvent("on"+e,i.dispatcher)),Object.getOwnPropertyNames(i.handlers).length<=0&&(delete i.handlers,delete i.dispatcher,delete i.disabled),0===Object.getOwnPropertyNames(i).length&&at(t)}function ot(e,i,t,n){t.forEach(function(t){e(i,t,n)})}function ut(t){function e(){return!0}function i(){return!1}if(!t||!t.isPropagationStopped){var n=t||v.event;for(var r in t={},n)"layerX"!==r&&"layerY"!==r&&"keyLocation"!==r&&"webkitMovementX"!==r&&"webkitMovementY"!==r&&("returnValue"===r&&n.preventDefault||(t[r]=n[r]));if(t.target||(t.target=t.srcElement||d),t.relatedTarget||(t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement),t.preventDefault=function(){n.preventDefault&&n.preventDefault(),t.returnValue=!1,n.returnValue=!1,t.defaultPrevented=!0},t.defaultPrevented=!1,t.stopPropagation=function(){n.stopPropagation&&n.stopPropagation(),t.cancelBubble=!0,n.cancelBubble=!0,t.isPropagationStopped=e},t.isPropagationStopped=i,t.stopImmediatePropagation=function(){n.stopImmediatePropagation&&n.stopImmediatePropagation(),t.isImmediatePropagationStopped=e,t.stopPropagation()},t.isImmediatePropagationStopped=i,null!==t.clientX&&void 0!==t.clientX){var a=d.documentElement,s=d.body;t.pageX=t.clientX+(a&&a.scrollLeft||s&&s.scrollLeft||0)-(a&&a.clientLeft||s&&s.clientLeft||0),t.pageY=t.clientY+(a&&a.scrollTop||s&&s.scrollTop||0)-(a&&a.clientTop||s&&s.clientTop||0)}t.which=t.charCode||t.keyCode,null!==t.button&&void 0!==t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0)}return t}var lt=!1;!function(){try{var t=Object.defineProperty({},"passive",{get:function(){lt=!0}});v.addEventListener("test",null,t),v.removeEventListener("test",null,t)}catch(t){}}();var ct=["touchstart","touchmove"];function ht(s,t,e){if(Array.isArray(t))return ot(ht,s,t,e);var o=nt(s);if(o.handlers||(o.handlers={}),o.handlers[t]||(o.handlers[t]=[]),e.guid||(e.guid=tt()),o.handlers[t].push(e),o.dispatcher||(o.disabled=!1,o.dispatcher=function(t,e){if(!o.disabled){t=ut(t);var i=o.handlers[t.type];if(i)for(var n=i.slice(0),r=0,a=n.length;r<a&&!t.isImmediatePropagationStopped();r++)try{n[r].call(s,t,e)}catch(t){g.error(t)}}}),1===o.handlers[t].length)if(s.addEventListener){var i=!1;lt&&-1<ct.indexOf(t)&&(i={passive:!0}),s.addEventListener(t,o.dispatcher,i)}else s.attachEvent&&s.attachEvent("on"+t,o.dispatcher)}function dt(t,e,i){if(rt(t)){var n=nt(t);if(n.handlers){if(Array.isArray(e))return ot(dt,t,e,i);var r=function(t,e){n.handlers[e]=[],st(t,e)};if(void 0!==e){var a=n.handlers[e];if(a)if(i){if(i.guid)for(var s=0;s<a.length;s++)a[s].guid===i.guid&&a.splice(s--,1);st(t,e)}else r(t,e)}else for(var o in n.handlers)Object.prototype.hasOwnProperty.call(n.handlers||{},o)&&r(t,o)}}}function pt(t,e,i){var n=rt(t)?nt(t):{},r=t.parentNode||t.ownerDocument;if("string"==typeof e?e={type:e,target:t}:e.target||(e.target=t),e=ut(e),n.dispatcher&&n.dispatcher.call(t,e,i),r&&!e.isPropagationStopped()&&!0===e.bubbles)pt.call(null,r,e,i);else if(!r&&!e.defaultPrevented){var a=nt(e.target);e.target[e.type]&&(a.disabled=!0,"function"==typeof e.target[e.type]&&e.target[e.type](),a.disabled=!1)}return!e.defaultPrevented}function ft(e,i,n){if(Array.isArray(i))return ot(ft,e,i,n);var t=function t(){dt(e,i,t),n.apply(this,arguments)};t.guid=n.guid=n.guid||tt(),ht(e,i,t)}var mt,gt=Object.freeze({fixEvent:ut,on:ht,off:dt,trigger:pt,one:ft}),yt=!1,vt=function(){if(k()&&!1!==mt.options.autoSetup){var t=Array.prototype.slice.call(d.getElementsByTagName("video")),e=Array.prototype.slice.call(d.getElementsByTagName("audio")),i=Array.prototype.slice.call(d.getElementsByTagName("video-js")),n=t.concat(e,i);if(n&&0<n.length)for(var r=0,a=n.length;r<a;r++){var s=n[r];if(!s||!s.getAttribute){_t(1);break}void 0===s.player&&null!==s.getAttribute("data-setup")&&mt(s)}else yt||_t(1)}};function _t(t,e){e&&(mt=e),v.setTimeout(vt,t)}k()&&"complete"===d.readyState?yt=!0:ft(v,"load",function(){yt=!0});var bt,Tt=function(t){var e=d.createElement("style");return e.className=t,e},St=function(t,e){t.styleSheet?t.styleSheet.cssText=e:t.textContent=e},kt=function(t,e,i){e.guid||(e.guid=tt());var n=function(){return e.apply(t,arguments)};return n.guid=i?i+"_"+e.guid:e.guid,n},wt=function(e,i){var n=Date.now();return function(){var t=Date.now();i<=t-n&&(e.apply(void 0,arguments),n=t)}},Ct=function(){};Ct.prototype.allowedEvents_={},Ct.prototype.addEventListener=Ct.prototype.on=function(t,e){var i=this.addEventListener;this.addEventListener=function(){},ht(this,t,e),this.addEventListener=i},Ct.prototype.removeEventListener=Ct.prototype.off=function(t,e){dt(this,t,e)},Ct.prototype.one=function(t,e){var i=this.addEventListener;this.addEventListener=function(){},ft(this,t,e),this.addEventListener=i},Ct.prototype.dispatchEvent=Ct.prototype.trigger=function(t){var e=t.type||t;"string"==typeof t&&(t={type:e}),t=ut(t),this.allowedEvents_[e]&&this["on"+e]&&this["on"+e](t),pt(this,t)},Ct.prototype.queueTrigger=function(t){var e=this;bt||(bt=new Map);var i=t.type||t,n=bt.get(this);n||(n=new Map,bt.set(this,n));var r=n.get(i);n.delete(i),v.clearTimeout(r);var a=v.setTimeout(function(){0===n.size&&(n=null,bt.delete(e)),e.trigger(t)},0);n.set(i,a)};var Et=function(e){return e instanceof Ct||!!e.eventBusEl_&&["on","one","off","trigger"].every(function(t){return"function"==typeof e[t]})},At=function(t){return"string"==typeof t&&/\S/.test(t)||Array.isArray(t)&&!!t.length},Lt=function(t){if(!t.nodeName&&!Et(t))throw new Error("Invalid target; must be a DOM node or evented object.")},Ot=function(t){if(!At(t))throw new Error("Invalid event type; must be a non-empty string or array.")},Pt=function(t){if("function"!=typeof t)throw new Error("Invalid listener; must be a function.")},Ut=function(t,e){var i,n,r,a=e.length<3||e[0]===t||e[0]===t.eventBusEl_;return r=a?(i=t.eventBusEl_,3<=e.length&&e.shift(),n=e[0],e[1]):(i=e[0],n=e[1],e[2]),Lt(i),Ot(n),Pt(r),{isTargetingSelf:a,target:i,type:n,listener:r=kt(t,r)}},xt=function(t,e,i,n){Lt(t),t.nodeName?gt[e](t,i,n):t[e](i,n)},It={on:function(){for(var t=this,e=arguments.length,i=new Array(e),n=0;n<e;n++)i[n]=arguments[n];var r=Ut(this,i),a=r.isTargetingSelf,s=r.target,o=r.type,u=r.listener;if(xt(s,"on",o,u),!a){var l=function(){return t.off(s,o,u)};l.guid=u.guid;var c=function(){return t.off("dispose",l)};c.guid=u.guid,xt(this,"on","dispose",l),xt(s,"on","dispose",c)}},one:function(){for(var r=this,t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=Ut(this,e),a=n.isTargetingSelf,s=n.target,o=n.type,u=n.listener;if(a)xt(s,"one",o,u);else{var l=function t(){r.off(s,o,t);for(var e=arguments.length,i=new Array(e),n=0;n<e;n++)i[n]=arguments[n];u.apply(null,i)};l.guid=u.guid,xt(s,"one",o,l)}},off:function(t,e,i){if(!t||At(t))dt(this.eventBusEl_,t,e);else{var n=t,r=e;Lt(n),Ot(r),Pt(i),i=kt(this,i),this.off("dispose",i),n.nodeName?(dt(n,r,i),dt(n,"dispose",i)):Et(n)&&(n.off(r,i),n.off("dispose",i))}},trigger:function(t,e){return pt(this.eventBusEl_,t,e)}};function Dt(t,e){void 0===e&&(e={});var i=e.eventBusKey;if(i){if(!t[i].nodeName)throw new Error('The eventBusKey "'+i+'" does not refer to an element.');t.eventBusEl_=t[i]}else t.eventBusEl_=A("span",{className:"vjs-event-bus"});return b(t,It),t.on("dispose",function(){t.off(),v.setTimeout(function(){t.eventBusEl_=null},0)}),t}var Rt={state:{},setState:function(t){var i,n=this;return"function"==typeof t&&(t=t()),o(t,function(t,e){n.state[e]!==t&&((i=i||{})[e]={from:n.state[e],to:t}),n.state[e]=t}),i&&Et(this)&&this.trigger({changes:i,type:"statechanged"}),i}};function Mt(t,e){return b(t,Rt),t.state=b({},t.state,e),"function"==typeof t.handleStateChanged&&Et(t)&&t.on("statechanged",t.handleStateChanged),t}function Bt(t){return"string"!=typeof t?t:t.charAt(0).toUpperCase()+t.slice(1)}function Nt(){for(var i={},t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.forEach(function(t){t&&o(t,function(t,e){c(t)?(c(i[e])||(i[e]={}),i[e]=Nt(i[e],t)):i[e]=t})}),i}var jt=function(){function l(t,e,i){if(!t&&this.play?this.player_=t=this:this.player_=t,this.options_=Nt({},this.options_),e=this.options_=Nt(this.options_,e),this.id_=e.id||e.el&&e.el.id,!this.id_){var n=t&&t.id&&t.id()||"no_player";this.id_=n+"_component_"+tt()}this.name_=e.name||null,e.el?this.el_=e.el:!1!==e.createEl&&(this.el_=this.createEl()),!1!==e.evented&&Dt(this,{eventBusKey:this.el_?"el_":null}),Mt(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},!(this.childNameIndex_={})!==e.initChildren&&this.initChildren(),this.ready(i),!1!==e.reportTouchActivity&&this.enableTouchActivity()}var t=l.prototype;return t.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var t=this.children_.length-1;0<=t;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.el_&&(this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),at(this.el_),this.el_=null),this.player_=null},t.player=function(){return this.player_},t.options=function(t){return g.warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),t&&(this.options_=Nt(this.options_,t)),this.options_},t.el=function(){return this.el_},t.createEl=function(t,e,i){return A(t,e,i)},t.localize=function(t,r,e){void 0===e&&(e=t);var i=this.player_.language&&this.player_.language(),n=this.player_.languages&&this.player_.languages(),a=n&&n[i],s=i&&i.split("-")[0],o=n&&n[s],u=e;return a&&a[t]?u=a[t]:o&&o[t]&&(u=o[t]),r&&(u=u.replace(/\{(\d+)\}/g,function(t,e){var i=r[e-1],n=i;return"undefined"==typeof i&&(n=t),n})),u},t.contentEl=function(){return this.contentEl_||this.el_},t.id=function(){return this.id_},t.name=function(){return this.name_},t.children=function(){return this.children_},t.getChildById=function(t){return this.childIndex_[t]},t.getChild=function(t){if(t)return t=Bt(t),this.childNameIndex_[t]},t.addChild=function(t,e,i){var n,r;if(void 0===e&&(e={}),void 0===i&&(i=this.children_.length),"string"==typeof t){r=Bt(t);var a=e.componentClass||r;e.name=r;var s=l.getComponent(a);if(!s)throw new Error("Component "+a+" does not exist");if("function"!=typeof s)return null;n=new s(this.player_||this,e)}else n=t;if(this.children_.splice(i,0,n),"function"==typeof n.id&&(this.childIndex_[n.id()]=n),(r=r||n.name&&Bt(n.name()))&&(this.childNameIndex_[r]=n),"function"==typeof n.el&&n.el()){var o=this.contentEl().children[i]||null;this.contentEl().insertBefore(n.el(),o)}return n},t.removeChild=function(t){if("string"==typeof t&&(t=this.getChild(t)),t&&this.children_){for(var e=!1,i=this.children_.length-1;0<=i;i--)if(this.children_[i]===t){e=!0,this.children_.splice(i,1);break}if(e){this.childIndex_[t.id()]=null,this.childNameIndex_[t.name()]=null;var n=t.el();n&&n.parentNode===this.contentEl()&&this.contentEl().removeChild(t.el())}}},t.initChildren=function(){var r=this,n=this.options_.children;if(n){var t,a=this.options_,i=l.getComponent("Tech");(t=Array.isArray(n)?n:Object.keys(n)).concat(Object.keys(this.options_).filter(function(e){return!t.some(function(t){return"string"==typeof t?e===t:e===t.name})})).map(function(t){var e,i;return i="string"==typeof t?n[e=t]||r.options_[e]||{}:(e=t.name,t),{name:e,opts:i}}).filter(function(t){var e=l.getComponent(t.opts.componentClass||Bt(t.name));return e&&!i.isTech(e)}).forEach(function(t){var e=t.name,i=t.opts;if(void 0!==a[e]&&(i=a[e]),!1!==i){!0===i&&(i={}),i.playerOptions=r.options_.playerOptions;var n=r.addChild(e,i);n&&(r[e]=n)}})}},t.buildCSSClass=function(){return""},t.ready=function(t,e){if(void 0===e&&(e=!1),t)return this.isReady_?void(e?t.call(this):this.setTimeout(t,1)):(this.readyQueue_=this.readyQueue_||[],void this.readyQueue_.push(t))},t.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var t=this.readyQueue_;this.readyQueue_=[],t&&0<t.length&&t.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)},t.$=function(t,e){return K(t,e||this.contentEl())},t.$$=function(t,e){return Q(t,e||this.contentEl())},t.hasClass=function(t){return P(this.el_,t)},t.addClass=function(t){U(this.el_,t)},t.removeClass=function(t){x(this.el_,t)},t.toggleClass=function(t,e){I(this.el_,t,e)},t.show=function(){this.removeClass("vjs-hidden")},t.hide=function(){this.addClass("vjs-hidden")},t.lockShowing=function(){this.addClass("vjs-lock-showing")},t.unlockShowing=function(){this.removeClass("vjs-lock-showing")},t.getAttribute=function(t){return M(this.el_,t)},t.setAttribute=function(t,e){B(this.el_,t,e)},t.removeAttribute=function(t){N(this.el_,t)},t.width=function(t,e){return this.dimension("width",t,e)},t.height=function(t,e){return this.dimension("height",t,e)},t.dimensions=function(t,e){this.width(t,!0),this.height(e)},t.dimension=function(t,e,i){if(void 0!==e)return null!==e&&e==e||(e=0),-1!==(""+e).indexOf("%")||-1!==(""+e).indexOf("px")?this.el_.style[t]=e:this.el_.style[t]="auto"===e?"":e+"px",void(i||this.trigger("componentresize"));if(!this.el_)return 0;var n=this.el_.style[t],r=n.indexOf("px");return-1!==r?parseInt(n.slice(0,r),10):parseInt(this.el_["offset"+Bt(t)],10)},t.currentDimension=function(t){var e=0;if("width"!==t&&"height"!==t)throw new Error("currentDimension only accepts width or height value");if("function"==typeof v.getComputedStyle){var i=v.getComputedStyle(this.el_);e=i.getPropertyValue(t)||i[t]}if(0===(e=parseFloat(e))){var n="offset"+Bt(t);e=this.el_[n]}return e},t.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},t.currentWidth=function(){return this.currentDimension("width")},t.currentHeight=function(){return this.currentDimension("height")},t.focus=function(){this.el_.focus()},t.blur=function(){this.el_.blur()},t.emitTapEvents=function(){var n,e=0,r=null;this.on("touchstart",function(t){1===t.touches.length&&(r={pageX:t.touches[0].pageX,pageY:t.touches[0].pageY},e=(new Date).getTime(),n=!0)}),this.on("touchmove",function(t){if(1<t.touches.length)n=!1;else if(r){var e=t.touches[0].pageX-r.pageX,i=t.touches[0].pageY-r.pageY;10<Math.sqrt(e*e+i*i)&&(n=!1)}});var t=function(){n=!1};this.on("touchleave",t),this.on("touchcancel",t),this.on("touchend",function(t){!(r=null)===n&&((new Date).getTime()-e<200&&(t.preventDefault(),this.trigger("tap")))})},t.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var e,i=kt(this.player(),this.player().reportUserActivity);this.on("touchstart",function(){i(),this.clearInterval(e),e=this.setInterval(i,250)});var t=function(t){i(),this.clearInterval(e)};this.on("touchmove",i),this.on("touchend",t),this.on("touchcancel",t)}},t.setTimeout=function(t,e){var i,n,r=this;return t=kt(this,t),i=v.setTimeout(function(){r.off("dispose",n),t()},e),(n=function(){return r.clearTimeout(i)}).guid="vjs-timeout-"+i,this.on("dispose",n),i},t.clearTimeout=function(t){v.clearTimeout(t);var e=function(){};return e.guid="vjs-timeout-"+t,this.off("dispose",e),t},t.setInterval=function(t,e){var i=this;t=kt(this,t);var n=v.setInterval(t,e),r=function(){return i.clearInterval(n)};return r.guid="vjs-interval-"+n,this.on("dispose",r),n},t.clearInterval=function(t){v.clearInterval(t);var e=function(){};return e.guid="vjs-interval-"+t,this.off("dispose",e),t},t.requestAnimationFrame=function(t){var e,i,n=this;return this.supportsRaf_?(t=kt(this,t),e=v.requestAnimationFrame(function(){n.off("dispose",i),t()}),(i=function(){return n.cancelAnimationFrame(e)}).guid="vjs-raf-"+e,this.on("dispose",i),e):this.setTimeout(t,1e3/60)},t.cancelAnimationFrame=function(t){if(this.supportsRaf_){v.cancelAnimationFrame(t);var e=function(){};return e.guid="vjs-raf-"+t,this.off("dispose",e),t}return this.clearTimeout(t)},l.registerComponent=function(t,e){if("string"!=typeof t||!t)throw new Error('Illegal component name, "'+t+'"; must be a non-empty string.');var i,n=l.getComponent("Tech"),r=n&&n.isTech(e),a=l===e||l.prototype.isPrototypeOf(e.prototype);if(r||!a)throw i=r?"techs must be registered using Tech.registerTech()":"must be a Component subclass",new Error('Illegal component, "'+t+'"; '+i+".");t=Bt(t),l.components_||(l.components_={});var s=l.getComponent("Player");if("Player"===t&&s&&s.players){var o=s.players,u=Object.keys(o);if(o&&0<u.length&&u.map(function(t){return o[t]}).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return l.components_[t]=e},l.getComponent=function(t){if(t)return t=Bt(t),l.components_&&l.components_[t]?l.components_[t]:void 0},l}();jt.prototype.supportsRaf_="function"==typeof v.requestAnimationFrame&&"function"==typeof v.cancelAnimationFrame,jt.registerComponent("Component",jt);var Ft,Vt,Ht,qt,zt=v.navigator&&v.navigator.userAgent||"",Wt=/AppleWebKit\/([\d.]+)/i.exec(zt),Gt=Wt?parseFloat(Wt.pop()):null,Xt=/iPad/i.test(zt),Yt=/iPhone/i.test(zt)&&!Xt,$t=/iPod/i.test(zt),Kt=Yt||Xt||$t,Qt=(Ft=zt.match(/OS (\d+)_/i))&&Ft[1]?Ft[1]:null,Jt=/Android/i.test(zt),Zt=function(){var t=zt.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!t)return null;var e=t[1]&&parseFloat(t[1]),i=t[2]&&parseFloat(t[2]);return e&&i?parseFloat(t[1]+"."+t[2]):e||null}(),te=Jt&&Zt<5&&Gt<537,ee=/Firefox/i.test(zt),ie=/Edge/i.test(zt),ne=!ie&&(/Chrome/i.test(zt)||/CriOS/i.test(zt)),re=(Vt=zt.match(/(Chrome|CriOS)\/(\d+)/))&&Vt[2]?parseFloat(Vt[2]):null,ae=(Ht=/MSIE\s(\d+)\.\d/.exec(zt),!(qt=Ht&&parseFloat(Ht[1]))&&/Trident\/7.0/i.test(zt)&&/rv:11.0/.test(zt)&&(qt=11),qt),se=/Safari/i.test(zt)&&!ne&&!Jt&&!ie,oe=(se||Kt)&&!ne,ue=k()&&("ontouchstart"in v||v.navigator.maxTouchPoints||v.DocumentTouch&&v.document instanceof v.DocumentTouch),le=Object.freeze({IS_IPAD:Xt,IS_IPHONE:Yt,IS_IPOD:$t,IS_IOS:Kt,IOS_VERSION:Qt,IS_ANDROID:Jt,ANDROID_VERSION:Zt,IS_NATIVE_ANDROID:te,IS_FIREFOX:ee,IS_EDGE:ie,IS_CHROME:ne,CHROME_VERSION:re,IE_VERSION:ae,IS_SAFARI:se,IS_ANY_SAFARI:oe,TOUCH_ENABLED:ue});function ce(t,e,i,n){return function(t,e,i){if("number"!=typeof e||e<0||i<e)throw new Error("Failed to execute '"+t+"' on 'TimeRanges': The index provided ("+e+") is non-numeric or out of bounds (0-"+i+").")}(t,n,i.length-1),i[n][e]}function he(t){return void 0===t||0===t.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:t.length,start:ce.bind(null,"start",0,t),end:ce.bind(null,"end",1,t)}}function de(t,e){return Array.isArray(t)?he(t):void 0===t||void 0===e?he():he([[t,e]])}function pe(t,e){var i,n,r=0;if(!e)return 0;t&&t.length||(t=de(0,0));for(var a=0;a<t.length;a++)i=t.start(a),e<(n=t.end(a))&&(n=e),r+=n-i;return r/e}for(var fe,me={},ge=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],ye=ge[0],ve=0;ve<ge.length;ve++)if(ge[ve][1]in d){fe=ge[ve];break}if(fe)for(var _e=0;_e<fe.length;_e++)me[ye[_e]]=fe[_e];function be(t){if(t instanceof be)return t;"number"==typeof t?this.code=t:"string"==typeof t?this.message=t:l(t)&&("number"==typeof t.code&&(this.code=t.code),b(this,t)),this.message||(this.message=be.defaultMessages[this.code]||"")}be.prototype.code=0,be.prototype.message="",be.prototype.status=null,be.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],be.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var Te=0;Te<be.errorTypes.length;Te++)be[be.errorTypes[Te]]=Te,be.prototype[be.errorTypes[Te]]=Te;var Se=function(t,e){var i,n=null;try{i=JSON.parse(t,e)}catch(t){n=t}return[n,i]};function ke(t){return null!=t&&"function"==typeof t.then}function we(t){ke(t)&&t.then(null,function(t){})}var Ce=function(n){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(t,e,i){return n[e]&&(t[e]=n[e]),t},{cues:n.cues&&Array.prototype.map.call(n.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})},Ee=function(t){var e=t.$$("track"),i=Array.prototype.map.call(e,function(t){return t.track});return Array.prototype.map.call(e,function(t){var e=Ce(t.track);return t.src&&(e.src=t.src),e}).concat(Array.prototype.filter.call(t.textTracks(),function(t){return-1===i.indexOf(t)}).map(Ce))},Ae=function(t,i){return t.forEach(function(t){var e=i.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(function(t){return e.addCue(t)})}),i.textTracks()},Le="vjs-modal-dialog",Oe=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).opened_=i.hasBeenOpened_=i.hasBeenFilled_=!1,i.closeable(!i.options_.uncloseable),i.content(i.options_.content),i.contentEl_=A("div",{className:Le+"-content"},{role:"document"}),i.descEl_=A("p",{className:Le+"-description vjs-control-text",id:i.el().getAttribute("aria-describedby")}),L(i.descEl_,i.description()),i.el_.appendChild(i.descEl_),i.el_.appendChild(i.contentEl_),i}f(t,n);var e=t.prototype;return e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},e.dispose=function(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,n.prototype.dispose.call(this)},e.buildCSSClass=function(){return Le+" vjs-hidden "+n.prototype.buildCSSClass.call(this)},e.handleKeyPress=function(t){27===t.which&&this.closeable()&&this.close()},e.label=function(){return this.localize(this.options_.label||"Modal Window")},e.description=function(){var t=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(t+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),t},e.open=function(){if(!this.opened_){var t=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!t.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&t.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",kt(this,this.handleKeyPress)),this.hadControls_=t.controls(),t.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}},e.opened=function(t){return"boolean"==typeof t&&this[t?"open":"close"](),this.opened_},e.close=function(){if(this.opened_){var t=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&t.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",kt(this,this.handleKeyPress)),this.hadControls_&&t.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}},e.closeable=function(t){if("boolean"==typeof t){var e=this.closeable_=!!t,i=this.getChild("closeButton");if(e&&!i){var n=this.contentEl_;this.contentEl_=this.el_,i=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=n,this.on(i,"close",this.close)}!e&&i&&(this.off(i,"close",this.close),this.removeChild(i),i.dispose())}return this.closeable_},e.fill=function(){this.fillWith(this.content())},e.fillWith=function(t){var e=this.contentEl(),i=e.parentNode,n=e.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,i.removeChild(e),this.empty(),Y(e,t),this.trigger("modalfill"),n?i.insertBefore(e,n):i.appendChild(e);var r=this.getChild("closeButton");r&&i.appendChild(r.el_)},e.empty=function(){this.trigger("beforemodalempty"),W(this.contentEl()),this.trigger("modalempty")},e.content=function(t){return"undefined"!=typeof t&&(this.content_=t),this.content_},e.conditionalFocus_=function(){var t=d.activeElement,e=this.player_.el_;this.previouslyActiveEl_=null,(e.contains(t)||e===t)&&(this.previouslyActiveEl_=t,this.focus(),this.on(d,"keydown",this.handleKeyDown))},e.conditionalBlur_=function(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null),this.off(d,"keydown",this.handleKeyDown)},e.handleKeyDown=function(t){if(9===t.which){for(var e,i=this.focusableEls_(),n=this.el_.querySelector(":focus"),r=0;r<i.length;r++)if(n===i[r]){e=r;break}d.activeElement===this.el_&&(e=0),t.shiftKey&&0===e?(i[i.length-1].focus(),t.preventDefault()):t.shiftKey||e!==i.length-1||(i[0].focus(),t.preventDefault())}},e.focusableEls_=function(){var t=this.el_.querySelectorAll("*");return Array.prototype.filter.call(t,function(t){return(t instanceof v.HTMLAnchorElement||t instanceof v.HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof v.HTMLInputElement||t instanceof v.HTMLSelectElement||t instanceof v.HTMLTextAreaElement||t instanceof v.HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof v.HTMLIFrameElement||t instanceof v.HTMLObjectElement||t instanceof v.HTMLEmbedElement||t.hasAttribute("tabindex")&&-1!==t.getAttribute("tabindex")||t.hasAttribute("contenteditable")})},t}(jt);Oe.prototype.options_={pauseOnOpen:!0,temporary:!0},jt.registerComponent("ModalDialog",Oe);var Pe=function(n){function t(t){var e;void 0===t&&(t=[]),(e=n.call(this)||this).tracks_=[],Object.defineProperty(m(m(e)),"length",{get:function(){return this.tracks_.length}});for(var i=0;i<t.length;i++)e.addTrack(t[i]);return e}f(t,n);var e=t.prototype;return e.addTrack=function(t){var e=this.tracks_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.tracks_[e]}}),-1===this.tracks_.indexOf(t)&&(this.tracks_.push(t),this.trigger({track:t,type:"addtrack"}))},e.removeTrack=function(t){for(var e,i=0,n=this.length;i<n;i++)if(this[i]===t){(e=this[i]).off&&e.off(),this.tracks_.splice(i,1);break}e&&this.trigger({track:e,type:"removetrack"})},e.getTrackById=function(t){for(var e=null,i=0,n=this.length;i<n;i++){var r=this[i];if(r.id===t){e=r;break}}return e},t}(Ct);for(var Ue in Pe.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"},Pe.prototype.allowedEvents_)Pe.prototype["on"+Ue]=null;var xe=function(t,e){for(var i=0;i<t.length;i++)Object.keys(t[i]).length&&e.id!==t[i].id&&(t[i].enabled=!1)},Ie=function(n){function t(t){var e;void 0===t&&(t=[]);for(var i=t.length-1;0<=i;i--)if(t[i].enabled){xe(t,t[i]);break}return(e=n.call(this,t)||this).changing_=!1,e}return f(t,n),t.prototype.addTrack=function(t){var e=this;t.enabled&&xe(this,t),n.prototype.addTrack.call(this,t),t.addEventListener&&t.addEventListener("enabledchange",function(){e.changing_||(e.changing_=!0,xe(e,t),e.changing_=!1,e.trigger("change"))})},t}(Pe),De=function(t,e){for(var i=0;i<t.length;i++)Object.keys(t[i]).length&&e.id!==t[i].id&&(t[i].selected=!1)},Re=function(n){function t(t){var e;void 0===t&&(t=[]);for(var i=t.length-1;0<=i;i--)if(t[i].selected){De(t,t[i]);break}return(e=n.call(this,t)||this).changing_=!1,Object.defineProperty(m(m(e)),"selectedIndex",{get:function(){for(var t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set:function(){}}),e}return f(t,n),t.prototype.addTrack=function(t){var e=this;t.selected&&De(this,t),n.prototype.addTrack.call(this,t),t.addEventListener&&t.addEventListener("selectedchange",function(){e.changing_||(e.changing_=!0,De(e,t),e.changing_=!1,e.trigger("change"))})},t}(Pe),Me=function(e){function t(){return e.apply(this,arguments)||this}return f(t,e),t.prototype.addTrack=function(t){e.prototype.addTrack.call(this,t),t.addEventListener("modechange",kt(this,function(){this.queueTrigger("change")}));-1===["metadata","chapters"].indexOf(t.kind)&&t.addEventListener("modechange",kt(this,function(){this.trigger("selectedlanguagechange")}))},t}(Pe),Be=function(){function t(t){void 0===t&&(t=[]),this.trackElements_=[],Object.defineProperty(this,"length",{get:function(){return this.trackElements_.length}});for(var e=0,i=t.length;e<i;e++)this.addTrackElement_(t[e])}var e=t.prototype;return e.addTrackElement_=function(t){var e=this.trackElements_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.trackElements_[e]}}),-1===this.trackElements_.indexOf(t)&&this.trackElements_.push(t)},e.getTrackElementByTrack_=function(t){for(var e,i=0,n=this.trackElements_.length;i<n;i++)if(t===this.trackElements_[i].track){e=this.trackElements_[i];break}return e},e.removeTrackElement_=function(t){for(var e=0,i=this.trackElements_.length;e<i;e++)if(t===this.trackElements_[e]){this.trackElements_.splice(e,1);break}},t}(),Ne=function(){function e(t){e.prototype.setCues_.call(this,t),Object.defineProperty(this,"length",{get:function(){return this.length_}})}var t=e.prototype;return t.setCues_=function(t){var e=this.length||0,i=0,n=t.length;this.cues_=t,this.length_=t.length;var r=function(t){""+t in this||Object.defineProperty(this,""+t,{get:function(){return this.cues_[t]}})};if(e<n)for(i=e;i<n;i++)r.call(this,i)},t.getCueById=function(t){for(var e=null,i=0,n=this.length;i<n;i++){var r=this[i];if(r.id===t){e=r;break}}return e},e}(),je={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},Fe={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},Ve={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},He={disabled:"disabled",hidden:"hidden",showing:"showing"},qe=function(a){function t(t){var e;void 0===t&&(t={}),e=a.call(this)||this;var i={id:t.id||"vjs_track_"+tt(),kind:t.kind||"",label:t.label||"",language:t.language||""},n=function(t){Object.defineProperty(m(m(e)),t,{get:function(){return i[t]},set:function(){}})};for(var r in i)n(r);return e}return f(t,a),t}(Ct),ze=function(t){var e=["protocol","hostname","port","pathname","search","hash","host"],i=d.createElement("a");i.href=t;var n,r=""===i.host&&"file:"!==i.protocol;r&&((n=d.createElement("div")).innerHTML='<a href="'+t+'"></a>',i=n.firstChild,n.setAttribute("style","display:none; position:absolute;"),d.body.appendChild(n));for(var a={},s=0;s<e.length;s++)a[e[s]]=i[e[s]];return"http:"===a.protocol&&(a.host=a.host.replace(/:80$/,"")),"https:"===a.protocol&&(a.host=a.host.replace(/:443$/,"")),a.protocol||(a.protocol=v.location.protocol),r&&d.body.removeChild(n),a},We=function(t){if(!t.match(/^https?:\/\//)){var e=d.createElement("div");e.innerHTML='<a href="'+t+'">x</a>',t=e.firstChild.href}return t},Ge=function(t){if("string"==typeof t){var e=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i.exec(t);if(e)return e.pop().toLowerCase()}return""},Xe=function(t){var e=v.location,i=ze(t);return(":"===i.protocol?e.protocol:i.protocol)+i.host!==e.protocol+e.host},Ye=Object.freeze({parseUrl:ze,getAbsoluteURL:We,getFileExtension:Ge,isCrossOrigin:Xe}),$e=function(t){var e=Ke.call(t);return"[object Function]"===e||"function"==typeof t&&"[object RegExp]"!==e||"undefined"!=typeof window&&(t===window.setTimeout||t===window.alert||t===window.confirm||t===window.prompt)},Ke=Object.prototype.toString;"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function Qe(t,e){return t(e={exports:{}},e.exports),e.exports}var Je=Qe(function(t,e){(e=t.exports=function(t){return t.replace(/^\s*|\s*$/g,"")}).left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}}),Ze=(Je.left,Je.right,Function.prototype.toString),ti=/^\s*class\b/,ei=function(t){try{var e=Ze.call(t);return ti.test(e)}catch(t){return!1}},ii=Object.prototype.toString,ni="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,ri=function(t){if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;if(ni)return function(t){try{return!ei(t)&&(Ze.call(t),!0)}catch(t){return!1}}(t);if(ei(t))return!1;var e=ii.call(t);return"[object Function]"===e||"[object GeneratorFunction]"===e},ai=Object.prototype.toString,si=Object.prototype.hasOwnProperty,oi=function(t,e,i){if(!ri(e))throw new TypeError("iterator must be a function");var n;3<=arguments.length&&(n=i),"[object Array]"===ai.call(t)?function(t,e,i){for(var n=0,r=t.length;n<r;n++)si.call(t,n)&&(null==i?e(t[n],n,t):e.call(i,t[n],n,t))}(t,e,n):"string"==typeof t?function(t,e,i){for(var n=0,r=t.length;n<r;n++)null==i?e(t.charAt(n),n,t):e.call(i,t.charAt(n),n,t)}(t,e,n):function(t,e,i){for(var n in t)si.call(t,n)&&(null==i?e(t[n],n,t):e.call(i,t[n],n,t))}(t,e,n)},ui=function(t){if(!t)return{};var a={};return oi(Je(t).split("\n"),function(t){var e,i=t.indexOf(":"),n=Je(t.slice(0,i)).toLowerCase(),r=Je(t.slice(i+1));"undefined"==typeof a[n]?a[n]=r:(e=a[n],"[object Array]"===Object.prototype.toString.call(e)?a[n].push(r):a[n]=[a[n],r])}),a},li=function(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];for(var n in i)ci.call(i,n)&&(t[n]=i[n])}return t},ci=Object.prototype.hasOwnProperty;var hi=pi;function di(t,e,i){var n=t;return $e(e)?(i=e,"string"==typeof t&&(n={uri:t})):n=li(e,{uri:t}),n.callback=i,n}function pi(t,e,i){return fi(e=di(t,e,i))}function fi(n){if("undefined"==typeof n.callback)throw new Error("callback argument missing");var r=!1,a=function(t,e,i){r||(r=!0,n.callback(t,e,i))};function e(t){return clearTimeout(u),t instanceof Error||(t=new Error(""+(t||"Unknown XMLHttpRequest Error"))),t.statusCode=0,a(t,m)}function t(){if(!s){var t;clearTimeout(u),t=n.useXDR&&void 0===o.status?200:1223===o.status?204:o.status;var e=m,i=null;return 0!==t?(e={body:function(){var t=void 0;if(t=o.response?o.response:o.responseText||function(t){if("document"===t.responseType)return t.responseXML;var e=t.responseXML&&"parsererror"===t.responseXML.documentElement.nodeName;return""!==t.responseType||e?null:t.responseXML}(o),f)try{t=JSON.parse(t)}catch(t){}return t}(),statusCode:t,method:c,headers:{},url:l,rawRequest:o},o.getAllResponseHeaders&&(e.headers=ui(o.getAllResponseHeaders()))):i=new Error("Internal XMLHttpRequest Error"),a(i,e,e.body)}}var i,s,o=n.xhr||null;o||(o=n.cors||n.useXDR?new pi.XDomainRequest:new pi.XMLHttpRequest);var u,l=o.url=n.uri||n.url,c=o.method=n.method||"GET",h=n.body||n.data,d=o.headers=n.headers||{},p=!!n.sync,f=!1,m={body:void 0,headers:{},statusCode:0,method:c,url:l,rawRequest:o};if("json"in n&&!1!==n.json&&(f=!0,d.accept||d.Accept||(d.Accept="application/json"),"GET"!==c&&"HEAD"!==c&&(d["content-type"]||d["Content-Type"]||(d["Content-Type"]="application/json"),h=JSON.stringify(!0===n.json?h:n.json))),o.onreadystatechange=function(){4===o.readyState&&setTimeout(t,0)},o.onload=t,o.onerror=e,o.onprogress=function(){},o.onabort=function(){s=!0},o.ontimeout=e,o.open(c,l,!p,n.username,n.password),p||(o.withCredentials=!!n.withCredentials),!p&&0<n.timeout&&(u=setTimeout(function(){if(!s){s=!0,o.abort("timeout");var t=new Error("XMLHttpRequest timeout");t.code="ETIMEDOUT",e(t)}},n.timeout)),o.setRequestHeader)for(i in d)d.hasOwnProperty(i)&&o.setRequestHeader(i,d[i]);else if(n.headers&&!function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}(n.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in n&&(o.responseType=n.responseType),"beforeSend"in n&&"function"==typeof n.beforeSend&&n.beforeSend(o),o.send(h||null),o}pi.XMLHttpRequest=v.XMLHttpRequest||function(){},pi.XDomainRequest="withCredentials"in new pi.XMLHttpRequest?pi.XMLHttpRequest:v.XDomainRequest,function(t,e){for(var i=0;i<t.length;i++)e(t[i])}(["get","put","post","patch","head","delete"],function(n){pi["delete"===n?"del":n]=function(t,e,i){return(e=di(t,e,i)).method=n.toUpperCase(),fi(e)}});var mi=function(t,e){var i=new v.WebVTT.Parser(v,v.vttjs,v.WebVTT.StringDecoder()),n=[];i.oncue=function(t){e.addCue(t)},i.onparsingerror=function(t){n.push(t)},i.onflush=function(){e.trigger({type:"loadeddata",target:e})},i.parse(t),0<n.length&&(v.console&&v.console.groupCollapsed&&v.console.groupCollapsed("Text Track parsing errors for "+e.src),n.forEach(function(t){return g.error(t)}),v.console&&v.console.groupEnd&&v.console.groupEnd()),i.flush()},gi=function(l){function t(t){var e;if(void 0===t&&(t={}),!t.tech)throw new Error("A tech was not provided.");var i=Nt(t,{kind:Ve[t.kind]||"subtitles",language:t.language||t.srclang||""}),n=He[i.mode]||"disabled",r=i.default;"metadata"!==i.kind&&"chapters"!==i.kind||(n="hidden"),(e=l.call(this,i)||this).tech_=i.tech,e.cues_=[],e.activeCues_=[];var a=new Ne(e.cues_),s=new Ne(e.activeCues_),o=!1,u=kt(m(m(e)),function(){this.activeCues=this.activeCues,o&&(this.trigger("cuechange"),o=!1)});return"disabled"!==n&&e.tech_.ready(function(){e.tech_.on("timeupdate",u)},!0),Object.defineProperties(m(m(e)),{default:{get:function(){return r},set:function(){}},mode:{get:function(){return n},set:function(t){var e=this;He[t]&&("disabled"!==(n=t)?this.tech_.ready(function(){e.tech_.on("timeupdate",u)},!0):this.tech_.off("timeupdate",u),this.trigger("modechange"))}},cues:{get:function(){return this.loaded_?a:null},set:function(){}},activeCues:{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return s;for(var t=this.tech_.currentTime(),e=[],i=0,n=this.cues.length;i<n;i++){var r=this.cues[i];r.startTime<=t&&r.endTime>=t?e.push(r):r.startTime===r.endTime&&r.startTime<=t&&r.startTime+.5>=t&&e.push(r)}if(o=!1,e.length!==this.activeCues_.length)o=!0;else for(var a=0;a<e.length;a++)-1===this.activeCues_.indexOf(e[a])&&(o=!0);return this.activeCues_=e,s.setCues_(this.activeCues_),s},set:function(){}}}),i.src?(e.src=i.src,function(t,r){var e={uri:t},i=Xe(t);i&&(e.cors=i),hi(e,kt(this,function(t,e,i){if(t)return g.error(t,e);if(r.loaded_=!0,"function"!=typeof v.WebVTT){if(r.tech_){var n=function(){return mi(i,r)};r.tech_.on("vttjsloaded",n),r.tech_.on("vttjserror",function(){g.error("vttjs failed to load, stopping trying to process "+r.src),r.tech_.off("vttjsloaded",n)})}}else mi(i,r)}))}(i.src,m(m(e)))):e.loaded_=!0,e}f(t,l);var e=t.prototype;return e.addCue=function(t){var e=t;if(v.vttjs&&!(t instanceof v.vttjs.VTTCue)){for(var i in e=new v.vttjs.VTTCue(t.startTime,t.endTime,t.text),t)i in e||(e[i]=t[i]);e.id=t.id,e.originalCue_=t}for(var n=this.tech_.textTracks(),r=0;r<n.length;r++)n[r]!==this&&n[r].removeCue(e);this.cues_.push(e),this.cues.setCues_(this.cues_)},e.removeCue=function(t){for(var e=this.cues_.length;e--;){var i=this.cues_[e];if(i===t||i.originalCue_&&i.originalCue_===t){this.cues_.splice(e,1),this.cues.setCues_(this.cues_);break}}},t}(qe);gi.prototype.allowedEvents_={cuechange:"cuechange"};var yi=function(r){function t(t){var e;void 0===t&&(t={});var i=Nt(t,{kind:Fe[t.kind]||""});e=r.call(this,i)||this;var n=!1;return Object.defineProperty(m(m(e)),"enabled",{get:function(){return n},set:function(t){"boolean"==typeof t&&t!==n&&(n=t,this.trigger("enabledchange"))}}),i.enabled&&(e.enabled=i.enabled),e.loaded_=!0,e}return f(t,r),t}(qe),vi=function(r){function t(t){var e;void 0===t&&(t={});var i=Nt(t,{kind:je[t.kind]||""});e=r.call(this,i)||this;var n=!1;return Object.defineProperty(m(m(e)),"selected",{get:function(){return n},set:function(t){"boolean"==typeof t&&t!==n&&(n=t,this.trigger("selectedchange"))}}),i.selected&&(e.selected=i.selected),e}return f(t,r),t}(qe),_i=function(r){function t(t){var e,i;void 0===t&&(t={}),e=r.call(this)||this;var n=new gi(t);return e.kind=n.kind,e.src=n.src,e.srclang=n.language,e.label=n.label,e.default=n.default,Object.defineProperties(m(m(e)),{readyState:{get:function(){return i}},track:{get:function(){return n}}}),i=0,n.addEventListener("loadeddata",function(){i=2,e.trigger({type:"load",target:m(m(e))})}),e}return f(t,r),t}(Ct);_i.prototype.allowedEvents_={load:"load"},_i.NONE=0,_i.LOADING=1,_i.LOADED=2,_i.ERROR=3;var bi={audio:{ListClass:Ie,TrackClass:yi,capitalName:"Audio"},video:{ListClass:Re,TrackClass:vi,capitalName:"Video"},text:{ListClass:Me,TrackClass:gi,capitalName:"Text"}};Object.keys(bi).forEach(function(t){bi[t].getterName=t+"Tracks",bi[t].privateName=t+"Tracks_"});var Ti={remoteText:{ListClass:Me,TrackClass:gi,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:Be,TrackClass:_i,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},Si=Nt(bi,Ti);Ti.names=Object.keys(Ti),bi.names=Object.keys(bi),Si.names=[].concat(Ti.names).concat(bi.names);var ki=Object.create||function(){function e(){}return function(t){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return e.prototype=t,new e}}();function wi(t,e){this.name="ParsingError",this.code=t.code,this.message=e||t.message}function Ci(t){function e(t,e,i,n){return 3600*(0|t)+60*(0|e)+(0|i)+(0|n)/1e3}var i=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return i?i[3]?e(i[1],i[2],i[3].replace(":",""),i[4]):59<i[1]?e(i[1],i[2],0,i[4]):e(0,i[1],i[2],i[4]):null}function Ei(){this.values=ki(null)}function Ai(t,e,i,n){var r=n?t.split(n):[t];for(var a in r)if("string"==typeof r[a]){var s=r[a].split(i);if(2===s.length)e(s[0],s[1])}}function Li(e,t,a){var i,n,s,r=e;function o(){var t=Ci(e);if(null===t)throw new wi(wi.Errors.BadTimeStamp,"Malformed timestamp: "+r);return e=e.replace(/^[^\sa-zA-Z-]+/,""),t}function u(){e=e.replace(/^\s+/,"")}if(u(),t.startTime=o(),u(),"--\x3e"!==e.substr(0,3))throw new wi(wi.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '--\x3e'): "+r);e=e.substr(3),u(),t.endTime=o(),u(),i=e,n=t,s=new Ei,Ai(i,function(t,e){switch(t){case"region":for(var i=a.length-1;0<=i;i--)if(a[i].id===e){s.set(t,a[i].region);break}break;case"vertical":s.alt(t,e,["rl","lr"]);break;case"line":var n=e.split(","),r=n[0];s.integer(t,r),s.percent(t,r)&&s.set("snapToLines",!1),s.alt(t,r,["auto"]),2===n.length&&s.alt("lineAlign",n[1],["start","middle","end"]);break;case"position":n=e.split(","),s.percent(t,n[0]),2===n.length&&s.alt("positionAlign",n[1],["start","middle","end"]);break;case"size":s.percent(t,e);break;case"align":s.alt(t,e,["start","middle","end","left","right"])}},/:/,/\s/),n.region=s.get("region",null),n.vertical=s.get("vertical",""),n.line=s.get("line","auto"),n.lineAlign=s.get("lineAlign","start"),n.snapToLines=s.get("snapToLines",!0),n.size=s.get("size",100),n.align=s.get("align","middle"),n.position=s.get("position",{start:0,left:0,middle:50,end:100,right:100},n.align),n.positionAlign=s.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},n.align)}((wi.prototype=ki(Error.prototype)).constructor=wi).Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},Ei.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,i){return i?this.has(t)?this.values[t]:e[i]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,i){for(var n=0;n<i.length;++n)if(e===i[n]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){return!!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&0<=(e=parseFloat(e))&&e<=100)&&(this.set(t,e),!0)}};var Oi={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},Pi={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},Ui={v:"title",lang:"lang"},xi={rt:"ruby"};function Ii(a,i){function t(){if(!i)return null;var t,e=i.match(/^([^<]*)(<[^>]*>?)?/);return t=e[1]?e[1]:e[2],i=i.substr(t.length),t}function e(t){return Oi[t]}function n(t){for(;f=t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)t=t.replace(f[0],e);return t}function r(t,e){var i=Pi[t];if(!i)return null;var n=a.document.createElement(i);n.localName=i;var r=Ui[t];return r&&e&&(n[r]=e.trim()),n}for(var s,o,u,l=a.document.createElement("div"),c=l,h=[];null!==(s=t());)if("<"!==s[0])c.appendChild(a.document.createTextNode(n(s)));else{if("/"===s[1]){h.length&&h[h.length-1]===s.substr(2).replace(">","")&&(h.pop(),c=c.parentNode);continue}var d,p=Ci(s.substr(1,s.length-2));if(p){d=a.document.createProcessingInstruction("timestamp",p),c.appendChild(d);continue}var f=s.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!f)continue;if(!(d=r(f[1],f[3])))continue;if(o=c,xi[(u=d).localName]&&xi[u.localName]!==o.localName)continue;f[2]&&(d.className=f[2].substr(1).replace("."," ")),h.push(f[1]),c.appendChild(d),c=d}return l}var Di=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];function Ri(t){for(var e=0;e<Di.length;e++){var i=Di[e];if(t>=i[0]&&t<=i[1])return!0}return!1}function Mi(){}function Bi(t,e,i){Mi.call(this),this.cue=e,this.cueDiv=Ii(t,e.text);var n={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"};this.applyStyles(n,this.cueDiv),this.div=t.document.createElement("div"),n={direction:function(t){var e=[],i="";if(!t||!t.childNodes)return"ltr";function r(t,e){for(var i=e.childNodes.length-1;0<=i;i--)t.push(e.childNodes[i])}function a(t){if(!t||!t.length)return null;var e=t.pop(),i=e.textContent||e.innerText;if(i){var n=i.match(/^.*(\n|\r)/);return n?n[t.length=0]:i}return"ruby"===e.tagName?a(t):e.childNodes?(r(t,e),a(t)):void 0}for(r(e,t);i=a(e);)for(var n=0;n<i.length;n++)if(Ri(i.charCodeAt(n)))return"rtl";return"ltr"}(this.cueDiv),writingMode:""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:"middle"===e.align?"center":e.align,font:i.font,whiteSpace:"pre-line",position:"absolute"},this.applyStyles(n),this.div.appendChild(this.cueDiv);var r=0;switch(e.positionAlign){case"start":r=e.position;break;case"middle":r=e.position-e.size/2;break;case"end":r=e.position-e.size}""===e.vertical?this.applyStyles({left:this.formatStyle(r,"%"),width:this.formatStyle(e.size,"%")}):this.applyStyles({top:this.formatStyle(r,"%"),height:this.formatStyle(e.size,"%")}),this.move=function(t){this.applyStyles({top:this.formatStyle(t.top,"px"),bottom:this.formatStyle(t.bottom,"px"),left:this.formatStyle(t.left,"px"),right:this.formatStyle(t.right,"px"),height:this.formatStyle(t.height,"px"),width:this.formatStyle(t.width,"px")})}}function Ni(t){var e,i,n,r;if(t.div){i=t.div.offsetHeight,n=t.div.offsetWidth,r=t.div.offsetTop;var a=(a=t.div.childNodes)&&(a=a[0])&&a.getClientRects&&a.getClientRects();t=t.div.getBoundingClientRect(),e=a?Math.max(a[0]&&a[0].height||0,t.height/a.length):0}this.left=t.left,this.right=t.right,this.top=t.top||r,this.height=t.height||i,this.bottom=t.bottom||r+(t.height||i),this.width=t.width||n,this.lineHeight=void 0!==e?e:t.lineHeight}function ji(t,e,o,u){var i=new Ni(e),n=e.cue,r=function(t){if("number"==typeof t.line&&(t.snapToLines||0<=t.line&&t.line<=100))return t.line;if(!t.track||!t.track.textTrackList||!t.track.textTrackList.mediaElement)return-1;for(var e=t.track,i=e.textTrackList,n=0,r=0;r<i.length&&i[r]!==e;r++)"showing"===i[r].mode&&n++;return-1*++n}(n),a=[];if(n.snapToLines){var s;switch(n.vertical){case"":a=["+y","-y"],s="height";break;case"rl":a=["+x","-x"],s="width";break;case"lr":a=["-x","+x"],s="width"}var l=i.lineHeight,c=l*Math.round(r),h=o[s]+l,d=a[0];Math.abs(c)>h&&(c=c<0?-1:1,c*=Math.ceil(h/l)*l),r<0&&(c+=""===n.vertical?o.height:o.width,a=a.reverse()),i.move(d,c)}else{var p=i.lineHeight/o.height*100;switch(n.lineAlign){case"middle":r-=p/2;break;case"end":r-=p}switch(n.vertical){case"":e.applyStyles({top:e.formatStyle(r,"%")});break;case"rl":e.applyStyles({left:e.formatStyle(r,"%")});break;case"lr":e.applyStyles({right:e.formatStyle(r,"%")})}a=["+y","-x","+x","-y"],i=new Ni(e)}var f=function(t,e){for(var i,n=new Ni(t),r=1,a=0;a<e.length;a++){for(;t.overlapsOppositeAxis(o,e[a])||t.within(o)&&t.overlapsAny(u);)t.move(e[a]);if(t.within(o))return t;var s=t.intersectPercentage(o);s<r&&(i=new Ni(t),r=s),t=new Ni(n)}return i||n}(i,a);e.move(f.toCSSCompatValues(o))}function Fi(){}Mi.prototype.applyStyles=function(t,e){for(var i in e=e||this.div,t)t.hasOwnProperty(i)&&(e.style[i]=t[i])},Mi.prototype.formatStyle=function(t,e){return 0===t?0:t+e},(Bi.prototype=ki(Mi.prototype)).constructor=Bi,Ni.prototype.move=function(t,e){switch(e=void 0!==e?e:this.lineHeight,t){case"+x":this.left+=e,this.right+=e;break;case"-x":this.left-=e,this.right-=e;break;case"+y":this.top+=e,this.bottom+=e;break;case"-y":this.top-=e,this.bottom-=e}},Ni.prototype.overlaps=function(t){return this.left<t.right&&this.right>t.left&&this.top<t.bottom&&this.bottom>t.top},Ni.prototype.overlapsAny=function(t){for(var e=0;e<t.length;e++)if(this.overlaps(t[e]))return!0;return!1},Ni.prototype.within=function(t){return this.top>=t.top&&this.bottom<=t.bottom&&this.left>=t.left&&this.right<=t.right},Ni.prototype.overlapsOppositeAxis=function(t,e){switch(e){case"+x":return this.left<t.left;case"-x":return this.right>t.right;case"+y":return this.top<t.top;case"-y":return this.bottom>t.bottom}},Ni.prototype.intersectPercentage=function(t){return Math.max(0,Math.min(this.right,t.right)-Math.max(this.left,t.left))*Math.max(0,Math.min(this.bottom,t.bottom)-Math.max(this.top,t.top))/(this.height*this.width)},Ni.prototype.toCSSCompatValues=function(t){return{top:this.top-t.top,bottom:t.bottom-this.bottom,left:this.left-t.left,right:t.right-this.right,height:this.height,width:this.width}},Ni.getSimpleBoxPosition=function(t){var e=t.div?t.div.offsetHeight:t.tagName?t.offsetHeight:0,i=t.div?t.div.offsetWidth:t.tagName?t.offsetWidth:0,n=t.div?t.div.offsetTop:t.tagName?t.offsetTop:0;return{left:(t=t.div?t.div.getBoundingClientRect():t.tagName?t.getBoundingClientRect():t).left,right:t.right,top:t.top||n,height:t.height||e,bottom:t.bottom||n+(t.height||e),width:t.width||i}},Fi.StringDecoder=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}},Fi.convertCueToDOMTree=function(t,e){return t&&e?Ii(t,e):null};Fi.processCues=function(n,r,t){if(!n||!r||!t)return null;for(;t.firstChild;)t.removeChild(t.firstChild);var a=n.document.createElement("div");if(a.style.position="absolute",a.style.left="0",a.style.right="0",a.style.top="0",a.style.bottom="0",a.style.margin="1.5%",t.appendChild(a),function(t){for(var e=0;e<t.length;e++)if(t[e].hasBeenReset||!t[e].displayState)return!0;return!1}(r)){var s=[],o=Ni.getSimpleBoxPosition(a),u={font:Math.round(.05*o.height*100)/100+"px sans-serif"};!function(){for(var t,e,i=0;i<r.length;i++)e=r[i],t=new Bi(n,e,u),a.appendChild(t.div),ji(0,t,o,s),e.displayState=t.div,s.push(Ni.getSimpleBoxPosition(t))}()}else for(var e=0;e<r.length;e++)a.appendChild(r[e].displayState)},(Fi.Parser=function(t,e,i){i||(i=e,e={}),e||(e={}),this.window=t,this.vttjs=e,this.state="INITIAL",this.buffer="",this.decoder=i||new TextDecoder("utf8"),this.regionList=[]}).prototype={reportOrThrowError:function(t){if(!(t instanceof wi))throw t;this.onparsingerror&&this.onparsingerror(t)},parse:function(t){var a=this;function e(){for(var t=a.buffer,e=0;e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var i=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,a.buffer=t.substr(e),i}function i(t){t.match(/X-TIMESTAMP-MAP/)?Ai(t,function(t,e){switch(t){case"X-TIMESTAMP-MAP":i=e,n=new Ei,Ai(i,function(t,e){switch(t){case"MPEGT":n.integer(t+"S",e);break;case"LOCA":n.set(t+"L",Ci(e))}},/[^\d]:/,/,/),a.ontimestampmap&&a.ontimestampmap({MPEGTS:n.get("MPEGTS"),LOCAL:n.get("LOCAL")})}var i,n},/=/):Ai(t,function(t,e){switch(t){case"Region":!function(t){var r=new Ei;if(Ai(t,function(t,e){switch(t){case"id":r.set(t,e);break;case"width":r.percent(t,e);break;case"lines":r.integer(t,e);break;case"regionanchor":case"viewportanchor":var i=e.split(",");if(2!==i.length)break;var n=new Ei;if(n.percent("x",i[0]),n.percent("y",i[1]),!n.has("x")||!n.has("y"))break;r.set(t+"X",n.get("x")),r.set(t+"Y",n.get("y"));break;case"scroll":r.alt(t,e,["up"])}},/=/,/\s/),r.has("id")){var e=new(a.vttjs.VTTRegion||a.window.VTTRegion);e.width=r.get("width",100),e.lines=r.get("lines",3),e.regionAnchorX=r.get("regionanchorX",0),e.regionAnchorY=r.get("regionanchorY",100),e.viewportAnchorX=r.get("viewportanchorX",0),e.viewportAnchorY=r.get("viewportanchorY",100),e.scroll=r.get("scroll",""),a.onregion&&a.onregion(e),a.regionList.push({id:r.get("id"),region:e})}}(e)}},/:/)}t&&(a.buffer+=a.decoder.decode(t,{stream:!0}));try{var n;if("INITIAL"===a.state){if(!/\r\n|\n/.test(a.buffer))return this;var r=(n=e()).match(/^WEBVTT([ \t].*)?$/);if(!r||!r[0])throw new wi(wi.Errors.BadSignature);a.state="HEADER"}for(var s=!1;a.buffer;){if(!/\r\n|\n/.test(a.buffer))return this;switch(s?s=!1:n=e(),a.state){case"HEADER":/:/.test(n)?i(n):n||(a.state="ID");continue;case"NOTE":n||(a.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(n)){a.state="NOTE";break}if(!n)continue;if(a.cue=new(a.vttjs.VTTCue||a.window.VTTCue)(0,0,""),a.state="CUE",-1===n.indexOf("--\x3e")){a.cue.id=n;continue}case"CUE":try{Li(n,a.cue,a.regionList)}catch(t){a.reportOrThrowError(t),a.cue=null,a.state="BADCUE";continue}a.state="CUETEXT";continue;case"CUETEXT":var o=-1!==n.indexOf("--\x3e");if(!n||o&&(s=!0)){a.oncue&&a.oncue(a.cue),a.cue=null,a.state="ID";continue}a.cue.text&&(a.cue.text+="\n"),a.cue.text+=n;continue;case"BADCUE":n||(a.state="ID");continue}}}catch(t){a.reportOrThrowError(t),"CUETEXT"===a.state&&a.cue&&a.oncue&&a.oncue(a.cue),a.cue=null,a.state="INITIAL"===a.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var e=this;try{if(e.buffer+=e.decoder.decode(),(e.cue||"HEADER"===e.state)&&(e.buffer+="\n\n",e.parse()),"INITIAL"===e.state)throw new wi(wi.Errors.BadSignature)}catch(t){e.reportOrThrowError(t)}return e.onflush&&e.onflush(),this}};var Vi=Fi,Hi={"":1,lr:1,rl:1},qi={start:1,middle:1,end:1,left:1,right:1};function zi(t){return"string"==typeof t&&(!!qi[t.toLowerCase()]&&t.toLowerCase())}function Wi(t,e,i){this.hasBeenReset=!1;var n="",r=!1,a=t,s=e,o=i,u=null,l="",c=!0,h="auto",d="start",p=50,f="middle",m=50,g="middle";Object.defineProperties(this,{id:{enumerable:!0,get:function(){return n},set:function(t){n=""+t}},pauseOnExit:{enumerable:!0,get:function(){return r},set:function(t){r=!!t}},startTime:{enumerable:!0,get:function(){return a},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");a=t,this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return s},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");s=t,this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return o},set:function(t){o=""+t,this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return u},set:function(t){u=t,this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return l},set:function(t){var e,i="string"==typeof(e=t)&&!!Hi[e.toLowerCase()]&&e.toLowerCase();if(!1===i)throw new SyntaxError("An invalid or illegal string was specified.");l=i,this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return c},set:function(t){c=!!t,this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return h},set:function(t){if("number"!=typeof t&&"auto"!==t)throw new SyntaxError("An invalid number or illegal string was specified.");h=t,this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return d},set:function(t){var e=zi(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");d=e,this.hasBeenReset=!0}},position:{enumerable:!0,get:function(){return p},set:function(t){if(t<0||100<t)throw new Error("Position must be between 0 and 100.");p=t,this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return f},set:function(t){var e=zi(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");f=e,this.hasBeenReset=!0}},size:{enumerable:!0,get:function(){return m},set:function(t){if(t<0||100<t)throw new Error("Size must be between 0 and 100.");m=t,this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return g},set:function(t){var e=zi(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");g=e,this.hasBeenReset=!0}}}),this.displayState=void 0}Wi.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)};var Gi=Wi,Xi={"":!0,up:!0};function Yi(t){return"number"==typeof t&&0<=t&&t<=100}var $i=function(){var e=100,i=3,n=0,r=100,a=0,s=100,o="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return e},set:function(t){if(!Yi(t))throw new Error("Width must be between 0 and 100.");e=t}},lines:{enumerable:!0,get:function(){return i},set:function(t){if("number"!=typeof t)throw new TypeError("Lines must be set to a number.");i=t}},regionAnchorY:{enumerable:!0,get:function(){return r},set:function(t){if(!Yi(t))throw new Error("RegionAnchorX must be between 0 and 100.");r=t}},regionAnchorX:{enumerable:!0,get:function(){return n},set:function(t){if(!Yi(t))throw new Error("RegionAnchorY must be between 0 and 100.");n=t}},viewportAnchorY:{enumerable:!0,get:function(){return s},set:function(t){if(!Yi(t))throw new Error("ViewportAnchorY must be between 0 and 100.");s=t}},viewportAnchorX:{enumerable:!0,get:function(){return a},set:function(t){if(!Yi(t))throw new Error("ViewportAnchorX must be between 0 and 100.");a=t}},scroll:{enumerable:!0,get:function(){return o},set:function(t){var e,i="string"==typeof(e=t)&&!!Xi[e.toLowerCase()]&&e.toLowerCase();if(!1===i)throw new SyntaxError("An invalid or illegal string was specified.");o=i}}})},Ki=Qe(function(t){var e=t.exports={WebVTT:Vi,VTTCue:Gi,VTTRegion:$i};v.vttjs=e,v.WebVTT=e.WebVTT;var i=e.VTTCue,n=e.VTTRegion,r=v.VTTCue,a=v.VTTRegion;e.shim=function(){v.VTTCue=i,v.VTTRegion=n},e.restore=function(){v.VTTCue=r,v.VTTRegion=a},v.VTTCue||e.shim()});Ki.WebVTT,Ki.VTTCue,Ki.VTTRegion;var Qi=function(e){function i(i,t){var n;return void 0===i&&(i={}),void 0===t&&(t=function(){}),i.reportTouchActivity=!1,(n=e.call(this,null,i,t)||this).hasStarted_=!1,n.on("playing",function(){this.hasStarted_=!0}),n.on("loadstart",function(){this.hasStarted_=!1}),Si.names.forEach(function(t){var e=Si[t];i&&i[e.getterName]&&(n[e.privateName]=i[e.getterName])}),n.featuresProgressEvents||n.manualProgressOn(),n.featuresTimeupdateEvents||n.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(t){!1===i["native"+t+"Tracks"]&&(n["featuresNative"+t+"Tracks"]=!1)}),!1===i.nativeCaptions||!1===i.nativeTextTracks?n.featuresNativeTextTracks=!1:!0!==i.nativeCaptions&&!0!==i.nativeTextTracks||(n.featuresNativeTextTracks=!0),n.featuresNativeTextTracks||n.emulateTextTracks(),n.autoRemoteTextTracks_=new Si.text.ListClass,n.initTrackListeners(),i.nativeControlsForTouch||n.emitTapEvents(),n.constructor&&(n.name_=n.constructor.name||"Unknown Tech"),n}f(i,e);var t=i.prototype;return t.triggerSourceset=function(t){var e=this;this.isReady_||this.one("ready",function(){return e.setTimeout(function(){return e.triggerSourceset(t)},1)}),this.trigger({src:t,type:"sourceset"})},t.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},t.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},t.trackProgress=function(t){this.stopTrackingProgress(),this.progressInterval=this.setInterval(kt(this,function(){var t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),1===(this.bufferedPercent_=t)&&this.stopTrackingProgress()}),500)},t.onDurationChange=function(t){this.duration_=this.duration()},t.buffered=function(){return de(0,0)},t.bufferedPercent=function(){return pe(this.buffered(),this.duration_)},t.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},t.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},t.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},t.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},t.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},t.dispose=function(){this.clearTracks(bi.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),e.prototype.dispose.call(this)},t.clearTracks=function(t){var r=this;(t=[].concat(t)).forEach(function(t){for(var e=r[t+"Tracks"]()||[],i=e.length;i--;){var n=e[i];"text"===t&&r.removeRemoteTextTrack(n),e.removeTrack(n)}})},t.cleanupAutoTextTracks=function(){for(var t=this.autoRemoteTextTracks_||[],e=t.length;e--;){var i=t[e];this.removeRemoteTextTrack(i)}},t.reset=function(){},t.error=function(t){return void 0!==t&&(this.error_=new be(t),this.trigger("error")),this.error_},t.played=function(){return this.hasStarted_?de(0,0):de()},t.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},t.initTrackListeners=function(){var r=this;bi.names.forEach(function(t){var e=bi[t],i=function(){r.trigger(t+"trackchange")},n=r[e.getterName]();n.addEventListener("removetrack",i),n.addEventListener("addtrack",i),r.on("dispose",function(){n.removeEventListener("removetrack",i),n.removeEventListener("addtrack",i)})})},t.addWebVttScript_=function(){var t=this;if(!v.WebVTT)if(d.body.contains(this.el())){if(!this.options_["vtt.js"]&&c(Ki)&&0<Object.keys(Ki).length)return void this.trigger("vttjsloaded");var e=d.createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js",e.onload=function(){t.trigger("vttjsloaded")},e.onerror=function(){t.trigger("vttjserror")},this.on("dispose",function(){e.onload=null,e.onerror=null}),v.WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)},t.emulateTextTracks=function(){var t=this,i=this.textTracks(),e=this.remoteTextTracks(),n=function(t){return i.addTrack(t.track)},r=function(t){return i.removeTrack(t.track)};e.on("addtrack",n),e.on("removetrack",r),this.addWebVttScript_();var a=function(){return t.trigger("texttrackchange")},s=function(){a();for(var t=0;t<i.length;t++){var e=i[t];e.removeEventListener("cuechange",a),"showing"===e.mode&&e.addEventListener("cuechange",a)}};s(),i.addEventListener("change",s),i.addEventListener("addtrack",s),i.addEventListener("removetrack",s),this.on("dispose",function(){e.off("addtrack",n),e.off("removetrack",r),i.removeEventListener("change",s),i.removeEventListener("addtrack",s),i.removeEventListener("removetrack",s);for(var t=0;t<i.length;t++){i[t].removeEventListener("cuechange",a)}})},t.addTextTrack=function(t,e,i){if(!t)throw new Error("TextTrack kind is required but was not provided");return function(t,e,i,n,r){void 0===r&&(r={});var a=t.textTracks();r.kind=e,i&&(r.label=i),n&&(r.language=n),r.tech=t;var s=new Si.text.TrackClass(r);return a.addTrack(s),s}(this,t,e,i)},t.createRemoteTextTrack=function(t){var e=Nt(t,{tech:this});return new Ti.remoteTextEl.TrackClass(e)},t.addRemoteTextTrack=function(t,e){var i=this;void 0===t&&(t={});var n=this.createRemoteTextTrack(t);return!0!==e&&!1!==e&&(g.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),e=!0),this.remoteTextTrackEls().addTrackElement_(n),this.remoteTextTracks().addTrack(n.track),!0!==e&&this.ready(function(){return i.autoRemoteTextTracks_.addTrack(n.track)}),n},t.removeRemoteTextTrack=function(t){var e=this.remoteTextTrackEls().getTrackElementByTrack_(t);this.remoteTextTrackEls().removeTrackElement_(e),this.remoteTextTracks().removeTrack(t),this.autoRemoteTextTracks_.removeTrack(t)},t.getVideoPlaybackQuality=function(){return{}},t.setPoster=function(){},t.playsinline=function(){},t.setPlaysinline=function(){},t.overrideNativeAudioTracks=function(){},t.overrideNativeVideoTracks=function(){},t.canPlayType=function(){return""},i.canPlayType=function(){return""},i.canPlaySource=function(t,e){return i.canPlayType(t.type)},i.isTech=function(t){return t.prototype instanceof i||t instanceof i||t===i},i.registerTech=function(t,e){if(i.techs_||(i.techs_={}),!i.isTech(e))throw new Error("Tech "+t+" must be a Tech");if(!i.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!i.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return t=Bt(t),i.techs_[t]=e,"Tech"!==t&&i.defaultTechOrder_.push(t),e},i.getTech=function(t){if(t)return t=Bt(t),i.techs_&&i.techs_[t]?i.techs_[t]:v&&v.videojs&&v.videojs[t]?(g.warn("The "+t+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),v.videojs[t]):void 0},i}(jt);Si.names.forEach(function(t){var e=Si[t];Qi.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Qi.prototype.featuresVolumeControl=!0,Qi.prototype.featuresMuteControl=!0,Qi.prototype.featuresFullscreenResize=!1,Qi.prototype.featuresPlaybackRate=!1,Qi.prototype.featuresProgressEvents=!1,Qi.prototype.featuresSourceset=!1,Qi.prototype.featuresTimeupdateEvents=!1,Qi.prototype.featuresNativeTextTracks=!1,Qi.withSourceHandlers=function(r){r.registerSourceHandler=function(t,e){var i=r.sourceHandlers;i||(i=r.sourceHandlers=[]),void 0===e&&(e=i.length),i.splice(e,0,t)},r.canPlayType=function(t){for(var e,i=r.sourceHandlers||[],n=0;n<i.length;n++)if(e=i[n].canPlayType(t))return e;return""},r.selectSourceHandler=function(t,e){for(var i=r.sourceHandlers||[],n=0;n<i.length;n++)if(i[n].canHandleSource(t,e))return i[n];return null},r.canPlaySource=function(t,e){var i=r.selectSourceHandler(t,e);return i?i.canHandleSource(t,e):""};["seekable","seeking","duration"].forEach(function(t){var e=this[t];"function"==typeof e&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):e.apply(this,arguments)})},r.prototype),r.prototype.setSource=function(t){var e=r.selectSourceHandler(t,this.options_);e||(r.nativeSourceHandler?e=r.nativeSourceHandler:g.error("No source handler found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),e!==r.nativeSourceHandler&&(this.currentSource_=t),this.sourceHandler_=e.handleSource(t,this,this.options_),this.on("dispose",this.disposeSourceHandler)},r.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},jt.registerComponent("Tech",Qi),Qi.registerTech("Tech",Qi),Qi.defaultTechOrder_=[];var Ji={},Zi={},tn={};function en(t,e,i){t.setTimeout(function(){return function i(n,t,r,a,s,o){void 0===n&&(n={});void 0===t&&(t=[]);void 0===s&&(s=[]);void 0===o&&(o=!1);var e=t,u=e[0],l=e.slice(1);if("string"==typeof u)i(n,Ji[u],r,a,s,o);else if(u){var c=un(a,u);if(!c.setSource)return s.push(c),i(n,l,r,a,s,o);c.setSource(b({},n),function(t,e){if(t)return i(n,l,r,a,s,o);s.push(c),i(e,n.type===e.type?l:Ji[e.type],r,a,s,o)})}else l.length?i(n,l,r,a,s,o):o?r(n,s):i(n,Ji["*"],r,a,s,!0)}(e,Ji[e.type],i,t)},1)}function nn(t,e,i,n){void 0===n&&(n=null);var r="call"+Bt(i),a=t.reduce(on(r),n),s=a===tn,o=s?null:e[i](a);return function(t,e,i,n){for(var r=t.length-1;0<=r;r--){var a=t[r];a[e]&&a[e](n,i)}}(t,i,o,s),o}var rn={buffered:1,currentTime:1,duration:1,seekable:1,played:1,paused:1},an={setCurrentTime:1},sn={play:1,pause:1};function on(i){return function(t,e){return t===tn?tn:e[i]?e[i](t):t}}function un(t,e){var i=Zi[t.id()],n=null;if(null==i)return n=e(t),Zi[t.id()]=[[e,n]],n;for(var r=0;r<i.length;r++){var a=i[r],s=a[0],o=a[1];s===e&&(n=o)}return null===n&&(n=e(t),i.push([e,n])),n}var ln={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",mp3:"audio/mpeg",aac:"audio/aac",oga:"audio/ogg",m3u8:"application/x-mpegURL"},cn=function(t){void 0===t&&(t="");var e=Ge(t);return ln[e.toLowerCase()]||""};function hn(t){var e=cn(t.src);return!t.type&&e&&(t.type=e),t}var dn=function(l){function t(t,e,i){var n,r=Nt({createEl:!1},e);if(n=l.call(this,t,r,i)||this,e.playerOptions.sources&&0!==e.playerOptions.sources.length)t.src(e.playerOptions.sources);else for(var a=0,s=e.playerOptions.techOrder;a<s.length;a++){var o=Bt(s[a]),u=Qi.getTech(o);if(o||(u=jt.getComponent(o)),u&&u.isSupported()){t.loadTech_(o);break}}return n}return f(t,l),t}(jt);jt.registerComponent("MediaLoader",dn);var pn=function(r){function t(t,e){var i;return(i=r.call(this,t,e)||this).emitTapEvents(),i.enable(),i}f(t,r);var e=t.prototype;return e.createEl=function(t,e,i){void 0===t&&(t="div"),void 0===e&&(e={}),void 0===i&&(i={}),e=b({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass(),tabIndex:0},e),"button"===t&&g.error("Creating a ClickableComponent with an HTML element of "+t+" is not supported; use a Button instead."),i=b({role:"button"},i),this.tabIndex_=e.tabIndex;var n=r.prototype.createEl.call(this,t,e,i);return this.createControlTextEl(n),n},e.dispose=function(){this.controlTextEl_=null,r.prototype.dispose.call(this)},e.createControlTextEl=function(t){return this.controlTextEl_=A("span",{className:"vjs-control-text"},{"aria-live":"polite"}),t&&t.appendChild(this.controlTextEl_),this.controlText(this.controlText_,t),this.controlTextEl_},e.controlText=function(t,e){if(void 0===e&&(e=this.el()),void 0===t)return this.controlText_||"Need Text";var i=this.localize(t);this.controlText_=t,L(this.controlTextEl_,i),this.nonIconControl||e.setAttribute("title",i)},e.buildCSSClass=function(){return"vjs-control vjs-button "+r.prototype.buildCSSClass.call(this)},e.enable=function(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),"undefined"!=typeof this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur))},e.disable=function(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),"undefined"!=typeof this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off(["tap","click"],this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur)},e.handleClick=function(t){},e.handleFocus=function(t){ht(d,"keydown",kt(this,this.handleKeyPress))},e.handleKeyPress=function(t){32===t.which||13===t.which?(t.preventDefault(),this.trigger("click")):r.prototype.handleKeyPress&&r.prototype.handleKeyPress.call(this,t)},e.handleBlur=function(t){dt(d,"keydown",kt(this,this.handleKeyPress))},t}(jt);jt.registerComponent("ClickableComponent",pn);var fn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).update(),t.on("posterchange",kt(m(m(i)),i.update)),i}f(t,n);var e=t.prototype;return e.dispose=function(){this.player().off("posterchange",this.update),n.prototype.dispose.call(this)},e.createEl=function(){return A("div",{className:"vjs-poster",tabIndex:-1})},e.update=function(t){var e=this.player().poster();this.setSrc(e),e?this.show():this.hide()},e.setSrc=function(t){var e="";t&&(e='url("'+t+'")'),this.el_.style.backgroundImage=e},e.handleClick=function(t){this.player_.controls()&&(this.player_.paused()?we(this.player_.play()):this.player_.pause())},t}(pn);jt.registerComponent("PosterImage",fn);var mn="#222",gn={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'};function yn(t,e){var i;if(4===t.length)i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3];else{if(7!==t.length)throw new Error("Invalid color code provided, "+t+"; must be formatted as e.g. #f0e or #f604e2.");i=t.slice(1)}return"rgba("+parseInt(i.slice(0,2),16)+","+parseInt(i.slice(2,4),16)+","+parseInt(i.slice(4,6),16)+","+e+")"}function vn(t,e,i){try{t.style[e]=i}catch(t){return}}var _n=function(a){function t(i,t,e){var n;n=a.call(this,i,t,e)||this;var r=kt(m(m(n)),n.updateDisplay);return i.on("loadstart",kt(m(m(n)),n.toggleDisplay)),i.on("texttrackchange",r),i.on("loadstart",kt(m(m(n)),n.preselectTrack)),i.ready(kt(m(m(n)),function(){if(i.tech_&&i.tech_.featuresNativeTextTracks)this.hide();else{i.on("fullscreenchange",r),i.on("playerresize",r),v.addEventListener("orientationchange",r),i.on("dispose",function(){return v.removeEventListener("orientationchange",r)});for(var t=this.options_.playerOptions.tracks||[],e=0;e<t.length;e++)this.player_.addRemoteTextTrack(t[e],!0);this.preselectTrack()}})),n}f(t,a);var e=t.prototype;return e.preselectTrack=function(){for(var t,e,i,n={captions:1,subtitles:1},r=this.player_.textTracks(),a=this.player_.cache_.selectedLanguage,s=0;s<r.length;s++){var o=r[s];a&&a.enabled&&a.language===o.language?o.kind===a.kind?i=o:i||(i=o):a&&!a.enabled?e=t=i=null:o.default&&("descriptions"!==o.kind||t?o.kind in n&&!e&&(e=o):t=o)}i?i.mode="showing":e?e.mode="showing":t&&(t.mode="showing")},e.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},e.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},e.clearDisplay=function(){"function"==typeof v.WebVTT&&v.WebVTT.processCues(v,[],this.el_)},e.updateDisplay=function(){var t=this.player_.textTracks();this.clearDisplay();for(var e=null,i=null,n=t.length;n--;){var r=t[n];"showing"===r.mode&&("descriptions"===r.kind?e=r:i=r)}i?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(i)):e&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(e))},e.updateForTrack=function(t){if("function"==typeof v.WebVTT&&t.activeCues){for(var e=[],i=0;i<t.activeCues.length;i++)e.push(t.activeCues[i]);if(v.WebVTT.processCues(v,e,this.el_),this.player_.textTrackSettings)for(var n=this.player_.textTrackSettings.getValues(),r=e.length;r--;){var a=e[r];if(a){var s=a.displayState;if(n.color&&(s.firstChild.style.color=n.color),n.textOpacity&&vn(s.firstChild,"color",yn(n.color||"#fff",n.textOpacity)),n.backgroundColor&&(s.firstChild.style.backgroundColor=n.backgroundColor),n.backgroundOpacity&&vn(s.firstChild,"backgroundColor",yn(n.backgroundColor||"#000",n.backgroundOpacity)),n.windowColor&&(n.windowOpacity?vn(s,"backgroundColor",yn(n.windowColor,n.windowOpacity)):s.style.backgroundColor=n.windowColor),n.edgeStyle&&("dropshadow"===n.edgeStyle?s.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px "+mn:"raised"===n.edgeStyle?s.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px "+mn:"depressed"===n.edgeStyle?s.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px "+mn:"uniform"===n.edgeStyle&&(s.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px "+mn)),n.fontPercent&&1!==n.fontPercent){var o=v.parseFloat(s.style.fontSize);s.style.fontSize=o*n.fontPercent+"px",s.style.height="auto",s.style.top="auto",s.style.bottom="2px"}n.fontFamily&&"default"!==n.fontFamily&&("small-caps"===n.fontFamily?s.firstChild.style.fontVariant="small-caps":s.firstChild.style.fontFamily=gn[n.fontFamily])}}}},t}(jt);jt.registerComponent("TextTrackDisplay",_n);var bn=function(r){function t(){return r.apply(this,arguments)||this}return f(t,r),t.prototype.createEl=function(){var t=this.player_.isAudio(),e=this.localize(t?"Audio Player":"Video Player"),i=A("span",{className:"vjs-control-text",innerHTML:this.localize("{1} is loading.",[e])}),n=r.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"});return n.appendChild(i),n},t}(jt);jt.registerComponent("LoadingSpinner",bn);var Tn=function(e){function t(){return e.apply(this,arguments)||this}f(t,e);var i=t.prototype;return i.createEl=function(t,e,i){void 0===e&&(e={}),void 0===i&&(i={}),e=b({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass()},e),i=b({type:"button"},i);var n=jt.prototype.createEl.call(this,"button",e,i);return this.createControlTextEl(n),n},i.addChild=function(t,e){void 0===e&&(e={});var i=this.constructor.name;return g.warn("Adding an actionable (user controllable) child to a Button ("+i+") is not supported; use a ClickableComponent instead."),jt.prototype.addChild.call(this,t,e)},i.enable=function(){e.prototype.enable.call(this),this.el_.removeAttribute("disabled")},i.disable=function(){e.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},i.handleKeyPress=function(t){32!==t.which&&13!==t.which&&e.prototype.handleKeyPress.call(this,t)},t}(pn);jt.registerComponent("Button",Tn);var Sn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).mouseused_=!1,i.on("mousedown",i.handleMouseDown),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-big-play-button"},e.handleClick=function(t){var e=this.player_.play();if(this.mouseused_&&t.clientX&&t.clientY)we(e);else{var i=this.player_.getChild("controlBar"),n=i&&i.getChild("playToggle");if(n){var r=function(){return n.focus()};ke(e)?e.then(r,function(){}):this.setTimeout(r,1)}else this.player_.focus()}},e.handleKeyPress=function(t){this.mouseused_=!1,n.prototype.handleKeyPress.call(this,t)},e.handleMouseDown=function(t){this.mouseused_=!0},t}(Tn);Sn.prototype.controlText_="Play Video",jt.registerComponent("BigPlayButton",Sn);var kn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).controlText(e&&e.controlText||i.localize("Close")),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-close-button "+n.prototype.buildCSSClass.call(this)},e.handleClick=function(t){this.trigger({type:"close",bubbles:!1})},t}(Tn);jt.registerComponent("CloseButton",kn);var wn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"play",i.handlePlay),i.on(t,"pause",i.handlePause),i.on(t,"ended",i.handleEnded),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-play-control "+n.prototype.buildCSSClass.call(this)},e.handleClick=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.handleSeeked=function(t){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(t):this.handlePlay(t)},e.handlePlay=function(t){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},e.handlePause=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},e.handleEnded=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.controlText("Replay"),this.one(this.player_,"seeked",this.handleSeeked)},t}(Tn);wn.prototype.controlText_="Play",jt.registerComponent("PlayToggle",wn);var Cn=function(t,e){t=t<0?0:t;var i=Math.floor(t%60),n=Math.floor(t/60%60),r=Math.floor(t/3600),a=Math.floor(e/60%60),s=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(r=n=i="-"),(r=0<r||0<s?r+":":"")+(n=((r||10<=a)&&n<10?"0"+n:n)+":")+(i=i<10?"0"+i:i)},En=Cn;function An(t,e){return void 0===e&&(e=t),En(t,e)}var Ln=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).throttledUpdateContent=wt(kt(m(m(i)),i.updateContent),25),i.on(t,"timeupdate",i.throttledUpdateContent),i}f(t,n);var e=t.prototype;return e.createEl=function(t){var e=this.buildCSSClass(),i=n.prototype.createEl.call(this,"div",{className:e+" vjs-time-control vjs-control",innerHTML:'<span class="vjs-control-text">'+this.localize(this.labelText_)+" </span>"});return this.contentEl_=A("span",{className:e+"-display"},{"aria-live":"off"}),this.updateTextNode_(),i.appendChild(this.contentEl_),i},e.dispose=function(){this.contentEl_=null,this.textNode_=null,n.prototype.dispose.call(this)},e.updateTextNode_=function(){if(this.contentEl_){for(;this.contentEl_.firstChild;)this.contentEl_.removeChild(this.contentEl_.firstChild);this.textNode_=d.createTextNode(this.formattedTime_||this.formatTime_(0)),this.contentEl_.appendChild(this.textNode_)}},e.formatTime_=function(t){return An(t)},e.updateFormattedTime_=function(t){var e=this.formatTime_(t);e!==this.formattedTime_&&(this.formattedTime_=e,this.requestAnimationFrame(this.updateTextNode_))},e.updateContent=function(t){},t}(jt);Ln.prototype.labelText_="Time",Ln.prototype.controlText_="Time",jt.registerComponent("TimeDisplay",Ln);var On=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"ended",i.handleEnded),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-current-time"},e.updateContent=function(t){var e=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.updateFormattedTime_(e)},e.handleEnded=function(t){this.player_.duration()&&this.updateFormattedTime_(this.player_.duration())},t}(Ln);On.prototype.labelText_="Current Time",On.prototype.controlText_="Current Time",jt.registerComponent("CurrentTimeDisplay",On);var Pn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"durationchange",i.updateContent),i.on(t,"loadedmetadata",i.throttledUpdateContent),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-duration"},e.updateContent=function(t){var e=this.player_.duration();e&&this.duration_!==e&&(this.duration_=e,this.updateFormattedTime_(e))},t}(Ln);Pn.prototype.labelText_="Duration",Pn.prototype.controlText_="Duration",jt.registerComponent("DurationDisplay",Pn);var Un=function(t){function e(){return t.apply(this,arguments)||this}return f(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},e}(jt);jt.registerComponent("TimeDivider",Un);var xn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"durationchange",i.throttledUpdateContent),i.on(t,"ended",i.handleEnded),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-remaining-time"},e.formatTime_=function(t){return"-"+n.prototype.formatTime_.call(this,t)},e.updateContent=function(t){this.player_.duration()&&(this.player_.remainingTimeDisplay?this.updateFormattedTime_(this.player_.remainingTimeDisplay()):this.updateFormattedTime_(this.player_.remainingTime()))},e.handleEnded=function(t){this.player_.duration()&&this.updateFormattedTime_(0)},t}(Ln);xn.prototype.labelText_="Remaining Time",xn.prototype.controlText_="Remaining Time",jt.registerComponent("RemainingTimeDisplay",xn);var In=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).updateShowing(),i.on(i.player(),"durationchange",i.updateShowing),i}f(t,n);var e=t.prototype;return e.createEl=function(){var t=n.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=A("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+" </span>"+this.localize("LIVE")},{"aria-live":"off"}),t.appendChild(this.contentEl_),t},e.dispose=function(){this.contentEl_=null,n.prototype.dispose.call(this)},e.updateShowing=function(t){this.player().duration()===1/0?this.show():this.hide()},t}(jt);jt.registerComponent("LiveDisplay",In);var Dn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).bar=i.getChild(i.options_.barName),i.vertical(!!i.options_.vertical),i.enable(),i}f(t,n);var e=t.prototype;return e.enabled=function(){return this.enabled_},e.enable=function(){this.enabled()||(this.on("mousedown",this.handleMouseDown),this.on("touchstart",this.handleMouseDown),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this.on("click",this.handleClick),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)},e.disable=function(){if(this.enabled()){var t=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown),this.off("touchstart",this.handleMouseDown),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur),this.off("click",this.handleClick),this.off(this.player_,"controlsvisible",this.update),this.off(t,"mousemove",this.handleMouseMove),this.off(t,"mouseup",this.handleMouseUp),this.off(t,"touchmove",this.handleMouseMove),this.off(t,"touchend",this.handleMouseUp),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}},e.createEl=function(t,e,i){return void 0===e&&(e={}),void 0===i&&(i={}),e.className=e.className+" vjs-slider",e=b({tabIndex:0},e),i=b({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},i),n.prototype.createEl.call(this,t,e,i)},e.handleMouseDown=function(t){var e=this.bar.el_.ownerDocument;"mousedown"===t.type&&t.preventDefault(),"touchstart"!==t.type||ne||t.preventDefault(),j(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(e,"mousemove",this.handleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchmove",this.handleMouseMove),this.on(e,"touchend",this.handleMouseUp),this.handleMouseMove(t)},e.handleMouseMove=function(t){},e.handleMouseUp=function(){var t=this.bar.el_.ownerDocument;F(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove),this.off(t,"mouseup",this.handleMouseUp),this.off(t,"touchmove",this.handleMouseMove),this.off(t,"touchend",this.handleMouseUp),this.update()},e.update=function(){if(this.el_){var t=this.getPercent(),e=this.bar;if(e){("number"!=typeof t||t!=t||t<0||t===1/0)&&(t=0);var i=(100*t).toFixed(2)+"%",n=e.el().style;return this.vertical()?n.height=i:n.width=i,t}}},e.calculateDistance=function(t){var e=q(this.el_,t);return this.vertical()?e.y:e.x},e.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepBack()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepForward())},e.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.handleClick=function(t){t.stopImmediatePropagation(),t.preventDefault()},e.vertical=function(t){if(void 0===t)return this.vertical_||!1;this.vertical_=!!t,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")},t}(jt);jt.registerComponent("Slider",Dn);var Rn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).partEls_=[],i.on(t,"progress",i.update),i}f(t,n);var e=t.prototype;return e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},e.dispose=function(){this.partEls_=null,n.prototype.dispose.call(this)},e.update=function(t){var e=this.player_.buffered(),i=this.player_.duration(),n=this.player_.bufferedEnd(),r=this.partEls_,a=function(t,e){var i=t/e||0;return 100*(1<=i?1:i)+"%"};this.el_.style.width=a(n,i);for(var s=0;s<e.length;s++){var o=e.start(s),u=e.end(s),l=r[s];l||(l=this.el_.appendChild(A()),r[s]=l),l.style.left=a(o,n),l.style.width=a(u-o,n)}for(var c=r.length;c>e.length;c--)this.el_.removeChild(r[c-1]);r.length=e.length},t}(jt);jt.registerComponent("LoadProgressBar",Rn);var Mn=function(t){function e(){return t.apply(this,arguments)||this}f(e,t);var i=e.prototype;return i.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-tooltip"})},i.update=function(t,e,i){var n=V(this.el_),r=V(this.player_.el()),a=t.width*e;if(r&&n){var s=t.left-r.left+a,o=t.width-a+(r.right-t.right),u=n.width/2;s<u?u+=u-s:o<u&&(u=o),u<0?u=0:u>n.width&&(u=n.width),this.el_.style.right="-"+u+"px",L(this.el_,i)}},e}(jt);jt.registerComponent("TimeTooltip",Mn);var Bn=function(t){function e(){return t.apply(this,arguments)||this}f(e,t);var i=e.prototype;return i.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},i.update=function(i,n){var r=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var t=An(r.player_.scrubbing()?r.player_.getCache().currentTime:r.player_.currentTime(),r.player_.duration()),e=r.getChild("timeTooltip");e&&e.update(i,n,t)})},e}(jt);Bn.prototype.options_={children:[]},Kt||Jt||Bn.prototype.options_.children.push("timeTooltip"),jt.registerComponent("PlayProgressBar",Bn);var Nn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).update=wt(kt(m(m(i)),i.update),25),i}f(t,n);var e=t.prototype;return e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},e.update=function(i,n){var r=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var t=r.player_.duration(),e=An(n*t,t);r.el_.style.left=i.width*n+"px",r.getChild("timeTooltip").update(i,n,e)})},t}(jt);Nn.prototype.options_={children:["timeTooltip"]},jt.registerComponent("MouseTimeDisplay",Nn);var jn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).setEventHandlers_(),i}f(t,n);var e=t.prototype;return e.setEventHandlers_=function(){var t=this;this.update=wt(kt(this,this.update),30),this.on(this.player_,"timeupdate",this.update),this.on(this.player_,"ended",this.handleEnded),this.updateInterval=null,this.on(this.player_,["playing"],function(){t.clearInterval(t.updateInterval),t.updateInterval=t.setInterval(function(){t.requestAnimationFrame(function(){t.update()})},30)}),this.on(this.player_,["ended","pause","waiting"],function(){t.clearInterval(t.updateInterval)}),this.on(this.player_,["timeupdate","ended"],this.update)},e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})},e.update_=function(t,e){var i=this.player_.duration();this.el_.setAttribute("aria-valuenow",(100*e).toFixed(2)),this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[An(t,i),An(i,i)],"{1} of {2}")),this.bar.update(V(this.el_),e)},e.update=function(t){var e=n.prototype.update.call(this);return this.update_(this.getCurrentTime_(),e),e},e.getCurrentTime_=function(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()},e.handleEnded=function(t){this.update_(this.player_.duration(),1)},e.getPercent=function(){var t=this.getCurrentTime_()/this.player_.duration();return 1<=t?1:t||0},e.handleMouseDown=function(t){$(t)&&(t.stopPropagation(),this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),n.prototype.handleMouseDown.call(this,t))},e.handleMouseMove=function(t){if($(t)){var e=this.calculateDistance(t)*this.player_.duration();e===this.player_.duration()&&(e-=.1),this.player_.currentTime(e)}},e.enable=function(){n.prototype.enable.call(this);var t=this.getChild("mouseTimeDisplay");t&&t.show()},e.disable=function(){n.prototype.disable.call(this);var t=this.getChild("mouseTimeDisplay");t&&t.hide()},e.handleMouseUp=function(t){n.prototype.handleMouseUp.call(this,t),t&&t.stopPropagation(),this.player_.scrubbing(!1),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying&&we(this.player_.play())},e.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},e.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},e.handleAction=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.handleKeyPress=function(t){32===t.which||13===t.which?(t.preventDefault(),this.handleAction(t)):n.prototype.handleKeyPress&&n.prototype.handleKeyPress.call(this,t)},t}(Dn);jn.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},Kt||Jt||jn.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),jn.prototype.playerEvent="timeupdate",jt.registerComponent("SeekBar",jn);var Fn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).handleMouseMove=wt(kt(m(m(i)),i.handleMouseMove),25),i.throttledHandleMouseSeek=wt(kt(m(m(i)),i.handleMouseSeek),25),i.enable(),i}f(t,n);var e=t.prototype;return e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},e.handleMouseMove=function(t){var e=this.getChild("seekBar");if(e){var i=e.getChild("mouseTimeDisplay"),n=e.el(),r=V(n),a=q(n,t).x;1<a?a=1:a<0&&(a=0),i&&i.update(r,a)}},e.handleMouseSeek=function(t){var e=this.getChild("seekBar");e&&e.handleMouseMove(t)},e.enabled=function(){return this.enabled_},e.disable=function(){this.children().forEach(function(t){return t.disable&&t.disable()}),this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDown),this.off(this.el_,"mousemove",this.handleMouseMove),this.handleMouseUp(),this.addClass("disabled"),this.enabled_=!1)},e.enable=function(){this.children().forEach(function(t){return t.enable&&t.enable()}),this.enabled()||(this.on(["mousedown","touchstart"],this.handleMouseDown),this.on(this.el_,"mousemove",this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)},e.handleMouseDown=function(t){var e=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseDown(t),this.on(e,"mousemove",this.throttledHandleMouseSeek),this.on(e,"touchmove",this.throttledHandleMouseSeek),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.handleMouseUp=function(t){var e=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseUp(t),this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},t}(jt);Fn.prototype.options_={children:["seekBar"]},jt.registerComponent("ProgressControl",Fn);var Vn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"fullscreenchange",i.handleFullscreenChange),!1===d[me.fullscreenEnabled]&&i.disable(),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-fullscreen-control "+n.prototype.buildCSSClass.call(this)},e.handleFullscreenChange=function(t){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},e.handleClick=function(t){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},t}(Tn);Vn.prototype.controlText_="Fullscreen",jt.registerComponent("FullscreenToggle",Vn);var Hn=function(t){function e(){return t.apply(this,arguments)||this}return f(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},e}(jt);jt.registerComponent("VolumeLevel",Hn);var qn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on("slideractive",i.updateLastVolume_),i.on(t,"volumechange",i.updateARIAAttributes),t.ready(function(){return i.updateARIAAttributes()}),i}f(t,n);var e=t.prototype;return e.createEl=function(){return n.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})},e.handleMouseDown=function(t){$(t)&&n.prototype.handleMouseDown.call(this,t)},e.handleMouseMove=function(t){$(t)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(t)))},e.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},e.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},e.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},e.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},e.updateARIAAttributes=function(t){var e=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",e),this.el_.setAttribute("aria-valuetext",e+"%")},e.volumeAsPercentage_=function(){return Math.round(100*this.player_.volume())},e.updateLastVolume_=function(){var t=this,e=this.player_.volume();this.one("sliderinactive",function(){0===t.player_.volume()&&t.player_.lastVolume_(e)})},t}(Dn);qn.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},qn.prototype.playerEvent="volumechange",jt.registerComponent("VolumeBar",qn);var zn=function(a){function t(t,e){var i,n,r;return void 0===e&&(e={}),e.vertical=e.vertical||!1,("undefined"==typeof e.volumeBar||c(e.volumeBar))&&(e.volumeBar=e.volumeBar||{},e.volumeBar.vertical=e.vertical),i=a.call(this,t,e)||this,n=m(m(i)),(r=t).tech_&&!r.tech_.featuresVolumeControl&&n.addClass("vjs-hidden"),n.on(r,"loadstart",function(){r.tech_.featuresVolumeControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")}),i.throttledHandleMouseMove=wt(kt(m(m(i)),i.handleMouseMove),25),i.on("mousedown",i.handleMouseDown),i.on("touchstart",i.handleMouseDown),i.on(i.volumeBar,["focus","slideractive"],function(){i.volumeBar.addClass("vjs-slider-active"),i.addClass("vjs-slider-active"),i.trigger("slideractive")}),i.on(i.volumeBar,["blur","sliderinactive"],function(){i.volumeBar.removeClass("vjs-slider-active"),i.removeClass("vjs-slider-active"),i.trigger("sliderinactive")}),i}f(t,a);var e=t.prototype;return e.createEl=function(){var t="vjs-volume-horizontal";return this.options_.vertical&&(t="vjs-volume-vertical"),a.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control "+t})},e.handleMouseDown=function(t){var e=this.el_.ownerDocument;this.on(e,"mousemove",this.throttledHandleMouseMove),this.on(e,"touchmove",this.throttledHandleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.handleMouseUp=function(t){var e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseMove),this.off(e,"touchmove",this.throttledHandleMouseMove),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},e.handleMouseMove=function(t){this.volumeBar.handleMouseMove(t)},t}(jt);zn.prototype.options_={children:["volumeBar"]},jt.registerComponent("VolumeControl",zn);var Wn=function(a){function t(t,e){var i,n,r;return i=a.call(this,t,e)||this,n=m(m(i)),(r=t).tech_&&!r.tech_.featuresMuteControl&&n.addClass("vjs-hidden"),n.on(r,"loadstart",function(){r.tech_.featuresMuteControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")}),i.on(t,["loadstart","volumechange"],i.update),i}f(t,a);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-mute-control "+a.prototype.buildCSSClass.call(this)},e.handleClick=function(t){var e=this.player_.volume(),i=this.player_.lastVolume_();if(0===e){var n=i<.1?.1:i;this.player_.volume(n),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())},e.update=function(t){this.updateIcon_(),this.updateControlText_()},e.updateIcon_=function(){var t=this.player_.volume(),e=3;Kt&&this.player_.muted(this.player_.tech_.el_.muted),0===t||this.player_.muted()?e=0:t<.33?e=1:t<.67&&(e=2);for(var i=0;i<4;i++)x(this.el_,"vjs-vol-"+i);U(this.el_,"vjs-vol-"+e)},e.updateControlText_=function(){var t=this.player_.muted()||0===this.player_.volume()?"Unmute":"Mute";this.controlText()!==t&&this.controlText(t)},t}(Tn);Wn.prototype.controlText_="Mute",jt.registerComponent("MuteToggle",Wn);var Gn=function(n){function t(t,e){var i;return void 0===e&&(e={}),"undefined"!=typeof e.inline?e.inline=e.inline:e.inline=!0,("undefined"==typeof e.volumeControl||c(e.volumeControl))&&(e.volumeControl=e.volumeControl||{},e.volumeControl.vertical=!e.inline),(i=n.call(this,t,e)||this).on(t,["loadstart"],i.volumePanelState_),i.on(i.volumeControl,["slideractive"],i.sliderActive_),i.on(i.volumeControl,["sliderinactive"],i.sliderInactive_),i}f(t,n);var e=t.prototype;return e.sliderActive_=function(){this.addClass("vjs-slider-active")},e.sliderInactive_=function(){this.removeClass("vjs-slider-active")},e.volumePanelState_=function(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden"),this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")},e.createEl=function(){var t="vjs-volume-panel-horizontal";return this.options_.inline||(t="vjs-volume-panel-vertical"),n.prototype.createEl.call(this,"div",{className:"vjs-volume-panel vjs-control "+t})},t}(jt);Gn.prototype.options_={children:["muteToggle","volumeControl"]},jt.registerComponent("VolumePanel",Gn);var Xn=function(n){function t(t,e){var i;return i=n.call(this,t,e)||this,e&&(i.menuButton_=e.menuButton),i.focusedChild_=-1,i.on("keydown",i.handleKeyPress),i}f(t,n);var e=t.prototype;return e.addItem=function(e){this.addChild(e),e.on("click",kt(this,function(t){this.menuButton_&&(this.menuButton_.unpressButton(),"CaptionSettingsMenuItem"!==e.name()&&this.menuButton_.focus())}))},e.createEl=function(){var t=this.options_.contentElType||"ul";this.contentEl_=A(t,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var e=n.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return e.appendChild(this.contentEl_),ht(e,"click",function(t){t.preventDefault(),t.stopImmediatePropagation()}),e},e.dispose=function(){this.contentEl_=null,n.prototype.dispose.call(this)},e.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepForward()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepBack())},e.stepForward=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_+1),this.focus(t)},e.stepBack=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_-1),this.focus(t)},e.focus=function(t){void 0===t&&(t=0);var e=this.children().slice();e.length&&e[0].className&&/vjs-menu-title/.test(e[0].className)&&e.shift(),0<e.length&&(t<0?t=0:t>=e.length&&(t=e.length-1),e[this.focusedChild_=t].el_.focus())},t}(jt);jt.registerComponent("Menu",Xn);var Yn=function(r){function t(t,e){var i;void 0===e&&(e={}),(i=r.call(this,t,e)||this).menuButton_=new Tn(t,e),i.menuButton_.controlText(i.controlText_),i.menuButton_.el_.setAttribute("aria-haspopup","true");var n=Tn.prototype.buildCSSClass();return i.menuButton_.el_.className=i.buildCSSClass()+" "+n,i.menuButton_.removeClass("vjs-control"),i.addChild(i.menuButton_),i.update(),i.enabled_=!0,i.on(i.menuButton_,"tap",i.handleClick),i.on(i.menuButton_,"click",i.handleClick),i.on(i.menuButton_,"focus",i.handleFocus),i.on(i.menuButton_,"blur",i.handleBlur),i.on("keydown",i.handleSubmenuKeyPress),i}f(t,r);var e=t.prototype;return e.update=function(){var t=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=t,this.addChild(t),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},e.createMenu=function(){var t=new Xn(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){var e=A("li",{className:"vjs-menu-title",innerHTML:Bt(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,t.children_.unshift(e),O(e,t.contentEl())}if(this.items=this.createItems(),this.items)for(var i=0;i<this.items.length;i++)t.addItem(this.items[i]);return t},e.createItems=function(){},e.createEl=function(){return r.prototype.createEl.call(this,"div",{className:this.buildWrapperCSSClass()},{})},e.buildWrapperCSSClass=function(){var t="vjs-menu-button";return!0===this.options_.inline?t+="-inline":t+="-popup","vjs-menu-button "+t+" "+Tn.prototype.buildCSSClass()+" "+r.prototype.buildCSSClass.call(this)},e.buildCSSClass=function(){var t="vjs-menu-button";return!0===this.options_.inline?t+="-inline":t+="-popup","vjs-menu-button "+t+" "+r.prototype.buildCSSClass.call(this)},e.controlText=function(t,e){return void 0===e&&(e=this.menuButton_.el()),this.menuButton_.controlText(t,e)},e.handleClick=function(t){this.one(this.menu.contentEl(),"mouseleave",kt(this,function(t){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},e.focus=function(){this.menuButton_.focus()},e.blur=function(){this.menuButton_.blur()},e.handleFocus=function(){ht(d,"keydown",kt(this,this.handleKeyPress))},e.handleBlur=function(){dt(d,"keydown",kt(this,this.handleKeyPress))},e.handleKeyPress=function(t){27===t.which||9===t.which?(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus())):38!==t.which&&40!==t.which||this.buttonPressed_||(this.pressButton(),t.preventDefault())},e.handleSubmenuKeyPress=function(t){27!==t.which&&9!==t.which||(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus()))},e.pressButton=function(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),Kt&&C())return;this.menu.focus()}},e.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","false"))},e.disable=function(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()},e.enable=function(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()},t}(jt);jt.registerComponent("MenuButton",Yn);var $n=function(a){function t(t,e){var i,n=e.tracks;if((i=a.call(this,t,e)||this).items.length<=1&&i.hide(),!n)return m(i);var r=kt(m(m(i)),i.update);return n.addEventListener("removetrack",r),n.addEventListener("addtrack",r),i.player_.on("ready",r),i.player_.on("dispose",function(){n.removeEventListener("removetrack",r),n.removeEventListener("addtrack",r)}),i}return f(t,a),t}(Yn);jt.registerComponent("TrackButton",$n);var Kn=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).selectable=e.selectable,i.isSelected_=e.selected||!1,i.multiSelectable=e.multiSelectable,i.selected(i.isSelected_),i.selectable?i.multiSelectable?i.el_.setAttribute("role","menuitemcheckbox"):i.el_.setAttribute("role","menuitemradio"):i.el_.setAttribute("role","menuitem"),i}f(t,n);var e=t.prototype;return e.createEl=function(t,e,i){return this.nonIconControl=!0,n.prototype.createEl.call(this,"li",b({className:"vjs-menu-item",innerHTML:'<span class="vjs-menu-item-text">'+this.localize(this.options_.label)+"</span>",tabIndex:-1},e),i)},e.handleClick=function(t){this.selected(!0)},e.selected=function(t){this.selectable&&(this.isSelected_=t?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected"),!0):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(""),!1))},t}(pn);jt.registerComponent("MenuItem",Kn);var Qn=function(u){function t(t,e){var n,i=e.track,r=t.textTracks();e.label=i.label||i.language||"Unknown",e.selected="showing"===i.mode,(n=u.call(this,t,e)||this).track=i;var a,s=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];n.handleTracksChange.apply(m(m(n)),e)},o=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];n.handleSelectedLanguageChange.apply(m(m(n)),e)};(t.on(["loadstart","texttrackchange"],s),r.addEventListener("change",s),r.addEventListener("selectedlanguagechange",o),n.on("dispose",function(){t.off(["loadstart","texttrackchange"],s),r.removeEventListener("change",s),r.removeEventListener("selectedlanguagechange",o)}),void 0===r.onchange)&&n.on(["tap","click"],function(){if("object"!=typeof v.Event)try{a=new v.Event("change")}catch(t){}a||(a=d.createEvent("Event")).initEvent("change",!0,!0),r.dispatchEvent(a)});return n.handleTracksChange(),n}f(t,u);var e=t.prototype;return e.handleClick=function(t){var e=this.track.kind,i=this.track.kinds,n=this.player_.textTracks();if(i||(i=[e]),u.prototype.handleClick.call(this,t),n)for(var r=0;r<n.length;r++){var a=n[r];a===this.track&&-1<i.indexOf(a.kind)?"showing"!==a.mode&&(a.mode="showing"):"disabled"!==a.mode&&(a.mode="disabled")}},e.handleTracksChange=function(t){var e="showing"===this.track.mode;e!==this.isSelected_&&this.selected(e)},e.handleSelectedLanguageChange=function(t){if("showing"===this.track.mode){var e=this.player_.cache_.selectedLanguage;if(e&&e.enabled&&e.language===this.track.language&&e.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}},e.dispose=function(){this.track=null,u.prototype.dispose.call(this)},t}(Kn);jt.registerComponent("TextTrackMenuItem",Qn);var Jn=function(i){function t(t,e){return e.track={player:t,kind:e.kind,kinds:e.kinds,default:!1,mode:"disabled"},e.kinds||(e.kinds=[e.kind]),e.label?e.track.label=e.label:e.track.label=e.kinds.join(" and ")+" off",e.selectable=!0,e.multiSelectable=!1,i.call(this,t,e)||this}f(t,i);var e=t.prototype;return e.handleTracksChange=function(t){for(var e=this.player().textTracks(),i=!0,n=0,r=e.length;n<r;n++){var a=e[n];if(-1<this.options_.kinds.indexOf(a.kind)&&"showing"===a.mode){i=!1;break}}i!==this.isSelected_&&this.selected(i)},e.handleSelectedLanguageChange=function(t){for(var e=this.player().textTracks(),i=!0,n=0,r=e.length;n<r;n++){var a=e[n];if(-1<["captions","descriptions","subtitles"].indexOf(a.kind)&&"showing"===a.mode){i=!1;break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})},t}(Qn);jt.registerComponent("OffTextTrackMenuItem",Jn);var Zn=function(i){function t(t,e){return void 0===e&&(e={}),e.tracks=t.textTracks(),i.call(this,t,e)||this}return f(t,i),t.prototype.createItems=function(t,e){var i;void 0===t&&(t=[]),void 0===e&&(e=Qn),this.label_&&(i=this.label_+" off"),t.push(new Jn(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i})),this.hideThreshold_+=1;var n=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(var r=0;r<n.length;r++){var a=n[r];if(-1<this.kinds_.indexOf(a.kind)){var s=new e(this.player_,{track:a,selectable:!0,multiSelectable:!1});s.addClass("vjs-"+a.kind+"-menu-item"),t.push(s)}}return t},t}($n);jt.registerComponent("TextTrackButton",Zn);var tr=function(s){function t(t,e){var i,n=e.track,r=e.cue,a=t.currentTime();return e.selectable=!0,e.multiSelectable=!1,e.label=r.text,e.selected=r.startTime<=a&&a<r.endTime,(i=s.call(this,t,e)||this).track=n,i.cue=r,n.addEventListener("cuechange",kt(m(m(i)),i.update)),i}f(t,s);var e=t.prototype;return e.handleClick=function(t){s.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},e.update=function(t){var e=this.cue,i=this.player_.currentTime();this.selected(e.startTime<=i&&i<e.endTime)},t}(Kn);jt.registerComponent("ChaptersTrackMenuItem",tr);var er=function(n){function t(t,e,i){return n.call(this,t,e,i)||this}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-chapters-button "+n.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-chapters-button "+n.prototype.buildWrapperCSSClass.call(this)},e.update=function(t){this.track_&&(!t||"addtrack"!==t.type&&"removetrack"!==t.type)||this.setTrack(this.findChaptersTrack()),n.prototype.update.call(this)},e.setTrack=function(t){if(this.track_!==t){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var e=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);e&&e.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=t,this.track_){this.track_.mode="hidden";var i=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);i&&i.addEventListener("load",this.updateHandler_)}}},e.findChaptersTrack=function(){for(var t=this.player_.textTracks()||[],e=t.length-1;0<=e;e--){var i=t[e];if(i.kind===this.kind_)return i}},e.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize(Bt(this.kind_))},e.createMenu=function(){return this.options_.title=this.getMenuCaption(),n.prototype.createMenu.call(this)},e.createItems=function(){var t=[];if(!this.track_)return t;var e=this.track_.cues;if(!e)return t;for(var i=0,n=e.length;i<n;i++){var r=e[i],a=new tr(this.player_,{track:this.track_,cue:r});t.push(a)}return t},t}(Zn);er.prototype.kind_="chapters",er.prototype.controlText_="Chapters",jt.registerComponent("ChaptersButton",er);var ir=function(s){function t(t,e,i){var n;n=s.call(this,t,e,i)||this;var r=t.textTracks(),a=kt(m(m(n)),n.handleTracksChange);return r.addEventListener("change",a),n.on("dispose",function(){r.removeEventListener("change",a)}),n}f(t,s);var e=t.prototype;return e.handleTracksChange=function(t){for(var e=this.player().textTracks(),i=!1,n=0,r=e.length;n<r;n++){var a=e[n];if(a.kind!==this.kind_&&"showing"===a.mode){i=!0;break}}i?this.disable():this.enable()},e.buildCSSClass=function(){return"vjs-descriptions-button "+s.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-descriptions-button "+s.prototype.buildWrapperCSSClass.call(this)},t}(Zn);ir.prototype.kind_="descriptions",ir.prototype.controlText_="Descriptions",jt.registerComponent("DescriptionsButton",ir);var nr=function(n){function t(t,e,i){return n.call(this,t,e,i)||this}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-subtitles-button "+n.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-subtitles-button "+n.prototype.buildWrapperCSSClass.call(this)},t}(Zn);nr.prototype.kind_="subtitles",nr.prototype.controlText_="Subtitles",jt.registerComponent("SubtitlesButton",nr);var rr=function(n){function t(t,e){var i;return e.track={player:t,kind:e.kind,label:e.kind+" settings",selectable:!1,default:!1,mode:"disabled"},e.selectable=!1,e.name="CaptionSettingsMenuItem",(i=n.call(this,t,e)||this).addClass("vjs-texttrack-settings"),i.controlText(", opens "+e.kind+" settings dialog"),i}return f(t,n),t.prototype.handleClick=function(t){this.player().getChild("textTrackSettings").open()},t}(Qn);jt.registerComponent("CaptionSettingsMenuItem",rr);var ar=function(n){function t(t,e,i){return n.call(this,t,e,i)||this}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-captions-button "+n.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-captions-button "+n.prototype.buildWrapperCSSClass.call(this)},e.createItems=function(){var t=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||!this.player().getChild("textTrackSettings")||(t.push(new rr(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),n.prototype.createItems.call(this,t)},t}(Zn);ar.prototype.kind_="captions",ar.prototype.controlText_="Captions",jt.registerComponent("CaptionsButton",ar);var sr=function(r){function t(){return r.apply(this,arguments)||this}return f(t,r),t.prototype.createEl=function(t,e,i){var n='<span class="vjs-menu-item-text">'+this.localize(this.options_.label);return"captions"===this.options_.track.kind&&(n+='\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> '+this.localize("Captions")+"</span>\n      "),n+="</span>",r.prototype.createEl.call(this,t,b({innerHTML:n},e),i)},t}(Qn);jt.registerComponent("SubsCapsMenuItem",sr);var or=function(n){function t(t,e){var i;return void 0===e&&(e={}),(i=n.call(this,t,e)||this).label_="subtitles",-1<["en","en-us","en-ca","fr-ca"].indexOf(i.player_.language_)&&(i.label_="captions"),i.menuButton_.controlText(Bt(i.label_)),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-subs-caps-button "+n.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-subs-caps-button "+n.prototype.buildWrapperCSSClass.call(this)},e.createItems=function(){var t=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||!this.player().getChild("textTrackSettings")||(t.push(new rr(this.player_,{kind:this.label_})),this.hideThreshold_+=1),t=n.prototype.createItems.call(this,t,sr)},t}(Zn);or.prototype.kinds_=["captions","subtitles"],or.prototype.controlText_="Subtitles",jt.registerComponent("SubsCapsButton",or);var ur=function(s){function t(t,e){var n,i=e.track,r=t.audioTracks();e.label=i.label||i.language||"Unknown",e.selected=i.enabled,(n=s.call(this,t,e)||this).track=i,n.addClass("vjs-"+i.kind+"-menu-item");var a=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];n.handleTracksChange.apply(m(m(n)),e)};return r.addEventListener("change",a),n.on("dispose",function(){r.removeEventListener("change",a)}),n}f(t,s);var e=t.prototype;return e.createEl=function(t,e,i){var n='<span class="vjs-menu-item-text">'+this.localize(this.options_.label);return"main-desc"===this.options_.track.kind&&(n+='\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> '+this.localize("Descriptions")+"</span>\n      "),n+="</span>",s.prototype.createEl.call(this,t,b({innerHTML:n},e),i)},e.handleClick=function(t){var e=this.player_.audioTracks();s.prototype.handleClick.call(this,t);for(var i=0;i<e.length;i++){var n=e[i];n.enabled=n===this.track}},e.handleTracksChange=function(t){this.selected(this.track.enabled)},t}(Kn);jt.registerComponent("AudioTrackMenuItem",ur);var lr=function(i){function t(t,e){return void 0===e&&(e={}),e.tracks=t.audioTracks(),i.call(this,t,e)||this}f(t,i);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-audio-button "+i.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-audio-button "+i.prototype.buildWrapperCSSClass.call(this)},e.createItems=function(t){void 0===t&&(t=[]),this.hideThreshold_=1;for(var e=this.player_.audioTracks(),i=0;i<e.length;i++){var n=e[i];t.push(new ur(this.player_,{track:n,selectable:!0,multiSelectable:!1}))}return t},t}($n);lr.prototype.controlText_="Audio Track",jt.registerComponent("AudioTrackButton",lr);var cr=function(a){function t(t,e){var i,n=e.rate,r=parseFloat(n,10);return e.label=n,e.selected=1===r,e.selectable=!0,e.multiSelectable=!1,(i=a.call(this,t,e)||this).label=n,i.rate=r,i.on(t,"ratechange",i.update),i}f(t,a);var e=t.prototype;return e.handleClick=function(t){a.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},e.update=function(t){this.selected(this.player().playbackRate()===this.rate)},t}(Kn);cr.prototype.contentElType="button",jt.registerComponent("PlaybackRateMenuItem",cr);var hr=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).updateVisibility(),i.updateLabel(),i.on(t,"loadstart",i.updateVisibility),i.on(t,"ratechange",i.updateLabel),i}f(t,n);var e=t.prototype;return e.createEl=function(){var t=n.prototype.createEl.call(this);return this.labelEl_=A("div",{className:"vjs-playback-rate-value",innerHTML:"1x"}),t.appendChild(this.labelEl_),t},e.dispose=function(){this.labelEl_=null,n.prototype.dispose.call(this)},e.buildCSSClass=function(){return"vjs-playback-rate "+n.prototype.buildCSSClass.call(this)},e.buildWrapperCSSClass=function(){return"vjs-playback-rate "+n.prototype.buildWrapperCSSClass.call(this)},e.createMenu=function(){var t=new Xn(this.player()),e=this.playbackRates();if(e)for(var i=e.length-1;0<=i;i--)t.addChild(new cr(this.player(),{rate:e[i]+"x"}));return t},e.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},e.handleClick=function(t){for(var e=this.player().playbackRate(),i=this.playbackRates(),n=i[0],r=0;r<i.length;r++)if(i[r]>e){n=i[r];break}this.player().playbackRate(n)},e.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},e.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&0<this.playbackRates().length},e.updateVisibility=function(t){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},e.updateLabel=function(t){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},t}(Yn);hr.prototype.controlText_="Playback Rate",jt.registerComponent("PlaybackRateMenuButton",hr);var dr=function(t){function e(){return t.apply(this,arguments)||this}f(e,t);var i=e.prototype;return i.buildCSSClass=function(){return"vjs-spacer "+t.prototype.buildCSSClass.call(this)},i.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},e}(jt);jt.registerComponent("Spacer",dr);var pr=function(e){function t(){return e.apply(this,arguments)||this}f(t,e);var i=t.prototype;return i.buildCSSClass=function(){return"vjs-custom-control-spacer "+e.prototype.buildCSSClass.call(this)},i.createEl=function(){var t=e.prototype.createEl.call(this,{className:this.buildCSSClass()});return t.innerHTML=" ",t},t}(dr);jt.registerComponent("CustomControlSpacer",pr);var fr=function(t){function e(){return t.apply(this,arguments)||this}return f(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"})},e}(jt);fr.prototype.options_={children:["playToggle","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","fullscreenToggle"]},jt.registerComponent("ControlBar",fr);var mr=function(n){function t(t,e){var i;return(i=n.call(this,t,e)||this).on(t,"error",i.open),i}f(t,n);var e=t.prototype;return e.buildCSSClass=function(){return"vjs-error-display "+n.prototype.buildCSSClass.call(this)},e.content=function(){var t=this.player().error();return t?this.localize(t.message):""},t}(Oe);mr.prototype.options_=Nt(Oe.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),jt.registerComponent("ErrorDisplay",mr);var gr="vjs-text-track-settings",yr=["#000","Black"],vr=["#00F","Blue"],_r=["#0FF","Cyan"],br=["#0F0","Green"],Tr=["#F0F","Magenta"],Sr=["#F00","Red"],kr=["#FFF","White"],wr=["#FF0","Yellow"],Cr=["1","Opaque"],Er=["0.5","Semi-Transparent"],Ar=["0","Transparent"],Lr={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[yr,kr,Sr,br,vr,wr,Tr,_r]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[Cr,Er,Ar]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[kr,yr,Sr,br,vr,wr,Tr,_r]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:function(t){return"1.00"===t?null:Number(t)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[Cr,Er]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[Ar,Er,Cr]}};function Or(t,e){if(e&&(t=e(t)),t&&"none"!==t)return t}Lr.windowColor.options=Lr.backgroundColor.options;var Pr=function(n){function t(t,e){var i;return e.temporary=!1,(i=n.call(this,t,e)||this).updateDisplay=kt(m(m(i)),i.updateDisplay),i.fill(),i.hasBeenOpened_=i.hasBeenFilled_=!0,i.endDialog=A("p",{className:"vjs-control-text",textContent:i.localize("End of dialog window.")}),i.el().appendChild(i.endDialog),i.setDefaults(),void 0===e.persistTextTrackSettings&&(i.options_.persistTextTrackSettings=i.options_.playerOptions.persistTextTrackSettings),i.on(i.$(".vjs-done-button"),"click",function(){i.saveSettings(),i.close()}),i.on(i.$(".vjs-default-button"),"click",function(){i.setDefaults(),i.updateDisplay()}),o(Lr,function(t){i.on(i.$(t.selector),"change",i.updateDisplay)}),i.options_.persistTextTrackSettings&&i.restoreSettings(),i}f(t,n);var e=t.prototype;return e.dispose=function(){this.endDialog=null,n.prototype.dispose.call(this)},e.createElSelect_=function(t,e,i){var n=this;void 0===e&&(e=""),void 0===i&&(i="label");var r=Lr[t],a=r.id.replace("%s",this.id_),s=[e,a].join(" ").trim();return["<"+i+' id="'+a+'" class="'+("label"===i?"vjs-label":"")+'">',this.localize(r.label),"</"+i+">",'<select aria-labelledby="'+s+'">'].concat(r.options.map(function(t){var e=a+"-"+t[1].replace(/\W+/g,"");return['<option id="'+e+'" value="'+t[0]+'" ','aria-labelledby="'+s+" "+e+'">',n.localize(t[1]),"</option>"].join("")})).concat("</select>").join("")},e.createElFgColor_=function(){var t="captions-text-legend-"+this.id_;return['<fieldset class="vjs-fg-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Text"),"</legend>",this.createElSelect_("color",t),'<span class="vjs-text-opacity vjs-opacity">',this.createElSelect_("textOpacity",t),"</span>","</fieldset>"].join("")},e.createElBgColor_=function(){var t="captions-background-"+this.id_;return['<fieldset class="vjs-bg-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Background"),"</legend>",this.createElSelect_("backgroundColor",t),'<span class="vjs-bg-opacity vjs-opacity">',this.createElSelect_("backgroundOpacity",t),"</span>","</fieldset>"].join("")},e.createElWinColor_=function(){var t="captions-window-"+this.id_;return['<fieldset class="vjs-window-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Window"),"</legend>",this.createElSelect_("windowColor",t),'<span class="vjs-window-opacity vjs-opacity">',this.createElSelect_("windowOpacity",t),"</span>","</fieldset>"].join("")},e.createElColors_=function(){return A("div",{className:"vjs-track-settings-colors",innerHTML:[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()].join("")})},e.createElFont_=function(){return A("div",{className:"vjs-track-settings-font",innerHTML:['<fieldset class="vjs-font-percent vjs-track-setting">',this.createElSelect_("fontPercent","","legend"),"</fieldset>",'<fieldset class="vjs-edge-style vjs-track-setting">',this.createElSelect_("edgeStyle","","legend"),"</fieldset>",'<fieldset class="vjs-font-family vjs-track-setting">',this.createElSelect_("fontFamily","","legend"),"</fieldset>"].join("")})},e.createElControls_=function(){var t=this.localize("restore all settings to the default values");return A("div",{className:"vjs-track-settings-controls",innerHTML:['<button type="button" class="vjs-default-button" title="'+t+'">',this.localize("Reset"),'<span class="vjs-control-text"> '+t+"</span>","</button>",'<button type="button" class="vjs-done-button">'+this.localize("Done")+"</button>"].join("")})},e.content=function(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]},e.label=function(){return this.localize("Caption Settings Dialog")},e.description=function(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")},e.buildCSSClass=function(){return n.prototype.buildCSSClass.call(this)+" vjs-text-track-settings"},e.getValues=function(){var i,n,t,s=this;return n=function(t,e,i){var n,r,a=(n=s.$(e.selector),r=e.parser,Or(n.options[n.options.selectedIndex].value,r));return void 0!==a&&(t[i]=a),t},void 0===(t={})&&(t=0),r(i=Lr).reduce(function(t,e){return n(t,i[e],e)},t)},e.setValues=function(i){var n=this;o(Lr,function(t,e){!function(t,e,i){if(e)for(var n=0;n<t.options.length;n++)if(Or(t.options[n].value,i)===e){t.selectedIndex=n;break}}(n.$(t.selector),i[e],t.parser)})},e.setDefaults=function(){var i=this;o(Lr,function(t){var e=t.hasOwnProperty("default")?t.default:0;i.$(t.selector).selectedIndex=e})},e.restoreSettings=function(){var t;try{t=JSON.parse(v.localStorage.getItem(gr))}catch(t){g.warn(t)}t&&this.setValues(t)},e.saveSettings=function(){if(this.options_.persistTextTrackSettings){var t=this.getValues();try{Object.keys(t).length?v.localStorage.setItem(gr,JSON.stringify(t)):v.localStorage.removeItem(gr)}catch(t){g.warn(t)}}},e.updateDisplay=function(){var t=this.player_.getChild("textTrackDisplay");t&&t.updateDisplay()},e.conditionalBlur_=function(){this.previouslyActiveEl_=null,this.off(d,"keydown",this.handleKeyDown);var t=this.player_.controlBar,e=t&&t.subsCapsButton,i=t&&t.captionsButton;e?e.focus():i&&i.focus()},t}(Oe);jt.registerComponent("TextTrackSettings",Pr);var Ur=function(a){function t(t,e){var i,n=e.ResizeObserver||v.ResizeObserver;null===e.ResizeObserver&&(n=!1);var r=Nt({createEl:!n,reportTouchActivity:!1},e);return(i=a.call(this,t,r)||this).ResizeObserver=e.ResizeObserver||v.ResizeObserver,i.loadListener_=null,i.resizeObserver_=null,i.debouncedHandler_=function(n,r,a,s){var o;void 0===s&&(s=v);var t=function(){var t=this,e=arguments,i=function(){i=o=null,a||n.apply(t,e)};!o&&a&&n.apply(t,e),s.clearTimeout(o),o=s.setTimeout(i,r)};return t.cancel=function(){s.clearTimeout(o),o=null},t}(function(){i.resizeHandler()},100,!1,m(m(i))),n?(i.resizeObserver_=new i.ResizeObserver(i.debouncedHandler_),i.resizeObserver_.observe(t.el())):(i.loadListener_=function(){i.el_&&i.el_.contentWindow&&ht(i.el_.contentWindow,"resize",i.debouncedHandler_)},i.one("load",i.loadListener_)),i}f(t,a);var e=t.prototype;return e.createEl=function(){return a.prototype.createEl.call(this,"iframe",{className:"vjs-resize-manager"})},e.resizeHandler=function(){this.player_&&this.player_.trigger&&this.player_.trigger("playerresize")},e.dispose=function(){this.debouncedHandler_&&this.debouncedHandler_.cancel(),this.resizeObserver_&&(this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el()),this.resizeObserver_.disconnect()),this.el_&&this.el_.contentWindow&&dt(this.el_.contentWindow,"resize",this.debouncedHandler_),this.loadListener_&&this.off("load",this.loadListener_),this.ResizeObserver=null,this.resizeObserver=null,this.debouncedHandler_=null,this.loadListener_=null},t}(jt);jt.registerComponent("ResizeManager",Ur);var xr=function(t){var e=t.el();if(e.hasAttribute("src"))return t.triggerSourceset(e.src),!0;var i=t.$$("source"),n=[],r="";if(!i.length)return!1;for(var a=0;a<i.length;a++){var s=i[a].src;s&&-1===n.indexOf(s)&&n.push(s)}return!!n.length&&(1===n.length&&(r=n[0]),t.triggerSourceset(r),!0)},Ir=Object.defineProperty({},"innerHTML",{get:function(){return this.cloneNode(!0).innerHTML},set:function(t){var e=d.createElement(this.nodeName.toLowerCase());e.innerHTML=t;for(var i=d.createDocumentFragment();e.childNodes.length;)i.appendChild(e.childNodes[0]);return this.innerText="",v.Element.prototype.appendChild.call(this,i),this.innerHTML}}),Dr=function(t,e){for(var i={},n=0;n<t.length&&!((i=Object.getOwnPropertyDescriptor(t[n],e))&&i.set&&i.get);n++);return i.enumerable=!0,i.configurable=!0,i},Rr=function(a){var s=a.el();if(!s.resetSourceWatch_){var e={},t=Dr([a.el(),v.HTMLMediaElement.prototype,v.Element.prototype,Ir],"innerHTML"),i=function(r){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=r.apply(s,e);return xr(a),n}};["append","appendChild","insertAdjacentHTML"].forEach(function(t){s[t]&&(e[t]=s[t],s[t]=i(e[t]))}),Object.defineProperty(s,"innerHTML",Nt(t,{set:i(t.set)})),s.resetSourceWatch_=function(){s.resetSourceWatch_=null,Object.keys(e).forEach(function(t){s[t]=e[t]}),Object.defineProperty(s,"innerHTML",t)},a.one("sourceset",s.resetSourceWatch_)}},Mr=Object.defineProperty({},"src",{get:function(){return this.hasAttribute("src")?We(v.Element.prototype.getAttribute.call(this,"src")):""},set:function(t){return v.Element.prototype.setAttribute.call(this,"src",t),t}}),Br=function(n){if(n.featuresSourceset){var r=n.el();if(!r.resetSourceset_){var i=Dr([n.el(),v.HTMLMediaElement.prototype,Mr],"src"),a=r.setAttribute,e=r.load;Object.defineProperty(r,"src",Nt(i,{set:function(t){var e=i.set.call(r,t);return n.triggerSourceset(r.src),e}})),r.setAttribute=function(t,e){var i=a.call(r,t,e);return/src/i.test(t)&&n.triggerSourceset(r.src),i},r.load=function(){var t=e.call(r);return xr(n)||(n.triggerSourceset(""),Rr(n)),t},r.currentSrc?n.triggerSourceset(r.currentSrc):xr(n)||Rr(n),r.resetSourceset_=function(){r.resetSourceset_=null,r.load=e,r.setAttribute=a,Object.defineProperty(r,"src",i),r.resetSourceWatch_&&r.resetSourceWatch_()}}}};function Nr(){var t=e(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]);return Nr=function(){return t},t}var jr=function(c){function o(t,e){var i;i=c.call(this,t,e)||this;var n=t.source,r=!1;if(n&&(i.el_.currentSrc!==n.src||t.tag&&3===t.tag.initNetworkState_)?i.setSource(n):i.handleLateInit_(i.el_),t.enableSourceset&&i.setupSourcesetHandling_(),i.el_.hasChildNodes()){for(var a=i.el_.childNodes,s=a.length,o=[];s--;){var u=a[s];"track"===u.nodeName.toLowerCase()&&(i.featuresNativeTextTracks?(i.remoteTextTrackEls().addTrackElement_(u),i.remoteTextTracks().addTrack(u.track),i.textTracks().addTrack(u.track),r||i.el_.hasAttribute("crossorigin")||!Xe(u.src)||(r=!0)):o.push(u))}for(var l=0;l<o.length;l++)i.el_.removeChild(o[l])}return i.proxyNativeTracks_(),i.featuresNativeTextTracks&&r&&g.warn(_(Nr())),i.restoreMetadataTracksInIOSNativePlayer_(),(ue||Yt||te)&&!0===t.nativeControlsForTouch&&i.setControls(!0),i.proxyWebkitFullscreen_(),i.triggerReady(),i}f(o,c);var t=o.prototype;return t.dispose=function(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_(),o.disposeMediaElement(this.el_),this.options_=null,c.prototype.dispose.call(this)},t.setupSourcesetHandling_=function(){Br(this)},t.restoreMetadataTracksInIOSNativePlayer_=function(){var n,r=this.textTracks(),t=function(){n=[];for(var t=0;t<r.length;t++){var e=r[t];"metadata"===e.kind&&n.push({track:e,storedMode:e.mode})}};t(),r.addEventListener("change",t),this.on("dispose",function(){return r.removeEventListener("change",t)});var e=function t(){for(var e=0;e<n.length;e++){var i=n[e];"disabled"===i.track.mode&&i.track.mode!==i.storedMode&&(i.track.mode=i.storedMode)}r.removeEventListener("change",t)};this.on("webkitbeginfullscreen",function(){r.removeEventListener("change",t),r.removeEventListener("change",e),r.addEventListener("change",e)}),this.on("webkitendfullscreen",function(){r.removeEventListener("change",t),r.addEventListener("change",t),r.removeEventListener("change",e)})},t.overrideNative_=function(t,e){var i=this;if(e===this["featuresNative"+t+"Tracks"]){var n=t.toLowerCase();this[n+"TracksListeners_"]&&Object.keys(this[n+"TracksListeners_"]).forEach(function(t){i.el()[n+"Tracks"].removeEventListener(t,i[n+"TracksListeners_"][t])}),this["featuresNative"+t+"Tracks"]=!e,this[n+"TracksListeners_"]=null,this.proxyNativeTracksForType_(n)}},t.overrideNativeAudioTracks=function(t){this.overrideNative_("Audio",t)},t.overrideNativeVideoTracks=function(t){this.overrideNative_("Video",t)},t.proxyNativeTracksForType_=function(t){var n=this,e=bi[t],r=this.el()[e.getterName],a=this[e.getterName]();if(this["featuresNative"+e.capitalName+"Tracks"]&&r&&r.addEventListener){var s={change:function(t){a.trigger({type:"change",target:a,currentTarget:a,srcElement:a})},addtrack:function(t){a.addTrack(t.track)},removetrack:function(t){a.removeTrack(t.track)}},i=function(){for(var t=[],e=0;e<a.length;e++){for(var i=!1,n=0;n<r.length;n++)if(r[n]===a[e]){i=!0;break}i||t.push(a[e])}for(;t.length;)a.removeTrack(t.shift())};this[e.getterName+"Listeners_"]=s,Object.keys(s).forEach(function(e){var i=s[e];r.addEventListener(e,i),n.on("dispose",function(t){return r.removeEventListener(e,i)})}),this.on("loadstart",i),this.on("dispose",function(t){return n.off("loadstart",i)})}},t.proxyNativeTracks_=function(){var e=this;bi.names.forEach(function(t){e.proxyNativeTracksForType_(t)})},t.createEl=function(){var t=this.options_.tag;if(!t||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(t){var e=t.cloneNode(!0);t.parentNode&&t.parentNode.insertBefore(e,t),o.disposeMediaElement(t),t=e}else{t=d.createElement("video");var i=Nt({},this.options_.tag&&R(this.options_.tag));ue&&!0===this.options_.nativeControlsForTouch||delete i.controls,D(t,b(i,{id:this.options_.techId,class:"vjs-tech"}))}t.playerId=this.options_.playerId}"undefined"!=typeof this.options_.preload&&B(t,"preload",this.options_.preload);for(var n=["loop","muted","playsinline","autoplay"],r=0;r<n.length;r++){var a=n[r],s=this.options_[a];"undefined"!=typeof s&&(s?B(t,a,a):N(t,a),t[a]=s)}return t},t.handleLateInit_=function(t){if(0!==t.networkState&&3!==t.networkState){if(0===t.readyState){var e=!1,i=function(){e=!0};this.on("loadstart",i);var n=function(){e||this.trigger("loadstart")};return this.on("loadedmetadata",n),void this.ready(function(){this.off("loadstart",i),this.off("loadedmetadata",n),e||this.trigger("loadstart")})}var r=["loadstart"];r.push("loadedmetadata"),2<=t.readyState&&r.push("loadeddata"),3<=t.readyState&&r.push("canplay"),4<=t.readyState&&r.push("canplaythrough"),this.ready(function(){r.forEach(function(t){this.trigger(t)},this)})}},t.setCurrentTime=function(t){try{this.el_.currentTime=t}catch(t){g(t,"Video is not ready. (Video.js)")}},t.duration=function(){var e=this;if(this.el_.duration===1/0&&Jt&&ne&&0===this.el_.currentTime){return this.on("timeupdate",function t(){0<e.el_.currentTime&&(e.el_.duration===1/0&&e.trigger("durationchange"),e.off("timeupdate",t))}),NaN}return this.el_.duration||NaN},t.width=function(){return this.el_.offsetWidth},t.height=function(){return this.el_.offsetHeight},t.proxyWebkitFullscreen_=function(){var t=this;if("webkitDisplayingFullscreen"in this.el_){var e=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},i=function(){"webkitPresentationMode"in this.el_&&"picture-in-picture"!==this.el_.webkitPresentationMode&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0}))};this.on("webkitbeginfullscreen",i),this.on("dispose",function(){t.off("webkitbeginfullscreen",i),t.off("webkitendfullscreen",e)})}},t.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var t=v.navigator&&v.navigator.userAgent||"";if(/Android/.test(t)||!/Chrome|Mac OS X 10.5/.test(t))return!0}return!1},t.enterFullScreen=function(){var t=this.el_;t.paused&&t.networkState<=t.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){t.pause(),t.webkitEnterFullScreen()},0)):t.webkitEnterFullScreen()},t.exitFullScreen=function(){this.el_.webkitExitFullScreen()},t.src=function(t){if(void 0===t)return this.el_.src;this.setSrc(t)},t.reset=function(){o.resetMediaElement(this.el_)},t.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},t.setControls=function(t){this.el_.controls=!!t},t.addTextTrack=function(t,e,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(t,e,i):c.prototype.addTextTrack.call(this,t,e,i)},t.createRemoteTextTrack=function(t){if(!this.featuresNativeTextTracks)return c.prototype.createRemoteTextTrack.call(this,t);var e=d.createElement("track");return t.kind&&(e.kind=t.kind),t.label&&(e.label=t.label),(t.language||t.srclang)&&(e.srclang=t.language||t.srclang),t.default&&(e.default=t.default),t.id&&(e.id=t.id),t.src&&(e.src=t.src),e},t.addRemoteTextTrack=function(t,e){var i=c.prototype.addRemoteTextTrack.call(this,t,e);return this.featuresNativeTextTracks&&this.el().appendChild(i),i},t.removeRemoteTextTrack=function(t){if(c.prototype.removeRemoteTextTrack.call(this,t),this.featuresNativeTextTracks)for(var e=this.$$("track"),i=e.length;i--;)t!==e[i]&&t!==e[i].track||this.el().removeChild(e[i])},t.getVideoPlaybackQuality=function(){if("function"==typeof this.el().getVideoPlaybackQuality)return this.el().getVideoPlaybackQuality();var t={};return"undefined"!=typeof this.el().webkitDroppedFrameCount&&"undefined"!=typeof this.el().webkitDecodedFrameCount&&(t.droppedVideoFrames=this.el().webkitDroppedFrameCount,t.totalVideoFrames=this.el().webkitDecodedFrameCount),v.performance&&"function"==typeof v.performance.now?t.creationTime=v.performance.now():v.performance&&v.performance.timing&&"number"==typeof v.performance.timing.navigationStart&&(t.creationTime=v.Date.now()-v.performance.timing.navigationStart),t},o}(Qi);if(k()){jr.TEST_VID=d.createElement("video");var Fr=d.createElement("track");Fr.kind="captions",Fr.srclang="en",Fr.label="English",jr.TEST_VID.appendChild(Fr)}jr.isSupported=function(){try{jr.TEST_VID.volume=.5}catch(t){return!1}return!(!jr.TEST_VID||!jr.TEST_VID.canPlayType)},jr.canPlayType=function(t){return jr.TEST_VID.canPlayType(t)},jr.canPlaySource=function(t,e){return jr.canPlayType(t.type)},jr.canControlVolume=function(){try{var t=jr.TEST_VID.volume;return jr.TEST_VID.volume=t/2+.1,t!==jr.TEST_VID.volume}catch(t){return!1}},jr.canMuteVolume=function(){try{var t=jr.TEST_VID.muted;return jr.TEST_VID.muted=!t,jr.TEST_VID.muted?B(jr.TEST_VID,"muted","muted"):N(jr.TEST_VID,"muted"),t!==jr.TEST_VID.muted}catch(t){return!1}},jr.canControlPlaybackRate=function(){if(Jt&&ne&&re<58)return!1;try{var t=jr.TEST_VID.playbackRate;return jr.TEST_VID.playbackRate=t/2+.1,t!==jr.TEST_VID.playbackRate}catch(t){return!1}},jr.canOverrideAttributes=function(){try{var t=function(){};Object.defineProperty(d.createElement("video"),"src",{get:t,set:t}),Object.defineProperty(d.createElement("audio"),"src",{get:t,set:t}),Object.defineProperty(d.createElement("video"),"innerHTML",{get:t,set:t}),Object.defineProperty(d.createElement("audio"),"innerHTML",{get:t,set:t})}catch(t){return!1}return!0},jr.supportsNativeTextTracks=function(){return oe||Kt&&ne},jr.supportsNativeVideoTracks=function(){return!(!jr.TEST_VID||!jr.TEST_VID.videoTracks)},jr.supportsNativeAudioTracks=function(){return!(!jr.TEST_VID||!jr.TEST_VID.audioTracks)},jr.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],jr.prototype.featuresVolumeControl=jr.canControlVolume(),jr.prototype.featuresMuteControl=jr.canMuteVolume(),jr.prototype.featuresPlaybackRate=jr.canControlPlaybackRate(),jr.prototype.featuresSourceset=jr.canOverrideAttributes(),jr.prototype.movingMediaElementInDOM=!Kt,jr.prototype.featuresFullscreenResize=!0,jr.prototype.featuresProgressEvents=!0,jr.prototype.featuresTimeupdateEvents=!0,jr.prototype.featuresNativeTextTracks=jr.supportsNativeTextTracks(),jr.prototype.featuresNativeVideoTracks=jr.supportsNativeVideoTracks(),jr.prototype.featuresNativeAudioTracks=jr.supportsNativeAudioTracks();var Vr=jr.TEST_VID&&jr.TEST_VID.constructor.prototype.canPlayType,Hr=/^application\/(?:x-|vnd\.apple\.)mpegurl/i;function qr(){var t=e(["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "]);return qr=function(){return t},t}jr.patchCanPlayType=function(){4<=Zt&&!ee&&!ne&&(jr.TEST_VID.constructor.prototype.canPlayType=function(t){return t&&Hr.test(t)?"maybe":Vr.call(this,t)})},jr.unpatchCanPlayType=function(){var t=jr.TEST_VID.constructor.prototype.canPlayType;return jr.TEST_VID.constructor.prototype.canPlayType=Vr,t},jr.patchCanPlayType(),jr.disposeMediaElement=function(t){if(t){for(t.parentNode&&t.parentNode.removeChild(t);t.hasChildNodes();)t.removeChild(t.firstChild);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},jr.resetMediaElement=function(t){if(t){for(var e=t.querySelectorAll("source"),i=e.length;i--;)t.removeChild(e[i]);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(t){jr.prototype[t]=function(){return this.el_[t]||this.el_.hasAttribute(t)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(e){jr.prototype["set"+Bt(e)]=function(t){(this.el_[e]=t)?this.el_.setAttribute(e,e):this.el_.removeAttribute(e)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(t){jr.prototype[t]=function(){return this.el_[t]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate"].forEach(function(e){jr.prototype["set"+Bt(e)]=function(t){this.el_[e]=t}}),["pause","load","play"].forEach(function(t){jr.prototype[t]=function(){return this.el_[t]()}}),Qi.withSourceHandlers(jr),jr.nativeSourceHandler={},jr.nativeSourceHandler.canPlayType=function(t){try{return jr.TEST_VID.canPlayType(t)}catch(t){return""}},jr.nativeSourceHandler.canHandleSource=function(t,e){if(t.type)return jr.nativeSourceHandler.canPlayType(t.type);if(t.src){var i=Ge(t.src);return jr.nativeSourceHandler.canPlayType("video/"+i)}return""},jr.nativeSourceHandler.handleSource=function(t,e,i){e.setSrc(t.src)},jr.nativeSourceHandler.dispose=function(){},jr.registerSourceHandler(jr.nativeSourceHandler),Qi.registerTech("Html5",jr);var zr=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],Wr={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},Gr=["tiny","xsmall","small","medium","large","xlarge","huge"],Xr={};Gr.forEach(function(t){var e="x"===t.charAt(0)?"x-"+t.substring(1):t;Xr[t]="vjs-layout-"+e});var Yr={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0},$r=function(c){function h(t,e,i){var n;if(t.id=t.id||e.id||"vjs_video_"+tt(),(e=b(h.getTagSettings(t),e)).initChildren=!1,e.createEl=!1,e.evented=!1,e.reportTouchActivity=!1,!e.language)if("function"==typeof t.closest){var r=t.closest("[lang]");r&&r.getAttribute&&(e.language=r.getAttribute("lang"))}else for(var a=t;a&&1===a.nodeType;){if(R(a).hasOwnProperty("lang")){e.language=a.getAttribute("lang");break}a=a.parentNode}if((n=c.call(this,null,e,i)||this).log=y(n.id_),n.isPosterFromTech_=!1,n.queuedCallbacks_=[],n.isReady_=!1,n.hasStarted_=!1,n.userActive_=!1,!n.options_||!n.options_.techOrder||!n.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(n.tag=t,n.tagAttributes=t&&R(t),n.language(n.options_.language),e.languages){var s={};Object.getOwnPropertyNames(e.languages).forEach(function(t){s[t.toLowerCase()]=e.languages[t]}),n.languages_=s}else n.languages_=h.prototype.options_.languages;n.cache_={},n.poster_=e.poster||"",n.controls_=!!e.controls,n.cache_.lastVolume=1,t.controls=!1,t.removeAttribute("controls"),t.hasAttribute("autoplay")?n.options_.autoplay=!0:n.autoplay(n.options_.autoplay),n.scrubbing_=!1,n.el_=n.createEl(),n.cache_.lastPlaybackRate=n.defaultPlaybackRate(),Dt(m(m(n)),{eventBusKey:"el_"});var o=Nt(n.options_);if(e.plugins){var u=e.plugins;Object.keys(u).forEach(function(t){if("function"!=typeof this[t])throw new Error('plugin "'+t+'" does not exist');this[t](u[t])},m(m(n)))}n.options_.playerOptions=o,n.middleware_=[],n.initChildren(),n.isAudio("audio"===t.nodeName.toLowerCase()),n.controls()?n.addClass("vjs-controls-enabled"):n.addClass("vjs-controls-disabled"),n.el_.setAttribute("role","region"),n.isAudio()?n.el_.setAttribute("aria-label",n.localize("Audio Player")):n.el_.setAttribute("aria-label",n.localize("Video Player")),n.isAudio()&&n.addClass("vjs-audio"),n.flexNotSupported_()&&n.addClass("vjs-no-flex"),Kt||n.addClass("vjs-workinghover"),h.players[n.id_]=m(m(n));var l=p.split(".")[0];return n.addClass("vjs-v"+l),n.userActive(!0),n.reportUserActivity(),n.one("play",n.listenForUserActivity_),n.on("fullscreenchange",n.handleFullscreenChange_),n.on("stageclick",n.handleStageClick_),n.breakpoints(n.options_.breakpoints),n.responsive(n.options_.responsive),n.changingSrc_=!1,n.playWaitingForReady_=!1,n.playOnLoadstart_=null,n}f(h,c);var t=h.prototype;return t.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),h.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&(this.tech_.dispose(),this.isPosterFromTech_=!1,this.poster_=""),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),Zi[this.id()]=null,c.prototype.dispose.call(this)},t.createEl=function(){var e,i=this.tag,t=this.playerElIngest_=i.parentNode&&i.parentNode.hasAttribute&&i.parentNode.hasAttribute("data-vjs-player"),n="video-js"===this.tag.tagName.toLowerCase();t?e=this.el_=i.parentNode:n||(e=this.el_=c.prototype.createEl.call(this,"div"));var r=R(i);if(n){for(e=this.el_=i,i=this.tag=d.createElement("video");e.children.length;)i.appendChild(e.firstChild);P(e,"video-js")||U(e,"video-js"),e.appendChild(i),t=this.playerElIngest_=e,Object.keys(e).forEach(function(t){i[t]=e[t]})}if(i.setAttribute("tabindex","-1"),r.tabindex="-1",ae&&(i.setAttribute("role","application"),r.role="application"),i.removeAttribute("width"),i.removeAttribute("height"),"width"in r&&delete r.width,"height"in r&&delete r.height,Object.getOwnPropertyNames(r).forEach(function(t){n&&"class"===t||e.setAttribute(t,r[t]),n&&i.setAttribute(t,r[t])}),i.playerId=i.id,i.id+="_html5_api",i.className="vjs-tech",i.player=e.player=this,this.addClass("vjs-paused"),!0!==v.VIDEOJS_NO_DYNAMIC_STYLE){this.styleEl_=Tt("vjs-styles-dimensions");var a=K(".vjs-styles-defaults"),s=K("head");s.insertBefore(this.styleEl_,a?a.nextSibling:s.firstChild)}this.fill_=!1,this.fluid_=!1,this.width(this.options_.width),this.height(this.options_.height),this.fill(this.options_.fill),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var o=i.getElementsByTagName("a"),u=0;u<o.length;u++){var l=o.item(u);U(l,"vjs-hidden"),l.setAttribute("hidden","hidden")}return i.initNetworkState_=i.networkState,i.parentNode&&!t&&i.parentNode.insertBefore(e,i),O(i,e),this.children_.unshift(i),this.el_.setAttribute("lang",this.language_),this.el_=e},t.width=function(t){return this.dimension("width",t)},t.height=function(t){return this.dimension("height",t)},t.dimension=function(t,e){var i=t+"_";if(void 0===e)return this[i]||0;if(""===e)return this[i]=void 0,void this.updateStyleEl_();var n=parseFloat(e);isNaN(n)?g.error('Improper value "'+e+'" supplied for for '+t):(this[i]=n,this.updateStyleEl_())},t.fluid=function(t){if(void 0===t)return!!this.fluid_;this.fluid_=!!t,t?(this.addClass("vjs-fluid"),this.fill(!1)):this.removeClass("vjs-fluid"),this.updateStyleEl_()},t.fill=function(t){if(void 0===t)return!!this.fill_;this.fill_=!!t,t?(this.addClass("vjs-fill"),this.fluid(!1)):this.removeClass("vjs-fill")},t.aspectRatio=function(t){if(void 0===t)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(t))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=t,this.fluid(!0),this.updateStyleEl_()},t.updateStyleEl_=function(){if(!0!==v.VIDEOJS_NO_DYNAMIC_STYLE){var t,e,i,n=(void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:0<this.videoWidth()?this.videoWidth()+":"+this.videoHeight():"16:9").split(":"),r=n[1]/n[0];t=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/r:this.videoWidth()||300,e=void 0!==this.height_?this.height_:t*r,i=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(i),St(this.styleEl_,"\n      ."+i+" {\n        width: "+t+"px;\n        height: "+e+"px;\n      }\n\n      ."+i+".vjs-fluid {\n        padding-top: "+100*r+"%;\n      }\n    ")}else{var a="number"==typeof this.width_?this.width_:this.options_.width,s="number"==typeof this.height_?this.height_:this.options_.height,o=this.tech_&&this.tech_.el();o&&(0<=a&&(o.width=a),0<=s&&(o.height=s))}},t.loadTech_=function(t,e){var i=this;this.tech_&&this.unloadTech_();var n=Bt(t),r=t.charAt(0).toLowerCase()+t.slice(1);"Html5"!==n&&this.tag&&(Qi.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=n,this.isReady_=!1;var a={source:e,autoplay:"string"!=typeof this.autoplay()&&this.autoplay(),nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+r+"_api",playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset};Si.names.forEach(function(t){var e=Si[t];a[e.getterName]=i[e.privateName]}),b(a,this.options_[n]),b(a,this.options_[r]),b(a,this.options_[t.toLowerCase()]),this.tag&&(a.tag=this.tag),e&&e.src===this.cache_.src&&0<this.cache_.currentTime&&(a.startTime=this.cache_.currentTime);var s=Qi.getTech(t);if(!s)throw new Error("No Tech named '"+n+"' exists! '"+n+"' should be registered using videojs.registerTech()'");this.tech_=new s(a),this.tech_.ready(kt(this,this.handleTechReady_),!0),Ae(this.textTracksJson_||[],this.tech_),zr.forEach(function(t){i.on(i.tech_,t,i["handleTech"+Bt(t)+"_"])}),Object.keys(Wr).forEach(function(e){i.on(i.tech_,e,function(t){0===i.tech_.playbackRate()&&i.tech_.seeking()?i.queuedCallbacks_.push({callback:i["handleTech"+Wr[e]+"_"].bind(i),event:t}):i["handleTech"+Wr[e]+"_"](t)})}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"sourceset",this.handleTechSourceset_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.on(this.tech_,"ratechange",this.handleTechRateChange_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===n&&this.tag||O(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},t.unloadTech_=function(){var i=this;Si.names.forEach(function(t){var e=Si[t];i[e.privateName]=i[e.getterName]()}),this.textTracksJson_=Ee(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1,this.isPosterFromTech_&&(this.poster_="",this.trigger("posterchange")),this.isPosterFromTech_=!1},t.tech=function(t){return void 0===t&&g.warn(_(qr())),this.tech_},t.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"dblclick",this.handleTechDoubleClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},t.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_),this.off(this.tech_,"dblclick",this.handleTechDoubleClick_)},t.handleTechReady_=function(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_()},t.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay")),this.manualAutoplay_(this.autoplay())},t.manualAutoplay_=function(e){var i=this;if(this.tech_&&"string"==typeof e){var t,n=function(){var e=i.muted();i.muted(!0);var t=i.play();if(t&&t.then&&t.catch)return t.catch(function(t){i.muted(e)})};if("any"===e?(t=this.play())&&t.then&&t.catch&&t.catch(function(){return n()}):t="muted"===e?n():this.play(),t&&t.then&&t.catch)return t.then(function(){i.trigger({type:"autoplay-success",autoplay:e})}).catch(function(t){i.trigger({type:"autoplay-failure",autoplay:e})})}},t.updateSourceCaches_=function(t){void 0===t&&(t="");var e=t,i="";"string"!=typeof e&&(e=t.src,i=t.type),this.cache_.source=this.cache_.source||{},this.cache_.sources=this.cache_.sources||[],e&&!i&&(i=function(t,e){if(!e)return"";if(t.cache_.source.src===e&&t.cache_.source.type)return t.cache_.source.type;var i=t.cache_.sources.filter(function(t){return t.src===e});if(i.length)return i[0].type;for(var n=t.$$("source"),r=0;r<n.length;r++){var a=n[r];if(a.type&&a.src&&a.src===e)return a.type}return cn(e)}(this,e)),this.cache_.source=Nt({},t,{src:e,type:i});for(var n=this.cache_.sources.filter(function(t){return t.src&&t.src===e}),r=[],a=this.$$("source"),s=[],o=0;o<a.length;o++){var u=R(a[o]);r.push(u),u.src&&u.src===e&&s.push(u.src)}s.length&&!n.length?this.cache_.sources=r:n.length||(this.cache_.sources=[this.cache_.source]),this.cache_.src=e},t.handleTechSourceset_=function(t){var n=this;if(!this.changingSrc_){var e=function(t){return n.updateSourceCaches_(t)},i=this.currentSource().src,r=t.src;if(i&&!/^blob:/.test(i)&&/^blob:/.test(r)&&(!this.lastSource_||this.lastSource_.tech!==r&&this.lastSource_.player!==i)&&(e=function(){}),e(r),!t.src){this.tech_.one(["sourceset","loadstart"],function t(e){if("sourceset"!==e.type){var i=n.techGet("currentSrc");n.lastSource_.tech=i,n.updateSourceCaches_(i)}n.tech_.off(["sourceset","loadstart"],t)})}}this.lastSource_={player:this.currentSource().src,tech:t.src},this.trigger({src:t.src,type:"sourceset"})},t.hasStarted=function(t){if(void 0===t)return this.hasStarted_;t!==this.hasStarted_&&(this.hasStarted_=t,this.hasStarted_?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started"))},t.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},t.handleTechRateChange_=function(){0<this.tech_.playbackRate()&&0===this.cache_.lastPlaybackRate&&(this.queuedCallbacks_.forEach(function(t){return t.callback(t.event)}),this.queuedCallbacks_=[]),this.cache_.lastPlaybackRate=this.tech_.playbackRate(),this.trigger("ratechange")},t.handleTechWaiting_=function(){var t=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return t.removeClass("vjs-waiting")})},t.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},t.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},t.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},t.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},t.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},t.handleTechFirstPlay_=function(){this.options_.starttime&&(g.warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},t.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},t.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},t.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},t.handleTechClick_=function(t){$(t)&&this.controls_&&(this.paused()?we(this.play()):this.pause())},t.handleTechDoubleClick_=function(e){this.controls_&&(Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),function(t){return t.contains(e.target)})||(this.isFullscreen()?this.exitFullscreen():this.requestFullscreen()))},t.handleTechTap_=function(){this.userActive(!this.userActive())},t.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},t.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},t.handleTechTouchEnd_=function(t){t.preventDefault()},t.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},t.handleStageClick_=function(){this.reportUserActivity()},t.handleTechFullscreenChange_=function(t,e){e&&this.isFullscreen(e.isFullscreen),this.trigger("fullscreenchange")},t.handleTechError_=function(){var t=this.tech_.error();this.error(t)},t.handleTechTextData_=function(){var t=null;1<arguments.length&&(t=arguments[1]),this.trigger("textdata",t)},t.getCache=function(){return this.cache_},t.techCall_=function(r,a){this.ready(function(){if(r in an)return t=this.middleware_,e=this.tech_,n=a,e[i=r](t.reduce(on(i),n));if(r in sn)return nn(this.middleware_,this.tech_,r,a);var t,e,i,n;try{this.tech_&&this.tech_[r](a)}catch(t){throw g(t),t}},!0)},t.techGet_=function(e){if(this.tech_&&this.tech_.isReady_){if(e in rn)return t=this.middleware_,i=this.tech_,n=e,t.reduceRight(on(n),i[n]());if(e in sn)return nn(this.middleware_,this.tech_,e);var t,i,n;try{return this.tech_[e]()}catch(t){if(void 0===this.tech_[e])throw g("Video.js: "+e+" method not defined for "+this.techName_+" playback technology.",t),t;if("TypeError"===t.name)throw g("Video.js: "+e+" unavailable on "+this.techName_+" playback technology element.",t),this.tech_.isReady_=!1,t;throw g(t),t}}},t.play=function(){var e=this,t=this.options_.Promise||v.Promise;return t?new t(function(t){e.play_(t)}):this.play_()},t.play_=function(t){var e=this;if(void 0===t&&(t=we),this.playOnLoadstart_&&this.off("loadstart",this.playOnLoadstart_),this.isReady_){if(!this.changingSrc_&&(this.src()||this.currentSrc()))return void t(this.techGet_("play"));this.playOnLoadstart_=function(){e.playOnLoadstart_=null,t(e.play())},this.one("loadstart",this.playOnLoadstart_)}else{if(this.playWaitingForReady_)return;this.playWaitingForReady_=!0,this.ready(function(){e.playWaitingForReady_=!1,t(e.play())})}},t.pause=function(){this.techCall_("pause")},t.paused=function(){return!1!==this.techGet_("paused")},t.played=function(){return this.techGet_("played")||de(0,0)},t.scrubbing=function(t){if("undefined"==typeof t)return this.scrubbing_;this.scrubbing_=!!t,t?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")},t.currentTime=function(t){return"undefined"!=typeof t?(t<0&&(t=0),void this.techCall_("setCurrentTime",t)):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},t.duration=function(t){if(void 0===t)return void 0!==this.cache_.duration?this.cache_.duration:NaN;(t=parseFloat(t))<0&&(t=1/0),t!==this.cache_.duration&&((this.cache_.duration=t)===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange"))},t.remainingTime=function(){return this.duration()-this.currentTime()},t.remainingTimeDisplay=function(){return Math.floor(this.duration())-Math.floor(this.currentTime())},t.buffered=function(){var t=this.techGet_("buffered");return t&&t.length||(t=de(0,0)),t},t.bufferedPercent=function(){return pe(this.buffered(),this.duration())},t.bufferedEnd=function(){var t=this.buffered(),e=this.duration(),i=t.end(t.length-1);return e<i&&(i=e),i},t.volume=function(t){var e;return void 0!==t?(e=Math.max(0,Math.min(1,parseFloat(t))),this.cache_.volume=e,this.techCall_("setVolume",e),void(0<e&&this.lastVolume_(e))):(e=parseFloat(this.techGet_("volume")),isNaN(e)?1:e)},t.muted=function(t){if(void 0===t)return this.techGet_("muted")||!1;this.techCall_("setMuted",t)},t.defaultMuted=function(t){return void 0!==t?this.techCall_("setDefaultMuted",t):this.techGet_("defaultMuted")||!1},t.lastVolume_=function(t){if(void 0===t||0===t)return this.cache_.lastVolume;this.cache_.lastVolume=t},t.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},t.isFullscreen=function(t){if(void 0===t)return!!this.isFullscreen_;this.isFullscreen_=!!t},t.requestFullscreen=function(){var i=me;this.isFullscreen(!0),i.requestFullscreen?(ht(d,i.fullscreenchange,kt(this,function t(e){this.isFullscreen(d[i.fullscreenElement]),!1===this.isFullscreen()&&dt(d,i.fullscreenchange,t),this.trigger("fullscreenchange")})),this.el_[i.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange"))},t.exitFullscreen=function(){var t=me;this.isFullscreen(!1),t.requestFullscreen?d[t.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange"))},t.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=d.documentElement.style.overflow,ht(d,"keydown",kt(this,this.fullWindowOnEscKey)),d.documentElement.style.overflow="hidden",U(d.body,"vjs-full-window"),this.trigger("enterFullWindow")},t.fullWindowOnEscKey=function(t){27===t.keyCode&&(!0===this.isFullscreen()?this.exitFullscreen():this.exitFullWindow())},t.exitFullWindow=function(){this.isFullWindow=!1,dt(d,"keydown",this.fullWindowOnEscKey),d.documentElement.style.overflow=this.docOrigOverflow,x(d.body,"vjs-full-window"),this.trigger("exitFullWindow")},t.canPlayType=function(t){for(var e,i=0,n=this.options_.techOrder;i<n.length;i++){var r=n[i],a=Qi.getTech(r);if(a||(a=jt.getComponent(r)),a){if(a.isSupported()&&(e=a.canPlayType(t)))return e}else g.error('The "'+r+'" tech is undefined. Skipped browser support check for that tech.')}return""},t.selectSource=function(t){var i,n=this,e=this.options_.techOrder.map(function(t){return[t,Qi.getTech(t)]}).filter(function(t){var e=t[0],i=t[1];return i?i.isSupported():(g.error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),r=function(t,i,n){var r;return t.some(function(e){return i.some(function(t){if(r=n(e,t))return!0})}),r},a=function(t,e){var i=t[0];if(t[1].canPlaySource(e,n.options_[i.toLowerCase()]))return{source:e,tech:i}};return(this.options_.sourceOrder?r(t,e,(i=a,function(t,e){return i(e,t)})):r(e,t,a))||!1},t.src=function(t){var r=this;if("undefined"==typeof t)return this.cache_.src||"";var a=function e(t){if(Array.isArray(t)){var i=[];t.forEach(function(t){t=e(t),Array.isArray(t)?i=i.concat(t):l(t)&&i.push(t)}),t=i}else t="string"==typeof t&&t.trim()?[hn({src:t})]:l(t)&&"string"==typeof t.src&&t.src&&t.src.trim()?[hn(t)]:[];return t}(t);a.length?(this.changingSrc_=!0,this.cache_.sources=a,this.updateSourceCaches_(a[0]),en(this,a[0],function(t,e){var i,n;if(r.middleware_=e,r.cache_.sources=a,r.updateSourceCaches_(t),r.src_(t))return 1<a.length?r.src(a.slice(1)):(r.changingSrc_=!1,r.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),void r.triggerReady());i=e,n=r.tech_,i.forEach(function(t){return t.setTech&&t.setTech(n)})})):this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0)},t.src_=function(t){var e,i,n=this,r=this.selectSource([t]);return!r||(e=r.tech,i=this.techName_,Bt(e)!==Bt(i)?(this.changingSrc_=!0,this.loadTech_(r.tech,r.source),this.tech_.ready(function(){n.changingSrc_=!1})):this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",t):this.techCall_("src",t.src),this.changingSrc_=!1},!0),!1)},t.load=function(){this.techCall_("load")},t.reset=function(){this.tech_&&this.tech_.clearTracks("text"),this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset")},t.currentSources=function(){var t=this.currentSource(),e=[];return 0!==Object.keys(t).length&&e.push(t),this.cache_.sources||e},t.currentSource=function(){return this.cache_.source||{}},t.currentSrc=function(){return this.currentSource()&&this.currentSource().src||""},t.currentType=function(){return this.currentSource()&&this.currentSource().type||""},t.preload=function(t){return void 0!==t?(this.techCall_("setPreload",t),void(this.options_.preload=t)):this.techGet_("preload")},t.autoplay=function(t){if(void 0===t)return this.options_.autoplay||!1;var e;"string"==typeof t&&/(any|play|muted)/.test(t)?(this.options_.autoplay=t,this.manualAutoplay_(t),e=!1):this.options_.autoplay=!!t,e=e||this.options_.autoplay,this.tech_&&this.techCall_("setAutoplay",e)},t.playsinline=function(t){return void 0!==t?(this.techCall_("setPlaysinline",t),this.options_.playsinline=t,this):this.techGet_("playsinline")},t.loop=function(t){return void 0!==t?(this.techCall_("setLoop",t),void(this.options_.loop=t)):this.techGet_("loop")},t.poster=function(t){if(void 0===t)return this.poster_;t||(t=""),t!==this.poster_&&(this.poster_=t,this.techCall_("setPoster",t),this.isPosterFromTech_=!1,this.trigger("posterchange"))},t.handleTechPosterChange_=function(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){var t=this.tech_.poster()||"";t!==this.poster_&&(this.poster_=t,this.isPosterFromTech_=!0,this.trigger("posterchange"))}},t.controls=function(t){if(void 0===t)return!!this.controls_;t=!!t,this.controls_!==t&&(this.controls_=t,this.usingNativeControls()&&this.techCall_("setControls",t),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))},t.usingNativeControls=function(t){if(void 0===t)return!!this.usingNativeControls_;t=!!t,this.usingNativeControls_!==t&&(this.usingNativeControls_=t,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))},t.error=function(t){return void 0===t?this.error_||null:null===t?(this.error_=t,this.removeClass("vjs-error"),void(this.errorDisplay&&this.errorDisplay.close())):(this.error_=new be(t),this.addClass("vjs-error"),g.error("(CODE:"+this.error_.code+" "+be.errorTypes[this.error_.code]+")",this.error_.message,this.error_),void this.trigger("error"))},t.reportUserActivity=function(t){this.userActivity_=!0},t.userActive=function(t){if(void 0===t)return this.userActive_;if((t=!!t)!==this.userActive_){if(this.userActive_=t,this.userActive_)return this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),void this.trigger("useractive");this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}},t.listenForUserActivity_=function(){var e,i,n,r,a=kt(this,this.reportUserActivity);this.on("mousedown",function(){a(),this.clearInterval(e),e=this.setInterval(a,250)}),this.on("mousemove",function(t){t.screenX===i&&t.screenY===n||(i=t.screenX,n=t.screenY,a())}),this.on("mouseup",function(t){a(),this.clearInterval(e)}),this.on("keydown",a),this.on("keyup",a),this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(r);var t=this.options_.inactivityTimeout;t<=0||(r=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},t))}},250)},t.playbackRate=function(t){if(void 0===t)return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1;this.techCall_("setPlaybackRate",t)},t.defaultPlaybackRate=function(t){return void 0!==t?this.techCall_("setDefaultPlaybackRate",t):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1},t.isAudio=function(t){if(void 0===t)return!!this.isAudio_;this.isAudio_=!!t},t.addTextTrack=function(t,e,i){if(this.tech_)return this.tech_.addTextTrack(t,e,i)},t.addRemoteTextTrack=function(t,e){if(this.tech_)return this.tech_.addRemoteTextTrack(t,e)},t.removeRemoteTextTrack=function(t){void 0===t&&(t={});var e=t.track;if(e||(e=t),this.tech_)return this.tech_.removeRemoteTextTrack(e)},t.getVideoPlaybackQuality=function(){return this.techGet_("getVideoPlaybackQuality")},t.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},t.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},t.language=function(t){if(void 0===t)return this.language_;this.language_=String(t).toLowerCase()},t.languages=function(){return Nt(h.prototype.options_.languages,this.languages_)},t.toJSON=function(){var t=Nt(this.options_),e=t.tracks;t.tracks=[];for(var i=0;i<e.length;i++){var n=e[i];(n=Nt(n)).player=void 0,t.tracks[i]=n}return t},t.createModal=function(t,e){var i=this;(e=e||{}).content=t||"";var n=new Oe(this,e);return this.addChild(n),n.on("dispose",function(){i.removeChild(n)}),n.open(),n},t.updateCurrentBreakpoint_=function(){if(this.responsive())for(var t=this.currentBreakpoint(),e=this.currentWidth(),i=0;i<Gr.length;i++){var n=Gr[i];if(e<=this.breakpoints_[n]){if(t===n)return;t&&this.removeClass(Xr[t]),this.addClass(Xr[n]),this.breakpoint_=n;break}}},t.removeCurrentBreakpoint_=function(){var t=this.currentBreakpointClass();this.breakpoint_="",t&&this.removeClass(t)},t.breakpoints=function(t){return void 0===t||(this.breakpoint_="",this.breakpoints_=b({},Yr,t),this.updateCurrentBreakpoint_()),b(this.breakpoints_)},t.responsive=function(t){return void 0===t?this.responsive_:(t=Boolean(t))!==this.responsive_?((this.responsive_=t)?(this.on("playerresize",this.updateCurrentBreakpoint_),this.updateCurrentBreakpoint_()):(this.off("playerresize",this.updateCurrentBreakpoint_),this.removeCurrentBreakpoint_()),t):void 0},t.currentBreakpoint=function(){return this.breakpoint_},t.currentBreakpointClass=function(){return Xr[this.breakpoint_]||""},h.getTagSettings=function(t){var e={sources:[],tracks:[]},i=R(t),n=i["data-setup"];if(P(t,"vjs-fill")&&(i.fill=!0),P(t,"vjs-fluid")&&(i.fluid=!0),null!==n){var r=Se(n||"{}"),a=r[0],s=r[1];a&&g.error(a),b(i,s)}if(b(e,i),t.hasChildNodes())for(var o=t.childNodes,u=0,l=o.length;u<l;u++){var c=o[u],h=c.nodeName.toLowerCase();"source"===h?e.sources.push(R(c)):"track"===h&&e.tracks.push(R(c))}return e},t.flexNotSupported_=function(){var t=d.createElement("i");return!("flexBasis"in t.style||"webkitFlexBasis"in t.style||"mozFlexBasis"in t.style||"msFlexBasis"in t.style||"msFlexOrder"in t.style)},h}(jt);Si.names.forEach(function(t){var e=Si[t];$r.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),$r.players={};var Kr=v.navigator;$r.prototype.options_={techOrder:Qi.defaultTechOrder_,html5:{},flash:{},inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:Kr&&(Kr.languages&&Kr.languages[0]||Kr.userLanguage||Kr.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",breakpoints:{},responsive:!1},["ended","seeking","seekable","networkState","readyState"].forEach(function(t){$r.prototype[t]=function(){return this.techGet_(t)}}),zr.forEach(function(t){$r.prototype["handleTech"+Bt(t)+"_"]=function(){return this.trigger(t)}}),jt.registerComponent("Player",$r);var Qr="plugin",Jr="activePlugins_",Zr={},ta=function(t){return Zr.hasOwnProperty(t)},ea=function(t){return ta(t)?Zr[t]:void 0},ia=function(t,e){t[Jr]=t[Jr]||{},t[Jr][e]=!0},na=function(t,e,i){var n=(i?"before":"")+"pluginsetup";t.trigger(n,e),t.trigger(n+":"+e.name,e)},ra=function(r,a){return a.prototype.name=r,function(){na(this,{name:r,plugin:a,instance:null},!0);for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=s(a,[this].concat(e));return this[r]=function(){return n},na(this,n.getEventHash()),n}},aa=function(){function a(t){if(this.constructor===a)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=t,Dt(this),delete this.trigger,Mt(this,this.constructor.defaultState),ia(t,this.name),this.dispose=kt(this,this.dispose),t.on("dispose",this.dispose)}var t=a.prototype;return t.version=function(){return this.constructor.VERSION},t.getEventHash=function(t){return void 0===t&&(t={}),t.name=this.name,t.plugin=this.constructor,t.instance=this,t},t.trigger=function(t,e){return void 0===e&&(e={}),pt(this.eventBusEl_,t,this.getEventHash(e))},t.handleStateChanged=function(t){},t.dispose=function(){var t=this.name,e=this.player;this.trigger("dispose"),this.off(),e.off("dispose",this.dispose),e[Jr][t]=!1,this.player=this.state=null,e[t]=ra(t,Zr[t])},a.isBasic=function(t){var e="string"==typeof t?ea(t):t;return"function"==typeof e&&!a.prototype.isPrototypeOf(e.prototype)},a.registerPlugin=function(t,e){if("string"!=typeof t)throw new Error('Illegal plugin name, "'+t+'", must be a string, was '+typeof t+".");if(ta(t))g.warn('A plugin named "'+t+'" already exists. You may want to avoid re-registering plugins!');else if($r.prototype.hasOwnProperty(t))throw new Error('Illegal plugin name, "'+t+'", cannot share a name with an existing player method!');if("function"!=typeof e)throw new Error('Illegal plugin for "'+t+'", must be a function, was '+typeof e+".");var i,n,r;return Zr[t]=e,t!==Qr&&(a.isBasic(e)?$r.prototype[t]=(i=t,n=e,r=function(){na(this,{name:i,plugin:n,instance:null},!0);var t=n.apply(this,arguments);return ia(this,i),na(this,{name:i,plugin:n,instance:t}),t},Object.keys(n).forEach(function(t){r[t]=n[t]}),r):$r.prototype[t]=ra(t,e)),e},a.deregisterPlugin=function(t){if(t===Qr)throw new Error("Cannot de-register base plugin.");ta(t)&&(delete Zr[t],delete $r.prototype[t])},a.getPlugins=function(t){var i;return void 0===t&&(t=Object.keys(Zr)),t.forEach(function(t){var e=ea(t);e&&((i=i||{})[t]=e)}),i},a.getPluginVersion=function(t){var e=ea(t);return e&&e.VERSION||""},a}();aa.getPlugin=ea,aa.BASE_PLUGIN_NAME=Qr,aa.registerPlugin(Qr,aa),$r.prototype.usingPlugin=function(t){return!!this[Jr]&&!0===this[Jr][t]},$r.prototype.hasPlugin=function(t){return!!ta(t)};var sa=function(t){return 0===t.indexOf("#")?t.slice(1):t};function oa(t,i,e){var n=oa.getPlayer(t);if(n)return i&&g.warn('Player "'+t+'" is already initialised. Options will not be applied.'),e&&n.ready(e),n;var r="string"==typeof t?K("#"+sa(t)):t;if(!w(r))throw new TypeError("The element or ID supplied is not valid. (videojs)");d.body.contains(r)||g.warn("The element supplied is not included in the DOM"),i=i||{},oa.hooks("beforesetup").forEach(function(t){var e=t(r,Nt(i));l(e)&&!Array.isArray(e)?i=Nt(i,e):g.error("please return an object in beforesetup hooks")});var a=jt.getComponent("Player");return n=new a(r,i,e),oa.hooks("setup").forEach(function(t){return t(n)}),n}if(oa.hooks_={},oa.hooks=function(t,e){return oa.hooks_[t]=oa.hooks_[t]||[],e&&(oa.hooks_[t]=oa.hooks_[t].concat(e)),oa.hooks_[t]},oa.hook=function(t,e){oa.hooks(t,e)},oa.hookOnce=function(i,t){oa.hooks(i,[].concat(t).map(function(e){return function t(){return oa.removeHook(i,t),e.apply(void 0,arguments)}}))},oa.removeHook=function(t,e){var i=oa.hooks(t).indexOf(e);return!(i<=-1)&&(oa.hooks_[t]=oa.hooks_[t].slice(),oa.hooks_[t].splice(i,1),!0)},!0!==v.VIDEOJS_NO_DYNAMIC_STYLE&&k()){var ua=K(".vjs-styles-defaults");if(!ua){ua=Tt("vjs-styles-defaults");var la=K("head");la&&la.insertBefore(ua,la.firstChild),St(ua,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}_t(1,oa),oa.VERSION=p,oa.options=$r.prototype.options_,oa.getPlayers=function(){return $r.players},oa.getPlayer=function(t){var e,i=$r.players;if("string"==typeof t){var n=sa(t),r=i[n];if(r)return r;e=K("#"+n)}else e=t;if(w(e)){var a=e,s=a.player,o=a.playerId;if(s||i[o])return s||i[o]}},oa.getAllPlayers=function(){return Object.keys($r.players).map(function(t){return $r.players[t]}).filter(Boolean)},oa.players=$r.players,oa.getComponent=jt.getComponent,oa.registerComponent=function(t,e){Qi.isTech(e)&&g.warn("The "+t+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),jt.registerComponent.call(jt,t,e)},oa.getTech=Qi.getTech,oa.registerTech=Qi.registerTech,oa.use=function(t,e){Ji[t]=Ji[t]||[],Ji[t].push(e)},Object.defineProperty(oa,"middleware",{value:{},writeable:!1,enumerable:!0}),Object.defineProperty(oa.middleware,"TERMINATOR",{value:tn,writeable:!1,enumerable:!0}),oa.browser=le,oa.TOUCH_ENABLED=ue,oa.extend=function(t,e){void 0===e&&(e={});var i=function(){t.apply(this,arguments)},n={};for(var r in"object"==typeof e?(e.constructor!==Object.prototype.constructor&&(i=e.constructor),n=e):"function"==typeof e&&(i=e),function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(t.super_=e)}(i,t),n)n.hasOwnProperty(r)&&(i.prototype[r]=n[r]);return i},oa.mergeOptions=Nt,oa.bind=kt,oa.registerPlugin=aa.registerPlugin,oa.deregisterPlugin=aa.deregisterPlugin,oa.plugin=function(t,e){return g.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),aa.registerPlugin(t,e)},oa.getPlugins=aa.getPlugins,oa.getPlugin=aa.getPlugin,oa.getPluginVersion=aa.getPluginVersion,oa.addLanguage=function(t,e){var i;return t=(""+t).toLowerCase(),oa.options.languages=Nt(oa.options.languages,((i={})[t]=e,i)),oa.options.languages[t]},oa.log=g,oa.createLogger=y,oa.createTimeRange=oa.createTimeRanges=de,oa.formatTime=An,oa.setFormatTime=function(t){En=t},oa.resetFormatTime=function(){En=Cn},oa.parseUrl=ze,oa.isCrossOrigin=Xe,oa.EventTarget=Ct,oa.on=ht,oa.one=ft,oa.off=dt,oa.trigger=pt,oa.xhr=hi,oa.TextTrack=gi,oa.AudioTrack=yi,oa.VideoTrack=vi,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(function(t){oa[t]=function(){return g.warn("videojs."+t+"() is deprecated; use videojs.dom."+t+"() instead"),J[t].apply(null,arguments)}}),oa.computedStyle=n,oa.dom=J,oa.url=Ye;var ca=Qe(function(t,e){var i,c,n,r,h;i=/^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,c=/^([^\/?#]*)(.*)$/,n=/(?:\/|^)\.(?=\/)/g,r=/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,h={buildAbsoluteURL:function(t,e,i){if(i=i||{},t=t.trim(),!(e=e.trim())){if(!i.alwaysNormalize)return t;var n=h.parseURL(t);if(!n)throw new Error("Error trying to parse base URL.");return n.path=h.normalizePath(n.path),h.buildURLFromParts(n)}var r=h.parseURL(e);if(!r)throw new Error("Error trying to parse relative URL.");if(r.scheme)return i.alwaysNormalize?(r.path=h.normalizePath(r.path),h.buildURLFromParts(r)):e;var a=h.parseURL(t);if(!a)throw new Error("Error trying to parse base URL.");if(!a.netLoc&&a.path&&"/"!==a.path[0]){var s=c.exec(a.path);a.netLoc=s[1],a.path=s[2]}a.netLoc&&!a.path&&(a.path="/");var o={scheme:a.scheme,netLoc:r.netLoc,path:null,params:r.params,query:r.query,fragment:r.fragment};if(!r.netLoc&&(o.netLoc=a.netLoc,"/"!==r.path[0]))if(r.path){var u=a.path,l=u.substring(0,u.lastIndexOf("/")+1)+r.path;o.path=h.normalizePath(l)}else o.path=a.path,r.params||(o.params=a.params,r.query||(o.query=a.query));return null===o.path&&(o.path=i.alwaysNormalize?h.normalizePath(r.path):r.path),h.buildURLFromParts(o)},parseURL:function(t){var e=i.exec(t);return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(n,"");t.length!==(t=t.replace(r,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}},t.exports=h}),ha=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},da=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},pa=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},fa=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},ma=function(){function t(){ha(this,t),this.listeners={}}return t.prototype.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},t.prototype.off=function(t,e){if(!this.listeners[t])return!1;var i=this.listeners[t].indexOf(e);return this.listeners[t].splice(i,1),-1<i},t.prototype.trigger=function(t){var e=this.listeners[t],i=void 0,n=void 0,r=void 0;if(e)if(2===arguments.length)for(n=e.length,i=0;i<n;++i)e[i].call(this,arguments[1]);else for(r=Array.prototype.slice.call(arguments,1),n=e.length,i=0;i<n;++i)e[i].apply(this,r)},t.prototype.dispose=function(){this.listeners={}},t.prototype.pipe=function(e){this.on("data",function(t){e.push(t)})},t}(),ga=function(e){function i(){ha(this,i);var t=fa(this,e.call(this));return t.buffer="",t}return pa(i,e),i.prototype.push=function(t){var e=void 0;for(this.buffer+=t,e=this.buffer.indexOf("\n");-1<e;e=this.buffer.indexOf("\n"))this.trigger("data",this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)},i}(ma),ya=function(t){for(var e=t.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')),i={},n=e.length,r=void 0;n--;)""!==e[n]&&((r=/([^=]*)=(.*)/.exec(e[n]).slice(1))[0]=r[0].replace(/^\s+|\s+$/g,""),r[1]=r[1].replace(/^\s+|\s+$/g,""),r[1]=r[1].replace(/^['"](.*)['"]$/g,"$1"),i[r[0]]=r[1]);return i},va=function(e){function i(){ha(this,i);var t=fa(this,e.call(this));return t.customParsers=[],t}return pa(i,e),i.prototype.push=function(t){var e=void 0,i=void 0;if(0!==(t=t.replace(/^[\u0000\s]+|[\u0000\s]+$/g,"")).length)if("#"===t[0]){for(var n=0;n<this.customParsers.length;n++)if(this.customParsers[n].call(this,t))return;if(0===t.indexOf("#EXT"))if(t=t.replace("\r",""),e=/^#EXTM3U/.exec(t))this.trigger("data",{type:"tag",tagType:"m3u"});else{if(e=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(t))return i={type:"tag",tagType:"inf"},e[1]&&(i.duration=parseFloat(e[1])),e[2]&&(i.title=e[2]),void this.trigger("data",i);if(e=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"targetduration"},e[1]&&(i.duration=parseInt(e[1],10)),void this.trigger("data",i);if(e=/^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"totalduration"},e[1]&&(i.duration=parseInt(e[1],10)),void this.trigger("data",i);if(e=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"version"},e[1]&&(i.version=parseInt(e[1],10)),void this.trigger("data",i);if(e=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"media-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void this.trigger("data",i);if(e=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"discontinuity-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void this.trigger("data",i);if(e=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(t))return i={type:"tag",tagType:"playlist-type"},e[1]&&(i.playlistType=e[1]),void this.trigger("data",i);if(e=/^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"byterange"},e[1]&&(i.length=parseInt(e[1],10)),e[2]&&(i.offset=parseInt(e[2],10)),void this.trigger("data",i);if(e=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(t))return i={type:"tag",tagType:"allow-cache"},e[1]&&(i.allowed=!/NO/.test(e[1])),void this.trigger("data",i);if(e=/^#EXT-X-MAP:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"map"},e[1]){var r=ya(e[1]);if(r.URI&&(i.uri=r.URI),r.BYTERANGE){var a=r.BYTERANGE.split("@"),s=a[0],o=a[1];i.byterange={},s&&(i.byterange.length=parseInt(s,10)),o&&(i.byterange.offset=parseInt(o,10))}}this.trigger("data",i)}else if(e=/^#EXT-X-STREAM-INF:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"stream-inf"},e[1]){if(i.attributes=ya(e[1]),i.attributes.RESOLUTION){var u=i.attributes.RESOLUTION.split("x"),l={};u[0]&&(l.width=parseInt(u[0],10)),u[1]&&(l.height=parseInt(u[1],10)),i.attributes.RESOLUTION=l}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}this.trigger("data",i)}else{if(e=/^#EXT-X-MEDIA:?(.*)$/.exec(t))return i={type:"tag",tagType:"media"},e[1]&&(i.attributes=ya(e[1])),void this.trigger("data",i);if(e=/^#EXT-X-ENDLIST/.exec(t))this.trigger("data",{type:"tag",tagType:"endlist"});else if(e=/^#EXT-X-DISCONTINUITY/.exec(t))this.trigger("data",{type:"tag",tagType:"discontinuity"});else{if(e=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(t))return i={type:"tag",tagType:"program-date-time"},e[1]&&(i.dateTimeString=e[1],i.dateTimeObject=new Date(e[1])),void this.trigger("data",i);if(e=/^#EXT-X-KEY:?(.*)$/.exec(t))return i={type:"tag",tagType:"key"},e[1]&&(i.attributes=ya(e[1]),i.attributes.IV&&("0x"===i.attributes.IV.substring(0,2).toLowerCase()&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),void this.trigger("data",i);if(e=/^#EXT-X-START:?(.*)$/.exec(t))return i={type:"tag",tagType:"start"},e[1]&&(i.attributes=ya(e[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),void this.trigger("data",i);if(e=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out-cont"},e[1]?i.data=e[1]:i.data="",void this.trigger("data",i);if(e=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out"},e[1]?i.data=e[1]:i.data="",void this.trigger("data",i);if(e=/^#EXT-X-CUE-IN:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-in"},e[1]?i.data=e[1]:i.data="",void this.trigger("data",i);this.trigger("data",{type:"tag",data:t.slice(4)})}}}else this.trigger("data",{type:"comment",text:t.slice(1)})}else this.trigger("data",{type:"uri",uri:t})},i.prototype.addParser=function(t){var e=this,i=t.expression,n=t.customType,r=t.dataParser,a=t.segment;"function"!=typeof r&&(r=function(t){return t}),this.customParsers.push(function(t){if(i.exec(t))return e.trigger("data",{type:"custom",data:r(t),customType:n,segment:a}),!0})},i}(ma),_a=function(e){function i(){ha(this,i);var t=fa(this,e.call(this));t.lineStream=new ga,t.parseStream=new va,t.lineStream.pipe(t.parseStream);var r=t,a=[],s={},o=void 0,u=void 0,l={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},c=0;return t.manifest={allowCache:!0,discontinuityStarts:[],segments:[]},t.parseStream.on("data",function(e){var i=void 0,n=void 0;({tag:function(){({"allow-cache":function(){this.manifest.allowCache=e.allowed,"allowed"in e||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange:function(){var t={};"length"in e&&((s.byterange=t).length=e.length,"offset"in e||(this.trigger("info",{message:"defaulting offset to zero"}),e.offset=0)),"offset"in e&&((s.byterange=t).offset=e.offset)},endlist:function(){this.manifest.endList=!0},inf:function(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),0<e.duration&&(s.duration=e.duration),0===e.duration&&(s.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=a},key:function(){e.attributes?"NONE"!==e.attributes.METHOD?e.attributes.URI?(e.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),u={method:e.attributes.METHOD||"AES-128",uri:e.attributes.URI},"undefined"!=typeof e.attributes.IV&&(u.iv=e.attributes.IV)):this.trigger("warn",{message:"ignoring key declaration without URI"}):u=null:this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){isFinite(e.number)?this.manifest.mediaSequence=e.number:this.trigger("warn",{message:"ignoring invalid media sequence: "+e.number})},"discontinuity-sequence":function(){isFinite(e.number)?(this.manifest.discontinuitySequence=e.number,c=e.number):this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+e.number})},"playlist-type":function(){/VOD|EVENT/.test(e.playlistType)?this.manifest.playlistType=e.playlistType:this.trigger("warn",{message:"ignoring unknown playlist type: "+e.playlist})},map:function(){o={},e.uri&&(o.uri=e.uri),e.byterange&&(o.byterange=e.byterange)},"stream-inf":function(){this.manifest.playlists=a,this.manifest.mediaGroups=this.manifest.mediaGroups||l,e.attributes?(s.attributes||(s.attributes={}),da(s.attributes,e.attributes)):this.trigger("warn",{message:"ignoring empty stream-inf attributes"})},media:function(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||l,e.attributes&&e.attributes.TYPE&&e.attributes["GROUP-ID"]&&e.attributes.NAME){var t=this.manifest.mediaGroups[e.attributes.TYPE];t[e.attributes["GROUP-ID"]]=t[e.attributes["GROUP-ID"]]||{},i=t[e.attributes["GROUP-ID"]],(n={default:/yes/i.test(e.attributes.DEFAULT)}).default?n.autoselect=!0:n.autoselect=/yes/i.test(e.attributes.AUTOSELECT),e.attributes.LANGUAGE&&(n.language=e.attributes.LANGUAGE),e.attributes.URI&&(n.uri=e.attributes.URI),e.attributes["INSTREAM-ID"]&&(n.instreamId=e.attributes["INSTREAM-ID"]),e.attributes.CHARACTERISTICS&&(n.characteristics=e.attributes.CHARACTERISTICS),e.attributes.FORCED&&(n.forced=/yes/i.test(e.attributes.FORCED)),i[e.attributes.NAME]=n}else this.trigger("warn",{message:"ignoring incomplete or missing media group"})},discontinuity:function(){c+=1,s.discontinuity=!0,this.manifest.discontinuityStarts.push(a.length)},"program-date-time":function(){"undefined"==typeof this.manifest.dateTimeString&&(this.manifest.dateTimeString=e.dateTimeString,this.manifest.dateTimeObject=e.dateTimeObject),s.dateTimeString=e.dateTimeString,s.dateTimeObject=e.dateTimeObject},targetduration:function(){!isFinite(e.duration)||e.duration<0?this.trigger("warn",{message:"ignoring invalid target duration: "+e.duration}):this.manifest.targetDuration=e.duration},totalduration:function(){!isFinite(e.duration)||e.duration<0?this.trigger("warn",{message:"ignoring invalid total duration: "+e.duration}):this.manifest.totalDuration=e.duration},start:function(){e.attributes&&!isNaN(e.attributes["TIME-OFFSET"])?this.manifest.start={timeOffset:e.attributes["TIME-OFFSET"],precise:e.attributes.PRECISE}:this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"})},"cue-out":function(){s.cueOut=e.data},"cue-out-cont":function(){s.cueOutCont=e.data},"cue-in":function(){s.cueIn=e.data}}[e.tagType]||function(){}).call(r)},uri:function(){s.uri=e.uri,a.push(s),!this.manifest.targetDuration||"duration"in s||(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),s.duration=this.manifest.targetDuration),u&&(s.key=u),s.timeline=c,o&&(s.map=o),s={}},comment:function(){},custom:function(){e.segment?(s.custom=s.custom||{},s.custom[e.customType]=e.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[e.customType]=e.data)}})[e.type].call(r)}),t}return pa(i,e),i.prototype.push=function(t){this.lineStream.push(t)},i.prototype.end=function(){this.lineStream.push("\n")},i.prototype.addParser=function(t){this.parseStream.addParser(t)},i}(ma),ba=function(t){return!!t&&"object"==typeof t},Ta=function n(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return e.reduce(function(e,i){return Object.keys(i).forEach(function(t){Array.isArray(e[t])&&Array.isArray(i[t])?e[t]=e[t].concat(i[t]):ba(e[t])&&ba(i[t])?e[t]=n(e[t],i[t]):e[t]=i[t]}),e},{})},Sa=function(t){return t.reduce(function(t,e){return t.concat(e)},[])},ka=function(t){if(!t.length)return[];for(var e=[],i=0;i<t.length;i++)e.push(t[i]);return e},wa=function(t){var e;return(e=t.reduce(function(t,e){var i,n=e.attributes.id+(e.attributes.lang||"");t[n]?(e.segments[0].discontinuity=!0,(i=t[n].segments).push.apply(i,e.segments),e.attributes.contentProtection&&(t[n].attributes.contentProtection=e.attributes.contentProtection)):t[n]=e;return t},{}),Object.keys(e).map(function(t){return e[t]})).map(function(t){var e,n;return t.discontinuityStarts=(e=t.segments,n="discontinuity",e.reduce(function(t,e,i){return e[n]&&t.push(i),t},[])),t})},Ca=function(t){var e,i=t.attributes,n=t.segments,r={attributes:(e={NAME:i.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:i.width,height:i.height},CODECS:i.codecs,BANDWIDTH:i.bandwidth},e["PROGRAM-ID"]=1,e),uri:"",endList:"static"===(i.type||"static"),timeline:i.periodIndex,resolvedUri:"",targetDuration:i.duration,segments:n,mediaSequence:n.length?n[0].number:1};return i.contentProtection&&(r.contentProtection=i.contentProtection),r};"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var Ea,Aa=(function(t,e){var i,c,n,r,h;i=/^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,c=/^([^\/?#]*)(.*)$/,n=/(?:\/|^)\.(?=\/)/g,r=/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,h={buildAbsoluteURL:function(t,e,i){if(i=i||{},t=t.trim(),!(e=e.trim())){if(!i.alwaysNormalize)return t;var n=h.parseURL(t);if(!n)throw new Error("Error trying to parse base URL.");return n.path=h.normalizePath(n.path),h.buildURLFromParts(n)}var r=h.parseURL(e);if(!r)throw new Error("Error trying to parse relative URL.");if(r.scheme)return i.alwaysNormalize?(r.path=h.normalizePath(r.path),h.buildURLFromParts(r)):e;var a=h.parseURL(t);if(!a)throw new Error("Error trying to parse base URL.");if(!a.netLoc&&a.path&&"/"!==a.path[0]){var s=c.exec(a.path);a.netLoc=s[1],a.path=s[2]}a.netLoc&&!a.path&&(a.path="/");var o={scheme:a.scheme,netLoc:r.netLoc,path:null,params:r.params,query:r.query,fragment:r.fragment};if(!r.netLoc&&(o.netLoc=a.netLoc,"/"!==r.path[0]))if(r.path){var u=a.path,l=u.substring(0,u.lastIndexOf("/")+1)+r.path;o.path=h.normalizePath(l)}else o.path=a.path,r.params||(o.params=a.params,r.query||(o.query=a.query));return null===o.path&&(o.path=i.alwaysNormalize?h.normalizePath(r.path):r.path),h.buildURLFromParts(o)},parseURL:function(t){var e=i.exec(t);return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(n,"");t.length!==(t=t.replace(r,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}},t.exports=h}(Ea={exports:{}},Ea.exports),Ea.exports),La=function(t,e){return/^[a-z]+:/i.test(e)?e:(/\/\//i.test(t)||(t=Aa.buildAbsoluteURL(v.location.href,t)),Aa.buildAbsoluteURL(t,e))},Oa=function(t){var e=t.baseUrl,i=void 0===e?"":e,n=t.source,r=void 0===n?"":n,a=t.range,s=void 0===a?"":a,o={uri:r,resolvedUri:La(i||"",r)};if(s){var u=s.split("-"),l=parseInt(u[0],10),c=parseInt(u[1],10);o.byterange={length:c-l,offset:l}}return o},Pa=function(t,e){for(var i,n,r,a,s,o,u,l,c,h,d,p,f=t.type,m=void 0===f?"static":f,g=t.minimumUpdatePeriod,y=void 0===g?0:g,v=t.media,_=void 0===v?"":v,b=t.sourceDuration,T=t.timescale,S=void 0===T?1:T,k=t.startNumber,w=void 0===k?1:k,C=t.periodIndex,E=[],A=-1,L=0;L<e.length;L++){var O=e[L],P=O.d,U=O.r||0,x=O.t||0;A<0&&(A=x),x&&A<x&&(A=x);var I=void 0;if(U<0){var D=L+1;I=D===e.length?"dynamic"===m&&0<y&&0<_.indexOf("$Number$")?(n=A,r=P,void 0,a=(i=t).NOW,s=i.clientOffset,o=i.availabilityStartTime,u=i.timescale,l=void 0===u?1:u,c=i.start,h=void 0===c?0:c,d=i.minimumUpdatePeriod,p=(a+s)/1e3+(void 0===d?0:d)-(o+h),Math.ceil((p*l-n)/r)):(b*S-A)/P:(e[D].t-A)/P}else I=U+1;for(var R=w+E.length+I,M=w+E.length;M<R;)E.push({number:M,duration:P/S,time:A,timeline:C}),A+=P,M++}return E},Ua={static:function(t){var e=t.duration,i=t.timescale,n=void 0===i?1:i,r=t.sourceDuration;return{start:0,end:Math.ceil(r/(e/n))}},dynamic:function(t){var e=t.NOW,i=t.clientOffset,n=t.availabilityStartTime,r=t.timescale,a=void 0===r?1:r,s=t.duration,o=t.start,u=void 0===o?0:o,l=t.minimumUpdatePeriod,c=void 0===l?0:l,h=t.timeShiftBufferDepth,d=void 0===h?1/0:h,p=(e+i)/1e3,f=n+u,m=p+c-f,g=Math.ceil(m*a/s),y=Math.floor((p-f-d)*a/s),v=Math.floor((p-f)*a/s);return{start:Math.max(0,y),end:Math.min(g,v)}}},xa=function(t){var o,e=t.type,i=void 0===e?"static":e,n=t.duration,r=t.timescale,a=void 0===r?1:r,s=t.sourceDuration,u=Ua[i](t),l=function(t,e){for(var i=[],n=t;n<e;n++)i.push(n);return i}(u.start,u.end).map((o=t,function(t,e){var i=o.duration,n=o.timescale,r=void 0===n?1:n,a=o.periodIndex,s=o.startNumber;return{number:(void 0===s?1:s)+t,duration:i/r,timeline:a,time:e*i}}));if("static"===i){var c=l.length-1;l[c].duration=s-n/a*c}return l},Ia=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,Da=function(t,e){return t.replace(Ia,(a=e,function(t,e,i,n){if("$$"===t)return"$";if("undefined"==typeof a[e])return t;var r=""+a[e];return"RepresentationID"===e?r:(n=i?parseInt(n,10):1)<=r.length?r:""+new Array(n-r.length+1).join("0")+r}));var a},Ra=function(i,t){var e,n,r={RepresentationID:i.id,Bandwidth:i.bandwidth||0},a=i.initialization,s=void 0===a?{sourceURL:"",range:""}:a,o=Oa({baseUrl:i.baseUrl,source:Da(s.sourceURL,r),range:s.range});return(n=t,(e=i).duration||n?e.duration?xa(e):Pa(e,n):[{number:e.startNumber||1,duration:e.sourceDuration,time:0,timeline:e.periodIndex}]).map(function(t){r.Number=t.number,r.Time=t.time;var e=Da(i.media||"",r);return{uri:e,timeline:t.timeline,duration:t.duration,resolvedUri:La(i.baseUrl||"",e),map:o,number:t.number}})},Ma="INVALID_NUMBER_OF_PERIOD",Ba="DASH_EMPTY_MANIFEST",Na="DASH_INVALID_XML",ja="NO_BASE_URL",Fa="SEGMENT_TIME_UNSPECIFIED",Va="UNSUPPORTED_UTC_TIMING_SCHEME",Ha=function(u,t){var e=u.duration,i=u.segmentUrls,n=void 0===i?[]:i;if(!e&&!t||e&&t)throw new Error(Fa);var r,a=n.map(function(t){return i=t,n=(e=u).baseUrl,r=e.initialization,s=Oa({baseUrl:n,source:(a=void 0===r?{}:r).sourceURL,range:a.range}),(o=Oa({baseUrl:n,source:i.media,range:i.mediaRange})).map=s,o;var e,i,n,r,a,s,o});return e&&(r=xa(u)),t&&(r=Pa(u,t)),r.map(function(t,e){if(a[e]){var i=a[e];return i.timeline=t.timeline,i.duration=t.duration,i.number=t.number,i}}).filter(function(t){return t})},qa=function(t){var e=t.baseUrl,i=t.initialization,n=void 0===i?{}:i,r=t.sourceDuration,a=t.timescale,s=void 0===a?1:a,o=t.indexRange,u=void 0===o?"":o,l=t.duration;if(!e)throw new Error(ja);var c=Oa({baseUrl:e,source:n.sourceURL,range:n.range}),h=Oa({baseUrl:e,source:e,range:u});if(h.map=c,l){var d=xa(t);d.length&&(h.duration=d[0].duration,h.timeline=d[0].timeline)}else r&&(h.duration=r/s,h.timeline=0);return h.number=0,[h]},za=function(t){var e,i,n=t.attributes,r=t.segmentInfo;if(r.template?(i=Ra,e=Ta(n,r.template)):r.base?(i=qa,e=Ta(n,r.base)):r.list&&(i=Ha,e=Ta(n,r.list)),!i)return{attributes:n};var a=i(e,r.timeline);if(e.duration){var s=e,o=s.duration,u=s.timescale,l=void 0===u?1:u;e.duration=o/l}else a.length?e.duration=a.reduce(function(t,e){return Math.max(t,Math.ceil(e.duration))},0):e.duration=0;return{attributes:e,segments:a}},Wa=function(t,e){return ka(t.childNodes).filter(function(t){return t.tagName===e})},Ga=function(t){return t.textContent.trim()},Xa=function(t){var e=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(t);if(!e)return 0;var i=e.slice(1),n=i[0],r=i[1],a=i[2],s=i[3],o=i[4],u=i[5];return 31536e3*parseFloat(n||0)+2592e3*parseFloat(r||0)+86400*parseFloat(a||0)+3600*parseFloat(s||0)+60*parseFloat(o||0)+parseFloat(u||0)},Ya={mediaPresentationDuration:function(t){return Xa(t)},availabilityStartTime:function(t){return/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(e=t)&&(e+="Z"),Date.parse(e)/1e3;var e},minimumUpdatePeriod:function(t){return Xa(t)},timeShiftBufferDepth:function(t){return Xa(t)},start:function(t){return Xa(t)},width:function(t){return parseInt(t,10)},height:function(t){return parseInt(t,10)},bandwidth:function(t){return parseInt(t,10)},startNumber:function(t){return parseInt(t,10)},timescale:function(t){return parseInt(t,10)},duration:function(t){var e=parseInt(t,10);return isNaN(e)?Xa(t):e},d:function(t){return parseInt(t,10)},t:function(t){return parseInt(t,10)},r:function(t){return parseInt(t,10)},DEFAULT:function(t){return t}},$a=function(t){return t&&t.attributes?ka(t.attributes).reduce(function(t,e){var i=Ya[e.name]||Ya.DEFAULT;return t[e.name]=i(e.value),t},{}):{}};var Ka,Qa,Ja,Za,ts,es={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},is=function(t,i){return i.length?Sa(t.map(function(e){return i.map(function(t){return La(e,Ga(t))})})):t},ns=function(t){var e=Wa(t,"SegmentTemplate")[0],i=Wa(t,"SegmentList")[0],n=i&&Wa(i,"SegmentURL").map(function(t){return Ta({tag:"SegmentURL"},$a(t))}),r=Wa(t,"SegmentBase")[0],a=i||e,s=a&&Wa(a,"SegmentTimeline")[0],o=i||r||e,u=o&&Wa(o,"Initialization")[0],l=e&&$a(e);l&&u?l.initialization=u&&$a(u):l&&l.initialization&&(l.initialization={sourceURL:l.initialization});var c={template:l,timeline:s&&Wa(s,"S").map(function(t){return $a(t)}),list:i&&Ta($a(i),{segmentUrls:n,initialization:$a(u)}),base:r&&Ta($a(r),{initialization:$a(u)})};return Object.keys(c).forEach(function(t){c[t]||delete c[t]}),c},rs=function(t){return t.reduce(function(t,e){var i=$a(e),n=es[i.schemeIdUri];if(n){t[n]={attributes:i};var r=Wa(e,"cenc:pssh")[0];if(r){var a=Ga(r),s=a&&function(t){for(var e=v.atob(t),i=new Uint8Array(e.length),n=0;n<e.length;n++)i[n]=e.charCodeAt(n);return i}(a);t[n].pssh=s}}return t},{})},as=function(p,f,m){return function(t){var e=$a(t),i=is(f,Wa(t,"BaseURL")),n=Wa(t,"Role")[0],r={role:$a(n)},a=Ta(p,e,r),s=rs(Wa(t,"ContentProtection"));Object.keys(s).length&&(a=Ta(a,{contentProtection:s}));var o,u,l,c=ns(t),h=Wa(t,"Representation"),d=Ta(m,c);return Sa(h.map((o=a,u=i,l=d,function(t){var e=Wa(t,"BaseURL"),i=is(u,e),n=Ta(o,$a(t)),r=ns(t);return i.map(function(t){return{segmentInfo:Ta(l,r),attributes:Ta(n,{baseUrl:t})}})})))}},ss=function(t,e){void 0===e&&(e={});var i=e,n=i.manifestUri,r=void 0===n?"":n,a=i.NOW,s=void 0===a?Date.now():a,o=i.clientOffset,u=void 0===o?0:o,l=Wa(t,"Period");if(!l.length)throw new Error(Ma);var c,h,d=$a(t),p=is([r],Wa(t,"BaseURL"));return d.sourceDuration=d.mediaPresentationDuration||0,d.NOW=s,d.clientOffset=u,Sa(l.map((c=d,h=p,function(t,e){var i=is(h,Wa(t,"BaseURL")),n=$a(t),r=parseInt(n.id,10),a=v.isNaN(r)?e:r,s=Ta(c,{periodIndex:a}),o=Wa(t,"AdaptationSet"),u=ns(t);return Sa(o.map(as(s,i,u)))})))},os=function(t){if(""===t)throw new Error(Ba);var e=(new v.DOMParser).parseFromString(t,"application/xml"),i=e&&"MPD"===e.documentElement.tagName?e.documentElement:null;if(!i||i&&0<i.getElementsByTagName("parsererror").length)throw new Error(Na);return i},us=function(t,e){return function(t){var e;if(!t.length)return{};var i=t[0].attributes,n=i.sourceDuration,r=i.minimumUpdatePeriod,a=void 0===r?0:r,s=wa(t.filter(function(t){var e=t.attributes;return"video/mp4"===e.mimeType||"video"===e.contentType})).map(Ca),o=wa(t.filter(function(t){var e=t.attributes;return"audio/mp4"===e.mimeType||"audio"===e.contentType})),u=t.filter(function(t){var e=t.attributes;return"text/vtt"===e.mimeType||"text"===e.contentType}),l={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:(e={AUDIO:{},VIDEO:{}},e["CLOSED-CAPTIONS"]={},e.SUBTITLES={},e),uri:"",duration:n,playlists:s,minimumUpdatePeriod:1e3*a};return o.length&&(l.mediaGroups.AUDIO.audio=o.reduce(function(t,e){var i,n,r,a,s,o=e.attributes.role&&e.attributes.role.value||"main",u=e.attributes.lang||"",l="main";return u&&(l=e.attributes.lang+" ("+o+")"),t[l]&&t[l].playlists[0].attributes.BANDWIDTH>e.attributes.bandwidth||(t[l]={language:u,autoselect:!0,default:"main"===o,playlists:[(i=e,r=i.attributes,a=i.segments,s={attributes:(n={NAME:r.id,BANDWIDTH:r.bandwidth,CODECS:r.codecs},n["PROGRAM-ID"]=1,n),uri:"",endList:"static"===(r.type||"static"),timeline:r.periodIndex,resolvedUri:"",targetDuration:r.duration,segments:a,mediaSequence:a.length?a[0].number:1},r.contentProtection&&(s.contentProtection=r.contentProtection),s)],uri:""}),t},{})),u.length&&(l.mediaGroups.SUBTITLES.subs=u.reduce(function(t,e){var i,n,r,a,s=e.attributes.lang||"text";return t[s]||(t[s]={language:s,default:!1,autoselect:!1,playlists:[(i=e,r=i.attributes,a=i.segments,"undefined"==typeof a&&(a=[{uri:r.baseUrl,timeline:r.periodIndex,resolvedUri:r.baseUrl||"",duration:r.sourceDuration,number:0}],r.duration=r.sourceDuration),{attributes:(n={NAME:r.id,BANDWIDTH:r.bandwidth},n["PROGRAM-ID"]=1,n),uri:"",endList:"static"===(r.type||"static"),timeline:r.periodIndex,resolvedUri:r.baseUrl||"",targetDuration:r.duration,segments:a,mediaSequence:a.length?a[0].number:1})],uri:""}),t},{})),l}(ss(os(t),e).map(za))},ls=function(t){return function(t){var e=Wa(t,"UTCTiming")[0];if(!e)return null;var i=$a(e);switch(i.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":i.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":i.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":i.method="DIRECT",i.value=Date.parse(i.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(Va)}return i}(os(t))},cs=function(t){return t>>>0};Ja=function(t){return Ka(t,["moov","trak"]).reduce(function(t,e){var i,n,r,a,s;return(i=Ka(e,["tkhd"])[0])?(n=i[0],a=cs(i[r=0===n?12:20]<<24|i[r+1]<<16|i[r+2]<<8|i[r+3]),(s=Ka(e,["mdia","mdhd"])[0])?(r=0===(n=s[0])?12:20,t[a]=cs(s[r]<<24|s[r+1]<<16|s[r+2]<<8|s[r+3]),t):null):null},{})},Za=function(r,t){var e,i,n;return e=Ka(t,["moof","traf"]),i=[].concat.apply([],e.map(function(n){return Ka(n,["tfhd"]).map(function(t){var e,i;return e=cs(t[4]<<24|t[5]<<16|t[6]<<8|t[7]),i=r[e]||9e4,(Ka(n,["tfdt"]).map(function(t){var e,i;return e=t[0],i=cs(t[4]<<24|t[5]<<16|t[6]<<8|t[7]),1===e&&(i*=Math.pow(2,32),i+=cs(t[8]<<24|t[9]<<16|t[10]<<8|t[11])),i})[0]||1/0)/i})})),n=Math.min.apply(null,i),isFinite(n)?n:0},ts=function(t){var e=Ka(t,["moov","trak"]),o=[];return e.forEach(function(t){var e=Ka(t,["mdia","hdlr"]),s=Ka(t,["tkhd"]);e.forEach(function(t,e){var i,n,r=Qa(t.subarray(8,12)),a=s[e];"vide"===r&&(n=0===(i=new DataView(a.buffer,a.byteOffset,a.byteLength)).getUint8(0)?i.getUint32(12):i.getUint32(20),o.push(n))})}),o};var hs,ds,ps,fs,ms,gs,ys,vs,_s,bs,Ts,Ss,ks,ws,Cs,Es,As,Ls,Os,Ps,Us,xs,Is,Ds,Rs,Ms,Bs,Ns,js,Fs,Vs,Hs,qs,zs,Ws,Gs,Xs,Ys,$s,Ks,Qs={findBox:Ka=function(t,e){var i,n,r,a,s,o=[];if(!e.length)return null;for(i=0;i<t.byteLength;)n=cs(t[i]<<24|t[i+1]<<16|t[i+2]<<8|t[i+3]),r=Qa(t.subarray(i+4,i+8)),a=1<n?i+n:t.byteLength,r===e[0]&&(1===e.length?o.push(t.subarray(i+8,a)):(s=Ka(t.subarray(i+8,a),e.slice(1))).length&&(o=o.concat(s))),i=a;return o},parseType:Qa=function(t){var e="";return e+=String.fromCharCode(t[0]),e+=String.fromCharCode(t[1]),e+=String.fromCharCode(t[2]),e+=String.fromCharCode(t[3])},timescale:Ja,startTime:Za,videoTrackIds:ts},Js=Math.pow(2,32)-1;!function(){var t;if(xs={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},"undefined"!=typeof Uint8Array){for(t in xs)xs.hasOwnProperty(t)&&(xs[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)]);Is=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)]),Rs=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)]),Ds=new Uint8Array([0,0,0,1]),Ms=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),Bs=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),Ns={video:Ms,audio:Bs},Vs=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),Fs=new Uint8Array([0,0,0,0,0,0,0,0]),Hs=new Uint8Array([0,0,0,0,0,0,0,0]),qs=Hs,zs=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),Ws=Hs,js=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}}(),hs=function(t){var e,i,n=[],r=0;for(e=1;e<arguments.length;e++)n.push(arguments[e]);for(e=n.length;e--;)r+=n[e].byteLength;for(i=new Uint8Array(r+8),new DataView(i.buffer,i.byteOffset,i.byteLength).setUint32(0,i.byteLength),i.set(t,4),e=0,r=8;e<n.length;e++)i.set(n[e],r),r+=n[e].byteLength;return i},ds=function(){return hs(xs.dinf,hs(xs.dref,Vs))},ps=function(t){return hs(xs.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,t.audioobjecttype<<3|t.samplingfrequencyindex>>>1,t.samplingfrequencyindex<<7|t.channelcount<<3,6,1,2]))},Cs=function(t){return hs(xs.hdlr,Ns[t])},ws=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,t.duration>>>24&255,t.duration>>>16&255,t.duration>>>8&255,255&t.duration,85,196,0,0]);return t.samplerate&&(e[12]=t.samplerate>>>24&255,e[13]=t.samplerate>>>16&255,e[14]=t.samplerate>>>8&255,e[15]=255&t.samplerate),hs(xs.mdhd,e)},ks=function(t){return hs(xs.mdia,ws(t),Cs(t.type),gs(t))},ms=function(t){return hs(xs.mfhd,new Uint8Array([0,0,0,0,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t]))},gs=function(t){return hs(xs.minf,"video"===t.type?hs(xs.vmhd,js):hs(xs.smhd,Fs),ds(),As(t))},ys=function(t,e){for(var i=[],n=e.length;n--;)i[n]=Os(e[n]);return hs.apply(null,[xs.moof,ms(t)].concat(i))},vs=function(t){for(var e=t.length,i=[];e--;)i[e]=Ts(t[e]);return hs.apply(null,[xs.moov,bs(4294967295)].concat(i).concat(_s(t)))},_s=function(t){for(var e=t.length,i=[];e--;)i[e]=Ps(t[e]);return hs.apply(null,[xs.mvex].concat(i))},bs=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return hs(xs.mvhd,e)},Es=function(t){var e,i,n=t.samples||[],r=new Uint8Array(4+n.length);for(i=0;i<n.length;i++)e=n[i].flags,r[i+4]=e.dependsOn<<4|e.isDependedOn<<2|e.hasRedundancy;return hs(xs.sdtp,r)},As=function(t){return hs(xs.stbl,Ls(t),hs(xs.stts,Ws),hs(xs.stsc,qs),hs(xs.stsz,zs),hs(xs.stco,Hs))},Ls=function(t){return hs(xs.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),"video"===t.type?Gs(t):Xs(t))},Gs=function(t){var e,i=t.sps||[],n=t.pps||[],r=[],a=[];for(e=0;e<i.length;e++)r.push((65280&i[e].byteLength)>>>8),r.push(255&i[e].byteLength),r=r.concat(Array.prototype.slice.call(i[e]));for(e=0;e<n.length;e++)a.push((65280&n[e].byteLength)>>>8),a.push(255&n[e].byteLength),a=a.concat(Array.prototype.slice.call(n[e]));return hs(xs.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&t.width)>>8,255&t.width,(65280&t.height)>>8,255&t.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),hs(xs.avcC,new Uint8Array([1,t.profileIdc,t.profileCompatibility,t.levelIdc,255].concat([i.length]).concat(r).concat([n.length]).concat(a))),hs(xs.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])))},Xs=function(t){return hs(xs.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&t.channelcount)>>8,255&t.channelcount,(65280&t.samplesize)>>8,255&t.samplesize,0,0,0,0,(65280&t.samplerate)>>8,255&t.samplerate,0,0]),ps(t))},Ss=function(t){var e=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,0,(4278190080&t.duration)>>24,(16711680&t.duration)>>16,(65280&t.duration)>>8,255&t.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&t.width)>>8,255&t.width,0,0,(65280&t.height)>>8,255&t.height,0,0]);return hs(xs.tkhd,e)},Os=function(t){var e,i,n,r,a,s;return e=hs(xs.tfhd,new Uint8Array([0,0,0,58,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),a=Math.floor(t.baseMediaDecodeTime/(Js+1)),s=Math.floor(t.baseMediaDecodeTime%(Js+1)),i=hs(xs.tfdt,new Uint8Array([1,0,0,0,a>>>24&255,a>>>16&255,a>>>8&255,255&a,s>>>24&255,s>>>16&255,s>>>8&255,255&s])),92,"audio"===t.type?(n=Us(t,92),hs(xs.traf,e,i,n)):(r=Es(t),n=Us(t,r.length+92),hs(xs.traf,e,i,n,r))},Ts=function(t){return t.duration=t.duration||4294967295,hs(xs.trak,Ss(t),ks(t))},Ps=function(t){var e=new Uint8Array([0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return"video"!==t.type&&(e[e.length-1]=0),hs(xs.trex,e)},Ks=function(t,e){var i=0,n=0,r=0,a=0;return t.length&&(void 0!==t[0].duration&&(i=1),void 0!==t[0].size&&(n=2),void 0!==t[0].flags&&(r=4),void 0!==t[0].compositionTimeOffset&&(a=8)),[0,0,i|n|r|a,1,(4278190080&t.length)>>>24,(16711680&t.length)>>>16,(65280&t.length)>>>8,255&t.length,(4278190080&e)>>>24,(16711680&e)>>>16,(65280&e)>>>8,255&e]},$s=function(t,e){var i,n,r,a;for(e+=20+16*(n=t.samples||[]).length,i=Ks(n,e),a=0;a<n.length;a++)r=n[a],i=i.concat([(4278190080&r.duration)>>>24,(16711680&r.duration)>>>16,(65280&r.duration)>>>8,255&r.duration,(4278190080&r.size)>>>24,(16711680&r.size)>>>16,(65280&r.size)>>>8,255&r.size,r.flags.isLeading<<2|r.flags.dependsOn,r.flags.isDependedOn<<6|r.flags.hasRedundancy<<4|r.flags.paddingValue<<1|r.flags.isNonSyncSample,61440&r.flags.degradationPriority,15&r.flags.degradationPriority,(4278190080&r.compositionTimeOffset)>>>24,(16711680&r.compositionTimeOffset)>>>16,(65280&r.compositionTimeOffset)>>>8,255&r.compositionTimeOffset]);return hs(xs.trun,new Uint8Array(i))},Ys=function(t,e){var i,n,r,a;for(e+=20+8*(n=t.samples||[]).length,i=Ks(n,e),a=0;a<n.length;a++)r=n[a],i=i.concat([(4278190080&r.duration)>>>24,(16711680&r.duration)>>>16,(65280&r.duration)>>>8,255&r.duration,(4278190080&r.size)>>>24,(16711680&r.size)>>>16,(65280&r.size)>>>8,255&r.size]);return hs(xs.trun,new Uint8Array(i))},Us=function(t,e){return"audio"===t.type?Ys(t,e):$s(t,e)};var Zs={ftyp:fs=function(){return hs(xs.ftyp,Is,Ds,Is,Rs)},mdat:function(t){return hs(xs.mdat,t)},moof:ys,moov:vs,initSegment:function(t){var e,i=fs(),n=vs(t);return(e=new Uint8Array(i.byteLength+n.byteLength)).set(i),e.set(n,i.byteLength),e}},to=function(){this.init=function(){var a={};this.on=function(t,e){a[t]||(a[t]=[]),a[t]=a[t].concat(e)},this.off=function(t,e){var i;return!!a[t]&&(i=a[t].indexOf(e),a[t]=a[t].slice(),a[t].splice(i,1),-1<i)},this.trigger=function(t){var e,i,n,r;if(e=a[t])if(2===arguments.length)for(n=e.length,i=0;i<n;++i)e[i].call(this,arguments[1]);else{for(r=[],i=arguments.length,i=1;i<arguments.length;++i)r.push(arguments[i]);for(n=e.length,i=0;i<n;++i)e[i].apply(this,r)}},this.dispose=function(){a={}}}};to.prototype.pipe=function(e){return this.on("data",function(t){e.push(t)}),this.on("done",function(t){e.flush(t)}),e},to.prototype.push=function(t){this.trigger("data",t)},to.prototype.flush=function(t){this.trigger("done",t)};var eo=to,io=function(t){var e,i,n=[],r=[];for(e=n.byteLength=0;e<t.length;e++)"access_unit_delimiter_rbsp"===(i=t[e]).nalUnitType?(n.length&&(n.duration=i.dts-n.dts,r.push(n)),(n=[i]).byteLength=i.data.byteLength,n.pts=i.pts,n.dts=i.dts):("slice_layer_without_partitioning_rbsp_idr"===i.nalUnitType&&(n.keyFrame=!0),n.duration=i.dts-n.dts,n.byteLength+=i.data.byteLength,n.push(i));return r.length&&(!n.duration||n.duration<=0)&&(n.duration=r[r.length-1].duration),r.push(n),r},no=function(t){var e,i,n=[],r=[];for(n.byteLength=0,n.nalCount=0,n.duration=0,n.pts=t[0].pts,n.dts=t[0].dts,r.byteLength=0,r.nalCount=0,r.duration=0,r.pts=t[0].pts,r.dts=t[0].dts,e=0;e<t.length;e++)(i=t[e]).keyFrame?(n.length&&(r.push(n),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration),(n=[i]).nalCount=i.length,n.byteLength=i.byteLength,n.pts=i.pts,n.dts=i.dts,n.duration=i.duration):(n.duration+=i.duration,n.nalCount+=i.length,n.byteLength+=i.byteLength,n.push(i));return r.length&&n.duration<=0&&(n.duration=r[r.length-1].duration),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration,r.push(n),r},ro=function(t){var e;return!t[0][0].keyFrame&&1<t.length&&(e=t.shift(),t.byteLength-=e.byteLength,t.nalCount-=e.nalCount,t[0][0].dts=e.dts,t[0][0].pts=e.pts,t[0][0].duration+=e.duration),t},ao=function(t,e){var i,n,r,a,s,o,u,l=e||0,c=[];for(i=0;i<t.length;i++)for(a=t[i],n=0;n<a.length;n++)s=a[n],o=s,u=void 0,(u={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}).dataOffset=l,u.compositionTimeOffset=o.pts-o.dts,u.duration=o.duration,u.size=4*o.length,u.size+=o.byteLength,o.keyFrame&&(u.flags.dependsOn=2,u.flags.isNonSyncSample=0),l+=(r=u).size,c.push(r);return c},so=function(t){var e,i,n,r,a,s,o=0,u=t.byteLength,l=t.nalCount,c=new Uint8Array(u+4*l),h=new DataView(c.buffer);for(e=0;e<t.length;e++)for(r=t[e],i=0;i<r.length;i++)for(a=r[i],n=0;n<a.length;n++)s=a[n],h.setUint32(o,s.data.byteLength),o+=4,c.set(s.data,o),o+=s.data.byteLength;return c},oo=function(t){delete t.minSegmentDts,delete t.maxSegmentDts,delete t.minSegmentPts,delete t.maxSegmentPts},uo=function(t,e){var i,n=t.minSegmentDts;return e||(n-=t.timelineStartInfo.dts),i=t.timelineStartInfo.baseMediaDecodeTime,i+=n,i=Math.max(0,i),"audio"===t.type&&(i*=t.samplerate/9e4,i=Math.floor(i)),i},lo=function(t,e){"number"==typeof e.pts&&(void 0===t.timelineStartInfo.pts&&(t.timelineStartInfo.pts=e.pts),void 0===t.minSegmentPts?t.minSegmentPts=e.pts:t.minSegmentPts=Math.min(t.minSegmentPts,e.pts),void 0===t.maxSegmentPts?t.maxSegmentPts=e.pts:t.maxSegmentPts=Math.max(t.maxSegmentPts,e.pts)),"number"==typeof e.dts&&(void 0===t.timelineStartInfo.dts&&(t.timelineStartInfo.dts=e.dts),void 0===t.minSegmentDts?t.minSegmentDts=e.dts:t.minSegmentDts=Math.min(t.minSegmentDts,e.dts),void 0===t.maxSegmentDts?t.maxSegmentDts=e.dts:t.maxSegmentDts=Math.max(t.maxSegmentDts,e.dts))},co=function(t){for(var e=0,i={payloadType:-1,payloadSize:0},n=0,r=0;e<t.byteLength&&128!==t[e];){for(;255===t[e];)n+=255,e++;for(n+=t[e++];255===t[e];)r+=255,e++;if(r+=t[e++],!i.payload&&4===n){i.payloadType=n,i.payloadSize=r,i.payload=t.subarray(e,e+r);break}e+=r,r=n=0}return i},ho=function(t){return 181!==t.payload[0]?null:49!=(t.payload[1]<<8|t.payload[2])?null:"GA94"!==String.fromCharCode(t.payload[3],t.payload[4],t.payload[5],t.payload[6])?null:3!==t.payload[7]?null:t.payload.subarray(8,t.payload.length-1)},po=function(t,e){var i,n,r,a,s=[];if(!(64&e[0]))return s;for(n=31&e[0],i=0;i<n;i++)a={type:3&e[2+(r=3*i)],pts:t},4&e[r+2]&&(a.ccData=e[r+3]<<8|e[r+4],s.push(a));return s},fo=function(t){for(var e,i,n=t.byteLength,r=[],a=1;a<n-2;)0===t[a]&&0===t[a+1]&&3===t[a+2]?(r.push(a+2),a+=2):a++;if(0===r.length)return t;e=n-r.length,i=new Uint8Array(e);var s=0;for(a=0;a<e;s++,a++)s===r[0]&&(s++,r.shift()),i[a]=t[s];return i},mo=4,go=function t(){t.prototype.init.call(this),this.captionPackets_=[],this.ccStreams_=[new To(0,0),new To(0,1),new To(1,0),new To(1,1)],this.reset(),this.ccStreams_.forEach(function(t){t.on("data",this.trigger.bind(this,"data")),t.on("done",this.trigger.bind(this,"done"))},this)};(go.prototype=new eo).push=function(t){var e,i,n;if("sei_rbsp"===t.nalUnitType&&(e=co(t.escapedRBSP)).payloadType===mo&&(i=ho(e)))if(t.dts<this.latestDts_)this.ignoreNextEqualDts_=!0;else{if(t.dts===this.latestDts_&&this.ignoreNextEqualDts_)return this.numSameDts_--,void(this.numSameDts_||(this.ignoreNextEqualDts_=!1));n=po(t.pts,i),this.captionPackets_=this.captionPackets_.concat(n),this.latestDts_!==t.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=t.dts}},go.prototype.flush=function(){this.captionPackets_.length?(this.captionPackets_.forEach(function(t,e){t.presortIndex=e}),this.captionPackets_.sort(function(t,e){return t.pts===e.pts?t.presortIndex-e.presortIndex:t.pts-e.pts}),this.captionPackets_.forEach(function(t){t.type<2&&this.dispatchCea608Packet(t)},this),this.captionPackets_.length=0,this.ccStreams_.forEach(function(t){t.flush()},this)):this.ccStreams_.forEach(function(t){t.flush()},this)},go.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(t){t.reset()})},go.prototype.dispatchCea608Packet=function(t){this.setsChannel1Active(t)?this.activeCea608Channel_[t.type]=0:this.setsChannel2Active(t)&&(this.activeCea608Channel_[t.type]=1),null!==this.activeCea608Channel_[t.type]&&this.ccStreams_[(t.type<<1)+this.activeCea608Channel_[t.type]].push(t)},go.prototype.setsChannel1Active=function(t){return 4096==(30720&t.ccData)},go.prototype.setsChannel2Active=function(t){return 6144==(30720&t.ccData)};var yo={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},vo=function(t){return null===t?"":(t=yo[t]||t,String.fromCharCode(t))},_o=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],bo=function(){for(var t=[],e=15;e--;)t.push("");return t},To=function t(e,i){t.prototype.init.call(this),this.field_=e||0,this.dataChannel_=i||0,this.name_="CC"+(1+(this.field_<<1|this.dataChannel_)),this.setConstants(),this.reset(),this.push=function(t){var e,i,n,r,a;if((e=32639&t.ccData)!==this.lastControlCode_){if(4096==(61440&e)?this.lastControlCode_=e:e!==this.PADDING_&&(this.lastControlCode_=null),n=e>>>8,r=255&e,e!==this.PADDING_)if(e===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(e===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(t.pts),this.flushDisplayed(t.pts),i=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=i,this.startPts_=t.pts;else if(e===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(t.pts);else if(e===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(t.pts);else if(e===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(t.pts);else if(e===this.CARRIAGE_RETURN_)this.clearFormatting(t.pts),this.flushDisplayed(t.pts),this.shiftRowsUp_(),this.startPts_=t.pts;else if(e===this.BACKSPACE_)"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1);else if(e===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(t.pts),this.displayed_=bo();else if(e===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=bo();else if(e===this.RESUME_DIRECT_CAPTIONING_)"paintOn"!==this.mode_&&(this.flushDisplayed(t.pts),this.displayed_=bo()),this.mode_="paintOn",this.startPts_=t.pts;else if(this.isSpecialCharacter(n,r))a=vo((n=(3&n)<<8)|r),this[this.mode_](t.pts,a),this.column_++;else if(this.isExtCharacter(n,r))"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1),a=vo((n=(3&n)<<8)|r),this[this.mode_](t.pts,a),this.column_++;else if(this.isMidRowCode(n,r))this.clearFormatting(t.pts),this[this.mode_](t.pts," "),this.column_++,14==(14&r)&&this.addFormatting(t.pts,["i"]),1==(1&r)&&this.addFormatting(t.pts,["u"]);else if(this.isOffsetControlCode(n,r))this.column_+=3&r;else if(this.isPAC(n,r)){var s=_o.indexOf(7968&e);"rollUp"===this.mode_&&this.setRollUp(t.pts,s),s!==this.row_&&(this.clearFormatting(t.pts),this.row_=s),1&r&&-1===this.formatting_.indexOf("u")&&this.addFormatting(t.pts,["u"]),16==(16&e)&&(this.column_=4*((14&e)>>1)),this.isColorPAC(r)&&14==(14&r)&&this.addFormatting(t.pts,["i"])}else this.isNormalChar(n)&&(0===r&&(r=null),a=vo(n),a+=vo(r),this[this.mode_](t.pts,a),this.column_+=a.length)}else this.lastControlCode_=null}};To.prototype=new eo,To.prototype.flushDisplayed=function(t){var e=this.displayed_.map(function(t){return t.trim()}).join("\n").replace(/^\n+|\n+$/g,"");e.length&&this.trigger("data",{startPts:this.startPts_,endPts:t,text:e,stream:this.name_})},To.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=bo(),this.nonDisplayed_=bo(),this.lastControlCode_=null,this.column_=0,this.row_=14,this.rollUpRows_=2,this.formatting_=[]},To.prototype.setConstants=function(){0===this.dataChannel_?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):1===this.dataChannel_&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=32|this.CONTROL_,this.END_OF_CAPTION_=47|this.CONTROL_,this.ROLL_UP_2_ROWS_=37|this.CONTROL_,this.ROLL_UP_3_ROWS_=38|this.CONTROL_,this.ROLL_UP_4_ROWS_=39|this.CONTROL_,this.CARRIAGE_RETURN_=45|this.CONTROL_,this.RESUME_DIRECT_CAPTIONING_=41|this.CONTROL_,this.BACKSPACE_=33|this.CONTROL_,this.ERASE_DISPLAYED_MEMORY_=44|this.CONTROL_,this.ERASE_NON_DISPLAYED_MEMORY_=46|this.CONTROL_},To.prototype.isSpecialCharacter=function(t,e){return t===this.EXT_&&48<=e&&e<=63},To.prototype.isExtCharacter=function(t,e){return(t===this.EXT_+1||t===this.EXT_+2)&&32<=e&&e<=63},To.prototype.isMidRowCode=function(t,e){return t===this.EXT_&&32<=e&&e<=47},To.prototype.isOffsetControlCode=function(t,e){return t===this.OFFSET_&&33<=e&&e<=35},To.prototype.isPAC=function(t,e){return t>=this.BASE_&&t<this.BASE_+8&&64<=e&&e<=127},To.prototype.isColorPAC=function(t){return 64<=t&&t<=79||96<=t&&t<=127},To.prototype.isNormalChar=function(t){return 32<=t&&t<=127},To.prototype.setRollUp=function(t,e){if("rollUp"!==this.mode_&&(this.row_=14,this.mode_="rollUp",this.flushDisplayed(t),this.nonDisplayed_=bo(),this.displayed_=bo()),void 0!==e&&e!==this.row_)for(var i=0;i<this.rollUpRows_;i++)this.displayed_[e-i]=this.displayed_[this.row_-i],this.displayed_[this.row_-i]="";void 0===e&&(e=this.row_),this.topRow_=e-this.rollUpRows_+1},To.prototype.addFormatting=function(t,e){this.formatting_=this.formatting_.concat(e);var i=e.reduce(function(t,e){return t+"<"+e+">"},"");this[this.mode_](t,i)},To.prototype.clearFormatting=function(t){if(this.formatting_.length){var e=this.formatting_.reverse().reduce(function(t,e){return t+"</"+e+">"},"");this.formatting_=[],this[this.mode_](t,e)}},To.prototype.popOn=function(t,e){var i=this.nonDisplayed_[this.row_];i+=e,this.nonDisplayed_[this.row_]=i},To.prototype.rollUp=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i},To.prototype.shiftRowsUp_=function(){var t;for(t=0;t<this.topRow_;t++)this.displayed_[t]="";for(t=this.row_+1;t<15;t++)this.displayed_[t]="";for(t=this.topRow_;t<this.row_;t++)this.displayed_[t]=this.displayed_[t+1];this.displayed_[this.row_]=""},To.prototype.paintOn=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i};var So={CaptionStream:go,Cea608Stream:To},ko={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},wo=function(t,e){var i=1;for(e<t&&(i=-1);4294967296<Math.abs(e-t);)t+=8589934592*i;return t},Co=function t(e){var i,n;t.prototype.init.call(this),this.type_=e,this.push=function(t){t.type===this.type_&&(void 0===n&&(n=t.dts),t.dts=wo(t.dts,n),t.pts=wo(t.pts,n),i=t.dts,this.trigger("data",t))},this.flush=function(){n=i,this.trigger("done")},this.discontinuity=function(){i=n=void 0}};Co.prototype=new eo;var Eo,Ao=Co,Lo=wo,Oo=function(t,e,i){var n,r="";for(n=e;n<i;n++)r+="%"+("00"+t[n].toString(16)).slice(-2);return r},Po=function(t,e,i){return decodeURIComponent(Oo(t,e,i))},Uo=function(t){return t[0]<<21|t[1]<<14|t[2]<<7|t[3]},xo={TXXX:function(t){var e;if(3===t.data[0]){for(e=1;e<t.data.length;e++)if(0===t.data[e]){t.description=Po(t.data,1,e),t.value=Po(t.data,e+1,t.data.length).replace(/\0*$/,"");break}t.data=t.value}},WXXX:function(t){var e;if(3===t.data[0])for(e=1;e<t.data.length;e++)if(0===t.data[e]){t.description=Po(t.data,1,e),t.url=Po(t.data,e+1,t.data.length);break}},PRIV:function(t){var e,i;for(e=0;e<t.data.length;e++)if(0===t.data[e]){t.owner=(i=t.data,unescape(Oo(i,0,e)));break}t.privateData=t.data.subarray(e+1),t.data=t.privateData}};(Eo=function(t){var e,u={debug:!(!t||!t.debug),descriptor:t&&t.descriptor},l=0,c=[],h=0;if(Eo.prototype.init.call(this),this.dispatchType=ko.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(e=0;e<u.descriptor.length;e++)this.dispatchType+=("00"+u.descriptor[e].toString(16)).slice(-2);this.push=function(t){var e,i,n,r,a;if("timed-metadata"===t.type)if(t.dataAlignmentIndicator&&(h=0,c.length=0),0===c.length&&(t.data.length<10||t.data[0]!=="I".charCodeAt(0)||t.data[1]!=="D".charCodeAt(0)||t.data[2]!=="3".charCodeAt(0)))u.debug;else if(c.push(t),h+=t.data.byteLength,1===c.length&&(l=Uo(t.data.subarray(6,10)),l+=10),!(h<l)){for(e={data:new Uint8Array(l),frames:[],pts:c[0].pts,dts:c[0].dts},a=0;a<l;)e.data.set(c[0].data.subarray(0,l-a),a),a+=c[0].data.byteLength,h-=c[0].data.byteLength,c.shift();i=10,64&e.data[5]&&(i+=4,i+=Uo(e.data.subarray(10,14)),l-=Uo(e.data.subarray(16,20)));do{if((n=Uo(e.data.subarray(i+4,i+8)))<1)return;if((r={id:String.fromCharCode(e.data[i],e.data[i+1],e.data[i+2],e.data[i+3]),data:e.data.subarray(i+10,i+n+10)}).key=r.id,xo[r.id]&&(xo[r.id](r),"com.apple.streaming.transportStreamTimestamp"===r.owner)){var s=r.data,o=(1&s[3])<<30|s[4]<<22|s[5]<<14|s[6]<<6|s[7]>>>2;o*=4,o+=3&s[7],r.timeStamp=o,void 0===e.pts&&void 0===e.dts&&(e.pts=r.timeStamp,e.dts=r.timeStamp),this.trigger("timestamp",r)}e.frames.push(r),i+=10,i+=n}while(i<l);this.trigger("data",e)}}}).prototype=new eo;var Io,Do,Ro,Mo=Eo,Bo=Ao;(Io=function(){var r=new Uint8Array(188),a=0;Io.prototype.init.call(this),this.push=function(t){var e,i=0,n=188;for(a?((e=new Uint8Array(t.byteLength+a)).set(r.subarray(0,a)),e.set(t,a),a=0):e=t;n<e.byteLength;)71!==e[i]||71!==e[n]?(i++,n++):(this.trigger("data",e.subarray(i,n)),i+=188,n+=188);i<e.byteLength&&(r.set(e.subarray(i),0),a=e.byteLength-i)},this.flush=function(){188===a&&71===r[0]&&(this.trigger("data",r),a=0),this.trigger("done")}}).prototype=new eo,(Do=function(){var n,r,a,s;Do.prototype.init.call(this),(s=this).packetsWaitingForPmt=[],this.programMapTable=void 0,n=function(t,e){var i=0;e.payloadUnitStartIndicator&&(i+=t[i]+1),"pat"===e.type?r(t.subarray(i),e):a(t.subarray(i),e)},r=function(t,e){e.section_number=t[7],e.last_section_number=t[8],s.pmtPid=(31&t[10])<<8|t[11],e.pmtPid=s.pmtPid},a=function(t,e){var i,n;if(1&t[5]){for(s.programMapTable={video:null,audio:null,"timed-metadata":{}},i=3+((15&t[1])<<8|t[2])-4,n=12+((15&t[10])<<8|t[11]);n<i;){var r=t[n],a=(31&t[n+1])<<8|t[n+2];r===ko.H264_STREAM_TYPE&&null===s.programMapTable.video?s.programMapTable.video=a:r===ko.ADTS_STREAM_TYPE&&null===s.programMapTable.audio?s.programMapTable.audio=a:r===ko.METADATA_STREAM_TYPE&&(s.programMapTable["timed-metadata"][a]=r),n+=5+((15&t[n+3])<<8|t[n+4])}e.programMapTable=s.programMapTable}},this.push=function(t){var e={},i=4;if(e.payloadUnitStartIndicator=!!(64&t[1]),e.pid=31&t[1],e.pid<<=8,e.pid|=t[2],1<(48&t[3])>>>4&&(i+=t[i]+1),0===e.pid)e.type="pat",n(t.subarray(i),e),this.trigger("data",e);else if(e.pid===this.pmtPid)for(e.type="pmt",n(t.subarray(i),e),this.trigger("data",e);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else void 0===this.programMapTable?this.packetsWaitingForPmt.push([t,i,e]):this.processPes_(t,i,e)},this.processPes_=function(t,e,i){i.pid===this.programMapTable.video?i.streamType=ko.H264_STREAM_TYPE:i.pid===this.programMapTable.audio?i.streamType=ko.ADTS_STREAM_TYPE:i.streamType=this.programMapTable["timed-metadata"][i.pid],i.type="pes",i.data=t.subarray(e),this.trigger("data",i)}}).prototype=new eo,Do.STREAM_TYPES={h264:27,adts:15},(Ro=function(){var d=this,n={data:[],size:0},r={data:[],size:0},a={data:[],size:0},s=function(t,e,i){var n,r,a=new Uint8Array(t.size),s={type:e},o=0,u=0;if(t.data.length&&!(t.size<9)){for(s.trackId=t.data[0].pid,o=0;o<t.data.length;o++)r=t.data[o],a.set(r.data,u),u+=r.data.byteLength;var l,c,h;l=a,(c=s).packetLength=6+(l[4]<<8|l[5]),c.dataAlignmentIndicator=0!=(4&l[6]),192&(h=l[7])&&(c.pts=(14&l[9])<<27|(255&l[10])<<20|(254&l[11])<<12|(255&l[12])<<5|(254&l[13])>>>3,c.pts*=4,c.pts+=(6&l[13])>>>1,c.dts=c.pts,64&h&&(c.dts=(14&l[14])<<27|(255&l[15])<<20|(254&l[16])<<12|(255&l[17])<<5|(254&l[18])>>>3,c.dts*=4,c.dts+=(6&l[18])>>>1)),c.data=l.subarray(9+l[8]),n="video"===e||s.packetLength<=t.size,(i||n)&&(t.size=0,t.data.length=0),n&&d.trigger("data",s)}};Ro.prototype.init.call(this),this.push=function(i){({pat:function(){},pes:function(){var t,e;switch(i.streamType){case ko.H264_STREAM_TYPE:case ko.H264_STREAM_TYPE:t=n,e="video";break;case ko.ADTS_STREAM_TYPE:t=r,e="audio";break;case ko.METADATA_STREAM_TYPE:t=a,e="timed-metadata";break;default:return}i.payloadUnitStartIndicator&&s(t,e,!0),t.data.push(i),t.size+=i.data.byteLength},pmt:function(){var t={type:"metadata",tracks:[]},e=i.programMapTable;null!==e.video&&t.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.video,codec:"avc",type:"video"}),null!==e.audio&&t.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.audio,codec:"adts",type:"audio"}),d.trigger("data",t)}})[i.type]()},this.flush=function(){s(n,"video"),s(r,"audio"),s(a,"timed-metadata"),this.trigger("done")}}).prototype=new eo;var No={PAT_PID:0,MP2T_PACKET_LENGTH:188,TransportPacketStream:Io,TransportParseStream:Do,ElementaryStream:Ro,TimestampRolloverStream:Bo,CaptionStream:So.CaptionStream,Cea608Stream:So.Cea608Stream,MetadataStream:Mo};for(var jo in ko)ko.hasOwnProperty(jo)&&(No[jo]=ko[jo]);var Fo,Vo=No,Ho=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];(Fo=function(){var l;Fo.prototype.init.call(this),this.push=function(t){var e,i,n,r,a,s,o=0,u=0;if("audio"===t.type)for(l?(r=l,(l=new Uint8Array(r.byteLength+t.data.byteLength)).set(r),l.set(t.data,r.byteLength)):l=t.data;o+5<l.length;)if(255===l[o]&&240==(246&l[o+1])){if(i=2*(1&~l[o+1]),e=(3&l[o+3])<<11|l[o+4]<<3|(224&l[o+5])>>5,s=9e4*(a=1024*(1+(3&l[o+6])))/Ho[(60&l[o+2])>>>2],n=o+e,l.byteLength<n)return;if(this.trigger("data",{pts:t.pts+u*s,dts:t.dts+u*s,sampleCount:a,audioobjecttype:1+(l[o+2]>>>6&3),channelcount:(1&l[o+2])<<2|(192&l[o+3])>>>6,samplerate:Ho[(60&l[o+2])>>>2],samplingfrequencyindex:(60&l[o+2])>>>2,samplesize:16,data:l.subarray(o+7+i,n)}),l.byteLength===n)return void(l=void 0);u++,l=l.subarray(n)}else o++},this.flush=function(){this.trigger("done")}}).prototype=new eo;var qo,zo,Wo,Go=Fo,Xo=function(n){var r=n.byteLength,a=0,s=0;this.length=function(){return 8*r},this.bitsAvailable=function(){return 8*r+s},this.loadWord=function(){var t=n.byteLength-r,e=new Uint8Array(4),i=Math.min(4,r);if(0===i)throw new Error("no bytes available");e.set(n.subarray(t,t+i)),a=new DataView(e.buffer).getUint32(0),s=8*i,r-=i},this.skipBits=function(t){var e;t<s||(t-=s,t-=8*(e=Math.floor(t/8)),r-=e,this.loadWord()),a<<=t,s-=t},this.readBits=function(t){var e=Math.min(s,t),i=a>>>32-e;return 0<(s-=e)?a<<=e:0<r&&this.loadWord(),0<(e=t-e)?i<<e|this.readBits(e):i},this.skipLeadingZeros=function(){var t;for(t=0;t<s;++t)if(0!=(a&2147483648>>>t))return a<<=t,s-=t,t;return this.loadWord(),t+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var t=this.skipLeadingZeros();return this.readBits(t+1)-1},this.readExpGolomb=function(){var t=this.readUnsignedExpGolomb();return 1&t?1+t>>>1:-1*(t>>>1)},this.readBoolean=function(){return 1===this.readBits(1)},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};(zo=function(){var i,n,r=0;zo.prototype.init.call(this),this.push=function(t){var e;for(n=n?((e=new Uint8Array(n.byteLength+t.data.byteLength)).set(n),e.set(t.data,n.byteLength),e):t.data;r<n.byteLength-3;r++)if(1===n[r+2]){i=r+5;break}for(;i<n.byteLength;)switch(n[i]){case 0:if(0!==n[i-1]){i+=2;break}if(0!==n[i-2]){i++;break}for(r+3!==i-2&&this.trigger("data",n.subarray(r+3,i-2));1!==n[++i]&&i<n.length;);r=i-2,i+=3;break;case 1:if(0!==n[i-1]||0!==n[i-2]){i+=3;break}this.trigger("data",n.subarray(r+3,i-2)),r=i-2,i+=3;break;default:i+=3}n=n.subarray(r),i-=r,r=0},this.flush=function(){n&&3<n.byteLength&&this.trigger("data",n.subarray(r+3)),n=null,r=0,this.trigger("done")}}).prototype=new eo,Wo={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},(qo=function(){var i,n,r,a,s,o,_,e=new zo;qo.prototype.init.call(this),(i=this).push=function(t){"video"===t.type&&(n=t.trackId,r=t.pts,a=t.dts,e.push(t))},e.on("data",function(t){var e={trackId:n,pts:r,dts:a,data:t};switch(31&t[0]){case 5:e.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:e.nalUnitType="sei_rbsp",e.escapedRBSP=s(t.subarray(1));break;case 7:e.nalUnitType="seq_parameter_set_rbsp",e.escapedRBSP=s(t.subarray(1)),e.config=o(e.escapedRBSP);break;case 8:e.nalUnitType="pic_parameter_set_rbsp";break;case 9:e.nalUnitType="access_unit_delimiter_rbsp"}i.trigger("data",e)}),e.on("done",function(){i.trigger("done")}),this.flush=function(){e.flush()},_=function(t,e){var i,n=8,r=8;for(i=0;i<t;i++)0!==r&&(r=(n+e.readExpGolomb()+256)%256),n=0===r?n:r},s=function(t){for(var e,i,n=t.byteLength,r=[],a=1;a<n-2;)0===t[a]&&0===t[a+1]&&3===t[a+2]?(r.push(a+2),a+=2):a++;if(0===r.length)return t;e=n-r.length,i=new Uint8Array(e);var s=0;for(a=0;a<e;s++,a++)s===r[0]&&(s++,r.shift()),i[a]=t[s];return i},o=function(t){var e,i,n,r,a,s,o,u,l,c,h,d,p,f=0,m=0,g=0,y=0,v=1;if(i=(e=new Xo(t)).readUnsignedByte(),r=e.readUnsignedByte(),n=e.readUnsignedByte(),e.skipUnsignedExpGolomb(),Wo[i]&&(3===(a=e.readUnsignedExpGolomb())&&e.skipBits(1),e.skipUnsignedExpGolomb(),e.skipUnsignedExpGolomb(),e.skipBits(1),e.readBoolean()))for(h=3!==a?8:12,p=0;p<h;p++)e.readBoolean()&&_(p<6?16:64,e);if(e.skipUnsignedExpGolomb(),0===(s=e.readUnsignedExpGolomb()))e.readUnsignedExpGolomb();else if(1===s)for(e.skipBits(1),e.skipExpGolomb(),e.skipExpGolomb(),o=e.readUnsignedExpGolomb(),p=0;p<o;p++)e.skipExpGolomb();if(e.skipUnsignedExpGolomb(),e.skipBits(1),u=e.readUnsignedExpGolomb(),l=e.readUnsignedExpGolomb(),0===(c=e.readBits(1))&&e.skipBits(1),e.skipBits(1),e.readBoolean()&&(f=e.readUnsignedExpGolomb(),m=e.readUnsignedExpGolomb(),g=e.readUnsignedExpGolomb(),y=e.readUnsignedExpGolomb()),e.readBoolean()&&e.readBoolean()){switch(e.readUnsignedByte()){case 1:d=[1,1];break;case 2:d=[12,11];break;case 3:d=[10,11];break;case 4:d=[16,11];break;case 5:d=[40,33];break;case 6:d=[24,11];break;case 7:d=[20,11];break;case 8:d=[32,11];break;case 9:d=[80,33];break;case 10:d=[18,11];break;case 11:d=[15,11];break;case 12:d=[64,33];break;case 13:d=[160,99];break;case 14:d=[4,3];break;case 15:d=[3,2];break;case 16:d=[2,1];break;case 255:d=[e.readUnsignedByte()<<8|e.readUnsignedByte(),e.readUnsignedByte()<<8|e.readUnsignedByte()]}d&&(v=d[0]/d[1])}return{profileIdc:i,levelIdc:n,profileCompatibility:r,width:Math.ceil((16*(u+1)-2*f-2*m)*v),height:(2-c)*(l+1)*16-2*g-2*y}}}).prototype=new eo;var Yo,$o={H264Stream:qo,NalByteStream:zo};(Yo=function(){var o=new Uint8Array,u=0;Yo.prototype.init.call(this),this.setTimestamp=function(t){u=t},this.parseId3TagSize=function(t,e){var i=t[e+6]<<21|t[e+7]<<14|t[e+8]<<7|t[e+9];return(16&t[e+5])>>4?i+20:i+10},this.parseAdtsSize=function(t,e){var i=(224&t[e+5])>>5,n=t[e+4]<<3;return 6144&t[e+3]|n|i},this.push=function(t){var e,i,n,r,a=0,s=0;for(o.length?(r=o.length,(o=new Uint8Array(t.byteLength+r)).set(o.subarray(0,r)),o.set(t,r)):o=t;3<=o.length-s;)if(o[s]!=="I".charCodeAt(0)||o[s+1]!=="D".charCodeAt(0)||o[s+2]!=="3".charCodeAt(0))if(!0&o[s]&&240==(240&o[s+1])){if(o.length-s<7)break;if((a=this.parseAdtsSize(o,s))>o.length)break;n={type:"audio",data:o.subarray(s,s+a),pts:u,dts:u},this.trigger("data",n),s+=a}else s++;else{if(o.length-s<10)break;if((a=this.parseId3TagSize(o,s))>o.length)break;i={type:"timed-metadata",data:o.subarray(s,s+a)},this.trigger("data",i),s+=a}e=o.length-s,o=0<e?o.subarray(s):new Uint8Array}}).prototype=new eo;var Ko,Qo,Jo,Zo,tu,eu,iu,nu=Yo,ru=[33,16,5,32,164,27],au=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],su=function(t){for(var e=[];t--;)e.push(0);return e},ou={96e3:[ru,[227,64],su(154),[56]],88200:[ru,[231],su(170),[56]],64e3:[ru,[248,192],su(240),[56]],48e3:[ru,[255,192],su(268),[55,148,128],su(54),[112]],44100:[ru,[255,192],su(268),[55,163,128],su(84),[112]],32e3:[ru,[255,192],su(268),[55,234],su(226),[112]],24e3:[ru,[255,192],su(268),[55,255,128],su(268),[111,112],su(126),[224]],16e3:[ru,[255,192],su(268),[55,255,128],su(268),[111,255],su(269),[223,108],su(195),[1,192]],12e3:[au,su(268),[3,127,248],su(268),[6,255,240],su(268),[13,255,224],su(268),[27,253,128],su(259),[56]],11025:[au,su(268),[3,127,248],su(268),[6,255,240],su(268),[13,255,224],su(268),[27,255,192],su(268),[55,175,128],su(108),[112]],8e3:[au,su(268),[3,121,16],su(47),[7]]},uu=(Ko=ou,Object.keys(Ko).reduce(function(t,e){return t[e]=new Uint8Array(Ko[e].reduce(function(t,e){return t.concat(e)},[])),t},{}));eu=function(t,e){return Qo(tu(t,e))},iu=function(t,e){return Jo(Zo(t),e)};Qo=function(t){return 9e4*t},Jo=function(t,e){return t*e},Zo=function(t){return t/9e4},tu=function(t,e){return t/e};var lu,cu,hu,du,pu,fu,mu,gu=eu,yu=iu,vu=$o.H264Stream,_u=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],bu=["width","height","profileIdc","levelIdc","profileCompatibility"];pu=function(t){return t[0]==="I".charCodeAt(0)&&t[1]==="D".charCodeAt(0)&&t[2]==="3".charCodeAt(0)},fu=function(t,e){var i;if(t.length!==e.length)return!1;for(i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0},mu=function(t){var e,i=0;for(e=0;e<t.length;e++)i+=t[e].data.byteLength;return i},(cu=function(r,a){var s=[],o=0,e=0,l=0,c=1/0;a=a||{},cu.prototype.init.call(this),this.push=function(e){lo(r,e),r&&_u.forEach(function(t){r[t]=e[t]}),s.push(e)},this.setEarliestDts=function(t){e=t-r.timelineStartInfo.baseMediaDecodeTime},this.setVideoBaseMediaDecodeTime=function(t){c=t},this.setAudioAppendStart=function(t){l=t},this.flush=function(){var t,e,i,n;0!==s.length&&(t=this.trimAdtsFramesByEarliestDts_(s),r.baseMediaDecodeTime=uo(r,a.keepOriginalTimestamps),this.prefixWithSilence_(r,t),r.samples=this.generateSampleTable_(t),i=Zs.mdat(this.concatenateFrameData_(t)),s=[],e=Zs.moof(o,[r]),n=new Uint8Array(e.byteLength+i.byteLength),o++,n.set(e),n.set(i,e.byteLength),oo(r),this.trigger("data",{track:r,boxes:n})),this.trigger("done","AudioSegmentStream")},this.prefixWithSilence_=function(t,e){var i,n,r,a,s=0,o=0,u=0;if(e.length&&(i=gu(t.baseMediaDecodeTime,t.samplerate),n=Math.ceil(9e4/(t.samplerate/1024)),l&&c&&(s=i-Math.max(l,c),u=(o=Math.floor(s/n))*n),!(o<1||45e3<u))){for((r=uu[t.samplerate])||(r=e[0].data),a=0;a<o;a++)e.splice(a,0,{data:r});t.baseMediaDecodeTime-=Math.floor(yu(u,t.samplerate))}},this.trimAdtsFramesByEarliestDts_=function(t){return r.minSegmentDts>=e?t:(r.minSegmentDts=1/0,t.filter(function(t){return t.dts>=e&&(r.minSegmentDts=Math.min(r.minSegmentDts,t.dts),r.minSegmentPts=r.minSegmentDts,!0)}))},this.generateSampleTable_=function(t){var e,i,n=[];for(e=0;e<t.length;e++)i=t[e],n.push({size:i.data.byteLength,duration:1024});return n},this.concatenateFrameData_=function(t){var e,i,n=0,r=new Uint8Array(mu(t));for(e=0;e<t.length;e++)i=t[e],r.set(i.data,n),n+=i.data.byteLength;return r}}).prototype=new eo,(lu=function(o,u){var e,i,l=0,c=[],h=[];u=u||{},lu.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(t){lo(o,t),"seq_parameter_set_rbsp"!==t.nalUnitType||e||(e=t.config,o.sps=[t.data],bu.forEach(function(t){o[t]=e[t]},this)),"pic_parameter_set_rbsp"!==t.nalUnitType||i||(i=t.data,o.pps=[t.data]),c.push(t)},this.flush=function(){for(var t,e,i,n,r,a;c.length&&"access_unit_delimiter_rbsp"!==c[0].nalUnitType;)c.shift();if(0===c.length)return this.resetStream_(),void this.trigger("done","VideoSegmentStream");if(t=io(c),(i=no(t))[0][0].keyFrame||((e=this.getGopForFusion_(c[0],o))?(i.unshift(e),i.byteLength+=e.byteLength,i.nalCount+=e.nalCount,i.pts=e.pts,i.dts=e.dts,i.duration+=e.duration):i=ro(i)),h.length){var s;if(!(s=u.alignGopsAtEnd?this.alignGopsAtEnd_(i):this.alignGopsAtStart_(i)))return this.gopCache_.unshift({gop:i.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.resetStream_(),void this.trigger("done","VideoSegmentStream");oo(o),i=s}lo(o,i),o.samples=ao(i),r=Zs.mdat(so(i)),o.baseMediaDecodeTime=uo(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",i.map(function(t){return{pts:t.pts,dts:t.dts,byteLength:t.byteLength}})),this.gopCache_.unshift({gop:i.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),n=Zs.moof(l,[o]),a=new Uint8Array(n.byteLength+r.byteLength),l++,a.set(n),a.set(r,n.byteLength),this.trigger("data",{track:o,boxes:a}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.resetStream_=function(){oo(o),i=e=void 0},this.getGopForFusion_=function(t){var e,i,n,r,a,s=1/0;for(a=0;a<this.gopCache_.length;a++)n=(r=this.gopCache_[a]).gop,o.pps&&fu(o.pps[0],r.pps[0])&&o.sps&&fu(o.sps[0],r.sps[0])&&(n.dts<o.timelineStartInfo.dts||-1e4<=(e=t.dts-n.dts-n.duration)&&e<=45e3&&(!i||e<s)&&(i=r,s=e));return i?i.gop:null},this.alignGopsAtStart_=function(t){var e,i,n,r,a,s,o,u;for(a=t.byteLength,s=t.nalCount,o=t.duration,e=i=0;e<h.length&&i<t.length&&(n=h[e],r=t[i],n.pts!==r.pts);)r.pts>n.pts?e++:(i++,a-=r.byteLength,s-=r.nalCount,o-=r.duration);return 0===i?t:i===t.length?null:((u=t.slice(i)).byteLength=a,u.duration=o,u.nalCount=s,u.pts=u[0].pts,u.dts=u[0].dts,u)},this.alignGopsAtEnd_=function(t){var e,i,n,r,a,s,o;for(e=h.length-1,i=t.length-1,a=null,s=!1;0<=e&&0<=i;){if(n=h[e],r=t[i],n.pts===r.pts){s=!0;break}n.pts>r.pts?e--:(e===h.length-1&&(a=i),i--)}if(!s&&null===a)return null;if(0===(o=s?i:a))return t;var u=t.slice(o),l=u.reduce(function(t,e){return t.byteLength+=e.byteLength,t.duration+=e.duration,t.nalCount+=e.nalCount,t},{byteLength:0,duration:0,nalCount:0});return u.byteLength=l.byteLength,u.duration=l.duration,u.nalCount=l.nalCount,u.pts=u[0].pts,u.dts=u[0].dts,u},this.alignGopsWith=function(t){h=t}}).prototype=new eo,(du=function(t,e){this.numberOfTracks=0,this.metadataStream=e,"undefined"!=typeof t.remux?this.remuxTracks=!!t.remux:this.remuxTracks=!0,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,du.prototype.init.call(this),this.push=function(t){return t.text?this.pendingCaptions.push(t):t.frames?this.pendingMetadata.push(t):(this.pendingTracks.push(t.track),this.pendingBoxes.push(t.boxes),this.pendingBytes+=t.boxes.byteLength,"video"===t.track.type&&(this.videoTrack=t.track),void("audio"===t.track.type&&(this.audioTrack=t.track)))}}).prototype=new eo,du.prototype.flush=function(t){var e,i,n,r,a=0,s={captions:[],captionStreams:{},metadata:[],info:{}},o=0;if(this.pendingTracks.length<this.numberOfTracks){if("VideoSegmentStream"!==t&&"AudioSegmentStream"!==t)return;if(this.remuxTracks)return;if(0===this.pendingTracks.length)return this.emittedTracks++,void(this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0))}for(this.videoTrack?(o=this.videoTrack.timelineStartInfo.pts,bu.forEach(function(t){s.info[t]=this.videoTrack[t]},this)):this.audioTrack&&(o=this.audioTrack.timelineStartInfo.pts,_u.forEach(function(t){s.info[t]=this.audioTrack[t]},this)),1===this.pendingTracks.length?s.type=this.pendingTracks[0].type:s.type="combined",this.emittedTracks+=this.pendingTracks.length,n=Zs.initSegment(this.pendingTracks),s.initSegment=new Uint8Array(n.byteLength),s.initSegment.set(n),s.data=new Uint8Array(this.pendingBytes),r=0;r<this.pendingBoxes.length;r++)s.data.set(this.pendingBoxes[r],a),a+=this.pendingBoxes[r].byteLength;for(r=0;r<this.pendingCaptions.length;r++)(e=this.pendingCaptions[r]).startTime=e.startPts-o,e.startTime/=9e4,e.endTime=e.endPts-o,e.endTime/=9e4,s.captionStreams[e.stream]=!0,s.captions.push(e);for(r=0;r<this.pendingMetadata.length;r++)(i=this.pendingMetadata[r]).cueTime=i.pts-o,i.cueTime/=9e4,s.metadata.push(i);s.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",s),this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},(hu=function(n){var r,a,s=this,i=!0;hu.prototype.init.call(this),n=n||{},this.baseMediaDecodeTime=n.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var e={};(this.transmuxPipeline_=e).type="aac",e.metadataStream=new Vo.MetadataStream,e.aacStream=new nu,e.audioTimestampRolloverStream=new Vo.TimestampRolloverStream("audio"),e.timedMetadataTimestampRolloverStream=new Vo.TimestampRolloverStream("timed-metadata"),e.adtsStream=new Go,e.coalesceStream=new du(n,e.metadataStream),e.headOfPipeline=e.aacStream,e.aacStream.pipe(e.audioTimestampRolloverStream).pipe(e.adtsStream),e.aacStream.pipe(e.timedMetadataTimestampRolloverStream).pipe(e.metadataStream).pipe(e.coalesceStream),e.metadataStream.on("timestamp",function(t){e.aacStream.setTimestamp(t.timeStamp)}),e.aacStream.on("data",function(t){"timed-metadata"!==t.type||e.audioSegmentStream||(a=a||{timelineStartInfo:{baseMediaDecodeTime:s.baseMediaDecodeTime},codec:"adts",type:"audio"},e.coalesceStream.numberOfTracks++,e.audioSegmentStream=new cu(a,n),e.adtsStream.pipe(e.audioSegmentStream).pipe(e.coalesceStream))}),e.coalesceStream.on("data",this.trigger.bind(this,"data")),e.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setupTsPipeline=function(){var i={};(this.transmuxPipeline_=i).type="ts",i.metadataStream=new Vo.MetadataStream,i.packetStream=new Vo.TransportPacketStream,i.parseStream=new Vo.TransportParseStream,i.elementaryStream=new Vo.ElementaryStream,i.videoTimestampRolloverStream=new Vo.TimestampRolloverStream("video"),i.audioTimestampRolloverStream=new Vo.TimestampRolloverStream("audio"),i.timedMetadataTimestampRolloverStream=new Vo.TimestampRolloverStream("timed-metadata"),i.adtsStream=new Go,i.h264Stream=new vu,i.captionStream=new Vo.CaptionStream,i.coalesceStream=new du(n,i.metadataStream),i.headOfPipeline=i.packetStream,i.packetStream.pipe(i.parseStream).pipe(i.elementaryStream),i.elementaryStream.pipe(i.videoTimestampRolloverStream).pipe(i.h264Stream),i.elementaryStream.pipe(i.audioTimestampRolloverStream).pipe(i.adtsStream),i.elementaryStream.pipe(i.timedMetadataTimestampRolloverStream).pipe(i.metadataStream).pipe(i.coalesceStream),i.h264Stream.pipe(i.captionStream).pipe(i.coalesceStream),i.elementaryStream.on("data",function(t){var e;if("metadata"===t.type){for(e=t.tracks.length;e--;)r||"video"!==t.tracks[e].type?a||"audio"!==t.tracks[e].type||((a=t.tracks[e]).timelineStartInfo.baseMediaDecodeTime=s.baseMediaDecodeTime):(r=t.tracks[e]).timelineStartInfo.baseMediaDecodeTime=s.baseMediaDecodeTime;r&&!i.videoSegmentStream&&(i.coalesceStream.numberOfTracks++,i.videoSegmentStream=new lu(r,n),i.videoSegmentStream.on("timelineStartInfo",function(t){a&&(a.timelineStartInfo=t,i.audioSegmentStream.setEarliestDts(t.dts))}),i.videoSegmentStream.on("processedGopsInfo",s.trigger.bind(s,"gopInfo")),i.videoSegmentStream.on("baseMediaDecodeTime",function(t){a&&i.audioSegmentStream.setVideoBaseMediaDecodeTime(t)}),i.h264Stream.pipe(i.videoSegmentStream).pipe(i.coalesceStream)),a&&!i.audioSegmentStream&&(i.coalesceStream.numberOfTracks++,i.audioSegmentStream=new cu(a,n),i.adtsStream.pipe(i.audioSegmentStream).pipe(i.coalesceStream))}}),i.coalesceStream.on("data",this.trigger.bind(this,"data")),i.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setBaseMediaDecodeTime=function(t){var e=this.transmuxPipeline_;this.baseMediaDecodeTime=t,a&&(a.timelineStartInfo.dts=void 0,a.timelineStartInfo.pts=void 0,oo(a),a.timelineStartInfo.baseMediaDecodeTime=t,e.audioTimestampRolloverStream&&e.audioTimestampRolloverStream.discontinuity()),r&&(e.videoSegmentStream&&(e.videoSegmentStream.gopCache_=[],e.videoTimestampRolloverStream.discontinuity()),r.timelineStartInfo.dts=void 0,r.timelineStartInfo.pts=void 0,oo(r),e.captionStream.reset(),r.timelineStartInfo.baseMediaDecodeTime=t),e.timedMetadataTimestampRolloverStream&&e.timedMetadataTimestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(t){a&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(t)},this.alignGopsWith=function(t){r&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(t)},this.push=function(t){if(i){var e=pu(t);e&&"aac"!==this.transmuxPipeline_.type?this.setupAacPipeline():e||"ts"===this.transmuxPipeline_.type||this.setupTsPipeline(),i=!1}this.transmuxPipeline_.headOfPipeline.push(t)},this.flush=function(){i=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}}).prototype=new eo;var Tu,Su,ku={Transmuxer:hu,VideoSegmentStream:lu,AudioSegmentStream:cu,AUDIO_PROPERTIES:_u,VIDEO_PROPERTIES:bu},wu=Qs.parseType,Cu=function(t){return new Date(1e3*t-20828448e5)},Eu=function(t){return{isLeading:(12&t[0])>>>2,dependsOn:3&t[0],isDependedOn:(192&t[1])>>>6,hasRedundancy:(48&t[1])>>>4,paddingValue:(14&t[1])>>>1,isNonSyncSample:1&t[1],degradationPriority:t[2]<<8|t[3]}},Au={avc1:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{dataReferenceIndex:e.getUint16(6),width:e.getUint16(24),height:e.getUint16(26),horizresolution:e.getUint16(28)+e.getUint16(30)/16,vertresolution:e.getUint16(32)+e.getUint16(34)/16,frameCount:e.getUint16(40),depth:e.getUint16(74),config:Tu(t.subarray(78,t.byteLength))}},avcC:function(t){var e,i,n,r,a=new DataView(t.buffer,t.byteOffset,t.byteLength),s={configurationVersion:t[0],avcProfileIndication:t[1],profileCompatibility:t[2],avcLevelIndication:t[3],lengthSizeMinusOne:3&t[4],sps:[],pps:[]},o=31&t[5];for(n=6,r=0;r<o;r++)i=a.getUint16(n),n+=2,s.sps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;for(e=t[n],n++,r=0;r<e;r++)i=a.getUint16(n),n+=2,s.pps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;return s},btrt:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{bufferSizeDB:e.getUint32(0),maxBitrate:e.getUint32(4),avgBitrate:e.getUint32(8)}},esds:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),esId:t[6]<<8|t[7],streamPriority:31&t[8],decoderConfig:{objectProfileIndication:t[11],streamType:t[12]>>>2&63,bufferSize:t[13]<<16|t[14]<<8|t[15],maxBitrate:t[16]<<24|t[17]<<16|t[18]<<8|t[19],avgBitrate:t[20]<<24|t[21]<<16|t[22]<<8|t[23],decoderConfigDescriptor:{tag:t[24],length:t[25],audioObjectType:t[26]>>>3&31,samplingFrequencyIndex:(7&t[26])<<1|t[27]>>>7&1,channelConfiguration:t[27]>>>3&15}}}},ftyp:function(t){for(var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={majorBrand:wu(t.subarray(0,4)),minorVersion:e.getUint32(4),compatibleBrands:[]},n=8;n<t.byteLength;)i.compatibleBrands.push(wu(t.subarray(n,n+4))),n+=4;return i},dinf:function(t){return{boxes:Tu(t)}},dref:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),dataReferences:Tu(t.subarray(8))}},hdlr:function(t){var e={version:new DataView(t.buffer,t.byteOffset,t.byteLength).getUint8(0),flags:new Uint8Array(t.subarray(1,4)),handlerType:wu(t.subarray(8,12)),name:""},i=8;for(i=24;i<t.byteLength;i++){if(0===t[i]){i++;break}e.name+=String.fromCharCode(t[i])}return e.name=decodeURIComponent(escape(e.name)),e},mdat:function(t){return{byteLength:t.byteLength,nals:function(t){var e,i,n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=[];for(e=0;e+4<t.length;e+=i)if(i=n.getUint32(e),e+=4,i<=0)r.push("<span style='color:red;'>MALFORMED DATA</span>");else switch(31&t[e]){case 1:r.push("slice_layer_without_partitioning_rbsp");break;case 5:r.push("slice_layer_without_partitioning_rbsp_idr");break;case 6:r.push("sei_rbsp");break;case 7:r.push("seq_parameter_set_rbsp");break;case 8:r.push("pic_parameter_set_rbsp");break;case 9:r.push("access_unit_delimiter_rbsp");break;default:r.push("UNKNOWN NAL - "+t[e]&31)}return r}(t)}},mdhd:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=4,r={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),language:""};return 1===r.version?(n+=4,r.creationTime=Cu(i.getUint32(n)),n+=8,r.modificationTime=Cu(i.getUint32(n)),n+=4,r.timescale=i.getUint32(n),n+=8):(r.creationTime=Cu(i.getUint32(n)),n+=4,r.modificationTime=Cu(i.getUint32(n)),n+=4,r.timescale=i.getUint32(n),n+=4),r.duration=i.getUint32(n),n+=4,e=i.getUint16(n),r.language+=String.fromCharCode(96+(e>>10)),r.language+=String.fromCharCode(96+((992&e)>>5)),r.language+=String.fromCharCode(96+(31&e)),r},mdia:function(t){return{boxes:Tu(t)}},mfhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sequenceNumber:t[4]<<24|t[5]<<16|t[6]<<8|t[7]}},minf:function(t){return{boxes:Tu(t)}},mp4a:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={dataReferenceIndex:e.getUint16(6),channelcount:e.getUint16(16),samplesize:e.getUint16(18),samplerate:e.getUint16(24)+e.getUint16(26)/65536};return 28<t.byteLength&&(i.streamDescriptor=Tu(t.subarray(28))[0]),i},moof:function(t){return{boxes:Tu(t)}},moov:function(t){return{boxes:Tu(t)}},mvex:function(t){return{boxes:Tu(t)}},mvhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=Cu(e.getUint32(i)),i+=8,n.modificationTime=Cu(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=8):(n.creationTime=Cu(e.getUint32(i)),i+=4,n.modificationTime=Cu(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=4),n.duration=e.getUint32(i),i+=4,n.rate=e.getUint16(i)+e.getUint16(i+2)/16,i+=4,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,i+=8,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,i+=24,n.nextTrackId=e.getUint32(i),n},pdin:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),rate:e.getUint32(4),initialDelay:e.getUint32(8)}},sdtp:function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]};for(e=4;e<t.byteLength;e++)i.samples.push({dependsOn:(48&t[e])>>4,isDependedOn:(12&t[e])>>2,hasRedundancy:3&t[e]});return i},sidx:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),references:[],referenceId:i.getUint32(4),timescale:i.getUint32(8),earliestPresentationTime:i.getUint32(12),firstOffset:i.getUint32(16)},r=i.getUint16(22);for(e=24;r;e+=12,r--)n.references.push({referenceType:(128&t[e])>>>7,referencedSize:2147483647&i.getUint32(e),subsegmentDuration:i.getUint32(e+4),startsWithSap:!!(128&t[e+8]),sapType:(112&t[e+8])>>>4,sapDeltaTime:268435455&i.getUint32(e+8)});return n},smhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),balance:t[4]+t[5]/256}},stbl:function(t){return{boxes:Tu(t)}},stco:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),chunkOffsets:[]},r=i.getUint32(4);for(e=8;r;e+=4,r--)n.chunkOffsets.push(i.getUint32(e));return n},stsc:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=i.getUint32(4),r={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleToChunks:[]};for(e=8;n;e+=12,n--)r.sampleToChunks.push({firstChunk:i.getUint32(e),samplesPerChunk:i.getUint32(e+4),sampleDescriptionIndex:i.getUint32(e+8)});return r},stsd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleDescriptions:Tu(t.subarray(8))}},stsz:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleSize:i.getUint32(4),entries:[]};for(e=12;e<t.byteLength;e+=4)n.entries.push(i.getUint32(e));return n},stts:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),timeToSamples:[]},r=i.getUint32(4);for(e=8;r;e+=8,r--)n.timeToSamples.push({sampleCount:i.getUint32(e),sampleDelta:i.getUint32(e+4)});return n},styp:function(t){return Au.ftyp(t)},tfdt:function(t){var e={version:t[0],flags:new Uint8Array(t.subarray(1,4)),baseMediaDecodeTime:t[4]<<24|t[5]<<16|t[6]<<8|t[7]};return 1===e.version&&(e.baseMediaDecodeTime*=Math.pow(2,32),e.baseMediaDecodeTime+=t[8]<<24|t[9]<<16|t[10]<<8|t[11]),e},tfhd:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:i.getUint32(4)},r=1&n.flags[2],a=2&n.flags[2],s=8&n.flags[2],o=16&n.flags[2],u=32&n.flags[2],l=65536&n.flags[0],c=131072&n.flags[0];return e=8,r&&(e+=4,n.baseDataOffset=i.getUint32(12),e+=4),a&&(n.sampleDescriptionIndex=i.getUint32(e),e+=4),s&&(n.defaultSampleDuration=i.getUint32(e),e+=4),o&&(n.defaultSampleSize=i.getUint32(e),e+=4),u&&(n.defaultSampleFlags=i.getUint32(e)),l&&(n.durationIsEmpty=!0),!r&&c&&(n.baseDataOffsetIsMoof=!0),n},tkhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=Cu(e.getUint32(i)),i+=8,n.modificationTime=Cu(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=8):(n.creationTime=Cu(e.getUint32(i)),i+=4,n.modificationTime=Cu(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=4),n.duration=e.getUint32(i),i+=4,i+=8,n.layer=e.getUint16(i),i+=2,n.alternateGroup=e.getUint16(i),i+=2,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,n.width=e.getUint16(i)+e.getUint16(i+2)/16,i+=4,n.height=e.getUint16(i)+e.getUint16(i+2)/16,n},traf:function(t){return{boxes:Tu(t)}},trak:function(t){return{boxes:Tu(t)}},trex:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:e.getUint32(4),defaultSampleDescriptionIndex:e.getUint32(8),defaultSampleDuration:e.getUint32(12),defaultSampleSize:e.getUint32(16),sampleDependsOn:3&t[20],sampleIsDependedOn:(192&t[21])>>6,sampleHasRedundancy:(48&t[21])>>4,samplePaddingValue:(14&t[21])>>1,sampleIsDifferenceSample:!!(1&t[21]),sampleDegradationPriority:e.getUint16(22)}},trun:function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]},n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=1&i.flags[2],a=4&i.flags[2],s=1&i.flags[1],o=2&i.flags[1],u=4&i.flags[1],l=8&i.flags[1],c=n.getUint32(4),h=8;for(r&&(i.dataOffset=n.getInt32(h),h+=4),a&&c&&(e={flags:Eu(t.subarray(h,h+4))},h+=4,s&&(e.duration=n.getUint32(h),h+=4),o&&(e.size=n.getUint32(h),h+=4),l&&(e.compositionTimeOffset=n.getUint32(h),h+=4),i.samples.push(e),c--);c--;)e={},s&&(e.duration=n.getUint32(h),h+=4),o&&(e.size=n.getUint32(h),h+=4),u&&(e.flags=Eu(t.subarray(h,h+4)),h+=4),l&&(e.compositionTimeOffset=n.getUint32(h),h+=4),i.samples.push(e);return i},"url ":function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4))}},vmhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),graphicsmode:e.getUint16(4),opcolor:new Uint16Array([e.getUint16(6),e.getUint16(8),e.getUint16(10)])}}},Lu={inspect:Tu=function(t){for(var e,i,n,r,a,s=0,o=[],u=new ArrayBuffer(t.length),l=new Uint8Array(u),c=0;c<t.length;++c)l[c]=t[c];for(e=new DataView(u);s<t.byteLength;)i=e.getUint32(s),n=wu(t.subarray(s+4,s+8)),r=1<i?s+i:t.byteLength,(a=(Au[n]||function(t){return{data:t}})(t.subarray(s+8,r))).size=i,a.type=n,o.push(a),s=r;return o},textify:Su=function(t,e){var a;return e=e||0,a=new Array(2*e+1).join(" "),t.map(function(r,t){return a+r.type+"\n"+Object.keys(r).filter(function(t){return"type"!==t&&"boxes"!==t}).map(function(t){var e=a+"  "+t+": ",i=r[t];if(i instanceof Uint8Array||i instanceof Uint32Array){var n=Array.prototype.slice.call(new Uint8Array(i.buffer,i.byteOffset,i.byteLength)).map(function(t){return" "+("00"+t.toString(16)).slice(-2)}).join("").match(/.{1,24}/g);return n?1===n.length?e+"<"+n.join("").slice(1)+">":e+"<\n"+n.map(function(t){return a+"  "+t}).join("\n")+"\n"+a+"  >":e+"<>"}return e+JSON.stringify(i,null,2).split("\n").map(function(t,e){return 0===e?t:a+"  "+t}).join("\n")}).join("\n")+(r.boxes?"\n"+Su(r.boxes,e+1):"")}).join("\n")},parseTfdt:Au.tfdt,parseHdlr:Au.hdlr,parseTfhd:Au.tfhd,parseTrun:Au.trun},Ou=fo,Pu=So.CaptionStream,Uu=function(t,e){for(var i=t,n=0;n<e.length;n++){var r=e[n];if(i<r.size)return r;i-=r.size}return null},xu=function(t,y){var n=Qs.findBox(t,["moof","traf"]),e=Qs.findBox(t,["mdat"]),v={},r=[];return e.forEach(function(t,e){var i=n[e];r.push({mdat:t,traf:i})}),r.forEach(function(t){var e,i,n,r,a,s,o,u,l=t.mdat,c=t.traf,h=Qs.findBox(c,["tfhd"]),d=Lu.parseTfhd(h[0]),p=d.trackId,f=Qs.findBox(c,["tfdt"]),m=0<f.length?Lu.parseTfdt(f[0]).baseMediaDecodeTime:0,g=Qs.findBox(c,["trun"]);y===p&&0<g.length&&(i=g,r=m,a=(n=d).defaultSampleDuration||0,s=n.defaultSampleSize||0,o=n.trackId,u=[],i.forEach(function(t){var e=Lu.parseTrun(t).samples;e.forEach(function(t){void 0===t.duration&&(t.duration=a),void 0===t.size&&(t.size=s),t.trackId=o,t.dts=r,void 0===t.compositionTimeOffset&&(t.compositionTimeOffset=0),t.pts=r+t.compositionTimeOffset,r+=t.duration}),u=u.concat(e)}),e=function(t,e,i){var n,r,a,s,o=new DataView(t.buffer,t.byteOffset,t.byteLength),u=[];for(r=0;r+4<t.length;r+=a)if(a=o.getUint32(r),r+=4,!(a<=0))switch(31&t[r]){case 6:var l=t.subarray(r+1,r+1+a),c=Uu(r,e);n={nalUnitType:"sei_rbsp",size:a,data:l,escapedRBSP:Ou(l),trackId:i},c?(n.pts=c.pts,n.dts=c.dts,s=c):(n.pts=s.pts,n.dts=s.dts),u.push(n)}return u}(l,u,p),v[p]||(v[p]=[]),v[p]=v[p].concat(e))}),v},Iu={generator:Zs,probe:Qs,Transmuxer:ku.Transmuxer,AudioSegmentStream:ku.AudioSegmentStream,VideoSegmentStream:ku.VideoSegmentStream,CaptionParser:function(){var e,u,l,c,h,t=!1;this.isInitialized=function(){return t},this.init=function(){e=new Pu,t=!0,e.on("data",function(t){t.startTime=t.startPts/c,t.endTime=t.endPts/c,h.captions.push(t),h.captionStreams[t.stream]=!0})},this.isNewInit=function(t,e){return!(t&&0===t.length||e&&"object"==typeof e&&0===Object.keys(e).length||l===t[0]&&c===e[l])},this.parse=function(t,e,i){var n,r,a,s;if(!this.isInitialized())return null;if(!e||!i)return null;if(this.isNewInit(e,i))l=e[0],c=i[l];else if(!l||!c)return u.push(t),null;for(;0<u.length;){var o=u.shift();this.parse(o,e,i)}return r=t,s=c,null!==(n=(a=l)?{seiNals:xu(r,a)[a],timescale:s}:null)&&n.seiNals?(this.pushNals(n.seiNals),this.flushStream(),h):null},this.pushNals=function(t){if(!this.isInitialized()||!t||0===t.length)return null;t.forEach(function(t){e.push(t)})},this.flushStream=function(){if(!this.isInitialized())return null;e.flush()},this.clearParsedCaptions=function(){h.captions=[],h.captionStreams={}},this.resetCaptionStream=function(){if(!this.isInitialized())return null;e.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){u=[],c=l=null,h?this.clearParsedCaptions():h={captions:[],captionStreams:{}},this.resetCaptionStream()},this.reset()}}.CaptionParser,Du=function(t){var e=31&t[1];return e<<=8,e|=t[2]},Ru=function(t){return!!(64&t[1])},Mu=function(t){var e=0;return 1<(48&t[3])>>>4&&(e+=t[4]+1),e},Bu=function(t){switch(t){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},Nu={parseType:function(t,e){var i=Du(t);return 0===i?"pat":i===e?"pmt":e?"pes":null},parsePat:function(t){var e=Ru(t),i=4+Mu(t);return e&&(i+=t[i]+1),(31&t[i+10])<<8|t[i+11]},parsePmt:function(t){var e={},i=Ru(t),n=4+Mu(t);if(i&&(n+=t[n]+1),1&t[n+5]){var r;r=3+((15&t[n+1])<<8|t[n+2])-4;for(var a=12+((15&t[n+10])<<8|t[n+11]);a<r;){var s=n+a;e[(31&t[s+1])<<8|t[s+2]]=t[s],a+=5+((15&t[s+3])<<8|t[s+4])}return e}},parsePayloadUnitStartIndicator:Ru,parsePesType:function(t,e){switch(e[Du(t)]){case ko.H264_STREAM_TYPE:return"video";case ko.ADTS_STREAM_TYPE:return"audio";case ko.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},parsePesTime:function(t){if(!Ru(t))return null;var e=4+Mu(t);if(e>=t.byteLength)return null;var i,n=null;return 192&(i=t[e+7])&&((n={}).pts=(14&t[e+9])<<27|(255&t[e+10])<<20|(254&t[e+11])<<12|(255&t[e+12])<<5|(254&t[e+13])>>>3,n.pts*=4,n.pts+=(6&t[e+13])>>>1,n.dts=n.pts,64&i&&(n.dts=(14&t[e+14])<<27|(255&t[e+15])<<20|(254&t[e+16])<<12|(255&t[e+17])<<5|(254&t[e+18])>>>3,n.dts*=4,n.dts+=(6&t[e+18])>>>1)),n},videoPacketContainsKeyFrame:function(t){for(var e=4+Mu(t),i=t.subarray(e),n=0,r=0,a=!1;r<i.byteLength-3;r++)if(1===i[r+2]){n=r+5;break}for(;n<i.byteLength;)switch(i[n]){case 0:if(0!==i[n-1]){n+=2;break}if(0!==i[n-2]){n++;break}for(r+3!==n-2&&"slice_layer_without_partitioning_rbsp_idr"===Bu(31&i[r+3])&&(a=!0);1!==i[++n]&&n<i.length;);r=n-2,n+=3;break;case 1:if(0!==i[n-1]||0!==i[n-2]){n+=3;break}"slice_layer_without_partitioning_rbsp_idr"===Bu(31&i[r+3])&&(a=!0),r=n-2,n+=3;break;default:n+=3}return i=i.subarray(r),n-=r,r=0,i&&3<i.byteLength&&"slice_layer_without_partitioning_rbsp_idr"===Bu(31&i[r+3])&&(a=!0),a}},ju=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Fu=function(t){return t[0]<<21|t[1]<<14|t[2]<<7|t[3]},Vu={parseId3TagSize:function(t,e){var i=t[e+6]<<21|t[e+7]<<14|t[e+8]<<7|t[e+9];return(16&t[e+5])>>4?i+20:i+10},parseAdtsSize:function(t,e){var i=(224&t[e+5])>>5,n=t[e+4]<<3;return 6144&t[e+3]|n|i},parseType:function(t,e){return t[e]==="I".charCodeAt(0)&&t[e+1]==="D".charCodeAt(0)&&t[e+2]==="3".charCodeAt(0)?"timed-metadata":!0&t[e]&&240==(240&t[e+1])?"audio":null},parseSampleRate:function(t){for(var e=0;e+5<t.length;){if(255===t[e]&&240==(246&t[e+1]))return ju[(60&t[e+2])>>>2];e++}return null},parseAacTimestamp:function(t){var e,i,n;e=10,64&t[5]&&(e+=4,e+=Fu(t.subarray(10,14)));do{if((i=Fu(t.subarray(e+4,e+8)))<1)return null;if("PRIV"===String.fromCharCode(t[e],t[e+1],t[e+2],t[e+3])){n=t.subarray(e+10,e+i+10);for(var r=0;r<n.byteLength;r++)if(0===n[r]){if("com.apple.streaming.transportStreamTimestamp"!==unescape(function(t,e,i){var n,r="";for(n=e;n<i;n++)r+="%"+("00"+t[n].toString(16)).slice(-2);return r}(n,0,r)))break;var a=n.subarray(r+1),s=(1&a[3])<<30|a[4]<<22|a[5]<<14|a[6]<<6|a[7]>>>2;return s*=4,s+=3&a[7]}}e+=10,e+=i}while(e<t.byteLength);return null}},Hu=Lo,qu={};qu.ts=Nu,qu.aac=Vu;var zu=188,Wu=function(t,e,i){for(var n,r,a,s,o=0,u=zu,l=!1;u<t.byteLength;)if(71!==t[o]||71!==t[u])o++,u++;else{switch(n=t.subarray(o,u),qu.ts.parseType(n,e.pid)){case"pes":r=qu.ts.parsePesType(n,e.table),a=qu.ts.parsePayloadUnitStartIndicator(n),"audio"===r&&a&&(s=qu.ts.parsePesTime(n))&&(s.type="audio",i.audio.push(s),l=!0)}if(l)break;o+=zu,u+=zu}for(o=(u=t.byteLength)-zu,l=!1;0<=o;)if(71!==t[o]||71!==t[u])o--,u--;else{switch(n=t.subarray(o,u),qu.ts.parseType(n,e.pid)){case"pes":r=qu.ts.parsePesType(n,e.table),a=qu.ts.parsePayloadUnitStartIndicator(n),"audio"===r&&a&&(s=qu.ts.parsePesTime(n))&&(s.type="audio",i.audio.push(s),l=!0)}if(l)break;o-=zu,u-=zu}},Gu=function(t,e,i){for(var n,r,a,s,o,u,l,c=0,h=zu,d=!1,p={data:[],size:0};h<t.byteLength;)if(71!==t[c]||71!==t[h])c++,h++;else{switch(n=t.subarray(c,h),qu.ts.parseType(n,e.pid)){case"pes":if(r=qu.ts.parsePesType(n,e.table),a=qu.ts.parsePayloadUnitStartIndicator(n),"video"===r&&(a&&!d&&(s=qu.ts.parsePesTime(n))&&(s.type="video",i.video.push(s),d=!0),!i.firstKeyFrame)){if(a&&0!==p.size){for(o=new Uint8Array(p.size),u=0;p.data.length;)l=p.data.shift(),o.set(l,u),u+=l.byteLength;qu.ts.videoPacketContainsKeyFrame(o)&&(i.firstKeyFrame=qu.ts.parsePesTime(o),i.firstKeyFrame.type="video"),p.size=0}p.data.push(n),p.size+=n.byteLength}}if(d&&i.firstKeyFrame)break;c+=zu,h+=zu}for(c=(h=t.byteLength)-zu,d=!1;0<=c;)if(71!==t[c]||71!==t[h])c--,h--;else{switch(n=t.subarray(c,h),qu.ts.parseType(n,e.pid)){case"pes":r=qu.ts.parsePesType(n,e.table),a=qu.ts.parsePayloadUnitStartIndicator(n),"video"===r&&a&&(s=qu.ts.parsePesTime(n))&&(s.type="video",i.video.push(s),d=!0)}if(d)break;c-=zu,h-=zu}},Xu=function(t){var e={pid:null,table:null},i={};for(var n in function(t,e){for(var i,n=0,r=zu;r<t.byteLength;)if(71!==t[n]||71!==t[r])n++,r++;else{switch(i=t.subarray(n,r),qu.ts.parseType(i,e.pid)){case"pat":e.pid||(e.pid=qu.ts.parsePat(i));break;case"pmt":e.table||(e.table=qu.ts.parsePmt(i))}if(e.pid&&e.table)return;n+=zu,r+=zu}}(t,e),e.table){if(e.table.hasOwnProperty(n))switch(e.table[n]){case ko.H264_STREAM_TYPE:i.video=[],Gu(t,e,i),0===i.video.length&&delete i.video;break;case ko.ADTS_STREAM_TYPE:i.audio=[],Wu(t,e,i),0===i.audio.length&&delete i.audio}}return i},Yu=function(t,e){var i,n;return(n=(i=t)[0]==="I".charCodeAt(0)&&i[1]==="D".charCodeAt(0)&&i[2]==="3".charCodeAt(0)?function(t){for(var e,i=!1,n=0,r=null,a=null,s=0,o=0;3<=t.length-o;){switch(qu.aac.parseType(t,o)){case"timed-metadata":if(t.length-o<10){i=!0;break}if((s=qu.aac.parseId3TagSize(t,o))>t.length){i=!0;break}null===a&&(e=t.subarray(o,o+s),a=qu.aac.parseAacTimestamp(e)),o+=s;break;case"audio":if(t.length-o<7){i=!0;break}if((s=qu.aac.parseAdtsSize(t,o))>t.length){i=!0;break}null===r&&(e=t.subarray(o,o+s),r=qu.aac.parseSampleRate(e)),n++,o+=s;break;default:o++}if(i)return null}if(null===r||null===a)return null;var u=9e4/r;return{audio:[{type:"audio",dts:a,pts:a},{type:"audio",dts:a+1024*n*u,pts:a+1024*n*u}]}}(t):Xu(t))&&(n.audio||n.video)?(function(t,e){if(t.audio&&t.audio.length){var i=e;"undefined"==typeof i&&(i=t.audio[0].dts),t.audio.forEach(function(t){t.dts=Hu(t.dts,i),t.pts=Hu(t.pts,i),t.dtsTime=t.dts/9e4,t.ptsTime=t.pts/9e4})}if(t.video&&t.video.length){var n=e;if("undefined"==typeof n&&(n=t.video[0].dts),t.video.forEach(function(t){t.dts=Hu(t.dts,n),t.pts=Hu(t.pts,n),t.dtsTime=t.dts/9e4,t.ptsTime=t.pts/9e4}),t.firstKeyFrame){var r=t.firstKeyFrame;r.dts=Hu(r.dts,n),r.pts=Hu(r.pts,n),r.dtsTime=r.dts/9e4,r.ptsTime=r.dts/9e4}}}(n,e),n):null};var $u=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Ku=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),Qu=null,Ju=function(){function c(t){$u(this,c),Qu||(Qu=function(){var t=[[[],[],[],[],[]],[[],[],[],[],[]]],e=t[0],i=t[1],n=e[4],r=i[4],a=void 0,s=void 0,o=void 0,u=[],l=[],c=void 0,h=void 0,d=void 0,p=void 0,f=void 0;for(a=0;a<256;a++)l[(u[a]=a<<1^283*(a>>7))^a]=a;for(s=o=0;!n[s];s^=c||1,o=l[o]||1)for(d=(d=o^o<<1^o<<2^o<<3^o<<4)>>8^255&d^99,f=16843009*u[h=u[c=u[r[n[s]=d]=s]]]^65537*h^257*c^16843008*s,p=257*u[d]^16843008*d,a=0;a<4;a++)e[a][s]=p=p<<24^p>>>8,i[a][d]=f=f<<24^f>>>8;for(a=0;a<5;a++)e[a]=e[a].slice(0),i[a]=i[a].slice(0);return t}()),this._tables=[[Qu[0][0].slice(),Qu[0][1].slice(),Qu[0][2].slice(),Qu[0][3].slice(),Qu[0][4].slice()],[Qu[1][0].slice(),Qu[1][1].slice(),Qu[1][2].slice(),Qu[1][3].slice(),Qu[1][4].slice()]];var e=void 0,i=void 0,n=void 0,r=void 0,a=void 0,s=this._tables[0][4],o=this._tables[1],u=t.length,l=1;if(4!==u&&6!==u&&8!==u)throw new Error("Invalid aes key size");for(r=t.slice(0),a=[],this._key=[r,a],e=u;e<4*u+28;e++)n=r[e-1],(e%u==0||8===u&&e%u==4)&&(n=s[n>>>24]<<24^s[n>>16&255]<<16^s[n>>8&255]<<8^s[255&n],e%u==0&&(n=n<<8^n>>>24^l<<24,l=l<<1^283*(l>>7))),r[e]=r[e-u]^n;for(i=0;e;i++,e--)n=r[3&i?e:e-4],a[i]=e<=4||i<4?n:o[0][s[n>>>24]]^o[1][s[n>>16&255]]^o[2][s[n>>8&255]]^o[3][s[255&n]]}return c.prototype.decrypt=function(t,e,i,n,r,a){var s=this._key[1],o=t^s[0],u=n^s[1],l=i^s[2],c=e^s[3],h=void 0,d=void 0,p=void 0,f=s.length/4-2,m=void 0,g=4,y=this._tables[1],v=y[0],_=y[1],b=y[2],T=y[3],S=y[4];for(m=0;m<f;m++)h=v[o>>>24]^_[u>>16&255]^b[l>>8&255]^T[255&c]^s[g],d=v[u>>>24]^_[l>>16&255]^b[c>>8&255]^T[255&o]^s[g+1],p=v[l>>>24]^_[c>>16&255]^b[o>>8&255]^T[255&u]^s[g+2],c=v[c>>>24]^_[o>>16&255]^b[u>>8&255]^T[255&l]^s[g+3],g+=4,o=h,u=d,l=p;for(m=0;m<4;m++)r[(3&-m)+a]=S[o>>>24]<<24^S[u>>16&255]<<16^S[l>>8&255]<<8^S[255&c]^s[g++],h=o,o=u,u=l,l=c,c=h},c}(),Zu=function(){function t(){$u(this,t),this.listeners={}}return t.prototype.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},t.prototype.off=function(t,e){if(!this.listeners[t])return!1;var i=this.listeners[t].indexOf(e);return this.listeners[t].splice(i,1),-1<i},t.prototype.trigger=function(t){var e=this.listeners[t];if(e)if(2===arguments.length)for(var i=e.length,n=0;n<i;++n)e[n].call(this,arguments[1]);else for(var r=Array.prototype.slice.call(arguments,1),a=e.length,s=0;s<a;++s)e[s].apply(this,r)},t.prototype.dispose=function(){this.listeners={}},t.prototype.pipe=function(e){this.on("data",function(t){e.push(t)})},t}(),tl=function(e){function i(){$u(this,i);var t=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,e.call(this,Zu));return t.jobs=[],t.delay=1,t.timeout_=null,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(i,e),i.prototype.processJob_=function(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null},i.prototype.push=function(t){this.jobs.push(t),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))},i}(Zu),el=function(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24},il=function(t,e,i){var n=new Int32Array(t.buffer,t.byteOffset,t.byteLength>>2),r=new Ju(Array.prototype.slice.call(e)),a=new Uint8Array(t.byteLength),s=new Int32Array(a.buffer),o=void 0,u=void 0,l=void 0,c=void 0,h=void 0,d=void 0,p=void 0,f=void 0,m=void 0;for(o=i[0],u=i[1],l=i[2],c=i[3],m=0;m<n.length;m+=4)h=el(n[m]),d=el(n[m+1]),p=el(n[m+2]),f=el(n[m+3]),r.decrypt(h,d,p,f,s,m),s[m]=el(s[m]^o),s[m+1]=el(s[m+1]^u),s[m+2]=el(s[m+2]^l),s[m+3]=el(s[m+3]^c),o=h,u=d,l=p,c=f;return a},nl=function(){function u(t,e,i,n){$u(this,u);var r=u.STEP,a=new Int32Array(t.buffer),s=new Uint8Array(t.byteLength),o=0;for(this.asyncStream_=new tl,this.asyncStream_.push(this.decryptChunk_(a.subarray(o,o+r),e,i,s)),o=r;o<a.length;o+=r)i=new Uint32Array([el(a[o-4]),el(a[o-3]),el(a[o-2]),el(a[o-1])]),this.asyncStream_.push(this.decryptChunk_(a.subarray(o,o+r),e,i,s));this.asyncStream_.push(function(){var t;n(null,(t=s).subarray(0,t.byteLength-t[t.byteLength-1]))})}return u.prototype.decryptChunk_=function(e,i,n,r){return function(){var t=il(e,i,n);r.set(t,e.byteOffset)}},Ku(u,null,[{key:"STEP",get:function(){return 32e3}}]),u}(),rl=function(t,e){return/^[a-z]+:/i.test(e)?e:(/\/\//i.test(t)||(t=ca.buildAbsoluteURL(v.location.href,t)),ca.buildAbsoluteURL(t,e))},al=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},sl=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),ol=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},ul=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},ll=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var i=[],n=!0,r=!1,a=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(i.push(s.value),!e||i.length!==e);n=!0);}catch(t){r=!0,a=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw a}}return i}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},cl=oa.mergeOptions,hl=oa.EventTarget,dl=oa.log,pl=function(r,a){["AUDIO","SUBTITLES"].forEach(function(t){for(var e in r.mediaGroups[t])for(var i in r.mediaGroups[t][e]){var n=r.mediaGroups[t][e][i];a(n,t,e,i)}})},fl=function(t,e){var i=cl(t,{}),n=i.playlists[e.uri];if(!n)return null;if(n.segments&&e.segments&&n.segments.length===e.segments.length&&n.mediaSequence===e.mediaSequence)return null;var r=cl(n,e);n.segments&&(r.segments=function(t,e,i){var n=e.slice();i=i||0;for(var r=Math.min(t.length,e.length+i),a=i;a<r;a++)n[a-i]=cl(t[a],n[a-i]);return n}(n.segments,e.segments,e.mediaSequence-n.mediaSequence)),r.segments.forEach(function(t){var e,i;e=t,i=r.resolvedUri,e.resolvedUri||(e.resolvedUri=rl(i,e.uri)),e.key&&!e.key.resolvedUri&&(e.key.resolvedUri=rl(i,e.key.uri)),e.map&&!e.map.resolvedUri&&(e.map.resolvedUri=rl(i,e.map.uri))});for(var a=0;a<i.playlists.length;a++)i.playlists[a].uri===e.uri&&(i.playlists[a]=r);return i.playlists[e.uri]=r,i},ml=function(t){for(var e=t.playlists.length;e--;){var i=t.playlists[e];(t.playlists[i.uri]=i).resolvedUri=rl(t.uri,i.uri),i.id=e,i.attributes||(i.attributes={},dl.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute."))}},gl=function(e){pl(e,function(t){t.uri&&(t.resolvedUri=rl(e.uri,t.uri))})},yl=function(t,e){var i=t.segments[t.segments.length-1];return e&&i&&i.duration?1e3*i.duration:500*(t.targetDuration||10)},vl=function(t){function r(t,e,i){al(this,r);var n=ul(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));if(n.srcUrl=t,n.hls_=e,n.withCredentials=i,!n.srcUrl)throw new Error("A non-empty playlist URL is required");return n.state="HAVE_NOTHING",n.on("mediaupdatetimeout",function(){"HAVE_METADATA"===n.state&&(n.state="HAVE_CURRENT_METADATA",n.request=n.hls_.xhr({uri:rl(n.master.uri,n.media().uri),withCredentials:n.withCredentials},function(t,e){if(n.request)return t?n.playlistRequestError(n.request,n.media().uri,"HAVE_METADATA"):void n.haveMetadata(n.request,n.media().uri)}))}),n}return ol(r,hl),sl(r,[{key:"playlistRequestError",value:function(t,e,i){this.request=null,i&&(this.state=i),this.error={playlist:this.master.playlists[e],status:t.status,message:"HLS playlist request error at URL: "+e,responseText:t.responseText,code:500<=t.status?4:2},this.trigger("error")}},{key:"haveMetadata",value:function(t,e){var i=this;this.request=null,this.state="HAVE_METADATA";var n=new _a;n.push(t.responseText),n.end(),n.manifest.uri=e,n.manifest.attributes=n.manifest.attributes||{};var r=fl(this.master,n.manifest);this.targetDuration=n.manifest.targetDuration,r?(this.master=r,this.media_=this.master.playlists[n.manifest.uri]):this.trigger("playlistunchanged"),this.media().endList||(v.clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=v.setTimeout(function(){i.trigger("mediaupdatetimeout")},yl(this.media(),!!r))),this.trigger("loadedplaylist")}},{key:"dispose",value:function(){this.stopRequest(),v.clearTimeout(this.mediaUpdateTimeout)}},{key:"stopRequest",value:function(){if(this.request){var t=this.request;this.request=null,t.onreadystatechange=null,t.abort()}}},{key:"media",value:function(i){var n=this;if(!i)return this.media_;if("HAVE_NOTHING"===this.state)throw new Error("Cannot switch media playlist from "+this.state);var r=this.state;if("string"==typeof i){if(!this.master.playlists[i])throw new Error("Unknown playlist URI: "+i);i=this.master.playlists[i]}var t=!this.media_||i.uri!==this.media_.uri;if(this.master.playlists[i.uri].endList)return this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=i,void(t&&(this.trigger("mediachanging"),this.trigger("mediachange")));if(t){if(this.state="SWITCHING_MEDIA",this.request){if(rl(this.master.uri,i.uri)===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.request=this.hls_.xhr({uri:rl(this.master.uri,i.uri),withCredentials:this.withCredentials},function(t,e){if(n.request){if(t)return n.playlistRequestError(n.request,i.uri,r);n.haveMetadata(e,i.uri),"HAVE_MASTER"===r?n.trigger("loadedmetadata"):n.trigger("mediachange")}})}}},{key:"pause",value:function(){this.stopRequest(),v.clearTimeout(this.mediaUpdateTimeout),"HAVE_NOTHING"===this.state&&(this.started=!1),"SWITCHING_MEDIA"===this.state?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MASTER":"HAVE_CURRENT_METADATA"===this.state&&(this.state="HAVE_METADATA")}},{key:"load",value:function(t){var e=this;v.clearTimeout(this.mediaUpdateTimeout);var i=this.media();if(t){var n=i?i.targetDuration/2*1e3:5e3;this.mediaUpdateTimeout=v.setTimeout(function(){return e.load()},n)}else this.started?i&&!i.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist"):this.start()}},{key:"start",value:function(){var n=this;this.started=!0,this.request=this.hls_.xhr({uri:this.srcUrl,withCredentials:this.withCredentials},function(t,e){if(n.request){if(n.request=null,t)return n.error={status:e.status,message:"HLS playlist request error at URL: "+n.srcUrl,responseText:e.responseText,code:2},"HAVE_NOTHING"===n.state&&(n.started=!1),n.trigger("error");var i=new _a;return i.push(e.responseText),i.end(),n.state="HAVE_MASTER",i.manifest.uri=n.srcUrl,i.manifest.playlists?(n.master=i.manifest,ml(n.master),gl(n.master),n.trigger("loadedplaylist"),void(n.request||n.media(i.manifest.playlists[0]))):(n.master={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:v.location.href,playlists:[{uri:n.srcUrl,id:0}]},n.master.playlists[n.srcUrl]=n.master.playlists[0],n.master.playlists[0].resolvedUri=n.srcUrl,n.master.playlists[0].attributes=n.master.playlists[0].attributes||{},n.haveMetadata(e,n.srcUrl),n.trigger("loadedmetadata"))}})}}]),r}(),_l=oa.createTimeRange,bl=function(t,e,i){var n,r;return"undefined"==typeof e&&(e=t.mediaSequence+t.segments.length),e<t.mediaSequence?0:(n=function(t,e){var i=0,n=e-t.mediaSequence,r=t.segments[n];if(r){if("undefined"!=typeof r.start)return{result:r.start,precise:!0};if("undefined"!=typeof r.end)return{result:r.end-r.duration,precise:!0}}for(;n--;){if("undefined"!=typeof(r=t.segments[n]).end)return{result:i+r.end,precise:!0};if(i+=r.duration,"undefined"!=typeof r.start)return{result:i+r.start,precise:!0}}return{result:i,precise:!1}}(t,e)).precise?n.result:(r=function(t,e){for(var i=0,n=void 0,r=e-t.mediaSequence;r<t.segments.length;r++){if("undefined"!=typeof(n=t.segments[r]).start)return{result:n.start-i,precise:!0};if(i+=n.duration,"undefined"!=typeof n.end)return{result:n.end-i,precise:!0}}return{result:-1,precise:!1}}(t,e)).precise?r.result:n.result+i},Tl=function(t,e,i){if(!t)return 0;if("number"!=typeof i&&(i=0),"undefined"==typeof e){if(t.totalDuration)return t.totalDuration;if(!t.endList)return v.Infinity}return bl(t,e,i)},Sl=function(t,e,i){var n=0;if(i<e){var r=[i,e];e=r[0],i=r[1]}if(e<0){for(var a=e;a<Math.min(0,i);a++)n+=t.targetDuration;e=0}for(var s=e;s<i;s++)n+=t.segments[s].duration;return n},kl=function(t){if(!t.segments.length)return 0;for(var e=t.segments.length-1,i=t.segments[e].duration||t.targetDuration,n=i+2*t.targetDuration;e--&&!(n<=(i+=t.segments[e].duration)););return Math.max(0,e)},wl=function(t,e,i){if(!t||!t.segments)return null;if(t.endList)return Tl(t);if(null===e)return null;e=e||0;var n=i?kl(t):t.segments.length;return bl(t,t.mediaSequence+n,e)},Cl=function(t){return t-Math.floor(t)==0},El=function(t,e){if(Cl(e))return e+.1*t;for(var i=e.toString().split(".")[1].length,n=1;n<=i;n++){var r=Math.pow(10,n),a=e*r;if(Cl(a)||n===i)return(a+t)/r}},Al=El.bind(null,1),Ll=El.bind(null,-1),Ol=function(t){return t.excludeUntil&&t.excludeUntil>Date.now()},Pl=function(t){return t.excludeUntil&&t.excludeUntil===1/0},Ul=function(t){var e=Ol(t);return!t.disabled&&!e},xl=function(t,e){return e.attributes&&e.attributes[t]},Il=function(t,e){if(1===t.playlists.length)return!0;var i=e.attributes.BANDWIDTH||Number.MAX_VALUE;return 0===t.playlists.filter(function(t){return!!Ul(t)&&(t.attributes.BANDWIDTH||0)<i}).length},Dl={duration:Tl,seekable:function(t,e){var i=e||0,n=wl(t,e,!0);return null===n?_l():_l(i,n)},safeLiveIndex:kl,getMediaInfoForTime:function(t,e,i,n){var r=void 0,a=void 0,s=t.segments.length,o=e-n;if(o<0){if(0<i)for(r=i-1;0<=r;r--)if(a=t.segments[r],0<(o+=Ll(a.duration)))return{mediaIndex:r,startTime:n-Sl(t,i,r)};return{mediaIndex:0,startTime:e}}if(i<0){for(r=i;r<0;r++)if((o-=t.targetDuration)<0)return{mediaIndex:0,startTime:e};i=0}for(r=i;r<s;r++)if(a=t.segments[r],(o-=Al(a.duration))<0)return{mediaIndex:r,startTime:n+Sl(t,i,r)};return{mediaIndex:s-1,startTime:e}},isEnabled:Ul,isDisabled:function(t){return t.disabled},isBlacklisted:Ol,isIncompatible:Pl,playlistEnd:wl,isAes:function(t){for(var e=0;e<t.segments.length;e++)if(t.segments[e].key)return!0;return!1},isFmp4:function(t){for(var e=0;e<t.segments.length;e++)if(t.segments[e].map)return!0;return!1},hasAttribute:xl,estimateSegmentRequestTime:function(t,e,i){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0;return xl("BANDWIDTH",i)?(t*i.attributes.BANDWIDTH-8*n)/e:NaN},isLowestEnabledRendition:Il},Rl=oa.xhr,Ml=oa.mergeOptions,Bl=function(){return function t(e,n){e=Ml({timeout:45e3},e);var i=t.beforeRequest||oa.Hls.xhr.beforeRequest;if(i&&"function"==typeof i){var r=i(e);r&&(e=r)}var a=Rl(e,function(t,e){var i=a.response;!t&&i&&(a.responseTime=Date.now(),a.roundTripTime=a.responseTime-a.requestTime,a.bytesReceived=i.byteLength||i.length,a.bandwidth||(a.bandwidth=Math.floor(a.bytesReceived/a.roundTripTime*8*1e3))),e.headers&&(a.responseHeaders=e.headers),t&&"ETIMEDOUT"===t.code&&(a.timedout=!0),t||a.aborted||200===e.statusCode||206===e.statusCode||0===e.statusCode||(t=new Error("XHR Failed with a response of: "+(a&&(i||a.responseText)))),n(t,a)}),s=a.abort;return a.abort=function(){return a.aborted=!0,s.apply(a,arguments)},a.uri=e.uri,a.requestTime=Date.now(),a}},Nl=function(t,e){var i=t.toString(16);return"00".substring(0,2-i.length)+i+(e%2?" ":"")},jl=function(t){return 32<=t&&t<126?String.fromCharCode(t):"."},Fl=function(i){var n={};return Object.keys(i).forEach(function(t){var e=i[t];ArrayBuffer.isView(e)?n[t]={bytes:e.buffer,byteOffset:e.byteOffset,byteLength:e.byteLength}:n[t]=e}),n},Vl=function(t){var e=t.byterange||{length:1/0,offset:0};return[e.length,e.offset,t.resolvedUri].join(",")},Hl=function(t){for(var e=Array.prototype.slice.call(t),i="",n=0;n<e.length/16;n++)i+=e.slice(16*n,16*n+16).map(Nl).join("")+" "+e.slice(16*n,16*n+16).map(jl).join("")+"\n";return i},ql=Object.freeze({createTransferableMessage:Fl,initSegmentId:Vl,hexDump:Hl,tagDump:function(t){var e=t.bytes;return Hl(e)},textRanges:function(t){var e,i,n="",r=void 0;for(r=0;r<t.length;r++)n+=(i=r,(e=t).start(i)+"-"+e.end(i)+" ");return n}}),zl=1/30,Wl=function(t,e){var i=[],n=void 0;if(t&&t.length)for(n=0;n<t.length;n++)e(t.start(n),t.end(n))&&i.push([t.start(n),t.end(n)]);return oa.createTimeRanges(i)},Gl=function(t,i){return Wl(t,function(t,e){return t-zl<=i&&i<=e+zl})},Xl=function(t,e){return Wl(t,function(t){return e<=t-zl})},Yl=function(t){var e=[];if(!t||!t.length)return"";for(var i=0;i<t.length;i++)e.push(t.start(i)+" => "+t.end(i));return e.join(", ")},$l=function(t){for(var e=[],i=0;i<t.length;i++)e.push({start:t.start(i),end:t.end(i)});return e},Kl=function(t,e,i){var n=void 0,r=void 0;if(i&&i.cues)for(n=i.cues.length;n--;)(r=i.cues[n]).startTime<=e&&r.endTime>=t&&i.removeCue(r)},Ql=function(t){return isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t},Jl=function(t,e,i){var r=v.WebKitDataCue||v.VTTCue;if(e&&e.forEach(function(t){var e=t.stream;this.inbandTextTracks_[e].addCue(new r(t.startTime+this.timestampOffset,t.endTime+this.timestampOffset,t.text))},t),i){var a=Ql(t.mediaSource_.duration);if(i.forEach(function(t){var n=t.cueTime+this.timestampOffset;t.frames.forEach(function(t){var e,i=new r(n,n,t.value||t.url||t.data||"");i.frame=t,i.value=t,e=i,Object.defineProperties(e.frame,{id:{get:function(){return oa.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),e.value.key}},value:{get:function(){return oa.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),e.value.data}},privateData:{get:function(){return oa.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),e.value.data}}}),this.metadataTrack_.addCue(i)},this)},t),t.metadataTrack_&&t.metadataTrack_.cues&&t.metadataTrack_.cues.length){for(var n=t.metadataTrack_.cues,s=[],o=0;o<n.length;o++)n[o]&&s.push(n[o]);var u=s.reduce(function(t,e){var i=t[e.startTime]||[];return i.push(e),t[e.startTime]=i,t},{}),l=Object.keys(u).sort(function(t,e){return Number(t)-Number(e)});l.forEach(function(t,e){var i=u[t],n=Number(l[e+1])||a;i.forEach(function(t){t.endTime=n})})}}},Zl="undefined"!=typeof window?window:{},tc="undefined"==typeof Symbol?"__target":Symbol(),ec="application/javascript",ic=Zl.BlobBuilder||Zl.WebKitBlobBuilder||Zl.MozBlobBuilder||Zl.MSBlobBuilder,nc=Zl.URL||Zl.webkitURL||nc&&nc.msURL,rc=Zl.Worker;function ac(r,a){return function(t){var e=this;if(!a)return new rc(r);if(rc&&!t){var i=lc(a.toString().replace(/^function.+?{/,"").slice(0,-1));return this[tc]=new rc(i),function(t,e){if(!t||!e)return;var i=t.terminate;t.objURL=e,t.terminate=function(){t.objURL&&nc.revokeObjectURL(t.objURL),i.call(t)}}(this[tc],i),this[tc]}var n={postMessage:function(t){e.onmessage&&setTimeout(function(){e.onmessage({data:t,target:n})})}};a.call(n),this.postMessage=function(t){setTimeout(function(){n.onmessage({data:t,target:e})})},this.isThisThread=!0}}if(rc){var sc,oc=lc("self.onmessage = function () {}"),uc=new Uint8Array(1);try{(sc=new rc(oc)).postMessage(uc,[uc.buffer])}catch(t){rc=null}finally{nc.revokeObjectURL(oc),sc&&sc.terminate()}}function lc(e){try{return nc.createObjectURL(new Blob([e],{type:ec}))}catch(t){var i=new ic;return i.append(e),nc.createObjectURL(i.getBlob(type))}}var cc=new ac("./transmuxer-worker.worker.js",function(t,e){var Oe=this;!function(){var o,e,i,r,a,n,t,s,u,l,c,h,d,p,f,m,g,y,v,_,b,T,S,k,w,C,E,A,L,O,P,U,x,I,D,R,M,B,N,j,F=Math.pow(2,32)-1;!function(){var t;if(T={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},"undefined"!=typeof Uint8Array){for(t in T)T.hasOwnProperty(t)&&(T[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)]);S=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)]),w=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)]),k=new Uint8Array([0,0,0,1]),C=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),E=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),A={video:C,audio:E},P=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),O=new Uint8Array([0,0,0,0,0,0,0,0]),U=new Uint8Array([0,0,0,0,0,0,0,0]),x=U,I=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),D=U,L=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}}(),o=function(t){var e,i,n=[],r=0;for(e=1;e<arguments.length;e++)n.push(arguments[e]);for(e=n.length;e--;)r+=n[e].byteLength;for(i=new Uint8Array(r+8),new DataView(i.buffer,i.byteOffset,i.byteLength).setUint32(0,i.byteLength),i.set(t,4),e=0,r=8;e<n.length;e++)i.set(n[e],r),r+=n[e].byteLength;return i},e=function(){return o(T.dinf,o(T.dref,P))},i=function(t){return o(T.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,t.audioobjecttype<<3|t.samplingfrequencyindex>>>1,t.samplingfrequencyindex<<7|t.channelcount<<3,6,1,2]))},f=function(t){return o(T.hdlr,A[t])},p=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,t.duration>>>24&255,t.duration>>>16&255,t.duration>>>8&255,255&t.duration,85,196,0,0]);return t.samplerate&&(e[12]=t.samplerate>>>24&255,e[13]=t.samplerate>>>16&255,e[14]=t.samplerate>>>8&255,e[15]=255&t.samplerate),o(T.mdhd,e)},d=function(t){return o(T.mdia,p(t),f(t.type),n(t))},a=function(t){return o(T.mfhd,new Uint8Array([0,0,0,0,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t]))},n=function(t){return o(T.minf,"video"===t.type?o(T.vmhd,L):o(T.smhd,O),e(),g(t))},t=function(t,e){for(var i=[],n=e.length;n--;)i[n]=v(e[n]);return o.apply(null,[T.moof,a(t)].concat(i))},s=function(t){for(var e=t.length,i=[];e--;)i[e]=c(t[e]);return o.apply(null,[T.moov,l(4294967295)].concat(i).concat(u(t)))},u=function(t){for(var e=t.length,i=[];e--;)i[e]=_(t[e]);return o.apply(null,[T.mvex].concat(i))},l=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return o(T.mvhd,e)},m=function(t){var e,i,n=t.samples||[],r=new Uint8Array(4+n.length);for(i=0;i<n.length;i++)e=n[i].flags,r[i+4]=e.dependsOn<<4|e.isDependedOn<<2|e.hasRedundancy;return o(T.sdtp,r)},g=function(t){return o(T.stbl,y(t),o(T.stts,D),o(T.stsc,x),o(T.stsz,I),o(T.stco,U))},y=function(t){return o(T.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),"video"===t.type?R(t):M(t))},R=function(t){var e,i=t.sps||[],n=t.pps||[],r=[],a=[];for(e=0;e<i.length;e++)r.push((65280&i[e].byteLength)>>>8),r.push(255&i[e].byteLength),r=r.concat(Array.prototype.slice.call(i[e]));for(e=0;e<n.length;e++)a.push((65280&n[e].byteLength)>>>8),a.push(255&n[e].byteLength),a=a.concat(Array.prototype.slice.call(n[e]));return o(T.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&t.width)>>8,255&t.width,(65280&t.height)>>8,255&t.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),o(T.avcC,new Uint8Array([1,t.profileIdc,t.profileCompatibility,t.levelIdc,255].concat([i.length]).concat(r).concat([n.length]).concat(a))),o(T.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])))},M=function(t){return o(T.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&t.channelcount)>>8,255&t.channelcount,(65280&t.samplesize)>>8,255&t.samplesize,0,0,0,0,(65280&t.samplerate)>>8,255&t.samplerate,0,0]),i(t))},h=function(t){var e=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,0,(4278190080&t.duration)>>24,(16711680&t.duration)>>16,(65280&t.duration)>>8,255&t.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&t.width)>>8,255&t.width,0,0,(65280&t.height)>>8,255&t.height,0,0]);return o(T.tkhd,e)},v=function(t){var e,i,n,r,a,s;return e=o(T.tfhd,new Uint8Array([0,0,0,58,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),a=Math.floor(t.baseMediaDecodeTime/(F+1)),s=Math.floor(t.baseMediaDecodeTime%(F+1)),i=o(T.tfdt,new Uint8Array([1,0,0,0,a>>>24&255,a>>>16&255,a>>>8&255,255&a,s>>>24&255,s>>>16&255,s>>>8&255,255&s])),92,"audio"===t.type?(n=b(t,92),o(T.traf,e,i,n)):(r=m(t),n=b(t,r.length+92),o(T.traf,e,i,n,r))},c=function(t){return t.duration=t.duration||4294967295,o(T.trak,h(t),d(t))},_=function(t){var e=new Uint8Array([0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return"video"!==t.type&&(e[e.length-1]=0),o(T.trex,e)},j=function(t,e){var i=0,n=0,r=0,a=0;return t.length&&(void 0!==t[0].duration&&(i=1),void 0!==t[0].size&&(n=2),void 0!==t[0].flags&&(r=4),void 0!==t[0].compositionTimeOffset&&(a=8)),[0,0,i|n|r|a,1,(4278190080&t.length)>>>24,(16711680&t.length)>>>16,(65280&t.length)>>>8,255&t.length,(4278190080&e)>>>24,(16711680&e)>>>16,(65280&e)>>>8,255&e]},N=function(t,e){var i,n,r,a;for(e+=20+16*(n=t.samples||[]).length,i=j(n,e),a=0;a<n.length;a++)r=n[a],i=i.concat([(4278190080&r.duration)>>>24,(16711680&r.duration)>>>16,(65280&r.duration)>>>8,255&r.duration,(4278190080&r.size)>>>24,(16711680&r.size)>>>16,(65280&r.size)>>>8,255&r.size,r.flags.isLeading<<2|r.flags.dependsOn,r.flags.isDependedOn<<6|r.flags.hasRedundancy<<4|r.flags.paddingValue<<1|r.flags.isNonSyncSample,61440&r.flags.degradationPriority,15&r.flags.degradationPriority,(4278190080&r.compositionTimeOffset)>>>24,(16711680&r.compositionTimeOffset)>>>16,(65280&r.compositionTimeOffset)>>>8,255&r.compositionTimeOffset]);return o(T.trun,new Uint8Array(i))},B=function(t,e){var i,n,r,a;for(e+=20+8*(n=t.samples||[]).length,i=j(n,e),a=0;a<n.length;a++)r=n[a],i=i.concat([(4278190080&r.duration)>>>24,(16711680&r.duration)>>>16,(65280&r.duration)>>>8,255&r.duration,(4278190080&r.size)>>>24,(16711680&r.size)>>>16,(65280&r.size)>>>8,255&r.size]);return o(T.trun,new Uint8Array(i))},b=function(t,e){return"audio"===t.type?B(t,e):N(t,e)};var V,H,q,z,W,G={ftyp:r=function(){return o(T.ftyp,S,k,S,w)},mdat:function(t){return o(T.mdat,t)},moof:t,moov:s,initSegment:function(t){var e,i=r(),n=s(t);return(e=new Uint8Array(i.byteLength+n.byteLength)).set(i),e.set(n,i.byteLength),e}},X=function(t){return t>>>0};q=function(t){return V(t,["moov","trak"]).reduce(function(t,e){var i,n,r,a,s;return(i=V(e,["tkhd"])[0])?(n=i[0],a=X(i[r=0===n?12:20]<<24|i[r+1]<<16|i[r+2]<<8|i[r+3]),(s=V(e,["mdia","mdhd"])[0])?(r=0===(n=s[0])?12:20,t[a]=X(s[r]<<24|s[r+1]<<16|s[r+2]<<8|s[r+3]),t):null):null},{})},z=function(r,t){var e,i,n;return e=V(t,["moof","traf"]),i=[].concat.apply([],e.map(function(n){return V(n,["tfhd"]).map(function(t){var e,i;return e=X(t[4]<<24|t[5]<<16|t[6]<<8|t[7]),i=r[e]||9e4,(V(n,["tfdt"]).map(function(t){var e,i;return e=t[0],i=X(t[4]<<24|t[5]<<16|t[6]<<8|t[7]),1===e&&(i*=Math.pow(2,32),i+=X(t[8]<<24|t[9]<<16|t[10]<<8|t[11])),i})[0]||1/0)/i})})),n=Math.min.apply(null,i),isFinite(n)?n:0},W=function(t){var e=V(t,["moov","trak"]),o=[];return e.forEach(function(t){var e=V(t,["mdia","hdlr"]),s=V(t,["tkhd"]);e.forEach(function(t,e){var i,n,r=H(t.subarray(8,12)),a=s[e];"vide"===r&&(n=0===(i=new DataView(a.buffer,a.byteOffset,a.byteLength)).getUint8(0)?i.getUint32(12):i.getUint32(20),o.push(n))})}),o};var Y={findBox:V=function(t,e){var i,n,r,a,s,o=[];if(!e.length)return null;for(i=0;i<t.byteLength;)n=X(t[i]<<24|t[i+1]<<16|t[i+2]<<8|t[i+3]),r=H(t.subarray(i+4,i+8)),a=1<n?i+n:t.byteLength,r===e[0]&&(1===e.length?o.push(t.subarray(i+8,a)):(s=V(t.subarray(i+8,a),e.slice(1))).length&&(o=o.concat(s))),i=a;return o},parseType:H=function(t){var e="";return e+=String.fromCharCode(t[0]),e+=String.fromCharCode(t[1]),e+=String.fromCharCode(t[2]),e+=String.fromCharCode(t[3])},timescale:q,startTime:z,videoTrackIds:W},$=function(){this.init=function(){var a={};this.on=function(t,e){a[t]||(a[t]=[]),a[t]=a[t].concat(e)},this.off=function(t,e){var i;return!!a[t]&&(i=a[t].indexOf(e),a[t]=a[t].slice(),a[t].splice(i,1),-1<i)},this.trigger=function(t){var e,i,n,r;if(e=a[t])if(2===arguments.length)for(n=e.length,i=0;i<n;++i)e[i].call(this,arguments[1]);else{for(r=[],i=arguments.length,i=1;i<arguments.length;++i)r.push(arguments[i]);for(n=e.length,i=0;i<n;++i)e[i].apply(this,r)}},this.dispose=function(){a={}}}};$.prototype.pipe=function(e){return this.on("data",function(t){e.push(t)}),this.on("done",function(t){e.flush(t)}),e},$.prototype.push=function(t){this.trigger("data",t)},$.prototype.flush=function(t){this.trigger("done",t)};var K=$,Q=function(t){var e,i,n=[],r=[];for(e=n.byteLength=0;e<t.length;e++)"access_unit_delimiter_rbsp"===(i=t[e]).nalUnitType?(n.length&&(n.duration=i.dts-n.dts,r.push(n)),(n=[i]).byteLength=i.data.byteLength,n.pts=i.pts,n.dts=i.dts):("slice_layer_without_partitioning_rbsp_idr"===i.nalUnitType&&(n.keyFrame=!0),n.duration=i.dts-n.dts,n.byteLength+=i.data.byteLength,n.push(i));return r.length&&(!n.duration||n.duration<=0)&&(n.duration=r[r.length-1].duration),r.push(n),r},J=function(t){var e,i,n=[],r=[];for(n.byteLength=0,n.nalCount=0,n.duration=0,n.pts=t[0].pts,n.dts=t[0].dts,r.byteLength=0,r.nalCount=0,r.duration=0,r.pts=t[0].pts,r.dts=t[0].dts,e=0;e<t.length;e++)(i=t[e]).keyFrame?(n.length&&(r.push(n),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration),(n=[i]).nalCount=i.length,n.byteLength=i.byteLength,n.pts=i.pts,n.dts=i.dts,n.duration=i.duration):(n.duration+=i.duration,n.nalCount+=i.length,n.byteLength+=i.byteLength,n.push(i));return r.length&&n.duration<=0&&(n.duration=r[r.length-1].duration),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration,r.push(n),r},Z=function(t){var e;return!t[0][0].keyFrame&&1<t.length&&(e=t.shift(),t.byteLength-=e.byteLength,t.nalCount-=e.nalCount,t[0][0].dts=e.dts,t[0][0].pts=e.pts,t[0][0].duration+=e.duration),t},tt=function(t,e){var i,n,r,a,s,o,u,l=e||0,c=[];for(i=0;i<t.length;i++)for(a=t[i],n=0;n<a.length;n++)s=a[n],o=s,u=void 0,(u={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}).dataOffset=l,u.compositionTimeOffset=o.pts-o.dts,u.duration=o.duration,u.size=4*o.length,u.size+=o.byteLength,o.keyFrame&&(u.flags.dependsOn=2,u.flags.isNonSyncSample=0),l+=(r=u).size,c.push(r);return c},et=function(t){var e,i,n,r,a,s,o=0,u=t.byteLength,l=t.nalCount,c=new Uint8Array(u+4*l),h=new DataView(c.buffer);for(e=0;e<t.length;e++)for(r=t[e],i=0;i<r.length;i++)for(a=r[i],n=0;n<a.length;n++)s=a[n],h.setUint32(o,s.data.byteLength),o+=4,c.set(s.data,o),o+=s.data.byteLength;return c},it=function(t){delete t.minSegmentDts,delete t.maxSegmentDts,delete t.minSegmentPts,delete t.maxSegmentPts},nt=function(t,e){var i,n=t.minSegmentDts;return e||(n-=t.timelineStartInfo.dts),i=t.timelineStartInfo.baseMediaDecodeTime,i+=n,i=Math.max(0,i),"audio"===t.type&&(i*=t.samplerate/9e4,i=Math.floor(i)),i},rt=function(t,e){"number"==typeof e.pts&&(void 0===t.timelineStartInfo.pts&&(t.timelineStartInfo.pts=e.pts),void 0===t.minSegmentPts?t.minSegmentPts=e.pts:t.minSegmentPts=Math.min(t.minSegmentPts,e.pts),void 0===t.maxSegmentPts?t.maxSegmentPts=e.pts:t.maxSegmentPts=Math.max(t.maxSegmentPts,e.pts)),"number"==typeof e.dts&&(void 0===t.timelineStartInfo.dts&&(t.timelineStartInfo.dts=e.dts),void 0===t.minSegmentDts?t.minSegmentDts=e.dts:t.minSegmentDts=Math.min(t.minSegmentDts,e.dts),void 0===t.maxSegmentDts?t.maxSegmentDts=e.dts:t.maxSegmentDts=Math.max(t.maxSegmentDts,e.dts))},at=function(t){for(var e=0,i={payloadType:-1,payloadSize:0},n=0,r=0;e<t.byteLength&&128!==t[e];){for(;255===t[e];)n+=255,e++;for(n+=t[e++];255===t[e];)r+=255,e++;if(r+=t[e++],!i.payload&&4===n){i.payloadType=n,i.payloadSize=r,i.payload=t.subarray(e,e+r);break}e+=r,r=n=0}return i},st=function(t){return 181!==t.payload[0]?null:49!=(t.payload[1]<<8|t.payload[2])?null:"GA94"!==String.fromCharCode(t.payload[3],t.payload[4],t.payload[5],t.payload[6])?null:3!==t.payload[7]?null:t.payload.subarray(8,t.payload.length-1)},ot=function(t,e){var i,n,r,a,s=[];if(!(64&e[0]))return s;for(n=31&e[0],i=0;i<n;i++)a={type:3&e[2+(r=3*i)],pts:t},4&e[r+2]&&(a.ccData=e[r+3]<<8|e[r+4],s.push(a));return s},ut=function(t){for(var e,i,n=t.byteLength,r=[],a=1;a<n-2;)0===t[a]&&0===t[a+1]&&3===t[a+2]?(r.push(a+2),a+=2):a++;if(0===r.length)return t;e=n-r.length,i=new Uint8Array(e);var s=0;for(a=0;a<e;s++,a++)s===r[0]&&(s++,r.shift()),i[a]=t[s];return i},lt=4,ct=function t(){t.prototype.init.call(this),this.captionPackets_=[],this.ccStreams_=[new mt(0,0),new mt(0,1),new mt(1,0),new mt(1,1)],this.reset(),this.ccStreams_.forEach(function(t){t.on("data",this.trigger.bind(this,"data")),t.on("done",this.trigger.bind(this,"done"))},this)};(ct.prototype=new K).push=function(t){var e,i,n;if("sei_rbsp"===t.nalUnitType&&(e=at(t.escapedRBSP)).payloadType===lt&&(i=st(e)))if(t.dts<this.latestDts_)this.ignoreNextEqualDts_=!0;else{if(t.dts===this.latestDts_&&this.ignoreNextEqualDts_)return this.numSameDts_--,void(this.numSameDts_||(this.ignoreNextEqualDts_=!1));n=ot(t.pts,i),this.captionPackets_=this.captionPackets_.concat(n),this.latestDts_!==t.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=t.dts}},ct.prototype.flush=function(){this.captionPackets_.length?(this.captionPackets_.forEach(function(t,e){t.presortIndex=e}),this.captionPackets_.sort(function(t,e){return t.pts===e.pts?t.presortIndex-e.presortIndex:t.pts-e.pts}),this.captionPackets_.forEach(function(t){t.type<2&&this.dispatchCea608Packet(t)},this),this.captionPackets_.length=0,this.ccStreams_.forEach(function(t){t.flush()},this)):this.ccStreams_.forEach(function(t){t.flush()},this)},ct.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(t){t.reset()})},ct.prototype.dispatchCea608Packet=function(t){this.setsChannel1Active(t)?this.activeCea608Channel_[t.type]=0:this.setsChannel2Active(t)&&(this.activeCea608Channel_[t.type]=1),null!==this.activeCea608Channel_[t.type]&&this.ccStreams_[(t.type<<1)+this.activeCea608Channel_[t.type]].push(t)},ct.prototype.setsChannel1Active=function(t){return 4096==(30720&t.ccData)},ct.prototype.setsChannel2Active=function(t){return 6144==(30720&t.ccData)};var ht={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},dt=function(t){return null===t?"":(t=ht[t]||t,String.fromCharCode(t))},pt=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],ft=function(){for(var t=[],e=15;e--;)t.push("");return t},mt=function t(e,i){t.prototype.init.call(this),this.field_=e||0,this.dataChannel_=i||0,this.name_="CC"+(1+(this.field_<<1|this.dataChannel_)),this.setConstants(),this.reset(),this.push=function(t){var e,i,n,r,a;if((e=32639&t.ccData)!==this.lastControlCode_){if(4096==(61440&e)?this.lastControlCode_=e:e!==this.PADDING_&&(this.lastControlCode_=null),n=e>>>8,r=255&e,e!==this.PADDING_)if(e===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(e===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(t.pts),this.flushDisplayed(t.pts),i=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=i,this.startPts_=t.pts;else if(e===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(t.pts);else if(e===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(t.pts);else if(e===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(t.pts);else if(e===this.CARRIAGE_RETURN_)this.clearFormatting(t.pts),this.flushDisplayed(t.pts),this.shiftRowsUp_(),this.startPts_=t.pts;else if(e===this.BACKSPACE_)"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1);else if(e===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(t.pts),this.displayed_=ft();else if(e===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=ft();else if(e===this.RESUME_DIRECT_CAPTIONING_)"paintOn"!==this.mode_&&(this.flushDisplayed(t.pts),this.displayed_=ft()),this.mode_="paintOn",this.startPts_=t.pts;else if(this.isSpecialCharacter(n,r))a=dt((n=(3&n)<<8)|r),this[this.mode_](t.pts,a),this.column_++;else if(this.isExtCharacter(n,r))"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1),a=dt((n=(3&n)<<8)|r),this[this.mode_](t.pts,a),this.column_++;else if(this.isMidRowCode(n,r))this.clearFormatting(t.pts),this[this.mode_](t.pts," "),this.column_++,14==(14&r)&&this.addFormatting(t.pts,["i"]),1==(1&r)&&this.addFormatting(t.pts,["u"]);else if(this.isOffsetControlCode(n,r))this.column_+=3&r;else if(this.isPAC(n,r)){var s=pt.indexOf(7968&e);"rollUp"===this.mode_&&this.setRollUp(t.pts,s),s!==this.row_&&(this.clearFormatting(t.pts),this.row_=s),1&r&&-1===this.formatting_.indexOf("u")&&this.addFormatting(t.pts,["u"]),16==(16&e)&&(this.column_=4*((14&e)>>1)),this.isColorPAC(r)&&14==(14&r)&&this.addFormatting(t.pts,["i"])}else this.isNormalChar(n)&&(0===r&&(r=null),a=dt(n),a+=dt(r),this[this.mode_](t.pts,a),this.column_+=a.length)}else this.lastControlCode_=null}};mt.prototype=new K,mt.prototype.flushDisplayed=function(t){var e=this.displayed_.map(function(t){return t.trim()}).join("\n").replace(/^\n+|\n+$/g,"");e.length&&this.trigger("data",{startPts:this.startPts_,endPts:t,text:e,stream:this.name_})},mt.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=ft(),this.nonDisplayed_=ft(),this.lastControlCode_=null,this.column_=0,this.row_=14,this.rollUpRows_=2,this.formatting_=[]},mt.prototype.setConstants=function(){0===this.dataChannel_?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):1===this.dataChannel_&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=32|this.CONTROL_,this.END_OF_CAPTION_=47|this.CONTROL_,this.ROLL_UP_2_ROWS_=37|this.CONTROL_,this.ROLL_UP_3_ROWS_=38|this.CONTROL_,this.ROLL_UP_4_ROWS_=39|this.CONTROL_,this.CARRIAGE_RETURN_=45|this.CONTROL_,this.RESUME_DIRECT_CAPTIONING_=41|this.CONTROL_,this.BACKSPACE_=33|this.CONTROL_,this.ERASE_DISPLAYED_MEMORY_=44|this.CONTROL_,this.ERASE_NON_DISPLAYED_MEMORY_=46|this.CONTROL_},mt.prototype.isSpecialCharacter=function(t,e){return t===this.EXT_&&48<=e&&e<=63},mt.prototype.isExtCharacter=function(t,e){return(t===this.EXT_+1||t===this.EXT_+2)&&32<=e&&e<=63},mt.prototype.isMidRowCode=function(t,e){return t===this.EXT_&&32<=e&&e<=47},mt.prototype.isOffsetControlCode=function(t,e){return t===this.OFFSET_&&33<=e&&e<=35},mt.prototype.isPAC=function(t,e){return t>=this.BASE_&&t<this.BASE_+8&&64<=e&&e<=127},mt.prototype.isColorPAC=function(t){return 64<=t&&t<=79||96<=t&&t<=127},mt.prototype.isNormalChar=function(t){return 32<=t&&t<=127},mt.prototype.setRollUp=function(t,e){if("rollUp"!==this.mode_&&(this.row_=14,this.mode_="rollUp",this.flushDisplayed(t),this.nonDisplayed_=ft(),this.displayed_=ft()),void 0!==e&&e!==this.row_)for(var i=0;i<this.rollUpRows_;i++)this.displayed_[e-i]=this.displayed_[this.row_-i],this.displayed_[this.row_-i]="";void 0===e&&(e=this.row_),this.topRow_=e-this.rollUpRows_+1},mt.prototype.addFormatting=function(t,e){this.formatting_=this.formatting_.concat(e);var i=e.reduce(function(t,e){return t+"<"+e+">"},"");this[this.mode_](t,i)},mt.prototype.clearFormatting=function(t){if(this.formatting_.length){var e=this.formatting_.reverse().reduce(function(t,e){return t+"</"+e+">"},"");this.formatting_=[],this[this.mode_](t,e)}},mt.prototype.popOn=function(t,e){var i=this.nonDisplayed_[this.row_];i+=e,this.nonDisplayed_[this.row_]=i},mt.prototype.rollUp=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i},mt.prototype.shiftRowsUp_=function(){var t;for(t=0;t<this.topRow_;t++)this.displayed_[t]="";for(t=this.row_+1;t<15;t++)this.displayed_[t]="";for(t=this.topRow_;t<this.row_;t++)this.displayed_[t]=this.displayed_[t+1];this.displayed_[this.row_]=""},mt.prototype.paintOn=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i};var gt={CaptionStream:ct,Cea608Stream:mt},yt={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},vt=function(t,e){var i=1;for(e<t&&(i=-1);4294967296<Math.abs(e-t);)t+=8589934592*i;return t},_t=function t(e){var i,n;t.prototype.init.call(this),this.type_=e,this.push=function(t){t.type===this.type_&&(void 0===n&&(n=t.dts),t.dts=vt(t.dts,n),t.pts=vt(t.pts,n),i=t.dts,this.trigger("data",t))},this.flush=function(){n=i,this.trigger("done")},this.discontinuity=function(){i=n=void 0}};_t.prototype=new K;var bt,Tt=_t,St=function(t,e,i){var n,r="";for(n=e;n<i;n++)r+="%"+("00"+t[n].toString(16)).slice(-2);return r},kt=function(t,e,i){return decodeURIComponent(St(t,e,i))},wt=function(t){return t[0]<<21|t[1]<<14|t[2]<<7|t[3]},Ct={TXXX:function(t){var e;if(3===t.data[0]){for(e=1;e<t.data.length;e++)if(0===t.data[e]){t.description=kt(t.data,1,e),t.value=kt(t.data,e+1,t.data.length).replace(/\0*$/,"");break}t.data=t.value}},WXXX:function(t){var e;if(3===t.data[0])for(e=1;e<t.data.length;e++)if(0===t.data[e]){t.description=kt(t.data,1,e),t.url=kt(t.data,e+1,t.data.length);break}},PRIV:function(t){var e,i;for(e=0;e<t.data.length;e++)if(0===t.data[e]){t.owner=(i=t.data,unescape(St(i,0,e)));break}t.privateData=t.data.subarray(e+1),t.data=t.privateData}};(bt=function(t){var e,u={debug:!(!t||!t.debug),descriptor:t&&t.descriptor},l=0,c=[],h=0;if(bt.prototype.init.call(this),this.dispatchType=yt.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(e=0;e<u.descriptor.length;e++)this.dispatchType+=("00"+u.descriptor[e].toString(16)).slice(-2);this.push=function(t){var e,i,n,r,a;if("timed-metadata"===t.type)if(t.dataAlignmentIndicator&&(h=0,c.length=0),0===c.length&&(t.data.length<10||t.data[0]!=="I".charCodeAt(0)||t.data[1]!=="D".charCodeAt(0)||t.data[2]!=="3".charCodeAt(0)))u.debug;else if(c.push(t),h+=t.data.byteLength,1===c.length&&(l=wt(t.data.subarray(6,10)),l+=10),!(h<l)){for(e={data:new Uint8Array(l),frames:[],pts:c[0].pts,dts:c[0].dts},a=0;a<l;)e.data.set(c[0].data.subarray(0,l-a),a),a+=c[0].data.byteLength,h-=c[0].data.byteLength,c.shift();i=10,64&e.data[5]&&(i+=4,i+=wt(e.data.subarray(10,14)),l-=wt(e.data.subarray(16,20)));do{if((n=wt(e.data.subarray(i+4,i+8)))<1)return;if((r={id:String.fromCharCode(e.data[i],e.data[i+1],e.data[i+2],e.data[i+3]),data:e.data.subarray(i+10,i+n+10)}).key=r.id,Ct[r.id]&&(Ct[r.id](r),"com.apple.streaming.transportStreamTimestamp"===r.owner)){var s=r.data,o=(1&s[3])<<30|s[4]<<22|s[5]<<14|s[6]<<6|s[7]>>>2;o*=4,o+=3&s[7],r.timeStamp=o,void 0===e.pts&&void 0===e.dts&&(e.pts=r.timeStamp,e.dts=r.timeStamp),this.trigger("timestamp",r)}e.frames.push(r),i+=10,i+=n}while(i<l);this.trigger("data",e)}}}).prototype=new K;var Et,At,Lt,Ot=bt,Pt=Tt;(Et=function(){var r=new Uint8Array(188),a=0;Et.prototype.init.call(this),this.push=function(t){var e,i=0,n=188;for(a?((e=new Uint8Array(t.byteLength+a)).set(r.subarray(0,a)),e.set(t,a),a=0):e=t;n<e.byteLength;)71!==e[i]||71!==e[n]?(i++,n++):(this.trigger("data",e.subarray(i,n)),i+=188,n+=188);i<e.byteLength&&(r.set(e.subarray(i),0),a=e.byteLength-i)},this.flush=function(){188===a&&71===r[0]&&(this.trigger("data",r),a=0),this.trigger("done")}}).prototype=new K,(At=function(){var n,r,a,s;At.prototype.init.call(this),(s=this).packetsWaitingForPmt=[],this.programMapTable=void 0,n=function(t,e){var i=0;e.payloadUnitStartIndicator&&(i+=t[i]+1),"pat"===e.type?r(t.subarray(i),e):a(t.subarray(i),e)},r=function(t,e){e.section_number=t[7],e.last_section_number=t[8],s.pmtPid=(31&t[10])<<8|t[11],e.pmtPid=s.pmtPid},a=function(t,e){var i,n;if(1&t[5]){for(s.programMapTable={video:null,audio:null,"timed-metadata":{}},i=3+((15&t[1])<<8|t[2])-4,n=12+((15&t[10])<<8|t[11]);n<i;){var r=t[n],a=(31&t[n+1])<<8|t[n+2];r===yt.H264_STREAM_TYPE&&null===s.programMapTable.video?s.programMapTable.video=a:r===yt.ADTS_STREAM_TYPE&&null===s.programMapTable.audio?s.programMapTable.audio=a:r===yt.METADATA_STREAM_TYPE&&(s.programMapTable["timed-metadata"][a]=r),n+=5+((15&t[n+3])<<8|t[n+4])}e.programMapTable=s.programMapTable}},this.push=function(t){var e={},i=4;if(e.payloadUnitStartIndicator=!!(64&t[1]),e.pid=31&t[1],e.pid<<=8,e.pid|=t[2],1<(48&t[3])>>>4&&(i+=t[i]+1),0===e.pid)e.type="pat",n(t.subarray(i),e),this.trigger("data",e);else if(e.pid===this.pmtPid)for(e.type="pmt",n(t.subarray(i),e),this.trigger("data",e);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else void 0===this.programMapTable?this.packetsWaitingForPmt.push([t,i,e]):this.processPes_(t,i,e)},this.processPes_=function(t,e,i){i.pid===this.programMapTable.video?i.streamType=yt.H264_STREAM_TYPE:i.pid===this.programMapTable.audio?i.streamType=yt.ADTS_STREAM_TYPE:i.streamType=this.programMapTable["timed-metadata"][i.pid],i.type="pes",i.data=t.subarray(e),this.trigger("data",i)}}).prototype=new K,At.STREAM_TYPES={h264:27,adts:15},(Lt=function(){var d=this,n={data:[],size:0},r={data:[],size:0},a={data:[],size:0},s=function(t,e,i){var n,r,a=new Uint8Array(t.size),s={type:e},o=0,u=0;if(t.data.length&&!(t.size<9)){for(s.trackId=t.data[0].pid,o=0;o<t.data.length;o++)r=t.data[o],a.set(r.data,u),u+=r.data.byteLength;var l,c,h;l=a,(c=s).packetLength=6+(l[4]<<8|l[5]),c.dataAlignmentIndicator=0!=(4&l[6]),192&(h=l[7])&&(c.pts=(14&l[9])<<27|(255&l[10])<<20|(254&l[11])<<12|(255&l[12])<<5|(254&l[13])>>>3,c.pts*=4,c.pts+=(6&l[13])>>>1,c.dts=c.pts,64&h&&(c.dts=(14&l[14])<<27|(255&l[15])<<20|(254&l[16])<<12|(255&l[17])<<5|(254&l[18])>>>3,c.dts*=4,c.dts+=(6&l[18])>>>1)),c.data=l.subarray(9+l[8]),n="video"===e||s.packetLength<=t.size,(i||n)&&(t.size=0,t.data.length=0),n&&d.trigger("data",s)}};Lt.prototype.init.call(this),this.push=function(i){({pat:function(){},pes:function(){var t,e;switch(i.streamType){case yt.H264_STREAM_TYPE:case yt.H264_STREAM_TYPE:t=n,e="video";break;case yt.ADTS_STREAM_TYPE:t=r,e="audio";break;case yt.METADATA_STREAM_TYPE:t=a,e="timed-metadata";break;default:return}i.payloadUnitStartIndicator&&s(t,e,!0),t.data.push(i),t.size+=i.data.byteLength},pmt:function(){var t={type:"metadata",tracks:[]},e=i.programMapTable;null!==e.video&&t.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.video,codec:"avc",type:"video"}),null!==e.audio&&t.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.audio,codec:"adts",type:"audio"}),d.trigger("data",t)}})[i.type]()},this.flush=function(){s(n,"video"),s(r,"audio"),s(a,"timed-metadata"),this.trigger("done")}}).prototype=new K;var Ut={PAT_PID:0,MP2T_PACKET_LENGTH:188,TransportPacketStream:Et,TransportParseStream:At,ElementaryStream:Lt,TimestampRolloverStream:Pt,CaptionStream:gt.CaptionStream,Cea608Stream:gt.Cea608Stream,MetadataStream:Ot};for(var xt in yt)yt.hasOwnProperty(xt)&&(Ut[xt]=yt[xt]);var It,Dt=Ut,Rt=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];(It=function(){var l;It.prototype.init.call(this),this.push=function(t){var e,i,n,r,a,s,o=0,u=0;if("audio"===t.type)for(l?(r=l,(l=new Uint8Array(r.byteLength+t.data.byteLength)).set(r),l.set(t.data,r.byteLength)):l=t.data;o+5<l.length;)if(255===l[o]&&240==(246&l[o+1])){if(i=2*(1&~l[o+1]),e=(3&l[o+3])<<11|l[o+4]<<3|(224&l[o+5])>>5,s=9e4*(a=1024*(1+(3&l[o+6])))/Rt[(60&l[o+2])>>>2],n=o+e,l.byteLength<n)return;if(this.trigger("data",{pts:t.pts+u*s,dts:t.dts+u*s,sampleCount:a,audioobjecttype:1+(l[o+2]>>>6&3),channelcount:(1&l[o+2])<<2|(192&l[o+3])>>>6,samplerate:Rt[(60&l[o+2])>>>2],samplingfrequencyindex:(60&l[o+2])>>>2,samplesize:16,data:l.subarray(o+7+i,n)}),l.byteLength===n)return void(l=void 0);u++,l=l.subarray(n)}else o++},this.flush=function(){this.trigger("done")}}).prototype=new K;var Mt,Bt,Nt,jt=It,Ft=function(n){var r=n.byteLength,a=0,s=0;this.length=function(){return 8*r},this.bitsAvailable=function(){return 8*r+s},this.loadWord=function(){var t=n.byteLength-r,e=new Uint8Array(4),i=Math.min(4,r);if(0===i)throw new Error("no bytes available");e.set(n.subarray(t,t+i)),a=new DataView(e.buffer).getUint32(0),s=8*i,r-=i},this.skipBits=function(t){var e;t<s||(t-=s,t-=8*(e=Math.floor(t/8)),r-=e,this.loadWord()),a<<=t,s-=t},this.readBits=function(t){var e=Math.min(s,t),i=a>>>32-e;return 0<(s-=e)?a<<=e:0<r&&this.loadWord(),0<(e=t-e)?i<<e|this.readBits(e):i},this.skipLeadingZeros=function(){var t;for(t=0;t<s;++t)if(0!=(a&2147483648>>>t))return a<<=t,s-=t,t;return this.loadWord(),t+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var t=this.skipLeadingZeros();return this.readBits(t+1)-1},this.readExpGolomb=function(){var t=this.readUnsignedExpGolomb();return 1&t?1+t>>>1:-1*(t>>>1)},this.readBoolean=function(){return 1===this.readBits(1)},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};(Bt=function(){var i,n,r=0;Bt.prototype.init.call(this),this.push=function(t){var e;for(n=n?((e=new Uint8Array(n.byteLength+t.data.byteLength)).set(n),e.set(t.data,n.byteLength),e):t.data;r<n.byteLength-3;r++)if(1===n[r+2]){i=r+5;break}for(;i<n.byteLength;)switch(n[i]){case 0:if(0!==n[i-1]){i+=2;break}if(0!==n[i-2]){i++;break}for(r+3!==i-2&&this.trigger("data",n.subarray(r+3,i-2));1!==n[++i]&&i<n.length;);r=i-2,i+=3;break;case 1:if(0!==n[i-1]||0!==n[i-2]){i+=3;break}this.trigger("data",n.subarray(r+3,i-2)),r=i-2,i+=3;break;default:i+=3}n=n.subarray(r),i-=r,r=0},this.flush=function(){n&&3<n.byteLength&&this.trigger("data",n.subarray(r+3)),n=null,r=0,this.trigger("done")}}).prototype=new K,Nt={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},(Mt=function(){var i,n,r,a,s,o,_,e=new Bt;Mt.prototype.init.call(this),(i=this).push=function(t){"video"===t.type&&(n=t.trackId,r=t.pts,a=t.dts,e.push(t))},e.on("data",function(t){var e={trackId:n,pts:r,dts:a,data:t};switch(31&t[0]){case 5:e.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:e.nalUnitType="sei_rbsp",e.escapedRBSP=s(t.subarray(1));break;case 7:e.nalUnitType="seq_parameter_set_rbsp",e.escapedRBSP=s(t.subarray(1)),e.config=o(e.escapedRBSP);break;case 8:e.nalUnitType="pic_parameter_set_rbsp";break;case 9:e.nalUnitType="access_unit_delimiter_rbsp"}i.trigger("data",e)}),e.on("done",function(){i.trigger("done")}),this.flush=function(){e.flush()},_=function(t,e){var i,n=8,r=8;for(i=0;i<t;i++)0!==r&&(r=(n+e.readExpGolomb()+256)%256),n=0===r?n:r},s=function(t){for(var e,i,n=t.byteLength,r=[],a=1;a<n-2;)0===t[a]&&0===t[a+1]&&3===t[a+2]?(r.push(a+2),a+=2):a++;if(0===r.length)return t;e=n-r.length,i=new Uint8Array(e);var s=0;for(a=0;a<e;s++,a++)s===r[0]&&(s++,r.shift()),i[a]=t[s];return i},o=function(t){var e,i,n,r,a,s,o,u,l,c,h,d,p,f=0,m=0,g=0,y=0,v=1;if(i=(e=new Ft(t)).readUnsignedByte(),r=e.readUnsignedByte(),n=e.readUnsignedByte(),e.skipUnsignedExpGolomb(),Nt[i]&&(3===(a=e.readUnsignedExpGolomb())&&e.skipBits(1),e.skipUnsignedExpGolomb(),e.skipUnsignedExpGolomb(),e.skipBits(1),e.readBoolean()))for(h=3!==a?8:12,p=0;p<h;p++)e.readBoolean()&&_(p<6?16:64,e);if(e.skipUnsignedExpGolomb(),0===(s=e.readUnsignedExpGolomb()))e.readUnsignedExpGolomb();else if(1===s)for(e.skipBits(1),e.skipExpGolomb(),e.skipExpGolomb(),o=e.readUnsignedExpGolomb(),p=0;p<o;p++)e.skipExpGolomb();if(e.skipUnsignedExpGolomb(),e.skipBits(1),u=e.readUnsignedExpGolomb(),l=e.readUnsignedExpGolomb(),0===(c=e.readBits(1))&&e.skipBits(1),e.skipBits(1),e.readBoolean()&&(f=e.readUnsignedExpGolomb(),m=e.readUnsignedExpGolomb(),g=e.readUnsignedExpGolomb(),y=e.readUnsignedExpGolomb()),e.readBoolean()&&e.readBoolean()){switch(e.readUnsignedByte()){case 1:d=[1,1];break;case 2:d=[12,11];break;case 3:d=[10,11];break;case 4:d=[16,11];break;case 5:d=[40,33];break;case 6:d=[24,11];break;case 7:d=[20,11];break;case 8:d=[32,11];break;case 9:d=[80,33];break;case 10:d=[18,11];break;case 11:d=[15,11];break;case 12:d=[64,33];break;case 13:d=[160,99];break;case 14:d=[4,3];break;case 15:d=[3,2];break;case 16:d=[2,1];break;case 255:d=[e.readUnsignedByte()<<8|e.readUnsignedByte(),e.readUnsignedByte()<<8|e.readUnsignedByte()]}d&&(v=d[0]/d[1])}return{profileIdc:i,levelIdc:n,profileCompatibility:r,width:Math.ceil((16*(u+1)-2*f-2*m)*v),height:(2-c)*(l+1)*16-2*g-2*y}}}).prototype=new K;var Vt,Ht={H264Stream:Mt,NalByteStream:Bt};(Vt=function(){var o=new Uint8Array,u=0;Vt.prototype.init.call(this),this.setTimestamp=function(t){u=t},this.parseId3TagSize=function(t,e){var i=t[e+6]<<21|t[e+7]<<14|t[e+8]<<7|t[e+9];return(16&t[e+5])>>4?i+20:i+10},this.parseAdtsSize=function(t,e){var i=(224&t[e+5])>>5,n=t[e+4]<<3;return 6144&t[e+3]|n|i},this.push=function(t){var e,i,n,r,a=0,s=0;for(o.length?(r=o.length,(o=new Uint8Array(t.byteLength+r)).set(o.subarray(0,r)),o.set(t,r)):o=t;3<=o.length-s;)if(o[s]!=="I".charCodeAt(0)||o[s+1]!=="D".charCodeAt(0)||o[s+2]!=="3".charCodeAt(0))if(!0&o[s]&&240==(240&o[s+1])){if(o.length-s<7)break;if((a=this.parseAdtsSize(o,s))>o.length)break;n={type:"audio",data:o.subarray(s,s+a),pts:u,dts:u},this.trigger("data",n),s+=a}else s++;else{if(o.length-s<10)break;if((a=this.parseId3TagSize(o,s))>o.length)break;i={type:"timed-metadata",data:o.subarray(s,s+a)},this.trigger("data",i),s+=a}e=o.length-s,o=0<e?o.subarray(s):new Uint8Array}}).prototype=new K;var qt,zt,Wt,Gt,Xt,Yt,$t,Kt=Vt,Qt=[33,16,5,32,164,27],Jt=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],Zt=function(t){for(var e=[];t--;)e.push(0);return e},te={96e3:[Qt,[227,64],Zt(154),[56]],88200:[Qt,[231],Zt(170),[56]],64e3:[Qt,[248,192],Zt(240),[56]],48e3:[Qt,[255,192],Zt(268),[55,148,128],Zt(54),[112]],44100:[Qt,[255,192],Zt(268),[55,163,128],Zt(84),[112]],32e3:[Qt,[255,192],Zt(268),[55,234],Zt(226),[112]],24e3:[Qt,[255,192],Zt(268),[55,255,128],Zt(268),[111,112],Zt(126),[224]],16e3:[Qt,[255,192],Zt(268),[55,255,128],Zt(268),[111,255],Zt(269),[223,108],Zt(195),[1,192]],12e3:[Jt,Zt(268),[3,127,248],Zt(268),[6,255,240],Zt(268),[13,255,224],Zt(268),[27,253,128],Zt(259),[56]],11025:[Jt,Zt(268),[3,127,248],Zt(268),[6,255,240],Zt(268),[13,255,224],Zt(268),[27,255,192],Zt(268),[55,175,128],Zt(108),[112]],8e3:[Jt,Zt(268),[3,121,16],Zt(47),[7]]},ee=(qt=te,Object.keys(qt).reduce(function(t,e){return t[e]=new Uint8Array(qt[e].reduce(function(t,e){return t.concat(e)},[])),t},{}));Yt=function(t,e){return zt(Xt(t,e))},$t=function(t,e){return Wt(Gt(t),e)};zt=function(t){return 9e4*t},Wt=function(t,e){return t*e},Gt=function(t){return t/9e4},Xt=function(t,e){return t/e};var ie,ne,re,ae,se,oe,ue,le=Yt,ce=$t,he=Ht.H264Stream,de=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],pe=["width","height","profileIdc","levelIdc","profileCompatibility"];se=function(t){return t[0]==="I".charCodeAt(0)&&t[1]==="D".charCodeAt(0)&&t[2]==="3".charCodeAt(0)},oe=function(t,e){var i;if(t.length!==e.length)return!1;for(i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0},ue=function(t){var e,i=0;for(e=0;e<t.length;e++)i+=t[e].data.byteLength;return i},(ne=function(r,a){var s=[],o=0,e=0,l=0,c=1/0;a=a||{},ne.prototype.init.call(this),this.push=function(e){rt(r,e),r&&de.forEach(function(t){r[t]=e[t]}),s.push(e)},this.setEarliestDts=function(t){e=t-r.timelineStartInfo.baseMediaDecodeTime},this.setVideoBaseMediaDecodeTime=function(t){c=t},this.setAudioAppendStart=function(t){l=t},this.flush=function(){var t,e,i,n;0!==s.length&&(t=this.trimAdtsFramesByEarliestDts_(s),r.baseMediaDecodeTime=nt(r,a.keepOriginalTimestamps),this.prefixWithSilence_(r,t),r.samples=this.generateSampleTable_(t),i=G.mdat(this.concatenateFrameData_(t)),s=[],e=G.moof(o,[r]),n=new Uint8Array(e.byteLength+i.byteLength),o++,n.set(e),n.set(i,e.byteLength),it(r),this.trigger("data",{track:r,boxes:n})),this.trigger("done","AudioSegmentStream")},this.prefixWithSilence_=function(t,e){var i,n,r,a,s=0,o=0,u=0;if(e.length&&(i=le(t.baseMediaDecodeTime,t.samplerate),n=Math.ceil(9e4/(t.samplerate/1024)),l&&c&&(s=i-Math.max(l,c),u=(o=Math.floor(s/n))*n),!(o<1||45e3<u))){for((r=ee[t.samplerate])||(r=e[0].data),a=0;a<o;a++)e.splice(a,0,{data:r});t.baseMediaDecodeTime-=Math.floor(ce(u,t.samplerate))}},this.trimAdtsFramesByEarliestDts_=function(t){return r.minSegmentDts>=e?t:(r.minSegmentDts=1/0,t.filter(function(t){return t.dts>=e&&(r.minSegmentDts=Math.min(r.minSegmentDts,t.dts),r.minSegmentPts=r.minSegmentDts,!0)}))},this.generateSampleTable_=function(t){var e,i,n=[];for(e=0;e<t.length;e++)i=t[e],n.push({size:i.data.byteLength,duration:1024});return n},this.concatenateFrameData_=function(t){var e,i,n=0,r=new Uint8Array(ue(t));for(e=0;e<t.length;e++)i=t[e],r.set(i.data,n),n+=i.data.byteLength;return r}}).prototype=new K,(ie=function(o,u){var e,i,l=0,c=[],h=[];u=u||{},ie.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(t){rt(o,t),"seq_parameter_set_rbsp"!==t.nalUnitType||e||(e=t.config,o.sps=[t.data],pe.forEach(function(t){o[t]=e[t]},this)),"pic_parameter_set_rbsp"!==t.nalUnitType||i||(i=t.data,o.pps=[t.data]),c.push(t)},this.flush=function(){for(var t,e,i,n,r,a;c.length&&"access_unit_delimiter_rbsp"!==c[0].nalUnitType;)c.shift();if(0===c.length)return this.resetStream_(),void this.trigger("done","VideoSegmentStream");if(t=Q(c),(i=J(t))[0][0].keyFrame||((e=this.getGopForFusion_(c[0],o))?(i.unshift(e),i.byteLength+=e.byteLength,i.nalCount+=e.nalCount,i.pts=e.pts,i.dts=e.dts,i.duration+=e.duration):i=Z(i)),h.length){var s;if(!(s=u.alignGopsAtEnd?this.alignGopsAtEnd_(i):this.alignGopsAtStart_(i)))return this.gopCache_.unshift({gop:i.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.resetStream_(),void this.trigger("done","VideoSegmentStream");it(o),i=s}rt(o,i),o.samples=tt(i),r=G.mdat(et(i)),o.baseMediaDecodeTime=nt(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",i.map(function(t){return{pts:t.pts,dts:t.dts,byteLength:t.byteLength}})),this.gopCache_.unshift({gop:i.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),n=G.moof(l,[o]),a=new Uint8Array(n.byteLength+r.byteLength),l++,a.set(n),a.set(r,n.byteLength),this.trigger("data",{track:o,boxes:a}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.resetStream_=function(){it(o),i=e=void 0},this.getGopForFusion_=function(t){var e,i,n,r,a,s=1/0;for(a=0;a<this.gopCache_.length;a++)n=(r=this.gopCache_[a]).gop,o.pps&&oe(o.pps[0],r.pps[0])&&o.sps&&oe(o.sps[0],r.sps[0])&&(n.dts<o.timelineStartInfo.dts||-1e4<=(e=t.dts-n.dts-n.duration)&&e<=45e3&&(!i||e<s)&&(i=r,s=e));return i?i.gop:null},this.alignGopsAtStart_=function(t){var e,i,n,r,a,s,o,u;for(a=t.byteLength,s=t.nalCount,o=t.duration,e=i=0;e<h.length&&i<t.length&&(n=h[e],r=t[i],n.pts!==r.pts);)r.pts>n.pts?e++:(i++,a-=r.byteLength,s-=r.nalCount,o-=r.duration);return 0===i?t:i===t.length?null:((u=t.slice(i)).byteLength=a,u.duration=o,u.nalCount=s,u.pts=u[0].pts,u.dts=u[0].dts,u)},this.alignGopsAtEnd_=function(t){var e,i,n,r,a,s,o;for(e=h.length-1,i=t.length-1,a=null,s=!1;0<=e&&0<=i;){if(n=h[e],r=t[i],n.pts===r.pts){s=!0;break}n.pts>r.pts?e--:(e===h.length-1&&(a=i),i--)}if(!s&&null===a)return null;if(0===(o=s?i:a))return t;var u=t.slice(o),l=u.reduce(function(t,e){return t.byteLength+=e.byteLength,t.duration+=e.duration,t.nalCount+=e.nalCount,t},{byteLength:0,duration:0,nalCount:0});return u.byteLength=l.byteLength,u.duration=l.duration,u.nalCount=l.nalCount,u.pts=u[0].pts,u.dts=u[0].dts,u},this.alignGopsWith=function(t){h=t}}).prototype=new K,(ae=function(t,e){this.numberOfTracks=0,this.metadataStream=e,"undefined"!=typeof t.remux?this.remuxTracks=!!t.remux:this.remuxTracks=!0,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,ae.prototype.init.call(this),this.push=function(t){return t.text?this.pendingCaptions.push(t):t.frames?this.pendingMetadata.push(t):(this.pendingTracks.push(t.track),this.pendingBoxes.push(t.boxes),this.pendingBytes+=t.boxes.byteLength,"video"===t.track.type&&(this.videoTrack=t.track),void("audio"===t.track.type&&(this.audioTrack=t.track)))}}).prototype=new K,ae.prototype.flush=function(t){var e,i,n,r,a=0,s={captions:[],captionStreams:{},metadata:[],info:{}},o=0;if(this.pendingTracks.length<this.numberOfTracks){if("VideoSegmentStream"!==t&&"AudioSegmentStream"!==t)return;if(this.remuxTracks)return;if(0===this.pendingTracks.length)return this.emittedTracks++,void(this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0))}for(this.videoTrack?(o=this.videoTrack.timelineStartInfo.pts,pe.forEach(function(t){s.info[t]=this.videoTrack[t]},this)):this.audioTrack&&(o=this.audioTrack.timelineStartInfo.pts,de.forEach(function(t){s.info[t]=this.audioTrack[t]},this)),1===this.pendingTracks.length?s.type=this.pendingTracks[0].type:s.type="combined",this.emittedTracks+=this.pendingTracks.length,n=G.initSegment(this.pendingTracks),s.initSegment=new Uint8Array(n.byteLength),s.initSegment.set(n),s.data=new Uint8Array(this.pendingBytes),r=0;r<this.pendingBoxes.length;r++)s.data.set(this.pendingBoxes[r],a),a+=this.pendingBoxes[r].byteLength;for(r=0;r<this.pendingCaptions.length;r++)(e=this.pendingCaptions[r]).startTime=e.startPts-o,e.startTime/=9e4,e.endTime=e.endPts-o,e.endTime/=9e4,s.captionStreams[e.stream]=!0,s.captions.push(e);for(r=0;r<this.pendingMetadata.length;r++)(i=this.pendingMetadata[r]).cueTime=i.pts-o,i.cueTime/=9e4,s.metadata.push(i);s.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",s),this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},(re=function(n){var r,a,s=this,i=!0;re.prototype.init.call(this),n=n||{},this.baseMediaDecodeTime=n.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var e={};(this.transmuxPipeline_=e).type="aac",e.metadataStream=new Dt.MetadataStream,e.aacStream=new Kt,e.audioTimestampRolloverStream=new Dt.TimestampRolloverStream("audio"),e.timedMetadataTimestampRolloverStream=new Dt.TimestampRolloverStream("timed-metadata"),e.adtsStream=new jt,e.coalesceStream=new ae(n,e.metadataStream),e.headOfPipeline=e.aacStream,e.aacStream.pipe(e.audioTimestampRolloverStream).pipe(e.adtsStream),e.aacStream.pipe(e.timedMetadataTimestampRolloverStream).pipe(e.metadataStream).pipe(e.coalesceStream),e.metadataStream.on("timestamp",function(t){e.aacStream.setTimestamp(t.timeStamp)}),e.aacStream.on("data",function(t){"timed-metadata"!==t.type||e.audioSegmentStream||(a=a||{timelineStartInfo:{baseMediaDecodeTime:s.baseMediaDecodeTime},codec:"adts",type:"audio"},e.coalesceStream.numberOfTracks++,e.audioSegmentStream=new ne(a,n),e.adtsStream.pipe(e.audioSegmentStream).pipe(e.coalesceStream))}),e.coalesceStream.on("data",this.trigger.bind(this,"data")),e.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setupTsPipeline=function(){var i={};(this.transmuxPipeline_=i).type="ts",i.metadataStream=new Dt.MetadataStream,i.packetStream=new Dt.TransportPacketStream,i.parseStream=new Dt.TransportParseStream,i.elementaryStream=new Dt.ElementaryStream,i.videoTimestampRolloverStream=new Dt.TimestampRolloverStream("video"),i.audioTimestampRolloverStream=new Dt.TimestampRolloverStream("audio"),i.timedMetadataTimestampRolloverStream=new Dt.TimestampRolloverStream("timed-metadata"),i.adtsStream=new jt,i.h264Stream=new he,i.captionStream=new Dt.CaptionStream,i.coalesceStream=new ae(n,i.metadataStream),i.headOfPipeline=i.packetStream,i.packetStream.pipe(i.parseStream).pipe(i.elementaryStream),i.elementaryStream.pipe(i.videoTimestampRolloverStream).pipe(i.h264Stream),i.elementaryStream.pipe(i.audioTimestampRolloverStream).pipe(i.adtsStream),i.elementaryStream.pipe(i.timedMetadataTimestampRolloverStream).pipe(i.metadataStream).pipe(i.coalesceStream),i.h264Stream.pipe(i.captionStream).pipe(i.coalesceStream),i.elementaryStream.on("data",function(t){var e;if("metadata"===t.type){for(e=t.tracks.length;e--;)r||"video"!==t.tracks[e].type?a||"audio"!==t.tracks[e].type||((a=t.tracks[e]).timelineStartInfo.baseMediaDecodeTime=s.baseMediaDecodeTime):(r=t.tracks[e]).timelineStartInfo.baseMediaDecodeTime=s.baseMediaDecodeTime;r&&!i.videoSegmentStream&&(i.coalesceStream.numberOfTracks++,i.videoSegmentStream=new ie(r,n),i.videoSegmentStream.on("timelineStartInfo",function(t){a&&(a.timelineStartInfo=t,i.audioSegmentStream.setEarliestDts(t.dts))}),i.videoSegmentStream.on("processedGopsInfo",s.trigger.bind(s,"gopInfo")),i.videoSegmentStream.on("baseMediaDecodeTime",function(t){a&&i.audioSegmentStream.setVideoBaseMediaDecodeTime(t)}),i.h264Stream.pipe(i.videoSegmentStream).pipe(i.coalesceStream)),a&&!i.audioSegmentStream&&(i.coalesceStream.numberOfTracks++,i.audioSegmentStream=new ne(a,n),i.adtsStream.pipe(i.audioSegmentStream).pipe(i.coalesceStream))}}),i.coalesceStream.on("data",this.trigger.bind(this,"data")),i.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setBaseMediaDecodeTime=function(t){var e=this.transmuxPipeline_;this.baseMediaDecodeTime=t,a&&(a.timelineStartInfo.dts=void 0,a.timelineStartInfo.pts=void 0,it(a),a.timelineStartInfo.baseMediaDecodeTime=t,e.audioTimestampRolloverStream&&e.audioTimestampRolloverStream.discontinuity()),r&&(e.videoSegmentStream&&(e.videoSegmentStream.gopCache_=[],e.videoTimestampRolloverStream.discontinuity()),r.timelineStartInfo.dts=void 0,r.timelineStartInfo.pts=void 0,it(r),e.captionStream.reset(),r.timelineStartInfo.baseMediaDecodeTime=t),e.timedMetadataTimestampRolloverStream&&e.timedMetadataTimestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(t){a&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(t)},this.alignGopsWith=function(t){r&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(t)},this.push=function(t){if(i){var e=se(t);e&&"aac"!==this.transmuxPipeline_.type?this.setupAacPipeline():e||"ts"===this.transmuxPipeline_.type||this.setupTsPipeline(),i=!1}this.transmuxPipeline_.headOfPipeline.push(t)},this.flush=function(){i=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}}).prototype=new K;var fe,me,ge={Transmuxer:re,VideoSegmentStream:ie,AudioSegmentStream:ne,AUDIO_PROPERTIES:de,VIDEO_PROPERTIES:pe},ye=Y.parseType,ve=function(t){return new Date(1e3*t-20828448e5)},_e=function(t){return{isLeading:(12&t[0])>>>2,dependsOn:3&t[0],isDependedOn:(192&t[1])>>>6,hasRedundancy:(48&t[1])>>>4,paddingValue:(14&t[1])>>>1,isNonSyncSample:1&t[1],degradationPriority:t[2]<<8|t[3]}},be={avc1:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{dataReferenceIndex:e.getUint16(6),width:e.getUint16(24),height:e.getUint16(26),horizresolution:e.getUint16(28)+e.getUint16(30)/16,vertresolution:e.getUint16(32)+e.getUint16(34)/16,frameCount:e.getUint16(40),depth:e.getUint16(74),config:fe(t.subarray(78,t.byteLength))}},avcC:function(t){var e,i,n,r,a=new DataView(t.buffer,t.byteOffset,t.byteLength),s={configurationVersion:t[0],avcProfileIndication:t[1],profileCompatibility:t[2],avcLevelIndication:t[3],lengthSizeMinusOne:3&t[4],sps:[],pps:[]},o=31&t[5];for(n=6,r=0;r<o;r++)i=a.getUint16(n),n+=2,s.sps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;for(e=t[n],n++,r=0;r<e;r++)i=a.getUint16(n),n+=2,s.pps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;return s},btrt:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{bufferSizeDB:e.getUint32(0),maxBitrate:e.getUint32(4),avgBitrate:e.getUint32(8)}},esds:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),esId:t[6]<<8|t[7],streamPriority:31&t[8],decoderConfig:{objectProfileIndication:t[11],streamType:t[12]>>>2&63,bufferSize:t[13]<<16|t[14]<<8|t[15],maxBitrate:t[16]<<24|t[17]<<16|t[18]<<8|t[19],avgBitrate:t[20]<<24|t[21]<<16|t[22]<<8|t[23],decoderConfigDescriptor:{tag:t[24],length:t[25],audioObjectType:t[26]>>>3&31,samplingFrequencyIndex:(7&t[26])<<1|t[27]>>>7&1,channelConfiguration:t[27]>>>3&15}}}},ftyp:function(t){for(var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={majorBrand:ye(t.subarray(0,4)),minorVersion:e.getUint32(4),compatibleBrands:[]},n=8;n<t.byteLength;)i.compatibleBrands.push(ye(t.subarray(n,n+4))),n+=4;return i},dinf:function(t){return{boxes:fe(t)}},dref:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),dataReferences:fe(t.subarray(8))}},hdlr:function(t){var e={version:new DataView(t.buffer,t.byteOffset,t.byteLength).getUint8(0),flags:new Uint8Array(t.subarray(1,4)),handlerType:ye(t.subarray(8,12)),name:""},i=8;for(i=24;i<t.byteLength;i++){if(0===t[i]){i++;break}e.name+=String.fromCharCode(t[i])}return e.name=decodeURIComponent(escape(e.name)),e},mdat:function(t){return{byteLength:t.byteLength,nals:function(t){var e,i,n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=[];for(e=0;e+4<t.length;e+=i)if(i=n.getUint32(e),e+=4,i<=0)r.push("<span style='color:red;'>MALFORMED DATA</span>");else switch(31&t[e]){case 1:r.push("slice_layer_without_partitioning_rbsp");break;case 5:r.push("slice_layer_without_partitioning_rbsp_idr");break;case 6:r.push("sei_rbsp");break;case 7:r.push("seq_parameter_set_rbsp");break;case 8:r.push("pic_parameter_set_rbsp");break;case 9:r.push("access_unit_delimiter_rbsp");break;default:r.push("UNKNOWN NAL - "+t[e]&31)}return r}(t)}},mdhd:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=4,r={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),language:""};return 1===r.version?(n+=4,r.creationTime=ve(i.getUint32(n)),n+=8,r.modificationTime=ve(i.getUint32(n)),n+=4,r.timescale=i.getUint32(n),n+=8):(r.creationTime=ve(i.getUint32(n)),n+=4,r.modificationTime=ve(i.getUint32(n)),n+=4,r.timescale=i.getUint32(n),n+=4),r.duration=i.getUint32(n),n+=4,e=i.getUint16(n),r.language+=String.fromCharCode(96+(e>>10)),r.language+=String.fromCharCode(96+((992&e)>>5)),r.language+=String.fromCharCode(96+(31&e)),r},mdia:function(t){return{boxes:fe(t)}},mfhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sequenceNumber:t[4]<<24|t[5]<<16|t[6]<<8|t[7]}},minf:function(t){return{boxes:fe(t)}},mp4a:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={dataReferenceIndex:e.getUint16(6),channelcount:e.getUint16(16),samplesize:e.getUint16(18),samplerate:e.getUint16(24)+e.getUint16(26)/65536};return 28<t.byteLength&&(i.streamDescriptor=fe(t.subarray(28))[0]),i},moof:function(t){return{boxes:fe(t)}},moov:function(t){return{boxes:fe(t)}},mvex:function(t){return{boxes:fe(t)}},mvhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=ve(e.getUint32(i)),i+=8,n.modificationTime=ve(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=8):(n.creationTime=ve(e.getUint32(i)),i+=4,n.modificationTime=ve(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=4),n.duration=e.getUint32(i),i+=4,n.rate=e.getUint16(i)+e.getUint16(i+2)/16,i+=4,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,i+=8,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,i+=24,n.nextTrackId=e.getUint32(i),n},pdin:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),rate:e.getUint32(4),initialDelay:e.getUint32(8)}},sdtp:function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]};for(e=4;e<t.byteLength;e++)i.samples.push({dependsOn:(48&t[e])>>4,isDependedOn:(12&t[e])>>2,hasRedundancy:3&t[e]});return i},sidx:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),references:[],referenceId:i.getUint32(4),timescale:i.getUint32(8),earliestPresentationTime:i.getUint32(12),firstOffset:i.getUint32(16)},r=i.getUint16(22);for(e=24;r;e+=12,r--)n.references.push({referenceType:(128&t[e])>>>7,referencedSize:2147483647&i.getUint32(e),subsegmentDuration:i.getUint32(e+4),startsWithSap:!!(128&t[e+8]),sapType:(112&t[e+8])>>>4,sapDeltaTime:268435455&i.getUint32(e+8)});return n},smhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),balance:t[4]+t[5]/256}},stbl:function(t){return{boxes:fe(t)}},stco:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),chunkOffsets:[]},r=i.getUint32(4);for(e=8;r;e+=4,r--)n.chunkOffsets.push(i.getUint32(e));return n},stsc:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=i.getUint32(4),r={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleToChunks:[]};for(e=8;n;e+=12,n--)r.sampleToChunks.push({firstChunk:i.getUint32(e),samplesPerChunk:i.getUint32(e+4),sampleDescriptionIndex:i.getUint32(e+8)});return r},stsd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleDescriptions:fe(t.subarray(8))}},stsz:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleSize:i.getUint32(4),entries:[]};for(e=12;e<t.byteLength;e+=4)n.entries.push(i.getUint32(e));return n},stts:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),timeToSamples:[]},r=i.getUint32(4);for(e=8;r;e+=8,r--)n.timeToSamples.push({sampleCount:i.getUint32(e),sampleDelta:i.getUint32(e+4)});return n},styp:function(t){return be.ftyp(t)},tfdt:function(t){var e={version:t[0],flags:new Uint8Array(t.subarray(1,4)),baseMediaDecodeTime:t[4]<<24|t[5]<<16|t[6]<<8|t[7]};return 1===e.version&&(e.baseMediaDecodeTime*=Math.pow(2,32),e.baseMediaDecodeTime+=t[8]<<24|t[9]<<16|t[10]<<8|t[11]),e},tfhd:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:i.getUint32(4)},r=1&n.flags[2],a=2&n.flags[2],s=8&n.flags[2],o=16&n.flags[2],u=32&n.flags[2],l=65536&n.flags[0],c=131072&n.flags[0];return e=8,r&&(e+=4,n.baseDataOffset=i.getUint32(12),e+=4),a&&(n.sampleDescriptionIndex=i.getUint32(e),e+=4),s&&(n.defaultSampleDuration=i.getUint32(e),e+=4),o&&(n.defaultSampleSize=i.getUint32(e),e+=4),u&&(n.defaultSampleFlags=i.getUint32(e)),l&&(n.durationIsEmpty=!0),!r&&c&&(n.baseDataOffsetIsMoof=!0),n},tkhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=ve(e.getUint32(i)),i+=8,n.modificationTime=ve(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=8):(n.creationTime=ve(e.getUint32(i)),i+=4,n.modificationTime=ve(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=4),n.duration=e.getUint32(i),i+=4,i+=8,n.layer=e.getUint16(i),i+=2,n.alternateGroup=e.getUint16(i),i+=2,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,n.width=e.getUint16(i)+e.getUint16(i+2)/16,i+=4,n.height=e.getUint16(i)+e.getUint16(i+2)/16,n},traf:function(t){return{boxes:fe(t)}},trak:function(t){return{boxes:fe(t)}},trex:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:e.getUint32(4),defaultSampleDescriptionIndex:e.getUint32(8),defaultSampleDuration:e.getUint32(12),defaultSampleSize:e.getUint32(16),sampleDependsOn:3&t[20],sampleIsDependedOn:(192&t[21])>>6,sampleHasRedundancy:(48&t[21])>>4,samplePaddingValue:(14&t[21])>>1,sampleIsDifferenceSample:!!(1&t[21]),sampleDegradationPriority:e.getUint16(22)}},trun:function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]},n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=1&i.flags[2],a=4&i.flags[2],s=1&i.flags[1],o=2&i.flags[1],u=4&i.flags[1],l=8&i.flags[1],c=n.getUint32(4),h=8;for(r&&(i.dataOffset=n.getInt32(h),h+=4),a&&c&&(e={flags:_e(t.subarray(h,h+4))},h+=4,s&&(e.duration=n.getUint32(h),h+=4),o&&(e.size=n.getUint32(h),h+=4),l&&(e.compositionTimeOffset=n.getUint32(h),h+=4),i.samples.push(e),c--);c--;)e={},s&&(e.duration=n.getUint32(h),h+=4),o&&(e.size=n.getUint32(h),h+=4),u&&(e.flags=_e(t.subarray(h,h+4)),h+=4),l&&(e.compositionTimeOffset=n.getUint32(h),h+=4),i.samples.push(e);return i},"url ":function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4))}},vmhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),graphicsmode:e.getUint16(4),opcolor:new Uint16Array([e.getUint16(6),e.getUint16(8),e.getUint16(10)])}}},Te={inspect:fe=function(t){for(var e,i,n,r,a,s=0,o=[],u=new ArrayBuffer(t.length),l=new Uint8Array(u),c=0;c<t.length;++c)l[c]=t[c];for(e=new DataView(u);s<t.byteLength;)i=e.getUint32(s),n=ye(t.subarray(s+4,s+8)),r=1<i?s+i:t.byteLength,(a=(be[n]||function(t){return{data:t}})(t.subarray(s+8,r))).size=i,a.type=n,o.push(a),s=r;return o},textify:me=function(t,e){var a;return e=e||0,a=new Array(2*e+1).join(" "),t.map(function(r,t){return a+r.type+"\n"+Object.keys(r).filter(function(t){return"type"!==t&&"boxes"!==t}).map(function(t){var e=a+"  "+t+": ",i=r[t];if(i instanceof Uint8Array||i instanceof Uint32Array){var n=Array.prototype.slice.call(new Uint8Array(i.buffer,i.byteOffset,i.byteLength)).map(function(t){return" "+("00"+t.toString(16)).slice(-2)}).join("").match(/.{1,24}/g);return n?1===n.length?e+"<"+n.join("").slice(1)+">":e+"<\n"+n.map(function(t){return a+"  "+t}).join("\n")+"\n"+a+"  >":e+"<>"}return e+JSON.stringify(i,null,2).split("\n").map(function(t,e){return 0===e?t:a+"  "+t}).join("\n")}).join("\n")+(r.boxes?"\n"+me(r.boxes,e+1):"")}).join("\n")},parseTfdt:be.tfdt,parseHdlr:be.hdlr,parseTfhd:be.tfhd,parseTrun:be.trun},Se=ut,ke=gt.CaptionStream,we=function(t,e){for(var i=t,n=0;n<e.length;n++){var r=e[n];if(i<r.size)return r;i-=r.size}return null},Ce=function(t,y){var n=Y.findBox(t,["moof","traf"]),e=Y.findBox(t,["mdat"]),v={},r=[];return e.forEach(function(t,e){var i=n[e];r.push({mdat:t,traf:i})}),r.forEach(function(t){var e,i,n,r,a,s,o,u,l=t.mdat,c=t.traf,h=Y.findBox(c,["tfhd"]),d=Te.parseTfhd(h[0]),p=d.trackId,f=Y.findBox(c,["tfdt"]),m=0<f.length?Te.parseTfdt(f[0]).baseMediaDecodeTime:0,g=Y.findBox(c,["trun"]);y===p&&0<g.length&&(i=g,r=m,a=(n=d).defaultSampleDuration||0,s=n.defaultSampleSize||0,o=n.trackId,u=[],i.forEach(function(t){var e=Te.parseTrun(t).samples;e.forEach(function(t){void 0===t.duration&&(t.duration=a),void 0===t.size&&(t.size=s),t.trackId=o,t.dts=r,void 0===t.compositionTimeOffset&&(t.compositionTimeOffset=0),t.pts=r+t.compositionTimeOffset,r+=t.duration}),u=u.concat(e)}),e=function(t,e,i){var n,r,a,s,o=new DataView(t.buffer,t.byteOffset,t.byteLength),u=[];for(r=0;r+4<t.length;r+=a)if(a=o.getUint32(r),r+=4,!(a<=0))switch(31&t[r]){case 6:var l=t.subarray(r+1,r+1+a),c=we(r,e);n={nalUnitType:"sei_rbsp",size:a,data:l,escapedRBSP:Se(l),trackId:i},c?(n.pts=c.pts,n.dts=c.dts,s=c):(n.pts=s.pts,n.dts=s.dts),u.push(n)}return u}(l,u,p),v[p]||(v[p]=[]),v[p]=v[p].concat(e))}),v},Ee={generator:G,probe:Y,Transmuxer:ge.Transmuxer,AudioSegmentStream:ge.AudioSegmentStream,VideoSegmentStream:ge.VideoSegmentStream,CaptionParser:function(){var e,u,l,c,h,t=!1;this.isInitialized=function(){return t},this.init=function(){e=new ke,t=!0,e.on("data",function(t){t.startTime=t.startPts/c,t.endTime=t.endPts/c,h.captions.push(t),h.captionStreams[t.stream]=!0})},this.isNewInit=function(t,e){return!(t&&0===t.length||e&&"object"==typeof e&&0===Object.keys(e).length||l===t[0]&&c===e[l])},this.parse=function(t,e,i){var n,r,a,s;if(!this.isInitialized())return null;if(!e||!i)return null;if(this.isNewInit(e,i))l=e[0],c=i[l];else if(!l||!c)return u.push(t),null;for(;0<u.length;){var o=u.shift();this.parse(o,e,i)}return r=t,s=c,null!==(n=(a=l)?{seiNals:Ce(r,a)[a],timescale:s}:null)&&n.seiNals?(this.pushNals(n.seiNals),this.flushStream(),h):null},this.pushNals=function(t){if(!this.isInitialized()||!t||0===t.length)return null;t.forEach(function(t){e.push(t)})},this.flushStream=function(){if(!this.isInitialized())return null;e.flush()},this.clearParsedCaptions=function(){h.captions=[],h.captionStreams={}},this.resetCaptionStream=function(){if(!this.isInitialized())return null;e.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){u=[],c=l=null,h?this.clearParsedCaptions():h={captions:[],captionStreams:{}},this.resetCaptionStream()},this.reset()}},Ae=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),Le=function(){function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.options=e||{},this.self=t,this.init()}return Ae(i,[{key:"init",value:function(){var n,t;this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new Ee.Transmuxer(this.options),n=this.self,(t=this.transmuxer).on("data",function(t){var e=t.initSegment;t.initSegment={data:e.buffer,byteOffset:e.byteOffset,byteLength:e.byteLength};var i=t.data;t.data=i.buffer,n.postMessage({action:"data",segment:t,byteOffset:i.byteOffset,byteLength:i.byteLength},[t.data])}),t.captionStream&&t.captionStream.on("data",function(t){n.postMessage({action:"caption",data:t})}),t.on("done",function(t){n.postMessage({action:"done"})}),t.on("gopInfo",function(t){n.postMessage({action:"gopInfo",gopInfo:t})})}},{key:"push",value:function(t){var e=new Uint8Array(t.data,t.byteOffset,t.byteLength);this.transmuxer.push(e)}},{key:"reset",value:function(){this.init()}},{key:"setTimestampOffset",value:function(t){var e=t.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(9e4*e))}},{key:"setAudioAppendStart",value:function(t){this.transmuxer.setAudioAppendStart(Math.ceil(9e4*t.appendStart))}},{key:"flush",value:function(t){this.transmuxer.flush()}},{key:"resetCaptions",value:function(){this.transmuxer.resetCaptions()}},{key:"alignGopsWith",value:function(t){this.transmuxer.alignGopsWith(t.gopsToAlignWith.slice())}}]),i}();new function(e){e.onmessage=function(t){"init"===t.data.action&&t.data.options?this.messageHandlers=new Le(e,t.data.options):(this.messageHandlers||(this.messageHandlers=new Le(e)),t.data&&t.data.action&&"init"!==t.data.action&&this.messageHandlers[t.data.action]&&this.messageHandlers[t.data.action](t.data))}}(Oe)}()}),hc={videoCodec:"avc1",videoObjectTypeIndicator:".4d400d",audioProfile:"2"},dc=function(t){return t.map(function(t){return t.replace(/avc1\.(\d+)\.(\d+)/i,function(t,e,i){return"avc1."+("00"+Number(e).toString(16)).slice(-2)+"00"+("00"+Number(i).toString(16)).slice(-2)})})},pc=function(){var t,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",i={codecCount:0};return i.codecCount=e.split(",").length,i.codecCount=i.codecCount||2,(t=/(^|\s|,)+(avc[13])([^ ,]*)/i.exec(e))&&(i.videoCodec=t[2],i.videoObjectTypeIndicator=t[3]),i.audioProfile=/(^|\s|,)+mp4a.[0-9A-Fa-f]+\.([0-9A-Fa-f]+)/i.exec(e),i.audioProfile=i.audioProfile&&i.audioProfile[2],i},fc=function(t,e,i){return t+"/"+e+'; codecs="'+i.filter(function(t){return!!t}).join(", ")+'"'},mc=function(t,e){var i,n,r=(i=e).segments&&i.segments.length&&i.segments[0].map?"mp4":"mp2t",a=(n=e.attributes||{}).CODECS?pc(n.CODECS):hc,s=e.attributes||{},o=!0,u=!1;if(!e)return[];if(t.mediaGroups.AUDIO&&s.AUDIO){var l=t.mediaGroups.AUDIO[s.AUDIO];if(l)for(var c in o=!(u=!0),l)if(!l[c].uri&&!l[c].playlists){o=!0;break}}u&&!a.audioProfile&&(o||(a.audioProfile=function(t,e){if(!t.mediaGroups.AUDIO||!e)return null;var i=t.mediaGroups.AUDIO[e];if(!i)return null;for(var n in i){var r=i[n];if(r.default&&r.playlists)return pc(r.playlists[0].attributes.CODECS).audioProfile}return null}(t,s.AUDIO)),a.audioProfile||(oa.log.warn("Multiple audio tracks present but no audio codec string is specified. Attempting to use the default audio codec (mp4a.40.2)"),a.audioProfile=hc.audioProfile));var h={};a.videoCodec&&(h.video=""+a.videoCodec+a.videoObjectTypeIndicator),a.audioProfile&&(h.audio="mp4a.40."+a.audioProfile);var d=fc("audio",r,[h.audio]),p=fc("video",r,[h.video]),f=fc("video",r,[h.video,h.audio]);return u?!o&&h.video?[p,d]:o||h.video?[f,d]:[d,d]:h.video?[f]:[d]},gc=function(t){return/mp4a\.\d+.\d+/i.test(t)},yc=function(t){return/avc1\.[\da-f]+/i.test(t)},vc=function(t){function r(t,e){al(this,r);var i=ul(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,oa.EventTarget));i.timestampOffset_=0,i.pendingBuffers_=[],i.bufferUpdating_=!1,i.mediaSource_=t,i.codecs_=e,i.audioCodec_=null,i.videoCodec_=null,i.audioDisabled_=!1,i.appendAudioInitSegment_=!0,i.gopBuffer_=[],i.timeMapping_=0,i.safeAppend_=11<=oa.browser.IE_VERSION;var n={remux:!1,alignGopsAtEnd:i.safeAppend_};return i.codecs_.forEach(function(t){gc(t)?i.audioCodec_=t:yc(t)&&(i.videoCodec_=t)}),i.transmuxer_=new cc,i.transmuxer_.postMessage({action:"init",options:n}),i.transmuxer_.onmessage=function(t){return"data"===t.data.action?i.data_(t):"done"===t.data.action?i.done_(t):"gopInfo"===t.data.action?i.appendGopInfo_(t):void 0},Object.defineProperty(i,"timestampOffset",{get:function(){return this.timestampOffset_},set:function(t){"number"==typeof t&&0<=t&&(this.timestampOffset_=t,this.appendAudioInitSegment_=!0,this.gopBuffer_.length=0,this.timeMapping_=0,this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:t}))}}),Object.defineProperty(i,"appendWindowStart",{get:function(){return(this.videoBuffer_||this.audioBuffer_).appendWindowStart},set:function(t){this.videoBuffer_&&(this.videoBuffer_.appendWindowStart=t),this.audioBuffer_&&(this.audioBuffer_.appendWindowStart=t)}}),Object.defineProperty(i,"updating",{get:function(){return!!(this.bufferUpdating_||!this.audioDisabled_&&this.audioBuffer_&&this.audioBuffer_.updating||this.videoBuffer_&&this.videoBuffer_.updating)}}),Object.defineProperty(i,"buffered",{get:function(){return function(t,e,i){var n=null,r=null,a=0,s=[],o=[];if(!t&&!e)return oa.createTimeRange();if(!t)return e.buffered;if(!e)return t.buffered;if(i)return t.buffered;if(0===t.buffered.length&&0===e.buffered.length)return oa.createTimeRange();for(var u=t.buffered,l=e.buffered,c=u.length;c--;)s.push({time:u.start(c),type:"start"}),s.push({time:u.end(c),type:"end"});for(c=l.length;c--;)s.push({time:l.start(c),type:"start"}),s.push({time:l.end(c),type:"end"});for(s.sort(function(t,e){return t.time-e.time}),c=0;c<s.length;c++)"start"===s[c].type?2==++a&&(n=s[c].time):"end"===s[c].type&&1==--a&&(r=s[c].time),null!==n&&null!==r&&(o.push([n,r]),r=n=null);return oa.createTimeRanges(o)}(this.videoBuffer_,this.audioBuffer_,this.audioDisabled_)}}),i}return ol(r,oa.EventTarget),sl(r,[{key:"data_",value:function(t){var e=t.data.segment;e.data=new Uint8Array(e.data,t.data.byteOffset,t.data.byteLength),e.initSegment=new Uint8Array(e.initSegment.data,e.initSegment.byteOffset,e.initSegment.byteLength),function(t,e,i){var n=e.player_;if(i.captions&&i.captions.length)for(var r in t.inbandTextTracks_||(t.inbandTextTracks_={}),i.captionStreams)if(!t.inbandTextTracks_[r]){n.tech_.trigger({type:"usage",name:"hls-608"});var a=n.textTracks().getTrackById(r);t.inbandTextTracks_[r]=a||n.addRemoteTextTrack({kind:"captions",id:r,label:r},!1).track}i.metadata&&i.metadata.length&&!t.metadataTrack_&&(t.metadataTrack_=n.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,t.metadataTrack_.inBandMetadataTrackDispatchType=i.metadata.dispatchType)}(this,this.mediaSource_,e),this.pendingBuffers_.push(e)}},{key:"done_",value:function(t){"closed"!==this.mediaSource_.readyState?this.processPendingSegments_():this.pendingBuffers_.length=0}},{key:"createRealSourceBuffers_",value:function(){var n=this,r=["audio","video"];r.forEach(function(e){if(n[e+"Codec_"]&&!n[e+"Buffer_"]){var i=null;if(n.mediaSource_[e+"Buffer_"])(i=n.mediaSource_[e+"Buffer_"]).updating=!1;else{var t=e+'/mp4;codecs="'+n[e+"Codec_"]+'"';i=function(t,e){var i=t.addSourceBuffer(e),n=Object.create(null);n.updating=!1,n.realBuffer_=i;var r=function(e){"function"==typeof i[e]?n[e]=function(){return i[e].apply(i,arguments)}:"undefined"==typeof n[e]&&Object.defineProperty(n,e,{get:function(){return i[e]},set:function(t){return i[e]=t}})};for(var a in i)r(a);return n}(n.mediaSource_.nativeMediaSource_,t),n.mediaSource_[e+"Buffer_"]=i}n[e+"Buffer_"]=i,["update","updatestart","updateend"].forEach(function(t){i.addEventListener(t,function(){if("audio"!==e||!n.audioDisabled_)return"updateend"===t&&(n[e+"Buffer_"].updating=!1),r.every(function(t){return!("audio"!==t||!n.audioDisabled_)||(e===t||!n[t+"Buffer_"]||!n[t+"Buffer_"].updating)})?n.trigger(t):void 0})})}})}},{key:"appendBuffer",value:function(t){if(this.bufferUpdating_=!0,this.audioBuffer_&&this.audioBuffer_.buffered.length){var e=this.audioBuffer_.buffered;this.transmuxer_.postMessage({action:"setAudioAppendStart",appendStart:e.end(e.length-1)})}this.videoBuffer_&&this.transmuxer_.postMessage({action:"alignGopsWith",gopsToAlignWith:function(t,e,i){if("undefined"==typeof e||null===e||!t.length)return[];var n=Math.ceil(9e4*(e-i+3)),r=void 0;for(r=0;r<t.length&&!(t[r].pts>n);r++);return t.slice(r)}(this.gopBuffer_,this.mediaSource_.player_?this.mediaSource_.player_.currentTime():null,this.timeMapping_)}),this.transmuxer_.postMessage({action:"push",data:t.buffer,byteOffset:t.byteOffset,byteLength:t.byteLength},[t.buffer]),this.transmuxer_.postMessage({action:"flush"})}},{key:"appendGopInfo_",value:function(t){this.gopBuffer_=function(t,e,i){if(!e.length)return t;if(i)return e.slice();for(var n=e[0].pts,r=0;r<t.length&&!(t[r].pts>=n);r++);return t.slice(0,r).concat(e)}(this.gopBuffer_,t.data.gopInfo,this.safeAppend_)}},{key:"remove",value:function(t,e){if(this.videoBuffer_&&(this.videoBuffer_.updating=!0,this.videoBuffer_.remove(t,e),this.gopBuffer_=function(t,e,i,n){for(var r=Math.ceil(9e4*(e-n)),a=Math.ceil(9e4*(i-n)),s=t.slice(),o=t.length;o--&&!(t[o].pts<=a););if(-1===o)return s;for(var u=o+1;u--&&!(t[u].pts<=r););return u=Math.max(u,0),s.splice(u,o-u+1),s}(this.gopBuffer_,t,e,this.timeMapping_)),!this.audioDisabled_&&this.audioBuffer_&&(this.audioBuffer_.updating=!0,this.audioBuffer_.remove(t,e)),Kl(t,e,this.metadataTrack_),this.inbandTextTracks_)for(var i in this.inbandTextTracks_)Kl(t,e,this.inbandTextTracks_[i])}},{key:"processPendingSegments_",value:function(){var t={video:{segments:[],bytes:0},audio:{segments:[],bytes:0},captions:[],metadata:[]};t=this.pendingBuffers_.reduce(function(t,e){var i=e.type,n=e.data,r=e.initSegment;return t[i].segments.push(n),t[i].bytes+=n.byteLength,t[i].initSegment=r,e.captions&&(t.captions=t.captions.concat(e.captions)),e.info&&(t[i].info=e.info),e.metadata&&(t.metadata=t.metadata.concat(e.metadata)),t},t),this.videoBuffer_||this.audioBuffer_||(0===t.video.bytes&&(this.videoCodec_=null),0===t.audio.bytes&&(this.audioCodec_=null),this.createRealSourceBuffers_()),t.audio.info&&this.mediaSource_.trigger({type:"audioinfo",info:t.audio.info}),t.video.info&&this.mediaSource_.trigger({type:"videoinfo",info:t.video.info}),this.appendAudioInitSegment_&&(!this.audioDisabled_&&this.audioBuffer_&&(t.audio.segments.unshift(t.audio.initSegment),t.audio.bytes+=t.audio.initSegment.byteLength),this.appendAudioInitSegment_=!1);var e=!1;this.videoBuffer_&&t.video.bytes?(t.video.segments.unshift(t.video.initSegment),t.video.bytes+=t.video.initSegment.byteLength,this.concatAndAppendSegments_(t.video,this.videoBuffer_),Jl(this,t.captions,t.metadata)):!this.videoBuffer_||!this.audioDisabled_&&this.audioBuffer_||(e=!0),!this.audioDisabled_&&this.audioBuffer_&&this.concatAndAppendSegments_(t.audio,this.audioBuffer_),this.pendingBuffers_.length=0,e&&this.trigger("updateend"),this.bufferUpdating_=!1}},{key:"concatAndAppendSegments_",value:function(t,e){var i=0,n=void 0;if(t.bytes){n=new Uint8Array(t.bytes),t.segments.forEach(function(t){n.set(t,i),i+=t.byteLength});try{e.updating=!0,e.appendBuffer(n)}catch(t){this.mediaSource_.player_&&this.mediaSource_.player_.error({code:-3,type:"APPEND_BUFFER_ERR",message:t.message,originalError:t})}}}},{key:"abort",value:function(){this.videoBuffer_&&this.videoBuffer_.abort(),!this.audioDisabled_&&this.audioBuffer_&&this.audioBuffer_.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"reset"}),this.pendingBuffers_.length=0,this.bufferUpdating_=!1}}]),r}(),_c=function(t){function e(){al(this,e);var a=ul(this,(e.__proto__||Object.getPrototypeOf(e)).call(this)),t=void 0;for(t in a.nativeMediaSource_=new v.MediaSource,a.nativeMediaSource_)t in e.prototype||"function"!=typeof a.nativeMediaSource_[t]||(a[t]=a.nativeMediaSource_[t].bind(a.nativeMediaSource_));return a.duration_=NaN,Object.defineProperty(a,"duration",{get:function(){return this.duration_===1/0?this.duration_:this.nativeMediaSource_.duration},set:function(t){(this.duration_=t)===1/0||(this.nativeMediaSource_.duration=t)}}),Object.defineProperty(a,"seekable",{get:function(){return this.duration_===1/0?oa.createTimeRanges([[0,this.nativeMediaSource_.duration]]):this.nativeMediaSource_.seekable}}),Object.defineProperty(a,"readyState",{get:function(){return this.nativeMediaSource_.readyState}}),Object.defineProperty(a,"activeSourceBuffers",{get:function(){return this.activeSourceBuffers_}}),a.sourceBuffers=[],a.activeSourceBuffers_=[],a.updateActiveSourceBuffers_=function(){if(a.activeSourceBuffers_.length=0,1===a.sourceBuffers.length){var t=a.sourceBuffers[0];return t.appendAudioInitSegment_=!0,t.audioDisabled_=!t.audioCodec_,void a.activeSourceBuffers_.push(t)}for(var i=!1,n=!0,e=0;e<a.player_.audioTracks().length;e++){var r=a.player_.audioTracks()[e];if(r.enabled&&"main"!==r.kind){n=!(i=!0);break}}a.sourceBuffers.forEach(function(t,e){if(t.appendAudioInitSegment_=!0,t.videoCodec_&&t.audioCodec_)t.audioDisabled_=i;else if(t.videoCodec_&&!t.audioCodec_)t.audioDisabled_=!0,n=!1;else if(!t.videoCodec_&&t.audioCodec_&&(t.audioDisabled_=e?n:!n,t.audioDisabled_))return;a.activeSourceBuffers_.push(t)})},a.onPlayerMediachange_=function(){a.sourceBuffers.forEach(function(t){t.appendAudioInitSegment_=!0})},a.onHlsReset_=function(){a.sourceBuffers.forEach(function(t){t.transmuxer_&&t.transmuxer_.postMessage({action:"resetCaptions"})})},a.onHlsSegmentTimeMapping_=function(e){a.sourceBuffers.forEach(function(t){return t.timeMapping_=e.mapping})},["sourceopen","sourceclose","sourceended"].forEach(function(t){this.nativeMediaSource_.addEventListener(t,this.trigger.bind(this))},a),a.on("sourceopen",function(t){var e=d.querySelector('[src="'+a.url_+'"]');e&&(a.player_=oa(e.parentNode),a.player_.tech_.on("hls-reset",a.onHlsReset_),a.player_.tech_.on("hls-segment-time-mapping",a.onHlsSegmentTimeMapping_),a.player_.audioTracks&&a.player_.audioTracks()&&(a.player_.audioTracks().on("change",a.updateActiveSourceBuffers_),a.player_.audioTracks().on("addtrack",a.updateActiveSourceBuffers_),a.player_.audioTracks().on("removetrack",a.updateActiveSourceBuffers_)),a.player_.on("mediachange",a.onPlayerMediachange_))}),a.on("sourceended",function(t){for(var e=Ql(a.duration),i=0;i<a.sourceBuffers.length;i++){var n=a.sourceBuffers[i],r=n.metadataTrack_&&n.metadataTrack_.cues;r&&r.length&&(r[r.length-1].endTime=e)}}),a.on("sourceclose",function(t){this.sourceBuffers.forEach(function(t){t.transmuxer_&&t.transmuxer_.terminate()}),this.sourceBuffers.length=0,this.player_&&(this.player_.audioTracks&&this.player_.audioTracks()&&(this.player_.audioTracks().off("change",this.updateActiveSourceBuffers_),this.player_.audioTracks().off("addtrack",this.updateActiveSourceBuffers_),this.player_.audioTracks().off("removetrack",this.updateActiveSourceBuffers_)),this.player_.el_&&(this.player_.off("mediachange",this.onPlayerMediachange_),this.player_.tech_.off("hls-reset",this.onHlsReset_),this.player_.tech_.off("hls-segment-time-mapping",this.onHlsSegmentTimeMapping_)))}),a}return ol(e,oa.EventTarget),sl(e,[{key:"addSeekableRange_",value:function(t,e){var i=void 0;if(this.duration!==1/0)throw(i=new Error("MediaSource.addSeekableRange() can only be invoked when the duration is Infinity")).name="InvalidStateError",i.code=11,i;(e>this.nativeMediaSource_.duration||isNaN(this.nativeMediaSource_.duration))&&(this.nativeMediaSource_.duration=e)}},{key:"addSourceBuffer",value:function(t){var r,e,i=void 0,n=(r={type:"",parameters:{}},e=t.trim().split(";"),r.type=e.shift().trim(),e.forEach(function(t){var e=t.trim().split("=");if(1<e.length){var i=e[0].replace(/"/g,"").trim(),n=e[1].replace(/"/g,"").trim();r.parameters[i]=n}}),r);if(/^(video|audio)\/mp2t$/i.test(n.type)){var a=[];n.parameters&&n.parameters.codecs&&(a=n.parameters.codecs.split(","),a=(a=dc(a)).filter(function(t){return gc(t)||yc(t)})),0===a.length&&(a=["avc1.4d400d","mp4a.40.2"]),i=new vc(this,a),0!==this.sourceBuffers.length&&(this.sourceBuffers[0].createRealSourceBuffers_(),i.createRealSourceBuffers_(),this.sourceBuffers[0].audioDisabled_=!0)}else i=this.nativeMediaSource_.addSourceBuffer(t);return this.sourceBuffers.push(i),i}}]),e}(),bc=0;oa.mediaSources={};var Tc=function(t,e){var i=oa.mediaSources[t];if(!i)throw new Error("Media Source not found (Video.js)");i.trigger({type:"sourceopen",swfId:e})},Sc=function(){return!!v.MediaSource&&!!v.MediaSource.isTypeSupported&&v.MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"')},kc=function(){if(this.MediaSource={open:Tc,supportsNativeMediaSources:Sc},Sc())return new _c;throw new Error("Cannot use create a virtual MediaSource for this video")};kc.open=Tc,kc.supportsNativeMediaSources=Sc;var wc={createObjectURL:function(t){var e=void 0;return t instanceof _c?(e=v.URL.createObjectURL(t.nativeMediaSource_),t.url_=e):t instanceof _c?(e="blob:vjs-media-source/"+bc,bc++,oa.mediaSources[e]=t,e):(e=v.URL.createObjectURL(t),t.url_=e)}};oa.MediaSource=kc,oa.URL=wc;var Cc=oa.EventTarget,Ec=oa.mergeOptions,Ac=function(t,e){for(var s=Ec(t,{duration:e.duration,minimumUpdatePeriod:e.minimumUpdatePeriod}),i=0;i<e.playlists.length;i++){var n=fl(s,e.playlists[i]);n&&(s=n)}return pl(e,function(t,e,i,n){if(t.playlists&&t.playlists.length){var r=t.playlists[0].uri,a=fl(s,t.playlists[0]);a&&((s=a).mediaGroups[e][i][n].playlists[0]=s.playlists[r])}}),s},Lc=function(t){function a(t,e,i,n){al(this,a);var r=ul(this,(a.__proto__||Object.getPrototypeOf(a)).call(this));if(r.hls_=e,r.withCredentials=i,!t)throw new Error("A non-empty playlist URL or playlist is required");return r.on("minimumUpdatePeriod",function(){r.refreshXml_()}),r.on("mediaupdatetimeout",function(){r.refreshMedia_()}),"string"==typeof t?(r.srcUrl=t,r.state="HAVE_NOTHING",ul(r)):(r.masterPlaylistLoader_=n,r.state="HAVE_METADATA",r.started=!0,r.media(t),v.setTimeout(function(){r.trigger("loadedmetadata")},0),r)}return ol(a,Cc),sl(a,[{key:"dispose",value:function(){this.stopRequest(),v.clearTimeout(this.mediaUpdateTimeout)}},{key:"stopRequest",value:function(){if(this.request){var t=this.request;this.request=null,t.onreadystatechange=null,t.abort()}}},{key:"media",value:function(t){if(!t)return this.media_;if("HAVE_NOTHING"===this.state)throw new Error("Cannot switch media playlist from "+this.state);var e=this.state;if("string"==typeof t){if(!this.master.playlists[t])throw new Error("Unknown playlist URI: "+t);t=this.master.playlists[t]}var i=!this.media_||t.uri!==this.media_.uri;this.state="HAVE_METADATA",i&&(this.media_&&this.trigger("mediachanging"),this.media_=t,this.refreshMedia_(),"HAVE_MASTER"!==e&&this.trigger("mediachange"))}},{key:"pause",value:function(){this.stopRequest(),"HAVE_NOTHING"===this.state&&(this.started=!1)}},{key:"load",value:function(){this.started?this.trigger("loadedplaylist"):this.start()}},{key:"parseMasterXml",value:function(){var a=us(this.masterXml_,{manifestUri:this.srcUrl,clientOffset:this.clientOffset_});a.uri=this.srcUrl;for(var t=0;t<a.playlists.length;t++){var e="placeholder-uri-"+t;a.playlists[t].uri=e,a.playlists[e]=a.playlists[t]}return pl(a,function(t,e,i,n){if(t.playlists&&t.playlists.length){var r="placeholder-uri-"+e+"-"+i+"-"+n;t.playlists[0].uri=r,a.playlists[r]=t.playlists[0]}}),ml(a),gl(a),a}},{key:"start",value:function(){var i=this;this.started=!0,this.request=this.hls_.xhr({uri:this.srcUrl,withCredentials:this.withCredentials},function(t,e){if(i.request){if(i.request=null,t)return i.error={status:e.status,message:"DASH playlist request error at URL: "+i.srcUrl,responseText:e.responseText,code:2},"HAVE_NOTHING"===i.state&&(i.started=!1),i.trigger("error");i.masterXml_=e.responseText,e.responseHeaders&&e.responseHeaders.date?i.masterLoaded_=Date.parse(e.responseHeaders.date):i.masterLoaded_=Date.now(),i.syncClientServerClock_(i.onClientServerClockSync_.bind(i))}})}},{key:"syncClientServerClock_",value:function(n){var r=this,a=ls(this.masterXml_);return null===a?(this.clientOffset_=this.masterLoaded_-Date.now(),n()):"DIRECT"===a.method?(this.clientOffset_=a.value-Date.now(),n()):void(this.request=this.hls_.xhr({uri:rl(this.srcUrl,a.value),method:a.method,withCredentials:this.withCredentials},function(t,e){if(r.request){if(t)return r.clientOffset_=r.masterLoaded_-Date.now(),n();var i=void 0;i="HEAD"===a.method?e.responseHeaders&&e.responseHeaders.date?Date.parse(e.responseHeaders.date):r.masterLoaded_:Date.parse(e.responseText),r.clientOffset_=i-Date.now(),n()}}))}},{key:"onClientServerClockSync_",value:function(){var t=this;this.master=this.parseMasterXml(),this.state="HAVE_MASTER",this.trigger("loadedplaylist"),this.media_||this.media(this.master.playlists[0]),v.setTimeout(function(){t.trigger("loadedmetadata")},0),this.master.minimumUpdatePeriod&&v.setTimeout(function(){t.trigger("minimumUpdatePeriod")},this.master.minimumUpdatePeriod)}},{key:"refreshXml_",value:function(){var n=this;this.request=this.hls_.xhr({uri:this.srcUrl,withCredentials:this.withCredentials},function(t,e){if(n.request){if(n.request=null,t)return n.error={status:e.status,message:"DASH playlist request error at URL: "+n.srcUrl,responseText:e.responseText,code:2},"HAVE_NOTHING"===n.state&&(n.started=!1),n.trigger("error");n.masterXml_=e.responseText;var i=n.parseMasterXml();n.master=Ac(n.master,i),v.setTimeout(function(){n.trigger("minimumUpdatePeriod")},n.master.minimumUpdatePeriod)}})}},{key:"refreshMedia_",value:function(){var t=this,e=void 0,i=void 0;i=this.masterPlaylistLoader_?(e=this.masterPlaylistLoader_.master,this.masterPlaylistLoader_.parseMasterXml()):(e=this.master,this.parseMasterXml());var n=Ac(e,i);n?(this.masterPlaylistLoader_?this.masterPlaylistLoader_.master=n:this.master=n,this.media_=n.playlists[this.media_.uri]):this.trigger("playlistunchanged"),this.media().endList||(this.mediaUpdateTimeout=v.setTimeout(function(){t.trigger("mediaupdatetimeout")},yl(this.media(),!!n))),this.trigger("loadedplaylist")}}]),a}(),Oc=function(t){return oa.log.debug?oa.log.debug.bind(oa,"VHS:",t+" >"):function(){}};function Pc(){}var Uc=function(){function r(t,e,i,n){al(this,r),this.callbacks_=[],this.pendingCallback_=null,this.timestampOffset_=0,this.mediaSource=t,this.processedAppend_=!1,this.type_=i,this.mimeType_=e,this.logger_=Oc("SourceUpdater["+i+"]["+e+"]"),"closed"===t.readyState?t.addEventListener("sourceopen",this.createSourceBuffer_.bind(this,e,n)):this.createSourceBuffer_(e,n)}return sl(r,[{key:"createSourceBuffer_",value:function(t,e){var i=this;this.sourceBuffer_=this.mediaSource.addSourceBuffer(t),this.logger_("created SourceBuffer"),e&&(e.trigger("sourcebufferadded"),this.mediaSource.sourceBuffers.length<2)?e.on("sourcebufferadded",function(){i.start_()}):this.start_()}},{key:"start_",value:function(){var e=this;this.started_=!0,this.onUpdateendCallback_=function(){var t=e.pendingCallback_;e.pendingCallback_=null,e.logger_("buffered ["+Yl(e.buffered())+"]"),t&&t(),e.runCallback_()},this.sourceBuffer_.addEventListener("updateend",this.onUpdateendCallback_),this.runCallback_()}},{key:"abort",value:function(t){var e=this;this.processedAppend_&&this.queueCallback_(function(){e.sourceBuffer_.abort()},t)}},{key:"appendBuffer",value:function(t,e){var i=this;this.processedAppend_=!0,this.queueCallback_(function(){i.sourceBuffer_.appendBuffer(t)},e)}},{key:"buffered",value:function(){return this.sourceBuffer_?this.sourceBuffer_.buffered:oa.createTimeRanges()}},{key:"remove",value:function(t,e){var i=this,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:Pc;this.processedAppend_&&this.queueCallback_(function(){i.logger_("remove ["+t+" => "+e+"]"),i.sourceBuffer_.remove(t,e)},n)}},{key:"updating",value:function(){return!this.sourceBuffer_||this.sourceBuffer_.updating||this.pendingCallback_}},{key:"timestampOffset",value:function(t){var e=this;return"undefined"!=typeof t&&(this.queueCallback_(function(){e.sourceBuffer_.timestampOffset=t}),this.timestampOffset_=t),this.timestampOffset_}},{key:"queueCallback_",value:function(t,e){this.callbacks_.push([t.bind(this),e]),this.runCallback_()}},{key:"runCallback_",value:function(){var t=void 0;!this.updating()&&this.callbacks_.length&&this.started_&&(t=this.callbacks_.shift(),this.pendingCallback_=t[1],t[0]())}},{key:"dispose",value:function(){this.sourceBuffer_.removeEventListener("updateend",this.onUpdateendCallback_),this.sourceBuffer_&&"open"===this.mediaSource.readyState&&this.sourceBuffer_.abort()}}]),r}(),xc={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,BUFFER_LOW_WATER_LINE_RATE:1},Ic=2,Dc=-101,Rc=-102,Mc=function(t){var e,i,n={};return t.byterange&&(n.Range=(e=t.byterange,i=e.offset+e.length-1,"bytes="+e.offset+"-"+i)),n},Bc=function(t){t.forEach(function(t){t.abort()})},Nc=function(t,e){return e.timedout?{status:e.status,message:"HLS request timed-out at URL: "+e.uri,code:Dc,xhr:e}:e.aborted?{status:e.status,message:"HLS request aborted at URL: "+e.uri,code:Rc,xhr:e}:t?{status:e.status,message:"HLS request errored at URL: "+e.uri,code:Ic,xhr:e}:null},jc=function(s,o,u){var l=[],c=0;return function(t,e){if(t&&(Bc(s),l.push(t)),(c+=1)===s.length){if(e.endOfAllRequests=Date.now(),0<l.length){var i=l.reduce(function(t,e){return e.code>t.code?e:t});return u(i,e)}return e.encryptedBytes?(r=e,a=u,(n=o).addEventListener("message",function t(e){if(e.data.source===r.requestId){n.removeEventListener("message",t);var i=e.data.decrypted;return r.bytes=new Uint8Array(i.bytes,i.byteOffset,i.byteLength),a(null,r)}}),void n.postMessage(Fl({source:r.requestId,encrypted:r.encryptedBytes,key:r.key.bytes,iv:r.key.iv}),[r.encryptedBytes.buffer,r.key.bytes.buffer])):u(null,e)}var n,r,a}},Fc=function(r,a){return function(t){var e,i,n;return r.stats=oa.mergeOptions(r.stats,(i=(e=t).target,(n={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-i.requestTime||0}).bytesReceived=e.loaded,n.bandwidth=Math.floor(n.bytesReceived/n.roundTripTime*8*1e3),n)),!r.stats.firstBytesReceivedAt&&r.stats.bytesReceived&&(r.stats.firstBytesReceivedAt=Date.now()),a(t,r)}},Vc=function(t,e,i,n,r,a,s){var o,u,l,c,h,d=[],p=jc(d,i,s);if(r.key){var f=t(oa.mergeOptions(e,{uri:r.key.resolvedUri,responseType:"arraybuffer"}),(o=r,u=p,function(t,e){var i=e.response,n=Nc(t,e);if(n)return u(n,o);if(16!==i.byteLength)return u({status:e.status,message:"Invalid HLS key at URL: "+e.uri,code:Ic,xhr:e},o);var r=new DataView(i);return o.key.bytes=new Uint32Array([r.getUint32(0),r.getUint32(4),r.getUint32(8),r.getUint32(12)]),u(null,o)}));d.push(f)}if(r.map&&!r.map.bytes){var m=t(oa.mergeOptions(e,{uri:r.map.resolvedUri,responseType:"arraybuffer",headers:Mc(r.map)}),(l=r,c=n,h=p,function(t,e){var i=e.response,n=Nc(t,e);return n?h(n,l):0===i.byteLength?h({status:e.status,message:"Empty HLS segment content at URL: "+e.uri,code:Ic,xhr:e},l):(l.map.bytes=new Uint8Array(e.response),c.isInitialized()||c.init(),l.map.timescales=Qs.timescale(l.map.bytes),l.map.videoTrackIds=Qs.videoTrackIds(l.map.bytes),h(null,l))}));d.push(m)}var g,y,v,_=t(oa.mergeOptions(e,{uri:r.resolvedUri,responseType:"arraybuffer",headers:Mc(r)}),(g=r,y=n,v=p,function(t,e){var i,n=e.response,r=Nc(t,e),a=void 0;return r?v(r,g):0===n.byteLength?v({status:e.status,message:"Empty HLS segment content at URL: "+e.uri,code:Ic,xhr:e},g):(g.stats={bandwidth:(i=e).bandwidth,bytesReceived:i.bytesReceived||0,roundTripTime:i.roundTripTime||0},g.key?g.encryptedBytes=new Uint8Array(e.response):g.bytes=new Uint8Array(e.response),g.map&&g.map.bytes&&(y.isInitialized()||y.init(),(a=y.parse(g.bytes,g.map.videoTrackIds,g.map.timescales))&&a.captions&&(g.captionStreams=a.captionStreams,g.fmp4Captions=a.captions)),v(null,g))}));return _.addEventListener("progress",Fc(r,a)),d.push(_),function(){return Bc(d)}},Hc=function(t,e){var i;return t&&(i=v.getComputedStyle(t))?i[e]:""},qc=function(t,n){var r=t.slice();t.sort(function(t,e){var i=n(t,e);return 0===i?r.indexOf(t)-r.indexOf(e):i})},zc=function(t,e){var i=void 0,n=void 0;return t.attributes.BANDWIDTH&&(i=t.attributes.BANDWIDTH),i=i||v.Number.MAX_VALUE,e.attributes.BANDWIDTH&&(n=e.attributes.BANDWIDTH),i-(n=n||v.Number.MAX_VALUE)},Wc=function(t,e,i){if(!t||!e)return!1;var n=i===t.segments.length;return t.endList&&"open"===e.readyState&&n},Gc=function(t){return"number"==typeof t&&isFinite(t)},Xc=function(t){function i(t){al(this,i);var e=ul(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));if(!t)throw new TypeError("Initialization settings are required");if("function"!=typeof t.currentTime)throw new TypeError("No currentTime getter specified");if(!t.mediaSource)throw new TypeError("No MediaSource specified");return e.bandwidth=t.bandwidth,e.throughput={rate:0,count:0},e.roundTrip=NaN,e.resetStats_(),e.mediaIndex=null,e.hasPlayed_=t.hasPlayed,e.currentTime_=t.currentTime,e.seekable_=t.seekable,e.seeking_=t.seeking,e.duration_=t.duration,e.mediaSource_=t.mediaSource,e.hls_=t.hls,e.loaderType_=t.loaderType,e.startingMedia_=void 0,e.segmentMetadataTrack_=t.segmentMetadataTrack,e.goalBufferLength_=t.goalBufferLength,e.sourceType_=t.sourceType,e.inbandTextTracks_=t.inbandTextTracks,e.state_="INIT",e.checkBufferTimeout_=null,e.error_=void 0,e.currentTimeline_=-1,e.pendingSegment_=null,e.mimeType_=null,e.sourceUpdater_=null,e.xhrOptions_=null,e.activeInitSegmentId_=null,e.initSegments_={},e.captionParser_=new Iu,e.decrypter_=t.decrypter,e.syncController_=t.syncController,e.syncPoint_={segmentIndex:0,time:0},e.syncController_.on("syncinfoupdate",function(){return e.trigger("syncinfoupdate")}),e.mediaSource_.addEventListener("sourceopen",function(){return e.ended_=!1}),e.fetchAtBuffer_=!1,e.logger_=Oc("SegmentLoader["+e.loaderType_+"]"),Object.defineProperty(e,"state",{get:function(){return this.state_},set:function(t){t!==this.state_&&(this.logger_(this.state_+" -> "+t),this.state_=t)}}),e}return ol(i,oa.EventTarget),sl(i,[{key:"resetStats_",value:function(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaRequestsAborted=0,this.mediaRequestsTimedout=0,this.mediaRequestsErrored=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0}},{key:"dispose",value:function(){this.state="DISPOSED",this.pause(),this.abort_(),this.sourceUpdater_&&this.sourceUpdater_.dispose(),this.resetStats_(),this.captionParser_.reset()}},{key:"abort",value:function(){"WAITING"===this.state?(this.abort_(),this.state="READY",this.paused()||this.monitorBuffer_()):this.pendingSegment_&&(this.pendingSegment_=null)}},{key:"abort_",value:function(){this.pendingSegment_&&this.pendingSegment_.abortRequests(),this.pendingSegment_=null}},{key:"error",value:function(t){return"undefined"!=typeof t&&(this.error_=t),this.pendingSegment_=null,this.error_}},{key:"endOfStream",value:function(){this.ended_=!0,this.pause(),this.trigger("ended")}},{key:"buffered_",value:function(){return this.sourceUpdater_?this.sourceUpdater_.buffered():oa.createTimeRanges()}},{key:"initSegment",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(!t)return null;var i=Vl(t),n=this.initSegments_[i];return e&&!n&&t.bytes&&(this.initSegments_[i]=n={resolvedUri:t.resolvedUri,byterange:t.byterange,bytes:t.bytes,timescales:t.timescales,videoTrackIds:t.videoTrackIds}),n||t}},{key:"couldBeginLoading_",value:function(){return this.playlist_&&(this.sourceUpdater_||this.mimeType_&&"INIT"===this.state)&&!this.paused()}},{key:"load",value:function(){if(this.monitorBuffer_(),this.playlist_){if(this.syncController_.setDateTimeMapping(this.playlist_),"INIT"===this.state&&this.couldBeginLoading_())return this.init_();!this.couldBeginLoading_()||"READY"!==this.state&&"INIT"!==this.state||(this.state="READY")}}},{key:"init_",value:function(){return this.state="READY",this.sourceUpdater_=new Uc(this.mediaSource_,this.mimeType_,this.loaderType_,this.sourceBufferEmitter_),this.resetEverything(),this.monitorBuffer_()}},{key:"playlist",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(t){var i=this.playlist_,n=this.pendingSegment_;this.playlist_=t,this.xhrOptions_=e,this.hasPlayed_()||(t.syncInfo={mediaSequence:t.mediaSequence,time:0});var r=i?i.id:null;if(this.logger_("playlist update ["+r+" => "+t.id+"]"),this.trigger("syncinfoupdate"),"INIT"===this.state&&this.couldBeginLoading_())return this.init_();if(i&&i.uri===t.uri){var a=t.mediaSequence-i.mediaSequence;this.logger_("live window shift ["+a+"]"),null!==this.mediaIndex&&(this.mediaIndex-=a),n&&(n.mediaIndex-=a,0<=n.mediaIndex&&(n.segment=t.segments[n.mediaIndex])),this.syncController_.saveExpiredSegmentInfo(i,t)}else null!==this.mediaIndex&&this.resyncLoader()}}},{key:"pause",value:function(){this.checkBufferTimeout_&&(v.clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}},{key:"paused",value:function(){return null===this.checkBufferTimeout_}},{key:"mimeType",value:function(t,e){this.mimeType_||(this.mimeType_=t,this.sourceBufferEmitter_=e,"INIT"===this.state&&this.couldBeginLoading_()&&this.init_())}},{key:"resetEverything",value:function(t){this.ended_=!1,this.resetLoader(),this.remove(0,this.duration_(),t),this.captionParser_.clearAllCaptions(),this.trigger("reseteverything")}},{key:"resetLoader",value:function(){this.fetchAtBuffer_=!1,this.resyncLoader()}},{key:"resyncLoader",value:function(){this.mediaIndex=null,this.syncPoint_=null,this.abort()}},{key:"remove",value:function(t,e,i){if(this.sourceUpdater_&&this.sourceUpdater_.remove(t,e,i),Kl(t,e,this.segmentMetadataTrack_),this.inbandTextTracks_)for(var n in this.inbandTextTracks_)Kl(t,e,this.inbandTextTracks_[n])}},{key:"monitorBuffer_",value:function(){this.checkBufferTimeout_&&v.clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=v.setTimeout(this.monitorBufferTick_.bind(this),1)}},{key:"monitorBufferTick_",value:function(){"READY"===this.state&&this.fillBuffer_(),this.checkBufferTimeout_&&v.clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=v.setTimeout(this.monitorBufferTick_.bind(this),500)}},{key:"fillBuffer_",value:function(){if(!this.sourceUpdater_.updating()){this.syncPoint_||(this.syncPoint_=this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_()));var t=this.checkBuffer_(this.buffered_(),this.playlist_,this.mediaIndex,this.hasPlayed_(),this.currentTime_(),this.syncPoint_);if(t)Wc(this.playlist_,this.mediaSource_,t.mediaIndex)?this.endOfStream():(t.mediaIndex!==this.playlist_.segments.length-1||"ended"!==this.mediaSource_.readyState||this.seeking_())&&((t.timeline!==this.currentTimeline_||null!==t.startOfSegment&&t.startOfSegment<this.sourceUpdater_.timestampOffset())&&(this.syncController_.reset(),t.timestampOffset=t.startOfSegment,this.captionParser_.clearAllCaptions()),this.loadSegment_(t))}}},{key:"checkBuffer_",value:function(t,e,i,n,r,a){var s=0,o=void 0;t.length&&(s=t.end(t.length-1));var u=Math.max(0,s-r);if(!e.segments.length)return null;if(u>=this.goalBufferLength_())return null;if(!n&&1<=u)return null;if(null===a)return i=this.getSyncSegmentCandidate_(e),this.generateSegmentInfo_(e,i,null,!0);if(null!==i){var l=e.segments[i];return o=l&&l.end?l.end:s,this.generateSegmentInfo_(e,i+1,o,!1)}if(this.fetchAtBuffer_){var c=Dl.getMediaInfoForTime(e,s,a.segmentIndex,a.time);i=c.mediaIndex,o=c.startTime}else{var h=Dl.getMediaInfoForTime(e,r,a.segmentIndex,a.time);i=h.mediaIndex,o=h.startTime}return this.generateSegmentInfo_(e,i,o,!1)}},{key:"getSyncSegmentCandidate_",value:function(t){var e=this;if(-1===this.currentTimeline_)return 0;var i=t.segments.map(function(t,e){return{timeline:t.timeline,segmentIndex:e}}).filter(function(t){return t.timeline===e.currentTimeline_});return i.length?i[Math.min(i.length-1,1)].segmentIndex:Math.max(t.segments.length-1,0)}},{key:"generateSegmentInfo_",value:function(t,e,i,n){if(e<0||e>=t.segments.length)return null;var r=t.segments[e];return{requestId:"segment-loader-"+Math.random(),uri:r.resolvedUri,mediaIndex:e,isSyncRequest:n,startOfSegment:i,playlist:t,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:r.timeline,duration:r.duration,segment:r}}},{key:"abortRequestEarly_",value:function(t){if(this.hls_.tech_.paused()||!this.xhrOptions_.timeout||!this.playlist_.attributes.BANDWIDTH)return!1;if(Date.now()-(t.firstBytesReceivedAt||Date.now())<1e3)return!1;var e=this.currentTime_(),i=t.bandwidth,n=this.pendingSegment_.duration,r=Dl.estimateSegmentRequestTime(n,i,this.playlist_,t.bytesReceived),a=function(t,e){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;return((t.length?t.end(t.length-1):0)-e)/i}(this.buffered_(),e,this.hls_.tech_.playbackRate())-1;if(r<=a)return!1;var s=function(t){var e=t.master,i=t.currentTime,n=t.bandwidth,r=t.duration,a=t.segmentDuration,s=t.timeUntilRebuffer,o=t.currentTimeline,u=t.syncController,l=e.playlists.filter(function(t){return!Dl.isIncompatible(t)}),c=l.filter(Dl.isEnabled);c.length||(c=l.filter(function(t){return!Dl.isDisabled(t)}));var h=c.filter(Dl.hasAttribute.bind(null,"BANDWIDTH")).map(function(t){var e=u.getSyncPoint(t,r,o,i)?1:2;return{playlist:t,rebufferingImpact:Dl.estimateSegmentRequestTime(a,n,t)*e-s}}),d=h.filter(function(t){return t.rebufferingImpact<=0});return qc(d,function(t,e){return zc(e.playlist,t.playlist)}),d.length?d[0]:(qc(h,function(t,e){return t.rebufferingImpact-e.rebufferingImpact}),h[0]||null)}({master:this.hls_.playlists.master,currentTime:e,bandwidth:i,duration:this.duration_(),segmentDuration:n,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_});if(s){var o=r-a-s.rebufferingImpact,u=.5;return a<=zl&&(u=1),!s.playlist||s.playlist.uri===this.playlist_.uri||o<u?!1:(this.bandwidth=s.playlist.attributes.BANDWIDTH*xc.BANDWIDTH_VARIANCE+1,this.abort(),this.trigger("earlyabort"),!0)}}},{key:"handleProgress_",value:function(t,e){this.pendingSegment_&&e.requestId===this.pendingSegment_.requestId&&!this.abortRequestEarly_(e.stats)&&this.trigger("progress")}},{key:"loadSegment_",value:function(t){this.state="WAITING",this.pendingSegment_=t,this.trimBackBuffer_(t),t.abortRequests=Vc(this.hls_.xhr,this.xhrOptions_,this.decrypter_,this.captionParser_,this.createSimplifiedSegmentObj_(t),this.handleProgress_.bind(this),this.segmentRequestFinished_.bind(this))}},{key:"trimBackBuffer_",value:function(t){var e,i,n,r,a=(e=this.seekable_(),i=this.currentTime_(),n=this.playlist_.targetDuration||10,r=void 0,r=e.length&&0<e.start(0)&&e.start(0)<i?e.start(0):i-30,Math.min(r,i-n));0<a&&this.remove(0,a)}},{key:"createSimplifiedSegmentObj_",value:function(t){var e=t.segment,i={resolvedUri:e.resolvedUri,byterange:e.byterange,requestId:t.requestId};if(e.key){var n=e.key.iv||new Uint32Array([0,0,0,t.mediaIndex+t.playlist.mediaSequence]);i.key={resolvedUri:e.key.resolvedUri,iv:n}}return e.map&&(i.map=this.initSegment(e.map)),i}},{key:"segmentRequestFinished_",value:function(t,e){if(this.mediaRequests+=1,e.stats&&(this.mediaBytesTransferred+=e.stats.bytesReceived,this.mediaTransferDuration+=e.stats.roundTripTime),this.pendingSegment_){if(e.requestId===this.pendingSegment_.requestId){if(t)return this.pendingSegment_=null,this.state="READY",t.code===Rc?void(this.mediaRequestsAborted+=1):(this.pause(),t.code===Dc?(this.mediaRequestsTimedout+=1,this.bandwidth=1,this.roundTrip=NaN,void this.trigger("bandwidthupdate")):(this.mediaRequestsErrored+=1,this.error(t),void this.trigger("error")));this.bandwidth=e.stats.bandwidth,this.roundTrip=e.stats.roundTripTime,e.map&&(e.map=this.initSegment(e.map,!0)),this.processSegmentResponse_(e)}}else this.mediaRequestsAborted+=1}},{key:"processSegmentResponse_",value:function(t){var e=this.pendingSegment_;e.bytes=t.bytes,t.map&&(e.segment.map.bytes=t.map.bytes),e.endOfAllRequests=t.endOfAllRequests,t.fmp4Captions&&(!function(t,e,i){for(var n in i)if(!t[n]){e.trigger({type:"usage",name:"hls-608"});var r=e.textTracks().getTrackById(n);t[n]=r||e.addRemoteTextTrack({kind:"captions",id:n,label:n},!1).track}}(this.inbandTextTracks_,this.hls_.tech_,t.captionStreams),function(t){var r=t.inbandTextTracks,e=t.captionArray,a=t.timestampOffset;if(e){var s=window.WebKitDataCue||window.VTTCue;e.forEach(function(t){var e=t.stream,i=t.startTime,n=t.endTime;r[e]&&(i+=a,n+=a,r[e].addCue(new s(i,n,t.text)))})}}({inbandTextTracks:this.inbandTextTracks_,captionArray:t.fmp4Captions,timestampOffset:0}),this.captionParser_.clearParsedCaptions()),this.handleSegment_()}},{key:"handleSegment_",value:function(){var t=this;if(this.pendingSegment_){var e=this.pendingSegment_,i=e.segment,n=this.syncController_.probeSegmentInfo(e);"undefined"==typeof this.startingMedia_&&n&&(n.containsAudio||n.containsVideo)&&(this.startingMedia_={containsAudio:n.containsAudio,containsVideo:n.containsVideo});var r,a,s,o=(r=this.loaderType_,a=this.startingMedia_,s=n,"main"===r&&a&&s?s.containsAudio||s.containsVideo?a.containsVideo&&!s.containsVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!a.containsVideo&&s.containsVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null:"Neither audio nor video found in segment.":null);if(o)return this.error({message:o,blacklistDuration:1/0}),void this.trigger("error");if(e.isSyncRequest)return this.trigger("syncinfoupdate"),this.pendingSegment_=null,void(this.state="READY");null!==e.timestampOffset&&e.timestampOffset!==this.sourceUpdater_.timestampOffset()&&(this.sourceUpdater_.timestampOffset(e.timestampOffset),this.trigger("timestampoffset"));var u,l,c,h,d,p,f,m,g,y,v,_=this.syncController_.mappingForTimeline(e.timeline);if(null!==_&&this.trigger({type:"segmenttimemapping",mapping:_}),this.state="APPENDING",i.map){var b=Vl(i.map);if(!this.activeInitSegmentId_||this.activeInitSegmentId_!==b){var T=this.initSegment(i.map);this.sourceUpdater_.appendBuffer(T.bytes,function(){t.activeInitSegmentId_=b})}}e.byteLength=e.bytes.byteLength,"number"==typeof i.start&&"number"==typeof i.end?this.mediaSecondsLoaded+=i.end-i.start:this.mediaSecondsLoaded+=i.duration,this.logger_((l=(u=e).segment,c=l.start,h=l.end,d=u.playlist,p=d.mediaSequence,f=d.id,m=d.segments,g=void 0===m?[]:m,y=u.mediaIndex,v=u.timeline,["appending ["+y+"] of ["+p+", "+(p+g.length)+"] from playlist ["+f+"]","["+c+" => "+h+"] in timeline ["+v+"]"].join(" "))),this.sourceUpdater_.appendBuffer(e.bytes,this.handleUpdateEnd_.bind(this))}else this.state="READY"}},{key:"handleUpdateEnd_",value:function(){if(!this.pendingSegment_)return this.state="READY",void(this.paused()||this.monitorBuffer_());var t=this.pendingSegment_,e=t.segment,i=null!==this.mediaIndex;(this.pendingSegment_=null,this.recordThroughput_(t),this.addSegmentMetadataCue_(t),this.state="READY",this.mediaIndex=t.mediaIndex,this.fetchAtBuffer_=!0,this.currentTimeline_=t.timeline,this.trigger("syncinfoupdate"),e.end&&this.currentTime_()-e.end>3*t.playlist.targetDuration)?this.resetEverything():(i&&this.trigger("bandwidthupdate"),this.trigger("progress"),Wc(t.playlist,this.mediaSource_,t.mediaIndex+1)&&this.endOfStream(),this.paused()||this.monitorBuffer_())}},{key:"recordThroughput_",value:function(t){var e=this.throughput.rate,i=Date.now()-t.endOfAllRequests+1,n=Math.floor(t.byteLength/i*8*1e3);this.throughput.rate+=(n-e)/++this.throughput.count}},{key:"addSegmentMetadataCue_",value:function(t){if(this.segmentMetadataTrack_){var e=t.segment,i=e.start,n=e.end;if(Gc(i)&&Gc(n)){Kl(i,n,this.segmentMetadataTrack_);var r=v.WebKitDataCue||v.VTTCue,a={bandwidth:t.playlist.attributes.BANDWIDTH,resolution:t.playlist.attributes.RESOLUTION,codecs:t.playlist.attributes.CODECS,byteLength:t.byteLength,uri:t.uri,timeline:t.timeline,playlist:t.playlist.uri,start:i,end:n},s=new r(i,n,JSON.stringify(a));s.value=a,this.segmentMetadataTrack_.addCue(s)}}}}]),i}(),Yc=function(t){return decodeURIComponent(escape(String.fromCharCode.apply(null,t)))},$c=new Uint8Array("\n\n".split("").map(function(t){return t.charCodeAt(0)})),Kc=function(t){function n(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};al(this,n);var i=ul(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,t,e));return i.mediaSource_=null,i.subtitlesTrack_=null,i}return ol(n,Xc),sl(n,[{key:"buffered_",value:function(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues.length)return oa.createTimeRanges();var t=this.subtitlesTrack_.cues,e=t[0].startTime,i=t[t.length-1].startTime;return oa.createTimeRanges([[e,i]])}},{key:"initSegment",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(!t)return null;var i=Vl(t),n=this.initSegments_[i];if(e&&!n&&t.bytes){var r=$c.byteLength+t.bytes.byteLength,a=new Uint8Array(r);a.set(t.bytes),a.set($c,t.bytes.byteLength),this.initSegments_[i]=n={resolvedUri:t.resolvedUri,byterange:t.byterange,bytes:a}}return n||t}},{key:"couldBeginLoading_",value:function(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}},{key:"init_",value:function(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}},{key:"track",value:function(t){return"undefined"==typeof t||(this.subtitlesTrack_=t,"INIT"===this.state&&this.couldBeginLoading_()&&this.init_()),this.subtitlesTrack_}},{key:"remove",value:function(t,e){Kl(t,e,this.subtitlesTrack_)}},{key:"fillBuffer_",value:function(){var t=this;this.syncPoint_||(this.syncPoint_=this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_()));var e=this.checkBuffer_(this.buffered_(),this.playlist_,this.mediaIndex,this.hasPlayed_(),this.currentTime_(),this.syncPoint_);if(e=this.skipEmptySegments_(e)){if(null===this.syncController_.timestampOffsetForTimeline(e.timeline)){return this.syncController_.one("timestampoffset",function(){t.state="READY",t.paused()||t.monitorBuffer_()}),void(this.state="WAITING_ON_TIMELINE")}this.loadSegment_(e)}}},{key:"skipEmptySegments_",value:function(t){for(;t&&t.segment.empty;)t=this.generateSegmentInfo_(t.playlist,t.mediaIndex+1,t.startOfSegment+t.duration,t.isSyncRequest);return t}},{key:"handleSegment_",value:function(){var e=this;if(this.pendingSegment_&&this.subtitlesTrack_){this.state="APPENDING";var t=this.pendingSegment_,i=t.segment;if("function"!=typeof v.WebVTT&&this.subtitlesTrack_&&this.subtitlesTrack_.tech_){var n=function(){e.handleSegment_()};return this.state="WAITING_ON_VTTJS",this.subtitlesTrack_.tech_.one("vttjsloaded",n),void this.subtitlesTrack_.tech_.one("vttjserror",function(){e.subtitlesTrack_.tech_.off("vttjsloaded",n),e.error({message:"Error loading vtt.js"}),e.state="READY",e.pause(),e.trigger("error")})}i.requested=!0;try{this.parseVTTCues_(t)}catch(t){return this.error({message:t.message}),this.state="READY",this.pause(),this.trigger("error")}if(this.updateTimeMapping_(t,this.syncController_.timelines[t.timeline],this.playlist_),t.isSyncRequest)return this.trigger("syncinfoupdate"),this.pendingSegment_=null,void(this.state="READY");t.byteLength=t.bytes.byteLength,this.mediaSecondsLoaded+=i.duration,t.cues.length&&this.remove(t.cues[0].endTime,t.cues[t.cues.length-1].endTime),t.cues.forEach(function(t){e.subtitlesTrack_.addCue(t)}),this.handleUpdateEnd_()}else this.state="READY"}},{key:"parseVTTCues_",value:function(e){var t=void 0,i=!1;"function"==typeof v.TextDecoder?t=new v.TextDecoder("utf8"):(t=v.WebVTT.StringDecoder(),i=!0);var n=new v.WebVTT.Parser(v,v.vttjs,t);if(e.cues=[],e.timestampmap={MPEGTS:0,LOCAL:0},n.oncue=e.cues.push.bind(e.cues),n.ontimestampmap=function(t){return e.timestampmap=t},n.onparsingerror=function(t){oa.log.warn("Error encountered when parsing cues: "+t.message)},e.segment.map){var r=e.segment.map.bytes;i&&(r=Yc(r)),n.parse(r)}var a=e.bytes;i&&(a=Yc(a)),n.parse(a),n.flush()}},{key:"updateTimeMapping_",value:function(t,e,i){var n=t.segment;if(e)if(t.cues.length){var r=t.timestampmap,a=r.MPEGTS/9e4-r.LOCAL+e.mapping;if(t.cues.forEach(function(t){t.startTime+=a,t.endTime+=a}),!i.syncInfo){var s=t.cues[0].startTime,o=t.cues[t.cues.length-1].startTime;i.syncInfo={mediaSequence:i.mediaSequence+t.mediaIndex,time:Math.min(s,o-n.duration)}}}else n.empty=!0}}]),n}(),Qc=function(t,e){for(var i=t.cues,n=0;n<i.length;n++){var r=i[n];if(e>=r.adStartTime&&e<=r.adEndTime)return r}return null},Jc=Yu,Zc=[{name:"VOD",run:function(t,e,i,n,r){if(i===1/0)return null;return{time:0,segmentIndex:0}}},{name:"ProgramDateTime",run:function(t,e,i,n,r){if(!t.datetimeToDisplayTime)return null;var a=e.segments||[],s=null,o=null;r=r||0;for(var u=0;u<a.length;u++){var l=a[u];if(l.dateTimeObject){var c=l.dateTimeObject.getTime()/1e3+t.datetimeToDisplayTime,h=Math.abs(r-c);if(null!==o&&o<h)break;o=h,s={time:c,segmentIndex:u}}}return s}},{name:"Segment",run:function(t,e,i,n,r){var a=e.segments||[],s=null,o=null;r=r||0;for(var u=0;u<a.length;u++){var l=a[u];if(l.timeline===n&&"undefined"!=typeof l.start){var c=Math.abs(r-l.start);if(null!==o&&o<c)break;(!s||null===o||c<=o)&&(o=c,s={time:l.start,segmentIndex:u})}}return s}},{name:"Discontinuity",run:function(t,e,i,n,r){var a=null;if(r=r||0,e.discontinuityStarts&&e.discontinuityStarts.length)for(var s=null,o=0;o<e.discontinuityStarts.length;o++){var u=e.discontinuityStarts[o],l=e.discontinuitySequence+o+1,c=t.discontinuities[l];if(c){var h=Math.abs(r-c.time);if(null!==s&&s<h)break;(!a||null===s||h<=s)&&(s=h,a={time:c.time,segmentIndex:u})}}return a}},{name:"Playlist",run:function(t,e,i,n,r){return e.syncInfo?{time:e.syncInfo.time,segmentIndex:e.syncInfo.mediaSequence-e.mediaSequence}:null}}],th=function(t){function e(){al(this,e);var t=ul(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.inspectCache_=void 0,t.timelines=[],t.discontinuities=[],t.datetimeToDisplayTime=null,t.logger_=Oc("SyncController"),t}return ol(e,oa.EventTarget),sl(e,[{key:"getSyncPoint",value:function(t,e,i,n){var r=this.runStrategies_(t,e,i,n);return r.length?this.selectSyncPoint_(r,{key:"time",value:n}):null}},{key:"getExpiredTime",value:function(t,e){if(!t||!t.segments)return null;var i=this.runStrategies_(t,e,t.discontinuitySequence,0);if(!i.length)return null;var n=this.selectSyncPoint_(i,{key:"segmentIndex",value:0});return 0<n.segmentIndex&&(n.time*=-1),Math.abs(n.time+Sl(t,n.segmentIndex,0))}},{key:"runStrategies_",value:function(t,e,i,n){for(var r=[],a=0;a<Zc.length;a++){var s=Zc[a],o=s.run(this,t,e,i,n);o&&(o.strategy=s.name,r.push({strategy:s.name,syncPoint:o}))}return r}},{key:"selectSyncPoint_",value:function(t,e){for(var i=t[0].syncPoint,n=Math.abs(t[0].syncPoint[e.key]-e.value),r=t[0].strategy,a=1;a<t.length;a++){var s=Math.abs(t[a].syncPoint[e.key]-e.value);s<n&&(n=s,i=t[a].syncPoint,r=t[a].strategy)}return this.logger_("syncPoint for ["+e.key+": "+e.value+"] chosen with strategy ["+r+"]: [time:"+i.time+", segmentIndex:"+i.segmentIndex+"]"),i}},{key:"saveExpiredSegmentInfo",value:function(t,e){for(var i=e.mediaSequence-t.mediaSequence-1;0<=i;i--){var n=t.segments[i];if(n&&"undefined"!=typeof n.start){e.syncInfo={mediaSequence:t.mediaSequence+i,time:n.start},this.logger_("playlist refresh sync: [time:"+e.syncInfo.time+", mediaSequence: "+e.syncInfo.mediaSequence+"]"),this.trigger("syncinfoupdate");break}}}},{key:"setDateTimeMapping",value:function(t){if(!this.datetimeToDisplayTime&&t.segments&&t.segments.length&&t.segments[0].dateTimeObject){var e=t.segments[0].dateTimeObject.getTime()/1e3;this.datetimeToDisplayTime=-e}}},{key:"reset",value:function(){this.inspectCache_=void 0}},{key:"probeSegmentInfo",value:function(t){var e=t.segment,i=t.playlist,n=void 0;return(n=e.map?this.probeMp4Segment_(t):this.probeTsSegment_(t))&&this.calculateSegmentTimeMapping_(t,n)&&(this.saveDiscontinuitySyncInfo_(t),i.syncInfo||(i.syncInfo={mediaSequence:i.mediaSequence+t.mediaIndex,time:e.start})),n}},{key:"probeMp4Segment_",value:function(t){var e=t.segment,i=Qs.timescale(e.map.bytes),n=Qs.startTime(i,t.bytes);return null!==t.timestampOffset&&(t.timestampOffset-=n),{start:n,end:n+e.duration}}},{key:"probeTsSegment_",value:function(t){var e=Jc(t.bytes,this.inspectCache_),i=void 0,n=void 0;return e?(e.video&&2===e.video.length?(this.inspectCache_=e.video[1].dts,i=e.video[0].dtsTime,n=e.video[1].dtsTime):e.audio&&2===e.audio.length&&(this.inspectCache_=e.audio[1].dts,i=e.audio[0].dtsTime,n=e.audio[1].dtsTime),{start:i,end:n,containsVideo:e.video&&2===e.video.length,containsAudio:e.audio&&2===e.audio.length}):null}},{key:"timestampOffsetForTimeline",value:function(t){return"undefined"==typeof this.timelines[t]?null:this.timelines[t].time}},{key:"mappingForTimeline",value:function(t){return"undefined"==typeof this.timelines[t]?null:this.timelines[t].mapping}},{key:"calculateSegmentTimeMapping_",value:function(t,e){var i=t.segment,n=this.timelines[t.timeline];if(null!==t.timestampOffset)n={time:t.startOfSegment,mapping:t.startOfSegment-e.start},this.timelines[t.timeline]=n,this.trigger("timestampoffset"),this.logger_("time mapping for timeline "+t.timeline+": [time: "+n.time+"] [mapping: "+n.mapping+"]"),i.start=t.startOfSegment,i.end=e.end+n.mapping;else{if(!n)return!1;i.start=e.start+n.mapping,i.end=e.end+n.mapping}return!0}},{key:"saveDiscontinuitySyncInfo_",value:function(t){var e=t.playlist,i=t.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(e.discontinuityStarts&&e.discontinuityStarts.length)for(var n=0;n<e.discontinuityStarts.length;n++){var r=e.discontinuityStarts[n],a=e.discontinuitySequence+n+1,s=r-t.mediaIndex,o=Math.abs(s);if(!this.discontinuities[a]||this.discontinuities[a].accuracy>o){var u=void 0;u=s<0?i.start-Sl(e,t.mediaIndex,r):i.end+Sl(e,t.mediaIndex+1,r),this.discontinuities[a]={time:u,accuracy:o}}}}}]),e}(),eh=new ac("./decrypter-worker.worker.js",function(t,e){var h,i,d,g,n,l,y,s,r=this;h=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},i=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),d=null,g=function(){function c(t){h(this,c),d||(d=function(){var t=[[[],[],[],[],[]],[[],[],[],[],[]]],e=t[0],i=t[1],n=e[4],r=i[4],a=void 0,s=void 0,o=void 0,u=[],l=[],c=void 0,h=void 0,d=void 0,p=void 0,f=void 0;for(a=0;a<256;a++)l[(u[a]=a<<1^283*(a>>7))^a]=a;for(s=o=0;!n[s];s^=c||1,o=l[o]||1)for(d=(d=o^o<<1^o<<2^o<<3^o<<4)>>8^255&d^99,f=16843009*u[h=u[c=u[r[n[s]=d]=s]]]^65537*h^257*c^16843008*s,p=257*u[d]^16843008*d,a=0;a<4;a++)e[a][s]=p=p<<24^p>>>8,i[a][d]=f=f<<24^f>>>8;for(a=0;a<5;a++)e[a]=e[a].slice(0),i[a]=i[a].slice(0);return t}()),this._tables=[[d[0][0].slice(),d[0][1].slice(),d[0][2].slice(),d[0][3].slice(),d[0][4].slice()],[d[1][0].slice(),d[1][1].slice(),d[1][2].slice(),d[1][3].slice(),d[1][4].slice()]];var e=void 0,i=void 0,n=void 0,r=void 0,a=void 0,s=this._tables[0][4],o=this._tables[1],u=t.length,l=1;if(4!==u&&6!==u&&8!==u)throw new Error("Invalid aes key size");for(r=t.slice(0),a=[],this._key=[r,a],e=u;e<4*u+28;e++)n=r[e-1],(e%u==0||8===u&&e%u==4)&&(n=s[n>>>24]<<24^s[n>>16&255]<<16^s[n>>8&255]<<8^s[255&n],e%u==0&&(n=n<<8^n>>>24^l<<24,l=l<<1^283*(l>>7))),r[e]=r[e-u]^n;for(i=0;e;i++,e--)n=r[3&i?e:e-4],a[i]=e<=4||i<4?n:o[0][s[n>>>24]]^o[1][s[n>>16&255]]^o[2][s[n>>8&255]]^o[3][s[255&n]]}return c.prototype.decrypt=function(t,e,i,n,r,a){var s=this._key[1],o=t^s[0],u=n^s[1],l=i^s[2],c=e^s[3],h=void 0,d=void 0,p=void 0,f=s.length/4-2,m=void 0,g=4,y=this._tables[1],v=y[0],_=y[1],b=y[2],T=y[3],S=y[4];for(m=0;m<f;m++)h=v[o>>>24]^_[u>>16&255]^b[l>>8&255]^T[255&c]^s[g],d=v[u>>>24]^_[l>>16&255]^b[c>>8&255]^T[255&o]^s[g+1],p=v[l>>>24]^_[c>>16&255]^b[o>>8&255]^T[255&u]^s[g+2],c=v[c>>>24]^_[o>>16&255]^b[u>>8&255]^T[255&l]^s[g+3],g+=4,o=h,u=d,l=p;for(m=0;m<4;m++)r[(3&-m)+a]=S[o>>>24]<<24^S[u>>16&255]<<16^S[l>>8&255]<<8^S[255&c]^s[g++],h=o,o=u,u=l,l=c,c=h},c}(),n=function(){function t(){h(this,t),this.listeners={}}return t.prototype.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},t.prototype.off=function(t,e){if(!this.listeners[t])return!1;var i=this.listeners[t].indexOf(e);return this.listeners[t].splice(i,1),-1<i},t.prototype.trigger=function(t){var e=this.listeners[t];if(e)if(2===arguments.length)for(var i=e.length,n=0;n<i;++n)e[n].call(this,arguments[1]);else for(var r=Array.prototype.slice.call(arguments,1),a=e.length,s=0;s<a;++s)e[s].apply(this,r)},t.prototype.dispose=function(){this.listeners={}},t.prototype.pipe=function(e){this.on("data",function(t){e.push(t)})},t}(),l=function(e){function i(){h(this,i);var t=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,e.call(this,n));return t.jobs=[],t.delay=1,t.timeout_=null,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(i,e),i.prototype.processJob_=function(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null},i.prototype.push=function(t){this.jobs.push(t),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))},i}(n),y=function(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24},s=function(){function u(t,e,i,n){h(this,u);var r=u.STEP,a=new Int32Array(t.buffer),s=new Uint8Array(t.byteLength),o=0;for(this.asyncStream_=new l,this.asyncStream_.push(this.decryptChunk_(a.subarray(o,o+r),e,i,s)),o=r;o<a.length;o+=r)i=new Uint32Array([y(a[o-4]),y(a[o-3]),y(a[o-2]),y(a[o-1])]),this.asyncStream_.push(this.decryptChunk_(a.subarray(o,o+r),e,i,s));this.asyncStream_.push(function(){var t;n(null,(t=s).subarray(0,t.byteLength-t[t.byteLength-1]))})}return u.prototype.decryptChunk_=function(e,i,n,r){return function(){var t=function(t,e,i){var n=new Int32Array(t.buffer,t.byteOffset,t.byteLength>>2),r=new g(Array.prototype.slice.call(e)),a=new Uint8Array(t.byteLength),s=new Int32Array(a.buffer),o=void 0,u=void 0,l=void 0,c=void 0,h=void 0,d=void 0,p=void 0,f=void 0,m=void 0;for(o=i[0],u=i[1],l=i[2],c=i[3],m=0;m<n.length;m+=4)h=y(n[m]),d=y(n[m+1]),p=y(n[m+2]),f=y(n[m+3]),r.decrypt(h,d,p,f,s,m),s[m]=y(s[m]^o),s[m+1]=y(s[m+1]^u),s[m+2]=y(s[m+2]^l),s[m+3]=y(s[m+3]^c),o=h,u=d,l=p,c=f;return a}(e,i,n);r.set(t,e.byteOffset)}},i(u,null,[{key:"STEP",get:function(){return 32e3}}]),u}(),new function(a){a.onmessage=function(t){var r=t.data,e=new Uint8Array(r.encrypted.bytes,r.encrypted.byteOffset,r.encrypted.byteLength),i=new Uint32Array(r.key.bytes,r.key.byteOffset,r.key.byteLength/4),n=new Uint32Array(r.iv.bytes,r.iv.byteOffset,r.iv.byteLength/4);new s(e,i,n,function(t,e){var i,n;a.postMessage((i={source:r.source,decrypted:e},n={},Object.keys(i).forEach(function(t){var e=i[t];ArrayBuffer.isView(e)?n[t]={bytes:e.buffer,byteOffset:e.byteOffset,byteLength:e.byteLength}:n[t]=e}),n),[e.buffer])})}}(r)}),ih=function(t,e){t.abort(),t.pause(),e&&e.activePlaylistLoader&&(e.activePlaylistLoader.pause(),e.activePlaylistLoader=null)},nh=function(t,e){(e.activePlaylistLoader=t).load()},rh={AUDIO:function(u,l){return function(){var t=l.segmentLoaders[u],e=l.mediaTypes[u],i=l.blacklistCurrentPlaylist;ih(t,e);var n=e.activeTrack(),r=e.activeGroup(),a=(r.filter(function(t){return t.default})[0]||r[0]).id,s=e.tracks[a];if(n!==s){for(var o in oa.log.warn("Problem encountered loading the alternate audio track.Switching back to default."),e.tracks)e.tracks[o].enabled=e.tracks[o]===s;e.onTrackChanged()}else i({message:"Problem encountered loading the default audio track."})}},SUBTITLES:function(n,r){return function(){var t=r.segmentLoaders[n],e=r.mediaTypes[n];oa.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track."),ih(t,e);var i=e.activeTrack();i&&(i.mode="disabled"),e.onTrackChanged()}}},ah={AUDIO:function(t,e,i){if(e){var n=i.tech,r=i.requestOptions,a=i.segmentLoaders[t];e.on("loadedmetadata",function(){var t=e.media();a.playlist(t,r),(!n.paused()||t.endList&&"none"!==n.preload())&&a.load()}),e.on("loadedplaylist",function(){a.playlist(e.media(),r),n.paused()||a.load()}),e.on("error",rh[t](t,i))}},SUBTITLES:function(t,e,i){var n=i.tech,r=i.requestOptions,a=i.segmentLoaders[t],s=i.mediaTypes[t];e.on("loadedmetadata",function(){var t=e.media();a.playlist(t,r),a.track(s.activeTrack()),(!n.paused()||t.endList&&"none"!==n.preload())&&a.load()}),e.on("loadedplaylist",function(){a.playlist(e.media(),r),n.paused()||a.load()}),e.on("error",rh[t](t,i))}},sh=function(e,i){return function(t){return t.attributes[e]===i}},oh=function(e){return function(t){return t.resolvedUri===e}},uh={AUDIO:function(t,e){var i,n,r=e.hls,a=e.sourceType,s=e.segmentLoaders[t],o=e.requestOptions.withCredentials,u=e.master,l=u.mediaGroups,c=u.playlists,h=e.mediaTypes[t],d=h.groups,p=h.tracks,f=e.masterPlaylistLoader;for(var m in l[t]&&0!==Object.keys(l[t]).length||(l[t]={main:{default:{default:!0}}}),l[t]){d[m]||(d[m]=[]);var g=c.filter(sh(t,m));for(var y in l[t][m]){var v=l[t][m][y];g.filter(oh(v.resolvedUri)).length&&delete v.resolvedUri;var _=void 0;if(_=v.resolvedUri?new vl(v.resolvedUri,r,o):v.playlists&&"dash"===a?new Lc(v.playlists[0],r,o,f):null,v=oa.mergeOptions({id:y,playlistLoader:_},v),ah[t](t,v.playlistLoader,e),d[m].push(v),"undefined"==typeof p[y]){var b=new oa.AudioTrack({id:y,kind:(i=v,n=void 0,n=i.default?"main":"alternative",i.characteristics&&0<=i.characteristics.indexOf("public.accessibility.describes-video")&&(n="main-desc"),n),enabled:!1,language:v.language,default:v.default,label:y});p[y]=b}}}s.on("error",rh[t](t,e))},SUBTITLES:function(t,e){var i=e.tech,n=e.hls,r=e.sourceType,a=e.segmentLoaders[t],s=e.requestOptions.withCredentials,o=e.master.mediaGroups,u=e.mediaTypes[t],l=u.groups,c=u.tracks,h=e.masterPlaylistLoader;for(var d in o[t])for(var p in l[d]||(l[d]=[]),o[t][d])if(!o[t][d][p].forced){var f=o[t][d][p],m=void 0;if("hls"===r?m=new vl(f.resolvedUri,n,s):"dash"===r&&(m=new Lc(f.playlists[0],n,s,h)),f=oa.mergeOptions({id:p,playlistLoader:m},f),ah[t](t,f.playlistLoader,e),l[d].push(f),"undefined"==typeof c[p]){var g=i.addRemoteTextTrack({id:p,kind:"subtitles",default:f.default&&f.autoselect,language:f.language,label:p},!1).track;c[p]=g}}a.on("error",rh[t](t,e))},"CLOSED-CAPTIONS":function(t,e){var i=e.tech,n=e.master.mediaGroups,r=e.mediaTypes[t],a=r.groups,s=r.tracks;for(var o in n[t])for(var u in a[o]||(a[o]=[]),n[t][o]){var l=n[t][o][u];if(l.instreamId.match(/CC\d/)&&(a[o].push(oa.mergeOptions({id:u},l)),"undefined"==typeof s[u])){var c=i.addRemoteTextTrack({id:l.instreamId,kind:"captions",default:l.default&&l.autoselect,language:l.language,label:u},!1).track;s[u]=c}}}},lh={AUDIO:function(i,n){return function(){var t=n.mediaTypes[i].tracks;for(var e in t)if(t[e].enabled)return t[e];return null}},SUBTITLES:function(i,n){return function(){var t=n.mediaTypes[i].tracks;for(var e in t)if("showing"===t[e].mode)return t[e];return null}}},ch=function(e){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(function(t){uh[t](t,e)});var i=e.mediaTypes,t=e.masterPlaylistLoader,n=e.tech,r=e.hls;["AUDIO","SUBTITLES"].forEach(function(t){var a,s,o,u,l,c;i[t].activeGroup=(a=t,s=e,function(e){var t=s.masterPlaylistLoader,i=s.mediaTypes[a].groups,n=t.media();if(!n)return null;var r=null;return n.attributes[a]&&(r=i[n.attributes[a]]),r=r||i.main,"undefined"==typeof e?r:null===e?null:r.filter(function(t){return t.id===e.id})[0]||null}),i[t].activeTrack=lh[t](t,e),i[t].onGroupChanged=(o=t,u=e,function(){var t=u.segmentLoaders,e=t[o],i=t.main,n=u.mediaTypes[o],r=n.activeTrack(),a=n.activeGroup(r),s=n.activePlaylistLoader;ih(e,n),a&&(a.playlistLoader?(e.resyncLoader(),nh(a.playlistLoader,n)):s&&i.resetEverything())}),i[t].onTrackChanged=(l=t,c=e,function(){var t=c.segmentLoaders,e=t[l],i=t.main,n=c.mediaTypes[l],r=n.activeTrack(),a=n.activeGroup(r),s=n.activePlaylistLoader;ih(e,n),a&&(a.playlistLoader?(s!==a.playlistLoader&&(e.track&&e.track(r),e.resetEverything()),nh(a.playlistLoader,n)):i.resetEverything())})});var a=i.AUDIO.activeGroup(),s=(a.filter(function(t){return t.default})[0]||a[0]).id;i.AUDIO.tracks[s].enabled=!0,i.AUDIO.onTrackChanged(),t.on("mediachange",function(){["AUDIO","SUBTITLES"].forEach(function(t){return i[t].onGroupChanged()})});var o=function(){i.AUDIO.onTrackChanged(),n.trigger({type:"usage",name:"hls-audio-change"})};for(var u in n.audioTracks().addEventListener("change",o),n.remoteTextTracks().addEventListener("change",i.SUBTITLES.onTrackChanged),r.on("dispose",function(){n.audioTracks().removeEventListener("change",o),n.remoteTextTracks().removeEventListener("change",i.SUBTITLES.onTrackChanged)}),n.clearTracks("audio"),i.AUDIO.tracks)n.audioTracks().addTrack(i.AUDIO.tracks[u])},hh=void 0,dh=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred"],ph=function(t){function f(t){al(this,f);var e,i=ul(this,(f.__proto__||Object.getPrototypeOf(f)).call(this)),n=t.url,r=t.withCredentials,a=t.tech,s=t.bandwidth,o=t.externHls,u=t.useCueTags,l=t.blacklistDuration,c=t.enableLowInitialPlaylist,h=t.sourceType,d=t.seekTo;if(!n)throw new Error("A non-empty playlist URL is required");hh=o,i.withCredentials=r,i.tech_=a,i.hls_=a.hls,i.seekTo_=d,i.sourceType_=h,i.useCueTags_=u,i.blacklistDuration=l,i.enableLowInitialPlaylist=c,i.useCueTags_&&(i.cueTagsTrack_=i.tech_.addTextTrack("metadata","ad-cues"),i.cueTagsTrack_.inBandMetadataTrackDispatchType=""),i.requestOptions_={withCredentials:i.withCredentials,timeout:null},i.mediaTypes_=(e={},["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(function(t){e[t]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:Pc,activeTrack:Pc,onGroupChanged:Pc,onTrackChanged:Pc}}),e),i.mediaSource=new oa.MediaSource,i.mediaSource.addEventListener("sourceopen",i.handleSourceOpen_.bind(i)),i.seekable_=oa.createTimeRanges(),i.hasPlayed_=function(){return!1},i.syncController_=new th(t),i.segmentMetadataTrack_=a.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track,i.decrypter_=new eh,i.inbandTextTracks_={};var p={hls:i.hls_,mediaSource:i.mediaSource,currentTime:i.tech_.currentTime.bind(i.tech_),seekable:function(){return i.seekable()},seeking:function(){return i.tech_.seeking()},duration:function(){return i.mediaSource.duration},hasPlayed:function(){return i.hasPlayed_()},goalBufferLength:function(){return i.goalBufferLength()},bandwidth:s,syncController:i.syncController_,decrypter:i.decrypter_,sourceType:i.sourceType_,inbandTextTracks:i.inbandTextTracks_};return i.masterPlaylistLoader_="dash"===i.sourceType_?new Lc(n,i.hls_,i.withCredentials):new vl(n,i.hls_,i.withCredentials),i.setupMasterPlaylistLoaderListeners_(),i.mainSegmentLoader_=new Xc(oa.mergeOptions(p,{segmentMetadataTrack:i.segmentMetadataTrack_,loaderType:"main"}),t),i.audioSegmentLoader_=new Xc(oa.mergeOptions(p,{loaderType:"audio"}),t),i.subtitleSegmentLoader_=new Kc(oa.mergeOptions(p,{loaderType:"vtt"}),t),i.setupSegmentLoaderListeners_(),dh.forEach(function(t){i[t+"_"]=function(t){return this.audioSegmentLoader_[t]+this.mainSegmentLoader_[t]}.bind(i,t)}),i.logger_=Oc("MPC"),i.masterPlaylistLoader_.load(),i}return ol(f,oa.EventTarget),sl(f,[{key:"setupMasterPlaylistLoaderListeners_",value:function(){var n=this;this.masterPlaylistLoader_.on("loadedmetadata",function(){var t=n.masterPlaylistLoader_.media(),e=1.5*n.masterPlaylistLoader_.targetDuration*1e3;Il(n.masterPlaylistLoader_.master,n.masterPlaylistLoader_.media())?n.requestOptions_.timeout=0:n.requestOptions_.timeout=e,t.endList&&"none"!==n.tech_.preload()&&(n.mainSegmentLoader_.playlist(t,n.requestOptions_),n.mainSegmentLoader_.load()),ch({sourceType:n.sourceType_,segmentLoaders:{AUDIO:n.audioSegmentLoader_,SUBTITLES:n.subtitleSegmentLoader_,main:n.mainSegmentLoader_},tech:n.tech_,requestOptions:n.requestOptions_,masterPlaylistLoader:n.masterPlaylistLoader_,hls:n.hls_,master:n.master(),mediaTypes:n.mediaTypes_,blacklistCurrentPlaylist:n.blacklistCurrentPlaylist.bind(n)}),n.triggerPresenceUsage_(n.master(),t);try{n.setupSourceBuffers_()}catch(t){return oa.log.warn("Failed to create SourceBuffers",t),n.mediaSource.endOfStream("decode")}n.setupFirstPlay(),n.trigger("selectedinitialmedia")}),this.masterPlaylistLoader_.on("loadedplaylist",function(){var t=n.masterPlaylistLoader_.media();if(!t){n.excludeUnsupportedVariants_();var e=void 0;return n.enableLowInitialPlaylist&&(e=n.selectInitialPlaylist()),e||(e=n.selectPlaylist()),n.initialMedia_=e,void n.masterPlaylistLoader_.media(n.initialMedia_)}if(n.useCueTags_&&n.updateAdCues_(t),n.mainSegmentLoader_.playlist(t,n.requestOptions_),n.updateDuration(),n.tech_.paused()||(n.mainSegmentLoader_.load(),n.audioSegmentLoader_&&n.audioSegmentLoader_.load()),!t.endList){var i=function(){var t=n.seekable();0!==t.length&&n.mediaSource.addSeekableRange_(t.start(0),t.end(0))};if(n.duration()!==1/0){n.tech_.one("durationchange",function t(){n.duration()===1/0?i():n.tech_.one("durationchange",t)})}else i()}}),this.masterPlaylistLoader_.on("error",function(){n.blacklistCurrentPlaylist(n.masterPlaylistLoader_.error)}),this.masterPlaylistLoader_.on("mediachanging",function(){n.mainSegmentLoader_.abort(),n.mainSegmentLoader_.pause()}),this.masterPlaylistLoader_.on("mediachange",function(){var t=n.masterPlaylistLoader_.media(),e=1.5*n.masterPlaylistLoader_.targetDuration*1e3;Il(n.masterPlaylistLoader_.master,n.masterPlaylistLoader_.media())?n.requestOptions_.timeout=0:n.requestOptions_.timeout=e,n.mainSegmentLoader_.playlist(t,n.requestOptions_),n.mainSegmentLoader_.load(),n.tech_.trigger({type:"mediachange",bubbles:!0})}),this.masterPlaylistLoader_.on("playlistunchanged",function(){var t=n.masterPlaylistLoader_.media();n.stuckAtPlaylistEnd_(t)&&(n.blacklistCurrentPlaylist({message:"Playlist no longer updating."}),n.tech_.trigger("playliststuck"))}),this.masterPlaylistLoader_.on("renditiondisabled",function(){n.tech_.trigger({type:"usage",name:"hls-rendition-disabled"})}),this.masterPlaylistLoader_.on("renditionenabled",function(){n.tech_.trigger({type:"usage",name:"hls-rendition-enabled"})})}},{key:"triggerPresenceUsage_",value:function(t,e){var i=t.mediaGroups||{},n=!0,r=Object.keys(i.AUDIO);for(var a in i.AUDIO)for(var s in i.AUDIO[a]){i.AUDIO[a][s].uri||(n=!1)}n&&this.tech_.trigger({type:"usage",name:"hls-demuxed"}),Object.keys(i.SUBTITLES).length&&this.tech_.trigger({type:"usage",name:"hls-webvtt"}),hh.Playlist.isAes(e)&&this.tech_.trigger({type:"usage",name:"hls-aes"}),hh.Playlist.isFmp4(e)&&this.tech_.trigger({type:"usage",name:"hls-fmp4"}),r.length&&1<Object.keys(i.AUDIO[r[0]]).length&&this.tech_.trigger({type:"usage",name:"hls-alternate-audio"}),this.useCueTags_&&this.tech_.trigger({type:"usage",name:"hls-playlist-cue-tags"})}},{key:"setupSegmentLoaderListeners_",value:function(){var a=this;this.mainSegmentLoader_.on("bandwidthupdate",function(){var t=a.selectPlaylist(),e=a.masterPlaylistLoader_.media(),i=a.tech_.buffered(),n=i.length?i.end(i.length-1)-a.tech_.currentTime():0,r=a.bufferLowWaterLine();(!e.endList||a.duration()<xc.MAX_BUFFER_LOW_WATER_LINE||t.attributes.BANDWIDTH<e.attributes.BANDWIDTH||r<=n)&&a.masterPlaylistLoader_.media(t),a.tech_.trigger("bandwidthupdate")}),this.mainSegmentLoader_.on("progress",function(){a.trigger("progress")}),this.mainSegmentLoader_.on("error",function(){a.blacklistCurrentPlaylist(a.mainSegmentLoader_.error())}),this.mainSegmentLoader_.on("syncinfoupdate",function(){a.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("timestampoffset",function(){a.tech_.trigger({type:"usage",name:"hls-timestamp-offset"})}),this.audioSegmentLoader_.on("syncinfoupdate",function(){a.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("ended",function(){a.onEndOfStream()}),this.mainSegmentLoader_.on("earlyabort",function(){a.blacklistCurrentPlaylist({message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},120)}),this.mainSegmentLoader_.on("reseteverything",function(){a.tech_.trigger("hls-reset")}),this.mainSegmentLoader_.on("segmenttimemapping",function(t){a.tech_.trigger({type:"hls-segment-time-mapping",mapping:t.mapping})}),this.audioSegmentLoader_.on("ended",function(){a.onEndOfStream()})}},{key:"mediaSecondsLoaded_",value:function(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}},{key:"load",value:function(){this.mainSegmentLoader_.load(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}},{key:"smoothQualityChange_",value:function(){var t=this.selectPlaylist();t!==this.masterPlaylistLoader_.media()&&(this.masterPlaylistLoader_.media(t),this.mainSegmentLoader_.resetLoader())}},{key:"fastQualityChange_",value:function(){var t=this,e=this.selectPlaylist();e!==this.masterPlaylistLoader_.media()&&(this.masterPlaylistLoader_.media(e),this.mainSegmentLoader_.resetEverything(function(){oa.browser.IE_VERSION||oa.browser.IS_EDGE?t.tech_.setCurrentTime(t.tech_.currentTime()+.04):t.tech_.setCurrentTime(t.tech_.currentTime())}))}},{key:"play",value:function(){if(!this.setupFirstPlay()){this.tech_.ended()&&this.seekTo_(0),this.hasPlayed_()&&this.load();var t=this.tech_.seekable();return this.tech_.duration()===1/0&&this.tech_.currentTime()<t.start(0)?this.seekTo_(t.end(t.length-1)):void 0}}},{key:"setupFirstPlay",value:function(){var t=this,e=this.masterPlaylistLoader_.media();if(!e||this.tech_.paused()||this.hasPlayed_())return!1;if(!e.endList){var i=this.seekable();if(!i.length)return!1;if(oa.browser.IE_VERSION&&0===this.tech_.readyState())return this.tech_.one("loadedmetadata",function(){t.trigger("firstplay"),t.seekTo_(i.end(0)),t.hasPlayed_=function(){return!0}}),!1;this.trigger("firstplay"),this.seekTo_(i.end(0))}return this.hasPlayed_=function(){return!0},this.load(),!0}},{key:"handleSourceOpen_",value:function(){try{this.setupSourceBuffers_()}catch(t){return oa.log.warn("Failed to create Source Buffers",t),this.mediaSource.endOfStream("decode")}if(this.tech_.autoplay()){var t=this.tech_.play();"undefined"!=typeof t&&"function"==typeof t.then&&t.then(null,function(t){})}this.trigger("sourceopen")}},{key:"onEndOfStream",value:function(){var t=this.mainSegmentLoader_.ended_;this.mediaTypes_.AUDIO.activePlaylistLoader&&(t=!this.mainSegmentLoader_.startingMedia_||this.mainSegmentLoader_.startingMedia_.containsVideo?t&&this.audioSegmentLoader_.ended_:this.audioSegmentLoader_.ended_),t&&this.mediaSource.endOfStream()}},{key:"stuckAtPlaylistEnd_",value:function(t){if(!this.seekable().length)return!1;var e=this.syncController_.getExpiredTime(t,this.mediaSource.duration);if(null===e)return!1;var i=hh.Playlist.playlistEnd(t,e),n=this.tech_.currentTime(),r=this.tech_.buffered();if(!r.length)return i-n<=.1;var a=r.end(r.length-1);return a-n<=.1&&i-a<=.1}},{key:"blacklistCurrentPlaylist",value:function(){var t,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},i=arguments[1],n=void 0;if(n=e.playlist||this.masterPlaylistLoader_.media(),i=i||e.blacklistDuration||this.blacklistDuration,!n){this.error=e;try{return this.mediaSource.endOfStream("network")}catch(t){return this.trigger("error")}}var r=1===this.masterPlaylistLoader_.master.playlists.filter(Ul).length;return r?(oa.log.warn("Problem encountered with the current HLS playlist. Trying again since it is the final playlist."),this.tech_.trigger("retryplaylist"),this.masterPlaylistLoader_.load(r)):(n.excludeUntil=Date.now()+1e3*i,this.tech_.trigger("blacklistplaylist"),this.tech_.trigger({type:"usage",name:"hls-rendition-blacklisted"}),t=this.selectPlaylist(),oa.log.warn("Problem encountered with the current HLS playlist."+(e.message?" "+e.message:"")+" Switching to another playlist."),this.masterPlaylistLoader_.media(t))}},{key:"pauseLoading",value:function(){this.mainSegmentLoader_.pause(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.pause(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.pause()}},{key:"setCurrentTime",value:function(t){var e=Gl(this.tech_.buffered(),t);return this.masterPlaylistLoader_&&this.masterPlaylistLoader_.media()&&this.masterPlaylistLoader_.media().segments?e&&e.length?t:(this.mainSegmentLoader_.resetEverything(),this.mainSegmentLoader_.abort(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.resetEverything(),this.audioSegmentLoader_.abort()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.resetEverything(),this.subtitleSegmentLoader_.abort()),void this.load()):0}},{key:"duration",value:function(){return this.masterPlaylistLoader_?this.mediaSource?this.mediaSource.duration:hh.Playlist.duration(this.masterPlaylistLoader_.media()):0}},{key:"seekable",value:function(){return this.seekable_}},{key:"onSyncInfoUpdate_",value:function(){var t=void 0,e=void 0;if(this.masterPlaylistLoader_){var i=this.masterPlaylistLoader_.media();if(i){var n=this.syncController_.getExpiredTime(i,this.mediaSource.duration);if(null!==n&&0!==(t=hh.Playlist.seekable(i,n)).length){if(this.mediaTypes_.AUDIO.activePlaylistLoader){if(i=this.mediaTypes_.AUDIO.activePlaylistLoader.media(),null===(n=this.syncController_.getExpiredTime(i,this.mediaSource.duration)))return;if(0===(e=hh.Playlist.seekable(i,n)).length)return}e?e.start(0)>t.end(0)||t.start(0)>e.end(0)?this.seekable_=t:this.seekable_=oa.createTimeRanges([[e.start(0)>t.start(0)?e.start(0):t.start(0),e.end(0)<t.end(0)?e.end(0):t.end(0)]]):this.seekable_=t,this.logger_("seekable updated ["+Yl(this.seekable_)+"]"),this.tech_.trigger("seekablechanged")}}}}},{key:"updateDuration",value:function(){var e=this,t=this.mediaSource.duration,i=hh.Playlist.duration(this.masterPlaylistLoader_.media()),n=this.tech_.buffered(),r=function t(){e.mediaSource.duration=i,e.tech_.trigger("durationchange"),e.mediaSource.removeEventListener("sourceopen",t)};0<n.length&&(i=Math.max(i,n.end(n.length-1))),t!==i&&("open"!==this.mediaSource.readyState?this.mediaSource.addEventListener("sourceopen",r):r())}},{key:"dispose",value:function(){var n=this;this.decrypter_.terminate(),this.masterPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),["AUDIO","SUBTITLES"].forEach(function(t){var e=n.mediaTypes_[t].groups;for(var i in e)e[i].forEach(function(t){t.playlistLoader&&t.playlistLoader.dispose()})}),this.audioSegmentLoader_.dispose(),this.subtitleSegmentLoader_.dispose()}},{key:"master",value:function(){return this.masterPlaylistLoader_.master}},{key:"media",value:function(){return this.masterPlaylistLoader_.media()||this.initialMedia_}},{key:"setupSourceBuffers_",value:function(){var t,e=this.masterPlaylistLoader_.media();if(e&&"open"===this.mediaSource.readyState){if((t=mc(this.masterPlaylistLoader_.master,e)).length<1)return this.error="No compatible SourceBuffer configuration for the variant stream:"+e.resolvedUri,this.mediaSource.endOfStream("decode");this.configureLoaderMimeTypes_(t),this.excludeIncompatibleVariants_(e)}}},{key:"configureLoaderMimeTypes_",value:function(t){var e=1<t.length&&-1===t[0].indexOf(",")&&t[0]!==t[1]?new oa.EventTarget:null;this.mainSegmentLoader_.mimeType(t[0],e),t[1]&&this.audioSegmentLoader_.mimeType(t[1],e)}},{key:"excludeUnsupportedVariants_",value:function(){this.master().playlists.forEach(function(t){t.attributes.CODECS&&v.MediaSource&&v.MediaSource.isTypeSupported&&!v.MediaSource.isTypeSupported('video/mp4; codecs="'+t.attributes.CODECS.replace(/avc1\.(\d+)\.(\d+)/i,function(t){return dc([t])[0]})+'"')&&(t.excludeUntil=1/0)})}},{key:"excludeIncompatibleVariants_",value:function(t){var i=2,n=null,e=void 0;t.attributes.CODECS&&(e=pc(t.attributes.CODECS),n=e.videoCodec,i=e.codecCount),this.master().playlists.forEach(function(t){var e={codecCount:2,videoCodec:null};t.attributes.CODECS&&(e=pc(t.attributes.CODECS)),e.codecCount!==i&&(t.excludeUntil=1/0),e.videoCodec!==n&&(t.excludeUntil=1/0)})}},{key:"updateAdCues_",value:function(t){var e=0,i=this.seekable();i.length&&(e=i.start(0)),function(t,e){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;if(t.segments)for(var n=i,r=void 0,a=0;a<t.segments.length;a++){var s=t.segments[a];if(r||(r=Qc(e,n+s.duration/2)),r){if("cueIn"in s){r.endTime=n,r.adEndTime=n,n+=s.duration,r=null;continue}if(n<r.endTime){n+=s.duration;continue}r.endTime+=s.duration}else if("cueOut"in s&&((r=new v.VTTCue(n,n+s.duration,s.cueOut)).adStartTime=n,r.adEndTime=n+parseFloat(s.cueOut),e.addCue(r)),"cueOutCont"in s){var o,u,l=s.cueOutCont.split("/").map(parseFloat),c=ll(l,2);o=c[0],u=c[1],(r=new v.VTTCue(n,n+s.duration,"")).adStartTime=n-o,r.adEndTime=r.adStartTime+u,e.addCue(r)}n+=s.duration}}(t,this.cueTagsTrack_,e)}},{key:"goalBufferLength",value:function(){var t=this.tech_.currentTime(),e=xc.GOAL_BUFFER_LENGTH,i=xc.GOAL_BUFFER_LENGTH_RATE,n=Math.max(e,xc.MAX_GOAL_BUFFER_LENGTH);return Math.min(e+t*i,n)}},{key:"bufferLowWaterLine",value:function(){var t=this.tech_.currentTime(),e=xc.BUFFER_LOW_WATER_LINE,i=xc.BUFFER_LOW_WATER_LINE_RATE,n=Math.max(e,xc.MAX_BUFFER_LOW_WATER_LINE);return Math.min(e+t*i,n)}}]),f}(),fh=function t(e,i,n){al(this,t);var r,a,s,o=e.masterPlaylistController_,u=o[(e.options_.smoothQualityChange?"smooth":"fast")+"QualityChange_"].bind(o);if(i.attributes.RESOLUTION){var l=i.attributes.RESOLUTION;this.width=l.width,this.height=l.height}this.bandwidth=i.attributes.BANDWIDTH,this.id=n,this.enabled=(r=e.playlists,a=i.uri,s=u,function(t){var e=r.master.playlists[a],i=Pl(e),n=Ul(e);return"undefined"==typeof t?n:(t?delete e.disabled:e.disabled=!0,t===n||i||(s(),t?r.trigger("renditionenabled"):r.trigger("renditiondisabled")),t)})},mh=["seeking","seeked","pause","playing","error"],gh=function(){function s(t){var e=this;al(this,s),this.tech_=t.tech,this.seekable=t.seekable,this.seekTo=t.seekTo,this.consecutiveUpdates=0,this.lastRecordedTime=null,this.timer_=null,this.checkCurrentTimeTimeout_=null,this.logger_=Oc("PlaybackWatcher"),this.logger_("initialize");var i=function(){return e.monitorCurrentTime_()},n=function(){return e.techWaiting_()},r=function(){return e.cancelTimer_()},a=function(){return e.fixesBadSeeks_()};this.tech_.on("seekablechanged",a),this.tech_.on("waiting",n),this.tech_.on(mh,r),this.tech_.on("canplay",i),this.dispose=function(){e.logger_("dispose"),e.tech_.off("seekablechanged",a),e.tech_.off("waiting",n),e.tech_.off(mh,r),e.tech_.off("canplay",i),e.checkCurrentTimeTimeout_&&v.clearTimeout(e.checkCurrentTimeTimeout_),e.cancelTimer_()}}return sl(s,[{key:"monitorCurrentTime_",value:function(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&v.clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=v.setTimeout(this.monitorCurrentTime_.bind(this),250)}},{key:"checkCurrentTime_",value:function(){if(this.tech_.seeking()&&this.fixesBadSeeks_())return this.consecutiveUpdates=0,void(this.lastRecordedTime=this.tech_.currentTime());if(!this.tech_.paused()&&!this.tech_.seeking()){var t=this.tech_.currentTime(),e=this.tech_.buffered();if(this.lastRecordedTime===t&&(!e.length||t+.1>=e.end(e.length-1)))return this.techWaiting_();5<=this.consecutiveUpdates&&t===this.lastRecordedTime?(this.consecutiveUpdates++,this.waiting_()):t===this.lastRecordedTime?this.consecutiveUpdates++:(this.consecutiveUpdates=0,this.lastRecordedTime=t)}}},{key:"cancelTimer_",value:function(){this.consecutiveUpdates=0,this.timer_&&(this.logger_("cancelTimer_"),clearTimeout(this.timer_)),this.timer_=null}},{key:"fixesBadSeeks_",value:function(){var t=this.tech_.seeking(),e=this.seekable(),i=this.tech_.currentTime(),n=void 0;t&&this.afterSeekableWindow_(e,i)&&(n=e.end(e.length-1));t&&this.beforeSeekableWindow_(e,i)&&(n=e.start(0)+.1);return"undefined"!=typeof n&&(this.logger_("Trying to seek outside of seekable at time "+i+" with seekable range "+Yl(e)+". Seeking to "+n+"."),this.seekTo(n),!0)}},{key:"waiting_",value:function(){if(!this.techWaiting_()){var t=this.tech_.currentTime(),e=this.tech_.buffered(),i=Gl(e,t);return i.length&&t+3<=i.end(0)?(this.cancelTimer_(),this.seekTo(t),this.logger_("Stopped at "+t+" while inside a buffered region ["+i.start(0)+" -> "+i.end(0)+"]. Attempting to resume playback by seeking to the current time."),void this.tech_.trigger({type:"usage",name:"hls-unknown-waiting"})):void 0}}},{key:"techWaiting_",value:function(){var t=this.seekable(),e=this.tech_.currentTime();if(this.tech_.seeking()&&this.fixesBadSeeks_())return!0;if(this.tech_.seeking()||null!==this.timer_)return!0;if(this.beforeSeekableWindow_(t,e)){var i=t.end(t.length-1);return this.logger_("Fell out of live window at time "+e+". Seeking to live point (seekable end) "+i),this.cancelTimer_(),this.seekTo(i),this.tech_.trigger({type:"usage",name:"hls-live-resync"}),!0}var n=this.tech_.buffered(),r=Xl(n,e);if(this.videoUnderflow_(r,n,e))return this.cancelTimer_(),this.seekTo(e),this.tech_.trigger({type:"usage",name:"hls-video-underflow"}),!0;if(0<r.length){var a=r.start(0)-e;return this.logger_("Stopped at "+e+", setting timer for "+a+", seeking to "+r.start(0)),this.timer_=setTimeout(this.skipTheGap_.bind(this),1e3*a,e),!0}return!1}},{key:"afterSeekableWindow_",value:function(t,e){return!!t.length&&e>t.end(t.length-1)+.1}},{key:"beforeSeekableWindow_",value:function(t,e){return!!(t.length&&0<t.start(0)&&e<t.start(0)-.1)}},{key:"videoUnderflow_",value:function(t,e,i){if(0===t.length){var n=this.gapFromVideoUnderflow_(e,i);if(n)return this.logger_("Encountered a gap in video from "+n.start+" to "+n.end+". Seeking to current time "+i),!0}return!1}},{key:"skipTheGap_",value:function(t){var e=this.tech_.buffered(),i=this.tech_.currentTime(),n=Xl(e,i);this.cancelTimer_(),0!==n.length&&i===t&&(this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",t,"nextRange start:",n.start(0)),this.seekTo(n.start(0)+zl),this.tech_.trigger({type:"usage",name:"hls-gap-skip"}))}},{key:"gapFromVideoUnderflow_",value:function(t,e){for(var i=function(t){if(t.length<2)return oa.createTimeRanges();for(var e=[],i=1;i<t.length;i++){var n=t.end(i-1),r=t.start(i);e.push([n,r])}return oa.createTimeRanges(e)}(t),n=0;n<i.length;n++){var r=i.start(n),a=i.end(n);if(e-r<4&&2<e-r)return{start:r,end:a}}return null}}]),s}(),yh={errorInterval:30,getSource:function(t){return t(this.tech({IWillNotUseThisInPlugins:!0}).currentSource_)}},vh=function(t){!function e(i,t){var n=0,r=0,a=oa.mergeOptions(yh,t);i.ready(function(){i.trigger({type:"usage",name:"hls-error-reload-initialized"})});var s=function(){r&&i.currentTime(r)},o=function(t){null!=t&&(r=i.duration()!==1/0&&i.currentTime()||0,i.one("loadedmetadata",s),i.src(t),i.trigger({type:"usage",name:"hls-error-reload"}),i.play())},u=function(){if(Date.now()-n<1e3*a.errorInterval)i.trigger({type:"usage",name:"hls-error-reload-canceled"});else{if(a.getSource&&"function"==typeof a.getSource)return n=Date.now(),a.getSource.call(i,o);oa.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!")}},l=function t(){i.off("loadedmetadata",s),i.off("error",u),i.off("dispose",t)};i.on("error",u),i.on("dispose",l),i.reloadSourceOnError=function(t){l(),e(i,t)}}(this,t)};oa.use("*",function(e){return{setSource:function(t,e){e(null,t)},setCurrentTime:function(t){return e.vhs&&e.currentSource().src===e.vhs.source_.src&&e.vhs.setCurrentTime(t),t},play:function(){e.vhs&&e.currentSource().src===e.vhs.source_.src&&e.vhs.setCurrentTime(e.currentTime())}}});var _h={PlaylistLoader:vl,Playlist:Dl,Decrypter:nl,AsyncStream:tl,decrypt:il,utils:ql,STANDARD_PLAYLIST_SELECTOR:function(){return function(t,e,i,n,r){var a=t.playlists.map(function(t){var e,i;return e=t.attributes.RESOLUTION&&t.attributes.RESOLUTION.width,i=t.attributes.RESOLUTION&&t.attributes.RESOLUTION.height,{bandwidth:t.attributes.BANDWIDTH||v.Number.MAX_VALUE,width:e,height:i,playlist:t}});qc(a,function(t,e){return t.bandwidth-e.bandwidth});var s=(a=a.filter(function(t){return!Dl.isIncompatible(t.playlist)})).filter(function(t){return Dl.isEnabled(t.playlist)});s.length||(s=a.filter(function(t){return!Dl.isDisabled(t.playlist)}));var o=s.filter(function(t){return t.bandwidth*xc.BANDWIDTH_VARIANCE<e}),u=o[o.length-1],l=o.filter(function(t){return t.bandwidth===u.bandwidth})[0];if(!1===r){var c=l||s[0]||a[0];return c?c.playlist:null}var h=o.filter(function(t){return t.width&&t.height});qc(h,function(t,e){return t.width-e.width});var d=h.filter(function(t){return t.width===i&&t.height===n});u=d[d.length-1];var p=d.filter(function(t){return t.bandwidth===u.bandwidth})[0],f=void 0,m=void 0,g=void 0;p||(m=(f=h.filter(function(t){return t.width>i||t.height>n})).filter(function(t){return t.width===f[0].width&&t.height===f[0].height}),u=m[m.length-1],g=m.filter(function(t){return t.bandwidth===u.bandwidth})[0]);var y=g||p||l||s[0]||a[0];return y?y.playlist:null}(this.playlists.master,this.systemBandwidth,parseInt(Hc(this.tech_.el(),"width"),10),parseInt(Hc(this.tech_.el(),"height"),10),this.limitRenditionByPlayerDimensions)},INITIAL_PLAYLIST_SELECTOR:function(){var t=this.playlists.master.playlists.filter(Dl.isEnabled);return qc(t,function(t,e){return zc(t,e)}),t.filter(function(t){return pc(t.attributes.CODECS).videoCodec})[0]||null},comparePlaylistBandwidth:zc,comparePlaylistResolution:function(t,e){var i=void 0,n=void 0;return t.attributes.RESOLUTION&&t.attributes.RESOLUTION.width&&(i=t.attributes.RESOLUTION.width),i=i||v.Number.MAX_VALUE,e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(n=e.attributes.RESOLUTION.width),i===(n=n||v.Number.MAX_VALUE)&&t.attributes.BANDWIDTH&&e.attributes.BANDWIDTH?t.attributes.BANDWIDTH-e.attributes.BANDWIDTH:i-n},xhr:Bl()};["GOAL_BUFFER_LENGTH","MAX_GOAL_BUFFER_LENGTH","GOAL_BUFFER_LENGTH_RATE","BUFFER_LOW_WATER_LINE","MAX_BUFFER_LOW_WATER_LINE","BUFFER_LOW_WATER_LINE_RATE","BANDWIDTH_VARIANCE"].forEach(function(e){Object.defineProperty(_h,e,{get:function(){return oa.log.warn("using Hls."+e+" is UNSAFE be sure you know what you are doing"),xc[e]},set:function(t){oa.log.warn("using Hls."+e+" is UNSAFE be sure you know what you are doing"),"number"!=typeof t||t<0?oa.log.warn("value of Hls."+e+" must be greater than or equal to 0"):xc[e]=t}})});var bh=function(t){if(/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i.test(t))return"hls";return/^application\/dash\+xml/i.test(t)?"dash":null},Th=function(t,e){for(var i=e.media(),n=-1,r=0;r<t.length;r++)if(t[r].id===i.uri){n=r;break}t.selectedIndex_=n,t.trigger({selectedIndex:n,type:"change"})};_h.canPlaySource=function(){return oa.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")};var Sh=function(t){if("dash"===t.options_.sourceType){var e=oa.players[t.tech_.options_.playerId];if(e.eme){var i=function(t,e,i){if(!t)return t;var n={};for(var r in t)n[r]={audioContentType:'audio/mp4; codecs="'+i.attributes.CODECS+'"',videoContentType:'video/mp4; codecs="'+e.attributes.CODECS+'"'},e.contentProtection&&e.contentProtection[r]&&e.contentProtection[r].pssh&&(n[r].pssh=e.contentProtection[r].pssh),"string"==typeof t[r]&&(n[r].url=t[r]);return oa.mergeOptions(t,n)}(t.source_.keySystems,t.playlists.media(),t.masterPlaylistController_.mediaTypes_.AUDIO.activePlaylistLoader.media());i&&(e.currentSource().keySystems=i,e.eme.initializeMediaKeys&&e.eme.initializeMediaKeys())}}};_h.supportsNativeHls=function(){var e=d.createElement("video");if(!oa.getTech("Html5").isSupported())return!1;return["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(e.canPlayType(t))})}(),_h.supportsNativeDash=!!oa.getTech("Html5").isSupported()&&/maybe|probably/i.test(d.createElement("video").canPlayType("application/dash+xml")),_h.supportsTypeNatively=function(t){return"hls"===t?_h.supportsNativeHls:"dash"===t&&_h.supportsNativeDash},_h.isSupported=function(){return oa.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")};var kh=oa.getComponent("Component"),wh=function(t){function a(t,e,i){al(this,a);var n=ul(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e,i.hls));if(e.options_&&e.options_.playerId){var r=oa(e.options_.playerId);r.hasOwnProperty("hls")||Object.defineProperty(r,"hls",{get:function(){return oa.log.warn("player.hls is deprecated. Use player.tech().hls instead."),e.trigger({type:"usage",name:"hls-player-access"}),n}}),r.vhs=n,r.dash=n}if(n.tech_=e,n.source_=t,n.stats={},n.setOptions_(),n.options_.overrideNative&&e.overrideNativeAudioTracks&&e.overrideNativeVideoTracks)e.overrideNativeAudioTracks(!0),e.overrideNativeVideoTracks(!0);else if(n.options_.overrideNative&&(e.featuresNativeVideoTracks||e.featuresNativeAudioTracks))throw new Error("Overriding native HLS requires emulated tracks. See https://git.io/vMpjB");return n.on(d,["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],function(t){var e=d.fullscreenElement||d.webkitFullscreenElement||d.mozFullScreenElement||d.msFullscreenElement;e&&e.contains(n.tech_.el())&&n.masterPlaylistController_.smoothQualityChange_()}),n.on(n.tech_,"seeking",function(){this.tech_.seeking()&&0===this.tech_.currentTime()&&this.tech_.player_.loop()&&this.setCurrentTime(0)}),n.on(n.tech_,"error",function(){this.masterPlaylistController_&&this.masterPlaylistController_.pauseLoading()}),n.on(n.tech_,"play",n.play),n}return ol(a,kh),sl(a,[{key:"setOptions_",value:function(){var e=this;this.options_.withCredentials=this.options_.withCredentials||!1,this.options_.limitRenditionByPlayerDimensions=!1!==this.options_.limitRenditionByPlayerDimensions,this.options_.smoothQualityChange=this.options_.smoothQualityChange||!1,"number"!=typeof this.options_.blacklistDuration&&(this.options_.blacklistDuration=300),"number"!=typeof this.options_.bandwidth&&(this.options_.bandwidth=xc.INITIAL_BANDWIDTH),this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===xc.INITIAL_BANDWIDTH,["withCredentials","limitRenditionByPlayerDimensions","bandwidth","smoothQualityChange"].forEach(function(t){"undefined"!=typeof e.source_[t]&&(e.options_[t]=e.source_[t])}),this.bandwidth=this.options_.bandwidth,this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions}},{key:"src",value:function(t,e){var n=this;t&&(this.setOptions_(),this.options_.url=this.source_.src,this.options_.tech=this.tech_,this.options_.externHls=_h,this.options_.sourceType=bh(e),this.options_.seekTo=function(t){n.tech_.setCurrentTime(t),n.setCurrentTime(t)},this.masterPlaylistController_=new ph(this.options_),this.playbackWatcher_=new gh(oa.mergeOptions(this.options_,{seekable:function(){return n.seekable()}})),this.masterPlaylistController_.on("error",function(){oa.players[n.tech_.options_.playerId].error(n.masterPlaylistController_.error)}),this.masterPlaylistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):_h.STANDARD_PLAYLIST_SELECTOR.bind(this),this.masterPlaylistController_.selectInitialPlaylist=_h.INITIAL_PLAYLIST_SELECTOR.bind(this),this.playlists=this.masterPlaylistController_.masterPlaylistLoader_,this.mediaSource=this.masterPlaylistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get:function(){return this.masterPlaylistController_.selectPlaylist},set:function(t){this.masterPlaylistController_.selectPlaylist=t.bind(this)}},throughput:{get:function(){return this.masterPlaylistController_.mainSegmentLoader_.throughput.rate},set:function(t){this.masterPlaylistController_.mainSegmentLoader_.throughput.rate=t,this.masterPlaylistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get:function(){return this.masterPlaylistController_.mainSegmentLoader_.bandwidth},set:function(t){this.masterPlaylistController_.mainSegmentLoader_.bandwidth=t,this.masterPlaylistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get:function(){var t=1/(this.bandwidth||1),e=void 0;return e=0<this.throughput?1/this.throughput:0,Math.floor(1/(t+e))},set:function(){oa.log.error('The "systemBandwidth" property is read-only')}}}),Object.defineProperties(this.stats,{bandwidth:{get:function(){return n.bandwidth||0},enumerable:!0},mediaRequests:{get:function(){return n.masterPlaylistController_.mediaRequests_()||0},enumerable:!0},mediaRequestsAborted:{get:function(){return n.masterPlaylistController_.mediaRequestsAborted_()||0},enumerable:!0},mediaRequestsTimedout:{get:function(){return n.masterPlaylistController_.mediaRequestsTimedout_()||0},enumerable:!0},mediaRequestsErrored:{get:function(){return n.masterPlaylistController_.mediaRequestsErrored_()||0},enumerable:!0},mediaTransferDuration:{get:function(){return n.masterPlaylistController_.mediaTransferDuration_()||0},enumerable:!0},mediaBytesTransferred:{get:function(){return n.masterPlaylistController_.mediaBytesTransferred_()||0},enumerable:!0},mediaSecondsLoaded:{get:function(){return n.masterPlaylistController_.mediaSecondsLoaded_()||0},enumerable:!0},buffered:{get:function(){return $l(n.tech_.buffered())},enumerable:!0},currentTime:{get:function(){return n.tech_.currentTime()},enumerable:!0},currentSource:{get:function(){return n.tech_.currentSource_},enumerable:!0},currentTech:{get:function(){return n.tech_.name_},enumerable:!0},duration:{get:function(){return n.tech_.duration()},enumerable:!0},master:{get:function(){return n.playlists.master},enumerable:!0},playerDimensions:{get:function(){return n.tech_.currentDimensions()},enumerable:!0},seekable:{get:function(){return $l(n.tech_.seekable())},enumerable:!0},timestamp:{get:function(){return Date.now()},enumerable:!0},videoPlaybackQuality:{get:function(){return n.tech_.getVideoPlaybackQuality()},enumerable:!0}}),this.tech_.one("canplay",this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_)),this.masterPlaylistController_.on("selectedinitialmedia",function(){var i,t;t=(i=n).playlists,i.representations=function(){return t.master.playlists.filter(function(t){return!Pl(t)}).map(function(t,e){return new fh(i,t,t.uri)})},Sh(n)}),this.on(this.masterPlaylistController_,"progress",function(){this.tech_.trigger("progress")}),this.tech_.ready(function(){return n.setupQualityLevels_()}),this.tech_.el()&&this.tech_.src(oa.URL.createObjectURL(this.masterPlaylistController_.mediaSource)))}},{key:"setupQualityLevels_",value:function(){var i=this,t=oa.players[this.tech_.options_.playerId];t&&t.qualityLevels&&(this.qualityLevels_=t.qualityLevels(),this.masterPlaylistController_.on("selectedinitialmedia",function(){var e,t;e=i.qualityLevels_,(t=i).representations().forEach(function(t){e.addQualityLevel(t)}),Th(e,t.playlists)}),this.playlists.on("mediachange",function(){Th(i.qualityLevels_,i.playlists)}))}},{key:"play",value:function(){this.masterPlaylistController_.play()}},{key:"setCurrentTime",value:function(t){this.masterPlaylistController_.setCurrentTime(t)}},{key:"duration",value:function(){return this.masterPlaylistController_.duration()}},{key:"seekable",value:function(){return this.masterPlaylistController_.seekable()}},{key:"dispose",value:function(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.masterPlaylistController_&&this.masterPlaylistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),function t(e,i,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var a=Object.getPrototypeOf(e);return null===a?void 0:t(a,i,n)}if("value"in r)return r.value;var s=r.get;return void 0!==s?s.call(n):void 0}(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"dispose",this).call(this)}}]),a}(),Ch={name:"videojs-http-streaming",VERSION:"1.4.1",canHandleSource:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=oa.mergeOptions(oa.options,e);return Ch.canPlayType(t.type,i)},handleSource:function(t,e){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=oa.mergeOptions(oa.options,i);return e.hls=new wh(t,e,n),e.hls.xhr=Bl(),e.hls.src(t.src,t.type),e.hls},canPlayType:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=oa.mergeOptions(oa.options,e).hls.overrideNative,n=bh(t);return n&&(!_h.supportsTypeNatively(n)||i)?"maybe":""}};return"undefined"!=typeof oa.MediaSource&&"undefined"!=typeof oa.URL||(oa.MediaSource=kc,oa.URL=wc),kc.supportsNativeMediaSources()&&oa.getTech("Html5").registerSourceHandler(Ch,0),oa.HlsHandler=wh,oa.HlsSourceHandler=Ch,oa.Hls=_h,oa.use||oa.registerComponent("Hls",_h),oa.options.hls=oa.options.hls||{},oa.registerPlugin?oa.registerPlugin("reloadSourceOnError",vh):oa.plugin("reloadSourceOnError",vh),oa});
var l="function"==typeof Object.defineProperties?Object.defineProperty:function(t,i,e){t!=Array.prototype&&t!=Object.prototype&&(t[i]=e.value)},n="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function p(){p=function(){},n.Symbol||(n.Symbol=q)}var r=0;function q(t){return"jscomp_symbol_"+(t||"")+r++}for(var t=n,u=["Object","assign"],v=0;v<u.length-1;v++){var x=u[v];x in t||(t[x]={}),t=t[x]}var A=u[u.length-1],B=t[A],C=B||function(t,i){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};C!=B&&null!=C&&l(t,A,{configurable:!0,writable:!0,value:C}),function(t){function i(n){if(e[n])return e[n].K;var o=e[n]={la:n,ga:!1,K:{}};return t[n].call(o.K,o,o.K,i),o.ga=!0,o.K}var e={};i.m=t,i.f=e,i.a=function(t,e,n){i.b(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){p(),p(),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(p(),Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})),Object.defineProperty(t,"__esModule",{value:!0})},i.l=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.da)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.a(n,o,function(i){return t[i]}.bind(null,o));return n},i.g=function(t){var e=t&&t.da?function(){return t.default}:function(){return t};return i.a(e,"a",e),e},i.b=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.h="",i(i.u=0)}([function(t,i,e){function n(t,i,e){i=void 0===i?{}:i,e=void 0===e?{}:e,this.g=Object.assign({},{ka:!0},i),this.a=t,this.b=e,this.b._gallery=this,this.b._arrowNavigation=this.g.arrowNavigation,this.h()}function o(t,i){if(i=void 0===i?{}:i,this.j=this.j.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this),this.g=this.g.bind(this),this.h=!1,this.b=t,!h(this.b))throw new TypeError("`new Luminous` requires a DOM element as its first argument.");t=document,"getRootNode"in this.b&&(t=this.b.getRootNode()),t=i.appendToNode||(t===document?document.body:t),this.a={B:i.namespace||null,v:i.sourceAttribute||"href",caption:i.caption||null,$:i.openTrigger||"click",s:i.closeTrigger||"click",Z:i.closeWithEscape||!0,Y:i.closeOnScroll||!1,w:null==i.showCloseButton||i.showCloseButton,ea:t,X:i.appendToSelector||null,ia:i.onOpen||null,D:i.onClose||null,A:i.includeImgixJSClass||!1,fa:i.injectBaseStyles||!0,i:i._gallery||null,o:i._arrowNavigation||null},i=document.body,t&&"getRootNode"in t&&(i=t.getRootNode()),this.a.fa&&(i&&i!==document||(i=document.head),i.querySelector(".lum-base-styles")||((t=document.createElement("style")).type="text/css",t.classList.add("lum-base-styles"),t.appendChild(document.createTextNode("@keyframes lum-noop{0%{zoom:1}}.lum-lightbox{position:fixed;display:none;top:0;right:0;bottom:0;left:0}.lum-lightbox.lum-open{display:block}.lum-lightbox.lum-closing,.lum-lightbox.lum-opening{animation:lum-noop 1ms}.lum-lightbox-inner{position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden}.lum-lightbox-loader{display:none}.lum-lightbox-inner img{max-width:100%;max-height:100%}.lum-lightbox-image-wrapper{vertical-align:middle;display:table-cell;text-align:center}")),i.insertBefore(t,i.firstChild))),this.m(),this.l()}function s(t){t=void 0===t?{}:t,this.g=this.g.bind(this),this.I=this.I.bind(this),this.J=this.J.bind(this),this.L=this.L.bind(this),this.u=this.u.bind(this),this.N=this.N.bind(this),this.M=this.M.bind(this);var i=t,e=void 0===i.B?null:i.B,n=void 0===i.C?l():i.C,o=void 0===i.F?l():i.F,s=void 0===i.v?l():i.v;if(this.a={B:e,C:n,F:o,v:s,caption:void 0===i.caption?null:i.caption,A:void 0!==i.A&&i.A,i:void 0===i.i?null:i.i,o:void 0===i.o?null:i.o,w:void 0===i.w||i.w,D:t.D,s:void 0===i.s?"click":i.s},!h(this.a.C))throw new TypeError("`new Lightbox` requires a DOM element passed as `parentEl`.");this.h=this.a.F,this.R=this.b("open"),this.W=this.b("opening"),this.T=this.b("closing"),this.U=this.V=!1}function h(t){return!!(p&&t instanceof ShadowRoot)||(c?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName)}function r(t,i){i.forEach(function(i){t.classList.add(i)})}function a(t,i){i.forEach(function(i){t.classList.remove(i)})}function l(){throw Error("Missing parameter")}e.r(i);var c="object"==typeof HTMLElement,p="undefined"!=typeof ShadowRoot,u="undefined"!=typeof document&&"animation"in document.createElement("div").style;s.prototype.M=function(t){t&&"function"==typeof t.preventDefault&&t.preventDefault(),(t=this.a.D)&&"function"==typeof t&&t()},s.prototype.aa=function(){this.c.addEventListener(this.a.s,this.M),this.G&&this.G.addEventListener("click",this.M)},s.prototype.b=function(t){var i=["lum-"+t],e=this.a.B;return e&&i.push(e+"-"+t),i},s.prototype.ba=function(){this.c=document.createElement("div"),r(this.c,this.b("lightbox")),this.f=document.createElement("div"),r(this.f,this.b("lightbox-inner")),this.c.appendChild(this.f);var t=document.createElement("div");r(t,this.b("lightbox-loader")),this.f.appendChild(t),this.H=document.createElement("div"),r(this.H,this.b("lightbox-image-wrapper")),this.f.appendChild(this.H),r(t=document.createElement("span"),this.b("lightbox-position-helper")),this.H.appendChild(t),this.m=document.createElement("img"),r(this.m,this.b("img")),t.appendChild(this.m),this.l=document.createElement("p"),r(this.l,this.b("lightbox-caption")),t.appendChild(this.l),this.a.w&&(this.G=document.createElement("div"),r(this.G,this.b("close-button")),this.c.appendChild(this.G)),this.a.i&&this.ca(),this.a.C.appendChild(this.c),this.P(),this.O(),this.a.A&&this.m.classList.add("imgix-fluid")},s.prototype.ca=function(){this.S("previous",this.J),this.S("next",this.I)},s.prototype.S=function(t,i){var e=document.createElement("button");this[t+"Button"]=e,e.innerText=t,r(e,this.b(t+"-button")),r(e,this.b("gallery-button")),this.f.appendChild(e),e.addEventListener("click",function(t){t.stopPropagation(),i()},!1)},s.prototype.g=function(){var t=this.H.style;t.width=this.f.clientWidth+"px",t.maxWidth=this.f.clientWidth+"px",t.height=this.f.clientHeight-this.l.clientHeight+"px",t.maxHeight=this.f.clientHeight-this.l.clientHeight+"px"},s.prototype.O=function(){var t=typeof this.a.caption,i="";"string"===t?i=this.a.caption:"function"===t&&(i=this.a.caption(this.h)),this.l.innerHTML=i},s.prototype.P=function(){var t=this,i=this.h.getAttribute(this.a.v);if(!i)throw Error("No image URL was found in the "+this.a.v+" attribute of the trigger.");var e=this.b("loading");this.V||r(this.c,e),this.m.onload=function(){a(t.c,e),t.V=!0},this.m.setAttribute("src",i)},s.prototype.N=function(t){37==t.keyCode?this.J():39==t.keyCode&&this.I()},s.prototype.I=function(){this.a.i&&(this.h=this.a.i.ha(this.h),this.P(),this.O(),this.g())},s.prototype.J=function(){this.a.i&&(this.h=this.a.i.ja(this.h),this.P(),this.O(),this.g())},s.prototype.open=function(){this.U||(this.ba(),this.aa(),this.U=!0),this.h=this.a.F,this.P(),this.O(),r(this.c,this.R),this.g(),window.addEventListener("resize",this.g,!1),this.a.o&&window.addEventListener("keydown",this.N,!1),u&&(this.c.addEventListener("animationend",this.L,!1),r(this.c,this.W))},s.prototype.close=function(){window.removeEventListener("resize",this.g,!1),this.a.o&&window.removeEventListener("keydown",this.N,!1),u?(this.c.addEventListener("animationend",this.u,!1),r(this.c,this.T)):a(this.c,this.R)},s.prototype.L=function(){this.c.removeEventListener("animationend",this.L,!1),a(this.c,this.W)},s.prototype.u=function(){this.c.removeEventListener("animationend",this.u,!1),a(this.c,this.R),a(this.c,this.T)},s.prototype.j=function(){this.c&&this.a.C.removeChild(this.c)},o.prototype.open=function(t){t&&"function"==typeof t.preventDefault&&t.preventDefault(),this.f.open(),this.a.Y&&window.addEventListener("scroll",this.close,!1),(t=this.a.ia)&&"function"==typeof t&&t(),this.h=!0},o.prototype.close=function(){this.a.Y&&window.removeEventListener("scroll",this.close,!1),this.f.close();var t=this.a.D;t&&"function"==typeof t&&t(),this.h=!1},o.prototype.m=function(){var t=this.a.ea;this.a.X&&(t=document.querySelector(this.a.X)),this.f=new s({B:this.a.B,C:t,F:this.b,v:this.a.v,caption:this.a.caption,A:this.a.A,w:this.a.w,i:this.a.i,o:this.a.o,s:this.a.s,D:this.close})},o.prototype.l=function(){this.b.addEventListener(this.a.$,this.open,!1),this.a.Z&&window.addEventListener("keyup",this.g,!1)},o.prototype.u=function(){this.b.removeEventListener(this.a.$,this.open,!1),this.f.c&&this.f.c.removeEventListener(this.a.s,this.close,!1),this.a.Z&&window.removeEventListener("keyup",this.g,!1)},o.prototype.g=function(t){this.h&&27===t.keyCode&&this.close()},o.prototype.j=function(){this.u(),this.f.j()},o.prototype.open=o.prototype.open,o.prototype.close=o.prototype.close,o.prototype.destroy=o.prototype.j,n.prototype.h=function(){this.f=[];for(var t=this.a.length,i=0;i<t;i++){var e=new o(this.a[i],this.b);this.f.push(e)}},n.prototype.ha=function(t){return(t=Array.prototype.indexOf.call(this.a,t)+1)>=this.a.length?this.a[0]:this.a[t]},n.prototype.ja=function(t){return 0>(t=Array.prototype.indexOf.call(this.a,t)-1)?this.a[this.a.length-1]:this.a[t]},n.prototype.j=function(){this.f.forEach(function(t){return t.j()})},n.prototype.destroy=n.prototype.j,window.LuminousGallery=n,window.Luminous=o}]);
//# sourceMappingURL=luminous.min.js.map
//# sourceMappingURL=header-bundle.js.map
