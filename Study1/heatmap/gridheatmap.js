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

    $('#valid').click(function() {
        console.log("test");
        ValidPlotCheck();
        });
});

var x = [], y = [], z_count = [] ;
var face_position_x, face_position_y
var id, groups, gridsize, dis

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

var closeValid = [1, 2, 5, 6, 8, 15];
var farValid = [0, 1, 2, 3, 4, 6, 8, 10, 12];

function ValidPlotCheck() {
  var totalPercentile = [];
  console.log(dis);
  var lst = dis == 61? closeValid: farValid;
  console.log(lst);
  for(var i = 0;i < groups;i++) totalPercentile.push([]);
  for(var i = 0;i < groups;i++)
    for(var j = 0;j < groups;j++) totalPercentile[i].push(0);
  var tmp = 0;
  for(var i = 0;i < groups;i++)
    for(var j = 0;j < groups;j++) {
      for(var k = 0;k < lst.length;k++) 
        totalPercentile[i][j] += recordCount[lst[k]][i][j];
      totalPercentile[i][j] /= lst.length;
      tmp += totalPercentile[i][j];
    }
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
Plotly.newPlot('validplot', data, layout);
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
      for(var k = 0;k <= 16;k++) 
        totalPercentile[i][j] += recordCount[k][i][j];
      totalPercentile[i][j] /= 17;
      tmp += totalPercentile[i][j];
    }
for(var x = 0; face_position_x + x < groups && face_position_x - x >= 0;x++)
  for(var j = 0;j < groups;j++) {
    var l = face_position_x - x, r = face_position_x + x;
    var v = (totalPercentile[j][l] + totalPercentile[j][r]) / 2.0;
    totalPercentile[j][l] = v;
    totalPercentile[j][r] = v;
  }
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
var sortLst = [];
for(var i = 0;i < groups;i++)
  for(var j = 0;j < groups;j++) {
    sortLst.push({id: [i, j], v: totalPercentile[i][j]});
  }
sortLst.sort(function(a, b) {
  return b.v - a.v;
});
console.log(sortLst);
var t = 0;
var chk = [true, true, true];
for(var i = 0;i < sortLst.length;i++) {
  t += sortLst[i].v;
  if(t >= 66.7 && chk[0]) {
    console.log(66.7, i);
    chk[0] = false;
  }
  if(t >= 80 && chk[1]) {
    console.log(80, i);
    chk[1] = false;
  }
  if(t >= 95 && chk[2]) {
    console.log(95, i);
    chk[2] = false;
  }
}
}
