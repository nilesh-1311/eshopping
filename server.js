const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Mock database
let products = [
    { id: 1, name: "Product A", category: "Electronics", price: 100 },
    { id: 2, name: "Product B", category: "Clothes", price: 50 },
    { id: 3, name: "Product C", category: "Books", price: 20 }
];

let cart = [];

app.get('/', (req, res) => {
    res.render('index', { products, cart });
});

app.post('/add-to-cart', (req, res) => {
    const productId = parseInt(req.body.id);
    const product = products.find(p => p.id === productId);
    const item = cart.find(c => c.id === productId);
    if(item){
        item.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    res.redirect('/');
});

app.get('/cart', (req,res) => {
    res.render('cart', { cart });
});

app.post('/update-cart', (req,res) => {
    const id = parseInt(req.body.id);
    const qty = parseInt(req.body.qty);
    const item = cart.find(c => c.id === id);
    if(item){
        item.qty = qty;
    }
    res.redirect('/cart');
});

app.get('/admin', (req,res) => {
    res.render('admin', { products });
});

app.post('/admin/add', (req,res) => {
    const { name, category, price } = req.body;
    const id = products.length + 1;
    products.push({ id, name, category, price: parseFloat(price) });
    res.redirect('/admin');
});

app.post('/admin/delete', (req,res) => {
    const id = parseInt(req.body.id);
    products = products.filter(p => p.id !== id);
    res.redirect('/admin');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
