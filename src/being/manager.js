var _utils = require("../core/utils"),
	_Profile = require("./profile");

module.exports = function() {

	var _profiles = {};

	/**
	 * Configuration validation
	 * Test if the configuration is with the right data format
	 */
	function _validate(config) {

		var keys = _utils.objinit(["name", "template:optional"]),
			key, bol, keyname, keyopt, keyprops;

		if (!config) {
			return false;
		}

		for (key in keys) {

			keyprops = key.split(":");
			// key name
			keyname = keyprops[0];
			// test if property is optinal 
			keyopt = (keyprops[1] || null);

			bol = (keyname in config);
			if (!bol && !keyopt) {
				return false;
			}
		}

		return true;
	}

	function _getProfile(config) {
		return _profiles[config.name];
	}

	function _new(config) {
		var profile;

		profile = _profiles[config.name] = new _Profile(); 
		console.debug(" profile created: ", profile);
	}


    return {

    	/**
    	 * Initializing the profile manager
    	 */
    	init: function() {

    		// load data    		

    	},

    	/**
    	 *	Set being profile [new | update | TBD delete]
    	 */
    	set: function(config) {

    		// test the configuration 
    		var bol = _validate(config),
    			profile;

    		if (bol) {
    			console.debug(" setting god config: ", config);
    		} else {
				console.lwarn(" invalid configuration: ", config);
    		}

    		// test if we already have such being
    		profile = _getProfile(config);
    		if (!profile) {
    			console.debug(" profile not exists, creating a new one");
    			_new(config);

    		} else {
    			console.debug(" profile was found: ", profile);
    		}
    	}

    };

}();