module.exports = function(config) {

	var _module,
		_me = this;

	this._config = (config || {});

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
    	},

    	update: function(config) {
			_me._config = config;
    	},

    	data: function() {

    		var key, obj = {}, mcfg = _me._config;

			for (key in mcfg) {
				if (mcfg.hasOwnProperty(key)) {					
					obj[key] = _me._config[key];
				}
			}
			
			return obj;
    	},

    	merge: function(obj) {
    		var conf = _module.data(),
    			key, item;

    		for (key in conf) {
    			if (conf.hasOwnProperty(key)) {
    				obj[key] = conf[key];
    			}
    		}

    		return obj;
    	}

    };

    return _module;

};