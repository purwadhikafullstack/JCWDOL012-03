import { config } from 'dotenv';
import { resolve } from 'path';
import { google } from 'googleapis';

// export const NODE_ENV = process.env.NODE_ENV || 'development';

// const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

// config({ path: resolve(__dirname, `../${envFile}`) });
// config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

config({ path: resolve(__dirname, '../.env') });

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '3306';

export const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/api/auth/google/callback'
);
export const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];




