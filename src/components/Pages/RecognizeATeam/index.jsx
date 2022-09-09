import { Modal, message } from 'antd';
import React, { Suspense, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';
import 'react-multi-carousel/lib/styles.css';
import bicycleBoy from '../../../assets/images/bicycle-boy.png';
import _2mGraphic from '../../../assets/images/2M Graphic.png';
import excellent from '../../../assets/images/excellent-service.png';
import axios from "axios";
import { ethers } from "ethers";
import SFTFactoryABI from "../../../utils/SFTFactory.json"

const DarkCards=({title, cardImg})=>{
    return <>
        <div className='dark-cards'>
            {/* <div className='row'>
                <div className='col-md-12 pt-2 dropdown'>
                
                    <BiDotsVerticalRounded 
                        id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                     color={"#fff"} className="threeDotsMenu dropdown-toggle" size={18}></BiDotsVerticalRounded>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div> */}
            <div className='row '>
                <div className='col-md-12 mt-3' style={{width:'200px',height:'180px',borderRadius:'10px'}}>
                    <img src={cardImg} style={{width:"100%",height:'100%'}}/>
                </div>
                <div className='col-md-12 mt-3'>
                    <span className='title' style={{fontSize:'bold'}}>{title}</span>
                </div>
            </div>
        </div>
    </>
}

const RecognizeATeam =()=>{

    const [selectedNFT, setNFTSelection] = useState(null);
    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    const [image, setImage] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [note, setNote] = useState("")


    const [modalList, setModalList] = useState({
        collection_m:false,
        gallary_m:false,
    });
    const [myState, setState]=useState({
        value_tab:true,
        strategy_tab:false,
        select_a_collection:"",
        modalCollectionType:''
    });
    
    const [ carouselState, setCarouse] = useState({
        responsive:{
            superLargeDesktop:{
                breakpoint:{ max:4000, min:3000 },
                items:5,
                partialVisibilityGutter: 30
            },
            desktop:{
                breakpoint:{ max:3000, min:1024 },
                items:3,
                partialVisibilityGutter: 30
            },
            tablet:{
                breakpoint:{max:1024, min:464},
                items:3 , 
                partialVisibilityGutter:30
            },
            mobile:{
                breakpoint: { max:464, min:0 },
                items: 1.3, partialVisibilityGutter:30
            }
        }
    });
    const [dynamicCardsData, setCards]=useState([
        {title:'Recognition Awards', subtitle:'Offered by Parner Name', cardImg:_2mGraphic},// contactList:multiPplImg},
        {title:'Participation Record', subtitle:'Offered by Parner Name', cardImg:bicycleBoy},// contactList:multiPplImg},
        {title:'Service Awards', subtitle:'Offered by Parner Name', cardImg:excellent}// contactList:multiPplImg},
       
    ]);
    const handleNFTSelection=(val)=>{
        console.log(val)
        setNFTSelection(val);
        handleOk();
    }

    const handleChangeFileUpload=(e)=>{
        e.preventDefault();
        setNftImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    };
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setModalList({...modalList,collection_m:false, gallary_m:false });
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setModalList({...modalList,collection_m:false, gallary_m:false });
        setIsModalVisible(false);
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
        
        let data = {
            "name": title,
            "description": description,
            "image": "https://ipfs.io/ipfs/" + response_value.data.IpfsHash,
            "attributes": [
                {trait_type: "Date", value: date},
                {trait_type: "Note", value: note}
            ],
        }

        let arrayOfAddys = []
        for (let file of csvFile) {
            arrayOfAddys.push(file[0]);
        }
        
        console.log(arrayOfAddys)

        
        const meta_data_response = await axios.post(url, data, {
            headers: {
              'pinata_api_key': "6dc806852197ca3a8e7b",
              "pinata_secret_api_key": "334eed80fbabe379df3d8df9cc48198488dfb5d6d68f022c562fdba4af48de0f",
            }
          })
      
        const Jsonhash = meta_data_response.data.IpfsHash
        const JsonUrl = "https://ipfs.io/ipfs/" + Jsonhash;

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

                console.log("Going to pop wallet now to pay gas...");
                let nftTx = await connectedContract.multiMint(arrayOfAddys, JsonUrl);
                console.info(
                `Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTx.hash}`
                );
                console.log(nftTx)
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
                                                    </label>:<img src={uploadNftImg} style={{width:'100%',height:'100%'}}/>}               
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