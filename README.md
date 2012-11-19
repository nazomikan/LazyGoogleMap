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
        version: 3.8, // versionは3.x系なら大抵指定できる 2.x系は無理
        canvas: $('#mapCanvas')
    });

    lazyMap.appear(gmOption);

    lazyMap.on('lazy.map.appeared', function (gm, map) {
        alert('読み込み完了');
    });

    lazyMap.on('lazy.map.faild', function (errMsg) {
        alert('Error:' + errMsg);
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


## Event

### lazy.map.appeared

地図の読み込みが完了したときに発生します

callbackの引数は二つで1つめが`google.maps`オブジェクトで2つめがgoogle.maps.Mapのインスタンス(地図オブジェクト)です


### lazy.map.faild

地図の読み込みが何らかの理由で失敗したときに発生します

callbackの引数は1つでエラーのメッセージです

特に情報のあるメッセージじゃないので飾りです、期待しないでください


## 依存

jQuery > 1.5, EventEmitter と依存してます。 横着しました、ごめんなさい。

でもそれほど深刻に依存してるわけじゃないので外したい人は自分で外してください。
