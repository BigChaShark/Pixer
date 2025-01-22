import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopularShow from "./poppularShow";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Grid,
  GridItem,
  Circle,
  Button,
  Card,
  Image,
} from "@chakra-ui/react";
export default function Popular() {
  const [popData, setPopdata] = useState([]);
  const fetchData = async (maxRetries = 5, delay = 2000) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      console.log(attempts);
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
  useEffect(() => {
    fetchData();
  }, []);
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
  return (
    <Box minH="100vh" p={4}>
      <Flex align="center" justify="center" direction="column" gap={20}>
        <Text marginTop="50px" color="#16404D" fontSize="3xl" fontWeight="bold">
          Top 10 Photo
        </Text>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gapX={100}
          gapY={10}
          textAlign="center"
        >
          {MakeShow(popData)}
        </Grid>
      </Flex>
    </Box>
  );
}
