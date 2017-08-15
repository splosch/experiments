/**
 * Created with IntelliJ IDEA.
 * User: splosch
 * Date: 25.04.13
 * Time: 01:12
 * To change this template use File | Settings | File Templates.
 */

var FOO = FOO || {};

(function ($, FOO) {
    // globals defined - faster, cleaner
}(jQuery, FOO));

/**/

var MODULE = (function () {
    var my = {},
        privateVariable = 1;

    function privateMethod() {
        // ...
    }

    my.moduleProperty = 1;
    my.moduleMethod = function () {
        // ...
    };

    return my;
}());



(a);

var MYXing = (function(a,b){
    var xing = {},
        product = "half-done",
        deployProduct = function(product){
            var token = "-",
                release = product.split(token)[0];
            return release;
        };

    xing.doWork = function(){
        return deployProduct();
    };

    return xing;
}(1,2));

