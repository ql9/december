import React, { useState } from 'react';
import { Avatar, Text, Button, } from '@fluentui/react-northstar';

const ItemPost = ({ avatar, name, content, image }) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        marginTop: 30,
        width: 1000,
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
          flex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text
          content={content}
          style={{
            flex: 2,
            display: 'flex',
            marginTop: 10,
            marginLeft: 16,
            marginRight: 16,
          }}
        />
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
          <Button icon={<i class="fas fa-heart fa-2x"></i>} text iconOnly  onClick={() => setIsLike(false)}/>
        ) : (
          <Button icon={<i class="far fa-heart fa-2x"></i>} text iconOnly  onClick={() => setIsLike(true)} />
        )}

        <Button
          icon={<i class="far fa-comment fa-2x" style={{ marginLeft: 20 }}></i>}
          text
          iconOnly
        />
      </div>
    </div>
  );
};

export default ItemPost;
