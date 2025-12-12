const jwtSecret = process.env.JWT_SECRET||"Sahnawaz@123";

if (!jwtSecret) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

export const JWT_SECRET: string = jwtSecret;
