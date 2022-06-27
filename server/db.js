const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://abdallah:200019692002@cluster0.f4d4k.mongodb.net/users?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then((res) => console.log('connnected mongo'))
  .catch((err) => console.log(err));

mongoose.users = mongoose.createConnection(
  'mongodb+srv://abdallah:200019692002@cluster0.f4d4k.mongodb.net/users?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
mongoose.items = mongoose.createConnection(
  'mongodb+srv://abdallah:200019692002@cluster0.f4d4k.mongodb.net/items?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
module.exports = mongoose;
