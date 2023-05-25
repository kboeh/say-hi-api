const express = require('express');
const app= express();
const mongoose = require('mongoose');
const Comment = require('./models/comment');
//On Windows computers, enter the command ( node -i -e "$(< index.js)" ) into the Git Bash terminal.

require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

main().catch(err => console.log(err));

async function main() {
  //username + password + database name in MONGODB_URI
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to database.')
}

//lists all comments
//handles query string for filtering categories
app.get ('/comments', async (req, res) => {
    const {category} = req.query;
    console.log(req.query)
    if(category) {
        const comments = await Comment.find({category});
        res.json(comments);
    } else {
        const comments = await Comment.find({});
        res.json(comments);
    }
})

//creating/adding comments
app.post ('/comments', async (req, res) => {
    const newProduct = new Comment(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect('/');
})

//pages for individual comments
app.get ('/comments/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Comment.findById(id);
    // console.log(product)
    res.send(product)
})

//update/change product
app.put ('/comments/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Comment.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    console.log(req.body);
    res.json('PUT!')
})

app.delete('/comments/:id', async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    const deleteProduct = await Comment.findByIdAndDelete(id);
})

app.listen(5000, () => {
    console.log('listening on port 5000');
});

