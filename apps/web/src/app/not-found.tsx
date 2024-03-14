"use client";

import { Button, Space, Typography } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-not-found flex min-h-screen flex-auto flex-col items-center justify-center">
      <div className="min-w-128 max-w-full p-8">
        <Space
          direction="vertical"
          align="center"
          className="w-full rounded-lg bg-white px-8 py-12"
        >
          <Typography.Title level={3}>Page not found</Typography.Title>
          <Typography.Text type="secondary">
            {"We can't find that page."}
          </Typography.Text>
          <Button type="primary">
            <Link href="/">Return to home</Link>
          </Button>
        </Space>
      </div>
    </div>
  );
}
