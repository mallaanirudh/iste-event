export const createSigSchema = {
  body: {
    type: "object",
    required: ["name"],
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
      description: {
        type: "string",
        maxLength: 10000,
      },
    },
  },
} as const;

export const updateSigSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
      description: {
        type: "string",
        maxLength: 10000,
      },
    },
  },
} as const;