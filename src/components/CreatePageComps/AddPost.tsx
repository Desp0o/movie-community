import { useEffect, useState } from "react";
import "./CreatePageStyles.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import SendPostBTN from "./SendPostBTN";

Quill.register("modules/blotFormatter", BlotFormatter);

const AddPost = () => {
  const [postValue, setPostValue] = useState({
    image: "",
    title: "",
    body: "",
  });

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (value: any) => {
    setPostValue({ ...postValue, body: value });
  };

  useEffect(()=>{
    console.log(postValue);
    
  },[postValue])

  // const handleFileChange = (event: any) => {
  //   // Handle file change here
  //   // For example, you can access the file using event.target.files[0]
  // };

  const modules = {
    blotFormatter: {},
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // text color and background color
      [{ font: [] }], // font family
      [{ align: [] }], // text alignment
      // ["image"],
      ["link"], // add a link option
      // ["video"], // add a video embed option
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    // "image",
    "code-block",
    "align",
    // "video",
    "formula",
    "table",
    "color",
    "background",
    "font",
    "script",
    "size",
    "blockquote",
    "float",
  ];

  return (
    <div className="add_post">
      <input type="file" />
      <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />
      <div className="quill_container">
        <ReactQuill
          theme="snow"
          value={postValue.body}
          onChange={handlePostBody}
          modules={modules}
          formats={formats}
          className="text-editor"
        />
      </div>

      <SendPostBTN />
    </div>
  );
};

export default AddPost;
