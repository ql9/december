import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { isAuth, getCookie } from '../controllers/localStorage';
import Header from './components/Header.jsx';
import Post from './components/Post.jsx';
import ItemPost from './components/ItemPost.jsx';
import axios from 'axios';

function Home({ history }) {
  const [data, setData] = useState([]);
  const getPosts = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(data);
  return data.length ? (
    <div>
      <Header history={history} />
      <div
        style={{
          backgroundColor: '#F8F8F8',
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <ToastContainer />
        <Post />
        {/* {data.forEach((element) => (
          // <ItemPost
          //   avatar={element.avatar}
          //   name={element.name}
          //   content={element.content}
          // />
          <text>{element.content}</text>
        ))} */}
        <ItemPost
          avatar={data[0].avatar}
          name={data[0].name}
          content={data[0].content}
        />
        <ItemPost
          avatar={data[1].avatar}
          name={data[1].name}
          content={data[1].content}
        />
      </div>
    </div>
  ) : null;
}

export default Home;
