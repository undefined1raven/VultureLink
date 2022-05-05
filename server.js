const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', socket => {
    console.log('Connection Detected')
    setInterval(() => {
        io.emit('tx', {tx: Date.now()});
    }, 1000);
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'dist/views'));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.post('/auth_post', (req, res) => {
    console.log(req.body.email) 
    res.redirect('/login');
}); 

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('/advanced_telemetry', (req, res) => {
    if(req.cookies == undefined){
        res.redirect('/login');
    }
    else{
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    }
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (process.env.NODE_ENV !== 'production') {
    server.listen(7780);
}
else {
    server.listen(process.env.PORT);
}
console.log('active');