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

import { isAuth, getCookie, signout } from "../../controllers/localStorage";
import { storage } from "../../controllers/firebase";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = ({ getPosts, history }) => {
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState({
    name: "open",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [textChange, setTextChange] = useState("Add image");

  const [content, setContent] = useState(null);

  const handleChangeImage = (i) => {
    if (!i.target.files[0]) {
      setImagePreview(URL.createObjectURL(image));
    } else {
      setImagePreview(URL.createObjectURL(i.target.files[0]));
    }

    setImage(i.target.files[0]);
    setTextChange("Change image");
  };

  useEffect(() => {
    getUser();
    setOpen(false);
    // eslint-disable-next-line
  }, []);

  const getUser = () => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${isAuth()._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setName(res.data.user.name);
        setAvatar(res.data.user.avatar);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signout(() => history.push("/login"));
        }
      });
  };

  const handleSubmit = async () => {
    await storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(async () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const token = getCookie("token");
            axios
              .post(
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
                setContent("");
                setImage(null);
                setImagePreview(null);
                setOpen(false);
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  signout(() => history.push("/login"));
                }
                console.log(err.response);
              });
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        width: 800,
        height: 100,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
      }}
    >
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
        <Avatar image={avatar} />
        <Text
          content={name}
          style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}
        />
        <Dialog
          trapFocus
          open={open}
          headerAction={{
            icon: <CloseIcon />,
            title: "Close",
            onClick: () => setOpen(false),
          }}
          confirmButton={
            <Button text content="Post" style={{ color: "white" }} />
          }
          onConfirm={() => {
            if (content && imagePreview) {
              handleSubmit();
            }
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
                  maxWidth: 600,
                  maxHeight: 600,
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
                        content={textChange}
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
              placeholder={`What's on you mind, ${name} ?`}
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
      </div>
    </div>
  );
};

export default CreatePost;
