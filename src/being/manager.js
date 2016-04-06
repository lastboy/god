var _utils = require("../core/utils"),
	_Profile = require("./profile"),
	_db = require("../core/db");

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

	function _save() {

		_db.db.saveDatabase(function(err) {
		    if (err) {
		        console.error("DB ", e);
		    }
		    console.debug(" DB god's beings saved successfully ");    

		});

	}

	function _new(config) {
		var profile;

		profile = _profiles[config.name] = new _Profile(config); 
		try {
			_db.data().insert(profile.data());
			_save();
		} catch(e){console.error(e)}

		return profile;
	}

	function _update(profile, config) {

		var record;

		try {
			record = _db.data().find(profile.data());
			if (record) {
				profile.update(config);
				console.debug(profile.merge(record[0]));
				_db.data().update(profile.merge(record[0]));
				_save();
			} else {
				console.warn("Cannaot find record in DB: ", profile.data());
			}
		} catch(e){console.error(e)}
	}

    return {

    	/**
    	 * Update the profile manager
    	 */
    	_update: function(data) {
    		
    		var data = (data && "data" in data ? data.data : [])
    		// load data    		
    		if (data) {
				data.forEach(function(item) {
					_profiles[item.name] = new _Profile(item);
				});
    		}
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
				console.warn(" invalid configuration: ", config);
    		}

    		// test if we already have such being
    		profile = _getProfile(config);
    		if (!profile) {
    			console.debug(" profile not exists, creating a new one");
    			profile = _new(config);

    		} else {
    			console.debug(" profile was found: ", profile.data());
    			_update(profile, config);
    		}
    	}

    };

}();