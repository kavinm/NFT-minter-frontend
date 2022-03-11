import React, {useState} from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Stack,
  Image,
  Button,
  InputGroup,
  Inputm,
  InputLeftElement,
  Radio,
  RadioGroup,

} from "@chakra-ui/react";


import {
  Input,
  Form,
} from "antd";
import ImagePreview from "./ImagePreview";
import myNFT from "../utils/MyNFT.json";
import InputComponent from "./InputComponent";

import { useDispatch } from "react-redux";
import { addAccount } from "../actions/accountActions";
const { TextArea } = Input;


const MintOneNFT = (props) => {

  const CONTRACT_ADDRESS = "0x93b9439e2a89019dee11306e78adcf77c7431caf";
  const TOTAL_MINT = 500;

  const [imgSRC, setImgSRC] = useState("");
  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [nftType, setNftType] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");

  const {address} = props

  const dispatch = useDispatch()
  const fileUploadHandler = (e) => {
    const the_file = e.target.files[0];
    var reader = new FileReader();
    setImage(the_file);
    var url = reader.readAsDataURL(the_file);
    reader.onloadend = (e) => {
      setImgSRC(reader.result);
    };
  };

  const fileUploadClearer = () => {
    setImgSRC("");
    setImage("");
  };


  const Feature = (props) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            bg={useColorModeValue("brand.500")}
            color="white"
          >
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            color={useColorModeValue("gray.900")}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box py={12} bg={useColorModeValue("white", "gray.800")} rounded="xl">
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Box textAlign={{ lg: "center" }}>
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Mint an NFT
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="2xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Stack
              spacing={{ base: 10, md: 0 }}
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gridColumnGap={{ md: 8 }}
              gridRowGap={{ md: 10 }}
            >
              <Feature>
              <input
                style={{ width: "100%", marginBottom: 10}}
                type="file"
                onChange={(e) => fileUploadHandler(e)}
                ></input>
                  <InputComponent placeHolder="Title" theState={title} stateSetter={setTitle}/>
                <TextArea
                  style={{ width: "100%" }}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <InputGroup>
                  <Input
                    name="Count"
                    placeholder="Count"
                    style={{marginBottom: 10}}
                    size="lg"

                  />
                </InputGroup>
                <RadioGroup name="form-name" style={{marginBottom: 10}}>
                  <Radio>ERC721</Radio>
                  <Radio style={{marginLeft: 10}}>ERC1155</Radio>
                </RadioGroup>
                <InputGroup>
                  <Input
                    name="Social URL"
                    placeholder="Social URL"
                    style={{marginBottom: 10}}
                    size="lg"
                  />
                </InputGroup>
              </Feature>

              <Button
              as="a"
              variant="solid"
              colorScheme="brand"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: "full", sm: "auto" }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
            >
              Mint
          </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default MintOneNFT