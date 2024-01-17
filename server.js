const express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.json());

let HTTP_port = 8080;

app.listen(HTTP_port, () => {
    console.log("Server is running on port " + HTTP_port);
});

app.post("/api/products", (req, res, next) => {
    try {
        var errors = [];
        if (!req.body) {
            errors.push("An invlid input");
        }
        // else{
        //     console.log(req.body);
        // }

        const {
            productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batch_num,
            unitPrice,
            quantity,
            createdDate
        } = req.body;

        var sql = `INSERT INTO products (
        productName, description, category, brand,
        expiredDate, manufacturedDate, batch_num,
        unitPrice, quantity, createdDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        var param = [
            productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batch_num,
            unitPrice,
            quantity,
            createdDate
        ];

        db.run(sql, param, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                console.log(err.message);
                return;
            } else {
                res.json({ message: "success", data: req.body, id: this.lastID });
            }
        });
    } catch (E) {
        res.status(400).send(E);
        console.error(E);
    }
});

app.get("/api/products", (req, res, next) => {

    try {


        var sql = "select * from products";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": rows
                })
            }
        })
    }
    catch (E) {
        res.status(400).send(E);
        console.error(E);
    }
});

app.put("/api/products/:id", (req, res, next) => {
    try {
        var errors = [];
        if (!req.body) {
            errors.push("Invalid input");
        }

        const productId = req.params.id;

        const {
            productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batch_num,
            unitPrice,
            quantity,
            createdDate
        } = req.body;

        var sql = `
            UPDATE products
            SET productName = ?,
                description = ?,
                category = ?,
                brand = ?,
                expiredDate = ?,
                manufacturedDate = ?,
                batch_num = ?,
                unitPrice = ?,
                quantity = ?,
                createdDate = ?
            WHERE id = ?
        `;

        var params = [
            productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batch_num,
            unitPrice,
            quantity,
            createdDate,
            productId
        ];

        db.run(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                console.log(err.message);
                return;
            } else {
                res.json({ message: "success", data: req.body, id: productId });
            }
        });
    } catch (E) {
        res.status(400).send(E);
        console.error(E);
    }
});


app.delete("/api/product/delete/:id", (req, res, next) => {
    try {
        rec_id= parseInt(req.params.id);
        db.run('DELETE FROM products WHERE id = ?',rec_id,
            function (err, result) {
                
                if (err) {
                    res.status(400).json({ "error": err.message });
                    console.log(err.message);
                    return;
                }
                res.json({ message: "success", data: "id "+rec_id+" Record Deleted Successfully" });

            });
    } catch (E) {
        res.status(400).send(E);
        console.error(E);
    }
});
