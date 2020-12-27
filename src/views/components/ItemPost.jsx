import React from "react";
import { Text, Image } from "@fluentui/react-northstar";

import Title from "./Title";
import Like from "./LikePost";

const ItemPost = ({
  avatar,
  name,
  content,
  image,
  postId,
  userId,
  headerMedia,
  history,
  getPosts,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        width: 800,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
      }}
    >
      <Title
        avatar={avatar}
        name={name}
        postId={postId}
        headerMedia={headerMedia}
        userId={userId}
        history={history}
        getPosts={getPosts}
        image={image}
        content={content}
      />
      <Text
        content={content}
        style={{
          padding: 16,
          fontSize: 16,
        }}
      />
      <Image
        src={image}
        style={{ height: "100%", width: "100%", maxHeight: 850, maxWidth: 850 }}
        onClick={() => {
          history.push(`/posts/${postId}`, {
            avatar: avatar,
            name: name,
            content: content,
            image: image,
            postId: postId,
            userId: userId,
            headerMedia: headerMedia,
          });
        }}
      />
      <div
        style={{
          width: "100%",
          borderTopWidth: 1,
          alignItems: "center",
          padding: 16,
        }}
      >
        <Like postId={postId} />
      </div>
    </div>
  );
};

export default ItemPost;
