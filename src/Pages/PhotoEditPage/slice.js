import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import React, { useState } from "react";
import "cropperjs/dist/cropper.css";
export default function Slice() {
  const [image, setImage] = useState(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [slices, setSlices] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
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
      alert("can't upload : " + error.message);
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
      <h1>Image Cropper</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
      <input type="file" accept="image/*" onChange={onUpload} />
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={uploadFromLink}>Upload with link</button>
      </div>
      {image && (
        <>
          <div>
            <label>Rows:</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
            />
          </div>
          <div>
            <label>Columns:</label>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
            />
          </div>
          <button onClick={splitImage}>Split Image</button>
        </>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols},1fr)`,
          gridTemplateRows: `repeat(${rows},1fr)`,
          justifyContent: "center",
        }}
      >
        {slices.map((slice, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "5px",
            }}
          >
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
                maxHeight: "25%",
              }}
            >
              Download slice {index + 1}
            </a>
          </div>
        ))}
      </div>
    </Box>
  );
}