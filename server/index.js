const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const ItemModel = require('./models/Items');
app.use(cors());
app.use(express.json());

// Sign Up

app.post('/newUser', (req, res) => {
  const username = req.body.username;
  const userpass = req.body.userpass;

  UserModel.findOne({ username })
    .then((result) => {
      if (result) res.status(403).send('user name already taken!');
      else {
        const newUser = UserModel({ username: username, password: userpass });
        newUser.save();
        res.send('user added succesfully');
      }
    })
    .catch((err) => res.status(400).send('somthing went wrong'));
});

// login
app.post('/getUser', (req, res) => {
  const username = req.body.username;
  const userpass = req.body.userpass;

  UserModel.findOne({ username, password: userpass })
    .then((result) => {
      if (!result) res.status(403).send('user not found');
      else {
        res.send(result);
      }
    })
    .catch((err) => res.status(400).send('somthing went wrong'));
});

//add item to item database
app.post('/addItem', async (req, res) => {
  const owner = req.body.owner;
  const itemName = req.body.itemName;
  const itemPrice = req.body.itemPrice;
  const itemDiscription = req.body.itemDiscription;

  const newItem = ItemModel({
    owner: owner,
    itemName: itemName,
    price: itemPrice,
    description: itemDiscription,
  });
  await newItem.save((err, data) => {
    res.send(data);
  });
});

//read items
app.get('/readItems', (req, res) => {
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
});

// user items
app.post('/readOwnerItems', (req, res) => {
  const user = req.body.username;

  ItemModel.find({ owner: user })
    .then((result) => {
      console.log(result);
      if (!result) res.status(403).send('user not found');
      else {
        res.send(result);
      }
    })
    .catch((err) => res.status(400).send('somthing went wrong'));
});

// update

app.put('/update', async (req, res) => {
  const newItemName = req.body.newItemName;
  const newItemPrice = req.body.newItemPrice;
  const newItemDescription = req.body.newItemDescription;
  const id = req.body.id;

  try {
    await ItemModel.findById(id, (error, itemToUpdate) => {
      itemToUpdate.itemName = newItemName;
      itemToUpdate.price = Number(newItemPrice);
      itemToUpdate.description = newItemDescription;
      itemToUpdate.owner = itemToUpdate.owner;

      itemToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send('updated');
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await ItemModel.findByIdAndRemove(id).exec();
  res.send('item removed');
});

app.listen(3003, () => {
  console.log('Connected.');
});
