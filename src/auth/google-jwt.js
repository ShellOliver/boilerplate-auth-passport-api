/**google auth settings */
import { google } from 'googleapis';
const plus = google.plus('v1');
const OAuth2Client = google.auth.OAuth2;
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `http://${process.env.HOST}:${process.env.PORT}/auth/google/callback`
);

export {plus, oauth2Client};