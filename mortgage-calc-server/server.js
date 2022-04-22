var express = require("express")
var app = express()

var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/banks", (req, res, next) => {
    var sql = "select * from banks"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/banks/:id", (req, res, next) => {
    var sql = "select * from banks where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/banks/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.rate){
        errors.push("No rate specified");
    }
    if (!req.body.maxloan){
        errors.push("No maxloan specified");
    }
    if (!req.body.minpay){
        errors.push("No minpay specified");
    }
    if (!req.body.term){
        errors.push("No term specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        rate: req.body.rate,
        maxloan: req.body.maxloan,
        minpay: req.body.minpay,
        term: req.body.term
    }

    var sql ='INSERT INTO banks (name, rate, maxloan, minpay, term) VALUES (?,?,?,?,?)'
    var params =[data.name, data.rate, data.maxloan, data.minpay, data.term]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.patch("/api/banks/:id", (req, res, next) => {
    
    var data = {
        name: req.body.name,
        rate: req.body.rate,
        maxloan: req.body.maxloan,
        minpay: req.body.minpay,
        term: req.body.term
    }

    db.run(
        `UPDATE user banks 
           name = coalesce(?,name),
           rate = coalesce(?,rate),
           maxloan = coalesce(?,maxloan),
           minpay = coalesce(?,minpay),
           term = coalesce(?,term), 
           WHERE id = ?`,
        [data.name, data.rate, data.maxloan, data.minpay, data.term],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/banks/:id", (req, res, next) => {
    db.run(
        'DELETE FROM banks WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

