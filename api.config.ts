import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const processENV = process.env.TEST_ENV;
const env = processENV || "dev"; //fallback to dev ENV if nothing provided

const config = {
  apiURL: "https://URL-API-NAME:PORT.com/API",
  userEmail: "email@test.com",
  userPassword: "pwd@test",
};

if (env === "qa") {
  //we can update the property of an object..
  ((config.userEmail = "qaEmail@test.com"),
    (config.userPassword = "qaPassword"));
}

if (env === "prod") {
  //using here best practices..
  if (!process.env.PROD_USERNAME || !process.env.PROD_PASSWORD) {
    throw Error("missing PROD credentials");
  }
  config.userEmail = "qaEmail@test.com";
  config.userPassword = "qaPassword";
}

export { config };
