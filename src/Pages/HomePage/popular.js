import axios from "axios";
import { useEffect, useState } from "react";

import PopularShow from "./poppularShow";
import { Box, Flex, Text, Grid } from "@chakra-ui/react";
export default function Popular() {
  //*******Variable*********//
  const [popData, setPopdata] = useState([]);

  //*******Funtion*********//
  const fetchData = async (maxRetries = 5, delay = 2000) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&order=popular&per_page=10`
        );
        if (response.data.hits && response.data.hits.length > 0) {
          setPopdata(response.data.hits);
          return;
        } else {
          window.alert("No RS");
          return;
        }
      } catch (err) {
        console.error(`Error`, err.message);
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };
  const MakeShow = (data) => {
    return data.map((x) => {
      return (
        <PopularShow
          key={x.id}
          id={x.id}
          img={x.previewURL}
          imgL={x.largeImageURL}
        />
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box minH="100vh" p={4}>
      <Flex align="center" justify="center" direction="column" gap={20}>
        <Text marginTop="50px" color="#16404D" fontSize="3xl" fontWeight="bold">
          Most 10 Popular Inspired Images
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gapX={100}
          gapY={10}
          textAlign="center"
          autoFlow={true}
        >
          {MakeShow(popData)}
        </Grid>
      </Flex>
    </Box>
  );
}
