import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getCookie, signout } from "../../controllers/localStorage";
import Header from "../components/Header.jsx";
import ItemPost from "../components/ItemPost.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PostOfUser({ history }) {
  const [data, setData] = useState([]);
  const location = useLocation();
  const getPostsByUserId = (userId) => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/u/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signout(() => history.push("/login"));
        }
        console.log(err.response);
      });
  };
  useEffect(() => {
    getPostsByUserId(location.state.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header history={history} flag={false} />
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

export default PostOfUser;
