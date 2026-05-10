//Note: TO start with we should not be writing interfaces for APIs which are already LIVE means
//whose swagger is available
//Use a tool like openapi-typescript.
//It consumes your API's Swagger JSON and generates the TypeScript types automatically.

//On top of that schema validation is must using ZOD

//assuming this is a dev schema / interface they have designed to handle an API request..
//instead of writing generic response object in tests, we will use this directly in our test
//scripts , so that any changes to it , will fai our tests too in compilation state itslef
//rather than last stage
//this is truly shift left approach
type userRole = "admin" | "guest" | "user";

//Single Source of Truth:
// If the development team adds a phoneNumber: string
//  field to the User interface, your CreateUserRequest updates automatically.

export interface User {
  id: string;
  username: string;
  email: string;
  role: userRole;
}

//These are all UTILITY TYPES . likes OMit, PICk etc

// Use Types for request payloads or utility unions

//this means is::
// "I want everything in User EXCEPT the id" (it creates a copy of this interface)
//here just id is optional
export type CreateUserRequest = Omit<User, "id">;

//opposite to this is Pick<T,k> --> which means that provide the "k"(key) value from T interface
//as everything else is optional..
type UserCredentialsWithJustID = Pick<User, "email">;

//more utility types::
//utility types are: These are built-in functions that transform existing types
//<Partial <T> : This is very important, it makes every property in the interface as 'Optional'
//it will make above interface as::
//// { id?: number; username?: string; email?: string; }
//look it has  added optional ? after each  key

//Record<K,V> --> it is equivalent to MAP in java and it's standard to use this in TS world
//look below how we handled key value with Record and make User as PArtial too

type userType = "adminUser" | "guestUser";
//or we can simply as Record<string, Partial<User>> --> it will accept any userType in this case

const userCache: Record<userType, Partial<User>> = {
  adminUser: { role: "admin", username: "dev_guy", email: "dev@test.com" },
  guestUser: { role: "user", username: "qa_gal", email: "qa@test.com" },
};
