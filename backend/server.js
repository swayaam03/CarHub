const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your real client ID
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        // You can now use payload info (email, name, etc.) to create/login user in your DB
        res.json({ success: true, user: payload });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});