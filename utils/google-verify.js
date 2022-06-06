require("dotenv").config(); // environments

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_ID);
async function googlVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];

  const { name, email, picture } = payload;
  console.log(payload);
  console.log('google-verify')
  return { name, email, picture };
}

module.exports = {
  googlVerify,
};
