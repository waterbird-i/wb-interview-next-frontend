import { Button, Result } from "antd";

/**
 * 无权限访问的页面
 */
const forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  );
};

export default forbidden;