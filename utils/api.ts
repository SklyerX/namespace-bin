import axios from "axios";

export function createBinViaApi(
  Title: string,
  Description: string,
  DeleteAfterView: boolean,
  Content: string
) {
  let config = {
    method: "POST",
    url: "http://localhost:3001/v1/bin",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Title,
      Description,
      DeleteAfterView,
      Content,
    }),
  };

  return axios(config);
}
