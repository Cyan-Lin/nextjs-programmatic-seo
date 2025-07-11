// PageProps 是什麼?
// PageProps 是 Next.js 的頁面屬性

import Header from "@/components/Header";
import RestaurantItem from "@/components/RestaurantItem";
import { getAllTags, locations, searchRestaurants } from "@/data/restaurants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// 它定義了頁面的參數
interface PageProps {
  params: Promise<{ location: string; q: string }>;
}

// 設定頁面重新渲染的時間，單位是秒，一旦偵測到這個快取過期了，會在背景(server)重新渲染，但是該user會拿到cache的那份(避免render太久)
// 直到背景重新渲染完畢了，這時候重新整理頁面，就會拿到最新的資料
export const revalidate = 86400; // 24小時

export async function generateStaticParams() {
  // 如果回傳空陣列，表示首次進入所有頁面的時候會渲染一次，之後就會暫存起來，其他user進入頁面時都不會重新渲染(ISR)
  // return [];

  // 如果回傳所有可能的參數，表示這些頁面會在build時就生成，數量多的話，可能會生成比較久
  // 所以我們可以限制要在build時就生成的數量，減少build時間
  const allTags = await getAllTags();
  // 如果有太多的page要SSG，會讓build時間變得很久，這時候可以設定只有特定的熱門params才採用SSG，其他的用ISR(第一次需要渲染，後續都用cache)
  // { limit: 10 }

  return allTags
    .map((tag) =>
      locations.map((location) => ({
        location,
        q: tag,
      })),
    )
    .flat();
}

// 因為我們不能在generateMetadata 和 Page 共享資料，需要 fetch 兩次
// 所以都會使用 cache 來暫存資料，這樣只會到資料庫 fetch 一次
// 就不會有非必要的資料庫 fetch
const getRestaurants = cache(searchRestaurants);

// generateMetadata 可以讓我們在頁面中生成metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { location, q } = await params;

  const qDecoded = decodeURIComponent(q);
  const locationDecoded = decodeURIComponent(location);

  const results = await getRestaurants(qDecoded, locationDecoded);

  return {
    title: `Top ${results.length} ${qDecoded} near ${locationDecoded} - Updated ${new Date().getFullYear()}`,
    description: `Find the best ${qDecoded} near ${locationDecoded}`,
    openGraph: {
      images: results.map((restaurant) => ({
        url: restaurant.image,
      })),
    },
  };
}

// 為什麼需要async?
// 因為我們需要從資料庫中取得資料
// 資料庫的資料是動態的，所以需要使用async
// 如果我們使用普通的function，我們會得到一個錯誤
// 因為我們不能在普通的function中使用await
export default async function Page({ params }: PageProps) {
  const { location, q } = await params;

  // 解碼: 因為我們的url是編碼過的，所以需要解碼，再傳給searchRestaurants
  // 例如: %E9%A3%AF%E5%BA%97 解碼後變成 餐廳
  const qDecoded = decodeURIComponent(q);
  const locationDecoded = decodeURIComponent(location);

  const results = await getRestaurants(qDecoded, locationDecoded);

  if (results.length === 0) {
    notFound();
  }

  return (
    <div>
      <Header q={qDecoded} location={locationDecoded} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Top {results.length} {qDecoded} near {locationDecoded}
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </div>
  );
}
