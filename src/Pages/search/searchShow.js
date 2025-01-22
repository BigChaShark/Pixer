import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
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
  Image,
  CardBody,
} from "@chakra-ui/react";

export default function SearchShow({ id, img }) {
  const [isHover, setIsHover] = useState(false);
  const addCollection = async () => {
    try {
      await axios.get("http://localhost:3001/img").then(async (res) => {
        const isFound = res.data.some((x) => x.id === id);
        if (!isFound) {
          console.log("im in");
          await axios.post("http://localhost:3001/img", {
            id: id,
          });
        } else {
          alert("it same you have now");
          console.log("it same");
        }
      });
    } catch (error) {
      console.log("Error" + error);
    }
  };

  return (
    <Card.Root
      overflow={isHover ? "none" : "hidden"}
      boxShadow="md"
      borderRadius={10}
      h={80}
      position={"relative"}
    >
      <Image
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        _hover={{
          transition: "all 0.3s",
          maxH: "none",
          transform: "scale(2)",
          position: "absolute",
          zIndex: 99,
          boxShadow: "md",
          borderRadius: 50,
        }}
        src={`${img}`}
        h="75%"
      />
      <Card.Body>
        <Card.Title
          color="White"
          fontWeight="bold"
        >{`Image : ${id}`}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={addCollection}
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
        >
          {" "}
          Add to Collect
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
