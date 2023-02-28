import React, { Suspense, useState, useEffect }  from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { Modal, message } from 'antd';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
import readXlsxFile from 'read-excel-file';
import { ethers, utils } from "ethers";
import CollectionFactory from "../../../utils/CollectionFactory.json"

const YourCollection=()=>{
    const carouselState = {
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
    };

    
    const [dynamicCardsData, setCards] = useState([])
    const [isVerified, setIsVerified] = useState(false)
    const [verificationChecked, setVerificationCheck] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [note, setNote] = useState("")

    const currentUserWallet = utils.getAddress(window.ethereum.selectedAddress);

    const getVerification = async () => {
        try {
            const { ethereum } = window
            if (ethereum) {
                const whitelist_url = `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/hrlist/${currentUserWallet}`
                const whitelist_response = await axios.get(whitelist_url, {headers: {
                    password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
                }})
                if (whitelist_response.data?.access_granted) {
                    setIsVerified(true)
                }
                setVerificationCheck(true);
            } else {
                console.log("No eth provider")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const fetchCards = async () => {
        const reqURL = isVerified ? "https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/collections/" : `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/collections/${currentUserWallet}`
        const response = await axios.get(reqURL, {headers: {
            password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
        }})
        const collections = response.data

        let formatted_collection = collections.map((item) => {
            return {
                title: item.collection_name,
                cardImg: item.image_uri,
                collection_address: item.collection_address,
                verified: isVerified,
            }
        })

        setCards(() => formatted_collection)
    }


    useEffect(() => {
        console.log("BRUH")
        getVerification();
    }, [])

    useEffect(() => {
        fetchCards();
    }, [verificationChecked])
    
    const [csvFile,setFile] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [collectionAddress, setCollectionAddress] = useState("")
    const [selectedTitle, setSelectedTitle] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const showModal = (collection_address, title, cardImg) => {
        setCollectionAddress(() => collection_address);
        console.log(collection_address)
        setSelectedTitle(() => title)
        setPreviewImage(() => cardImg)
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        // setModalList({...modalList,collection_m:false, gallary_m:false });
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        // setModalList({...modalList,collection_m:false, gallary_m:false });
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

   const DarkCards=({title, cardImg, verified, address})=>{
        return <>
            <div className='dark-cards'>
                <div className='row mt-2'>
                    <div className='col-md-12 mt-3' style={{width:'200px',height:'180px',borderRadius:'10px'}}>
                        <img src={cardImg} alt="bruh" style={{width:"100%",height:'100%'}}/>
                    </div>
                    <div className='col-md-12 mt-3 container'>
                        <span className='title'>{title}</span>
                        <div className="row">                           
                            <AiFillPlusCircle onClick={() => showModal(address, title, cardImg)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    const addElligibleMinters = async () => {
        const arrayOfAddys = csvFile.map((person) => person[0])
        const requestURL = "https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/collections/minter/"
        const requestBody = {
            user_address: arrayOfAddys,
            collection_address: collectionAddress,
            image_uri: previewImage,
            collection_name: selectedTitle,
        }

        const response = await axios.post(requestURL, requestBody, {headers: {
            password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
        }})
        if (response.status === 200) {
            message.success("Successfully added elligible minters")
            handleCancel()
        } else {
            message.error("Error adding users to collection");
        }

    }

    const recognizeTeam = async () => {
        const arrayOfAddys = csvFile.map((person) => person[0])

        let formdata = new FormData();
        formdata.append('nft_metadata', JSON.stringify({
            "name": title,
            "description": description,
            "image": previewImage,
            "attributes": [
                {trait_type: "Date", value: date},
                {trait_type: "Note", value: note}
            ],
        }))
        const tokenURIURL = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/urigenerate/with_image'
        const response_value = await axios.post(tokenURIURL, formdata, {
          maxBodyLength: 'Infinity',
          headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(response_value)
      
        const tokenuri = response_value.data.token_uri;

        const sftLogBody = {
            collection_address: collectionAddress,
            image_uri: previewImage,
            collection_name: selectedTitle
        }

        const logUrl = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/collections/logs'
        const logResponse = await axios.post(logUrl, sftLogBody, {headers: {
            password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
        }})

        const sftID = logResponse.data.id;

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const factoryAddress = "0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6"
                
                const connectedContract = new ethers.Contract(
                    factoryAddress,
                    CollectionFactory.abi,
                    signer
                );

                let nftTx = await connectedContract.multiMint(
                    arrayOfAddys,
                    tokenuri,
                    sftID,
                    collectionAddress
                );
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
                        {headers: {
                            password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
                        }}
                    )
    
                    if (response_value.status !== 200) {
                        message.error({content:"Error adding log", duration:3, className:'error-message'});
                    }
                }
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const renderModal = () => {
        if (isVerified) {
            return (
                <Modal
                    width={650}
                    bodyStyle={{height:'250px',color:'#fff', background:'#101526'}} 
                    onOk={handleOk} onCancel={handleCancel}
                    visible={isModalVisible} footer={null}
                >
                    <div className='row create_collection_pop_up'>
                        <div className='col-md-12 mb-2 create_collection_pop_up_title p-0'>
                            <span>Add eligible minters to: {selectedTitle}</span>
                            <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                        </div>
                        <div className='col-md-4 text-label'>
                            <label>Minter list</label> <br/>
                            <label htmlFor="uploadCsv" className="btn mt-1" style={{paddingLeft:0, paddingTop:"0.1rem"}} >
                                    <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                    <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile}  id="uploadCsv" name="file" multiple></input>
                            </label>
                        </div>
                        <div className='col-md-8'></div>
                        <div className='col-md-12 mt-3 responsive_blue_btn'>
                            <button onClick={()=>addElligibleMinters()}>Select</button>
                        </div>
                    </div>
                </Modal>
            )
        } else {
            return (
                <Modal
                    width={850}
                    bodyStyle={{height:'500px',color:'#fff', background:'#101526'}} 
                    onOk={handleOk} onCancel={handleCancel}
                    visible={isModalVisible} footer={null}
                >
                    <div className='row create_collection_pop_up'>
                        <div className='col-md-12 mb-2 create_collection_pop_up_title p-0'>
                            <span>Add eligible minters to: {selectedTitle}</span>
                            <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                        </div>
                        <div className='col-md-12 mt-5'>
                            <div className='row m-0'>
                                <div className='col-md-4'>
                                    <div className='upload-img'>
                                        <img src={previewImage} style={{width:'100%',height:'100%'}}/>             
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div style={{ marginLeft:'5%'}}>
                                        <div className='row'>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Title
                                                </label> <br/>
                                                <input type="text" className='form-input mt-1' style={{width: 300, color: 'black'}} value={title} onChange={(e) => setTitle(e.target.value)}/>
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Event
                                                </label> <br/>
                                                <input type="text" className='form-input mt-1' style={{width: 300, color: 'black'}} value={description} onChange={(e) => setDescription(e.target.value)}/>
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Employees 
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
                                                <input type="date" style={{color: 'black'}} className='form-input mt-1' value={date} onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 mt-3'>
                                    <label>Description</label>
                                    <br/>
                                    <textarea style={{color: 'black', width: 600}} className='mt-1 description' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                                </div>
                                <div className='col-md-12 mt-3 responsive_blue_btn'>
                                    <button onClick={()=>recognizeTeam()}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }


    }

    return <>
        <div className='row m-0'>
            <div className='col-md-12 p-0'>
                <div className='your-collection'>
                    <div className='row m-0'>
                        <div className='col-md-12 mt-3'>
                            <span className='yr-collections-title'>Your Collections</span>
                        </div>
                    </div>
                    <div className='col-md-12 mt-3'>
                        <div className='carousel-card-body'>
                            <Suspense fallback={<div>Loading</div>}>
                                <Carousel responsive={carouselState.responsive} draggable showDots={false}>
                                    {dynamicCardsData.map((val, i)=><div style={{width:"200px",height:'270px'}}>
                                        <DarkCards cardImg={val.cardImg} title={val.title} verified={val.verified} address={val.collection_address}></DarkCards>
                                    {/* <DynamicC rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards> */}
                                    </div>)}
                                                    
                                </Carousel>
                            </Suspense>

                        </div>
                    </div>
                    <div className='col-md-12' style={{position:'relative'}}>
                        <button className='btn' onClick={showModal}>Create a Collection</button>
                        {renderModal()}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default YourCollection;