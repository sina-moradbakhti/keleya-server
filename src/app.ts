import express from 'express';
import bodyParser from 'body-parser';
import { jwtGenerateToken } from './shared/globals/jwt-functions';
import { authenticateToken } from './shared/globals/middlewares';
import { DatabaseConnectionfailed, DatabaseConnectionSuccess } from './shared/globals/responses'
import { connect } from './shared/globals/db.initialize';
//const token_secret = require('crypto').randomBytes(64).toString('hex');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Keleya Server</h1>');
});

app.post('/api/users', (req, res) => {
    var token = jwtGenerateToken({ email: req.body.email });
    res.json({ status: 200, token: token });
});

app.patch('/api/users', authenticateToken, (req, res) => {
    res.json({
        status: 200,
        message: 'Success'
    });
});

app.post('/api/users/auth', async (req, res) => {
    let connection = await connect();
    if (connection) {
        res.status(DatabaseConnectionSuccess.status).json(DatabaseConnectionSuccess.output);
    }else{
        res.status(DatabaseConnectionfailed.status).json(DatabaseConnectionfailed.output);
    }
});

app.listen(port, () => {
    return console.log(`Keleya server is listening on ${port}`);
});