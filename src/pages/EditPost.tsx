import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../components/pageLayout/PageLayout'
import { useUserHook } from '../hooks/useUserHook'
import SendPostBTN from '../components/CreatePageComps/SendPostBTN'
import axios from 'axios'

const EditPost = () => {
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const { user } = useUserHook()
  const [isLoading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [postValue, setPostValue] = useState<{
    img: File | undefined;
    title: string;
    text: string;
    user_id: number | string;
    type: number | null;
  }>({
    img: undefined,
    title: "",
    text: "",
    user_id: user.userID,
    type: null
  });

  useEffect(()=>{

    if(postValue.img?.type.includes('video')){
      setPostValue({ ...postValue, type: 1 });
    }

    if(postValue.img?.type.includes('image')){
      setPostValue({ ...postValue, type: 0 });
    }
    
  },[postValue.img])

  useEffect(()=>{
    console.log(postValue);
    
  },[postValue])

  const [data, setData] = useState({})
  useEffect(()=>{
    const requestSInglePost = async () => {
      try {
          const response  = await axios.get(`${import.meta.env.VITE_SINGLE_POST}${id}`)
          console.log(response);
          setData(response.data[0])
          setPostValue({...postValue, title: response.data.title, text:response.data.text})
      } catch (error) {
        
      }
    }
    requestSInglePost()

  },[])

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue({ ...postValue, text: event.target.value });
  };

  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }

    setPostValue({ ...postValue, img: file });
  };

  const sendPost = async () => {   
    setLoading(true)             
      try {
        const res = await axios.post(`${import.meta.env.VITE_POST_EDIT}${id}`, {
            title: postValue.title, text: postValue.text
        },
    {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })          
          console.log(res.data);
      } catch (error: any) {
          console.log(error.response.data);
      }finally{
        setLoading(false)
      }
  }

  const CreatePost = () => {
    sendPost()
  }
  return (
    <div>
        <PageLayout>
        <div className="add_post">
      <div className="upload_image" onClick={handleButtonClick}>
        <p style={{ color: "currentcolor" }}>ატვირთე სურათი</p>
      </div>

      <input
        ref={fileInputRef}
        multiple
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <input
      value={postValue.title}
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />

      <textarea value={postValue.text} className="post_body" onChange={handlePostBody} />
      <SendPostBTN funName={CreatePost} />
    </div>
        </PageLayout>
    </div>
  )
}

export default EditPost