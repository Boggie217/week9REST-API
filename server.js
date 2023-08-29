require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 5001;
const userRouter = require("./users/routes");

const User = require("./users/model")

const app = express();

app.use(cors());

app.use(express.json());

const syncTables = () => {
    User.sync({alter: true});


};


app.use(userRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is working" });
});





app.listen(port, () => {
    syncTables();
    console.log(`server is running on port${port}`) 

});




app.get('/api/films', async (req, res) => {
    try {
      const films = await Film.findAll();
      res.json(films);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });