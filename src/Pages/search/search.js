import { useNavigate } from "react-router-dom";
import SearchShow from "./searchShow";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Grid,
  Circle,
  Button,
  Input,
  HStack,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Pixer, findIcon, colIcon } from "../../Logo/logo";
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  PaginationItems,
} from "../../components/ui/pagination";

export default function Search() {
  //*******Variable*********//
  //Navigate
  const navigate = useNavigate();

  //API PixarBay variable
  const [page, setPage] = useState(1);
  const [onLoad, setOnLoad] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [pixarData, pixarDataSet] = useState([]);

  //Search Variable
  const [inputValue, setInputValue] = useState("");
  const [selectedColorsOption, setSelectedColorsOption] = useState("");
  const [colorsOptions] = useState([
    "red",
    "yellow",
    "blue",
    "black",
    "white",
    "transparent",
  ]);
  const [selectedImgTypeOption, setSelectedImgTypeOption] = useState("");
  const [ImageTypeOptions] = useState(["photo", "illustration", "vector"]);

  //*******Function*********//
  //API Fetch
  const fetchData = async (
    maxRetries = 5,
    delay = 2000,
    q = "yellow+flowers",
    color = "yellow",
    img_type = "all",
    page = 1
  ) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      setOnLoad(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&q=${q}&colors=${color}&image_type=${img_type}&page=${page}&per_page=20`
        );
        if (response.data.totalHits <= 0) {
        }
        if (response.data.hits && response.data.hits.length > 0) {
          setTotalHits(response.data.totalHits);
          pixarDataSet(response.data.hits);

          return;
        } else {
          window.alert("No RS pleas type AG");
          return;
        }
      } catch (err) {
        console.error(`Error`, err.message);
      } finally {
        setTimeout(() => {
          setOnLoad(false);
        }, 1000);
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //Set Search Filter
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSelectColorsChange = (event) => {
    setSelectedColorsOption(event.target.value);
  };
  const handleSelectImgTypeChange = (event) => {
    setSelectedImgTypeOption(event.target.value);
  };
  const handleSubmit = (event) => {
    setPage(1);
    event.preventDefault();
    fetchData(
      5,
      2000,
      inputValue,
      selectedColorsOption,
      selectedImgTypeOption,
      page
    );
  };

  //Show Data
  const MakeShow = (data) => {
    return data.map((x) => {
      return <SearchShow key={x.id} id={x.id} img={x.largeImageURL} />;
    });
  };

  return (
    <Box bg="#fdf8e5" minH="100vh" p={4}>
      <Flex align="center" mb={20}>
        <Circle
          size={350}
          bg="#A6CDC6"
          ml={-20}
          mt={-20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          zIndex={3}
        >
          <Image ml={5} mt={8} h={"70%"} src={Pixer} />
        </Circle>
        <Circle
          size={350}
          bg="#A6CDC6"
          ml={-20}
          mt={-20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"md"}
        ></Circle>
        <Flex
          ml={-20}
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
              as={findIcon}
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
              Find Inspired
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            borderRadius={10}
            cursor="pointer"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/collection")}
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
              To Collection
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
        Find Inspired Page
      </Text>
      <Flex>
        <form onSubmit={handleSubmit}>
          <Input
            color="#16404D"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
            w={300}
            mr={30}
          />
          <select
            value={selectedColorsOption}
            onChange={handleSelectColorsChange}
            style={{
              marginRight: 30,
              padding: 10,
              borderRadius: "10px",
              backgroundColor: "#96BAB3",
              color: "#16404D",
              fontWeight: "bold",
              align: "center",
              justify: "start",
              alignSelf: "center",
            }}
          >
            <option value="">Select color "All"</option>
            {colorsOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedImgTypeOption}
            onChange={handleSelectImgTypeChange}
            style={{
              marginRight: 30,
              padding: 10,
              borderRadius: "10px",
              backgroundColor: "#96BAB3",
              color: "#16404D",
              fontWeight: "bold",
              align: "center",
              justify: "start",
              alignSelf: "center",
            }}
          >
            <option value="">Select image type "All"</option>
            {ImageTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button type="submit" bg="#16404D" color="#DDA853" fontWeight="bold">
            Submit
          </Button>
        </form>
      </Flex>
      {onLoad ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={10}
          m="auto"
          w="80%"
          h="auto"
          mt={10}
        >
          {MakeShow(pixarData)}
        </Grid>
      )}

      <Box mt={10} display="flex" justifyContent="center">
        <PaginationRoot
          page={page}
          count={totalHits}
          pageSize={20}
          defaultPage={1}
          color="#16404D"
          onPageChange={(e) => {
            setPage(e.page);
            fetchData(
              5,
              2000,
              inputValue,
              selectedColorsOption,
              selectedImgTypeOption,
              page
            );
          }}
        >
          <HStack gap="4">
            <PaginationPrevTrigger color="#16404D" />
            <PaginationItems color="#16404D" />
            <PaginationNextTrigger color="#16404D" />
          </HStack>
        </PaginationRoot>
      </Box>
    </Box>
  );
}
