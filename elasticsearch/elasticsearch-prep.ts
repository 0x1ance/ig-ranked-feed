import DataStore from "../scraped/processed.json";
import { elasticsearchClient } from "../src/server/graphql/services/elasticsearch";

const prep = async () => {
  try {
    await elasticsearchClient.indices.delete({
      index: "posts",
    });
    await elasticsearchClient.indices.create({
      index: "posts",
      body: {
        mappings: {
          properties: {
            id: { type: "integer" },
            type: { type: "text" },
            likeCount: { type: "integer" },
            commentCount: { type: "integer" },
            isVideo: { type: "boolean" },
            owner: { type: "text" },
            shortcode: { type: "text" },
            createdAt: { type: "date" },
            url: { type: "text" },
            thumbnailUrl: { type: "text" },
            videoViewCount: { type: "integer", null_value: 0 },
          },
        },
      },
    });
  } catch (err) {}

  const dataset = DataStore.map((el, idx) => {
    return {
      ...el,
      createdAt: new Date(el.createdAt * 1000),
    };
  });

  const operations = dataset.flatMap((doc) => [
    { index: { _index: "posts" } },
    doc,
  ]);

  const bulkResponse = await elasticsearchClient.bulk({
    refresh: true,
    operations,
  });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
        });
      }
    });
    console.log(erroredDocuments);
  }

  const count = await elasticsearchClient.count({ index: "posts" });
  console.log("total added post count: ", count);
};

prep().catch(console.log);
