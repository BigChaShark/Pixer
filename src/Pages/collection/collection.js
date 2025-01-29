import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  Circle,
  Button,
  Spinner,
  Image,
  VStack,
} from "@chakra-ui/react";
import { successToast, warningToast, errorToast } from "../../Toast/toastShow";
import CollectionShow from "./collectionShow";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pixer, colIcon } from "../../Logo/logo";
export default function Collection() {
  //*******Variable*********//
  //Data
  const [data, dataSet] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  //*******Function*********//

  const getLocalData = async () => {
    setOnLoad(true);
    try {
      const res = await axios.get("http://localhost:3001/img");
      dataSet(res.data);
    } catch (error) {
      return console.log("Error" + error);
    } finally {
      setTimeout(() => {
        setOnLoad(false);
      }, 1000);
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
      successToast(
        "Delete All collection",
        "Succesfully delete all image from collection"
      );
      await getLocalData();
    } catch (error) {
      console.log("error" + error);
    }
  };
  const handleClickIDDelete = async (id) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3001/img/${id}`);
        successToast(
          "Delete collection",
          "Succesfully delete image from collection"
        );
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
        <Circle
          size={{
            base: 150,
            sm: 150,
            md: 250,
            lg: 350,
          }}
          bg="#A6CDC6"
          ml={{
            base: 0,
            sm: 0,
            md: 0,
            lg: -20,
          }}
          mt={{
            base: 0,
            sm: 0,
            md: 0,
            lg: -20,
          }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          zIndex={3}
        >
          <Image
            ml={{
              base: 0,
              sm: 0,
              md: 0,
              lg: 10,
            }}
            mt={{
              base: 0,
              sm: 0,
              md: 0,
              lg: 8,
            }}
            h={"70%"}
            src={Pixer}
          />
        </Circle>
        <Circle
          size={{
            base: 150,
            sm: 150,
            md: 250,
            lg: 350,
          }}
          bg="#A6CDC6"
          ml={{
            base: 0,
            sm: 0,
            md: 0,
            lg: -20,
          }}
          mt={{
            base: 0,
            sm: 0,
            md: 0,
            lg: -20,
          }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"md"}
        ></Circle>
        <Text
          display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
          cursor="pointer"
          color="#16404D"
          bg="#A6CDC6"
          ml={5}
          p={2}
          borderRadius={10}
          fontWeight="bold"
          textAlign="center"
          _hover={{ bg: "#96BAB3" }}
          onClick={() => navigate("/")}
        >
          Home
        </Text>
        <Flex
          ml={-20}
          display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
          bg="#A6CDC6"
          borderRadius={50}
          p={5}
          width="-webkit-fit-content"
          gap={100}
          marginBottom={40}
          align="start"
          boxShadow={"md"}
        >
          <Text color="#16404D"></Text>
          <Box
            display="flex"
            flexDirection="row"
            borderRadius={10}
            bg="#96BAB3"
          >
            <Icon
              as={colIcon}
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
      {onLoad ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={10}
          m="auto"
          w="80%"
          h="auto"
          mt={10}
        >
          {makeShow(data)}
        </Grid>
      )}
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
