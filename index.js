module.exports = Class;


// Use arguments and Function.prototype.apply to call the super method.
function __super() {
  var name = arguments[0];
  return this.constructor.__super__.prototype[name].apply(this,
                                                          [].slice.call(arguments,1) );
}

function Class(child_obj, parent_ctor) {
  var child_ctor =
    (typeof child_obj.initialize == 'function' && child_obj.initialize) ||
    (function () { });

  __extend(child_ctor, parent_ctor);

  for (var p in child_obj) {
    if (typeof child_obj[p] == 'function') {
      if (p == 'initialize') {
        continue;
      }
      child_ctor.prototype[p] = child_obj[p];
    }
  }

  child_ctor.__super__ = parent_ctor || Object;
  child_ctor.prototype.super = __super;


  return child_ctor;
}


function __extend(child_ctor, parent_ctor) {
  if (parent_ctor) {
    function ctor() {
      this.constructor = child_ctor;
    }

    ctor.prototype = parent_ctor.prototype;
    child_ctor.prototype = new ctor;
  }
}
