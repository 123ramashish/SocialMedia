import swaggerJSDoc from "swagger-jsdoc";

// Define Swagger options
const options = {
  // Swagger definition
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      description: "API for Social Media application",
      title: "Social Media API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  // Define paths and operations
  apis: [
    "./src/features/comment/routes/*.js",
    "./src/features/user/routes/*.js",
    "./src/features/post/routes/*.js",
    "./src/features/like/routes/*.js",
    "./src/features/friend/routes/*.js",
    "./src/features/otp/routes/*.js",
  ],
};

// Generate Swagger documentation
export default swaggerJSDoc(options);
