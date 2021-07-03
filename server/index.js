const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const request = require('request');
const app = express();
var products  ;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(253402300000000),
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "databasefwd",
  multipleStatements: true,
});

  app.get("/getProduct", (req, res) => {
    if (products) {
        res.status(200).send(products);
        
      } else {
    
        res.send({ token : false });
    
      }
  });
  app.post("/database", (req, res) => {         
    const name = req.body.name;
    const lname = req.body.lname;
    const number = req.body.number;
    const gender = req.body.gender;
    const alldate = req.body.alldate;
    const plan = req.body.plan;
    const payment = req.body.payment;
    const lastprice = req.body.lastprice;

      db.query(
        "INSERT INTO data (name, lname, number, gender, dateofbirth, frequency, plan, baseAnnualPremium) VALUES (?,?,?,?,?,?,?,?)",
        [name, lname, number, gender, alldate, plan, payment, lastprice],
        (err, result) => {
          console.log(err);
        }
      );
  });

  app.post("/getProduct", (req, res) => {
    const genderCd = req.body.gender.toString();
    const dob = req.body.alldate.toString();
    const planCode = req.body.plan.toString();
    const paymentFrequency = req.body.payment.toString();
    const saPerYear = 500000;
   console.log(dob);

    var token = "7454ba0a-cbf4-4282-aee6-56e6125718b2"
    var postData = {
      "genderCd": genderCd,
      "dob": dob,
      "planCode": planCode,
      "saPerYear":saPerYear,
      "paymentFrequency": paymentFrequency
    };
    request({
      url: 'https://api.fwd.co.th/dev-ecommerce/getProduct',
      method: 'POST',
      headers: {
         'Content-Type': 'application/json; charset=utf-8',
         'cache-control': 'no-cache',
         'Authorization': "Bearer " + token,
      },
      body: postData,
      rejectUnauthorized: true,
      json: true
    }, function(err, res) {
          if(err) {
            console.error(err);
          } else {

            products= res.body.quotationProductList;
            
            console.log(products);
            
          }
    
    });
  });

app.listen(3001, () => {
  console.log("running server for my life");
});
