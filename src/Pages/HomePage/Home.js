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
import {
  FiEdit,
  FiPackage,
  FiFilter,
  FiFolder,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useState } from "react";
import React from "react";
import Popular from "./popular";
import { useNavigate } from "react-router-dom";
import Pixer from "../../Logo/PixerLogo.png";
export default function Home() {
  //*******Variable*********//
  const [isPhoto, setIsPhoto] = useState(false);
  const [isFI, setIsFI] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isCL, setIsCL] = useState(false);
  const [isPJ, setIsPJ] = useState(false);
  //*******Funtion*********//
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
            onClick={() => navigate("/cut")}
          >
            Cut photo
          </Text>
          <Text
            cursor="pointer"
            color="#16404D"
            bg="#A6CDC6"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/slice")}
          >
            Slice photo
          </Text>
          <Text
            cursor="pointer"
            color="#16404D"
            bg="#A6CDC6"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/fillter")}
          >
            Filter photo
          </Text>
          <Text
            cursor="pointer"
            color="#16404D"
            bg="#A6CDC6"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/collection")}
          >
            My collection
          </Text>
          <Text
            cursor="pointer"
            color="#16404D"
            bg="#A6CDC6"
            p={2}
            borderRadius={10}
            fontWeight="bold"
            textAlign="center"
            _hover={{ bg: "#96BAB3" }}
            onClick={() => navigate("/myProject")}
          >
            My project
          </Text>
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gapX={10}
        gapY={20}
        textAlign="center"
      >
        <VStack>
          <Card.Root
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            onMouseEnter={() => setIsPhoto(true)}
            onMouseLeave={() => setIsPhoto(false)}
            onClick={() => navigate("/photoedit")}
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
              <Card.Title color="#16404D">Photo Editor</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isPhoto ? 1 : 0}
                borderRadius={10}
                transform={isPhoto ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Customize your images with ease. Use 'Cut Photo' to crop and
                'Slice Photo' to split images into multiple parts."
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>

        {/* Find Inspired */}
        <VStack>
          <Card.Root
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            onMouseEnter={() => setIsFI(true)}
            onMouseLeave={() => setIsFI(false)}
            onClick={() => navigate("/search")}
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
              <Card.Title color="#16404D">Find Inspired</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isFI ? 1 : 0}
                borderRadius={10}
                transform={isFI ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Search for images to spark your creativity. Discover ideas and
                use them as inspiration for your edits.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>

        {/* Photo Filtering */}
        <VStack>
          <Card.Root
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            onMouseEnter={() => setIsFilter(true)}
            onMouseLeave={() => setIsFilter(false)}
            onClick={() => navigate("/fillter")}
          >
            <Icon
              as={FiFilter}
              boxSize={20}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
              marginTop={5}
            />
            <Card.Body overflow="hidden" alignItems="center">
              <Card.Title color="#16404D">Photo Filtering</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isFilter ? 1 : 0}
                borderRadius={10}
                transform={isFilter ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Enhance your images by adjusting brightness, colors, and tones
                to create the perfect look.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>

        {/* My Collection */}
        <VStack>
          <Card.Root
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            onMouseEnter={() => setIsCL(true)}
            onMouseLeave={() => setIsCL(false)}
            onClick={() => navigate("/collection")}
          >
            <Icon
              as={FiPackage}
              boxSize={20}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
              marginTop={5}
            />
            <Card.Body overflow="hidden" alignItems="center">
              <Card.Title color="#16404D">My Collection</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isCL ? 1 : 0}
                borderRadius={10}
                transform={isCL ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Save and organize your favorite images from 'Find Inspired' for
                quick access and future reference.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>

        {/* My Project */}
        <VStack>
          <Card.Root
            _hover={{ transition: "all 0.3s", bg: "#B1C0BE50" }}
            cursor="pointer"
            borderRadius="md"
            bg="none"
            border="none"
            overflow="hidden"
            onMouseEnter={() => setIsPJ(true)}
            onMouseLeave={() => setIsPJ(false)}
            onClick={() => navigate("/myProject")}
          >
            <Icon
              as={FiFolder}
              boxSize={20}
              color="#DDA853"
              bg="#16404D"
              p={2}
              borderRadius={10}
              alignSelf="center"
              marginTop={5}
            />
            <Card.Body overflow="hidden" alignItems="center">
              <Card.Title color="#16404D">My Project</Card.Title>
              <Card.Description
                color="#16404D"
                bg="#A6CDC6"
                p={3}
                opacity={isPJ ? 1 : 0}
                borderRadius={10}
                transform={isPJ ? "translateY(0)" : "translateY(100%)"}
                transition="all 0.3s"
              >
                Save and access your edited images anytime. Revisit, continue
                editing, or download with ease."
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Grid>
      <Popular />
    </Box>
  );
}
