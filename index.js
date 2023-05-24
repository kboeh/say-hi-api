const express = require('express');
const app= express();
const mongoose = require('mongoose');
const Product = require('./models/product');
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

//lists all products
//handles query string for filtering categories
app.get ('/products', async (req, res) => {
    const {category} = req.query;
    console.log(req.query)
    if(category) {
        const products = await Product.find({category});
        res.json(products);
    } else {
        const products = await Product.find({});
        res.json(products);
    }
})

//creating/adding products
app.post ('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect('/'); 
})

//pages for individual products
app.get ('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    // console.log(product)
    res.send(product)
})

//update/change product
app.put ('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    console.log(req.body);
    res.json('PUT!')
})

app.delete('/products/:id', async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
})

app.listen(5000, () => {
    console.log('listening on port 5000');
});

