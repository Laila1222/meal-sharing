const express = require ('express');
const router = express.Router ();
const pool = require ('../database');
const bodyParser = require ('body-parser');


router.get ('/:id', (req, res) => {
    const id = req.params.id;
    let result = [];
    const getInformationFromDb = function (callback) {
        pool.query(`select max_reservations from meal where id = ?;`, id,  (err, results, querry) => {
            if (err) {
                return callback(err);
            }
            else if (res.length) {
                console.log(res);
                result.push(res[0].max_reservations);
            }    
            callback(null, result);    
        })
     };

     console.log("call function");
     getInformationFromDb(function(err, result) {
         if (err) {
             console.log("database error");
         } else {
             console.log(result);
             
         }
     })
    
    

    res.send ('hello');
    
     
    
    

})




module.exports = router;