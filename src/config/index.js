const {
  NAME,
  EMAIL,
  PASSWORD,
  DATABASE_URL,
  PORT,
  AUTH_KEY,
  EMAIL_USER,
  EMAIL_PASS,
  TWILIO_KEY,
  TWILIO_TOKEN,
} = process?.env;

export const config = {
  adminCredentials: { email: EMAIL, pass: PASSWORD, name: NAME },
  twilio: { key: TWILIO_KEY, token: TWILIO_TOKEN },
  nodemailer: { email: EMAIL_PASS, pass: EMAIL_PASS },
  secretKey: AUTH_KEY,
  port: PORT,
  dbUrl: DATABASE_URL,
};
