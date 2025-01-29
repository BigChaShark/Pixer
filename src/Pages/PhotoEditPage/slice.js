import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  GridItem,
  Circle,
  Button,
  Input,
} from "@chakra-ui/react";
import { Pixer, sliceIcon } from "../../Logo/logo";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";
import axios from "axios";
import React, { useState } from "react";
import { successToast, warningToast, errorToast } from "../../Toast/toastShow";
import "cropperjs/dist/cropper.css";
export default function Slice() {
  //*******Variable*********//
  const [image, setImage] = useState(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [slices, setSlices] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  //*******Function*********//
  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFromLink = async () => {
    try {
      const response = await axios.get(link, { responseType: "blob" });
      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (error) {
      errorToast("Error to upload", error.message);
    }
  };

  const splitImage = () => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const partWidth = img.width / cols;
      const partHeight = img.height / rows;

      const newSlices = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          canvas.width = partWidth;
          canvas.height = partHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            c * partWidth,
            r * partHeight,
            partWidth,
            partHeight,
            0,
            0,
            partWidth,
            partHeight
          );
          newSlices.push(canvas.toDataURL());
        }
      }
      setSlices(newSlices);
    };
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
          <img
            style={{ marginLeft: "5%", marginTop: "10%", height: "70%" }}
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
              as={sliceIcon}
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
              Slice
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
        Image Slicer
      </Text>
      <Flex align="center" mt={10} gap={5}>
        <Button
          as="label"
          htmlFor="file-upload"
          colorScheme="teal"
          size="lg"
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
        >
          Upload File
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          id="file-upload"
          style={{ display: "none" }}
        />
        <Input
          placeholder="link here"
          color="#16404D"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          w={300}
        />
        <Button
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
          ml={-5}
          onClick={uploadFromLink}
        >
          Upload with link
        </Button>
      </Flex>
      {image && (
        <Flex align="center" justify="start" mt={10} gap={10}>
          <Flex align="center" gap={2}>
            <Text color="#16404D" fontWeight="bold" fontSize="2xl">
              Row :
            </Text>
            <NumberInputRoot
              color="#16404D"
              width={100}
              value={rows}
              onValueChange={(e) => setRows(e.value)}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Flex>
          <Flex align="center" gap={2}>
            <Text color="#16404D" fontWeight="bold" fontSize="2xl">
              Columns :
            </Text>
            <NumberInputRoot
              color="#16404D"
              width={100}
              value={cols}
              onValueChange={(e) => setCols(e.value)}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Flex>
          <Button
            bg="#16404D"
            color="#DDA853"
            fontWeight="bold"
            onClick={splitImage}
          >
            Split Image
          </Button>
        </Flex>
      )}
      <Grid
        templateColumns={`repeat(${cols},1fr)`}
        templateRows={`repeat(${rows},1fr)`}
        gap={0}
        w={600}
        h="auto"
        m="auto"
        mt={10}
        justifyContent="center"
        alignItems="center"
      >
        {slices.map((slice, index) => (
          <GridItem key={index} position="relative" margin={2}>
            <img src={slice} alt={`Slice ${index}`} style={{ width: "100%" }} />
            <a
              href={slice}
              download={`slice-${index + 1}.png`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                textDecoration: "none",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              Download slice {index + 1}
            </a>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
