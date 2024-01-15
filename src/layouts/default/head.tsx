import { useConfig } from "@/hooks/use-config";
import NextHead from "next/head";

export function Head(props: Props) {
  const config = useConfig();
  return (
    <>
      <NextHead>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="title" content={props.title} />
        <meta name="keywords" content={props.keywords} />
        <meta
          name="description"
          content={props.description}
          itemProp="description"
        />
        <meta name="revisit-after" content="1 month" />
        <meta name="author" content={props.author} />
        <meta name="geo.region" content="MX-SIN" />
        <meta name="geo.placename" content="México" />
        <meta name="robots" content="all" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="DC.title" content={props.title} />
        <meta name="DC.description" content={props.description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="twitter:description" content={props.description} />
        {props.children}
      </NextHead>
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}
