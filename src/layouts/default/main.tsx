import styled from "@emotion/styled";
import type { ReactNode } from "react";

export function Main(props: Props) {
  return <StyledMain>{props.children}</StyledMain>;
}

const StyledMain = styled("main")({
  flexGrow: 1,
});

interface Props {
  children: ReactNode;
}
