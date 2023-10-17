import React from "react";
import { Breadcrumb, Layout, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import contentStyle from "./DashBoard.module.css";
const { Content } = Layout;

const DashBoard = () => {
  const data = [
    { name: "January", Users: 400, Revenue: 2400, Orders: 300 },
    { name: "February", Users: 300, Revenue: 1398, Orders: 200 },
    { name: "March", Users: 1000, Revenue: 9800, Orders: 800 },
    { name: "April", Users: 278, Revenue: 3908, Orders: 500 },
    { name: "May", Users: 189, Revenue: 4800, Orders: 400 },
    { name: "June", Users: 239, Revenue: 3800, Orders: 300 },
    { name: "July", Users: 349, Revenue: 4300, Orders: 350 },
    { name: "August", Users: 500, Revenue: 5300, Orders: 450 },
    { name: "September", Users: 489, Revenue: 6300, Orders: 550 },
    { name: "October", Users: 349, Revenue: 4300, Orders: 400 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{ width: "100%", overflowX: "scroll" }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: 360,
          }}
        >
          <h1 className="font-bold">Admin Dashboard Statistics</h1>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              className={`${contentStyle["recharts-wrapper"]}`}
              width={600}
              height={300}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Users" fill="#8884d8" />
              <Bar dataKey="Revenue" fill="#ffc658" />
              <Bar dataKey="Orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: 360,
          }}
        >
          <h1 className="font-bold">Admin Dashboard Pie Chart</h1>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={600} height={250}>
              <Pie
                data={data.slice(0, 3)}
                cx="50%"
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="Users"
              >
                {data.slice(0, 3).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* <Pie
                data={data.slice(0, 3)}
                cx={600}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#82ca9d"
                dataKey="Revenue"
              >
                {data.slice(0, 3).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Pie
                data={data.slice(0, 3)}
                cx={400}
                cy={450}
                labelLine={false}
                outerRadius={80}
                fill="#ffc658"
                dataKey="Orders"
              >
                {data.slice(0, 3).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Content>
  );
};

export default DashBoard;
