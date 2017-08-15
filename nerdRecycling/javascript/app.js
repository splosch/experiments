jQuery(document).ready(function($) {
  var cin     = new $.containerize($('#nerdIn')),
      cout    = new $.containerize($('#nerdOut')),
      reverse = false;


  $("#processor").bind("click",function(){
    var a = !reverse ? cin : cout,
        b = !reverse ? cout : cin;

    reverse = b.addItem(a.dropLast()) ? reverse : !reverse;
  });

  /* toggle Fly-Out / Fly-In*/
  $("#processNerds").bind("click", function() {
    /*each loop delay credits: http://goo.gl/Eih9B */
    $("#nerdIn > li").each($).wait(500, function() {
      if ($(this).hasClass("fadeOutRightBig")) {
        $(this).toggleClass("fadeOutRightBig").toggleClass("fadeInRightBig");
      }
      else {
        $(this).addClass("animated fadeOutRightBig");
      }
    });
  });

});
