import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode"; // ✅ Correct


export const requiresAuth = function (request) {
    const decoded = jwtDecode(token);

  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = decoded(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET
  );
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");