import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import "./index.css";
import { NextPage } from "next";

interface SearchParams {
  q?: string; // 问号表示这个属性是可选的
}

/**
 * 题目列表页面
 * @constructor
 */
const QuestionsPage: NextPage<{ searchParams: SearchParams }> = async ({
  searchParams,
}) => {
  const { q: searchText } = searchParams;
  let questionList: API.QuestionVO[] | undefined = [];
  let total = 0;

  try {
    const questionRes = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionRes.data?.data?.records ?? [];
    total = questionRes.data?.data?.total ?? 0;
  } catch (e) {
    console.error(`获取题目列表失败, ${e instanceof Error ? e.message : e}`);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
};
export default QuestionsPage;
