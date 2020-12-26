import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isAuth, getCookie } from "../../controllers/localStorage";
import Header from "../components/Header";
import {
  Avatar,
  Text,
  Button,
  TextArea,
  Image,
  List,
} from "@fluentui/react-northstar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PostDetail = ({ history }) => {
  const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0);
  const [listComment, setListComment] = useState([]);
  const [loadComment, setLoadComment] = useState(false);
  const location = useLocation();
  const checkLiked = (data) => {
    const check = data.indexOf(isAuth()._id);
    return check > -1;
  };
  const postComment = (content) => {
    const token = getCookie("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comment`,
        {
          postId: location.state.postId,
          userId: isAuth()._id,
          content: content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setComment("");
        setLoadComment(!loadComment);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getPostById = () => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${location.state.postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setNumber(res.data.data.likeBy.length);
        setIsLike(checkLiked(res.data.data.likeBy));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getCommentsByPostId = () => {
    const token = getCookie("token");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/comment/${location.state.postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        const data = [];
        const arr = res.data.results;
        arr.forEach((element) => {
          const { userId, key, avatar, header, headerMedia, content } = element;
          data.push({
            key,
            media: (
              <Image
                src={avatar}
                avatar
                onClick={() => {
                  history.push(`/post/u/${userId}`, {
                    userId: userId,
                  });
                }}
              />
            ),
            header,
            headerMedia,
            content,
          });
        });
        setListComment(data);
      })
      .catch((err) => {
        toast.error(`abc ${err.response.statusText}`);
      });
  };

  const likePost = () => {
    const token = getCookie("token");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/like`,
        {
          postId: location.state.postId,
          userId: `${isAuth()._id}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLike(true);
        setNumber(number + 1);
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
          postId: location.state.postId,
          userId: `${isAuth()._id}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLike(false);
        setNumber(number - 1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCommentsByPostId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadComment]);

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 30,
            width: 1000,
            height: 600,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
          }}
        >
          <div style={{ flex: 4 }}>
            <Image src={location.state.image} style={{ height: "100%" }} />
          </div>
          <div
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                display: "flex",
                paddingLeft: 16,
                paddingRight: 16,
                marginTop: 10,
              }}
            >
              <Avatar image={location.state.avatar} />
              <Text
                content={location.state.name}
                style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                flex: 2,
                borderBottomWidth: 1,
                display: "flex",
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 10,
              }}
            >
              <text>{location.state.content}</text>
            </div>
            <div
              style={{
                width: "100%",
                flex: 9,
                flexDirection: "column",
                display: "flex",
                borderBottomWidth: 1,
                overflow: "scroll",
              }}
            >
              {listComment ? (
                <List items={listComment} selectable={true} />
              ) : null}
            </div>
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
                    setIsLike(false);
                  }}
                />
              ) : (
                <Button
                  icon={<i class="far fa-heart fa-2x"></i>}
                  text
                  iconOnly
                  onClick={() => {
                    likePost();
                    setIsLike(true);
                  }}
                />
              )}
              <Button
                icon={
                  <i
                    class="far fa-comment fa-2x"
                    style={{ marginLeft: 20 }}
                  ></i>
                }
                text
                iconOnly
              />
              <text style={{ marginLeft: 20, fontWeight: "bold" }}>
                {number} likes
              </text>
            </div>
            <div
              style={{
                width: "100%",
                flex: 2,
                flexDirection: "row",
                display: "flex",
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <TextArea
                placeholder="Type comment here..."
                style={{
                  flex: 10,
                  backgroundColor: "#FFFFFF",
                  paddingTop: 37,
                }}
                onChange={(text) => setComment(text.target.value)}
                value={comment}
              />
              <Button
                content="Comment"
                text
                style={{ alignSelf: "center" }}
                disabled={comment ? false : true}
                onClick={() => {
                  postComment(comment);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
