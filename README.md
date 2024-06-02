# JWT Authentication in Node.js

When you have API resource that need to protect, decide on the type of authentication to be implemented. Common options include username/password with cookie/session key, or token-based authentication (e.g., JWT).

[JSON Web Token (JWT)](https://jwt.io/introduction) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

This repo has the following sample implementation using approach

## [Using Node.js + Express](./Node.js-Express)
- Bcakend Express as API server for authentication and issue JWT token
- Frontend HTML web page with JavaScript AJAX request
- MongoDB for store user accounts. Password-hashing with Bcrypt

## [Using Express + React.js](./React-Hookform)
- Bcakend Express as API server for authentication and issue JWT token
- Frontend using React (Hoot-form, Redux-toolkit and Redux-Persist)
- MongoDB for store user accounts. Password-hashing with Bcrypt

## [Using Next.js Framework](./Next.js-Router)
- Backend NEXT.js implement NEXT Router as API server for authentication and issue JWT token
- Frontend NEXT.js using React (to be implemented)
- MongoDB (recplica set) for store user accounts. Password-hashing with Bcrypt

## [Using Next.js + Auth.js](./Next.js-Auth)
- Backend NEXT.js implemented server side authentication using `Auth.js` `5.0.0-beta.4` and issue session token
- Frontend NEXT.js side + client pages
- MongoDB (recplica set) for store user accounts
