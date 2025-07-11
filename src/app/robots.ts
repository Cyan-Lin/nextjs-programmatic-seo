import { MetadataRoute } from "next";

// 也可以使用Promise，如果需要動態的禁用某些page
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 針對所有爬蟲
        userAgent: "*",
        // 允許爬蟲爬取，"/"表示所有page
        allow: "/",
        // 禁止爬蟲爬取
        disallow: ["/admin", "/private"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
