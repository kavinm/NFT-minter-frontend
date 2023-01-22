import { message } from 'antd';
import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import { ethers, utils } from "ethers";
import SFTFactoryABI from "../../../utils/SFTFactory.json"

const RecognizeATeam =()=>{

    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    const [image, setImage] = useState(null)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [note, setNote] = useState("")


    const handleChangeFileUpload=(e)=>{
        e.preventDefault();
        setNftImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    };

    const handleChangeFile=async(e)=>{
        readXlsxFile(e.target.files[0]).then((rows) => {
           console.log(rows);
           // `rows` is an array of rows
           // each row being an array of cells.
           setFile(rows)
         })
   }

    const createCollection = async () => {

        if (title === "" || description === "" || date === "") {
            message.error("Fill out all form fields!");
            return
        }

        const whitelist_url = `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/whitelist/${utils.getAddress(window.ethereum.selectedAddress)}`
        const whitelist_response = await axios.get(whitelist_url)

        if (!whitelist_response.data?.access_granted) {
            message.error({content:"You are not permitted to mint!", duration:3, className:'error-message'});
            return
        }

        let imageData = new FormData();
        imageData.append('file', image)
        let data = {
            "name": title,
            "description": description,
            "attributes": [
                {trait_type: "Date", value: date},
                {trait_type: "Note", value: note}
            ],
        }
        imageData.append('nft_metadata', JSON.stringify(data))
        const tokenURIURL = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/urigenerate/'
        const response_value = await axios.post(tokenURIURL, imageData, {
          maxBodyLength: 'Infinity',
          headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(response_value)

        const tokenuri = response_value.data.token_uri;

        let arrayOfAddys = []
        for (let file of csvFile) {
            if ( file[0] === "" || file[1] === "" || file[2] === "") {
                message.error({content: "Address, name, or email is missing in the excel sheet"})
                return
            }
            arrayOfAddys.push(file[0]);
        }

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const factoryAddress = "0x6b1eeAC57f9A040e8c104cD3cABD602ff20E55E5"
                
                const connectedContract = new ethers.Contract(
                    factoryAddress,
                    SFTFactoryABI.abi,
                    signer
                );

                let nftTx = await connectedContract.multiMint(arrayOfAddys, tokenuri);
                message.info(
                `Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTx.hash}`
                );

                const server_id = "https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/mintlog/"
                for (let file of csvFile) {
                    const response_value = await axios.post(
                        server_id, 
                        {
                            name: file[1],
                            recipient: file[0],
                            tokenuri: tokenuri,
                        },
                        {
                            maxBodyLength: 'Infinity',
                            headers: { 'Content-Type': 'application/json' }
                        }
                    )
                    console.log(response_value)
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
                                    <span className='yr-collections-title'>Recognize a Team</span>
                                </div>
                                <div className='col-md-12 mt-5'>
                                    <div className='row m-0'>
                                        <div className='col-md-4'>
                                            <div className='upload-img'>
                                                {uploadNftImg==null ?
                                                    <label htmlFor="uploadCsv" className="btn mt-2 text-white d-flex" >
                                                        <span>Upload Image </span>&nbsp;&nbsp;&nbsp;<AiOutlineUpload size={19} stroke={12}></AiOutlineUpload>
                                                        <input type="file" accept="image/*" style={{display:"none"}} onChange={handleChangeFileUpload} id="uploadCsv" name="file" multiple></input>
                                                    </label>:<img src={uploadNftImg} alt="bruh" style={{width:'100%',height:'100%'}}/>}               
                                            </div>
                                        </div>
                                        <div className='col-md-8'>
                                            <div style={{width:'90%', marginLeft:'5%'}}>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <label className='text-label'>
                                                            Collection name
                                                        </label> <br/>
                                                        <input type="text" className='form-input mt-1' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                                    </div>
                                                    <div className='col-md-12 mt-3'>
                                                        <label className='text-label'>
                                                            Event
                                                        </label> <br/>
                                                        <input type="text" className='form-input mt-1' value={description} onChange={(e) => setDescription(e.target.value)}/>
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
                                            <textarea style={{color: 'black'}} className='mt-1 description' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                                        </div>
                                        <div className='col-md-12 mt-2'>
                                            <button className='btn submit-collection' onClick={() => createCollection()}>Create a Collection</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
}

export default RecognizeATeam;