import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PopUpShow from "./popUpShow";
import {
  FiEdit,
  FiPackage,
  FiFilter,
  FiFolder,
  FiMoreHorizontal,
  HiUpload,
} from "react-icons/fi";
import { Slider } from "../../components/ui/slider";
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
  Separator,
} from "@chakra-ui/react";

export default function Filltering() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [fSrc, setFSrc] = useState(null);
  const [imageName, setImageName] = useState("non");
  const [rgbName, setrgbName] = useState("non");
  const [rgbFilter, setRgbFilter] = useState({ r: 1, g: 1, b: 1 });
  const [rgbShow, setRgbShow] = useState({ r: 1, g: 1, b: 1 });
  const [rgbSample, setRgbSample] = useState({ r: 1, g: 1, b: 1 });
  const [filterSettings, setFilterSettings] = useState({
    brightness: 1,
    greyscale: 0,
    contrast: 1,
    saturation: 1,
  });
  const defaultFilter = [
    { r: 1, g: 1, b: 1 },
    {
      brightness: 1,
      greyscale: 0,
      contrast: 1,
      saturation: 1,
    },
  ];

  const canvasRef = useRef(null);
  const [rgbImageSrc, setRgbImageSrc] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const location = useLocation();

  const handleReset = () => {
    setRgbFilter(defaultFilter[0]);
    setFilterSettings(defaultFilter[1]);
  };

  const handleSetRGB = () => {
    setRgbFilter(rgbSample);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFSrc(e.target.files[0]);
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: mimeType });
    return file;
  };
  const handleImageLink = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      urlToFile(url, "image.jpg", "image/jpeg").then((file) => {
        setFSrc(file);
      });
      setImageName("Image from link");
      setImageSrc(url);
    }
  };
  //////EX
  const handleRgbImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setrgbName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setRgbImageSrc(event.target.result);
        extractRgbFromImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractRgbFromImage = (imageSrcToAnalyze) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrcToAnalyze;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let totalR = 0,
        totalG = 0,
        totalB = 0,
        pixelCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        totalR += data[i]; // Red
        totalG += data[i + 1]; // Green
        totalB += data[i + 2]; // Blue
        pixelCount++;
      }

      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;

      setRgbSample({
        r: avgR / 255,
        g: avgG / 255,
        b: avgB / 255,
      });
    };
  };

  const applyFilter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    image.onload = () => {
      const scaleFactor = 1;
      canvas.width = image.width * scaleFactor;
      canvas.height = image.height * scaleFactor;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(data[i] * rgbFilter.r, 255);
        data[i + 1] = Math.min(data[i + 1] * rgbFilter.g, 255);
        data[i + 2] = Math.min(data[i + 2] * rgbFilter.b, 255);
      }

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(data[i] * filterSettings.brightness, 255);
        data[i + 1] = Math.min(data[i + 1] * filterSettings.brightness, 255);
        data[i + 2] = Math.min(data[i + 2] * filterSettings.brightness, 255);
      }

      if (filterSettings.greyscale > 0) {
        for (let i = 0; i < data.length; i += 4) {
          const grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] =
            grey * filterSettings.greyscale +
            data[i] * (1 - filterSettings.greyscale);
          data[i + 1] =
            grey * filterSettings.greyscale +
            data[i + 1] * (1 - filterSettings.greyscale);
          data[i + 2] =
            grey * filterSettings.greyscale +
            data[i + 2] * (1 - filterSettings.greyscale);
        }
      }

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(
          (data[i] - 128) * filterSettings.contrast + 128,
          255
        );
        data[i + 1] = Math.min(
          (data[i + 1] - 128) * filterSettings.contrast + 128,
          255
        );
        data[i + 2] = Math.min(
          (data[i + 2] - 128) * filterSettings.contrast + 128,
          255
        );
      }

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg + (data[i] - avg) * filterSettings.saturation;
        data[i + 1] = avg + (data[i + 1] - avg) * filterSettings.saturation;
        data[i + 2] = avg + (data[i + 2] - avg) * filterSettings.saturation;
      }

      ctx.putImageData(imageData, 0, 0);
    };
  };

  //////Save Project

  const handleUploadToCom = async (event) => {
    event.preventDefault();
    if (!fSrc) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", fSrc);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImagePath(response.data.path);
      saveToDB(event, response.data.path);
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    }
  };
  const saveToDB = async (event, path) => {
    event.preventDefault();
    try {
      const name = prompt("Project Name");
      const projectData = {
        id: Date.now(),
        image: path,
        name: `Project : ${name}`,
        date: new Date().toISOString(),
        rgb: rgbFilter,
        filter: filterSettings,
      };
      await axios.post("http://localhost:3001/project", projectData);
      alert("Saved to My Projects");
    } catch (error) {
      console.error(error);
      alert("Error saving to My Projects");
    }
  };

  useEffect(() => {
    if (location.state?.project) {
      const url = location.state.project.image;
      setImageSrc(url);
      setRgbFilter(location.state.project.rgb);
      setRgbShow(location.state.project.rgb);
      urlToFile(url, "image.jpg", "image/jpeg").then((file) => {
        setFSrc(file);
      });
      setFilterSettings(location.state.project.filter);
    }
  }, [location]);

  useEffect(() => {
    if (imageSrc) {
      applyFilter();
    }
  }, [rgbFilter, imageSrc, filterSettings]);

  //PopUp
  const [data, dataSet] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const getLocalData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/img");
      dataSet(res.data);
    } catch (error) {
      return console.log("Error" + error);
    }
  };
  const handleClickSelect = (url, id) => {
    if (url) {
      setrgbName(`Collection id : ${id}`);
      togglePopup();
      setRgbImageSrc(url);
      extractRgbFromImage(url);
    }
  };
  useEffect(() => {
    getLocalData();
  }, []);
  const popupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxHeight: "80vh",
      width: "50vw",
      overflowY: "auto",
    },
  };
  const makeShow = (x) => {
    return x.map((x) => (
      <PopUpShow
        key={x.id}
        sel={handleClickSelect}
        id={x.id}
        isSel={false}
      ></PopUpShow>
    ));
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
              Filtering
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
        Image Filter
      </Text>
      <Flex align="center" mt={5} gap={5}>
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
          onChange={handleImageUpload}
        />
        <Button
          size="lg"
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
          onClick={handleImageLink}
        >
          Upload from Link
        </Button>
        <Text
          color={"#16404D"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >{`File Target : ${imageName}`}</Text>
      </Flex>
      <Separator mt={10} mb={10} size={"lg"} />
      <Text color={"#16404D"} fontSize={"xl"} fontWeight={"bold"}>
        Upload Image for RGB Reference
      </Text>
      <Flex align="center" mt={5} gap={5}>
        <Button
          as="label"
          htmlFor="file-upload-RGB"
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
          id="file-upload-RGB"
          style={{ display: "none" }}
          onChange={handleRgbImageUpload}
        />
        <Button
          size="lg"
          bg="#16404D"
          color="#DDA853"
          fontWeight="bold"
          onClick={togglePopup}
        >
          Use Collection
        </Button>
        <Text
          color={"#16404D"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >{`File RGB Target : ${rgbName}`}</Text>
      </Flex>

      {isPopupVisible && (
        <Box
          display="flex"
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg={"#fdf8e5"}
            padding="20px"
            borderRadius="8px"
            boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
            textAlign="center"
            maxHeight="80vh"
            width="50vw"
            overflowY="auto"
          >
            <Text color={"#16404D"} fontSize={"xl"} fontWeight={"bold"}>
              Collection
            </Text>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={10}
              m="auto"
              w="80%"
              h="auto"
              mt={10}
            >
              {makeShow(data)}
            </Grid>
            <Button
              mt={10}
              size="lg"
              bg="#16404D"
              color="#DDA853"
              fontWeight="bold"
              onClick={togglePopup}
            >
              Cancle
            </Button>
          </Box>
        </Box>
      )}
      {rgbImageSrc && (
        <Flex
          align="center"
          justify="center"
          mt={10}
          gap={3}
          direction={"column"}
        >
          <Text color="#16404D" fontWeight="bold" fontSize="xl">
            RGB Reference Image
          </Text>
          <img
            src={rgbImageSrc}
            alt="RGB Reference"
            style={{
              maxWidth: "800px",
              minWidth: "500px",
              height: "auto",
              border: "1px solid black",
              marginTop: "20px",
            }}
          />
          <Button
            size="lg"
            bg="#16404D"
            color="#DDA853"
            fontWeight="bold"
            onClick={handleSetRGB}
          >
            Set RGB
          </Button>
        </Flex>
      )}

      {imageSrc && (
        <Flex
          align="center"
          justify="center"
          mt={10}
          gap={3}
          direction={"column"}
        >
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid black",
              maxWidth: "800px",
              minWidth: "500px",
            }}
          />
          <Flex
            align="center"
            justify="center"
            mt={10}
            gap={3}
            direction={"column"}
          >
            <Flex gap={5}>
              <Flex direction={"column"}>
                <Text color="#16404D" fontWeight="bold" fontSize="xl">
                  R : {rgbShow.r}
                </Text>
                <Slider
                  value={[rgbShow.r]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  onValueChange={(e) =>
                    setRgbShow({
                      ...rgbShow,
                      r: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setRgbFilter({
                      ...rgbFilter,
                      r: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Flex direction={"column"}>
                <Text color="#16404D" fontWeight="bold" fontSize="xl">
                  G : {rgbFilter.g}
                </Text>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={rgbFilter.g}
                  onChange={(e) =>
                    setRgbFilter({
                      ...rgbFilter,
                      g: parseFloat(e.target.value),
                    })
                  }
                />
              </Flex>

              <Flex direction={"column"}>
                <Text color="#16404D" fontWeight="bold" fontSize="xl">
                  B : {rgbFilter.b}
                </Text>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={rgbFilter.b}
                  onChange={(e) =>
                    setRgbFilter({
                      ...rgbFilter,
                      b: parseFloat(e.target.value),
                    })
                  }
                />
              </Flex>
            </Flex>

            <br />
            <label>
              Brightness:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={filterSettings.brightness}
                onChange={(e) =>
                  setFilterSettings({
                    ...filterSettings,
                    brightness: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Greyscale:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={filterSettings.greyscale}
                onChange={(e) =>
                  setFilterSettings({
                    ...filterSettings,
                    greyscale: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Contrast:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={filterSettings.contrast}
                onChange={(e) =>
                  setFilterSettings({
                    ...filterSettings,
                    contrast: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Saturation:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={filterSettings.saturation}
                onChange={(e) =>
                  setFilterSettings({
                    ...filterSettings,
                    saturation: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <button onClick={handleReset}>Reset</button>
          </Flex>
          <div style={{ marginTop: "20px" }}>
            <Button onClick={handleUploadToCom}>Save to My Projects</Button>
          </div>
          {console.log(rgbFilter)}
        </Flex>
      )}
    </Box>
  );
}
