$(document).ready(function(){

String.prototype.times = function(n) {
    return Array.prototype.join.call({length: n+1}, this);
};
var star = '<div id="boxel" class="box"></div>'.times(100);
var initWindowHeight, currentWindowHeight = $(window).height();
$('#col_cont').append(star);
for(i=0; i<Math.ceil($(window).height()/10)-3; i++){
 $('#row_cont').append($("#col_cont").clone()); 
}
var colorSet = ["red","black","green","yellow","blue"];
var selectedColor = colorSet[0];
for(i=0; i<5; i++){
  var $colorPaletteCell = $('<li ></li>');
  $colorPaletteCell.attr('data-action',i);
  $colorPaletteCell.css({
    'padding': '8px 12px',
    'cursor': 'pointer',
    'list-style-type': 'none',
    'transition': 'all .3s ease',
    'user-select': 'none'
  });
  $colorPaletteCell.css('background-color',colorSet[i]);
  if($colorPaletteCell.css('background-color')===selectedColor){
    $colorPaletteCell.css('border','solid');
  }
  $('.custom-menu').append($colorPaletteCell);
}

$( "div div div div" ).on("click", function() {
  var color = $( this ).css( "background-color" );
  if(color === 'rgb(255, 255, 255)')
    $(this).css("background-color", selectedColor);
  else
    $(this).css("background-color", "white");
});

 $( "div div div div" ).on("mousedown", function(e) {
   var click_y = e.pageY;
   var click_x = e.pageX;
   console.log(click_y,click_x);
   if (!$(e.target).parents(".custom-menu").length > 0) {
        $(".custom-menu").hide(100);
    }
   $( "div div div div" ).on("mousemove", function(e){
   var elem = document.elementFromPoint(e.pageX, e.pageY);
     elem.style.backgroundColor = selectedColor;
  
}).on('mouseup', function(e) {
             $( "div div div div" ).off('mousemove');
             //$selection.remove();
         });;
 });
//function for context menu
$(document).bind("contextmenu", function (event) {
    event.preventDefault();
    $(".custom-menu").finish().toggle(100).
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});

// If the menu element is clicked
$(".custom-menu li").click(function(){
  $(this).parent().children().css('border','');
    $(this).css('border','solid')
    selectedColor = $(this).css('background-color'); 
    // Hide it AFTER the action was triggered
    //$(".custom-menu").hide(100);
  });

$( window ).resize(function() {
    var resizedheight = $(window).height();
    if(currentWindowHeight > resizedheight){
        var diff = currentWindowHeight - resizedheight;
        console.log(currentWindowHeight, resizedheight);
        if(diff != 0){
            diff = (diff > 10) ? diff/10: 1;
            for(i=0; i<Math.ceil(diff); i++) {
                    console.log('EEEEEEEE');
                    $('#row_cont').children().last().remove();        
                }
            currentWindowHeight = $(window).height()  
        }             
    }
    else{
        var diff = resizedheight - currentWindowHeight;
        console.log(currentWindowHeight, resizedheight);
        if(diff != 0){
            diff = (diff > 10) ? diff/10: 1;
            for(i=0; i<Math.floor(diff); i++) {
                console.log('EEEEEEEE');
                $('#row_cont').append($("#col_cont").clone());       
            } 
        currentWindowHeight = $(window).height()
        }
    }
});

});