let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   // dbConfig = require('./database/db');
    dotenv=require('dotenv');
    dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_connection, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex:true,
   useFindAndModify: false,
   keepAlive: true,
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
// Routes to Handle Request
const employeeRoute = require('../backend/routes/employee.route')
const authRouter=require('../backend/routes/auth.route')
const userRoute = require('../backend/routes/userfile.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));

app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute)
app.use('/api/user',authRouter)
app.use('/api/userFile',userRoute)
//import Register and Auth

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})


// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
}); 