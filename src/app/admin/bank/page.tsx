"use client";
import React, { useRef, useState } from "react";
import withAuth from "@/components/withAuth";
import ACCESS_ENUM from "@/access/accessEnum";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { deleteQuestionBankUsingPost, listQuestionBankByPageUsingPost } from '@/api/questionBankController';
import CreateModal from '@/app/admin/bank/components/CreateModal';
import UpdateModal from '@/app/admin/bank/components/UpdateModal';

/**
 * 题库管理页面
 * @constructor
 */
const BankAdminPage = () => {
  const [currentRow, setCurrentRow] = useState<API.QuestionBank>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.QuestionBank) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionBankUsingPost({
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
   * 表格列
   */
  const columns: ProColumns<API.QuestionBank>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "描述",
      dataIndex: "description",
      valueType: "text",
    },
    {
      title: "图片",
      dataIndex: "picture",
      valueType: "image",
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
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
          <Popconfirm
            title="删除题库"
            description="确定要删除该题库吗？"
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
    <PageContainer>
      <ProTable<API.QuestionBank>
        headerTitle={"题库管理"}
        actionRef={actionRef}
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
          const res = await listQuestionBankByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionBankQueryRequest);
          return {
            success: res?.data?.code === 0,
            data: res?.data?.data?.records ?? [],
            total: Number(res?.data?.data?.total) || 0,
          };
        }}
        columns={columns}
        rowKey="id"
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
    </PageContainer>
  );
};

export default withAuth(BankAdminPage, [ACCESS_ENUM.ADMIN]);
