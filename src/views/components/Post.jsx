import React, { useState } from 'react';
import { isAuth, getCookie } from '../../controllers/localStorage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextArea, Button, Image } from '@fluentui/react-northstar';

const Post = ({ history, load, setLoad }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notify, setNotify] = useState('Post');

  const handleChangeImage = (image) => {
    setImagePreview(URL.createObjectURL(image.target.files[0]));
    setImage(image.target.files[0]);
  };

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
    const data = new FormData();
    data.append('file', image);
    data.append('content', content);
    data.append('userId', `${isAuth()._id}`);
    axios
      .post(`${process.env.REACT_APP_API_URL}/post`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success('Posted Successfully');
        setNotify('Post');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30,
        width: 800,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
      }}
    >
      <TextArea
        placeholder="Type here..."
        style={{
          marginTop: 20,
          width: '100%',
          flex: 10,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0.5,
          borderColor: '#C8C8C8',
        }}
        onChange={(text) => setContent(text.target.value)}
        value={content}
      />
      {imagePreview ? (
        <div style={{ height: 100, width: 100, display: 'flex', marginTop: 5 }}>
          <Image
            src={imagePreview}
            style={{ height: 100, width: 100, display: 'flex', marginTop: 5 }}
          />
          <Button
            icon={<i class="fas fa-times fa-1x"></i>}
            text
            iconOnly
            style={{
              width: 10,
              height: 10,
              position: 'relative',
              top: 15,
              right: 30,
            }}
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
          />
        </div>
      ) : null}
      <div style={{ flex: 3, display: 'flex', marginBottom: 10 }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <input
            type="file"
            style={{ alignSelf: 'center' }}
            onChange={handleChangeImage}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            content={notify}
            style={{ alignSelf: 'center' }}
            onClick={() => {
              handleSubmit();
            }}
            disabled={content ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
