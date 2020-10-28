import PortfolioApi from "@/lib/api/portfolio";
import auth0 from "@/utils/auth0";
export default async function createPortfolio(req, res) {
  try {
    const data = req.body;
    const { accessToken } = await auth0.getSession(req);
    const result = await new PortfolioApi(accessToken).create(data);
    return res.status(200).json({ ...result.data });
  } catch (error) {
    console.log("Error create portfolio", error.response);
    return res.status(error.status || 422).json(error.response.data);
  }
}
