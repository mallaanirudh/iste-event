export const createTeamSchema = {
  body: {
    type: "object",
    required: ["megaEventId", "teamCode"],
    additionalProperties: false,
    properties: {
      megaEventId: {
        type: "string",
        format: "uuid",
      },
      teamCode: {
        type: "string",
        minLength: 1,
        maxLength: 30,
      },
    },
  },
} as const;

export const updateTeamSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: {
      teamCode: {
        type: "string",
        minLength: 1,
        maxLength: 30,
      },
    },
  },
} as const;

export const addTeamMemberSchema = {
  body: {
    type: "object",
    required: ["participantId"],
    additionalProperties: false,
    properties: {
      participantId: {
        type: "string",
        format: "uuid",
      },
    },
  },
} as const;