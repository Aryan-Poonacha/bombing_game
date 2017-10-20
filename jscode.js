var i = 0;
var lettercheck;
var counter1 = 1;
var spawncheck;
var spawnSpeed = 2000;

var theheight = window.screen.availHeight;
var thewidth = window.screen.availWidth;

$(document).ready(function()
{
  lettercheck = setInterval(printLetter,100);//2000

  $("#continue2").click(function()
  {
    $('#instructbox1').hide(300);
    $(".score, #killcount").show(300);
    $("body").css('background-image', 'url(bg4.jpg)');
    $(".barricade").show(500);
    $("#health").show(500);
    spawncheck = setInterval(spawnEnemy, spawnSpeed);
    setInterval(spawnChange, 5000);
  });

  $(".lettertext").css({"left": thewidth/15 + "px", "top" : theheight/30 + "px"});
  $("#continue1").css({"position" : "relative", "left" : thewidth/2.6 + "px", "top" : theheight/21});
  $("#continue2").css({"position" : "relative", "left" : thewidth/8 + "px"});
  $("#instructbox1").css({"width": thewidth/2.7 + "px", "height" : 1.62/3*theheight + "px", "left" : thewidth/3.3 + "px", "top" : theheight/27 + "px"});
  $(".score").css({"width" : thewidth*25.7/100 +"px", "height" : theheight *5.12/100 + "px"});
  $("#health").css({"height" : theheight/15 + "px", "width" : thewidth/2 + "px"});
  });

function printLetter()
{
    var str = "lettertext"+i;
    $(("#"+str)).fadeIn(50);//1500
    i+=1;
    if(i==8)
    {
      $("#continue1").fadeIn(50);//1500
    }
    if(i==9)
    {
      clearInterval(lettercheck);
      i = 1;
    }
}

function clearall()
{
  var snd = new Audio("notification.mp3");
  $("p, #continue1").hide(10);//300
  $("#instructbox1").show(100);//1500
  var instructcheck = setInterval(function() {
  i+=1;
  var str = "instructtext"+i;
  $(("#"+str)).show();//1500
  if(i!=8)
  {
    snd.play();
  }
  if(i==8)
  {
    $("#continue2").fadeIn(50);//1500
    clearInterval(instructcheck);
    i = 1;
  }
},50);//1000
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function spawnEnemy()
{
    $("body").prepend("<img src='red_dot.png' class='enemies' id='enemy' draggable='false' style='left:calc(" + thewidth/2 + "px)'/>");
    $("#enemy").attr("id", "enemy"+i);
    $("#enemy"+i).css({"left" : thewidth+'px', "top" : (randomInt(10,500))+'px'})
    .animate({left :'-400px'}, 20000)
    .click(function()
    {
      $("#killcount").html("Kills = " + counter1);
      counter1 +=1;
      var snd = new Audio("laser.mp3");
      snd.play();
      $(this).stop().attr("src","explosion.gif").css({"transform" : "scale(0.11,0.11)"});
      setTimeout(function() {
            $(this).hide();
        }.bind(this), 350);
    });
    i+=1;
  }

function spawnChange()
{
  if(spawnSpeed<=200)
    {
  clearInterval(spawncheck);
  spawnSpeed -= 50;
  setInterval(spawnEnemy, spawnSpeed);
}
}

console.log(theheight);
console.log(thewidth);
