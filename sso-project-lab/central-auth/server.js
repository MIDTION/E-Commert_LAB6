const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const radius = require('radius');
const dgram = require('dgram');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
const RADIUS_HOST = process.env.RADIUS_HOST || 'localhost';
const RADIUS_SECRET = process.env.RADIUS_SECRET || 'testing123';
const JWT_SECRET = process.env.JWT_SECRET || 'kmitl_chumphon_sso_secret_key';

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(`[Central-Auth] Login attempt for user: ${username}`);

    if (!username || !password) {
        return res.status(400).json({ detail: "Username and password are required" });
    }

    try {
        // Prepare RADIUS packet
        const packet = {
            code: "Access-Request",
            secret: RADIUS_SECRET,
            identifier: Math.floor(Math.random() * 255),
            attributes: [
                ['User-Name', username],
                ['User-Password', password]
            ]
        };

        const encoded = radius.encode(packet);
        const client = dgram.createSocket("udp4");
        let responded = false;

        const timer = setTimeout(() => {
            if (!responded) {
                responded = true;
                client.close();
                console.error("[Central-Auth] RADIUS Request timed out");
                return res.status(504).json({ detail: "RADIUS server timeout" });
            }
        }, 3000);

        client.on('message', (msg, rinfo) => {
            if (responded) return;
            responded = true;
            clearTimeout(timer);

            try {
                const response = radius.decode({ packet: msg, secret: RADIUS_SECRET });
                client.close();

                console.log(`[Central-Auth] RADIUS Response Code: ${response.code}`);

                if (response.code === 'Access-Accept') {
                    const role = username.includes('admin') ? 'admin' : 'customer';

                    const token = jwt.sign(
                        { sub: username, role: role },
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    return res.json({
                        access_token: token,
                        token_type: "bearer"
                    });
                } else {
                    return res.status(401).json({ detail: "Incorrect username or password" });
                }
            } catch (decodeErr) {
                console.error("[Central-Auth] RADIUS decode error:", decodeErr);
                return res.status(500).json({ detail: "RADIUS decode error" });
            }
        });

        client.on('error', (err) => {
            if (responded) return;
            responded = true;
            clearTimeout(timer);
            client.close();
            console.error("[Central-Auth] Socket Error:", err);
            return res.status(500).json({ detail: "Internal Auth Server Error" });
        });

        // Send the RADIUS request
        client.send(encoded, 0, encoded.length, 1812, RADIUS_HOST, (err) => {
            if (err) {
                if (responded) return;
                responded = true;
                clearTimeout(timer);
                client.close();
                console.error("[Central-Auth] RADIUS Send Error:", err);
                return res.status(500).json({ detail: "Internal Auth Server Error" });
            }
            console.log(`[Central-Auth] Sent RADIUS packet to ${RADIUS_HOST}:1812`);
        });
    } catch (err) {
        console.error("[Central-Auth] Error encoding packet:", err);
        return res.status(500).json({ detail: "Error encoding RADIUS packet" });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Central Auth Server running on port ${PORT}`);
});
