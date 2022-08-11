import fs from "fs";

type RawData = {
  __typename: "GraphImage" | "GraphVideo";
  display_url: string;
  edge_media_preview_like: {
    count: number;
  };
  edge_media_to_comment: {
    count: number;
  };
  is_video: boolean;
  owner: {
    id: string;
  };
  shortcode: string;
  taken_at_timestamp: number;
  urls: string[];
  video_view_count?: number;
};

export type ProcessedData = {
  id: number;
  type: "image" | "video";
  likeCount: number;
  commentCount: number;
  isVideo: boolean;
  owner: string;
  shortcode: string;
  createdAt: number;
  url: string;
  thumbnailUrl: string;
  videoViewCount?: number;
};

const run = async () => {
  const json_9gag = fs.readFileSync("./scraped/9gag.json");
  const data_9gag = JSON.parse(json_9gag as unknown as string)
    .GraphImages as RawData[];

  const json_barked = fs.readFileSync("./scraped/barked.json");
  const data_barked = JSON.parse(json_barked as unknown as string)
    .GraphImages as RawData[];

  const json_meowed = fs.readFileSync("./scraped/meowed.json");
  const data_meowed = JSON.parse(json_meowed as unknown as string)
    .GraphImages as RawData[];

  const json_voyaged = fs.readFileSync("./scraped/voyaged.json");
  const data_voyaged = JSON.parse(json_voyaged as unknown as string)
    .GraphImages as RawData[];

  console.log("data_9gag: ", data_9gag);
  // process into one

  let processedData: ProcessedData[] = [];
  const ownerMap = {
    "259220806": "9gag",
    "489992346": "barked",
    "504544916": "meowed",
    "6665837458": "voyaged",
  };

  const merged = [
    ...data_9gag,
    ...data_barked,
    ...data_meowed,
    ...data_voyaged,
  ];

  for (let i = 0; i < merged.length; i++) {
    const dp = merged[i];
    processedData.push({
      id: i,
      type: dp.is_video ? "video" : "image",
      isVideo: dp.is_video,
      likeCount: dp.edge_media_preview_like.count,
      commentCount: dp.edge_media_to_comment.count,
      owner: ownerMap[dp.owner.id],
      shortcode: dp.shortcode,
      createdAt: dp.taken_at_timestamp,
      url: dp.urls[0],
      thumbnailUrl: dp.display_url,
      videoViewCount: dp.video_view_count,
    });
  }

  console.log("processedData.length: ", processedData.length);
  const stringifiedProcessedData = JSON.stringify(processedData);
  fs.writeFileSync("./scraped/processed.json", stringifiedProcessedData);
};

run();
