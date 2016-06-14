$(document).ready(function () {

  //Palette Toggle
  $('.icon').click(function () {
    $('.palette').toggleClass('hide')
  });

  //Load Outline
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  var imageObj = new Image();

  imageObj.onload = function () {
    ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, c.width, c.height);
  };
  imageObj.src = "img/mandala2.png";

  //Initialize Mouse 
  function init() {
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
      findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
      findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
      findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
      findxy('out', e)
    }, false);
  }

  //Drag to Draw Function
  var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

  var x = event.pageX;
  var y = event.pageY;

  function draw() {
    var color = $('#colorhex')[0];
    var value = color.value;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "#" + value;
    ctx.lineWidth = 5;

    ctx.stroke();
    ctx.closePath();
  }

  function findxy(res, e) {
    if (res == 'down') {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;

      flag = true;
      dot_flag = true;
      if (dot_flag) {
        ctx.beginPath();
        ctx.arc(currX, currY, 10, 0, 2 * Math.PI);
        ctx.closePath();
        dot_flag = false;
      }
    }

    if (res == 'up' || res == "out") {
      flag = false;
    }
    if (res == 'move') {
      if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        draw();
      }
    }
  }


  $("#colorPicker-colors").click(function () {

  });

  init();
}); // end ready function