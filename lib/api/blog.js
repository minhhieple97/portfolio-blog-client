import axios from "axios";
import BaseApi from "./BaseApi";
class BlogApi extends BaseApi {
  constructor(accessToken = null) {
    super(accessToken, `/blogs`);
  }
  getBySlug(slug) {
    return axios.get(`${this.apiUrl}/s/${slug}`);
  }
}

export default BlogApi;
