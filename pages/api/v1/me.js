import auth0 from "@/utils/auth0";
const me = async (req, res) => {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.log("Error", error.message);
    res.status(error.status || 500).end(error.message);
  }
};
export default me;
