module.exports = function(io){
  var router = require('express').Router();
  var Player = require('../Player').Player;
  var socket, players;
  var _user, _roomId, _status;

  function init(server){
    players = [];
    router.get('/', (req,res)=>{
      console.log('I am at a lobby');
      if(req.werewolf_session.user) {
        _user = req.werewolf_session.user;
      } else {
        _user = 'wasin';
      }
      if(req.werewolf_session.roomId) {
        _roomId = req.werewolf_session.roomId;
      } else {
        _roomId = 'undefined';
      }
      if(req.werewolf_session.status) {
        _status = 'undefined';
      }
      res.render('lobby', { user: _user, roomId: _roomId, status: _status });
    })

    setEventHandlers();
  }
  var setEventHandlers = function(){
    io.on('connection', onSocketConnection);
  }

  function onSocketConnection(client) {
    console.log('New player has connected :'+client.id);
    client.on('disconnect', onClientDisconnect);
    client.on('new player', onNewPlayer);
  }

  function onClientDisconnect(){
    console.log('Player has disconnected :'+this.id);
    var removePlayer = playerById(this.id);

    if (!removePlayer) {
      util.log("Player not found: "+this.id);
      return;
    };
    // remove player from players array
    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", {id: this.id});
  }

  function onNewPlayer(data) {
    // create new Player
    var newPlayer = new Player(data.name,data.roomId,data.status);
    newPlayer.id = this.id;
    // emit to other Players' server about this new player
    this.broadcast.emit("new player", {id: newPlayer.id, name: newPlayer.getName(), roomId: newPlayer.getRoomId(), status: newPlayer.getStatus()});
    var i,existingPlayer;
    for( i=0;i<players.length;i++){
      existingPlayer = players[i];
      // emit to one's server to add existing players
      this.emit("new player", {id: existingPlayer.id, name: existingPlayer.getName(), roomId: existingPlayer.getRoomId(), status: existingPlayer.getStatus()});
    }
    players.push(newPlayer);
  };

  function playerById(id) {
    var i;
    for( i=0; i < players.length; i++){
      if( players[i].id == id){
        return players[i];
      }
    }
    return false;
  }
  init();
  return router;
}
