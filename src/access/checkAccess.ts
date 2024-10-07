import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 权限校验
 * @param loginUser
 * @param needAccess
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = AccessEnum.NOT_LOGIN,
): boolean => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  if (needAccess === ACCESS_ENUM.USER) {
    return loginUserAccess !== ACCESS_ENUM.NOT_LOGIN;
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    return loginUserAccess === ACCESS_ENUM.ADMIN;
  }
  return true;
};
export default checkAccess;
