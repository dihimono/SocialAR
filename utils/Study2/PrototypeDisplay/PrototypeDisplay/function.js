function transTop(deg, rad) {
	var top = 'calc( 50% - ' +FONTSIZE/2+ 'px';
	top += ' - ' + rad * Math.cos( 0.0174532925 * deg ) + 'px )';
	return top;
}

function transLeft(deg, rad) {
	var left = 'calc( 50% - ' +FONTSIZE/2+ 'px';
	left += ' + ' + rad * Math.sin( 0.0174532925 * deg ) + 'px )';
	return left;
}

function setSize() {
	var sContent = "<style> h1 { font-size: " +FONTSIZE+ "px;" ;
	sContent += " } </style>" ;
	document.write(sContent);
}

function getRandomArray(n) {
	var arr = new Array(n);
	for (var i = 0; i < n; i++)
		arr[i] = i;
	while (n) {
		var i = Math.floor(Math.random() * n--);
		var t = arr[n];
		arr[n] = arr[i];
		arr[i] = t;
	}
	return arr;
}

function readDict(dict) {

	var len=0;

    var arr = dict.split( "\n" );
    len = arr.length;
	for(index = 0; index < len; index++) {
		var str = arr[index], words=[];

		if ( ENG == 1 ) {
			words = str.split(' ');
			cnt = words.length;
		}
		else cnt = str.length;

		var deg = 0;
		if( CLOCKWISE == 0 ) deg = Number( ANGLE + SPACE*((cnt-1)/2) + SPACE);
		else deg = Number( ANGLE - SPACE*((cnt-1)/2) - SPACE);

		for (var i = 0; i < cnt; i++) {

			if( CLOCKWISE == 0 ) deg -= SPACE;
			else deg += SPACE;

			var Content = '<h1 class="line'+index+'" id="c' +index+i+ '"' ;
			Content += 'style="display: none; ';
			Content += 'transform: rotate('+deg+'deg);' ;
			Content += 'top: ' +transTop(deg, RADIUS)+ ';' ;
			Content += 'left: ' +transLeft(deg, RADIUS)+ ';">' ;
			if( ENG == 1 ) Content += words[i]+ '</h1>' ;
			else Content += str.charAt(i)+ '</h1>' ;
			document.write( Content );

		}

    }


	return len;
}

function randomTrial(index, start, sec) {

	var txt=document.getElementsByClassName('line'+index+'');
		
	for (var i = 0; i < txt.length; i++) {
		var char = document.getElementById('c'+index+i+'');
		char.style.display='block';
	}

	setTimeout( function() { 
		for (var i = 0; i < txt.length; i++) {
			var char = document.getElementById('c'+index+i+'');
			char.style.display='none';
		}
	} , 1000*sec );

	currTrial++;
	return;
}