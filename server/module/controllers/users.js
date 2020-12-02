const db = require('../../config/database');
const table = 'users';
const crypto = require('crypto');

module.exports = () =>{
   return {
    all: ((req, res) => {
      let query = `SELECT * FROM ${table} order by id`;      
      db.query(query, (err, result) => {
        if (err) throw err;
        return res.status(200).send({ success: true, data: result });
      });
    }),
    create: ((req, res) => {
      let parse = req.body
      let query = `INSERT INTO ${table} (nama,email,password) 
      VALUES ('${parse.nama}', '${parse.email}','${crypto.createHash('md5').update(parse.password).digest('hex')}')`;
      db.query(query, (err) =>{
        if (err) throw err;
        req.io.emit("add_handler");
        return res.status(200).send({ success: true });
      });

    }),
    edit: ((req, res) => {
      req.params.id = parseInt(req.params.id);
      let query = `SELECT * FROM ${table} WHERE id=${req.params.id}`;    
      db.query(query, (err,result) =>{
        if (err) throw err;
        return res.status(200).send({ success: true, data: result });
      });
    }),
    update: ((req, res) => {
      let parse = req.body
      let query = `UPDATE  ${table} SET nama='${parse.nama}',email='${parse.email}' WHERE id=${parseInt(parse.id)}`;
      db.query(query, (err) =>{
        if (err) throw err;
        req.io.emit("update_handler");
        return res.status(200).send({ success: true });
      });
    }),
    delete: ((req, res) => {
      let parse = req.body
      let query = `DELETE  FROM ${table} WHERE id=${parseInt(parse.id)}`;    
      db.query(query, (err,result) =>{
        if (err) throw err;
        req.io.emit("delete_handler");
        return res.status(200).send({ success: true, data: result });
      });
    }),    
   }
};