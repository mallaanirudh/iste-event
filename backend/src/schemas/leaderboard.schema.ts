export const updateLeaderboardSchema = {
  body: {
    type: "object",
    required: ["entries"],
    additionalProperties: false,
    properties: {
      entries: {
        type: "array",
        items: {
          type: "object",
          required: ["teamId", "points"],
          additionalProperties: false,
          properties: {
            teamId: {
              type: "string",
              format: "uuid",
            },
            rank: {
              type: "integer",
              minimum: 1,
            },
            points: {
              type: "integer",
            },
          },
        },
      },
    },
  },
} as const;