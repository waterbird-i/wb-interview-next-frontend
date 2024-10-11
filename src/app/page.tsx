"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import "./index.css";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  let questionBankList: API.QuestionBankVO[] = [];
  let questionList: API.QuestionVO[] = [];

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = questionBankRes.data?.data?.records ?? [];
  } catch (e) {
    console.error(`删除失败，${e instanceof Error ? e.message : e}`);
  }

  try {
    const questionListRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionListRes.data?.data?.records ?? [];
  } catch (e) {
    console.error(`删除失败，${e instanceof Error ? e.message : e}`);
  }
  // space-between：两端对齐，项目之间的间隔都相等
  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <div>题库列表</div>
      <Divider />
      <Title level={3}>最新题目</Title>
      <div>题目列表</div>
      {JSON.stringify(questionBankList)}
      {JSON.stringify(questionList)}
    </div>
  );
}
