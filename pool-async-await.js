const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '1234abcd',
    port: 5432,
})

pool.on('error', (err, client) => {
    console.error('Error:', err)
})

const query = `
SELECT *
FROM users
`;

(async () => {
    try {
        const client = await pool.connect();
        const res = await client.query(query);

        for (let row of res.rows) {
            console.log(row)
        }
    } catch (err) {
        console.error(err);
    }
})();

/**
Expected output:

{
  email: 'johndoe@gmail.com',
  firstname: 'john',
  lastname: 'doe',
  age: 21
}
{
  email: 'anna@gmail.com',
  firstname: 'anna',
  lastname: 'dias',
  age: 35
}
 */