Vow = require('vow');

makeNodeResolver = function(promise) {
  var self = this;
  return function(err, res) {
    if(err) {
      promise.reject(err);
    } else if (arguments.length > 2) {
      promise.fulfill(Array.prototype.slice.call(arguments, 1));
    } else {
      promise.fulfill(res);
    }
  }
}
      
Vow.ninvoke = function(object, name /*...args*/) {
  var nodeArgs = Array.prototype.slice.call(arguments, 2);
  var promise = Vow.promise();
  nodeArgs.push(makeNodeResolver(promise));
  object[name].apply(object, nodeArgs);
  return promise;
}

module.exports = Vow
