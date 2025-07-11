import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面 | Restaurant Finder",
  description: "抱歉，您要找的頁面不存在。讓我們帶您回到首頁或探索其他美食。",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">找不到頁面</h2>
        <p className="text-gray-500">抱歉，您要找的頁面不存在或已被移除。</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            返回首頁
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            探索餐廳
          </Link>
        </div>
      </div>
    </main>
  );
}
