/**************************************************
** GAME VARIABLES
**************************************************/
var localPlayer,
remotePlayers,
socket;	// Local player


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {

  var user = $('#user').html();
	var roomId = $('#roomId').html();
  var status = $('#status').html();
	console.log(roomId);
	// Initialise the local player
	localPlayer = new Player(user, roomId, status);

	// Start listening for events
	remotePlayers = [];
	socket = io.connect("/",{port: 3000, transports: ["websocket"]});
	//socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});
	setEventHandlers();

};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("new player", onNewPlayer);
	socket.on("remove player", onRemovePlayer);
};

function onSocketConnected() {
	console.log("Connected to socket server");
	// tell the server to create new player.
  if(status == 'player'){
	   socket.emit("new player", {name: localPlayer.getName(), roomId: localPlayer.getRoomId(), status: localPlayer.getStatus()});
  }
};

function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
	console.log("New player connected: "+data.id);
	// add other players in client side to be render in furthur process.
	var newPlayer = new Player(data.name,data.roomId,data.status);
	newPlayer.id = data.id;
	remotePlayers.push(newPlayer);
  showPlayes();
};

function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
  showPlayers();
};

function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
		return remotePlayers[i];
	};

	return false;
};

/**************************************************
** GAME UPDATE
**************************************************/

function showPlayers() {
  $('#playerslist').empty();
  if(status == 'Player'){
    $('#playerslist').append(localPlayer.getName());
  }
  for( var i=0; i<remotePlayers.size(); i++ ){
    if(remotePlayers[i].getRoomId == localPlayer.getRoomId){
      $('#playerslist').append(remotePlayers[i].getName());
    }
  }
}
