import React from "react";
import { Content } from "antd/es/layout/layout";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";

/**
 * 题目详情页
 * @constructor
 */
const QuestionPage = async ({ params }) => {
  const { questionId } = params;
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
  return (
    <div id="questionPage" className="max-width-content">
      <Content>
        <QuestionCard question={question} />
      </Content>
    </div>
  );
};
export default QuestionPage;
