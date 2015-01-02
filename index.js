module.exports = Class;

function Class(obj) {
  var result = obj.initialize ||
               function () {
               };

  for (var p in obj) {
    if (typeof obj[p] == 'function') {
      if (p == 'initialize') {
        continue;
      }
      result.prototype[p] = obj[p];
    }
  }

  return result;
}
