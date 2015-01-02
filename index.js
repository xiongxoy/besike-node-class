module.exports = Class;

function Class(cons) {
  return cons.initialize ||
         function () {
         };
}
