(function (win, doc) {
  // export namespaces;
  win.app = {};
  win.app.widget = {};
  win.app.core = {};

  function Collection(core, widget) {
    core = core || {};
    widget = widget || {};

    this.core = $.extend({
      lazyGoogleMap: win.app.core.LazyGoogleMap.new()
    }, core);
    this.widget = $.extend({
      mapArea: win.app.widget.MapArea.new()
    }, widget);
  }

  Collection.new = function () {
    var collection, args;
    collection = Object.create(Collection.prototype);
    args = Array.prototype.slice.call(arguments);
    Collection.apply(collection, args);
    return collection;
  };

  Collection.prototype.initialize = function () {
    var core = this.core;
    // lazyGoogleMapを初期化

    this.exportGlobalSubscribers();
    this.initializeWidgets();
  };

  Collection.prototype.initializeWidgets = function () {
    var core = this.core,
        widget = this.widget;

    // マップエリアの初期化
    widget.mapArea.build(core.lazyGoogleMap);
  };

  Collection.prototype.exportGlobalSubscribers = function () {};

  win.addEventListener('DOMContentLoaded', function (evt) {
    var collection = Collection.new();
    collection.initialize();
  }, false);

}(window, document));
