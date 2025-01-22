import { Link, useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiPackage,
  FiFilter,
  FiFolder,
  FiMoreHorizontal,
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
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
export default function PhotoEditPage() {
  const [isPhoto, setIsPhoto] = useState(false);
  const [isFI, setIsFI] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isCL, setIsCL] = useState(false);
  const [isPJ, setIsPJ] = useState(false);
  const navigate = useNavigate();
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
        {/* เมนู */}
        <Flex
          ml={-20}
          bg="#A6CDC6"
          borderRadius={50}
          p={5}
          width={1090}
          gap={100}
          marginBottom={40}
          align="start"
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
    // <div>
    //   <h1>Photo Edit Page</h1>
    //   <div id="home">
    //     <Link to="/">Home</Link>
    //     <Link to="/cut">cut</Link>
    //     <Link to="/slice">slice</Link>
    //   </div>
    // </div>
  );
}
