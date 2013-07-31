Vow = require('vow');

// Takes a promise and resolves it node style
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

_apply = function(func, thisArg, args) {
  return Vow.all(args || []).then(function(resolvedArgs) {
    var promise = Vow.promise();
    var callback = makeNodeResolver(promise);

    func.apply(thisArg, resolvedArgs.concat(callback));

    return promise;
  });
}
      
// Invokes a node object with the specified function
Vow.ninvoke = function(object, name /*...args*/) {
  return _apply(object[name], object, slice.call(arguments, 2));
  //var nodeArgs = Array.prototype.slice.call(arguments, 2);
  //var promise = Vow.promise();

  //// Create a node function and push it onto the arguments
  //nodeArgs.push(makeNodeResolver(promise));

  //// Call the object's node argument
  //object[name].apply(object, nodeArgs);
  //return promise;
}

Vow.ncall = function(func /*...args*/) {
  return _apply(func, this, slice.call(arguments, 1));
}


module.exports = Vow
