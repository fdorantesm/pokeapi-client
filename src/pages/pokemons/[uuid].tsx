import { useConfig } from "@/hooks/use-config";
import { Layout } from "@/layouts/default";
import { getPokemonById } from "@/services/pokedex/pokemons";
import { Pokemon } from "@/types/pokemons/pokemon.type";
import { kebabToTitle } from "@/utils/kebab-to-title.util";
import { ChevronLeft, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Link,
  List,
  ListItem,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
  capitalize,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function PokemonDetail() {
  const config = useConfig();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.uuid) {
      setLoading(true);
      getPokemonById(router.query.uuid as string).then((response) => {
        setPokemon(response);
        setLoading(false);
      });
    }
  }, [router.query.uuid]);

  return (
    <Layout>
      {loading && <LinearProgress></LinearProgress>}
      <Container maxWidth="md">
        <Box py={3}>
          <Link href="/">
            <Typography fontSize={18} component={"div"}>
              <Stack direction={"row"}>
                <ChevronLeft />
                <span>Regresar</span>
              </Stack>
            </Typography>
          </Link>
        </Box>
        {pokemon && (
          <>
            <Grid container>
              <Grid item md={5}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Image
                    src={
                      pokemon.sprites.frontDefault ||
                      "/images/pokemon-placeholder.png"
                    }
                    width={400}
                    height={400}
                    alt={pokemon.name}
                    style={{ maxWidth: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item md={7}>
                <Box px={1}>
                  <Typography component={"h6"} variant="h6" fontSize={16}>
                    #{pokemon.id}
                  </Typography>
                </Box>
                <Box px={1}>
                  <Typography fontSize={32} fontWeight={600}>
                    {capitalize(pokemon.name)}
                  </Typography>
                </Box>
                <Stack direction={"row"} spacing={1} p={1}>
                  {pokemon.types.map((type) => (
                    <Chip
                      key={type.type.name}
                      label={kebabToTitle(type.type.name)}
                    />
                  ))}
                </Stack>
                <Box>
                  <Box p={2}>
                    <Typography fontWeight={600}>Abilities</Typography>
                  </Box>
                  <List>
                    {pokemon.abilities.map((ability) => (
                      <ListItem key={ability.ability.name}>
                        <Typography>
                          {kebabToTitle(ability.ability.name)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Box p={2}>
                    <Typography fontWeight={600}>Stats</Typography>
                  </Box>
                  <Table>
                    <TableRow>
                      {pokemon.stats.map((stat) => (
                        <TableCell sx={{ border: "none" }} key={stat.stat.name}>
                          <Typography fontSize={10} fontWeight={300}>
                            {kebabToTitle(
                              stat.stat.name.replace(/special/, "S.")
                            ).toUpperCase()}
                          </Typography>
                          <Typography fontSize={24} fontWeight={500}>
                            {stat.baseStat}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </Table>
                  <Button
                    LinkComponent={Link}
                    href={`${config.apiUrl}/v1/pokemons/${router.query.uuid}/pdf`}
                    target="_blank"
                    variant="contained"
                    endIcon={<Download />}
                  >
                    Download
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Layout>
  );
}
