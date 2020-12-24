import React, { useState } from 'react';
import { isAuth, getCookie } from '../../controllers/localStorage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextArea, Button } from '@fluentui/react-northstar';

const Post = ({ history }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('toan');
  const [notify, setNotify] = useState('Post');

  const getPosts = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = () => {
    const token = getCookie('token');
    setNotify('Submitting');
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        {
          userId: `${isAuth()._id}`,
          content: content,
          image: image,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success('Posted Successfully');
        setNotify('Post');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    // <div>
    //   <form
    //     className="w-full flex-1 mt-8 text-indigo-500"
    //     onSubmit={handleSubmit}
    //   >
    //     <div className="mx-auto max-w-xs relative ">
    //       <textarea
    //         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
    //         placeholder="Type here ..."
    //         onChange={handleChange("content")}
    //         value={content}
    //       ></textarea>

    //       <input
    //         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
    //         type="text"
    //         placeholder="Image"
    //         onChange={handleChange("image")}
    //         value={image}
    //       />
    //       <button
    //         type="submit"
    //         className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    //       >
    //         {/* <i className="fas fa-user-plus fa 1x w-6  -ml-2" /> */}
    //         <span className="ml-3">{textChange}</span>
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30,
        width: 1000,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
      }}
    >
      <TextArea
        placeholder="Type content here..."
        style={{
          marginTop: 20,
          width: '100%',
          flex: 10,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0.5,
          borderColor: '#C8C8C8',
        }}
        onChange={(text) => setContent(text.target.value)}
      />
      <div style={{ flex: 3, display: 'flex', marginBottom: 10 }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <Button
            content="Image"
            style={{ alignSelf: 'center' }}
            onClick={() => getPosts()}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            content={notify}
            style={{ alignSelf: 'center' }}
            onClick={() => handleSubmit()}
            disabled={content ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
