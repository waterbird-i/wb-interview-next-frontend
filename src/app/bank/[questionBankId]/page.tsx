// "use client"
import Title from "antd/es/typography/Title";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionList from "@/components/QuestionList";
import { Avatar, Button, Card } from 'antd';
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";



/**
 * 题库详情页面
 * @constructor
 */
// @ts-ignore
const BankPage =  async ({ params }) => {
  const { questionBankId } = params;
  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 20,
    });
    bank = bankRes.data?.data;
  } catch (e) {
    console.error(`获取题目列表失败, ${e instanceof Error ? e.message : e}`);
  }

  // const loadData = async () => {
  //   try {
  //     const bankRes = await getQuestionBankVoByIdUsingGet({
  //       id: questionBankId,
  //       needQueryQuestionList: true,
  //       pageSize: 20,
  //     });
  //     bank = bankRes.data?.data;
  //   } catch (e) {
  //     console.error(`获取题目列表失败, ${e instanceof Error ? e.message : e}`);
  //   }
  // }
  // await loadData();

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  // 获取第一道题目，用于 “开始刷题” 按钮跳转
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72}/>}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }}/>
      <QuestionList
        questionList={bank.questionPage?.records || []}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
        questionBankId={questionBankId}
        // loadData={loadData}
      />
    </div>
  );
};
export default BankPage;
