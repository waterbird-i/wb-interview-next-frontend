"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex } from 'antd';
import "./index.css";
import Link from 'next/link';

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  // space-between：两端对齐，项目之间的间隔都相等
  return <div id="homePage">
    <Flex justify="space-between" align="center">
      <Title level={3}>最新题库</Title>
      <Link href={"/banks"}>查看更多</Link>
    </Flex>
    <div>
      题库列表
    </div>
    <Divider />
    <Title level={3}>
      最新题目
    </Title>
    <div>
      题目列表
    </div>
  </div>;
}
