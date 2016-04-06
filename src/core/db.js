var _loki = require('lokijs'),
	_db;

_db = new _loki('test.json');

_db.loadDatabase({}, function () {
	var users = _db.getCollection('users');
  	if (!users) {
  		var users = _db.addCollection('users');
		users.insert({
		  name: 'joe'
		});
		users.insert({
		  name: 'john'
		});
		users.insert({
		  name: 'jack'
		});

		_db.saveDatabase();
  	} else {
  		console.debug(users.data);

  	}
});

module.exports = function() {

   
    return {

       
    };

}();