<<<<<<< HEAD
## Database Setup

### 1. Creating the Database:

1. Open MySQL Workbench and connect to your server.
2. Click on the `+` icon next to MySQL Connections to create a new schema (database).
3. Provide a name and set the default collation, if necessary. Then click `Apply`.

### 2. Importing the Schema:

1. Connect to your database server in MySQL Workbench.
2. Click on `Server` in the top menu and then choose `Data Import`.
3. Under `Import Options`, select `Import from Self-Contained File` and choose the `parking-app.sql` file.
4. Select the target schema (the one you just created) from the dropdown list.
5. Click on `Start Import`.

## Prerequisites

- Ensure you have [Node. js](https://nodejs.org/) installed.
- Install [Postman](https://www.postman.com/downloads/) for testing the API endpoints.

## Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd node-MySQL-starter
   npm install bcryptjs doteenv express express-jwt jsonwebtoken mysql2

2. **Create .env 
        NODE_ENV=development
        PORT=3000
        DB_HOST=<your-database-host>
        DB_USER=<your-database-user>
        DB_NAME=<your-database-name>
        DB_PASSWORD=<your-database-password>
        JWT_SECRET=<your-jwt-secret>

3.  ** Run Server 
    npm run dev
## use postman for testing

### Login as admin: 
{
    "email": "admin@email",
    "password": "admin123"
}
=======
# parking-app
Sweeft Digital acceleration program. second stage assignment
>>>>>>> origin/main
