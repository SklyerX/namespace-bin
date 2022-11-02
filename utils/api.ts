import axios from "axios";

export function createBinViaApi(
  Title: string,
  Description: string,
  DeleteAfterView: boolean,
  Content: string
) {
  let config = {
    method: "POST",
    url: "https://nmb.0110110.repl.co/v1/bin",
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
