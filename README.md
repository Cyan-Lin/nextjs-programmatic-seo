# Programmatic SEO in Next.js 15

Next 15 的 SEO 練習

學習 & 使用NextJS的優勢:

- SSR使爬蟲可以爬到我們的網站
- 動態路由，可以一次生成不同的keyword組合，不用每個關鍵字都一個個設定
- 靜態暫存(SSG): 在build的時候就生成某些熱門頁面，時現超快速的載入
- 增量靜態生成(ISR): 當page的快取過期(設定revalidate)後，就在背景自動重新渲染並重新暫存，下次有user再開啟這個page的時候就會直接拿cache，不用重新渲染
- 長尾關鍵字 (Long Tail Keywords): 生成多個相似的關鍵字，增加user在google搜尋的曝光機會
- 在build時，自動產生sitemap.xml
- 使用Google Search Console來提交sitemap，讓網路上的user可以在搜尋引擎上找到你的網頁 (需要使用網路上買的domain，不能使用一般開發用的，如Vercel免費的.vercel.app，就不能使用)
- 使用 site:XXX.com 來搜尋已經掛上google搜尋引擎的page

- favicon: .png 轉 .ico 網站，https://realfavicongenerator.net
  - 製作logo: https://logo.com
  - 裁切logo到圓形: https://circlecropimage.com
  - 直接放在/app裡面，命名:favicon.ico即可，不用其他的設定
- 社群媒體(如貼在FB)的圖片大小: 建議1200\*630px，使用png即可 (可以使用GIMP或是其他圖片編輯器製作) https://logo.com 也有提供模板
  - 命名需為: opengraph-image.png，一樣放在/app
  - 也可以在各page底下放一樣名字的png，又或是寫在metadata裡面的opengraph屬性(動態OG image)
  - 另外也可以額外寫成一個component(opengraph-image.tsx)，可以做style、也可以打fetch API
- 專案外層的metadata最好放在layout(因為整個專案會被layout包起來)
  - 其他page，例如about，可以在layout加上template，就不用寫固定的首尾字了，要強制蓋過template也可使用absolute
- 社群媒體分享預覽: https://www.opengraph.xyz(或是https://socialsharepreview.com 但好像顯示不出來) (須先deploy)
  - 替代方案: 使用https://docs.srv.us裡面的command ssh srv.us -R 1:localhost:3000，可能要先產生ssh(使用command:ssh-keygen -t ed25519)
    - 產生一個暫時的https host後，就可以貼到https://www.opengraph.xyz做測試了
- 在layout裡面使用next/font/google是一個好的方式，因為這個font會在自己的server上host，而不是一般的直接跟google的server取得font，這樣會有網站IP洩漏到google的風險(甚至違法)
  - 在自己server上面host這個font也會load比較快，有較佳的SEO
- 使用圖片盡量一律都使用next/image，nextjs會根據螢幕大小，自動的調整圖片的大小，可以大大增加載入速度與SEO
- 產生動態的metadata(只能在server component)
  - 如果是文章頁面，我們的title通常會想要動態的顯示文章的標題
  - 這時候可以用generateMetadata動態告訴next說我要顯示的metadata，title、description、OGimage(這個在local試不出來，待確認)
- 原生的fetch method在generateMetadata同時都有打的時候，實際上只會call一次，除非你使用其他的，如axios就要使用react的 cache function

- not-found page，當找不到page需要的資料的時候，不應該顯示空白，這時候notFound()是一個好選擇，爬蟲爬到not-found的時候，會知道404狀態

- 拆分server component與client component:

  - 盡量在server component取得需要的data，得到這些data後渲染到page上，得到完成的HTML會直接送到client side
  - server component不支援JS的功能，如onClick，這時候就需要client component，
  - 重點在於client component盡量越小越好，像是點讚功能的button就應該拉出來獨自做一個client component，再把已完成的component放進server component

- robots.ts，如果你不想要讓某些page被索引到，像是admin跟private page，就可以增加這個檔案
  - 如果需要更細節的控制，也可以在各別的page設定metadata，robots屬性可以設定要不要index，以及要不要讓爬蟲追蹤這個page裡面的links
