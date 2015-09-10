

/* 

create array of oscillators instead

*/
/*
oscillator = context.createOscillator(); // Create sound source
oscillator.connect(context.destination); // Connect sound to output
oscillator.start(0); // Play instantly
		
*/

function move(id, x, y) {
    document.getElementById(id).style.left = x+'px';
    document.getElementById(id).style.top= y+'px';
    sineList[id]["sine"].frequency.value = x;
    sineList[id]["gain"].gain.value = y/1000;
    console.log(id, x, y)
}

function send_move(id, x, y) {
    move(id, x, y);
    broadcast_move(id, x, y);
}



//var nodeList = document.getElementsByClassName('draggable');
//
//for(var i=0;i<nodeList.length;i++) {
//    var obj = nodeList[i];
//    sineList[i] = context.createOscillator();
//    sineList[i].connect(context.destination);
//
//    obj.addEventListener('touchmove', function(event) {
//        var touch = event.targetTouches[0];
//
//        // Place element where the finger is
//        send_move(event.target.id, touch.pageX, touch.pageY);
//        event.preventDefault();
//        //asdfbroadcast_msg(event.target.id + ' moves to ' + touch.pageX + ', ' + touch.pageY + '!');
//
//    }, false);
//}


function play_all() {
    for (var k in sineList) {
        sineList[k].sine.start(0);
    }
}

function stop_all() {
    for (var k in sineList) {
        sineList[k].sine.stop(0);
    }
}
