import axios from "axios";
import { Button, Card, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CollectionShow({ dlt, id }) {
  //*******Variable*********//
  const [isHover, setIsHover] = useState(false);
  const [linkImg, setLink] = useState("");

  //*******Funtions*********//
  const hendleClick = () => {
    dlt(id);
  };
  const fetchData = async (maxRetries = 5, delay = 2000) => {
    let attempts = 0;
    while (attempts < maxRetries) {
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
      borderRadius={10}
      h={"100%"}
      alignItems={"center"}
      position={"relative"}
    >
      <Image
        w={"100%"}
        maxH={200}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        _hover={{
          transition: "all 0.3s",
          maxH: "80%",
          maxW: "80%",
          transform: "scale(2)",
          position: "absolute",
          zIndex: 99,
          boxShadow: "md",
          borderRadius: 50,
        }}
        src={`${linkImg}`}
      />
      <Card.Body>
        <Card.Title
          color="white"
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
        <Button
          onClick={() => window.open(linkImg, "_blank")}
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
        >
          Look photo
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
