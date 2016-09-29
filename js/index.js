/*
  Author : Sebastien Koss
  Copyright © 2016 All rights reserved. 
  Slightly based on : http://codepen.io/zuraizm/pen/vGDHl
*/
  
var slideWidth = $('#slider ul li').width(), slideHeight = $('#slider ul li').height(), sliderUlWidth = $('#slider ul li').length * slideWidth;
	
$('#slider, #sliderNav').css({ width: slideWidth, height: slideHeight });
$('#slider ul').css({ width: sliderUlWidth });

// next / prev click
$('#sliderNav .next, #sliderNav .prev').click(function(e) {
  e.preventDefault();
  move($(this).attr("class"));
});

// if autoplay is checked
var intervalSlider;
$('.slider_option #checkbox').change(function(){
  if (this.checked) {
    intervalSlider = setInterval(function () {
      if (!$('#sliderNav').is(':hover')) {
        if ($('#slider ul li.visible').next().length === 0) { 
          resetSlider();
        } else {
          move();
        } 
      }
    }, 3000);
  } else {
    clearInterval(intervalSlider);
  }
});

// checked autoplay on pageload
$('.slider_option #checkbox').attr('checked', true).change();

// manage next / prev click
function move(direction = "next") {
  if ($('#slider ul').is(':animated')) return;
  if ($('#slider ul li.visible')[direction]().is('li')) {
    var opSlider = (direction == 'next') ? "-" : "+";
    $('#slider ul').stop(true, true).animate({ left: opSlider + '=' + slideWidth }, 500);
    $('#slider ul li.visible').removeClass("visible")[direction]().addClass('visible');
  } else if ($('#slider ul li.visible')[direction]().length === 0) { 
    if (direction == 'prev') { resetSlider('end'); } else { resetSlider(); }
  }
}

// reset slider on last and first slide
function resetSlider(slideTo = "start") {
  var opSlideTo = (slideTo == 'end') ? '-' + (sliderUlWidth - slideWidth) + 'px' : ""; 
  var opSlidePos = (slideTo == 'end') ? "last" : "first"; 
  $('#slider ul').stop(true, true).animate({ left: opSlideTo }, 1000);
  $('#slider ul li.visible').removeClass("visible");
  $('#slider ul li:' + opSlidePos).addClass('visible');
  return;
}