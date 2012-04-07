viewport.js
====

iOS, android, PCブラウザの全てデバイスで統一的にviewportを設定するためのライブラリです。このライブラリを利用することによって、自動的にデバイスを判別して適切なメタタグの書き出しやviewportのエミュレーションを行います。

対応デバイス、ブラウザ
----

* iOS5
* android2.3
* Opera11.62
* Firefox11.0
* Chrome18.0.1025.151
* Safari5.1.5

ダウンロード
----

[viewport.js](https://raw.github.com/anatoo/viewport.js/master/viewport.js)

概要
----

iOS端末のブラウザでは、HTML内にviewportメタタグを埋め込むことによって、仮想的な画面幅を設定することができます。iOS端末向けのモバイル用ページを作成するのによく利用されます。

androidでは、viewportメタタグ自体はサポートされていますが、widthを設定することができません。また、PCでのブラウザではそもそもviewportメタタグがサポートされていません。

使い方
----

以下は一番簡単な例です。メタタグを直接書きこむので、head要素内でviewport関数を呼び出して下さい。

    <html>
    <head>
    <script type="text/javascript" src="viewport.js"></script>
    <script type="text/javascript">
    viewport({width : 640});
    </script>

androidやPCのブラウザの場合、メタタグを書き込むだけではなく、JavaScriptとCSSによってviewportをエミュレーションします。

どのように動くのか
----

簡単な例で示したコードがどう動くのかを説明します。

iOSの場合、viewport.jsは以下のような適切なメタタグを書き出すだけです。

    <meta name="viewport" content="width=640" />

androidの場合、まず以下のようなメタタグを書き出します。

    <meta name="viewport" content="width=device-width;target-densitydpi=device-dpi" />

その後、JavaScriptによってviewportで設定した値とウィンドウの幅からスケールを計算して、HTMLのbody要素のzoomプロパティに設定します。そして、デバイスの向きが変われば、それを補足してスケールを再び計算して適用します。

PCブラウザの場合は、メタタグの書き出しを一切行わずに、JavaScriptでandroidと同様のviewportエミュレーションを行います。

