
(function (win, doc) {

  function MapArea() {
    EventEmitter.call(this);
    this.root = $("#mapArea");
    // set on build time
    this.lazyMap = null;
  }

  MapArea.prototype = Object.create(EventEmitter.prototype);

  MapArea.new = function () {
    var mapArea, args;
    mapArea = Object.create(MapArea.prototype);
    args = Array.prototype.slice.call(arguments);
    MapArea.apply(mapArea, args);
    return mapArea;
  };

  MapArea.prototype.build = function (lazyMap) {
    var mapCanvas = this.root.find('#mapCanvas');
    this.lazyMap = lazyMap;
    this.lazyMap.setConfig({width: 600, height: 600, version: 3.8, canvas: mapCanvas});
    this.bindAppearMapButton();
  };

  MapArea.prototype.bindAppearMapButton = function () {
    var that = this;
    this.root.delegate('#appearMapButton', 'click', function (evt) {
      evt.preventDefault();
      var gmOption = {
        zoom: 8,
        center: [-34.397, 150.644],
        mapTypeId: 'ROADMAP'
      };
      that.lazyMap.appear(gmOption);
    });
  };


  // export namespaces;
  win.app.widget.MapArea = MapArea;
}(window, document));
