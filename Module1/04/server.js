var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require("mongoose");
var dbUrl = 'mongodb+srv://user:user@testmongo.wzf3k.mongodb.net/testMongo?retryWrites=true&w=majority';


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const chatMessage = mongoose.model('Chat', { name: String, message: String });

app.post('/messages', function(req, res) {
    // messages.push({ name: JSON.parse(req.body).name, message: JSON.parse(req.body).message });


    const message = new chatMessage(req.body.message);
    message.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            chatMessage.find({}, (err, chats) => {
                res.status(200).send(chats);
            })
            io.emit('message', req.body);

        }

    })

})

app.get('/load', (req, res) => {
    chatMessage.find({}, (err, chats) => {
        res.status(200).send(chats);
    })
})


io.on('connection', (socket) => {
    console.log("USer connected");
})

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo Db Connection ' + err);
});

var server = http.listen(3000, () => {
    console.log("Server is listing to port:" + server.address().port)
});