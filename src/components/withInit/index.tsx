import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";

/**
 * 高阶组件封装初始化逻辑
 * @param WrappedComponent
 */
function withInit<T extends object>(WrappedComponent: React.ComponentType<T>) {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    const dispatch = useDispatch<AppDispatch>();

    /**
     * 全局初始化函数
     */
    const doInit = useCallback(async () => {
      const res = await getLoginUserUsingGet();
      if (res.data.data) {
        dispatch(setLoginUser(res.data.data as API.LoginUserVO));
      }
    }, [dispatch]);

    useEffect(() => {
      doInit();
    }, [doInit]);

    return <WrappedComponent {...props} />;
  };
}

export default withInit;
