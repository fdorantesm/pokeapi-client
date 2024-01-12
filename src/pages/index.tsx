import { useConfig } from "@/hooks/use-config";
import { Layout } from "@/layouts/default";
import { Head } from "@/layouts/default/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const config = useConfig();
  return (
    <>
      <Head
        author={config.authorName}
        description="Pokedex listing"
        keywords="pokedex,pokemons"
        title="Home | Pokedex"
      />
      <Layout>
        <div>home</div>
      </Layout>
    </>
  );
}
