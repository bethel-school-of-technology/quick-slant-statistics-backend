var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var sqlite3  =  require('sqlite3').verbose();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mysql = require ('mysql');

var createError = require ('http-errors');
var models = require ('./models');

const SECRET_KEY = 'secretkey23456';
const  router  =  express.Router();


//var users = require('./routes/users');
var generate_uid = require('./routes/generate_uid');
var customer = require('./routes/customer');
var chat = require('./routes/chat');
var viewteams = require ('./routes/viewteams');

var app = express();

let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

/*app.use(logger('dev'));*/
app.use(cors());
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
// const database = new sqlite3.Database("./quick_slants_stats.db");

// const  createUsersTable  = () => {
//     const  sqlQuery  =  `
//         CREATE TABLE IF NOT EXISTS users (
//         uid string PRIMARY KEY,
// 		first_name text,
// 		last_name text,
// 		email text UNIQUE,
// 		username text,
//         password text)`;

//     return  database.run(sqlQuery);
// }


// const  findUserByUsername  = (username, cb) => {
//     return  database.get(`SELECT * FROM users WHERE username = ?`,[username], (err, row) => {
//             cb(err, row)
//     });
// }

// const  createUser  = (user, cb) => {
//     return  database.run('INSERT INTO users (uid, first_name, last_name, email, username, password) VALUES (?,?,?,?,?,?)',user, (err) => {
//         cb(err)
//     });
// }

// app.use(bodyparser.json());
// var mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password1!',
//   database: 'quickslantstats'
// });
// mysqlConnection.connect((err) => {
//   if (!err)
//       console.log('DB connection succeded.');
//   else  
//       console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined));
// });
// app.listen(3001, ()=>console.log('Express server is running at port no : 3001'));
// app.get('/teams',(res,req) =>{
//     mysqlConnection.query('SELECT * FROM Teams',(err, rows, fields) => {
//       if(!err)
//         console.log(rows);
//       else
//         console.log(err);
//     })
// });

const port = process.env.PORT || 3050;
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});


// createUsersTable();

router.get('/chat', (req, res) => {
	console.log("is this working")
    res.status(200).send('This is an authentication server');
});

router.get('/', (req, res) => {
	console.log("is this working")
    res.status(200).send('This is an authentication server');
});

router.get('/register', (req, res) => {
	console.log("is this working")
	res.status(200).send('This is an authentication server');
});

router.get('/login', (req, res) => {
	console.log("is this working")
	res.status(200).send('This is an authentication server');
});

router.post('/register', (req, res) => {
	const  first_name  =  req.body.first_name;
	const  last_name = req.body.Last_name;
	const  email  =  req.body.email;
	const  username = req.body.username;
    console.log(req.body);
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([uid, first_name, last_name, email, username, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByUsername(username, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ uid:  user.uid }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
            });
        });
    });
});

router.post('/login', (req, res) => {
    const  username  =  req.body.username;
    const  password  =  req.body.password;
    findUserByUsername(username, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});


app.use(router);
/*const  port  =  process.env.PORT  ||  3000;
const  server  =  server.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); */

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/api/v1/users', users);
app.use('/api/v1/customer', customer);
app.use('/api/v1/generate_uid', generate_uid);
app.use('/', chat);
app.use ('/view', viewteams);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

 app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });



 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   res.send("404 error");
 });

 models.sequelize.sync().then(function (){
     console.log("database is connected")
 });
module.exports = app;
