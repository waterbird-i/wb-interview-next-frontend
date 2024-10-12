"use client";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as useReduxSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/stores";
import "./index.css";
import CalenderChart from "@/app/user/center/components/CalenderChart";
import withAuth from '@/components/withAuth';
import ACCESS_ENUM from '@/access/accessEnum';

// 定义一个类型安全的选择器钩子
const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

/**
 * 用户中心页面
 * @constructor
 */
const UserCenterPage = () => {
  const loginUser = useAppSelector((state: RootState) => state.loginUser);
  // 便于复用，新起一个变量
  const user = loginUser;
  // 控制菜单栏 Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("record");

  return (
    <div id="userCenterPage" className="max-width-content">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              src={
                user.userAvatar ? user.userAvatar : "/assets/notLoginUser.png"
              }
              size={72}
            />
            <div style={{ marginBottom: 16 }} />
            <Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName}
                </Title>
              }
              description={
                <>
                  <Paragraph type="secondary">{user.userProfile}</Paragraph>
                </>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "others",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {activeTabKey === "record" && (
              <>
                <CalenderChart />
              </>
            )}
            {activeTabKey === "others" && <>bbb</>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default withAuth(UserCenterPage,[ACCESS_ENUM.USER, ACCESS_ENUM.ADMIN]);