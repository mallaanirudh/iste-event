import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../config/env.js";

export async function getTallySubmissions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = request.query as {
    page?: string;
    limit?: string;
  };

  const page = Number(query.page ?? "1");
  const limit = Math.min(Number(query.limit ?? "50"), 100);

  const url = new URL(
    `https://api.tally.so/forms/${env.TALLY_FORM_ID}/submissions`,
  );

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.TALLY_API_KEY}`,
      "tally-version": "2025-02-01",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    request.log.error(
      {
        status: response.status,
        response: errorText,
      },
      "Tally API request failed",
    );

    return reply.status(502).send({
      error: "Failed to fetch Tally registrations",
    });
  }

  const data = await response.json();

  return reply.send(data);
}