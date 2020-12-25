import React, { useEffect, useState } from 'react';
import { getCookie } from '../../controllers/localStorage';
import axios from 'axios';
import { Button } from '@fluentui/react-northstar';

const List = ({ history }) => {
  const [listUsers, setListUsers] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getAll();
  }, [load]);

  const deleteUser = (userId) => {
    const token = getCookie('token');
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.status);
      });
  };
  const getAll = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const data = [];
        const arr = res.data.users;
        arr.forEach((element) => {
          const { _id, name, email } = element;
          data.push({ index: data.length, userId: _id, name, email });
        });
        setListUsers(data);
      });
  };
  return (
    <table>
      <tr
        style={{
          width: 1280,
          display: 'flex',
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 16,
        }}
      >
        <th style={{ flex: 1, display: 'flex' }}>Number</th>
        <th style={{ flex: 1, display: 'flex' }}>Name</th>
        <th style={{ flex: 1, display: 'flex' }}>Email</th>
        <th style={{ flex: 1, display: 'flex' }}></th>
      </tr>
      {listUsers.map((item) => (
        <tr
          style={{
            width: 1280,
            display: 'flex',
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: 16,
          }}
        >
          <td style={{ flex: 1, display: 'flex' }}>{item.index}</td>
          <td style={{ flex: 1, display: 'flex' }}>{item.name}</td>
          <td style={{ flex: 1, display: 'flex' }}>{item.email}</td>
          <td
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              content="Edit"
              style={{ width: 50, height: 30, borderRadius: 10 }}
              onClick={() => {
                history.push(`/profile/${item.userId}`, {
                  userId: item.userId,
                });
              }}
            />
            <Button
              content="Delete"
              style={{
                width: 50,
                height: 30,
                borderRadius: 10,
                marginLeft: 16,
              }}
              onClick={async () => {
                await deleteUser(item.userId);
                setLoad(!load);
              }}
            />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default List;
