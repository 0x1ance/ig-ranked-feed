import DataStore from '../../../scraped/processed.json'
import { getPosts } from './../test-callers/getPosts';

describe("POST QUERIES: UNIT TEST - posts", () => {
  it("posts: Should return correct number of post corresponding to first input", async () => {

    const result = await getPosts({
      input: { first: 2 },
    });

    const { totalCount, edges, pageInfo } = result.data!.posts;

    expect(totalCount).toEqual(DataStore.length);
    expect(edges.length).toEqual(2);
    expect(pageInfo.hasNextPage).toBeTruthy();
    expect(pageInfo.hasPreviousPage).toBeFalsy();
    //@ts-ignore
  }, 20000);

  it("posts: Should return correct number of post corresponding to last input", async () => {
    const result = await getPosts({
      input: { last: 3 },
    });

    const { totalCount, edges, pageInfo } = result.data!.posts;
    expect(totalCount).toEqual(DataStore.length);
    expect(edges.length).toEqual(3);
    expect(pageInfo.hasPreviousPage).toBeTruthy();
    expect(pageInfo.hasNextPage).toBeFalsy();
    //@ts-ignore
  }, 20000);

  it("posts: Should support forward pagination to next page", async () => {
    const firstResult = await getPosts({
      input: { first: 2 },
    });

    const firstResultData = firstResult.data!.posts;

    const secondResult = await getPosts({
      input: { first: 2, after: firstResultData.pageInfo.endCursor },

    });

    const { totalCount, edges, pageInfo } = secondResult.data!.posts;

    expect(totalCount).toEqual(DataStore.length);
    expect(edges.length).toEqual(2);
    expect(pageInfo.hasNextPage).toBeTruthy();
    expect(edges[0].cursor).not.toBe(firstResultData.edges[0].cursor);
    //@ts-ignore
  }, 20000);

  it("posts: Should support backward pagination to next page", async () => {
    const firstResult = await getPosts({
      input: { last: 2 },
    });

    const firstResultData = firstResult.data!.posts;

    const secondResult = await getPosts({
      input: { last: 2, before: firstResultData.pageInfo.startCursor },
    });

    const { totalCount, edges, pageInfo } = secondResult.data!.posts;

    expect(totalCount).toEqual(DataStore.length);
    expect(edges.length).toEqual(2);
    expect(pageInfo.hasPreviousPage).toBeTruthy();
    expect(edges[0].cursor).not.toBe(firstResultData.edges[0].cursor);
    //@ts-ignore
  }, 20000);

  it("posts: Should throw error if user input both first and last field", async () => {
    const result = await getPosts({
      input: { last: 3, first: 1 },
    });
    const errorMessage = result.errors?.map((e) => e.message);
    expect(errorMessage).toMatchInlineSnapshot(`
      Array [
        "Argument Validation Error",
      ]
    `);
  });
  it("posts: Should throw error if user input neither first nor last field", async () => {
    const result = await getPosts({
      input: {},
    });
    const errorMessage = result.errors?.map((e) => e.message);
    expect(errorMessage).toMatchInlineSnapshot(`
      Array [
        "Invalid Input",
      ]
    `);
  });
});
