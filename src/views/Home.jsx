import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../controllers/localStorage";
import Header from "./components/Header.jsx";
import Post from "./components/Post.jsx";
import ItemPost from "./components/ItemPost.jsx";
import axios from "axios";

function Home({ history }) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const getPosts = () => {
    const token = getCookie("token");
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
  }, [load]);

  return (
    <div>
      <Header history={history} flag={true} />
      <div
        style={{
          backgroundColor: "#F8F8F8",
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <ToastContainer />
        <Post load={load} setLoad={setLoad} />
        {data.length ? (
          data.map((item) => {
            return (
              <ItemPost
                postId={item.postId}
                avatar={item.avatar}
                name={item.name}
                content={item.content}
                image={item.image}
                likeBy={item.likeBy}
                userId={item.userId}
                history={history}
              />
            );
          })
        ) : (
          <div style={{ flex: 20 }}></div>
        )}
      </div>
    </div>
  );
}

export default Home;
