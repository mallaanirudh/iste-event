export const getAuditLogsSchema = {
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
      action: {
        type: "string",
        maxLength: 50,
      },
      entityType: {
        type: "string",
        maxLength: 50,
      },
      entityId: {
        type: "string",
        format: "uuid",
      },
      actorId: {
        type: "string",
        format: "uuid",
      },
    },
  },
} as const;