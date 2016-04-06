var _loki = require('lokijs'),
	_db, _data;
_db = new _loki('data/god.json');


module.exports = function() {

	var _module;

	_module = {

		db: _db,

		data: function() {
			return _data;
		},

		init: function(def) {

			_db.loadDatabase({}, function () {

				_data = _db.getCollection('beings');	
				console.debug(" DB god's beings loaded successfully - items:", (_data ? (_data.data.length) : "0"));

				if (_data && _data.data) {
//					_data = _data.data;

				} else {
					_data = _db.addCollection('beings');
					console.debug(" DB data collection initialized ");

				} 

				def.resolve();

			});	
		}
	};

	return _module;

}();
