import dotenv from 'dotenv';
dotenv.config(); // load env variables
import 'reflect-metadata';
import app from './app';
import { connect, connection } from 'mongoose';

(async () => {
    try {
        // connect to db
        const db = await connect(String(process.env.DB_URI));
        if(db) console.log('Connected to DB');

        connection.on('error', (err) => {
            console.log(`Error connecting to DB: ${err}`);
        });
        connection.on('disconnected', () => {
            console.log('Mongoose connection closed')
        });

        const port = Number(process.env.PORT) || 3000;

        // spin up the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch(err) {
        console.log(err);
        process.exit();
    }

})();

process.on('SIGINT', async () => {
    // close connection to db
    await connection.close();
    process.exit(0);
});

// server needs to crash gracefully 
process.on('uncaughtException', (err) => {
    if(process.env.NODE_ENV === 'production') {
        // notify us of the error either by sending pass err.message and err.stack to cloud watcher log
    }
    console.log('Server crashing gracefully..');
    console.log(err);
    process.exit(1); //server needs to crash and a process manager will restart it
})