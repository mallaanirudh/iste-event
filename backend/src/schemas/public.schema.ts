export const megaEventParamsSchema = {
  params: {
    type: "object",
    required: ["megaEventId"],
    additionalProperties: false,
    properties: {
      megaEventId: {
        type: "string",
        format: "uuid",
      },
    },
  },
} as const;

export const eventParamsSchema = {
  params: {
    type: "object",
    required: ["eventId"],
    additionalProperties: false,
    properties: {
      eventId: {
        type: "string",
        format: "uuid",
      },
    },
  },
} as const;

export const roundParamsSchema = {
  params: {
    type: "object",
    required: ["roundId"],
    additionalProperties: false,
    properties: {
      roundId: {
        type: "string",
        format: "uuid",
      },
    },
  },
} as const;