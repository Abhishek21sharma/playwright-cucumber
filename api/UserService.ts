//To prioritize "Shift Left," wrap Playwright’s request object in a controller or "Service" class. This abstracts the HTTP logic and enforces type safety on every call.

import { APIRequestContext, expect } from "@playwright/test";
import { User, CreateUserRequest } from "../modals/Users";

export class UserService {
  //this constructor will also create a private readonly field in this class
  constructor(private request: APIRequestContext) {}

  async createUser(payload: CreateUserRequest): Promise<User> {
    const response = await this.request.post("/api/users", {
      data: payload,
    });

    expect(response.ok()).toBeTruthy();

    // Casting the response ensures the rest of the test knows the object shape
    return response.json() as Promise<User>;
  }
}
