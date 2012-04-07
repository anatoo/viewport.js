viewport.js
====

viewport.js provide unification to set viewport for iOS, android and PC Browsers. 

Support
----

* iOS5
* android2.3
* Opera11.62
* Firefox11.0
* Chrome18.0.1025.151
* Safari5.1.5

Donwload
----

[viewport.js](./viewport.js)

Overview
----

In case of iOS, you cat write viewport meta tag to setting viewport.

In case of android, android support viewport meta tag too. But viewport's width is not available. And PC Browsers does not support it.

Usage
----

Quick example:

    <html>
    <head>
    <script type="text/javascript" src="viewport.js"></script>
    <script type="text/javascript">
    viewport({width : 640});
    </script>

How it works
----

In case of iOS, viewport.js just write following meta tag: 

    <meta name="viewport" content="width=640" />

In case of android, viewport.js write following meta tag:

    <meta name="viewport" content="width=device-width;target-densitydpi=device-dpi">

And viewport.js do emulation of viewport by computing scale between viewport's width and browser's width and applying zoom to the body element. On orieantion change, it emulate again.

In case of PC browsers, viewport.js just emulate viewport by using JavaScript.

