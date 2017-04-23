$next = 1;
$scan = 0;
var intervallinaama;
$(document).ready(function(){
	$("#gup").click(function(){
		show_greens();
		$(this).hide();
		move(1);
	});
	$("#gleft").click(function(){
		show_greens();
		$(this).hide();
		move(3);
	});
	$("#gright").click(function(){
		show_greens();
		$(this).hide();
		move(4);
	});
	$("#gdown").click(function(){
		show_greens();
		$(this).hide();
		move(2);
	});
	$("#stop").click(function(){
		show_greens();
		move(0);
	});
	$(".scan").click(function(){
		show_greens();
		scanffi();
	});
});
$(document).keypress(function (e) {
	//alert(e.keyCode);
	//alert(e.which);
	if(e.keyCode == 38)
	{
		show_greens();
		$("#gup").hide();
		move(1);
	}
	if(e.keyCode == 40)
	{
		show_greens();
		$("#gdown").hide();
		move(2);
	}
	if(e.keyCode == 39)
	{
		show_greens();
		$("#gright").hide();
		move(4);
	}
	if(e.keyCode == 37)
	{
		show_greens();
		$("#gleft").hide();
		move(3);
	}
	if(e.which == 32)
	{
		show_greens();//stop
		move(0);
	}
	if(e.which == 115)
	{
		show_greens();//scan
		scanffi();
	}
});
function scanffi()
{
	$next = 1;
	if ($scan == 0)
	{
		intervallinaama = setInterval(function(){ hide_next(); }, 100);
		scan_area();
		$scan = 1;
	}
	else if ($scan == 1)
	{
		clearInterval(intervallinaama);
		$scan = 0;
	}
}
function show_greens()
{
	$("#gup").show();
	$("#gdown").show();
	$("#gleft").show();
	$("#gright").show();
	$("#rscan").show();
}
function hide_next()
{
	if($next == 1)
	{
		show_greens();
		$("#gup").hide();
		$("#rscan").show();
	}
	if($next == 3)
	{
		show_greens();
		$("#gdown").hide();
		$("#rscan").show();
	}
	if($next == 4)
	{
		show_greens();
		$("#gleft").hide();
		$("#rscan").hide();
		$next = 0;
	}
	if($next == 2)
	{
		show_greens();
		$("#gright").hide();
		$("#rscan").hide();
	}
	$next++;
}