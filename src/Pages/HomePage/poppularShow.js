import { Text, VStack, Card, Image } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
export default function PopularShow({ id, img, imgL }) {
  //*******Variable*********//
  const [isHover, setIsHover] = useState(false);

  //*******Funtion*********//
  const addCollection = async () => {
    try {
      await axios.get("http://localhost:3001/img").then(async (res) => {
        const isFound = res.data.some((x) => x.id === id);
        if (!isFound) {
          alert("Done");
          await axios.post("http://localhost:3001/img", {
            id: id,
          });
        } else {
          alert("It same you have now");
        }
      });
    } catch (error) {
      console.log("Error" + error);
    }
  };

  return (
    <VStack>
      <Card.Root
        maxW="sm"
        overflow={isHover ? "none" : "hidden"}
        boxShadow="md"
        borderRadius={10}
        bg="#A6CDC6"
        alignItems={"center"}
        position={"relative"}
      >
        <Image
          alt={`${imgL}`}
          src={`${imgL}`}
          bg={"blackAlpha.800"}
          maxH={100}
          w={"100%"}
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
        />
        <Card.Body gap={2}>
          <Card.Title
            textAlign="center"
            color="#16404D"
          >{`Image : ${id}`}</Card.Title>
        </Card.Body>
        <Card.Footer gap={2}>
          <Text
            cursor="pointer"
            color="#DDA853"
            bg="#16404D"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            onClick={addCollection}
          >
            Add to Collect
          </Text>
          <Text
            onClick={() => window.open(imgL, "_blank")}
            cursor="pointer"
            color="#DDA853"
            bg="#16404D"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
          >
            Look photo
          </Text>
        </Card.Footer>
      </Card.Root>
    </VStack>
  );
}
