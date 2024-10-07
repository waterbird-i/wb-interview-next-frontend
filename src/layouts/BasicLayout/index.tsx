"use client";
import './index.css';
import { GithubFilled, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Dropdown, Input, theme } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';
import { menus } from '../../../config/menu';
import React, { useState } from 'react';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import getAccessibleMenu from '@/access/menuAccess';
import MdEditor from '@/components/MdEditor';
import MdViewer from '@/components/MdView';

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [text, setText] = useState<string>('');
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
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
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
          return getAccessibleMenu(loginUser,menus);
        }}
        // 菜单项渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
        <MdEditor value={text} onChange={setText} />
        <MdViewer value={text} />
      </ProLayout>
    </div>
  );
}
