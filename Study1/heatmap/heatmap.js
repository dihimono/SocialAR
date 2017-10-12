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
		HeatmapPlot();
	})

	$('#caseRight').click(function() {
		var v = parseInt($('#caseNum').text());
		if(v != 16) v = v + 1;
		$('#caseNum').text(v.toString());
		HeatmapPlot();
	})

	$('#submit').click(function() {
		HeatmapPlot();
	});
});

var x = [], y = [];
var dis;

function HeatmapPlot() {
	var id = parseInt($('#caseNum').text());
	dis = parseInt($('#distance').val());
	var filename = "./data/test" + id + "-" + dis + ".csv";
	console.log(filename);
	$.ajax({
  		url: filename,
  		dataType: "text",
	}).done(parseCSV);
	var XYContour = {
	  x: x,
	  y: y,
	  name: 'density',
	  ncontours: 20,
	  colorscale: 'Hot',
	  reversescale: true,
	  showscale: false,
	  type: 'histogram2dcontour'
	};
	var XDensity = {
	  x: x,
	  name: 'x density',
	  marker: {color: 'rgb(102,0,0)'},
	  yaxis: 'y2',
	  type: 'histogram'
	};
	var YDensity = {
	  y: y,
	  name: 'y density',
	  marker: {color: 'rgb(102,0,0)'},
	  xaxis: 'x2',
	  type: 'histogram'
	};
	var data = [XYContour, XDensity, YDensity];
	var layout = {
	  showlegend: false,
	  autosize: true,
	  width: 600,
	  height: 550,
	  margin: {t: 50},
	  hovermode: 'closest',
	  bargap: 0,
	  xaxis: {
	    domain: [0, 0.85],
	    showgrid: false,
	    zeroline: true
	  },
	  yaxis: {
	    domain: [0, 0.85],
	    showgrid: false,
	    zeroline: true
	  },
	  xaxis2: {
	    domain: [0.85, 1],
	    showgrid: false,
	    zeroline: true
	  },
	  yaxis2: {
	    domain: [0.85, 1],
	    showgrid: false,
	    zeroline: true
	  },
	  colorbar: {}
	};
	Plotly.newPlot('plot', data, layout);

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