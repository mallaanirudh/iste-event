export const createRoundSchema = {
  body: {
    type: "object",
    required: ["roundNumber", "name"],
    additionalProperties: false,
    properties: {
      roundNumber: {
        type: "integer",
        minimum: 1,
      },
      name: {
        type: "string",
        minLength: 1,
        maxLength: 150,
      },
      description: {
        type: "string",
        maxLength: 5000,
      },
      maxPoints: {
        type: "integer",
        minimum: 0,
      },
    },
  },
} as const;

export const updateRoundSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: {
      roundNumber: {
        type: "integer",
        minimum: 1,
      },
      name: {
        type: "string",
        minLength: 1,
        maxLength: 150,
      },
      description: {
        type: "string",
        maxLength: 5000,
      },
      maxPoints: {
        type: "integer",
        minimum: 0,
      },
    },
  },
} as const;