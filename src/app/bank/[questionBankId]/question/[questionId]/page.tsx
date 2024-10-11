import React from "react";
import { Flex, Menu } from "antd";
import Title from "antd/es/typography/Title";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Link from "next/link";
import QuestionCard from '@/components/QuestionCard';
import './index.css';

/**
 * 题库题目详情页
 * @constructor
 */
const BankQuestionPage = async ({ params }) => {
  const { questionBankId, questionId } = params;
  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data.data;
  } catch (e) {
    console.error(`获取题库详情失败，${e instanceof Error ? e.message : e}`);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data.data;
  } catch (e) {
    console.error(`获取题目详情失败，${e instanceof Error ? e.message : e}`);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map(
    (question) => {
      return {
        label: (
          <Link
            href={`/bank/${bank.id}/question/${question.id}`}
            prefetch={false}
          >
            {question.title}
          </Link>
        ),
        key: question.id,
      };
    },
  );

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            题库标题
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[questionId]} />
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
};
export default BankQuestionPage;
