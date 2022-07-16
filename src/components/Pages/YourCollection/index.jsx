import React, { Suspense, useState }  from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import bicycleBoy from '../../../assets/images/bicycle-boy.png';
import _2mGraphic from '../../../assets/images/2M Graphic.png';
import excellent from '../../../assets/images/excellent-service.png';
import {BiDotsVerticalRounded} from 'react-icons/bi';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
import readXlsxFile from 'read-excel-file';
  
const DarkCards=({title, cardImg})=>{

    // const [myModal, showModal] = useState(false);
    

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
            <div className='row mt-2'>
                <div className='col-md-12 mt-3' style={{width:'200px',height:'180px',borderRadius:'10px'}}>
                    <img src={cardImg} style={{width:"100%",height:'100%'}}/>
                </div>
                <div className='col-md-12 mt-3'>
                    <span className='title'>{title}</span>
                </div>
            </div>
        </div>
    </>
}

const YourCollection=()=>{
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
       
    ])
    
    const [csvFile,setFile] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
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
                                        <DarkCards cardImg={val.cardImg} title={val.title}></DarkCards>
                                    {/* <DynamicC rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards> */}
                                    </div>)}
                                                    
                                </Carousel>
                            </Suspense>

                        </div>
                    </div>
                    <div className='col-md-12' style={{position:'relative'}}>
                   
                        <button className='btn' onClick={showModal}>Create a Collection</button>
                        {<Modal  width={650} bodyStyle={{height:'250px',color:'#fff', background:'#101526'}} 
                                            onOk={handleOk} onCancel={handleCancel}
                                            visible={isModalVisible} footer={null}>
                                                <div className='row create_collection_pop_up'>
                                                    <div className='col-md-12 mb-2 create_collection_pop_up_title p-0'>
                                                        <span>Add eligible minters</span>
                                                        <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                                                    </div>
                                                    <div className='col-md-4 text-label'>
                                                        <label>Recipient list</label> <br/>
                                                        <label htmlFor="uploadCsv" className="btn mt-1" style={{paddingLeft:0, paddingTop:"0.1rem"}} >
                                                                <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                                                <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile}  id="uploadCsv" name="file" multiple></input>
                                                        </label>
                                                    </div>
                                                    <div className='col-md-8'></div>
                                                    <div className='col-md-12 mt-3 responsive_blue_btn'>
                                                        <button onClick={()=>{
                                                            // setState({...myState, select_a_collection:myState.modalCollectionType});
                                                            handleOk();}}>Select</button>
                                                    </div>
                                                </div>
                                            </Modal>}
                       
                    </div>

                   
                </div>
            </div>
        </div>
    </>
}

export default YourCollection;