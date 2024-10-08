// import { useSelector } from "react-redux";
// import { RootState } from "@/stores";
// import { usePathname } from "next/navigation";
// import checkAccess from "@/access/checkAccess";
// import Forbidden from "@/app/forbidden";
// import React from "react";
// import AccessEnum from "@/access/accessEnum";
// import { findAllMenuItemByPath } from "../../config/menu";
//
// /**
//  * @deprecated 统一权限校验拦截器  待废弃 不如高阶组件灵活
//  * @param children
//  * @constructor
//  */
// const AccessLayout: React.FC<
//   Readonly<{
//     children: React.ReactNode;
//   }>
// > = ({ children }) => {
//   const pathname = usePathname();
//   const loginUser = useSelector((state: RootState) => state.loginUser);
//   // 找到当前路径下的菜单项
//   const menu = findAllMenuItemByPath(pathname) || {};
//   const needAccess = menu?.access ?? AccessEnum.NOT_LOGIN;
//   // 校验权限
//   const canAccess = checkAccess(loginUser, needAccess);
//   if (!canAccess) {
//     return <Forbidden />;
//   }
//   return <>{children}</>;
// };
//
// export default AccessLayout;
