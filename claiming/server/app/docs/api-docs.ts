export const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Family Day Claiming API",
    version: "1.0.0",
    description: "API for the Family Day Claiming System",
  },
  paths: {
    "/booth": {
      get: {
        summary: "Get all booths (optionally filter by active)",
        parameters: [
          {
            name: "filter",
            in: "query",
            schema: { type: "string", enum: ["active"] },
            required: false,
            description: "Filter booths by 'active' status"
          }
        ],
        responses: {
          "200": {
            description: "A list of all booths",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Booth"
                  }
                }
              }
            }
          },
          "500": {
            description: "Failed to fetch booths"
          }
        }
      }
    },

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
                    isActive: { type: "boolean" },
                    guests: { type: "integer" }
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

    "/claim": {
      post: {
        summary: "Claim reward for an employee at a booth",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  employee_id: { type: "string" },
                  booth_id: { type: "integer" }
                },
                required: ["employee_id", "booth_id"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Reward claimed successfully",
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
                    guests: { type: "integer" }
                  }
                }
              }
            }
          },
          "404": {
            description: "Employee, registration, booth not found or already claimed"
          },
          "500": {
            description: "Server error"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Booth: {
        type: "object",
        properties: {
          id: { type: "integer" },
          booth_name: { type: "string" },
          is_active: { type: "boolean" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" }
        }
      }
    }
  }
};
