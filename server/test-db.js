const db = require('./config/database');

async function testConnection() {
    try {
        const connection = await db.getConnection();

        console.log('Successfully connected to MySQL!');

        connection.release();
        await db.end();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

testConnection();