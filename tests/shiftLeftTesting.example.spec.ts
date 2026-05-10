//By utilizing the service and interfaces,
//your test code becomes readable and self-documenting.
//If a developer changes username to loginName in the interface,
//TypeScript will highlight every broken test instantly.

import { test, expect } from "@playwright/test";
import { UserService } from "../api/UserService";
import { UserBuilder } from "../utils/USerBuilder";

test("should create a new admin user", async ({ request }) => {
  const userService = new UserService(request);

  //not passing "id" here
  const newUser = {
    username: "dev_tester",
    email: "test@example.com",
    role: "admin" as const,
  };

  // Fluent API usage
  const adminPayload = new UserBuilder()
    .withUserName("super_admin")
    .asAdmin()
    .build();
  //created the user without ID and we assume ID will be auto-created
  //this is the approach we use to create the data as well at run time.. data builder pattern ?
  const user = await userService.createUser(newUser);

  // Type-safe assertions: 'user.id' is recognized as a number
  expect(user.id).toBeGreaterThan(0);
  expect(user.username).toBe(newUser.username);
});
