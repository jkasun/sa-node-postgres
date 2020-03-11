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

pool.connect((err, client, done) => {
    if (err) throw err
    client.query(query, (err, res) => {
        done()
        if (err) {
            console.log(err.stack)
        } else {
            for (let row of res.rows) {
                console.log(row)
            }
        }
    })
})

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
...
*/