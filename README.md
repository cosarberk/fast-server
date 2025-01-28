# fast-server
It enables you to effortlessly create a high-performance API server built with Node.js and Express.

FastServer is a lightweight server framework built on top of Express.js, designed to simplify server setup, API management, and WebSocket integration.


### Installition

```sh
npm i node-fast-server

```

### Example Application

```typescript
const server = new FastServer();
server.STARTSERVER();
```

or

```typescript
const server = new FastServer();
server.USE()
server.ACTIVE_CORS()
server.ACTIVE_SHARE_FOLDERS("PUBLIC")
server.LISTEN_API(apislist)
server.ACTIVE_WS()
server.LISTEN()
```

## Features

- **Flexible API Management**: Easily configure and set up APIs with minimal boilerplate.
- **CORS Support**: Built-in CORS support for cross-origin requests.
- **WebSocket Integration**: Integrated WebSocket server for real-time communication.
- **Static File Hosting**: Serve static files with ease.
- **Customizable Configuration**: Flexible server configuration for different environments.

## Usage

### Import and Initialize

Import the `FastServer` class and initialize it with optional APIs and configuration:

```typescript
import { FastServer } from 'node-fast-server';

const apis = [
  [
    { method: "POST", name: "customApi", endpoint: "customApi", controller: customApi.controller },
    { method: "GET", name: "customApi1", endpoint: "customApi1", controller: customApi.controller1 },
  ],
  [
    { method: "GET", name: "customApi3", endpoint: "customApi3", middleware: customApi3.middleware, controller: customApi3.controller }
  ]
];

const config = {
  SERVER_PORT: 4444,
  WS_PORT: 4445,
  SERVER_TYPE: 'Develop',
  PUBLİC_FOLDER_NAME: "FILES",
  PREFIX: "api/v1"
};

const server = new FastServer(apis, config);
server.STARTSERVER();
```

### API Configuration

The APIs are configured using an array of `ApiListType`, where each entry contains API details:

- **method**: HTTP method (e.g., "GET", "POST").
- **name**: Name of the API.
- **endpoint**: URL endpoint for the API.
- **middleware**: (Optional) Middleware for the API.
- **controller**: Controller function to handle requests.

Example:

```typescript
const apis = [
  [
    { method: "POST", name: "customApi", endpoint: "customApi", controller: customApi.controller },
    { method: "GET", name: "customApi1", endpoint: "customApi1", controller: customApi.controller1 },
  ],
  [
    { method: "GET", name: "customApi3", endpoint: "customApi3", middleware: customApi3.middleware, controller: customApi3.controller }
  ]
];
```

### Configuration

The `ServerConfig` object allows customization of the server:

- **SERVER_PORT**: Port for the HTTP server.
- **WS_PORT**: Port for the WebSocket server.
- **SERVER_TYPE**: Server mode (e.g., "Develop").
- **PUBLİC_FOLDER_NAME**: Folder for serving static files.
- **PREFIX**: URL prefix for APIs.

Example:

```typescript
const config = {
  SERVER_PORT: 4444,
  WS_PORT: 4445,
  SERVER_TYPE: 'Develop',
  PUBLİC_FOLDER_NAME: "FILES",
  PREFIX: "api/v1"
};
```

### Methods

1. **STARTSERVER**: Starts the server, activates middleware, and listens for API and WebSocket requests.
2. **USE**: Configures middleware such as `cookieParser` and URL encoding.
3. **ACTIVE_CORS**: Enables CORS.
4. **ACTIVE_WS**: Starts the WebSocket server.
5. **ACTIVE_SHARE_FOLDERS**: Serves static files from the specified folder.
6. **LISTEN_API**: Sets up APIs based on the provided configuration.


## License

This project is licensed under the MIT License.
