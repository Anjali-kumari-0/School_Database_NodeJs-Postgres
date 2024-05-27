const {Pool} = require('pg');
const pool= new Pool({
    user:'anjali2',
    host:'localhost',
    database:'school_db',
    password:'Anjali@123',
    port:5432
})
module.exports=pool