var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the Sqlite database");
       
    //     db.run(
    //         `CREATE TABLE IF NOT EXISTS products 
    //   (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     productName TEXT,
    //     description TEXT,
    //     category TEXT,
    //     brand TEXT,
    //     expiredDate TEXT,
    //     manufacturedDate TEXT,
    //     batch_num INTEGER,
    //     unitPrice INTEGER,
    //     quantity INTEGER,
    //     createdDate TEXT
    //   )
    //   `,
    //         (err) => {
    //             if (err) {
    //                 // table already created
    //             } else {
    //                 // table just created, creating some rows.
    //                 var insert = `INSERT INTO products (
    //         productName, description, category, brand,
    //         expiredDate, manufacturedDate, batch_num,
    //         unitPrice, quantity, createdDate
    //       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    //                 db.run(insert, [
    //                     "White Basmati Rice",
    //                     "From Pakistan",
    //                     "rice",
    //                     "Sample Brand",
    //                     "2012-01-03",
    //                     "2011-12-01",
    //                     1245,
    //                     125,
    //                     100,
    //                     "2012-01-01",
    //                 ]);
    //             }
    //         }
    //     );
    }
});

module.exports = db; //this is mandotory 
