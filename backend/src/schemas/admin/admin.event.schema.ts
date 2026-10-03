export const createEventSchema = {
  body: {
    type: "object",
    required: ["megaEventId", "sigId", "name"],
    additionalProperties: false,
    properties: {
      megaEventId: {
        type: "string",
        format: "uuid",
      },
      sigId: {
        type: "string",
        format: "uuid",
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
    },
  },
} as const;

export const updateEventSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: {
      megaEventId: {
        type: "string",
        format: "uuid",
      },
      sigId: {
        type: "string",
        format: "uuid",
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
    },
  },
} as const;