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
        });

    $('#all').click(function() {
        console.log("test");
        OverallPlotCheck();
        });
});

var x = [], y = [], z_count = [] ;
var face_position_x, face_position_y
var id, groups, gridsize

function HeatmapPlot2() {
  id = parseInt($('#caseNum').text());
  dis = parseInt($('#distance').val());
  var filename = "./data/test" + id + "-" + dis + ".csv";
  $.ajax({
url: filename,
dataType: "text",
}).done(parseCSV);

gridsize = $("#grid").val();
groups = Math.round(200/gridsize);
DataProcess(x, y, gridsize, -100, groups);

var data = [
{
z: z_count,
colorscale: 'Electric',
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
            images: [{
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
            }],
};
Plotly.newPlot('myplot', data, layout);
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
}

var recordCount = [];

function DataProcess(x, y, gridsize, lowbound, groupsnum){
  z_count=[];
  recordCount[id] = [];
  var totalCount = 0;
  for(var i = 0;i < groupsnum;i++) {
    z_count[i]=[], recordCount[id][i] = [];
    for(var j = 0;j < groupsnum;j++) {
      var thisGridCount = 0;

      //record the zero position
      var xdown = lowbound + i * gridsize;
      var xup = lowbound + (i + 1) * gridsize;
      var ydown = lowbound + j * gridsize;
      var yup = lowbound+ (j + 1) * gridsize;
      if(xdown * xup <= 0){
        if(xdown + xup > 0){
          face_position_x = i;
        }
        else{
          face_position_x = i + 1;
        }
      }
      if(ydown * yup <= 0){
        if(ydown + yup > 0){
          face_position_y = j;
        }
        else{
          face_position_y = j + 1;
        }
      }
      //record the zero position
      for(var dataiter = 0;dataiter < x.length;dataiter++) {
        if(x[dataiter] >= lowbound + i * gridsize &&
            x[dataiter] < lowbound + (i + 1) * gridsize && 
            y[dataiter] >= lowbound + j * gridsize && 
            y[dataiter] < lowbound+ (j + 1) * gridsize) {
          thisGridCount += 1;
        }
      }
      z_count[i][j] = thisGridCount;
      totalCount += thisGridCount;
    }
  }
  console.log("Total data points: " + totalCount);
  var tmp = 0;
  for(var i = 0;i < groupsnum;i++)
    for(var j = 0;j < groupsnum;j++) {
      z_count[i][j] = z_count[i][j] * 100.0 / totalCount;
      recordCount[id][i][j] = z_count[i][j];
      tmp += z_count[i][j];
    }
  console.log(tmp);
  console.log(id);
  console.log(recordCount[id]);
}

function OverallPlotCheck() {
  var totalPercentile = [];
  console.log(recordCount);
  console.log(groups);
  for(var i = 0;i < groups;i++) totalPercentile.push([]);
  for(var i = 0;i < groups;i++)
    for(var j = 0;j < groups;j++) totalPercentile[i].push(0);
  var tmp = 0;
  for(var i = 0;i < groups;i++)
    for(var j = 0;j < groups;j++) {
      for(var k = 0;k <= 16;k++) {
        if(typeof recordCount[k][i][j] !== "number")
          console.log("fail");
        totalPercentile[i][j] += recordCount[k][i][j];
      }
      totalPercentile[i][j] /= 17;
      tmp += totalPercentile[i][j];
    }
  console.log(totalPercentile);
  console.log(tmp);
var data = [
{
z: totalPercentile,
colorscale: 'Electric',
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
            images: [{
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
            }]
};
Plotly.newPlot('allplot', data, layout);
}
