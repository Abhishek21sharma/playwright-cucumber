//BEST APPROACH ISTO CREATE FIXTURE TO HANDLE THIS CONDITION

//You create a dedicated factory utility that returns a valid object based on your Interfaces. This separates data generation from test logic.

import { CreateUserRequest } from "../modals/Users";
import { faker } from "@faker-js/faker"; // Popular library for dynamic data

export const createUserPayload = (
  overrides?: Partial<CreateUserRequest>,
): CreateUserRequest => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    role: "user",
    ...overrides, // Allows you to customize specific fields
  };
};
