const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token)
{
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);

}

router.get('/oauth', async (req, res) =>
{
    const code = req.query.code;
    console.log(code);
    try {
        const redirectUrl = 'http://localhost:5000/response/oauth';
        const client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );  
        const googleResponse = await client.getToken(code);
        await client.setCredentials(googleResponse.tokens);
        console.log('Token set!');

        const user = client.credentials;
        console.log('credentials',user);

        await getUserData(user.access_token);

        res.json({msg:'Success'});
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;