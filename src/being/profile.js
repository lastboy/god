module.exports = function(config) {

	var _module,
		_me = this;

	this.name = null;
	this.template = null;

    _module = {

    	set: function(key, value) {
    		if (key in _me) {
    			_me[key] = value;
    		}
    	},

    	get: function() {
    		if (key in _me) {
    			return _me[key];
    		}
    	}

    };

};