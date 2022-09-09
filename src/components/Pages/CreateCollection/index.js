import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';
import axios from "axios";
import { ethers } from "ethers";
import { Modal, message } from 'antd';
import AddressToCollection from "../../../utils/AddressToCollection.json"

const CreateCollection =()=>{
    

    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [symbol, setSymbol] = useState(null);

    const FACTORY_ADDRESS = "0xeB1BA828cD387d25b5BeA7169eE28eC318Ea93Aa";

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

    const createCollection = async () => {

        const whilelist_url = "http://20.63.106.39:3000/customers"
        let users = await fetch(whilelist_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json' ,
                'auth': '3645b62be610de452d188fcd76481bf98227772704d73772e619fb77ece9d3b6'
            },
        }).then(res => res.json())
        users = users.data
        let found = false;
        for (let user of users) {
            if (user.address.toUpperCase() === window.ethereum.selectedAddress.toUpperCase()) {
                found = true
            }
        }

        if (!found) {
            message.error({content:"You are not permitted to mint!", duration:3, className:'error-message'});
            return
        }

        let imageData = new FormData();
        imageData.append('file', image)
        const imageURL = `https://api.pinata.cloud/pinning/pinFileToIPFS`
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        const response_value = await axios.post(imageURL, imageData, {
        maxBodyLength: 'Infinity',
        headers: {
            'pinata_api_key': "6dc806852197ca3a8e7b",
            "pinata_secret_api_key": "334eed80fbabe379df3d8df9cc48198488dfb5d6d68f022c562fdba4af48de0f",
            'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
        }
        })
        console.log(response_value)  
        const imageHash = "https://ipfs.io/ipfs/" + response_value.data.IpfsHash

        let arrayOfAddys = []
        for (let file of csvFile) {
            arrayOfAddys.push(file[0]);
        }
    

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const connectedFactoryContract = new ethers.Contract(
                    FACTORY_ADDRESS,
                    AddressToCollection.abi,
                    signer  
                )

                console.log("Going to pop wallet now to pay gas...");
                let contractCreationTx = await connectedFactoryContract.addCollection(
                    collectionName,
                    symbol,
                    imageHash,
                    description,
                    date,
                    eventName
                );
                console.info(
                `Mined, see transaction: https://mumbai.polygonscan.com/tx/${contractCreationTx.hash}`
                );
                console.log(contractCreationTx)
                
                let arrayOfContractsTx = await connectedFactoryContract.getCollections();

                console.log(arrayOfContractsTx);
                const server_id = "http://20.63.106.39:3000/mints"
                for (let file of csvFile) {
                    fetch(server_id, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'auth': '3645b62be610de452d188fcd76481bf98227772704d73772e619fb77ece9d3b6',
                        },
                        body: JSON.stringify({
                            name: file[1],
                            email: file[2]
                        })
                    }).then(res => res.json()).then(result => console.log(result)).catch(res => console.log(res))

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
                                            </label>:<img src={uploadNftImg} style={{width:'100%',height:'100%'}}/>
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
                                                    Event Name
                                                </label> <br/>
                                                <input value={eventName} onChange={(e) => setEventName(e.target.value)} type="text" className='form-input mt-1' />
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
                                                    <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile} id="uploadCsv" name="file" multiple></input>
                                                </label>}
                                            </div>
                                            <div className='col-md-12'>
                                                        <label className='text-label'>
                                                            Date
                                                        </label> <br/>
                                                        <input type="date" className='form-input mt-1' value={date} onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 mt-3'>
                                    <label>Description</label>
                                    <br/>
                                    <textarea style={{color: 'black'}} value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1 description'></textarea>
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