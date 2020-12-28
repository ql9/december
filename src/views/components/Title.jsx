import React, { useState, useEffect } from "react";
import {
  Avatar,
  Text,
  Button,
  Popup,
  MoreIcon,
  TrashCanIcon,
  EditIcon,
  Dialog,
  ItemLayout,
  CloseIcon,
  TextArea,
  Image,
} from "@fluentui/react-northstar";

import { isAuth, getCookie } from "../../controllers/localStorage";
import axios from "axios";
import { toast } from "react-toastify";

const Title = ({
  history,
  avatar,
  name,
  postId,
  headerMedia,
  userId,
  content,
  image,
  getPosts,
  setContent,
}) => {
  const [open, setOpen] = useState(true);
  const closePopup = () => {
    setOpen(false);
  };
  const [openEdit, setOpenEdit] = useState(true);
  const closeEdit = () => {
    setOpenEdit(false);
  };

  const [content_e, setContent_e] = useState(content);

  const deletePost = () => {
    const token = getCookie("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.success("Deleted");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = () => {
    const token = getCookie("token");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post`,
        {
          content: content_e,
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
        getPosts();
        toast.success(res.data.message);
      })
      .catch((err) => {
        setContent(content_e);
        toast.success("Updated Post Successfully");
      });
  };

  useEffect(() => {
    closePopup();
    closeEdit();
  }, []);

  return (
    <ItemLayout
      style={{ padding: 10, borderBottomWidth: 1 }}
      media={
        <Avatar
          image={avatar}
          onClick={() => {
            history.push(`/posts/u/${userId}`, {
              userId: userId,
            });
          }}
        />
      }
      header={
        <Text
          weight="bold"
          content={name}
          style={{ marginLeft: 10, fontSize: 16 }}
        />
      }
      content={
        <Text content={headerMedia} style={{ marginLeft: 10, fontSize: 14 }} />
      }
      endMedia={
        <Popup
          open={open}
          onOpenChange={(e, { open }) => setOpen(open)}
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
                trapFocus
                open={openEdit}
                headerAction={{
                  icon: <CloseIcon />,
                  title: "Close",
                  onClick: () => setOpen(false),
                }}
                confirmButton={
                  <Button text content="Post" style={{ color: "white" }} />
                }
                onConfirm={() => {
                  if (content_e) {
                    handleSubmit();
                    setContent_e(content_e);
                    setOpenEdit(false);
                    setOpen(false);
                  }
                }}
                onOpen={() => setOpenEdit(true)}
                onCancel={() => {
                  setContent_e(content);
                  setOpenEdit(false);
                  setOpen(false);
                }}
                header={
                  <div
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <Text content="Edit post" size="larger" />
                  </div>
                }
                content={
                  <div>
                    <TextArea
                      placeholder="What's on you mind?"
                      style={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        fontSize: 16,
                      }}
                      onChange={(text) => setContent_e(text.target.value)}
                      value={content_e}
                    />
                    <Image
                      src={image}
                      style={{
                        height: "auto",
                        width: "auto",
                        // maxWidth: 600,
                        // maxHeight: 600,
                      }}
                    />
                  </div>
                }
                trigger={<Button icon={<EditIcon />} text content="Edit" />}
                style={{
                  overflow: "scroll",
                }}
              />

              <Dialog
                cancelButton="Cancel"
                confirmButton="Yes"
                onConfirm={() => {
                  deletePost();
                  try {
                    getPosts();
                  } catch {
                    history.push("/");
                  }

                  closePopup();
                }}
                onCancel={() => {
                  closePopup();
                }}
                header="Do you want delete this post?"
                trigger={
                  <Button icon={<TrashCanIcon />} text content="Delete" />
                }
              />
            </div>
          }
        />
      }
    />
  );
};

export default Title;
