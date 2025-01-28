import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PopUpShow from "./popUpShow";
import { Slider } from "../../components/ui/slider";
import {
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  Circle,
  Button,
  Separator,
} from "@chakra-ui/react";
import { Pixer, filterIcon, myProIcon } from "../../Logo/logo";
export default function Filltering() {
  //*******Variable*********//
  //Navigate
  const navigate = useNavigate();

  //Location
  const location = useLocation();

  //img Variable
  const [imageSrc, setImageSrc] = useState(null);
  const [fSrc, setFSrc] = useState(null);
  const [imageName, setImageName] = useState("non");
  const canvasRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const [rgbImageSrc, setRgbImageSrc] = useState(null);

  //Filter Variable
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
  const [filterShow, setFilterShow] = useState({
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
  const warmSet = { r: 1.4, g: 1.2, b: 0.8 };
  const coldSet = { r: 0.8, g: 1, b: 1.5 };
  const bwSet = {
    brightness: 1,
    greyscale: 1,
    contrast: 1.3,
    saturation: 1,
  };

  //Pop up variable
  const [data, dataSet] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  //*******Funtion*********//
  //Download
  const handleDownLoad = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "edited-image.png";
    link.click();
  };

  //Reset Filter
  const handleResetFill = () => {
    setFilterSettings(defaultFilter[1]);
    setFilterShow(defaultFilter[1]);
  };
  const handleResetRGB = () => {
    setRgbFilter(defaultFilter[0]);
    setRgbShow(defaultFilter[0]);
  };

  const handleSetRGB = () => {
    setRgbShow(rgbSample);
    setRgbFilter(rgbSample);
  };

  const handleSetWarm = () => {
    setRgbShow(warmSet);
    setRgbFilter(warmSet);
  };

  const handleSetCold = () => {
    setRgbShow(coldSet);
    setRgbFilter(coldSet);
  };

  const handleSetBW = () => {
    setFilterSettings(bwSet);
    setFilterShow(bwSet);
  };

  //Upload
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
  //Upload.Ref
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

  //Set Filter
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

  //Save Project
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
      saveToDB(event, response.data.path);
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    }
  };
  const saveToDB = async (event, path) => {
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
      setFilterSettings(location.state.project.filter);
      setFilterShow(location.state.project.filter);
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

  //PopUp Collection
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

  useEffect(() => {
    getLocalData();
  }, []);

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
              as={filterIcon}
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

          <Box
            display="flex"
            flexDirection="row"
            borderRadius={10}
            _hover={{ bg: "#96BAB3", cursor: "pointer" }}
            onClick={() => navigate("/myProject")}
          >
            <Icon
              as={myProIcon}
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
              My Project
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
          zIndex={99}
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
          align="start"
          justify="center"
          mt={10}
          gap={3}
          direction={"column"}
          ml={10}
        >
          <Flex
            bg={"#A6CDC6"}
            direction={"column"}
            p={5}
            borderRadius={25}
            gap={2}
          >
            {" "}
            <Text color="#16404D" fontWeight="bold" fontSize="xl">
              RGB Reference Image
            </Text>
            <img
              src={rgbImageSrc}
              alt="RGB Reference"
              style={{
                maxWidth: "250px",
                minWidth: "250px",
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
        </Flex>
      )}

      {imageSrc && (
        <Flex
          align="center"
          justify="space-evenly"
          mt={10}
          gap={10}
          direction={"row"}
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
            gap={10}
            direction={"column"}
          >
            <Flex gap={5} align="center" justify="center">
              <Text color="#16404D" fontWeight="bold" fontSize={"2xl"}>
                Filter set :
              </Text>
              <Button
                size="lg"
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={handleSetWarm}
              >
                Warm style
              </Button>
              <Button
                size="lg"
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={handleSetCold}
              >
                cold style
              </Button>
              <Button
                size="lg"
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={handleSetBW}
              >
                Black & White
              </Button>
            </Flex>
            <Flex
              gap={5}
              bg="#A6CDC6"
              borderRadius={50}
              p={5}
              width="-webkit-fit-content"
              boxShadow="md"
              justify={"center"}
              align={"center"}
            >
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 50%, white 50%)"
                  width="50%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"15%"} color={"white"}>{`R`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${rgbShow.r.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[rgbShow.r]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="red"
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
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 50%, white 50%)"
                  width="50%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"15%"} color={"white"}>{`G`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${rgbShow.g.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[rgbShow.g]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="green"
                  onValueChange={(e) =>
                    setRgbShow({
                      ...rgbShow,
                      g: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setRgbFilter({
                      ...rgbFilter,
                      g: parseFloat(e.value),
                    })
                  }
                />
              </Flex>

              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 50%, white 50%)"
                  width="50%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"15%"} color={"white"}>{`B`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${rgbShow.b.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[rgbShow.b]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="blue"
                  onValueChange={(e) =>
                    setRgbShow({
                      ...rgbShow,
                      b: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setRgbFilter({
                      ...rgbFilter,
                      b: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Button onClick={handleResetRGB}>Reset</Button>
            </Flex>
            <Flex
              gap={5}
              bg="#A6CDC6"
              borderRadius={50}
              p={5}
              width="-webkit-fit-content"
              boxShadow="md"
              justify={"center"}
              align={"center"}
            >
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 65%, white 50%)"
                  width="100%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"5%"} color={"white"}>{`Brightness`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${filterShow.brightness.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[filterShow.brightness]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="white"
                  onValueChange={(e) =>
                    setFilterShow({
                      ...filterShow,
                      brightness: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setFilterSettings({
                      ...filterSettings,
                      brightness: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 65%, white 50%)"
                  width="100%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"5%"} color={"white"}>{`Greyscale`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${filterShow.greyscale.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[filterShow.greyscale]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="white"
                  onValueChange={(e) =>
                    setFilterShow({
                      ...filterShow,
                      greyscale: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setFilterSettings({
                      ...filterSettings,
                      greyscale: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 65%, white 50%)"
                  width="100%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"5%"} color={"white"}>{`Contrast`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${filterShow.contrast.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[filterShow.contrast]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="white"
                  onValueChange={(e) =>
                    setFilterShow({
                      ...filterShow,
                      contrast: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setFilterSettings({
                      ...filterSettings,
                      contrast: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Flex direction={"column"} gap={3}>
                <Flex
                  color="#16404D"
                  fontWeight="bold"
                  fontSize="xl"
                  background="linear-gradient(to right, black 65%, white 50%)"
                  width="100%"
                  h="-moz-fit-content"
                  pr={2}
                  pl={2}
                  borderRadius={50}
                  textAlign="center"
                  alignItems={"center"}
                  justify={"space-between"}
                  boxShadow="md"
                >
                  <Text pb={0.5} ml={"5%"} color={"white"}>{`Saturation`}</Text>
                  <Text pb={0.5} mr={"5%"}>
                    {" "}
                    {`${filterShow.saturation.toFixed(1)}`}
                  </Text>
                </Flex>
                <Slider
                  value={[filterShow.saturation]}
                  step={0.1}
                  min={0}
                  max={2}
                  w={200}
                  colorPalette="white"
                  onValueChange={(e) =>
                    setFilterShow({
                      ...filterShow,
                      saturation: parseFloat(e.value),
                    })
                  }
                  onValueChangeEnd={(e) =>
                    setFilterSettings({
                      ...filterSettings,
                      saturation: parseFloat(e.value),
                    })
                  }
                />
              </Flex>
              <Button onClick={handleResetFill}>Reset</Button>
            </Flex>
            <Flex gap={5}>
              <Button
                size="lg"
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={handleUploadToCom}
              >
                Save to My Projects
              </Button>
              <Button
                size="lg"
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={handleDownLoad}
              >
                Download
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
