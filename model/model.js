import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '101.101.216.16',
    user: 'nodejs',
    password: 'nodejs7654',
    database: ''
}).promise();

async function read() {
    let result;
    try {
        const [list] = await pool.query('SELECT * FROM `room`');
        result = list;
    } catch (err) {
        console.error(err);
    }
    return result;
}

export {read};