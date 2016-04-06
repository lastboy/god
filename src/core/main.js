 var _nopt = require("nopt"),
    _utils = require("./utils"),
    _manager = require("../being/manager"),
    _parsed, _config = _utils.objinit(["opt", "shortopt"]);

 (function() {

    _config.opt = {
        "being" : [String, null]
    };
    _config.shortopt = {
        "b": ["--being"]
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

    var _cliconfig = function(opt) {

        _parsed = _nopt(_config.opt, _config.shortopt, process.argv, 2);
        if (_config.validate(_parsed)) {
            _manager.set({"name": _parsed.being});
        }

    };

    return {

        cli: function(opt) {
            _cliconfig(opt);
        }

    };

}();