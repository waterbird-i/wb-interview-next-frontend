import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { updateQuestionBankUsingPost } from "@/api/questionBankController";

interface Props {
  oldData?: API.QuestionBank;
  visible: boolean;
  columns: ProColumns<API.QuestionBank>[];
  onSubmit: (values: API.QuestionBankUpdateRequest) => void;
  onCancel: () => void;
}
/**
 * 提交函数
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionBankUpdateRequest) => {
  const hide = message.loading("正在添加");
  try {
    await updateQuestionBankUsingPost(fields);
    hide();
    message.success("编辑成功");
    return true;
  } catch (error: unknown) {
    hide();
    message.error(
      `编辑失败，${error instanceof Error ? error.message : error}`,
    );
    return false;
  }
};

const UpdateModal: React.FC<Props> = ({
  oldData,
  visible,
  columns,
  onSubmit,
  onCancel,
}) => {
  if (!oldData) {
    return <></>;
  }
  /**
   * 过滤掉用户账号，该字段管理员不可修改
   */
  const newColumns = columns.filter((item) => {
    return item.dataIndex !== "userAccount";
  });
  return (
    <Modal
      destroyOnClose
      title={"编辑"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={newColumns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.QuestionBankUpdateRequest) => {
          if (!oldData?.id || !onSubmit) {
            return;
          }
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
