const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const router = express.Router();
const bodyParser = require('body-parser')



const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true,
  },
});

app.get('/', function(req, res){
  res.json({ message: 'Welcome To Index' });
});


app.use(function(req, res, next) {
  req.io = io;
  next();
});

io.on('connection', function(socket) {
  console.log('socket.io connection made');
});



const usersCtrl = require('./module/controllers/users')();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use('/api', router);


router.get('/', function(req, res){
  res.json({ message: 'Welcome To Api' });
});
router.get('/users', usersCtrl.all);
router.post('/users', usersCtrl.create);
router.get('/users/:id', usersCtrl.edit);
router.put('/users', usersCtrl.update);
router.delete('/users', usersCtrl.delete);


server.listen(process.env.PORT || 3000, () =>
  console.log(`Server has started.`)
);