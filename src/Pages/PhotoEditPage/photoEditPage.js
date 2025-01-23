import { useNavigate } from "react-router-dom";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Grid,
  Circle,
  Card,
  Image,
} from "@chakra-ui/react";
import Pixer from "../../Logo/PixerLogo.png";
import { useState } from "react";
import React from "react";
export default function PhotoEditPage() {
  //*******Variable*********//
  const [isPhoto, setIsPhoto] = useState(false);
  const [isFI, setIsFI] = useState(false);
  const navigate = useNavigate();
  return (
    <Box bg="#fdf8e5" minH="100vh" p={4}>
      <Flex align="center" mb={20}>
        <Circle
          size={350}
          bg="#A6CDC6"
          ml={-20}
          mt={-20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          zIndex={3}
        >
          <Image ml={5} mt={8} h={"70%"} src={Pixer} />
        </Circle>
        <Circle
          size={350}
          bg="#A6CDC6"
          ml={-20}
          mt={-20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"md"}
        ></Circle>
        <Flex
          ml={-20}
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

      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        <VStack alignItems="end">
          <Card.Root
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            onMouseEnter={() => setIsPhoto(true)}
            onMouseLeave={() => setIsPhoto(false)}
            onClick={() => navigate("/cut")}
          >
            <Icon
              as={FiEdit}
              boxSize={20}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
              marginTop={5}
            />
            <Card.Body overflow="hidden" alignItems="center">
              <Card.Title color="#16404D">Cut</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isPhoto ? 1 : 0}
                borderRadius={10}
                transform={isPhoto ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Crop your images to the perfect size and focus on what matters
                most.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>

        <VStack alignItems="start">
          <Card.Root
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            onMouseEnter={() => setIsFI(true)}
            onMouseLeave={() => setIsFI(false)}
            onClick={() => navigate("/slice")}
          >
            <Icon
              as={FiMoreHorizontal}
              boxSize={20}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
              marginTop={5}
            />
            <Card.Body overflow="hidden" alignItems="center">
              <Card.Title color="#16404D">Slice</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isFI ? 1 : 0}
                borderRadius={10}
                transform={isFI ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Split your images into multiple sections with customizable parts
                for creative layouts.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Grid>
    </Box>
  );
}
