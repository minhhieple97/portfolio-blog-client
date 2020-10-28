import auth0 from "@/utils/auth0";
import BlogApi from "lib/api/blog";
export default async function handleBlog(req, res) {
  try {
    if (req.method === "PATCH") {
      const { accessToken } = await auth0.getSession(req);
      const json = await new BlogApi(accessToken).update(
        req.query.id,
        req.body
      );
      return res.status(200).json(json.data);
    }
    if (req.method === "GET") {
      const json = await new BlogApi().getById(req.query.id);
      return res.status(200).json(json.data);
    }
    if (req.method === "DELETE") {
      const { accessToken } = await auth0.getSession(req);
      const json = await new BlogApi(accessToken).delete(req.query.id);
      return res.status(200).json(json.data);
    }
  } catch (error) {
    console.log(
      "Error blog id:",
      (error && error.response && error.response.data) || error.message
    );
    return res.status(400).json(error.response.data);
  }
}
