export const getTallySubmissionsSchema = {
  querystring: {
    type: "object",
    additionalProperties: false,
    properties: {
      page: {
        type: "string",
        pattern: "^[0-9]+$",
      },
      limit: {
        type: "string",
        pattern: "^[0-9]+$",
      },
    },
  },
} as const;