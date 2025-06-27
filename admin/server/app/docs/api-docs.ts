export const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Family Day Admin API",
    version: "1.0.0",
    description: "API for the Family Day Admin System",
  },
  paths: {
    "/booth": {
      get: {
        summary: "Get all booths",
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
      },
      post: {
        summary: "Create a new booth",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  booth_name: { type: "string" }
                },
                required: ["booth_name"]
              }
            }
          }
        },
        responses: {
          "200": { description: "Booth created successfully" },
          "500": { description: "Failed to create booth" }
        }
      },
      put: {
        summary: "Update booth status",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  booth_id: { type: "integer" },
                  status: { type: "boolean" }
                },
                required: ["booth_id", "status"]
              }
            }
          }
        },
        responses: {
          "200": { description: "Booth updated successfully" },
          "500": { description: "Internal server error" }
        }
      }
    },

    // ✅ Correctly merged dashboard GET and POST
    "/dashboard": {
      get: {
        summary: "Get dashboard chart data",
        responses: {
          "200": {
            description: "Chart data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    labels: { type: "array", items: { type: "string" } },
                    data: { type: "array", items: { type: "number" } }
                  }
                }
              }
            }
          },
          "500": {
            description: "Failed to retrieve chart data"
          }
        }
      },
      post: {
        summary: "Get analytics data",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  from: { type: "string", format: "date" },
                  to: { type: "string", format: "date" }
                },
                required: ["from", "to"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Analytics data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: true
                }
              }
            }
          },
          "500": {
            description: "Failed to retrieve analytics data"
          }
        }
      }
    },

    "/export": {
      get: {
        summary: "Export data to Excel",
        responses: {
          "200": {
            description: "Excel file exported successfully",
            content: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                schema: {
                  type: "string",
                  format: "binary"
                }
              }
            }
          },
          "500": {
            description: "Failed to export data"
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
