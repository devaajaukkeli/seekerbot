//
function fetch_data()
{
	lol_map();
	retrieve_map();
}
function move(direction)
{
	$.ajax({
		dataType:"json",
		url:"move.php",
		type:"POST",
		data: {'direction' : direction},
		beforeSend:function(){

		},
		success:function(data2){
			console.log("moving bot manually");
			console.log(data2);
		},
		complete:function(data2){

		},
		error:function(){

		}
	});
}
function scan_area()
{
	$.ajax({
		dataType:"json",
		url:"scan.php",
		type:"POST",
		beforeSend:function(){

		},
		success:function(data){
			console.log("scan begun");
		},
		complete:function(data){

		},
		error:function(){

		}
	});
}
var k = 1;//naamoja
function lol()
{
	var ctr = 0;
	var kalkkuna = window.setInterval(function(){
		fetch_data();
		counter();
		console.log("maxValue = "+k);
		if(ctr >= 202)
		{
			console.log("Fetching ready!");
			clearInterval(kalkkuna);
			k = 1;
		}
		ctr++;
	},5);
}
function counter()
{
	$.ajax({
		dataType:"json",
		url:"count_ret.php",
		type:"POST",
		beforeSend:function(){

		},
		success:function(data){
			k = data;
			console.log(k);
		},
		complete:function(data){

		},
		error:function(){

		}
	});
}
function lol_map()
{
	$.ajax({
		dataType:"json",
		url:"lol_it.php",
		type:"POST",
		beforeSend:function(){

		},
		success:function(data){
			console.log("Updating session ok!");
		},
		complete:function(data){

		},
		error:function(){

		}
	});
}
function init_map()
{
	console.log("Init begun!");
	$.ajax({
		dataType:"json",
		url:"init.php",
		type:"POST",
		beforeSend:function(){

		},
		success:function(data){
			console.log("Init session ok!");
		},
		complete:function(data){

		},
		error:function(){

		}
	});
}
function retrieve_map()
{
	//console.log("Getting map!");
	var current_value =0;
	$.ajax({
		dataType:"json",
		url:"coord_ret.php",
		type:"POST",
		beforeSend:function(){
			//console.log("requesting coordinates for map!");
		},
		success:function(data){
			//alert(data);
			//console.log("retrieved data for map!");
			var x = [];
			var y = [];
			console.log(data);
			var current_value = data[2];
			for(var i=0;i<data[0].length;i++)
			{
				x[x.length] = data[0][i];
				y[y.length] = data[1][i];
			}
			console.log(x);
			console.log(y);
			map(x,y);
			console.log("kaalukunnukkuna: "+current_value);
			return data[2];
			//console.log("Map ok!");
		},
		complete:function(data){

		},
		error:function(){
			//console.log("Error retrieving data for map!");
		}
	});
	function map(x,y)
	{
		var trace1 = {
		  x: x,
		  y: y,
		  mode: 'markers',
		  name: 'points',
		  marker: {
		    color: 'rgb(102,0,0)',
		    size: 2,
		    opacity: 0.4
		  },
		  type: 'scatter'
		};
		var data = [trace1];
		var layout = {
		  showlegend: false,
		  autosize: false,
		  width: 1200,
		  height: 550,
		  margin: {t: 50},
		  hovermode: 'closest',
		  bargap: 0
		};
		Plotly.newPlot('my-graph', data, layout);
	}
	return 0;
}