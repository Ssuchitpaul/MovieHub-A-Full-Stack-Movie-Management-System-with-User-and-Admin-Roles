const express = require('express');
const bodyparser = require('body-parser');
const router = require('./routes');
const path=require('path');
const app=express();
const cors = require('cors');

app.use(bodyparser.json());
app.use(router);
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the sign-in page
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

const port=process.env.PORT||8080;

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
});

