import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';
import axios from "axios";
import { ethers } from "ethers";
import { message } from 'antd';
import CollectionFactory from "../../../utils/CollectionFactory.json"
import { useQuery } from 'react-query'

const fetchDirectory = async () => {
    return await axios.get("https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/directory")
}

const CreateCollection =()=>{
    
    const directory = useQuery('directory', fetchDirectory)
    console.log(directory?.data?.data)
    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [image, setImage] = useState(null);
    const [symbol, setSymbol] = useState(null);

    const FACTORY_ADDRESS = "0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6";

    const handleChangeFileUpload=(e)=>{
        e.preventDefault();
        setNftImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0])
    }
    const handleChangeFile=async(e)=>{
        readXlsxFile(e.target.files[0]).then((rows) => {
           console.log(rows);
           // `rows` is an array of rows
           // each row being an array of cells.
           setFile(rows)
         })
   }

   const getEveryone= async (e) => {
        let newSet = directory?.data?.data.map(value => [value.address, value.name, value.email])
        setFile(newSet)
   }

    const createCollection = async () => {

        let arrayOfAddys = []
        for (let file of csvFile) {

            if ( file[0] === "") {
                message.error({content: "Address is missing in the excel sheet"})
                return
            }
    
            if (! /^0x[a-fA-F0-9]{40}$/.test(file[0])) {
                message.error({content: "Invalid Address!"})
                return
            }
            arrayOfAddys.push(file[0]);
        }

        let imageData = new FormData();
        imageData.append('file', image)
        const tokenURIURL = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/urigenerate/only_image'
        const response_value = await axios.post(tokenURIURL, imageData, {
          maxBodyLength: 'Infinity',
          headers: { "Content-Type": "multipart/form-data" }
        })

        const image_uri = response_value.data.image_uri;

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const connectedFactoryContract = new ethers.Contract(
                    FACTORY_ADDRESS,
                    CollectionFactory.abi,
                    signer  
                )

                console.log(connectedFactoryContract)

                message.info("Going to pop wallet now to pay gas...");
                let contractCreationTx = await connectedFactoryContract.createNewContract();
                message.info(
                `Mined, see transaction: https://mumbai.polygonscan.com/tx/${contractCreationTx.hash}`
                );
                const reciept = await contractCreationTx.wait();

                console.log(reciept)
                const data = reciept.logs[1].data;
                const SFT_contract_address = ethers.utils.defaultAbiCoder.decode(
                    ['address'], data
                )
                console.log(SFT_contract_address)

                const requestUrl = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/collections/minter'
                const requestBody = {
                    user_address: arrayOfAddys,
                    collection_address: SFT_contract_address[0],
                    image_uri: image_uri,
                    collection_name: collectionName,
                }

                const response = await axios.post(requestUrl, requestBody);
                console.log(response);
                if (response.status === 200) {
                    message.success("Collection successfully created");
                } else {
                    message.error("Error creating collection")
                }
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <>
         <div className='row m-0'>
            <div className='col-md-12 p-0'>
                <div className='create-collection'>
                    <div className='row m-0'>
                        <div className='col-md-12 mt-3'>
                            <span className='yr-collections-title'>Create a collection</span>
                        </div>
                        <div className='col-md-12 mt-5'>
                            <div className='row m-0'>
                                <div className='col-md-4'>
                                    <div className='upload-img'>
                                        {uploadNftImg==null ?
                                            <label htmlFor="uploadCsv" className="btn mt-2 text-white d-flex" >
                                                <span>Upload Image </span>&nbsp;&nbsp;&nbsp;<AiOutlineUpload size={19} stroke={12}></AiOutlineUpload>
                                                <input type="file" accept="image/*" style={{display:"none"}} onChange={handleChangeFileUpload} id="uploadCsv" name="file" multiple></input>
                                            </label>:<img src={uploadNftImg} alt="bruh" style={{width:'100%',height:'100%'}}/>
                                        }               
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div style={{width:'90%', marginLeft:'5%'}}>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label className='text-label'>
                                                    Collection name
                                                </label> <br/>
                                                <input value={collectionName} onChange={(e) => setCollectionName(e.target.value)} type="text" className='form-input mt-1'/>
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Symbol
                                                </label> <br/>
                                                <input value={symbol} onChange={(e) => setSymbol(e.target.value)} type="text" className='form-input mt-1' />
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Elligible minters 
                                                </label> <br/>
                                                {csvFile!=null ? <label className="btn mt-2" >
                                                    <div className='upload-csv-selected'>Test.csv  &nbsp;&nbsp;&nbsp; <FaTimes onClick={(e)=>{
                                                        e.preventDefault();
                                                        setFile(null);
                                                    }} size={15} ></FaTimes> </div>
                                                  
                                                </label>:<label htmlFor="uploadCsv" className="btn" style={{paddingLeft:0, paddingTop:"0.1rem"}} >
                                                    <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                                    <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile} onClick={() => console.log("BRUH")} id="uploadCsv" name="file" multiple></input>
                                                </label>}
                                                <button onClick={() => getEveryone()} className='upload-csv'>or Whitelist everyone</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 mt-2'>
                                     <button onClick={() => createCollection()} className='btn submit-collection'>Create a Collection</button>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CreateCollection;