# Factorial Metrics Backend Service

This service allows the requester to retrieve the metrics stored in database and to create a new metric. It also includes the basic Auth endpoints (signup and signin).

## Built with
Core dependencies:
- [Express](http://expressjs.com) as web framework for serving HTTP requests.
- [Typescript](https://www.typescriptlang.org/)
- [TSOA](https://github.com/lukeautry/tsoa) for generating routes and OpenAPI.
- [tsyringe](https://github.com/microsoft/tsyringe) Dependency injection framework.
- [https://mongoosejs.com/](https://node-postgres.com/) for interacting with PostgreSQL database.

## How to start the service
You can find the instructions in the main [README](../README.md).

Once started, you can check the OpenAPI at `http://localhost:4000/api/docs`.

### How to develop
This service is organized following a Domain Driven Design philosophy. There are two main domains: `Users` and `Metrics`, and each corresponding domain has its files contained inside the `src/domains` folder. In these folders, we split the logic between the Controller (for managing routes), Service (where our business logic is stored) and Repository (data access layer); and also the corresponding models.

### Testing
Library used for testing is [Jest](https://jestjs.io/), you can run the unit tests with the command `npm run test`. If you want to check the code coverage, a `npm run test:cover` script is also included.

