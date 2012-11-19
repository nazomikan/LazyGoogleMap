(function (win, doc, $) {

    function LazyGoogleMap() {
        EventEmitter.call(this);
        // set on build time
        this.googleMap = null;
        this._alreadyAppear = false;
    }

    LazyGoogleMap.prototype = Object.create(EventEmitter.prototype);

    LazyGoogleMap.new = function () {
        var lazyGoogleMap, args;
        lazyGoogleMap = Object.create(LazyGoogleMap.prototype);
        args = Array.prototype.slice.call(arguments);
        LazyGoogleMap.apply(lazyGoogleMap, args);
        return lazyGoogleMap;
    };

    LazyGoogleMap.prototype.setConfig = function (option) {
        this.option = $.extend({
            width: 600,
            height: 600,
            sensor: false,
            channel: null,
            client: null,
            version: null,
            baseUrl: 'http://maps.googleapis.com/maps/api/js',
            canvas: $('#mapCanvas')
        }, option);
    };

    LazyGoogleMap.prototype.appear = function (gmOption) {
        var that = this, option = this.option;
        if (this._alreadyAppear) {
            return false;
        }
        gmOption = gmOption || {};
        this._alreadyAppear = true;
        option.canvas.css({width: option.width, height: option.height});

        this.readResource().done(function getMaps() {
            var map, failFlag = false;
            doc.write = doc.___o_write_o___;
            getMaps.loopCount = getMaps.loopCount || 1;
            if (!google.hasOwnProperty('maps') || !google.maps.hasOwnProperty('Map')) {
                setTimeout(function () {
                    getMaps.loopCount++;
                    if (getMaps.loopCount < 400) {
                        getMaps();
                    } else {
                        that.emit('lazy.map.failed', 'google mapsが読み込めませんでした。');
                        failFlag = true;
                    }
                }, 5);
                return;
            }

            if (failFlag) {
                return;
            }
            that.googleMap = google.maps;
            gmOption = that.bindType(google.maps, gmOption);
            map = new google.maps.Map(option.canvas.get(0), gmOption);
            that.emit('lazy.map.appeared', google.maps, map);
        }).fail(function () {
            doc.write = doc.___o_write_o___; 
            that.emit('lazy.map.failed', 'google mapsが読み込めませんでした。');
        });
    };

    LazyGoogleMap.prototype.readResource = function () {
        var resourceUrl, query;
        query = this.createResourceQuery();
        resourceUrl = [this.option.baseUrl, query].join('?');
        doc.___o_write_o___ = doc.write;
        doc.write = function (text) {
            var $text = $(text);
            if (!$text.get(0)) {
                $text = $(doc.createTextNode(text));
            }
            $(doc.body).append($text);
        };
        return $.getScript(resourceUrl);
    };

    LazyGoogleMap.prototype.createResourceQuery = function () {
        var option = this.option,
            sep = '&',
            query = '';

        if (Object.prototype.toString.call(option.sensor) === '[object Boolean]') {
            query = query + sep + ['sensor', (option.sensor + '')].join('=');
        }

        if (option.channel !== null) {
            query = query + sep + ['channel', option.channel].join('=');
        }

        if (option.client !== null) {
            query = query + sep + ['client', option.client].join('=');
        }

        if (option.version !== null) {
            query = query + sep + ['v', option.version].join('=');
        }

        return query; 
    };

    LazyGoogleMap.prototype.bindType = function (gm, options) {
        var result = {};
        $.each(options, function (key, data) {
            var value;
            switch (key){
            case 'center':
                value = new gm.LatLng(data[0], data[1]);
                break;
            case 'mapTypeId':
                value = gm.MapTypeId[data];
                break;
            default:
                value = data;
            }
            result[key] = value;
        });

        return result;
    };

    // export namespaces;
    win.LazyGoogleMap = LazyGoogleMap;
}(window, document, jQuery));
