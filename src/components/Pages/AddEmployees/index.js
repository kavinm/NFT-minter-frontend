import { Modal } from 'antd';
import React, { Suspense, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import bicycleBoy from '../../../assets/images/bicycle-boy.png';
import _2mGraphic from '../../../assets/images/2M Graphic.png';
import excellent from '../../../assets/images/excellent-service.png';

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

const AddEmployees =()=>{

    const [selectedNFT, setNFTSelection] = useState(null);
    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    return <>
                <div className='row m-0'>
                    <div className='col-md-12 p-0'>
                        <div className='recog-an-emp'>
                            <div className='row m-0'>
                                <div className='col-md-12 mt-3'>
                                    <span className='yr-collections-title'>Recognize a team</span>
                                </div>
                                <div className='col-md-12 d-flex align-items-center'>
                                    <div className='recog-form-page'>
                                        <div className='row'>
                                            <div className='col-md-4 text-label mt-4'>
                                                <label>Recipient list</label> <br/>
                                                <label htmlFor="uploadCsv" className="btn mt-1" style={{paddingLeft:0, paddingTop:"0.1rem"}} >
                                                        <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                                        <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile}  id="uploadCsv" name="file" multiple></input>
                                                </label>
                                            </div>
                                            <div className='col-md-3 text-label mt-4'>
                                                <label>Number of recipients</label> <br/>
                                                <label className="d-flex align-items-center" style={{fontSize:'1.6rem', height:'3rem'}}>{csvFile!=null?csvFile.length:0}</label>
                                            </div>
                                            <div className='col-md-5'></div>
                                            <div className='col-md-12 mt-3'>
                                            <button className='submit-btn'>Submit</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
}

export default AddEmployees;