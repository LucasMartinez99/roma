import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const AUTH0_DOMAIN = 'https://dev-u35toc0ninmztxbs.us.auth0.com';
const CLIENT_ID = 'rho0EGOb14Xbhl4LRKsxY7qXE0C8suM4';
const CLIENT_SECRET = '8RmI4L3OI3G62MbkDiKZ-WfKo851sCv728z0oytSVgw6dc5owd37KS5c-V3ZqU5u';

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const body = {
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username,
        password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: `${AUTH0_DOMAIN}/api/v2/`,
        scope: 'openid profile email',
        realm: 'Username-Password-Authentication'
    };

    try {
        const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.json(data);
    } catch (error) {
        console.error('Error en el proxy Auth0:', error);
        res.status(500).json({ error: 'Proxy error' });
    }
});

app.listen(3001, () => {
    console.log('Servidor Auth0 Proxy corriendo en http://localhost:3001');
});
