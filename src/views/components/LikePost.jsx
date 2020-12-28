import React, { useState, useEffect } from "react";
import { Button } from "@fluentui/react-northstar";

import { isAuth, getCookie } from "../../controllers/localStorage";
import axios from "axios";

const Like = ({ postId }) => {
  const [isLike, setLike] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    getLike();
    // eslint-disable-next-line
  }, []);

  const getLike = () => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const { likeBy } = res.data.data;
        setLike(likeBy.includes(isAuth()._id));
        setNumber(likeBy.length);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const likePost = () => {
    const token = getCookie("token");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/like`,
        {
          postId: postId,
          userId: `${isAuth()._id}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const unLikePost = () => {
    const token = getCookie("token");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/unlike`,
        {
          postId: postId,
          userId: `${isAuth()._id}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div
      style={{
        width: "100%",
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {isLike ? (
        <Button
          icon={<i class="fas fa-heart fa-2x"></i>}
          text
          iconOnly
          onClick={() => {
            unLikePost();
            setLike(false);
            setNumber(number - 1);
          }}
        />
      ) : (
        <Button
          icon={<i class="far fa-heart fa-2x"></i>}
          text
          iconOnly
          onClick={() => {
            likePost();
            setLike(true);
            setNumber(number + 1);
          }}
        />
      )}
      <text style={{ marginLeft: 20, fontWeight: "bold" }}>{number} likes</text>
    </div>
  );
};

export default Like;
