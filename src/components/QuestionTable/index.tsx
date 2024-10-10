"use client";

import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import TagList from "@/components/TagList";
import Link from "next/link";
import { useState } from "react";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { TablePaginationConfig } from "antd";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 * @constructor
 */
const QuestionTable = (props: Props) => {
  // 如果首次服务端已经获得了数据，客户端就没必要再请求一次了，新增 init 变量进行判断。
  const [init, setInit] = useState<boolean>(true);
  const { defaultQuestionList, defaultTotal, defaultSearchParams } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "题目",
      dataIndex: "title",
      render(_, record) {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => <TagList tagList={record.tagList} />,
    },
  ];

  return (
    <div className="question-table">
      <ProTable
        dataSource={questionList}
        columns={columns}
        form={{
          initialValues: defaultSearchParams,
        }}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        pagination={
          {
            pageSize: 12,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次请求
          if (init) {
            setInit(false);
            // 如果已有外层传来的默认数据，无需再次查询
            if (defaultQuestionList && defaultTotal) {
              return {};
            }
          }
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];
          // 请求
          const { data} = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
          // 更新结果
          const newTotal = Number(data?.data?.total) || 0;
          setTotal(newTotal);
          const newData = data?.data?.records || [];
          setQuestionList(newData);
          return {
            success: data?.code === 0,
            data: newData,
            total: newTotal,
          };
        }}
      />
    </div>
  );
};
export default QuestionTable;
