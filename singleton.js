var Singleton = (function () {
  var instance;

  function SingletonClass() {
      // constructor
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = new SingletonClass("I am the instance");
              instance.constructor = null;
          }
          return instance;
      }
  };
})();

function run() {

  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();

  console.log("Same instance? " + (instance1 === instance2));
}
