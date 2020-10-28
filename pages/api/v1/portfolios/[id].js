import PortfolioApi from "@/lib/api/portfolio";
import auth0 from "@/utils/auth0";
export default async function handlePortfolio(req, res) {
  try {
    if (req.method === "PATCH") {
      const { accessToken } = await auth0.getSession(req);
      const json = await new PortfolioApi(accessToken).update(
        req.query.id,
        req.body
      );
      return res.status(200).json(json.data);
    }
    if (req.method === "GET") {
      const json = await new PortfolioApi().getById(req.query.id);
      return res.status(200).json(json.data);
    }
    if (req.method === "DELETE") {
      const { accessToken } = await auth0.getSession(req);
      const json = await new PortfolioApi(accessToken).delete(req.query.id);
      return res.status(200).json(json.data);
    }
  } catch (error) {
    console.log(
      "Error portfolio id:",
      (error && error.response && error.response.data) || error.message
    );
    return res.status(400).json(error.response.data);
  }
}
