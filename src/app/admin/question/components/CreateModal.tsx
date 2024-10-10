import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { addQuestionUsingPost } from "@/api/questionController";

interface Props {
  visible: boolean;
  columns: ProColumns<API.Question>[];
  onSubmit: (values: API.QuestionAddRequest) => void;
  onCancel: () => void;
}

const CreateModal: React.FC<Props> = ({
  visible,
  columns,
  onSubmit,
  onCancel,
}) => {
  /**
   * 提交函数
   * @param fields
   */
  const handleAdd = async (fields: API.QuestionAddRequest) => {
    const hide = message.loading("正在添加");
    try {
      await addQuestionUsingPost(fields);
      hide();
      message.success("创建成功");
      return true;
    } catch (error: unknown) {
      hide();
      message.error(
        `创建失败，${error instanceof Error ? error.message : error}`,
      );
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      centered
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        style={{minWidth: "10vw"}}
        type="form"
        columns={columns}
        onSubmit={async (values: API.QuestionBankQuestionAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};

export default CreateModal;
