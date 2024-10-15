const express = require('express');
const path = require('path');
const bcryptjs = require('bcryptjs');
const collection = require("./config");
const { name } = require('ejs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser) {
        res.send("User already exists. Please choose a different name.");
    }else {
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("User name cannot be found");
        }
        const passwordMatch = await bcryptjs.compare(req.body.password, check.password);
        if(passwordMatch) {
            res.render("home");
        }else {
            res.send("Wrong Password");
        }
    }catch {
        res.send("Wrong Details");
    }
})

const port = 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
