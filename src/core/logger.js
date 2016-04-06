
var _superlog = console.log,
	_superlog = console.info,
	_supererr = console.error,
	_superwarn = console.warn,

	_getargs = function(args) {
		var i=0, item, size,
			newa = [];

		size = args.length;
		for (; i<size; i++) {
			item = args[i];
			newa.push(item);
		}

		return newa;
	};

console.level = {debug: true};

console.log = function() {

	var args = _getargs(arguments);

	args.unshift("[god LOG] ");
	_superlog.apply(console, args);
};

console.info = function() {

	var args = _getargs(arguments);

	args.unshift("[god INFO] ");
	_superlog.apply(console, args);
};

console.warn = function() {

	var args = _getargs(arguments);

	args.unshift("[god WARN] ");
	_superlog.apply(console, args);
};

console.error = function() {

	var args = _getargs(arguments);

	args.unshift("[god ERR] ");
	_superlog.apply(console, args);
};

console.debug = function() {

	if (!console.level.debug) {
		return undefined;
	}

	var args = _getargs(arguments);

	args.unshift("[god DEBUG] ");
	_superlog.apply(console, args);
};