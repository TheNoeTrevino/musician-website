# Website for musicians

## Technologies

### Frontend

Typescript

- React
- Tailwind CSS

### Backend

Java

- Hibernate
- Spring

## How to run

### Environment Variables: 

1. Make a shell script with these variables. I named mine `env.sh` in the home
   directory
  
  ``` bash
  #!/bin/bash
  #Database variables
  export DATABASE_URL="jdbc:postgresql://localhost:5432/<database-name>"
  export DATABASE_USER="<database_user>"
  export DATABASE_PW="<database_pw>"

  #Email variables
  export EMAIL_USER="<yout gmail>"
  export EMAIL_PW="<gmail app password>"

  # confirmation
  echo "db url: $DATABASE_URL"
  echo "db user: $DATABASE_USER"
  echo "db pass: $DATABASE_PW"

  echo "email user: $EMAIL_USER"
  echo "email pass: $EMAIL_PW"
```
2. Run it with this command:
  ``` bash
  source ./env.sh
  ```
3. Make sure to source this before you run the backend.

### Frontend:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the site.

### Backend:

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Start the backend server:

   ```bash
   ./gradlew bootRun
   ```
