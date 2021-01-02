import React, { useState, useEffect } from "react";
import { isAuth, getCookie, signout } from "../../controllers/localStorage";
import Header from "../components/Header";
import {
  Avatar,
  Text,
  Button,
  TextArea,
  Image,
  List,
  MoreIcon,
  Popup,
  Dialog,
  TrashCanIcon,
  SendIcon,
  ItemLayout,
} from "@fluentui/react-northstar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Like from "../components/LikePost";
import Title from "../components/Title";

const PostDetail = ({ history }) => {
  const location = useLocation();
  const [content, setContent] = useState(location.state.content);
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [loadComment, setLoadComment] = useState(false);

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
        // console.log(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signout();
        }
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
              <Avatar
                image={avatar}
                onClick={() => {
                  history.push(`/posts/u/${userId}`, {
                    userId: userId,
                  });
                }}
              />
            ),
            header: <Text weight="semibold" content={header} />,
            headerMedia,
            content,
            endMedia: (
              <Popup
                align="end"
                position="above"
                trigger={
                  <MoreIcon
                    title="More"
                    hidden={userId === isAuth()._id ? false : true}
                  />
                }
                content={
                  <div>
                    <Dialog
                      cancelButton="Cancel"
                      confirmButton="Yes"
                      onConfirm={() => {
                        deleteComment(key);
                        setLoadComment(!loadComment);
                      }}
                      header="Do you want delete this comment?"
                      trigger={
                        <Button icon={<TrashCanIcon />} text content="Delete" />
                      }
                    />
                  </div>
                }
              />
            ),
          });
        });
        setListComment(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signout();
          history.push("/login");
        }
        // toast.error(`abc ${err.response.statusText}`);
      });
  };

  const deleteComment = (commentId) => {
    const token = getCookie("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setLoadComment(!loadComment);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signout();
          history.push("/login");
        }
        console.log(err.response);
      });
  };

  useEffect(() => {
    getCommentsByPostId();
    // eslint-disable-next-line
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
          <div
            style={{
              display: "inline-block",
              position: "relative",
              flex: 5,
              background: "black",
            }}
          >
            <Image
              src={location.state.image}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "100%",
                height: "auto",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
              }}
            />
          </div>
          <div
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title
              avatar={location.state.avatar}
              name={location.state.name}
              postId={location.state.postId}
              headerMedia={location.state.headerMedia}
              userId={location.state.userId}
              history={history}
              image={location.state.image}
              content={content}
              setContent={setContent}
            />
            <Text
              style={{
                width: "100%",
                borderBottomWidth: 1,
                display: "flex",
                padding: 20,
                fontSize: 18,
              }}
              content={content}
            />
            {listComment ? (
              <List
                style={{
                  width: "100%",
                  flex: 9,
                  flexDirection: "column",
                  display: "flex",
                  borderBottomWidth: 1,
                  overflow: "scroll",
                }}
                items={listComment}
                selectable={true}
              />
            ) : null}
            <Like
              postId={location.state.postId}
              history={location.state.history}
            />
            <ItemLayout
              content={
                <TextArea
                  style={{ paddingTop: 20, background: "white" }}
                  placeholder="Type comment here..."
                  onChange={(text) => setComment(text.target.value)}
                  value={comment}
                />
              }
              endMedia={
                <Button
                  text
                  iconOnly
                  icon={<SendIcon size="large" rotate={-15} />}
                  disabled={comment ? false : true}
                  onClick={() => {
                    postComment(comment);
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
