import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/pageLayout/PageLayout";
import SendPostBTN from "../components/CreatePageComps/SendPostBTN";
import axios from "axios";
import Fetching from "../components/fetchingComponent/Fetching";

const EditPost = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  const [postValue, setPostValue] = useState<{
    title: string;
    text: string;
  }>({
    title: "",
    text: "",
  });

  useEffect(() => {
    console.log(postValue);
  }, [postValue]);

  useEffect(() => {
    const requestSInglePost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SINGLE_POST}${id}`
        );
        console.log(response);
        setPostValue({
          ...postValue,
          title: response.data[0].title,
          text: response.data[0].text === null ? " " : " ",
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestSInglePost();
  }, []);

  const handlePostTitle = (event: { target: { value: string } }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue({ ...postValue, text: event.target.value });
  };

  const sendPost = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_POST_EDIT}${id}`,
        postValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const CreatePost = () => {
    sendPost();
  };
  return (
    <div>
      <PageLayout>
        {isLoading ? <Fetching /> : <></>}
        <div className="add_post">
          <input
            value={postValue.title}
            type="text"
            className="input_style_createPage"
            placeholder="სათაური"
            onChange={handlePostTitle}
          />

          <textarea
            value={postValue.text}
            className="post_body"
            onChange={handlePostBody}
          />
          <SendPostBTN funName={CreatePost} />
        </div>
      </PageLayout>
    </div>
  );
};

export default EditPost;
