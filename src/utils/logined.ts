import cookies from "js-cookie";

export default function isLogined(): boolean {
  const token = cookies.get("token");
  const tokenType = cookies.get("token_type");
  return !!token && !!tokenType;
}
