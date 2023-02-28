import React, { useState, useEffect } from 'react';
import { Modal, Alert } from 'antd';
import { FaTimes } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
//import myNFT from "../utils/MyNFT.json";
import myNFT from "../../../utils/MyNFT.json"
import axios from "axios";
import { ethers, utils } from "ethers";
import { message } from 'antd';
import { useQuery } from 'react-query'

const fetchDirectory = async () => {
    return await axios.get("https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/directory", {headers: {
        password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
    }})
}

const RecognizeAnEmp =()=>{


    const directory = useQuery('directory', fetchDirectory)
    const [previewImgData, setPreviewImgData] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNFTModalVisible, setIsNFTModalVisible ] = useState(false);
    const [tokenURI, setTokenURI] = useState("")
    const [modalList, setModalList] = useState({
        collection_m:false,
        gallary_m:false,
    });

    const rec_menu = ["Integrity","Courage","Excellence", "Together", "For Better"];
    const rec_strategy_menu = ["Clients and Markets","People and Knowledge","Public Trust and Quality","Operational Excellence"]
    const yrs_menu = [5,10,15,20,25]
    const [myState, setState]=useState({
        value_tab:true,
        strategy_tab:false,
        select_a_collection:"",
        modalCollectionType:''
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null)

    useEffect(() => {
        console.log(selectedEmployee)
    }, [selectedEmployee])

    const [recognitionNote, setRecognitionNote] = useState("");

    const [yearsOfService, setYearsOfService] = useState(0);
    const [recMenuValue, setRecMenuValue] = useState("");
    const [recMenuStrategy, setRecMenuStrategy] = useState("");
    const [recognitionTitle, setRecognitionTitle] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.error("Make sure you have metamask");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.info(`Connected to ${account}`);
        } else {
            console.error("No authorized account found");
        }
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

      const toggleTab=(name)=>{
        setPreviewImgData(null)
        if(name==="value_tab")
            setState({...myState, value_tab:true, strategy_tab:false})
        if(name==="strategy_tab")
            setState({...myState, strategy_tab:true, value_tab:false})
      }
      

      const showModalNFT = () => {
        setIsNFTModalVisible(true);
      };
    
      const handleOkNFT = () => {
        setIsNFTModalVisible(false);
      };
    
      const handleCancelNFT = () => {
        setIsNFTModalVisible(false);
      };

    const handleStrategy_N_ValueMenu =(tabName, id)=>{

        console.log("Tabs: ", tabName)

        if (tabName === "yrsOfService") {

            setRecognitionTitle("Service Award")
            if(id===0){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005519792628838561/Service_Awards.png")
            }
            if(id===1){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005520243612975277/Service_Awards_7.png")
            }
            if(id===2){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005520243906588714/Service_Awards_6.png")
            }
            if(id===3){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005520061244641450/Service_Awards_5.png")
            }if(id===4){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005520045012688978/Service_Awards_4.png")
            }

            setYearsOfService(yrs_menu[id]);
        } else if (tabName === "recMenuValue") {
            setRecMenuValue(rec_menu[id]);
        } else if (tabName === "recMenuStrategy") {
            setRecMenuStrategy(rec_strategy_menu[id]);
        }

        if(tabName==="recMenuStrategy")
        {
            if(id===0){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005521389945618592/Group_298.png")
            }
            if(id===1){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005521390256005260/Group_299.png")
            }
            if(id===2){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005521719462735993/Screen_Shot_2022-08-06_at_1.04.16_PM.png")
            }
            if(id===3){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005521390880948286/Group_301.png")
            }
            document.getElementById(tabName+id).classList.add("active");
            for(let i=0;i<rec_strategy_menu.length;i++){
                if(id !== i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
        else
        if(tabName==="recMenuValue"){
            setRecognitionTitle("Recognition Award")

            document.getElementById(tabName+id).classList.add("active");
            if(id===0){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005522113853141032/Group_293.png")
            }
            if(id===1){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005522113450479646/Group_295.png")
            }
            if(id===2){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005522293541322792/Screen_Shot_2022-08-06_at_1.06.33_PM.png")
            }
            if(id===3){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005522112594853979/Group_296.png")
            }
            if(id===4){
                setPreviewImgData("https://media.discordapp.net/attachments/747950732753502291/1005522112171221082/Group_297.png")
            }
            
            //current change
            for(let i=0;i<rec_menu.length;i++){
                if(id !== i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
        else
        if(tabName==="yrsOfService"){
            document.getElementById(tabName+id).classList.add("active");
            for(let i=0;i<yrs_menu.length;i++){
                if(id !== i)
                    document.getElementById(tabName+i).classList.remove("active");
            }
        }
    }

    const mintSubmission = async () => {

        const whitelist_url = `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/whitelist/${utils.getAddress(window.ethereum.selectedAddress)}`
        const whitelist_response = await axios.get(whitelist_url, {headers: {
            password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
        }})

        if (!whitelist_response.data?.access_granted) {
            message.error({content:"You are not permitted to mint!", duration:3, className:'error-message'});
            return
        }

        let nftMetadata = {
            "name": recognitionTitle,
            "description": "Offered by Partner Name",
            "image": previewImgData,
            "recognition_note": recognitionNote,
            "attributes": [
                {trait_type: "Recognition Note", value: recognitionNote}
            ]
        }

        if (myState.modalCollectionType === "Service_awards") {
            nftMetadata["attributes"].push({trait_type: "Collection", value: "Service Award"});
            nftMetadata["attributes"].push({trait_type: "Years of Service", value: yearsOfService});
        } else if (myState.modalCollectionType === "Recognition_awards"){
            nftMetadata["attributes"].push({trait_type: "Collection", value: "Recognition Award"});
            if (myState.strategy_tab) {
                nftMetadata["attributes"].push({trait_type: "Strategy Type", value: recMenuStrategy});
            } else if (myState.value_tab) {
                nftMetadata["attributes"].push({trait_type: "Value Type", value: recMenuValue});
            }
        }

        const employeeData = JSON.parse(selectedEmployee)
        let formdata = new FormData();
        formdata.append('nft_metadata', JSON.stringify(nftMetadata))
        const tokenURIURL = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/urigenerate/with_image'
        const response_value = await axios.post(tokenURIURL, formdata, {
          maxBodyLength: 'Infinity',
          headers: {
            "Content-Type": "multipart/form-data",
            "password": "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
        }
        })

        const tokenuri = response_value.data.token_uri;

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const serviceAddress = "0xf2c70d56DAB5a149a8FA0C6732d2742357147d64"
                const recogAddress = "0xe201525cF38433556516e19dA81372ea95767304"
                let newContractAddress = myState.modalCollectionType === "Service_awards" ? serviceAddress : recogAddress
                
                const connectedContract = new ethers.Contract(
                    newContractAddress,
                    myNFT.abi,
                    signer
                );

                console.log("Going to pop wallet now to pay gas...");
                let nftTx = await connectedContract.mintNFT(employeeData.address, tokenuri);
                console.log("Finished minting")
                message.info({
                    content: `Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTx.hash}`,
                    duration: 5
                });
                const server_id = "https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/mintlog/"
                const response_value = await axios.post(
                    server_id, 
                    {
                        name: employeeData.name,
                        recipient: employeeData.address,
                        tokenuri: tokenuri,
                    },
                    {
                        maxBodyLength: 'Infinity',
                        headers: {
                            'Content-Type': 'application/json',
                            "password": "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
                        }
                    }
                )

                if (response_value.status !== 200) {
                    message.error({content:"Error adding log", duration:3, className:'error-message'});
                } else {
                    console.log(nftTx)
                    setTokenURI({
                        uri: previewImgData,
                        transaction: nftTx,
                        address: employeeData.address
                    })
                    showModalNFT();
                    console.log("Modal set to true")
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
                    <div className='recog-an-emp'>
                        <div className='row m-0'>
                            <div className='col-md-12 mt-3'>
                                <span className='yr-collections-title'>Recognize an employee</span>
                            </div>
                            <div className='col-md-12 d-flex align-items-center'>
                                <div className='recog-form-page'>
                                    <div className='row'>
                                        <div className='col-md-12 mt-3'>
                                            {myState.select_a_collection===""?<label className='select_collection ' onClick={()=>{
                                                setModalList({...modalList,collection_m:true })
                                                showModal();
                                            }}>Select a collection</label>:(myState.select_a_collection==="Recognition_awards"?<label className='select_recognition_awards ' onClick={()=>{
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
                                                                className={'btn ' +(myState.modalCollectionType==="Recognition_awards"?" mint-blue-btn ":" mint-unselected-btn ")} id="internal_form" >Recognition awards</button>
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <button onClick={()=>setState({...myState, modalCollectionType:'Service_awards'})} 
                                                                className={'btn ' +(myState.modalCollectionType==="Service_awards"?" mint-blue-btn ":" mint-unselected-btn ")} id="external_form" >Service awards</button>
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
                                            {
                                            <Modal  width={650} bodyStyle={{height:'500px',color:'#fff', background:'#101526'}} 
                                                onOk={handleOkNFT} onCancel={handleCancelNFT}
                                                visible={isNFTModalVisible} footer={null}
                                            >
                                                <div className='row create_collection_pop_up'>
                                                    <div className='col-md-12 mb-5 create_collection_pop_up_title p-0'>
                                                        <span>Select a Collection</span>
                                                        <FaTimes color={"#fff"} size={16} onClick={handleCancelNFT} className="pop-close-modal"></FaTimes>
                                                    </div>
                                                    <img style={{width: 250, marginLeft: 'auto', marginRight: 'auto', marginBottom: 30}} alt="nft" src={tokenURI.uri}></img>
                                                    <a href={`https://mumbai.polygonscan.com/tx/${tokenURI.transaction?.hash}`} target="_blank" rel="noreferrer"><strong>Transaction:</strong>https://mumbai.polygonscan.com/tx/{tokenURI.transaction?.hash}</a>
                                                    <a  href={`https://testnets.opensea.io/${tokenURI.address}`} target="_blank" rel="noreferrer"><strong>Find on opensea at: </strong>https://testnets.opensea.io/{tokenURI.address}</a>
                                                </div>
                                            </Modal>
                                            }
                                        </div>
                                        <div className='col-md-12 mt-2'>
                                            <label className='text-label'>Recipient wallet</label><br/>
                                            <select type="text" className='form-input mt-1' value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                                                {directory.data && directory.data.data.map(item => {
                                                    return (
                                                        <option value={JSON.stringify(item)} key={item.address}>{item.name} - {item.email} - {item.address}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        {myState.select_a_collection!=="" && myState.select_a_collection==="Recognition_awards" && <div className='col-md-12 mt-4'>
                                            <div className='value-strategy'>
                                                <label onClick={()=>toggleTab("value_tab")} className={myState.value_tab===true?'active-blue':'inactive-blue'}>Value</label>
                                                <label onClick={()=>toggleTab("strategy_tab")} className={myState.strategy_tab===true?'active-blue':'inactive-blue'}>Strategy</label>
                                            </div>
                                        </div>}
                                        {myState.select_a_collection!=="" &&  myState.select_a_collection==="Service_awards" && <div className='col-md-12 mt-4'>
                                            <label style={{color:'#fff',fontSize:'0.9rem', fontWeight:'540'}}>Years of service</label>
                                        </div>
                                        }
                                      
                                        {myState.select_a_collection!=="" &&<div className='col-md-12 mt-3'>
                                            <div className='row m-0'>
                                                <div className='col-md-6 p-0 d-flex justify-content-center'>
                                                    <div className='upload-image'>
                                                        {/* {selectedNFT==null ? */}
                                                        {previewImgData==null? <span>Preview  </span>:
                                                        <img src={previewImgData} alt="Empty" style={{width:'100%',height:'100%'}} />
                                                        // <img src={selectedNFT.cardImg} style={{width:'100%',height:'100%'}} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className='col-md-6 p-0'>
                                                    <div className='recognize-menu'>
                                                        <div className='row'> 
                                                            {myState.select_a_collection==="Recognition_awards"   && myState.value_tab && rec_menu.map((val,i)=><div key={"recMenuValue"+i} id={"recMenuValue"+i} onClick={()=>handleStrategy_N_ValueMenu("recMenuValue",i)} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                            {myState.select_a_collection==="Recognition_awards" && myState.strategy_tab && rec_strategy_menu.map((val,i)=><div key={"recMenuStrategy"+i} id={"recMenuStrategy"+i} onClick={()=>handleStrategy_N_ValueMenu("recMenuStrategy",i)} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                            {myState.select_a_collection==="Service_awards"  && yrs_menu.map((val,i)=><div key={"recMenu"+i} onClick={()=>handleStrategy_N_ValueMenu("yrsOfService",i)} id={"yrsOfService"+i} className={'col-md-12 recognize-menu-tabs '}>
                                                                {val}
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {myState.select_a_collection!=="" && <div className='col-md-12 mt-3'>
                                            <label className='text-label'>Reason</label><br/>
                                            <label className='text-label-secondary'>Let the recipient know why they're recieving this.</label> <br/>
                                            <textarea style={{color: 'black'}} className='mt-1 description' onChange={(e) => setRecognitionNote(e.target.value)}></textarea>
                                        </div>}
                                        <div className='row mt-2'>
                                            <div className='col-md-6 '>
                                                <button className='submit-btn' onClick={() => mintSubmission()}>Mint</button>
                                            </div>
                                            <div className='col-md-6 '>
                                                <Alert message="Notice: Please do not include any PII (Personal Identifiable Information)" type="warning" showIcon/>
                                            </div>
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