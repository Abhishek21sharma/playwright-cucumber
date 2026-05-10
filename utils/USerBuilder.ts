//Builder pattern is more popular than facotory pattern
//it goes with Firxtures and thus suites best for modern solutions
//IMPORTANT - use liberary called : 'Fishery' , this will generate the builder class automatically
//by just looking at the Interface, this is more popular for large scale builders

import { CreateUserRequest } from "../modals/Users";
import { faker } from "@faker-js/faker";

//pro tip to create users etc random::
userNAME: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export class UserBuilder {
  //// Initialize with default valid data
  private readonly user: CreateUserRequest = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    role: "admin",
  };

  //return type is class itself.. this is called as 'Fluent API Approach'
  withUserName(username: string): this {
    this.user.username = username;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  asAdmin(): this {
    this.user.role = "admin";
    return this;
  }

  // The final step to retrieve the data
  build(): CreateUserRequest {
    return this.user;
  }
}
