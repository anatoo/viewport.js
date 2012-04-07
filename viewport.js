/* 
 *  viewport.js
 *
 *  Copyright (c) 2012 Mitsunori Kubota<anatoo.jp@gmail.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy 
 *  of this software and associated documentation files (the "Software"), to deal in 
 *  the Software without restriction, including without limitation the rights to 
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 *  of the Software, and to permit persons to whom the Software is furnished to do 
 *  so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all 
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 *  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 *  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 *  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function() {
    var isDev = false;
    var d = isDev ? alert : function(line) { console.log(line); };

    var isIos = function() {
        return !!navigator.userAgent.match(/iPhone|iPod|webmate/);
    };

    var isAndroid = function() {
        return !!navigator.userAgent.match(/Android|dream|CUPCAKE/);
    };

    var defaultParams = {
        width : 500
    };

    var merge = function(base, right) {
        var result = {};
        for (var key in base) {
            result[key] = base[key];
            if (key in right) {
                result[key] = right[key];
            }
        }
        return result;
    };

    var zoom = function(ratio) {

        if ("OTransform" in document.body.style) {
            document.body.style.OTransform = "scale(" + ratio + ")";
            document.body.style.OTransformOrigin = "top left";
            document.body.style.width = Math.round(window.innerWidth / ratio) + "px";
        } else if ("MozTransform" in document.body.style) {
            document.body.style.MozTransform = "scale(" + ratio + ")";
            document.body.style.MozTransformOrigin = "top left";
            document.body.style.width = Math.round(window.innerWidth / ratio) + "px";
        } else {
            document.body.style.zoom = ratio;
        }
    };

    if (isIos()) {
        window.viewport = function(params) {
            d("iOS is detected");
            params = merge(defaultParams, params);
            document.write('<meta name="viewport" content="width=' + params.width + ',user-scalable=false" />');
        };
    } else if (isAndroid()) {
        window.viewport = function(params) {
            d("Android is detected");
            params = merge(defaultParams, params);

            document.write('<meta name="viewport" content="width=device-width;target-densitydpi=device-dpi">');

            var adjust = function() {
                var scale = window.innerWidth / params.width;
                window.viewport.scale = scale;
                zoom(scale);
            };

            var orientationChanged = (function() {
                var wasPortrait = window.innerWidth < window.innerHeight;
                return function() {
                    var isPortrait = window.innerWidth < window.innerHeight;
                    var result = isPortrait != wasPortrait;
                    wasPortrait = isPortrait;
                    return result;
                };
            })();

            window.addEventListener("resize", function() {
                if (orientationChanged()) {
                    adjust();
                }
            }, false);
            document.addEventListener('DOMContentLoaded', function() {
                adjust();
            });
        };
    } else {
        window.viewport = function(params) {
            params = merge(defaultParams, params);
            d("PC browser is detected");

            var adjust = function() {
                var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
                var scale = width / params.width;
                zoom(width / params.width);
            };

            window.addEventListener("resize", function() {
                adjust();
            }, false);
            document.addEventListener("DOMContentLoaded", function() {
                adjust();
            });
        };
    }

    window.viewport.isIos = isIos;
    window.viewport.isAndroid = isAndroid;
    window.viewport.isPCBrowser = function() {
        return !isIos() && !isAndroid();
    };
})();
