import React from "react";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { RootState } from "@/stores";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLoginPage from "@/app/user/login/page";
import Forbidden from "@/app/forbidden";

// 定义一个类型安全的选择器钩子
const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// 定义 withAuth HOC 的泛型参数
type WithAuthProps<P> = P & { allowedRoles?: string[] };

// 定义 withAuth HOC
export default function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[] = [],
): React.ComponentType<WithAuthProps<P>> {
  // 返回带有认证检查的组件
  return function AuthenticatedComponent(props) {
    const loginUser = useAppSelector((state) => state.loginUser); // 获取用户信息
    const isLogin = loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN; // 检查是否已登录
    const hasAccess = allowedRoles.includes(
      loginUser.userRole ?? ACCESS_ENUM.NOT_LOGIN,
    ); // 检查是否有访问权限
    if (!isLogin) {
      return <UserLoginPage />;
    } else if (allowedRoles.length > 0 && !hasAccess) {
      // 如果有允许的角色列表并且当前用户没有访问权限，重定向到403页面
      return <Forbidden />;
    }
    // 如果已登录且有访问权限，渲染组件
    return <Component {...(props as P)} />;
  };
}
