import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Main } from "./main";

export function Layout(props: Props) {
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
}

interface Props {
  children: ReactNode;
}
