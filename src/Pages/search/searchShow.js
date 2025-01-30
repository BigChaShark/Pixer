import { useState } from "react";
import axios from "axios";
import { Button, Card, Image } from "@chakra-ui/react";
import { successToast, warningToast, errorToast } from "../../Toast/toastShow";
import db from "../../db";

export default function SearchShow({ id, img }) {
  //*******Variable*********//
  const [isHover, setIsHover] = useState(false);
  //*******Funtion*********//
  const addCollection = async () => {
    try {
      const isFound = await db.images.get(id);
      if (!isFound) {
        await db.images.put({ id, data: img });
        successToast(
          "Save to Collection",
          "Succesfully save image to collection"
        );
      } else {
        warningToast(
          "Same collection!!",
          "You already have this image in collection"
        );
      }
    } catch (error) {
      errorToast("Error", `${error}`);
    }
  };

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
        src={`${img}`}
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
          Add to Collect
        </Button>
        <Button
          onClick={() => window.open(img, "_blank")}
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
