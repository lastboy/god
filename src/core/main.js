 var _Q = require("q"),
    _log = require("./logger.js"),
     _db = require("./db"),
    _nopt = require("nopt"),
    _utils = require("./utils"),
    _manager = require("../being/manager"),
    _parsed, _config = _utils.objinit(["opt", "shortopt"]),
    _deferred = _Q.defer();

 (function() {

    _config.opt = {
        "being" : [String, null],
        "template": [String, null],
        "info": [String, null]
    };
    _config.shortopt = {
        "b": ["--being"],
        "t": ["--template"],
        "i": ["--info"]
    };    

    _config.validate = function(parsed) {
        var bol = ("being" in parsed);

        if (!bol) {
            return false;
        }

        return true;
    }

})();

module.exports = function() {

    var _module, 
        _cliconfig = function(opt) {

            var data;

            _parsed = _nopt(_config.opt, _config.shortopt, process.argv, 2);
            if (_parsed.info) {
                data = _db.data().data;
                console.info("\n \nRecords: ", data.length, "\ndata: ", data );
            } else if (_config.validate(_parsed)) {
                _manager.set({"name": _parsed.being, "template": _parsed.template});
            }

        };

    _module = {

        cli: function(opt) {
            _cliconfig(opt);
        },

        init: function(callback) {            

            // db initialization
            _db.init(_deferred);

            _deferred.promise.then(function() {

                // update the being manager 
                _manager._update(_db.data());

                callback.call(_module);
            });            
                  
        }

    };

    return _module;

}();