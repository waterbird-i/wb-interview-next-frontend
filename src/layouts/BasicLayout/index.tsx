"use client";

import './index.css';
import { GithubFilled, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Input, message, theme } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';
import { menus } from '../../../config/menu';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import MdEditor from '@/components/MdEditor';
import MdViewer from '../../components/MdViewer';
import dynamic from 'next/dynamic';
import getAccessibleMenu from '@/access/menuAccess';
import { userLogoutUsingPost } from '@/api/userController';
import { setLoginUser } from '@/stores/loginUser';
import { DEFAULT_USER } from '@/constants/user';
import SearchInput from '@/layouts/BasicLayout/components/SearchInput';

/**
 * 解决 Warning: Prop `className` did not match
 */
const ProLayout = dynamic(
  // 引入dynamic高阶组件，实现动态导入
  () => {
    return import("@ant-design/pro-layout");
  },
  {
    ssr: false, // 仅在客户端渲染
  },
);

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e: unknown) {
      message.error(`删除失败，${e instanceof Error ? e.message : e}`);
    }
  };
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试刷题平台"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            width={32}
            height={32}
            alt="面试刷题网站logo"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/notLoginUser.png",
          size: "small",
          title: loginUser.userName || "未登录",
          render: (_, dom) => {
            return loginUser.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      await userLogout();
                    } else if (key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            ) : (
              <div onClick={() => router.push("/user/login")}>{dom}</div>
            );
          },
        }}
        // 操作渲染
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/waterbird-i"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        // 标题渲染
        headerTitleRender={(logo, title) => {
          return (
            <a href="https://www.mianshiya.com" target="_blank">
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义菜单
        menuDataRender={() => {
          return getAccessibleMenu(loginUser, menus);
        }}
        // 菜单项渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
