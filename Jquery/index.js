$(document).ready(function(){
$("h1").css("color","green");
console.log($("h1").css("font-size"));

$("button").click(function() {
    $("h1").css("color", "purple");
});

$(document).keypress(function(event){
    $("h1").text(event.key);
});
});