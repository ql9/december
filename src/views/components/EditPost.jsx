import React, { useState, useEffect } from "react";
import {
  Avatar,
  Text,
  Button,
  Image,
  Dialog,
  Input,
  Flex,
  TextArea,
  CloseIcon,
  FilesImageIcon,
} from "@fluentui/react-northstar";

import { isAuth, getCookie } from "../../controllers/localStorage";
import { storage } from "../../controllers/firebase";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = ({ getPosts }) => {
  const [open, setOpen] = useState({
    name: "open",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const [content, setContent] = useState(null);

  const handleChangeImage = (i) => {
    if (!i.target.files[0]) {
      setImagePreview(URL.createObjectURL(image));
    } else {
      setImagePreview(URL.createObjectURL(i.target.files[0]));
    }

    setImage(i.target.files[0]);
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleSubmit = () => {
    storage.ref(`/images/${image.name}`).put(image);
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        const token = getCookie("token");
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/post`,
            {
              image: url,
              content: content,
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
            console.log(err.response);
          });
      });
  };

  return (
    <Dialog
      trapFocus
      open={open}
      headerAction={{
        icon: <CloseIcon />,
        title: "Close",
        onClick: () => setOpen(false),
      }}
      confirmButton={<Button text content="Post" style={{ color: "white" }} />}
      onConfirm={() => {
        if (content && imagePreview) {
          handleSubmit();
          setContent("");
          setImage(null);
          setImagePreview(null);
          setOpen(false);
        } else {
          console.log("khong dong");
        }
        // deleteComment(key);
        // setLoadComment(!loadComment);
      }}
      onOpen={() => setOpen(true)}
      onCancel={() => {
        setContent("");
        setImagePreview(null);
        setImage(null);
        setOpen(false);
      }}
      header={
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text content="Create post" size="larger" />
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
            onChange={(text) => setContent(text.target.value)}
          />
          <Image
            src={imagePreview}
            style={{
              height: "auto",
              width: "auto",
              // maxWidth: 600,
              // maxHeight: 600,
            }}
          />
        </div>
      }
      footer={{
        children: (Component, props) => {
          const { styles, ...rest } = props;
          return (
            <Flex styles={styles}>
              <input
                type="file"
                style={{
                  display: "none",
                }}
                onChange={handleChangeImage}
                id="selectedImage"
              />
              <Text
                content={
                  <Button
                    icon={<FilesImageIcon size="large" />}
                    // content={textChange}
                    onClick={() => {
                      document.getElementById("selectedImage").click();
                    }}
                  />
                }
                color="brand"
              />
              <Flex.Item push>
                <Component {...rest} />
              </Flex.Item>
            </Flex>
          );
        },
      }}
      trigger={
        <Input
          fluid
          placeholder={`What's on you mind?`}
          style={{
            width: "100%",
            flex: 10,
            marginLeft: 20,
          }}
        />
      }
      style={{
        overflow: "scroll",
      }}
    />
  );
};

export default EditPost;
