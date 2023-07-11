const express = require("express");
const routes = require('./controllers');
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  console.log(`${req.method} request received on endpoint ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

// const corsOptions = {
//     origin:'http://localhost:3001', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
// // app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.use(routes);
app.get('*', (req, res) =>
res.render('404')
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
  next();
});

app.listen(PORT, () => {
  console.log(`Burger is ready on PORT ${PORT} 🍔`);
});
