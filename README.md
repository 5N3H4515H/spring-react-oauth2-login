# Spring Boot React OAuth2 Login 

<img src="preview/preview.gif" alt="Google Oauth Login">

## Prerequisite

You have to make a Google oauth credential first. To do that go to [Google API console](https://console.developers.google.com/projectselector/apis/credentials?pli=1) 

Please make sure that these are added in **Authorized javascript origins** and **Authorized redirect URIs** in the OAuth2 provider.  

![Origin and Redirect URIs](Origin and Redirect URIs.png)

Also, scope `email` and `profile` should be added in your Google project's OAuth2 consent screen.


## Setting up the Backend Server (server)

+ **Create MySQL database**

  ```bash
  mysql> create database spring_react_oauth
  ```

+ **Configure database username and password**

  ```properties
  # server/src/main/resources/application.properties
  spring.datasource.url=jdbc:mysql://localhost:3306/spring_react_oauth?useSSL=false
  spring.datasource.username=<YOUR_DB_USERNAME>
  spring.datasource.password=<YOUR_DB_PASSWORD>
  ```

+ **Specify JWT Secret and OAuth2 Provider ClientId**

  ```yml
  # server/src/main/resources/application.yml
  app:
  # Signing key for HS512 algorithm
  # In http://www.allkeysgenerator.com/ you can generate all kinds of keys
  jwtSecret: v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp
  googleClientId: <GOOGLE_CLIENT_ID>
  ```

+ **Run server**

  ```bash
  mvn spring-boot:run
  ```

## Setting up the Frontend Server (client)

Edit the value of `VITE_APP_GOOGLE_CLIENT_ID` in `react-oauth/.env` to your google client id.

```js
VITE_APP_API_URL="http://localhost:8080"
VITE_APP_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
```

```bash
cd client
npm install && npm run dev
```