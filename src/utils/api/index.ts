import axios from "axios";

import config from "../../config";

export const fakeStoreApi = axios.create({
  baseURL: config.API.FAKESTORE_API_URL,
});
