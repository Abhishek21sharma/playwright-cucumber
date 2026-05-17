import { secureHeapUsed } from "crypto";
import fs from "fs/promises";
import path from "path";
import Ajv from "ajv";
import { APIResponse } from "@playwright/test";

const SCHEMA_BASE_PATH = "./schema-validation";
const ajv = new Ajv({ allErrors: true });

async function loadSchema(schemaPath: string) {
  try {
    const schemaContent = await fs.readFile(schemaPath, "utf-8");
    return JSON.parse(schemaContent);
  } catch (error) {
    throw new Error(`Failed to read the schema File: ${error}`);
  }
}

export async function validateSchema(
  dirName: string,
  fileName: string,
  response: APIResponse,
) {
  const schemaPath = path.join(
    SCHEMA_BASE_PATH,
    dirName,
    `${fileName}_schema.json`,
  );

  const schema = await loadSchema(schemaPath);
  console.log(schema);

  //now the validations here..
  //use the package : ajv schema validator
  //npm i ajv

  //1. comiple the schema..
  const validate = ajv.compile(schema);

  //validate the response body with above
  //here data is api reponse

  const valid = validate(response);
  if (!valid) console.log(validate.errors);
}
