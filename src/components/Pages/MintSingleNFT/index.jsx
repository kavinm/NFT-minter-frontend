import React, {Suspense, useEffect, useState} from 'react';
import {BsUpload} from 'react-icons/bs';
import { Modal } from 'antd';
import {FaExternalLinkAlt, FaTimes} from 'react-icons/fa';
import {AiOutlineUpload} from 'react-icons/ai';
import papa from 'papaparse';
import readXlsxFile from 'read-excel-file';

import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import bicycleBoy from '../../../assets/images/bicycle-boy.png';
import _2mGraphic from '../../../assets/images/2M Graphic.png';
import excellent from '../../../assets/images/excellent-service.png';
import {BiDotsVerticalRounded} from 'react-icons/bi';

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
  
const MintSingleNft=({mode})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [csvFile,setFile] = useState(null);
    const [recipientInfoRequired ,setRecipientInfo] = useState(true);
    const [mintState, setMintState] = useState({
        collection_type:'Internal',
    })
    useEffect(()=>{console.log(mintState)},[mintState])
    const [dynamicCardsData, setCards]=useState([
        {title:'Recognition Awards', subtitle:'Offered by Parner Name', cardImg:_2mGraphic},// contactList:multiPplImg},
        {title:'Participation Record', subtitle:'Offered by Parner Name', cardImg:bicycleBoy},// contactList:multiPplImg},
        {title:'Service Awards', subtitle:'Offered by Parner Name', cardImg:excellent}// contactList:multiPplImg},
       
    ])
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
    // useEffect(()=>{if(mode)},[])
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
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
    const handleSelectionUpdate=(type,value)=>{
          if(type=="collection_type"){
            var temp=document.getElementById("internal_form");
            var temp2=document.getElementById("external_form");
              if(value=="Internal"){
                    temp.classList.add("mint-blue-btn");
                    temp.classList.remove("mint-unselected-btn");
                    temp2.classList.remove("mint-blue-btn");
                    temp2.classList.add("mint-unselected-btn");
              }else
              if(value=="External"){
                temp2.classList.add("mint-blue-btn");
                temp2.classList.remove("mint-unselected-btn");
                temp.classList.remove("mint-blue-btn");
                temp.classList.add("mint-unselected-btn");
          }
              setMintState({...mintState, collection_type:value})
          }  
    }
    return <>
        <div className='row m-0'>
            <div className='col-md-12 p-0'>
                <div className='mint-an-nft'>
                    <div className='row mt-3 '>
                        {console.log('mycsv -- ',csvFile)}
                        <div className='col-md-12 p-0'>
                            <span className='mint-title'>Mint an NFT</span>
                        </div>
                    </div>
                    {/* <form> */}
                        <div className='row mt-4'>
                            <div className='col-md-4 p-0'>
                                <div className='upload-image' onClick={showModal}>
                                    <span>Select Collection  </span> 
                                </div>
                                <Modal  width={700} bodyStyle={{height:'420px',color:'#fff', background:'#101526'}} 
                                            onOk={handleOk} onCancel={handleCancel}
                                            visible={isModalVisible} footer={null}>
                                        <div className='row create_collection_pop_up'>
                                            <div className='col-md-12 mb-5 create_collection_pop_up_title p-0'>
                                                <span>Your Collections</span>
                                                <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <div className='carousel-card-body'>
                                                    <Suspense fallback={<div>Loading</div>}>
                                                        <Carousel responsive={carouselState.responsive} draggable showDots={false}>
                                                            {dynamicCardsData.map((val, i)=><div style={{width:"200px",height:'270px'}}>
                                                                <DarkCards cardImg={val.cardImg} title={val.title}></DarkCards>
                                                            {/* <DynamicC rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards> */}
                                                            </div>)}
                                                                            
                                                        </Carousel>
                                                    </Suspense>

                                                </div>
                                            </div>
                                           
                                        </div>
                                    </Modal>
                            </div>  
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col-md-12 mb-2'>
                                        <label>Description of Achievement</label>
                                    </div>
                                    <div className='col-md-12 '>
                                        <textarea id="descp_of_ach"></textarea>
                                    </div>
                                </div>
                                {/* <div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>Count</label><br/>
                                        <span id="mint-sub-label">Eg. 2-1000</span>
                                    </div>
                                    <div className='col-md-12 '>
                                       <input className='mint-input-data-entry'></input>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>URL</label>
                                    </div>
                                    <div className='col-md-12 '>
                                       <input  className='mint-input-data-entry'></input>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <div className='full-form-area'>
                                    <div className='row mt-2'>
                                        {/* <div className='col-md-12 mb-1'>
                                            <label>Choose the type of NFT you want to mint.</label> &nbsp;<span  onClick={showModal} style={{fontSize:"0.8rem",color:'#C6C6C6', cursor:'pointer'}}>Need help?</span>
                                            <Modal  width={350} bodyStyle={{height:'450px',color:'#fff', background:'#101526'}} 
                                            onOk={handleOk} onCancel={handleCancel}
                                            visible={isModalVisible} footer={null}>
                                            <div className="row">
                                                <div className="col-md-12 pop-up-title2 text-center">
                                                    <span >
                                                        Non-fungible<br/>vs<br/>Semi-fungible
                                                    </span>
                                                    <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                                                </div>
                                            </div>
                                            <div className='row mt-5'>
                                                <div className='col-md-12 mt-3 p-0  pop-fn-sm text-white'>
                                                    <span>What is a semi-fungible token?</span>
                                                </div>
                                                    <div className='col-md-12 mt-3 p-0 pop-fn-sm2'>
                                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, mauris vitae malesuada finibus, enim magna aliquet dui, non bibendum erat lectus ac justo.<br/>Suspendisse in libero fringilla, volutpat diam eget, eleifend orci. Quisque leo libero, interdum sit amet porttitor ut, tristique eu augue.</span>
                                                    </div>
                                                    <div className='col-md-12 mt-3 p-0 pop-fn-sm'>
                                                        <span>What is the difference between a semi-fungible token<br/>and non-fungible token?</span>
                                                    </div>
                                                    <div className='col-md-12 mt-3 p-0  pop-fn-sm2'>
                                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, mauris vitae malesuada finibus, enim magna aliquet dui, non bibendum erat lectus ac justo. Suspendisse in libero fringilla, volutpat diam eget, eleifend orci. Quisque leo libero, interdum sit amet porttitor ut, tristique eu augue.</span>
                                                    </div>
                                                    <div className='col-md-12 mt-3 p-0 d-flex align-items-center pop-up-learn-more'>
                                                       <u>Learn More</u> &nbsp;<FaExternalLinkAlt size={12}></FaExternalLinkAlt>
                                                    </div>
                                                
                                            </div>
                                            </Modal>
                                        </div> */}
                                        {/* <div className='col-md-6 '>
                                            <button className='btn mint-blue-btn'>Non-fungible</button>
                                        </div>
                                        <div className='col-md-6 '>
                                            <button className='btn mint-unselected-btn'>Semi-fungible</button>
                                        </div> */}
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-md-12 mb-1'>
                                            <label>Choose a type of collection</label> 
                                        </div>
                                        <div className='col-md-6 '>
                                            <button className={'btn mint-blue-btn'} id="internal_form" onClick={()=>handleSelectionUpdate('collection_type',"Internal")}>Internal</button>
                                        </div>
                                        <div className='col-md-6 '>
                                            <button className={'btn  mint-unselected-btn '} id="external_form"  onClick={()=>handleSelectionUpdate('collection_type',"External")}>External</button>
                                        </div>
                                    </div>
                                    {mintState.collection_type=="Internal" && <div className='row mt-2'>
                                        <div className='col-md-12 mb-1'>
                                            <div className='selection-card'>
                                                <div className='selected-tab'>Recognition</div>
                                                <div className='unselected-tab'>Service Awards at KPMG</div>
                                                <div className='unselected-tab'>KPMG Participation Record</div>
                                                <div className='unselected-tab'>Utilization Achievement Awards</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {mode!="employee" &&<div className='col-md-12 p-0 mt-2 mb-2'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label style={{fontSize:"0.8rem"}}>Recipient list</label>
                                            </div>
                                            <div className='col-md-12 p-0 mt-1'>
                                                <label htmlFor="uploadCsv" className="btn mt-2" >
                                                    <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                                    <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile} id="uploadCsv" name="file" multiple></input>
                                                </label>                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-8 p-0'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label style={{fontSize:"0.8rem"}}>Number of recipients</label>
                                            </div>
                                            <div className='col-md-12'>
                                                <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{csvFile!=null?csvFile.length:0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            <div className='col-md-12'>
                               
                            {mode=="employee" && mintState.collection_type=="Internal" &&<div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>Recipient Name</label>
                                    </div>
                                    <div className='col-md-12 '>
                                       <input  className='mint-input-data-entry2'></input>
                                    </div>
                                </div>}
                                {mode=="employee" && mintState.collection_type=="Internal" &&<div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>Recipient Email</label>
                                    </div>
                                    <div className='col-md-12 '>
                                       <input  className='mint-input-data-entry2'></input>
                                    </div>
                                </div>}
                                {mintState.collection_type=="Internal" && <div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>Please select the area of recognition</label>
                                    </div>
                                    <div className='col-md-12 '>
                                       <select  className='mint-input-data-entry2'>
                                           <option></option>
                                       </select>
                                    </div>
                                </div>}
                                {mintState.collection_type=="Internal" &&<div className='row mt-2'>
                                    <div className='col-md-12 mb-1'>
                                        <label>Reason</label><br/>
                                        <span id="mint-sub-label">Let the recipient know why they’re recieving this.</span>
                                    </div>
                                    <div className='col-md-12 '>
                                       <textarea  className='mint-input-data-entry3'></textarea>
                                    </div>
                                </div>}
                                <div className='row mt-2'>
                                    <div className='col-md-12 mt-2 mb-4'>
                                        <button className='btn' id="submit-btn">Mint</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    </>
}

export default MintSingleNft;