module.exports = function() {

    return {

		objinit: function(names) {
			var ref = {};

			names.forEach(function(key) {
				ref[key] = null;
			});

			return ref;
		}
       
    };

}();
