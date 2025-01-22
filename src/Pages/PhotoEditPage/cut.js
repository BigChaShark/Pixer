import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@chakra-ui/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
export default function Cut() {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [format, setFormat] = useState("png");
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFromLink = async () => {
    try {
      const response = await axios.get(link, { responseType: "blob" });
      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
      setImageSize({ width: imageUrl.width, height: imageUrl.height });
    } catch (error) {
      alert("can't upload : " + error.message);
    }
  };

  const onCropAndDownload = () => {
    if (cropper) {
      const croppedImage = cropper
        .getCroppedCanvas()
        .toDataURL(`image/${format}`);
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = `cropped-image.${format}`;
      link.click();
    }
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
              Cut
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
        Image Cropper
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
          id="file-upload"
          style={{ display: "none" }}
          onChange={onUpload}
        />
        <Input
          type="text"
          placeholder="link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Button
          onClick={uploadFromLink}
          ml={-8}
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
        >
          Upload with link
        </Button>
      </Flex>
      <Flex align="center" justify="center" mt={10}>
        {image && (
          <Cropper
            src={image}
            style={{
              width: 500,
              height: 500,
            }}
            guides={true}
            onInitialized={(instance) => setCropper(instance)}
          />
        )}
      </Flex>
      <Flex align="center" justify="start" mt={10}>
        <Text color="#16404D" fontWeight="bold" fontSize="3xl">
          Select your format
        </Text>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{
            marginLeft: 30,
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
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
        <Button
          ml={5}
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
          onClick={onCropAndDownload}
        >
          Cut and Download
        </Button>
      </Flex>
    </Box>
  );
}