const { Pool } = require('pg')
const Cursor = require('pg-cursor')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '1234abcd',
    port: 5432,
});

(async () => {
    const client = await pool.connect();
    const query = 'SELECT * FROM users';

    const cursor = await client.query(new Cursor(query));

    cursor.read(1, (err, rows) => {
        console.log(rows);

        cursor.read(1, (err, rows) => {
            console.log(rows);
        });
    })
})();
