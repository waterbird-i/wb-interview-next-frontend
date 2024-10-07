"use client";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React, { useCallback, useEffect } from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from '@/stores';
import './globals.css';
import { getLoginUserUsingGet } from '@/api/userController';
import AccessLayout from '@/access/AccessLayout';

/**
 * 全局初始化逻辑
 * @param children
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数
   */
  const doInit = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if(res.data){
    }else{
    }
  }, []);

  useEffect(() => {
    doInit();
  }, []);
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>
                  {children}
                </AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
