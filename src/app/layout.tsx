"use client";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import store from "@/stores";
import "./globals.css";
import withInit from "@/components/withInit";

const BasicLayoutWithInit = withInit(BasicLayout); // 使用 HOC 包装 BasicLayout

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
            <BasicLayoutWithInit>{children}</BasicLayoutWithInit>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
