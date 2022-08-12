import { relayStylePagination } from "@apollo/client/utilities";

export const typePolicies = {
  Query: {
    fields: {
      posts: relayStylePagination(['filter']),
    },
  },
};
