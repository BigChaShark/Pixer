import axios from "axios";
import { useEffect, useState } from "react";

import { Button, Card, Image } from "@chakra-ui/react";
export default function PopUpShow({ sel, id }) {
  //*******Variable*********//
  const [linkImg, setLink] = useState("");

  //*******Funtions*********//
  const hendleClick = () => {
    sel(linkImg, id);
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
      overflow="hidden"
      boxShadow="md"
      bg="#A6CDC6"
      borderRadius={10}
      h={80}
    >
      <Image h="75%" src={linkImg} />
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
          Select
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
