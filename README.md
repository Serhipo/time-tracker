# Time Tracker

This is a simple API for a time tracker application. The API allows you to create blocks of time for users and generate reports for the current month.

**Note:** It's also worth noting that it's the beginning of the month, so when generating the data, only a small percentage of the created blocks will be included in the report.

## Development

Install project dependencies with Yarn: `$ yarn`

### Run API

```sh
$ yarn api:start:dev
```

**Note:** When you run first time, you will need to copy template .env file:

```sh
$ cp packages/api/.env.template packages/api/.env
$ cp packages/api/docker.env.template packages/api/docker.env
```

### Build and run in Docker

Build container and start API dependencies:

```sh
$ docker-compose build
$ docker-compose run start_dependencies
```

Run API: `$ docker-compose up api`

**Note:** When you run first time, you will need to copy template .env file:

```sh
$ cp packages/api/docker.env.template packages/api/docker.env
```

### Run test

```sh
$ yarn test
```

## Linting

Project uses ESLint, stylelint and commitlint:

```sh
$ yarn lint
```

Format code with Prettier:

```sh
$ yarn prettier
```

## Follow up questions

> If you were to extend to the project to add authentication and improved security, at a high level how would you do it?

I have experience working with AWS Cognito, Auth0, and Firebase Authentication. These are great tools that allow you to implement a reliable authentication process. Since we discussed during the call that you use the Google Cloud stack, in your case, Firebase Authentication would be a suitable choice. However, I firmly believe that the tool should be chosen based on the specific needs of the application. For the simplest applications, JWT authentication is suitable. For more complex cases, such as the need to implement Single Sign-On (SSO), Auth0 is an excellent choice.

To increase overall security, I would also implement the following:

Implement HTTPS by using SSL/TLS certificates to encrypt communication between the client and the server.
Use CORS (Cross-Origin Resource Sharing) to restrict the domains that can access the API.
Implement rate limiting to prevent abuse and DDoS attacks.

> If this was a production server, how or with what tools would you monitor the state of the server and errors encountered?

A lot depends on the platform where the application will be deployed. For example, on AWS, you can use CloudWatch for logs. You can also configure a Load Balancer for health checks of instances and redirect all requests to a healthy instance if one of the instances fails. In this case, the end user will not even know that something happened.

For applications deployed on Google Cloud, you can use Google Cloud Logging and Google Cloud Monitoring (formerly Stackdriver) for log management, analysis, and monitoring. In addition, you can configure Google Cloud Load Balancing to distribute incoming traffic across multiple instances, ensuring that the application remains responsive even if some instances fail.

It is also extremely useful to add tools such as Sentry, New Relic, and LogRocket, depending on the needs of the application. In my previous project, we used Sentry in combination with Slack notifications - this allowed us to react promptly to all errors that occurred in the application

> Your API ends up being highly successful and getting 10 million requests daily. What would you do to improve scalability to handle those loads? Provide a high level explanation, no need to delve into implementation details.

To improve scalability for handling 10 million requests daily, I would consider the following high-level strategies:

Use load balancing to distribute the load across multiple servers, ensuring that no single server is overwhelmed with requests.
Implement horizontal scaling by adding more servers to the system as needed, which can be done automatically using auto-scaling groups in cloud platforms like AWS, Google Cloud, or Azure.
Optimize database performance with indexing, caching.
Implement microservices architecture to break the application into smaller, more manageable services that can be independently scaled and deployed.
Utilize serverless technologies like AWS Lambda or Google Cloud Functions to automatically scale and handle requests without the need to manage server infrastructure.

## P.S

There are several aspects that would be worth handling in a real application, but they were deliberately omitted in this test, for example:

It would be possible to improve the generation of blocks so that they do not overlap, but since this was not part of the original task, I decided not to complicate the test with unnecessary logic.

It is also worth handling cases where a report is requested for a user who does not exist in the database. However, since we do not have a list of all users and cannot fully determine if such a user exists in our system or simply does not have any tracked time, I introduced a condition that such a user exists but simply does not have any records yet. In reality, after coordinating with the FE/mobile team, in such cases, I would return an appropriate error
