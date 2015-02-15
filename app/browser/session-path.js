var _path = null;

var SessionPath = {

  get: function() {
    return _path;
  },

  set: function(path) {
    _path = path;
  }
}

module.exports = SessionPath;