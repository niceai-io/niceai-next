'use client'

import { Button, Space, Typography } from 'antd'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col flex-auto bg-not-found">
      <div className="p-8 min-w-128 max-w-full">
        <Space
          direction="vertical"
          align="center"
          className="rounded-lg bg-white px-8 py-12 w-full"
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
  )
}
