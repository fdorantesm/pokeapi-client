import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";

import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Main } from "./main";

export function Layout(props: Props) {
  return (
    <App>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </App>
  );
}

const App = styled("div")(() => ({
  minHeight: "inherit",
  fontFamily: "Montserrat, sans-serif!important",
  display: "flex",
  flexDirection: "column",
}));

interface Props {
  children: ReactNode;
}
