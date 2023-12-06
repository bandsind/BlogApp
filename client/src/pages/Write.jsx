import React, { useState } from "react";
import ReactQuill from "react-quill";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http:/server/uploads/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http:/server/routes/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`http:/server/routes/posts`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };


  // JSX markup for the Write component
  return (
    <div className="add">
      <div className="content">
        {/* Input for post title */}
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* React Quill editor for post content */}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      {/* Category selection and publish options */}
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "crops"}
              name="cat"
              value="crops"
              id="crops"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="crops">Crops</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "livestock"}
              name="cat"
              value="livestock"
              id="livestock"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="livestock">Livestock</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "sustainability"}
              name="cat"
              value="sustainability"
              id="sustainability"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sustainability">Sustainability</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "tech"}
              name="cat"
              value="tech"
              id="tech"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="tech">Tech</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "markets"}
              name="cat"
              value="markets"
              id="markets"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="markets">Markets</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
