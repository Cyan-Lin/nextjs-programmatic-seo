import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About", // 會放在layout的template的%s
  //   title: {
  //     absolute: "About", // 如果想要蓋過layout的title，可以這樣寫
  //   },
};

export default function About() {
  return <div>About</div>;
}
