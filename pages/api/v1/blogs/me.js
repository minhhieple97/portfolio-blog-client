import BlogApi from "lib/api/blog";
import auth0 from "utils/auth0";
export default async function getUserBlogs(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const json = await new BlogApi(accessToken).getByUser();
    return res.json(json.data);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
}
