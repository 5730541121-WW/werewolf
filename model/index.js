var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/werewolf');
mongoose.connection.on('error', ()=>{
  console.log('MongoDB connection error.');
  process.exit();
});

var roomSchema = new mongoose.Schema({
  roomId: String
});

var Room = mongoose.model('rooms', roomSchema);
module.exports = {
  Room: Room
};
