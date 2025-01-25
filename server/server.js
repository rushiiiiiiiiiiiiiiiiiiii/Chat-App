const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

const http = require('http');  // Import http to create server for Socket.io
const socketIo = require('socket.io');  // Import Socket.io
const server = http.createServer(app);  // Create server
const io = socketIo(server, {
  cors: {
    origin: "https://majestic-taffy-18b35d.netlify.app",  // Allow your front-end origin
   //  origin: "http://localhost:5173",  // Allow your front-end origin
    methods: ["GET", "POST"],  // Allow these HTTP methods
    allowedHeaders: ["Content-Type"],  // Allow the Content-Type header
  }
}); 

app.use(express.static('images'));
app.use(express.json());
app.use(cors({
   origin: 'https://majestic-taffy-18b35d.netlify.app',
   // origin: 'http://localhost:5173',
   methods: ['POST', 'GET', 'DELETE'],
}));

const RegModel = require('./Schemas/Register');
const chatModel = require('./Schemas/Message');

// Mongo connection 
// mongoose.connect('mongodb+srv://rushikesharote14:oqai74leLp6fpD5b@cluster0.e0v7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb+srv://rushikesharote14:oqai74leLp6fpD5b@cluster0.e0v7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log("mongodb connected"))
   .catch(err => console.log("failed to connect", err));

// Multer Storage Setup
const diskstorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'images');
   },
   filename: (req, file, cb) => {
      cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({ storage: diskstorage });

//routes start from here

//register route
app.post('/reg', upload.single('image'), (req, res) => {
  const { name, phone, password } = req.body
  const image = req.file.filename;
  RegModel.create({ name, image, phone, password })
     .then(regchat => res.json(regchat))
     .catch(err => res.json(err))
})

app.get('/', (req,res)=>{
  res.json('Hii')
})

//Login route
app.post('/log', (req, res) => {
  const { phone, password } = req.body
  RegModel.findOne({ phone, password })
     .then(regchat => res.json(regchat))
     .catch(err => res.json(err))
})

//Fetch user route
app.get('/getuser/:id', (req, res) => {
  const userid = req.params.id
  RegModel.find({ _id: { $ne: userid } })
     .then(regchat => res.json(regchat))
     .catch(err => res.json(err))
})

app.get('/getuserone/:id', (req, res) => {
  const userid = req.params.id
  RegModel.findOne({ _id: userid } )
     .then(regchat => res.json(regchat))
     .catch(err => res.json(err))
})

app.get('/getuserdet/:id', (req, res) => {
  const userid = req.params.id
  RegModel.findById({ _id: userid })
     .then(regchat => res.json(regchat))
     .catch(err => res.json(err))
})

app.post('/chat', (req, res) => {
   const { id, sid, message } = req.body;
   chatModel.create({ id, sid, message })
      .then((chat) => {
         io.emit('newMessage', { chat });  // Emit new message to all connected clients
         res.json(chat);
      })
      .catch((err) => res.json(err));
});

app.get('/getchat', (req, res) => {
   const { id, sid } = req.query;
   chatModel.find({
      $or: [
         { id: id, sid: sid },
         { id: sid, sid: id }
      ],
   })
      .then((chat) => res.json(chat))
      .catch((err) => res.json(err));
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
   console.log('A user connected');

   // Handle disconnection
   socket.on('disconnect', () => {
      console.log('User disconnected');
   });
});

// Start the server
server.listen(3001, () => {
   console.log("Server running on port 3001");
});












// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const app = express()
// const multer = require('multer')
// const path = require('path')
// app.use(express.static('images'));

// app.use(express.json())
// app.use(cors({
//    origin: 'http://localhost:5173',
//    methods: ['POST', 'GET', 'DELETE'],
// }))

// // Schemas
// const RegModel = require('./Schemas/Register');
// const chatModel = require('./Schemas/Message')

// // mongo connection
// mongoose.connect('mongodb://localhost:27017/whatsapp')
//    .then(() => console.log("mongodb connected"))
//    .catch(err => console.log("failed to connect", err))


// //Multer Storage Setup
// const diskstorage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, 'images')
//    },
//    filename: (req, file, cb) => {
//       cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname))
//    }
// })
// const upload = multer({ storage: diskstorage })


// //routes start from here

// //register route
// app.post('/reg', upload.single('image'), (req, res) => {
//    const { name, phone, password } = req.body
//    const image = req.file.filename;
//    RegModel.create({ name, image, phone, password })
//       .then(regchat => res.json(regchat))
//       .catch(err => res.json(err))
// })

// //Login route
// app.post('/log', (req, res) => {
//    const { phone, password } = req.body
//    RegModel.findOne({ phone, password })
//       .then(regchat => res.json(regchat))
//       .catch(err => res.json(err))
// })

// //Fetch user route
// app.get('/getuser/:id', (req, res) => {
//    const userid = req.params.id
//    RegModel.find({ _id: { $ne: userid } })
//       .then(regchat => res.json(regchat))
//       .catch(err => res.json(err))
// })

// app.get('/getuserone/:id', (req, res) => {
//    const userid = req.params.id
//    RegModel.findOne({ _id: userid } )
//       .then(regchat => res.json(regchat))
//       .catch(err => res.json(err))
// })

// app.get('/getuserdet/:id', (req, res) => {
//    const userid = req.params.id
//    RegModel.findById({ _id: userid })
//       .then(regchat => res.json(regchat))
//       .catch(err => res.json(err))
// })

// app.post('/chat', (req, res) => {
//    const { id, sid, message } = req.body
//    chatModel.create({ id, sid, message })
//       .then(chat => res.json(chat))
//       .catch(err => res.json(err))
// })

// app.get('/getchat', (req, res) => {
//    const { id, sid } = req.query;
//    chatModel.find({
//       $or:[
//          {id:id,sid:sid},
//          {id:sid, sid:id}],
//     })
//       .then(chat => res.json(chat))
//       .catch(err => res.json(err));
// });

// app.listen("3001", () => {
//    console.log("Server running on port 3001")
// })