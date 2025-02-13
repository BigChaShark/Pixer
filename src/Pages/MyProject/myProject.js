import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  Circle,
  Button,
  Card,
  Image,
} from "@chakra-ui/react";
import { successToast, warningToast, errorToast } from "../../Toast/toastShow";
import { Pixer, myProIcon } from "../../Logo/logo";
import db from "../../db";
export default function MyProject() {
  //*******Variable*********//
  const [projects, setProjects] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  //*******Funtion*********//
  const handleEditProject = (project) => {
    navigate("/fillter", { state: { project } });
  };
  const handleClickIDDelete = async (id) => {
    if (id) {
      try {
        await deleteFile(id);
      } catch (error) {
        console.log("error" + error);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await db.project.toArray();
      setProjects(res);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteFile = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      if (id) {
        await db.project.delete(id);
        await fetchProjects();
        successToast(
          "Delete collection",
          "Succesfully delete image from collection"
        );
      }
    }
  };

  useEffect(() => {
    fetchProjects();
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
          <Image
            ml={{
              base: 0,
              sm: 0,
              md: 0,
              lg: 10,
            }}
            mt={{
              base: 0,
              sm: 0,
              md: 0,
              lg: 8,
            }}
            h={"70%"}
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
        My Projects
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={10}
        m="auto"
        w="80%"
        h="auto"
        mt={10}
      >
        {projects.map((project, index) => (
          <Card.Root
            overflow={"hidden"}
            key={index}
            boxShadow="md"
            bg="#A6CDC6"
            borderRadius={10}
            position="relative"
            h={80}
          >
            <Image
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              src={project.image}
              _hover={{
                transition: "all 0.3s",
                bg: "blackAlpha.500",
                zIndex: 0,
                boxShadow: "md",
                borderRadius: 50,
                cursor: "pointer",
              }}
              h="50%"
              onClick={() => handleEditProject(project)}
            />
            <Box display={isHover ? "none" : "flex"} justifyContent="center">
              <Text
                position="absolute"
                top="18%"
                fontWeight="bold"
                fontSize="2xl"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              >
                Click To edit
              </Text>
            </Box>
            <Card.Body gap={1}>
              <Card.Title color="#16404D" fontWeight="bold">
                {project.name}
              </Card.Title>
              <Card.Description color="#16404D">
                Date : {project.date}
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button
                bg="#16404D"
                color="#DDA853"
                fontWeight="bold"
                onClick={() => {
                  handleClickIDDelete(project.id);
                }}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
    </Box>
  );
}
