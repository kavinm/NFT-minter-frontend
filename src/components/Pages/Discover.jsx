import React, { Suspense, useState, useEffect } from 'react';
import {FiSend} from 'react-icons/fi';
import {BiCopy} from 'react-icons/bi';
import {AiOutlineUpload} from 'react-icons/ai';
import {BsFillPersonFill, BsPeopleFill, BsPlusCircleFill} from 'react-icons/bs';
import BlueBanner from './Discover/BlueBanner';
import ExampleNFTs from './Discover/ExampleNFTs';
import YourCollection from './YourCollection';
import CarouselCollection from './YourCollection/CarouselCollection';
import CreateCollection from './CreateCollection';
import RecognizeAnEmp from './RecognizeAnEmp';
import RecognizeATeam from './RecognizeATeam';
import AddEmployees from './AddEmployees';
// import { AiOutlineUpload } from 'react-icons/ai';
import FaucetContract from '../../utils/FaucetContract.json'
import { utils } from "ethers";
import axios from "axios";

const Discover =()=>{

    // const [uploadNftImg, setNftImg] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);

    const getAddresses = async () => {
        console.log("Yo")
        try {
            const { ethereum } = window
            if (ethereum) {  
                
                const accounts = await ethereum.request({ method: "eth_accounts" });
                console.log(accounts);
                const whitelist_url = `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/whitelist/${utils.getAddress(ethereum.selectedAddress)}`
                const whitelist_response = await axios.get(whitelist_url, {headers: {
                    password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
                }})
                if (whitelist_response.data?.access_granted) {
                    setIsVerified(true)
                }
            } else {
                console.log("No eth provider")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAddresses();
    }, [])


    const renderActive = (id) => {
        if (currentTab === id) {
            return "active";
        } else {
            return "";
        }
    }

    const renderTabs = () => {

        let baseTabs = [
            {title:'Discover', tab:'discover', icon:<FiSend size={18}></FiSend>, id:'wallet-tab-1', classname:"", index: 0},
            {title:'Recognize an employee', tab:'recog_employee', icon:<BsFillPersonFill size={18}></BsFillPersonFill>, id:'wallet-tab-2', classname:"", index: 1},
            {title:'Recognize a team', tab:'recog_team', icon:<BsPeopleFill size={18}></BsPeopleFill>, id:'wallet-tab-3', classname:"", index: 2},
            {title:'Your Collections', tab:'yrCollection', icon:<BiCopy size={19}></BiCopy>, id:'wallet-tab-4', classname:"", index: 3},
        ]

        if (isVerified) {
            baseTabs.push({title:'Create a collection', tab:'create_collection', icon:<BsPlusCircleFill size={18}></BsPlusCircleFill>, id:'wallet-tab-5', classname:"", index: 4})
            baseTabs.push({title:'Add to Whitelist', tab:'fill_wallet', icon:<AiOutlineUpload size={18}></AiOutlineUpload>, id:'wallet-tab-6', classname:"", index: 5})
        }

        return baseTabs
    }

    const renderMainPage = () => {

        switch(currentTab) {
            case 0:
                return <ExampleNFTs/>;
            case 1:
                return <RecognizeAnEmp/>;
            case 2:
                return <RecognizeATeam/>;
            case 3:
                return <YourCollection/>;
            case 4:
                return <CreateCollection/>;
            case 5:
                return <AddEmployees/>;
            default:
                return <ExampleNFTs/>;
        }
    }

    const renderBottomPart = () => {
        switch(currentTab) {
            case 0:
                return <BlueBanner/>;
            case 3:
                return <CarouselCollection/>;
            default:
                return <BlueBanner/>;
        }
    }


    return <>
            <div className='row m-0'>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-area'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='wallet-side-bar pt-3'>
                                    {renderTabs().map((r,i)=> <div className={"wallet-tabs " + renderActive(r.index)} id={r.id} onClick={()=>setCurrentTab(r.index)}> 
                                        {r.icon} &nbsp; &nbsp; {r.title}
                                    </div>)}
                                </div>
                            </div>
                            <div className='col-md-9 '>
                                {renderMainPage()}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-bottom-area'>
                        {renderBottomPart()}
                    </div>
                </div>
            </div>
    </>
}

export default Discover;