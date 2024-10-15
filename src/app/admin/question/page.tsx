"use client";
import React, { useRef, useState } from 'react';
import withAuth from '@/components/withAuth';
import ACCESS_ENUM from '@/access/accessEnum';
import { Button, message, Popconfirm, Space, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  batchDeleteQuestionsUsingPost,
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from '@/api/questionController';
import CreateModal from '@/app/admin/question/components/CreateModal';
import UpdateModal from '@/app/admin/question/components/UpdateModal';
import MdEditor from '@/components/MdEditor';
import TagList from '@/components/TagList';
import './index.css';
import UpdateBankModal from '@/app/admin/question/components/UpdateBankModal';
import BatchAddQuestionsToBankModal from '@/app/admin/question/components/BatchAddQuestionsToBankModal';
import BatchRemoveQuestionsFromBankModal from '@/app/admin/question/components/BatchRemoveQuestionsFromBankModal';

/**
 * 题目管理页面
 * @constructor
 */
const QuestionAdminPage = () => {
  const [currentRow, setCurrentRow] = useState<API.Question>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateBankModalVisible, setUpdateBankModalVisible] =
    useState<boolean>(false);
  const [
    batchAddQuestionsToBankModalVisible,
    setBatchAddQuestionsToBankModalVisible,
  ] = useState<boolean>(false);
  const [
    batchRemoveQuestionsFromBankModalVisible,
    setBatchRemoveQuestionsFromBankModalVisible,
  ] = useState<boolean>(false);
  const [selectedQuestionIdList, setSelectedQuestionIdList] = useState<
    number[]
  >([]);
  const actionRef = useRef<ActionType>();
  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionUsingPost({
        id: row.id as never,
      });
      hide();
      message.success("删除成功");
      // 删除成功后刷新表格
      actionRef?.current?.reload();
      return true;
    } catch (error: unknown) {
      hide();
      message.error(
        `删除失败，${error instanceof Error ? error.message : error}`,
      );
      return false;
    }
  };
  /**
   * 批量删除节点
   *
   * @param questionIdList
   */
  const handleBatchDelete = async (questionIdList: number[]) => {
    const hide = message.loading("正在操作");
    try {
      await batchDeleteQuestionsUsingPost({
        questionIdList,
      });
      hide();
      message.success("操作成功");
      actionRef?.current?.reload();
    } catch (error: any) {
      hide();
      message.error(
        `操作失败，${error instanceof Error ? error.message : error}`,
      );
    }
  };

  /**
   * 表格列
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "所属题库",
      dataIndex: "questionBankId",
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      renderFormItem: (_, { ...rest }) => {

        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            // @ts-ignore
            {...rest?.fieldProps}
          />
        );
      },
    },

    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },

    {
      title: "创建用户",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
    },

    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateBankModalVisible(true);
            }}
          >
            修改所属题库
          </Typography.Link>
          <Popconfirm
            title="删除题目"
            description="确定要删除该题目吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer className="table-container">
      <ProTable<API.Question>
        className="proTable"
        scroll={{ x: "max-content" }}
        rowSelection={{
          fixed: true,
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        headerTitle={"题目管理"}
        actionRef={actionRef}
        tableAlertRender={({
          selectedRowKeys,
          onCleanSelected,
        }) => {
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({
          selectedRowKeys,
        }) => {
          return (
            <Space size={16}>
              <Button
                onClick={() => {
                  // 打开弹窗
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchAddQuestionsToBankModalVisible(true);
                }}
              >
                批量向题库添加题目
              </Button>
              <Button
                onClick={() => {
                  // 打开弹窗
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchRemoveQuestionsFromBankModalVisible(true);
                }}
              >
                批量从题库移除题目
              </Button>
              <Popconfirm
                title="确认删除"
                description="你确定要删除这些题目么？"
                onConfirm={() => {
                  // 批量删除题目
                  handleBatchDelete(selectedRowKeys as number[]);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>批量删除题目</Button>
              </Popconfirm>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];
          const res = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          return {
            success: res?.data?.code === 0,
            data: res?.data?.data?.records ?? [],
            total: Number(res?.data?.data?.total) || 0,
          };
        }}
        columns={columns}
      />
      {createModalVisible && (
        <CreateModal
          visible={createModalVisible}
          columns={columns}
          onSubmit={() => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
          onCancel={() => {
            setCreateModalVisible(false);
          }}
        />
      )}
      {updateModalVisible && (
        <UpdateModal
          visible={updateModalVisible}
          columns={columns}
          oldData={currentRow}
          onSubmit={() => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
        />
      )}
      {updateBankModalVisible && (
        <UpdateBankModal
          visible={updateBankModalVisible}
          questionId={currentRow?.id}
          onCancel={() => {
            setCurrentRow(undefined);
            setUpdateBankModalVisible(false);
          }}
        />
      )}
      {batchAddQuestionsToBankModalVisible && (
        <BatchAddQuestionsToBankModal
          visible={batchAddQuestionsToBankModalVisible}
          questionIdList={selectedQuestionIdList}
          onSubmit={() => {
            setBatchAddQuestionsToBankModalVisible(false);
          }}
          onCancel={() => {
            setBatchAddQuestionsToBankModalVisible(false);
          }}
        />
      )}
      {batchRemoveQuestionsFromBankModalVisible && (
        <BatchRemoveQuestionsFromBankModal
          visible={batchRemoveQuestionsFromBankModalVisible}
          questionIdList={selectedQuestionIdList}
          onSubmit={() => {
            setBatchRemoveQuestionsFromBankModalVisible(false);
          }}
          onCancel={() => {
            setBatchRemoveQuestionsFromBankModalVisible(false);
          }}
        />
      )}
    </PageContainer>
  );
};

export default withAuth(QuestionAdminPage, [ACCESS_ENUM.ADMIN]);
