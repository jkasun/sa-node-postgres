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
`

pool.connect()
    .then((client) => {
        client.query(query)
            .then(res => {
                for (let row of res.rows) {
                    console.log(row)
                }
            })
            .catch(err => {
                console.error(err);
            })
    })
    .catch(err => {
        console.error(err);
    })