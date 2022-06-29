import React, { useState } from 'react';
import { Modal } from 'antd';
import { FaTimes } from 'react-icons/fa';

const RecognizeAnEmp =()=>{

    const [selectedNFT, setNFTSelection] = useState(null);
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
                                            <label className='select_collection ' onClick={showModal}>Select a collection</label>
                                            <Modal  width={650} bodyStyle={{height:'250px',color:'#fff', background:'#101526'}} 
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
                                                                <button className={'btn mint-blue-btn'} id="internal_form" >Recognition awards</button>
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <button className={'btn  mint-unselected-btn '} id="external_form" >Service awards</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12 mt-3 responsive_blue_btn'>
                                                        <button onClick={handleOk}>Select</button>
                                                    </div>
                                                </div>
                                            </Modal>
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
                                        
                                        <div className='col-md-12 mt-4'>
                                            <div className='row'>
                                                <div className='col-md-6 '>
                                                    <button className={'btn mint-blue-btn'} id="internal_form" >Value</button>
                                                </div>
                                                <div className='col-md-6 '>
                                                    <button className={'btn  mint-unselected-btn '} id="external_form" >Strategy</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12 mt-3'>
                                            <div className='upload-image' onClick={showModal}>
                                                {selectedNFT==null ?<span>Select Collection  </span>:<img src={selectedNFT.cardImg} style={{width:'100%',height:'100%'}} />}
                                            </div>
                                        </div>
                                        <div className='col-md-12 mt-3'>
                                            <label className='text-label'>Reason</label><br/>
                                            <label className='text-label-secondary'>Let the recipient know why they’re recieving this.</label> <br/>
                                            <textarea className='mt-1 description'></textarea>
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