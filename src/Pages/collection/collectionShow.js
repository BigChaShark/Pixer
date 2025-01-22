import axios from "axios";
import {
  FiEdit,
  FiPackage,
  FiFilter,
  FiFolder,
  FiMoreHorizontal,
  HiUpload,
} from "react-icons/fi";
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
  Input,
  Select,
  HStack,
  Spinner,
  Image,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CollectionShow({ dlt, id }) {
  const [isHover, setIsHover] = useState(false);
  const [linkImg, setLink] = useState("");
  //const [nameImg, setNameImg] = useState("");
  const hendleClick = () => {
    dlt(id);
  };
  const fetchData = async (maxRetries = 5, delay = 2000) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      console.log(attempts);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&id=${id}`
        );
        if (response.data.hits && response.data.hits.length > 0) {
          setLink(response.data.hits[0].largeImageURL);

          return;
        } else {
          window.alert("No RS pleas type AG");
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

  return (
    <Card.Root
      overflow={isHover ? "none" : "hidden"}
      boxShadow="md"
      bg="#A6CDC6"
      borderRadius={10}
      h={80}
      position={"relative"}
    >
      <Image
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        src={linkImg}
        _hover={{
          transition: "all 0.3s",
          maxH: "none",
          transform: "scale(2)",
          position: "absolute",
          zIndex: 99,
          boxShadow: "md",
          borderRadius: 50,
        }}
        h="75%"
      />
      <Card.Body>
        <Card.Title
          color="#16404D"
          fontWeight="bold"
        >{`Image : ${id}`}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={hendleClick}
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
        >
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
