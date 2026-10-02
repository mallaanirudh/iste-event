export const registerSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    additionalProperties: false,
    properties: {
      username: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      password: {
        type: "string",
        minLength: 8,
      },
    },
  },
} as const;

export const loginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    additionalProperties: false,
    properties: {
      username: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      password: {
        type: "string",
        minLength: 1,
      },
    },
  },
} as const;