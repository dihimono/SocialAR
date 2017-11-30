var closeValid = [1, 2, 5, 6, 8, 15];
var farValid = [0, 1, 2, 3, 4, 6, 8, 10, 12];

$(document).ready(function() {
	$('#distance').change(function() {
		var v = $('#distance').val();
		if(v == 61) $('#grid').val(5.5);
		else $('#grid').val(9);
	})

	$('#caseLeft').click(function() {
		var v = parseInt($('#caseNum').text());
		if(v != 0) v = v - 1;
		$('#caseNum').text(v.toString());
		//HeatmapPlot2();
	})

	$('#caseRight').click(function() {
		var v = parseInt($('#caseNum').text());
		if(v != 16) v = v + 1;
		$('#caseNum').text(v.toString());
		//HeatmapPlot2();
	})

	$('#submit').click(function() {
		HeatmapPlot2();
		console.log("final z")
		console.log(z_count)
	});
});

var x = [], y = [], z_count = [] ;
var face_position_x,face_position_y


function HeatmapPlot2() {
	var id = parseInt($('#caseNum').text());
	dis = parseInt($('#distance').val());
	var filename = "./data/test" + id + "-" + dis + ".csv";
	console.log(filename);
	$.ajax({
  		url: filename,
  		dataType: "text",
	}).done(parseCSV);
	
	 var gridsize=$("#grid").val();
	var groups=Math.round(200/gridsize);
	DataProcess(x,y,gridsize,-100,groups);
	
	console.log("results");
	
	
	var data = [
	{
		z:z_count,
		type: 'heatmap'
	}
	];
	var layout = {
	  showlegend: false,
	  autosize: false,
	  width: 600,
	  height: 600,
	  margin: {t: 50},
	  hovermode: 'closest',
	  bargap: 0,
	  
	  
	  images: [
	  {
	  	"source": "./face.png",
        "xref": "x",
        "yref": "y",
        "x": face_position_x,
        "y": face_position_y,
        "sizex": 25/gridsize,
        "sizey": 25/gridsize,
        "sizing": "strech",
        "xanchor": "center",
        "yanchor": "middle",
        "layer": "above",
        "opacity": 0.6
	  }
	  ]
	};
	console.log( face_position_x)
	console.log( face_position_y)

Plotly.newPlot('myplot', data,layout);
	
	

}


function parseCSV(data) {
	x = [];
	y = [];
	var rowData = data.split(/\r?\n|\r/);
	for(var i = 0;i < rowData.length;i++) {
		var columnData = rowData[i].split(',');
		var xx = dis * Math.tan(columnData[1] * Math.PI / 180) * Math.cos(columnData[2] * Math.PI / 180);
		var yy = dis * Math.tan(columnData[1] * Math.PI / 180) * Math.sin(columnData[2] * Math.PI / 180);
		if(Math.abs(xx) > 50 || Math.abs(yy) > 50) continue;
		x.push(xx);
		y.push(yy);
	}
	console.log(x.length);		
}

function DataProcess(x,y,gridsize,lowbound,groupsnum){
	z_count=[];
	for(var i = 0;i < groupsnum;i++) {
		z_count[i]=[];
		for(var j = 0;j < groupsnum;j++) {
			var thisGridCount;
			thisGridCount=0;
			
			//record the zero position
			var xdown=lowbound+(i-1)*gridsize;
			var xup=lowbound+i*gridsize;
			var ydown=lowbound+(j-1)*gridsize;
			var yup=lowbound+j*gridsize;
			if(xdown*xup<0){
				if(xdown+xup>0){
					face_position_x=i-1;
				}
				else{
					face_position_x=i;
				}
			}
			if(ydown*yup<0){
				if(ydown+yup>0){
					face_position_y=j-1;
				}
				else{
					face_position_y=j;
				}
			}
			
			//record the zero position
			for(var dataiter = 0;dataiter < x.length;dataiter++) {
				
				
				if(x[dataiter]>=lowbound+(i-1)*gridsize&&x[dataiter]<lowbound+i*gridsize&&y[dataiter]>=lowbound+(j-1)*gridsize&&y[dataiter]<lowbound+j*gridsize){
					
					thisGridCount+=1;
					
				}
			
			}
			
			z_count[i][j]=thisGridCount;
				
			
			
			
		}
		
	}
	
	
	
}


