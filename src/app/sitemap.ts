// 這個檔案是為了生成sitemap
// 我們需要生成一個sitemap.xml 檔案，這樣可以讓搜尋引擎知道我們的網站有哪些頁面
// 這樣搜尋引擎就可以知道我們的網站有哪些頁面，並且可以知道哪些頁面是最重要的

import { getAllTags, locations } from "@/data/restaurants";
import { MetadataRoute } from "next";

// baseUrl 是從環境變量中取得的
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allTags = await getAllTags();

  const searchLandingPages: MetadataRoute.Sitemap = allTags
    .map((tag) =>
      locations.map((location) => ({
        url: `${baseUrl}/${location}/${tag}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      })),
    )
    .flat();

  return [
    // 放入其他頁面
    {
      url: `${baseUrl}/about`, // url 是最重要的
      // lastModified: "2024-12-31",
      // changeFrequency: "yearly",
      // priority: 0.8,
    },
    // 放入 programmatic SEO 頁面
    ...searchLandingPages,
  ];
}
