import DataStore from "../scraped/processed.json";
import { elasticsearchClient } from "../src/server/graphql/services/elasticsearch";

const search = async () => {
  const res = await elasticsearchClient.search({
    index: "posts",
    query: { match_all: {} },
    // sort: [
    //   //@ts-ignore
    //   {
    //     createdAt: { order: "desc", format: "strict_date_optional_time_nanos" },
    //   },
    // ],
    sort: [
      //@ts-ignore
      {
        likeCount: { order: "desc" },
      },
    ],
    from: 0,
    size: 10,
  });
  console.log(
    "res: ",
    res.hits.hits.map((el) => {
      return el._source;
    })
  );
};

search().catch(console.log);
