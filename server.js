import express from 'express';
import config from './libs/config.js';
import connect from './libs/db.js';
import User from './models/user.js';

const server = express();
config(server);
await connect();

server.post('/register', 
    // validation(registrationRules), // would be proper to do this, but we're doing a simple example
    async (req, res) => {
        try {
            const user = await User.register(req.body);
            res.json({ 
                _id: user.id,
                username: user.username,
                // password: user.password // NEVER do this in production
            });
            // console.log(req.body); // shows a hash for password
        } catch (error) {
            res.status(400);
            res.json({ error: error.message })
        }
});

// you're kind of creating something, like a session for the user (but we don't use sessions here)
// so we use a POST request when authenticating an user!
server.post('/login', async (req, res) => {
    try {
        

        const success = await User.login(req.body); // returns a boolean
        res.json({ success });
        // console.log(req.body); // actually logs the password, so don't use that
    } catch (err) {
        res.status(400);
        res.json({ error: err.message })
    }
});

server.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource not found 😟" });
});


server.listen(3123, () => {
    console.log("Listening: http://localhost:3123")
});