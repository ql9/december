import React, { useState } from "react";
import { isAuth, getCookie } from "../../controllers/localStorage";
import axios from "axios";
import { toast } from "react-toastify";

const Post = ({ history }) => {
  const [formData, setFormData] = useState({
    conntent: "",
    textChange: "Post",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChangeImage = (image) => {
    console.log(image.target.files[0]);
    setImagePreview(URL.createObjectURL(image.target.files[0]));
    setImage(image.target.files[0]);
  };

  const { content, textChange } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    const token = getCookie("token");
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: "Submitting" });
    const data = new FormData();
    data.append("file", image);
    data.append("content", content);
    data.append("userId", `${isAuth()._id}`);

    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/post`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success("Posted Successfully");
        setFormData({ ...formData, textChange: "Post" });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <form
        className="w-full flex-1 mt-8 text-indigo-500"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-xs relative ">
          <textarea
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            placeholder="Type here ..."
            onChange={handleChange("content")}
            value={content}
          ></textarea>
          {/* eslint-disable-next-line */}
          <img src={imagePreview} />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type="file"
            onChange={handleChangeImage}
          />
          <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            {/* <i className="fas fa-user-plus fa 1x w-6  -ml-2" /> */}
            <span className="ml-3">{textChange}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
