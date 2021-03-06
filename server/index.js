//when you want to deploy to heroku add client to git ignore
//because you want to deploy the built version of vue

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//handle production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    // this is the result of Vue Build for production
    app.use(express.static(__dirname + '/public/'));

    //handle Single page application
    app.get(/.*/, function(req, res){
        res.sendFile(__dirname + '/public/index.html')
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port : ${port}`));