const url = "https://notes-api.dicoding.dev/v2";

export const BaseQuery = {
  baseUrl: url,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
};

export default BaseQuery;
