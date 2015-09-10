var sock = null;
var ellog = null;
var port = 9000;

window.onload = function() {

var wsuri;
ellog = document.getElementById('log');

if (window.location.protocol === "file:") {
   wsuri = "ws://localhost:" + port;
} else {
   wsuri = "ws://" + window.location.hostname + ":" + port;
}

if ("WebSocket" in window) {
   sock = new WebSocket(wsuri);
} else if ("MozWebSocket" in window) {
   sock = new MozWebSocket(wsuri);
} else {
   log("Browser does not support WebSocket!");
   window.location = "http://autobahn.ws/unsupportedbrowser";
}

if (sock) {
   sock.onopen = function() {
      log("Connected to " + wsuri);
   };

   sock.onclose = function(e) {
      log("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
      sock = null;
   };

   sock.onmessage = function(e) {
      log(": " + e.data);
       process_incoming(e);
   }
}
};

function broadcast_msg(msg) {
    if (sock) {
       sock.send(msg);
       log("Sent: " + msg);
    } else {
       log("Not connected.");
    }
}
function broadcast_move(id, x, y) {
    if (sock) {
        var data ={
            "action": "move",
            "data": {
                "id": id,
                "x": x,
                "y": y
            }
        };

        var json = JSON.stringify(data);
        sock.send(json);
    }
}

function broadcast() {
    var msg = document.getElementById('message').value;
    broadcast_msg(msg);
}

function log(m) {
    //ellog.innerHTML += m + '\n';
    //ellog.scrollTop = ellog.scrollHeight;
}


function process_incoming(e) {
    var data = JSON.parse(e.data);
    if (data['action'] == 'move')
    if (typeof(move) == "function") {
        move(data["data"]["id"], data["data"]["x"], data["data"]["y"]);
    }
}