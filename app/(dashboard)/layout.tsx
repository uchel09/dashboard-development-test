"use client";
import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import "./dashboard.css";

const { Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isZoomButton, setIsZoomButton] = useState<boolean>(false);
  useEffect(() => {
    // Fungsi untuk memeriksa ukuran layar dan mengupdate state collapsed
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setCollapsed(true);
        setIsZoomButton(false);
      } else {
        setCollapsed(false);
        setIsZoomButton(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/product",
      icon: <ProductOutlined />,
      label: <Link href="/product">Product</Link>,
    },
    {
      key: "/settings",
      label: <Link href="/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },

    // {
    //   key: "/settings",
    //   label: "Settings",
    //   icon: <SettingOutlined />,
    //   children: [
    //     { key: "/settings/profile", label: <Link href="/settings/profile">Profile</Link> },
    //     { key: "/settings/others", label: <Link href="/settings/others">Others</Link> },
    //   ],
    // },
  ];

  return (
    <Layout className="dashboard-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="layout-sider"
        width={300}
        collapsedWidth={60}
      >
        <div
          style={{
            fontSize: !collapsed ? "22px" : "14px",
            fontWeight: !collapsed ? "normal" : "bold",
            height: "70px",
            display: "flex",
            width: "80%",
            alignItems: "center",
            paddingInline: "20px",
            justifyContent: "center",
            margin: "0 auto",
            transition: "all ease-in-out 0.5s",
          }}
        >
          Admin
        </div>
        {isZoomButton && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 30,
              height: 30,
              marginBottom: "20px",
              display: "hidden",
            }}
          />
        )}
        <Menu defaultSelectedKeys={[pathname]} mode="inline" items={items} />
      </Sider>

      <Content
        style={{
          margin: "10px 10px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflowY:"scroll"
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
