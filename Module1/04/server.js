var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var messages = [
    { name: 'tim', message: "hi" },
    { name: 'john', message: "hello" }
]
app.post('/messages', function(req, res) {
    // messages.push({ name: JSON.parse(req.body).name, message: JSON.parse(req.body).message });

    messages.push(req.body.message)
    console.log(messages)
    io.emit('message', req.body);
    res.status(200).send(messages);
})
app.get('/messagesLoad', function(req, res) {

    res.send(messages);
})

io.on('connection', (socket) => {
    console.log("USer connected");
})

var server = http.listen(3000, () => {
    console.log("Server is listing to port:" + server.address().port)
});