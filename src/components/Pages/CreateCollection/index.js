import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import readXlsxFile from 'read-excel-file';

const CreateCollection =()=>{
    

    const [uploadNftImg, setNftImg] = useState(null);
    const [csvFile,setFile] = useState(null);
    
    const handleChangeFileUpload=(e)=>{
        e.preventDefault();
        setNftImg(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0])
    }
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
                <div className='create-collection'>
                    <div className='row m-0'>
                        <div className='col-md-12 mt-3'>
                            <span className='yr-collections-title'>Create a collection</span>
                        </div>
                        <div className='col-md-12 mt-5'>
                            <div className='row m-0'>
                                <div className='col-md-4'>
                                    <div className='upload-img'>
                                        {uploadNftImg==null ?
                                            <label htmlFor="uploadCsv" className="btn mt-2 text-white d-flex" >
                                                <span>Upload Image </span>&nbsp;&nbsp;&nbsp;<AiOutlineUpload size={19} stroke={12}></AiOutlineUpload>
                                                <input type="file" accept="image/*" style={{display:"none"}} onChange={handleChangeFileUpload} id="uploadCsv" name="file" multiple></input>
                                            </label>:<img src={uploadNftImg} style={{width:'100%',height:'100%'}}/>
                                        }               
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div style={{width:'90%', marginLeft:'5%'}}>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label className='text-label'>
                                                    Collection name
                                                </label> <br/>
                                                <input type="text" className='form-input mt-1'/>
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Symbol
                                                </label> <br/>
                                                <input type="text" className='form-input mt-1' />
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label className='text-label'>
                                                    Elligible minters 
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
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 mt-3'>
                                    <label>Description</label>
                                    <br/>
                                    <textarea className='mt-1 description'></textarea>
                                </div>
                                <div className='col-md-12 mt-2'>
                                     <button className='btn submit-collection'>Create a Collection</button>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CreateCollection;