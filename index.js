module.exports = Class;

function Class(child_obj, parent_ctor) {
  var child_ctor =
  (typeof child_obj.initialize == 'function' && child_obj.initialize) ||
  (function () {});

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
  var current_class = child_ctor;
  child_ctor.prototype.super = function () {
    var name = arguments[0];
    var current_class_old = current_class;
    current_class = current_class.__super__;
    var result = current_class_old.__super__.prototype[name].apply(this,
     [].slice.call(arguments,1) );
    current_class = current_class_old;
    return result;
  } 

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
