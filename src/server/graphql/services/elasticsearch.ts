import { Client } from "@elastic/elasticsearch";

export const elasticsearchClient = new Client({
  cloud: {
    id: "ig_ranked_feed:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbSQ0MTZmMmI2MGNhZjc0ZDc5YTlkNDFjOGNiMjdlNzE4MCRkNTBjOWNjYzMzOGM0YjVjOWE0MmMwMTEwZDljZWFhOQ==",
  },
  auth: {
    username: "elastic",
    password: "xWCFNGgqrmIT1IPsteWHlUxI",
  },
});