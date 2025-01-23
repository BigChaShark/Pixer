import { useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { Box, Flex, Icon, Text, Grid, Circle, Button } from "@chakra-ui/react";
import CollectionShow from "./collectionShow";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Collection() {
  //Data
  const [data, dataSet] = useState([]);
  const getLocalData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/img");
      dataSet(res.data);
    } catch (error) {
      return console.log("Error" + error);
    }
  };
  useEffect(() => {
    getLocalData();
  }, []);

  //Delete
  const handleDeleteAll = async () => {
    try {
      let a = data.map(
        async (x) => await axios.delete(`http://localhost:3001/img/${x.id}`)
      );
      await Promise.all(a);
      await getLocalData();
    } catch (error) {
      console.log("error" + error);
    }
  };
  const handleClickIDDelete = async (id) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3001/img/${id}`);
        await getLocalData();
      } catch (error) {
        console.log("error" + error);
      }
    }
  };

  //Navigate
  const navigate = useNavigate();

  //Show Collection
  const makeShow = (x) => {
    return x.map((x) => (
      <CollectionShow
        key={x.id}
        link={x.link}
        dlt={handleClickIDDelete}
        id={x.id}
      ></CollectionShow>
    ));
  };
  return (
    <Box bg="#fdf8e5" minH="100vh" p={4}>
      <Flex align="center" mb={20}>
        <Circle size={350} bg="#A6CDC6" ml={-20} mt={-20}>
          <Text
            position="center"
            fontSize="3xl"
            fontWeight="bold"
            color="#f0a04b"
          >
            logo
          </Text>
        </Circle>
        <Flex
          ml={-20}
          bg="#A6CDC6"
          borderRadius={50}
          p={5}
          width="-webkit-fit-content"
          gap={100}
          marginBottom={40}
          align="center"
          justify="start"
        >
          <Text color="#16404D"></Text>
          <Box
            display="flex"
            flexDirection="row"
            borderRadius={10}
            bg="#96BAB3"
          >
            <Icon
              as={FiMoreHorizontal}
              boxSize={10}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
            />
            <Text
              color="#16404D"
              p={2}
              borderRadius={10}
              fontWeight="bold"
              textAlign="center"
            >
              My Collection
            </Text>
          </Box>

          <Text
            cursor="pointer"
            color="#16404D"
            bg="#A6CDC6"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/")}
          >
            Back
          </Text>
        </Flex>
      </Flex>
      <Text color="#16404D" fontWeight="bold" fontSize="3xl">
        My Collection
      </Text>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={10}
        m="auto"
        w="80%"
        h="auto"
        mt={10}
      >
        {makeShow(data)}
      </Grid>
      <Box mt={10} display="flex" justifyContent="center">
        <Button
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
          onClick={handleDeleteAll}
        >
          Delete all
        </Button>
      </Box>
    </Box>
  );
}
