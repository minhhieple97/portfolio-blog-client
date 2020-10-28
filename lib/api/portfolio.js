import axios from "axios";
import BaseApi from "./BaseApi";
class PortfolioApi extends BaseApi {
  constructor(accessToken = null) {
    super(accessToken, `/portfolios`);
  }
}
export default PortfolioApi;
