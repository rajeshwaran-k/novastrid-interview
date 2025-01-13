## Tasks:

- User Registration - Completed
- Login API (Token Generation) - Completed
- Chat Import via Excel Sheet - Partially Completed (Validating data on upload is pending)

## Setting up

- After clonning the application run

```
npm i

```

- create .env and add following values with your DB credentials,

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
```

- Execute follwing command to run migartion

```

npx mikro-orm migration:up

```

- Start the application by following command

```

npm run start:dev

```

- Application will be running in port 3000
- Import `postman-sample-request.json` into your Postman application. You will be able to see sample requests for login and signup.
- Use `http://localhost:3000/auth/chat/bulkupload` to upload excel sheet. You can also find a `sample-sheet.xlsx` in this repo. Use key name as `file`.

> [!NOTE]
> The value for `Sender Email` in excel should be a registered user.

```

```
