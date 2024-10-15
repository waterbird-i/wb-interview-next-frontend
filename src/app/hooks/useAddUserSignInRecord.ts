import { useEffect, useState } from "react";
import { message } from "antd";
import { addUserSignInUsingPost } from "@/api/userController";
import type { RootState } from "@/stores";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as useReduxSelector } from "react-redux";
import ACCESS_ENUM from "@/access/accessEnum";
// 定义一个类型安全的选择器钩子
const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
/**
 * 添加用户刷题签到记录钩子
 * @constructor
 */
const useAddUserSignInRecord = () => {
  // 签到状态
  const [loading, setLoading] = useState<boolean>(true);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const loginUser = useAppSelector((state) => state.loginUser); // 获取用户信息
  // 检查是否已签到
  const checkIfSignedIn = () => {
    const isSignedIn = localStorage.getItem("userSignedIn");
    if (isSignedIn) {
      setSignedIn(true);
      setLoading(false);
    }
  };
  // 请求后端执行签到
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost({});
      // 签到成功后，将签到状态保存到本地,防止重复发送签到请求
      localStorage.setItem("userSignedIn", "true");
      setSignedIn(true);
    } catch (e) {
      message.error(
        `获取刷题签到记录失败，${e instanceof Error ? e.message : e}`,
      );
    }
    setLoading(false);
  };

  // 保证只会调用一次
  useEffect(() => {
    if (loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN) {
      checkIfSignedIn();
      // 如果还没有签到，则进行签到
      if (!signedIn) {
        doFetch();
      }
    }
  }, [signedIn]);

  return { loading, signedIn };
};

export default useAddUserSignInRecord;
