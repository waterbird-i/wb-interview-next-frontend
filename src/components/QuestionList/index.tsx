"use client";
import { Card, List, Tag } from "antd";
import "./index.css";
import Link from "next/link";
import React from "react";

interface Props {
  cardTitle?: React.ReactNode;
  questionList: API.QuestionVO[];
  questionBankId?: number;
  // loadData?: () => Promise<API.QuestionVO[]>;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBankId } = props;

  const tagList = (tags: string[] = []) => {
    return tags.map((tag) => {
      return <Tag key={tag}>{tag}</Tag>;
    });
  };

  // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  //   if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 500) <= 1) {
  //     if (loadData) {
  //       loadData();
  //     }
  //   }
  // };

  return (
    <Card className="question-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item: API.QuestionVO) => (
          <List.Item extra={tagList(item.tagList)}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/bank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </Card>
    // <Card className="question-list" title={cardTitle}>
    //   <List>
    //     <VirtualList data={questionList} height={400} itemHeight={50} onScroll={onScroll} itemKey='id'>
    //       {(item: API.QuestionVO) => (
    //         <List.Item extra={tagList(item.tagList)}>
    //           <List.Item.Meta
    //             title={
    //               <Link
    //                 href={
    //                   questionBankId
    //                     ? `/bank/${questionBankId}/question/${item.id}`
    //                     : `/question/${item.id}`
    //                 }
    //               >
    //                 {item.title}
    //               </Link>
    //             }
    //           />
    //         </List.Item>
    //       )}
    //     </VirtualList>
    //   </List>
    // </Card>
  );
};

export default QuestionList;
