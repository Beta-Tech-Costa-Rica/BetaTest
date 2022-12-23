# Awesome Project Build with TypeORM

Steps to run this project:

1. Open the cmd and go to the api folder
2. Run `npm install` command
3. Setup database settings inside `dataSource.ts` file
4. Create .env file in api folder

Into [.env](.env) paste the following code
```env
ACCESS_TOKEN_SECRET=f3e3aa3125f5ca484b6f757f819397313b76af915f68559fca2243e4d6ed33a61a386fe4b3adfb70f928925e7405be85c5f1d4e07e9c3bcc0e50f65082eda1bf
```

5. Make sure the docker image with postgreSQL database is running with `docker ps` command
6. Run `npm start` or `npm run dev` command to start the server
7. API documentation can be found at [api-swagger.yaml](api-swagger.yaml)