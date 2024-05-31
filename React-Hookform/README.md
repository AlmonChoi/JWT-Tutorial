# JWT Authentication implement using Node.js + Express + React Frontend

This is sample Node.JS + React application 
- Bcakend Express as API server for authentication and issue JWT token
- Frontend using React (Hoot-form, Redux-toolkit and Redux-Persist)
- MongoDB for store user accounts. Password-hashing with Bcrypt

## Create the development server 

### 1. Download both server and frontend folders. Install required components

```
cd server
npm install
```
```
cd frontend
npm install
```

### 2. Start up MongoDB and MongoExpress

```
cd server
docker-compose up -d
```
### 3. Edit JWT secure key in '.env' in server folder

```
NODE_ENV=development
PORT=1111
DB_STRING=mongodb://localhost:27017/jwt
JWT_KEY="This is secure key"
```

### 4 Run in development mode (Sugget to use Visual Studio Code and open two terminals) 

Terminal 1
```
cd server
npm run dev
```

Terminal 2
```
cd frontend
npm run dev
```

## Testng 
- Acccess http://localhost:5173/

### Home Page
![Home](./screen/01.%20Home.jpg)

### Create user
![Create User](./screen/02.%20CreateUser.jpg)
![Check User](./screen/03.%20CheckUser.jpg)

### Login and access to proteected message
![Login](./screen/04.%20Login.jpg)
![Login](./screen/05.%20Login.jpg)
![Protected](./screen/06.%20Protected.jpg)

### Logout
![Logout](./screen/07.%20Logout.jpg)

### Access to protected message without login
![Protected](./screen/08.%20Protected.jpg)
