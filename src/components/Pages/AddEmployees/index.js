import React, { Suspense, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import readXlsxFile from 'read-excel-file';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import { message } from 'antd'

const AddEmployees =()=>{

    const [csvFile,setFile] = useState(null);

    const handleChangeFile=async(e)=>{
        readXlsxFile(e.target.files[0]).then((rows) => {
           console.log(rows);
           // `rows` is an array of rows
           // each row being an array of cells.
           setFile(rows)
         })
   }

    const submitFaucetRequest = async () => {
        if (csvFile.length < 1) return;
        let arrayOfAddresses = csvFile.map(item => {
            return {
                name: item[1],
                address: item[0]
            }
        }); 

        const requestUrl = 'https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/whitelist'
        const response = await axios.post(requestUrl, arrayOfAddresses);
        console.log(response);
        if (response.status === 200) {
            message.success("Collection successfully created");
        } else {
            message.error("Error creating collection")
        }
        setFile(null);
    }


    return <>
                <div className='row m-0'>
                    <div className='col-md-12 p-0'>
                        <div className='recog-an-emp'>
                            <div className='row m-0'>
                                <div className='col-md-12 mt-3'>
                                    <span className='yr-collections-title'>Add to Whitelist</span>
                                </div>
                                <div className='col-md-12 d-flex align-items-center'>
                                    <div className='recog-form-page'>
                                        <div className='row'>
                                            <div className='col-md-4 text-label mt-4'>
                                                <label>Whitelist</label> <br/>
                                                <label htmlFor="uploadCsv" className="btn mt-1" style={{paddingLeft:0, paddingTop:"0.1rem"}} >
                                                        <div className='upload-csv'>Upload csv &nbsp; <AiOutlineUpload size={19}></AiOutlineUpload></div>
                                                        <input type="file" accept=".csv, .xls, .xlsx" style={{display:"none"}} onChange={handleChangeFile}  id="uploadCsv" name="file" multiple></input>
                                                </label>
                                            </div>
                                            <div className='col-md-3 text-label mt-4'>
                                                <label>Users to be added</label> <br/>
                                                <label className="d-flex align-items-center" style={{fontSize:'1.6rem', height:'3rem'}}>{csvFile!=null?csvFile.length:0}</label>
                                            </div>
                                            <div className='col-md-5'></div>
                                            <div className='col-md-12 mt-3'>
                                            <button className='submit-btn' onClick={() => submitFaucetRequest()} >Submit</button>
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