const express = require('express');
// MLAB.com is used for mongodb cloud
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send(req.body.text + " created!");
});

//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(201).send(req.params.id + ' deleted!')
});


//DB Connection provider
async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://benizi:Sniper11@cluster0-9geja.mongodb.net/test?retryWrites=true',{
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}


module.exports = router;