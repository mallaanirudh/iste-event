export const createMegaEventSchema = {
  body: {
    type: "object",
    required: ["name"],
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 150,
      },
      description: {
        type: "string",
        maxLength: 10000,
      },
      registrationOpenAt: {
        type: "string",
        format: "date-time",
      },
      registrationCloseAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
} as const;

export const updateMegaEventSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 150,
      },
      description: {
        type: "string",
        maxLength: 10000,
      },
      registrationOpenAt: {
        type: "string",
        format: "date-time",
      },
      registrationCloseAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
} as const;