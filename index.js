module.exports = Class;

function Class(child_obj, parent_ctor) {
  var child_ctor = child_obj.initialize ||
                   function () {
                   };

  for (var p in child_obj) {
    if (typeof child_obj[p] == 'function') {
      if (p == 'initialize') {
        continue;
      }
      child_ctor.prototype[p] = child_obj[p];
    }
  }

  child_ctor.__super__ = parent_ctor || Object;
  __extend(child_ctor, parent_ctor);

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

