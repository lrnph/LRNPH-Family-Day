export const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Family Day Registration API",
    version: "1.0.0",
    description: "API for registering employees for Family Day"
  },
  paths: {
    "/employee/{id}": {
      get: {
        summary: "Get registered employee details by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "The employee ID"
          }
        ],
        responses: {
          "200": {
            description: "Registered employee data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    employeeId: { type: "string" },
                    firstName: { type: "string" },
                    middleName: { type: "string" },
                    lastName: { type: "string" },
                    department: { type: "string" },
                    isActive: { type: "boolean" }
                  }
                }
              }
            }
          },
          "404": {
            description: "Employee not found or not registered"
          },
          "500": {
            description: "Server error"
          }
        }
      }
    },

    "/register": {
      post: {
        summary: "Register an employee for Family Day",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  employee_id: { type: "string" },
                  invited_guests: { type: "integer" }
                },
                required: ["employee_id", "invited_guests"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Employee registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" }
                  }
                }
              }
            }
          },
          "404": {
            description: "Employee not found or already registered"
          },
          "500": {
            description: "Server error"
          }
        }
      }
    }
  }
};
