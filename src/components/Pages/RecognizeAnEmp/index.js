import React, {Suspense, useState } from 'react';
import { Modal } from 'antd';
import { FaTimes } from 'react-icons/fa';
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

const RecognizeAnEmp =()=>{

    const [selectedNFT, setNFTSelection] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalList, setModalList] = useState({
        collection_m:false,
        gallary_m:false,
    });
    const [dynamicCardsData, setCards]=useState([
        {title:'Recognition Awards', subtitle:'Offered by Parner Name', cardImg:_2mGraphic},// contactList:multiPplImg},
        {title:'Participation Record', subtitle:'Offered by Parner Name', cardImg:bicycleBoy},// contactList:multiPplImg},
        {title:'Service Awards', subtitle:'Offered by Parner Name', cardImg:excellent}// contactList:multiPplImg},
       
    ]);
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
    const [rec_menu, setMenu] = useState(["Integrity","Courage","Excellence", "Together", "For Better"]);
    const [rec_strategy_menu, setRecStrategyMenu] = useState(["Clients and Markets","People and Knowledge","Public Trust and Quality","Operational Excellance"])
    const [yrs_menu, setYrsMenu] = useState([5,10,15,20,25]);
    const [myState, setState]=useState({
        value_tab:true,
        strategy_tab:false,
        select_a_collection:"",
        modalCollectionType:''
    });
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

      const toggleTab=(name)=>{
        if(name=="value_tab")
            setState({...myState, value_tab:true, strategy_tab:false})
        if(name=="strategy_tab")
            setState({...myState, strategy_tab:true, value_tab:false})
      }
      
    const handleNFTSelection=(val)=>{
        console.log(val)
        setNFTSelection(val);
        handleOk();
    }

    const handleStrategy_N_ValueMenu =(tabName, id)=>{
        console.log("Running...")
        if(tabName=="recMenuStrategy")
        {
            document.getElementById(tabName+id).classList.add("active");
            for(let i=0;i<rec_strategy_menu.length;i++){
                if(id != i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
        else
        if(tabName=="recMenuValue"){
            document.getElementById(tabName+id).classList.add("active");
            for(let i=0;i<rec_menu.length;i++){
                if(id != i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
        else
        if(tabName=="yrsOfService"){
            document.getElementById(tabName+id).classList.add("active");
            for(let i=0;i<yrs_menu.length;i++){
                if(id != i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
            
    }

    return <>
            <div className='row m-0'>
                <div className='col-md-12 p-0'>
                    <div className='recog-an-emp'>
                        <div className='row m-0'>
                            <div className='col-md-12 mt-3'>
                                <span className='yr-collections-title'>Recognize an employee</span>
                            </div>
                            <div className='col-md-12 d-flex align-items-center'>
                                <div className='recog-form-page'>
                                    <div className='row'>
                                        <div className='col-md-12 mt-3'>
                                            {myState.select_a_collection==""?<label className='select_collection ' onClick={()=>{
                                                setModalList({...modalList,collection_m:true })
                                                showModal();
                                            }}>Select a collection</label>:(myState.select_a_collection=="Recognition_awards"?<label className='select_recognition_awards ' onClick={()=>{
                                                setModalList({...modalList,collection_m:true })
                                                showModal();
                                            }}>Recognition awards</label>:<label className='select_recognition_awards ' onClick={()=>{
                                                setModalList({...modalList,collection_m:true })
                                                showModal();
                                            }}>Service awards</label>)}
                                            {modalList.collection_m && <Modal  width={650} bodyStyle={{height:'250px',color:'#fff', background:'#101526'}} 
                                            onOk={handleOk} onCancel={handleCancel}
                                            visible={isModalVisible} footer={null}>
                                                <div className='row create_collection_pop_up'>
                                                    <div className='col-md-12 mb-5 create_collection_pop_up_title p-0'>
                                                        <span>Select a Collection</span>
                                                        <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                                                    </div>
                                                    <div className='col-md-12 p-0'>
                                                        <div className='row mt-2'>
                                                            <div className='col-md-6 '>
                                                                <button onClick={()=>setState({...myState, modalCollectionType:'Recognition_awards'})}
                                                                className={'btn ' +(myState.modalCollectionType=="Recognition_awards"?" mint-blue-btn ":" mint-unselected-btn ")} id="internal_form" >Recognition awards</button>
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <button onClick={()=>setState({...myState, modalCollectionType:'Service_awards'})} 
                                                                className={'btn ' +(myState.modalCollectionType=="Service_awards"?" mint-blue-btn ":" mint-unselected-btn ")} id="external_form" >Service awards</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12 mt-3 responsive_blue_btn'>
                                                        <button onClick={()=>{
                                                            setState({...myState, select_a_collection:myState.modalCollectionType});
                                                            handleOk();}}>Select</button>
                                                    </div>
                                                </div>
                                            </Modal>}
                                        </div>
                                        <div className='col-md-12 mt-3'>
                                            <label className='text-label'>Recipient Name</label><br/>
                                            <input type="text" className='form-input mt-1' />
                                        </div>
                                        <div className='col-md-12 mt-2 pl-2'>
                                            <label className='text-label'>Recipient Email</label><br/>
                                            <input type="text" className='form-input mt-1' />
                                        </div>
                                        <div className='col-md-12 mt-2'>
                                            <label className='text-label'>Recipient wallet</label><br/>
                                            <input type="text" className='form-input mt-1' />
                                        </div>
                                        {myState.select_a_collection!="" && myState.select_a_collection=="Recognition_awards" && <div className='col-md-12 mt-4'>
                                            <div className='value-strategy'>
                                                <label onClick={()=>toggleTab("value_tab")} className={myState.value_tab==true?'active-blue':'inactive-blue'}>Value</label>
                                                <label onClick={()=>toggleTab("strategy_tab")} className={myState.strategy_tab==true?'active-blue':'inactive-blue'}>Strategy</label>
                                            </div>
                                        </div>}
                                        {myState.select_a_collection!="" &&  myState.select_a_collection=="Service_awards" && <div className='col-md-12 mt-4'>
                                            <label style={{color:'#fff',fontSize:'0.9rem', fontWeight:'540'}}>Years of service</label>
                                        </div>
                                        }
                                      
                                        {myState.select_a_collection!="" &&<div className='col-md-12 mt-3'>
                                            <div className='row m-0'>
                                                <div className='col-md-6 p-0 d-flex justify-content-center'>
                                                    <div className='upload-image' onClick={()=>{
                                                setModalList({...modalList,gallary_m:true })
                                                showModal();}}>
                                                        {selectedNFT==null ?<span>Preview  </span>:<img src={selectedNFT.cardImg} style={{width:'100%',height:'100%'}} />}
                                                    </div>
                                                    {modalList.gallary_m && <Modal  width={700} bodyStyle={{height:'420px',color:'#fff', background:'#101526'}} 
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
                                                                            {dynamicCardsData.map((val, i)=><div onClick={()=>handleNFTSelection(val)}  key={'popupGallery'+i} style={{width:"200px",height:'270px'}}>
                                                                                <DarkCards cardImg={val.cardImg} title={val.title}></DarkCards>
                                                                            {/* <DynamicC rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards> */}
                                                                            </div>)}
                                                                                            
                                                                        </Carousel>
                                                                    </Suspense>

                                                                </div>
                                                            </div>
                                                        
                                                        </div>
                                                </Modal>}
                                                </div>
                                                <div className='col-md-6 p-0'>
                                                    <div className='recognize-menu'>
                                                        <div className='row'> 
                                                            {myState.select_a_collection=="Recognition_awards"   && myState.value_tab && rec_menu.map((val,i)=><div key={"recMenuValue"+i} id={"recMenuValue"+i} onClick={()=>handleStrategy_N_ValueMenu("recMenuValue",i)} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                            {myState.select_a_collection=="Recognition_awards" && myState.strategy_tab && rec_strategy_menu.map((val,i)=><div key={"recMenuStrategy"+i} id={"recMenuStrategy"+i} onClick={()=>handleStrategy_N_ValueMenu("recMenuStrategy",i)} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                            {myState.select_a_collection=="Service_awards"  && yrs_menu.map((val,i)=><div key={"recMenu"+i} onClick={()=>handleStrategy_N_ValueMenu("yrsOfService",i)} id={"yrsOfService"+i} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {myState.select_a_collection!="" && <div className='col-md-12 mt-3'>
                                            <label className='text-label'>Reason</label><br/>
                                            <label className='text-label-secondary'>Let the recipient know why they’re recieving this.</label> <br/>
                                            <textarea className='mt-1 description'></textarea>
                                        </div>}
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

export default RecognizeAnEmp;