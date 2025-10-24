# EStoreNg20

A modern e-commerce application built with Angular 20 and modern web technologies.

## Tech Stack

### Core Framework
- **Angular 20.3.0** - Modern web framework
- **TypeScript 5.9.2** - Type-safe JavaScript

### UI & Styling
- **Angular Material 20.2.8** - Material Design components
- **Angular CDK 20.2.8** - Component development kit
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing

### State Management
- **NgRx Signals 20.1.0** - Reactive state management
- **Immer 10.1.3** - Immutable state updates

### Development Tools
- **Angular CLI 20.3.5** - Development and build tools
- **Karma & Jasmine** - Unit testing framework
- **Prettier** - Code formatting

### Runtime
- **RxJS 7.8.0** - Reactive programming library

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Docker Setup

This project includes Docker configuration for both development and production environments.

### Quick Start

#### Production Build
```bash
cd docker
docker-compose up --build
```

#### Development Mode
```bash
cd docker
docker-compose -f docker-compose.dev.yml up --build
```

### Access Points
- **Production**: http://localhost
- **Development**: http://localhost:4200

### Docker Commands

#### Container Management
```bash
cd docker

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

#### Development Commands
```bash
cd docker

# Install new dependencies
docker-compose -f docker-compose.dev.yml exec web-app npm install <package>

# Run tests
docker-compose -f docker-compose.dev.yml exec web-app npm test

# Build for production
docker-compose -f docker-compose.dev.yml exec web-app npx ng build
```

### Docker Features
- Multi-stage build for optimized production images
- Nginx with gzip compression and caching for production
- Hot reload for development
- Health checks for monitoring
- Security headers and optimizations

For detailed Docker documentation, see [docker/DOCKER.md](docker/DOCKER.md).

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
