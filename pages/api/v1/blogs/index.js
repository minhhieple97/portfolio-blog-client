import PortfolioApi from "@/lib/api/portfolio";
import auth0 from "@/utils/auth0";
import BlogApi from "lib/api/blog";
export default async function createBlog(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const result = await new BlogApi().getAll();
        return res.status(200).json({ ...result.data });
      }
      case "POST": {
        const data = req.body;
        const { accessToken } = await auth0.getSession(req);
        const result = await new BlogApi(accessToken).create(data);
        return res.status(200).json({ ...result.data });
      }
    }
  } catch (error) {
    console.log("Error create blog", error.response.data.message);
    return res.status(error.status || 422).json(error.response.data);
  }
}
