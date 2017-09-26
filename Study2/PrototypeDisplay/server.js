var express = require('express');
var path = require('path');
var fs = require('fs');

var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 9487;
var filename;

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S+": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function finit() {
    if (!fs.existsSync('log')) fs.mkdirSync('log');
    filename = 'log/' + new Date().Format("yyyyMMdd-hhmm");
}

function logger(data) {
    var t = new Date().Format("hh:mm:ss:SSS");
    msg = t + ' ' + data;
    console.log(msg);
    fs.appendFile( filename , msg + '\n', function(err){
        if (err) { console.error(err) }
    });
}

app.use(express.static(path.join(__dirname, '')));
app.get('/client' , function(req, res){ res.sendFile(__dirname + '/client.html'); });
app.get('/server', function(req, res){ res.sendFile(__dirname + '/server.html');});
finit();

io.on('connection', function(socket){

    socket.on('start_round', function(){
        logger('start a new round.');
    });

    socket.on('show_list', function(list){
        fs.appendFile( filename , '\n', function(err){
            if (err) { console.error(err) }
        });
        logger( 'list fade in.');
        io.emit('start_c', list);
    });

    socket.on('click_s', function(ans){
        logger( ans );
        io.emit('click_c');
    });

    socket.on('fade_word', function(i) {
        logger('word #'+i+' fade out.');
    });

    socket.on('distract', function() {
        logger('Distract');
    });

});

http.listen(port, function(){
    console.log('listening on *:'+port);
});
