import React, { Suspense, useState } from 'react';
import {FiSend} from 'react-icons/fi';
import {FaTimes} from 'react-icons/fa';
import {BiCopy} from 'react-icons/bi';
import {AiOutlineUpload} from 'react-icons/ai';
import {BsFillPersonFill, BsPeopleFill, BsPlusCircleFill} from 'react-icons/bs';
import BlueBanner from './Discover/BlueBanner';
import ExampleNFTs from './Discover/ExampleNFTs';
import MintSingleNft from './MintSingleNft';
import YourCollection from './YourCollection';
import CarouselCollection from './YourCollection/CarouselCollection';
import { Modal } from 'antd';
import CreateCollection from './CreateCollection';
import RecognizeAnEmp from './RecognizeAnEmp';
import RecognizeATeam from './RecognizeATeam';
// import { AiOutlineUpload } from 'react-icons/ai';

const Discover =()=>{

    const [SwitchCase, setSwitchCase]=useState({
        discover:true,
        recog_employee:false,
        recog_team:false,
        yrCollection:false,
        create_collection:false
    })

    // const [uploadNftImg, setNftImg] = useState(null);
    const [menuItems, setMenu] = useState([
        {title:'Discover', tab:'discover', icon:<FiSend size={18}></FiSend>, id:'wallet-tab-1', classname:"active"},
        {title:'Recognize an employee', tab:'recog_employee', icon:<BsFillPersonFill size={18}></BsFillPersonFill>, id:'wallet-tab-2', classname:""},
        {title:'Recognize a team', tab:'recog_team', icon:<BsPeopleFill size={18}></BsPeopleFill>, id:'wallet-tab-3', classname:""},
        {title:'Your Collections', tab:'yrCollection', icon:<BiCopy size={19}></BiCopy>, id:'wallet-tab-4', classname:""},
        {title:'Create a collection', tab:'create_collection', icon:<BsPlusCircleFill size={18}></BsPlusCircleFill>, id:'wallet-tab-5', classname:""},
        // {title:'Create a collection', tab:'create_collection', icon:<BsPlusCircleFill size={18}></BsPlusCircleFill>, id:'wallet-tab-6', classname:""}
        {title:'Add employees', tab:'fill_wallet', icon:<AiOutlineUpload size={18}></AiOutlineUpload>, id:'wallet-tab-6', classname:""}
    ])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    const handleSwitchTab=(name)=>{
        console.log(SwitchCase)
        var temp;
        const tab1= document.getElementById("wallet-tab-1");
        const tab2= document.getElementById("wallet-tab-2");
        const tab3= document.getElementById("wallet-tab-3");
        const tab4= document.getElementById("wallet-tab-4");
        const tab5= document.getElementById("wallet-tab-5");
        const tab6= document.getElementById("wallet-tab-6");
        if(name=="discover"){
            temp={discover:true,recog_employee:false,recog_team:false,yrCollection:false,create_collection:false}
            tab1.classList.add("active");
            tab2.classList.remove("active");
            tab3.classList.remove("active");
            tab4.classList.remove("active");
            tab5.classList.remove("active");
            tab6.classList.remove("active");
        }else
        if(name=="recog_employee"){
            temp={discover:false,recog_employee:true,recog_team:false,yrCollection:false,create_collection:false}
            tab2.classList.add("active");
            tab1.classList.remove("active");
            tab3.classList.remove("active");
            tab4.classList.remove("active");
            tab5.classList.remove("active");
            tab6.classList.remove("active");
        }else
        if(name=="recog_team"){
            temp={discover:false,recog_employee:false,recog_team:true,yrCollection:false,create_collection:false}
            tab3.classList.add("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
            tab4.classList.remove("active");
            tab5.classList.remove("active");
            tab6.classList.remove("active");
        }else
        if(name=="yrCollection"){
            temp={discover:false,recog_employee:false,recog_team:false,yrCollection:true,create_collection:false}
            tab3.classList.remove("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
            tab4.classList.add("active");
            tab5.classList.remove("active");
            tab6.classList.remove("active");
        }else
        if(name=="create_collection"){
            temp={discover:false,recog_employee:false,recog_team:false,yrCollection:false,create_collection:true}
            tab3.classList.remove("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
            tab4.classList.remove("active");
            tab6.classList.remove("active");
            tab5.classList.add("active");
        }else
        if(name=="fill_wallet"){
            temp={discover:false,recog_employee:false,recog_team:false,yrCollection:false,create_collection:true}
            tab3.classList.remove("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
            tab4.classList.remove("active");
            tab5.classList.remove("active");
            tab6.classList.add("active");
        }
        setSwitchCase(temp)
    }

    // const handleChangeFileUpload=(e)=>{
    //     e.preventDefault();
    //     setNftImg(URL.createObjectURL(e.target.files[0]));
    //     console.log(e.target.files[0])
    // }
    return <>
            <div className='row m-0'>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-area'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='wallet-side-bar pt-3'>
                                    {/* r.tab!="create_collection"?:showModal() */}
                                    {menuItems.map((r,i)=> <div className={"wallet-tabs "+r.classname} id={r.id} onClick={()=>handleSwitchTab(r.tab)}> 
                                        {r.icon} &nbsp; &nbsp; {r.title}
                                    </div>)}
                                    {/* <Modal  width={650} bodyStyle={{height:'420px',color:'#fff', background:'#101526'}} 
                                            onOk={handleOk} onCancel={handleCancel}
                                            visible={isModalVisible} footer={null}>
                                        <div className='row create_collection_pop_up'>
                                            <div className='col-md-12 mb-5 create_collection_pop_up_title p-0'>
                                                <span>Create a Collection</span>
                                                <FaTimes color={"#fff"} size={16} onClick={handleCancel} className="pop-close-modal"></FaTimes>
                                            </div>
                                            <div className='col-md-5'>
                                                <div className='img-holder'>
                                                    {uploadNftImg==null ? <label htmlFor="uploadCsv" className="btn mt-2 text-white d-flex" >
                                                        <span>Upload Image </span>&nbsp;&nbsp;&nbsp;<AiOutlineUpload size={19} stroke={12}></AiOutlineUpload>
                                                        <input type="file" accept="image/*" style={{display:"none"}} onChange={handleChangeFileUpload} id="uploadCsv" name="file" multiple></input>
                                                    </label>:<img src={uploadNftImg} style={{width:'100%',height:'100%'}}/>}
                                               
                                                </div>
                                            </div>
                                            <div className='col-md-7 p-0'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <label className='input-label'>Name</label>
                                                    </div>
                                                    <div className='col-md-12 mt-2'>
                                                        <input type="text" className='input-form'/>
                                                    </div>
                                                </div>
                                                <div className='row mt-3 mb-1'>
                                                    <div className='col-md-6 pr-0'>
                                                        <button className='selected-btn'>Individual awards</button>
                                                    </div>
                                                    <div className='col-md-6' style={{paddingLeft:0}}> 
                                                        <button  className='unselected-btn'>Team awards</button>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-md-12'>
                                                        <label className='input-label'>Symbol</label>
                                                    </div>
                                                    <div className='col-md-12 mt-2'>
                                                        <input type="text" className='input-form'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-12 create_collection_pop_up_footer'>
                                                <button onClick={handleOk}>Create a Collection</button>
                                            </div>
                                        </div>
                                    </Modal> */}
                                </div>
                            </div>
                            <div className='col-md-9 '>
                                {SwitchCase.discover && <ExampleNFTs></ExampleNFTs>}
                                {SwitchCase.recog_employee && <RecognizeAnEmp></RecognizeAnEmp>}
                                {/* <MintSingleNft mode="employee"></MintSingleNft>} */}
                                {/*  <MintSingleNft mode="team"></MintSingleNft> */}
                                {SwitchCase.recog_team && <RecognizeATeam></RecognizeATeam>}
                                {SwitchCase.yrCollection && <YourCollection></YourCollection>}
                                {SwitchCase.create_collection && <CreateCollection></CreateCollection>}
                                {}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-bottom-area'>
                        {SwitchCase.discover && <BlueBanner></BlueBanner>}
                        {SwitchCase.mintNft &&  <CarouselCollection></CarouselCollection>}
                        {SwitchCase.yrCollection && <CarouselCollection></CarouselCollection>}
                    </div>
                </div>
            </div>
    </>
}

export default Discover;