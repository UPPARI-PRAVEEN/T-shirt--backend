const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors"); // Import the cors module
const connectDB = require("./config/db")
const path = require('path')

//dot config
dotenv.config();
//mongoDb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//routes 
//1st route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use("/api/v1/inventory", require("./routes/inventoyRoutes"));

//routes
//1 test route
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "welcome to blood bank App"
    });
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(
        `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`

    );
});
