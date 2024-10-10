import Title from "antd/es/typography/Title";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionList from "@/components/QuestionList";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";

/**
 * 题库详情页面
 * @constructor
 */
 const BankPage = async ({ params }) => {
  const { questionBankId } = params;

  let bank = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data?.data;
  } catch (e) {
    console.error(`获取题目列表失败, ${e instanceof Error ? e.message : e}`);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <Paragraph type="secondary">{bank.description}</Paragraph>
          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList questionList={bank.questionPage?.records || []} />
    </div>
  );
}
export default BankPage;