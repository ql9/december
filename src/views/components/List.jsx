import React, { useEffect, useState } from "react";
import { List, Image } from "@fluentui/react-northstar";
import { getCookie } from "../../controllers/localStorage";
import axios from "axios";
import { toast } from "react-toastify";

const ListComment = ({ history }) => {
  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    getCommentsByPostId("5fe4605d4e51780025ac3ca5");
    // eslint-disable-next-line
  }, []);

  const getCommentsByPostId = (postId) => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/comment/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
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

  console.log(listComment);

  return <List items={listComment} />;
};

export default ListComment;
