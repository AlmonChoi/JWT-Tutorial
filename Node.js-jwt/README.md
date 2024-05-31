# JWT_Node.js
JWT Authentication in Node.js

When you have API resource that need to protect, decide on the type of authentication to be implemented. Common options include username/password with cookie/session key, or token-based authentication (e.g., JWT).

[JSON Web Token (JWT)](https://jwt.io/introduction) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

This is sample Node.JS backend application implmeented both API and HTML page response based on request URL path

## Create the back-end API using Node.JS and Express.JS

### 1. Set Up Your Node.js Project:
Create a new Node.js project or use an existing one. You can initialize a new project using npm or yarn:
```
npm init
```
### 2. Install Required Packages:
```
npm install express nodemon 
npm install mongoose validator jsonwebtoken bcrypt cookie-parser
```
### 3. Create User Model
Define a user model to store user data in MongoDB using Mongoose:
- ./models/account.js

### 4. Create Routes and Controllers:
Set up routes and controllers for user creation and login authentication
- ./routes/auth.js

### 5. Secure Routes and Authentication Middleware
Implement middleware to secure routes which require token access. Use middleware function to verify JWT tokens in HTTP header/Cookies
- ./routes/secure.js
- ./routes/middleware/authMiddleware.js

## Create HTML page and Javascripts

- ./public/index.html for create and login 
- ./public/404.html cover unknown URL request
- ./public/javascript/script.js on button click event submit API request using AJAX
- ./secure/welcome.html - Secured page example

## Start up MongoDB and MongoExpress
```
docker-compose up -d
```

## Run Your Application in development mode
```
npm run dev
```

## Use [Postman](https://www.postman.com/) to test API
set 'Post' : 'localhost:1111/auth/create'. Add body, click 'Beautify' and Send. Expect return "message": "User created" or "User creation faile"
```
body raw
    {
        "email": "hello@test.com",
        "password": "test"
    }
```
set 'Post' : 'localhost:1111/auth/login'. Add body, click 'Beautify' and Send. Expect return "token": "eyJhbGciOiJIUzI1NiIsInR5c......." OR "error": "Authentication failed" 
```
body raw
    {
        "email": "hello@test.com",
        "password": "test"
    }
```

> **Note**
> Use [jwt.io](http://jwt.io) to vertify the token validation

set 'GET' : 'localhost:1111/secure/api'. Add Header and Send. Expect return "message": "Secure route accessed by xxxx" OR  "error": "Invalid jwt token" if token not matched or expired
```
Headers
    "Authorization": "eyJhbGciOiJIUzI1NiIsIn......"
```

> **Note**
>The token signed 'userId: user._id' which '_id' is the mongodb key.

## Use Chrome to test
- Acccess http://localhost:1111/
- Enter email domain and passwsord, then click on 'Create'
- Access MongoExpress http://localhost:8081 and check database and user document created
\
- Access http://localhost:1111/ 
- Enter email domain and passwsord, then click on 'Login'
- Open Chrome inspect, goto 'Application' and 'Cookies', check the token cookies created
\
- Access http://localhost:1111/secure/html
- secure Welcome page displayed

