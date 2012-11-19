lazyGoogleMap
=============

google mapの遅延読み込み



sample code
--
    var lazyMap = LazyGoogleMap.new(),
        gmOption = {
            zoom: 8,
            center: [-34.397, 150.644],
            mapTypeId: 'ROADMAP'
        };

    lazyMap.setConfig({
        width: 600,
        height: 600,
        version: 3.8,
        canvas: $('#mapCanvas')
    });

    lazyMap.appear(gmOption);

    lazyMap.on('lazy.map.appeared', function (gm, map) {
        alert('読み込み完了')
    });


## API

### LazyGoogleMap.new
LazyGoogleMapのインスタンスを返します

インスタンスはEventEmitterを継承しています

地図の読み込みが完了すると`lazy.map.appeared`というeventが発生します


### LazyGoogleMap.setConfig(conf)
google mapの基礎的な設定をします

conf ex) キャンバスサイズ, バージョン設定, キャンバスなど


### LazyGoogleMap.appear(gmOption)

非同期な感じで地図を読み込みます

連続でコールしても最初の一回しか評価されないので注意してください

引数で渡された`gmOption`はgoogle.maps.Mapの引数とよく似ています

でも少し違います

ソースと例を見てそれとなく設定してください

ex)

`center: new google.maps.LatLng(A, B)` → `center: [A, B]`

`google.maps.MapTypeId.ROADMAP` → `mapTypeId: 'ROADMAP'`


## 依存

jQuery, EventEmitter と依存してます。　ごめんなさい。
