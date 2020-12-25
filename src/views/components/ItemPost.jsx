import React, { useState, useEffect } from 'react';
import { Avatar, Text, Button, Image } from '@fluentui/react-northstar';
import { isAuth, getCookie } from '../../controllers/localStorage';
import axios from 'axios';

const ItemPost = ({ likeBy, avatar, name, content, image, postId, history }) => {
  const [isLike, setIsLike] = useState(false);
  const [number, setNumber] = useState(likeBy.length);

  const checkLiked = () => {
    const check = likeBy.indexOf(isAuth()._id);
    return check > -1;
  };

  useEffect(() => {
    setIsLike(checkLiked());
    console.log(checkLiked());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likePost = () => {
    const token = getCookie('token');
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
        console.log(res);
        setIsLike(true);
        setNumber(number + 1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const unLikePost = () => {
    const token = getCookie('token');
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
        console.log(res);
        setIsLike(false);
        setNumber(number - 1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 1000,
        marginTop: 30,
        width: 800,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: '100%',
          flex: 1,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Avatar image={avatar} />
        <Text
          content={name}
          style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}
        />
      </div>
      <div
        style={{
          width: '100%',
          flex: 15,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text
          content={content}
          style={{
            flex: 1,
            display: 'flex',
            marginTop: 10,
            marginLeft: 16,
            marginRight: 16,
          }}
        />
        <div style={{ flex: 5 }}>
          <Image src={image} style={{ height: 750, width: '100%' }} />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          flex: 1,
          borderTopWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
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
              setIsLike(false);
              unLikePost();
            }}
          />
        ) : (
          <Button
            icon={<i class="far fa-heart fa-2x"></i>}
            text
            iconOnly
            onClick={() => {
              setIsLike(true);
              likePost();
            }}
          />
        )}

        <Button
          icon={<i class="far fa-comment fa-2x" style={{ marginLeft: 20 }}></i>}
          text
          iconOnly
          onClick={() => {
            history.push(`/posts/${postId}`,{
                avatar: avatar,
                name: name,
                content: content,
                image: image,
                likeBy: likeBy,
                postId: postId
            })
          }}
        />
        <text style={{ marginLeft: 20, fontWeight: 'bold' }}>
          {number} likes
        </text>
      </div>
    </div>
  );
};

export default ItemPost;
