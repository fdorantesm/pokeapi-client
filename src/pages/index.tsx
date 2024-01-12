import { useConfig } from "@/hooks/use-config";
import { Layout } from "@/layouts/default";
import { Head } from "@/layouts/default/head";
import { getPaginatedPokemons } from "@/services/pokedex/pokemons";
import { Pagination } from "@/types/general/pagination.type";
import { Pokemon } from "@/types/pokemons/pokemon.type";
import { PokemonsFilter } from "@/types/pokemons/pokemons-filter.type";
import { AutoAwesome, PictureAsPdf, Visibility } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  debounce,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const config = useConfig();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState<Omit<Pagination<Pokemon>, "docs">>({
    limit: 12,
    page: 1,
    total: 0,
    pages: 0,
    prevPage: null,
    nextPage: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((filter: PokemonsFilter) => fetchPokemons(filter), 500),
    []
  );

  const fetchPokemons = async (filter: PokemonsFilter) => {
    setLoading(true);
    setTyping(false);
    const response = await getPaginatedPokemons(filter);

    setLoading(false);

    const hasMore = response.nextPage !== null;
    setHasMore(hasMore);

    setContext({
      page: response.page,
      limit: response.limit,
      total: response.total,
      pages: response.pages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
    });

    setPokemons((prev) => [...prev, ...response.docs]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(true);
    setPokemons([]);
    setContext((prev) => ({ ...prev, page: 1 }));
    setSearch(event.target.value);
  };

  useEffect(() => {
    debouncedSearch({
      limit: context.limit,
      page: context.page,
      search,
    });
  }, [context.limit, context.page, debouncedSearch, search]);

  const handleScroll = async () => {
    await fetchPokemons({
      limit: context.limit,
      page: context.page + 1,
      search,
    });
  };

  return (
    <>
      <Head
        author={config.authorName}
        description="Pokedex listing"
        keywords="pokedex,pokemons"
        title="Home | Pokedex"
      />
      <Layout>
        <Container maxWidth="md">
          <Box p={1}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                placeholder="Buscar pokemon"
                value={search}
                onChange={handleSearch}
              />
            </FormControl>
          </Box>
          <InfiniteScroll
            dataLength={pokemons.length}
            next={handleScroll}
            hasMore={hasMore}
            loader={
              <Box sx={{ width: "100%" }} py={3}>
                <LinearProgress />
              </Box>
            }
            endMessage={
              pokemons.length > 0 && (
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  py={3}
                  color={"text.disabled"}
                >
                  <AutoAwesome />
                  <span>There&lsquo;s no more pokemons</span>
                </Stack>
              )
            }
            refreshFunction={console.log}
            style={{ width: "100%" }}
          >
            <Grid container>
              {pokemons.length === 0 && !loading && !typing && (
                <Box p={1} sx={{ width: "100%" }}>
                  <Alert
                    variant="filled"
                    color="info"
                    sx={{ width: "100%" }}
                    icon={false}
                  >
                    No pokemons found
                  </Alert>
                </Box>
              )}
              {pokemons.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} key={pokemon.uuid} p={1}>
                  <Card>
                    <CardContent>
                      <small>#{pokemon.id}</small>
                      <Typography fontWeight={600}>{pokemon.name}</Typography>
                      <CardMedia
                        component="img"
                        width={96}
                        height={96}
                        image={
                          pokemon.sprites.frontDefault ||
                          pokemon.sprites.frontShiny ||
                          "/img/pokemon-placeholder.png"
                        }
                        alt={pokemon.name}
                        sx={{ objectFit: "contain", py: 3 }}
                      />
                    </CardContent>
                    <CardActions>
                      <Stack
                        spacing={1}
                        direction={"row"}
                        justifyContent={"end"}
                        sx={{ width: "100%" }}
                      >
                        <Link
                          href={`${config.siteUrl}/pokemons/${pokemon.uuid}/`}
                        >
                          <Tooltip title="Ver detalle" placement="top">
                            <IconButton>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip title="Ver PDF" placement="top">
                          <IconButton
                            href={`${config.apiUrl}/v1/pokemons/${pokemon.uuid}/pdf`}
                            target="_blank"
                          >
                            <PictureAsPdf />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Container>
      </Layout>
    </>
  );
}
