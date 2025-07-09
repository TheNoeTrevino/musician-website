# Website for musicians

# TODO: 

- Use environment variables for all prefixes 
- Connect cart to the backend
- Cart redirect to the strip url
- Add "coming soon" and "update" section 
  * coming soon below about

## Technologies

### Frontend

Typescript

- React
- Tailwind CSS

### Backend

Java

- Hibernate
- Spring
- Stripe API

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
  export EMAIL_USER="<your gmail>"
  export EMAIL_PW="<gmail app password>"
  
  #Stripe Variables
  export STRIPE_SECRET="<secret key>"
  export STRIPE_PUBLISHABLE="<publishable key>"

  # confirmation
  echo "db url: $DATABASE_URL"
  echo "db user: $DATABASE_USER"
  echo "db pass: $DATABASE_PW"

  echo "email user: $EMAIL_USER"
  echo "email pass: $EMAIL_PW"

  echo "stripe secret: $STRIPE_SECRET"
  echo "stripe publishable: $STRIPE_PUBLISHABLE"
```
2. Run it with this command:
  ``` bash
  source ./env.sh
  ```
3. Make sure to source this before you run anything, in each terminal

### Backend:

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Start the backend continuous compiler:

   ```bash
   ./gradlew --continous build
   ```

3. In another terminal, start the server in the same directory
   ```bash
   ./gradlew bootRun
   ```

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


## notes for docker

1.  Build the docker image

  ``` bash
  docker build -t <project-name> .  
  ```

2.  Verify the image was made
  
  ``` bash
  docker images 
  ```
  
3.  Run the Container
  ``` bash
  docker run -p 8080:8080 my--app     
  ```
