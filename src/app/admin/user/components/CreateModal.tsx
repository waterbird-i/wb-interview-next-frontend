import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { addUserUsingPost } from "@/api/userController";

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

const CreateModal: React.FC<Props> = ({ visible, columns, onSubmit, onCancel }) => {
  /**
   * 提交函数
   * @param fields
   */
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading("正在添加");
    try {
      await addUserUsingPost(fields);
      hide();
      message.success("创建成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("创建失败，" + error.message);
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.UserAddRequest) => {
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
