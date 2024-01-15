const express = require('express');
const app = express();
const db = require('./config/db');
const Post = require('./models/Post');

const port = process.env.PORT || 4000;

db().then(() => console.log('successfully connected')).catch(err => console.log(err));

//middleware that parses the data
app.use(express.json());

//to check the health of the api
app.get('/api/', (req, res) => {
    res.status(200).json({ message: 'Api is working fine' });
})

//fetching all the posts
app.get('/api/posts', (req, res) => {
    Post.find({}).then((data) => {
        console.log(data)
        res.status(200).json({ message: data })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: err })
    })
})

//get a specific post
app.get('/api/posts/:id', (req, res) => {

    let postid = req.params.id;
    Post.find({ _id: postid }).then((data) => {
        console.log(data)
        res.status(200).json({ message: data })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: err })
    })
})


//create a new post
app.post('/api/posts', (req, res) => {

    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data) => {
        console.log(data);
        res.status(200).json({ message: "post created successfully", data: data })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: err })
    })
})

//updating a specific post
app.put('/api/posts/:id', (req, res) => {

    let postid = req.params.id;
    let newinfo = {
        title: req.body.title,
        description: req.body.description
    }
    Post.findByIdAndUpdate(postid , newinfo).then((data)=>{
        res.status(200).json({ message: "post updated successfully", data: data })
    }).catch((err)=>{
        res.status(500).json({ message: err })
    })
})

//deleting a specific post
app.delete('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    Post.findByIdAndDelete(postid).then((data)=>{
        res.status(200).json({ message: "post deleted successfully"})
    }).catch((err)=>{
        res.status(500).json({ message: err })
    })
})

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is up and running at ${port}`);
    }
})