import React, { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../controllers/localStorage";
import axios from "axios";
import { Button, Popup, Text } from "@fluentui/react-northstar";
import { toast } from "react-toastify";

const List = ({ history }) => {
  const [listUsers, setListUsers] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getAll();
  }, [load]);

  const deleteUser = (userId) => {
    const token = getCookie("token");
    if (userId === isAuth()._id) {
      toast.error("you can not delete you");
      return;
    }
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
    const token = getCookie("token");
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
          display: "flex",
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 16,
        }}
      >
        <th style={{ flex: 1, display: "flex" }}>Number</th>
        <th style={{ flex: 1, display: "flex" }}>Name</th>
        <th style={{ flex: 1, display: "flex" }}>Email</th>
        <th style={{ flex: 1, display: "flex" }}></th>
      </tr>
      {listUsers.map((item) => (
        <tr
          style={{
            width: 1280,
            display: "flex",
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: 16,
          }}
        >
          <td style={{ flex: 1, display: "flex" }}>{item.index}</td>
          <td style={{ flex: 1, display: "flex" }}>{item.name}</td>
          <td style={{ flex: 1, display: "flex" }}>{item.email}</td>
          <td
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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

            <Popup
              content={
                <div>
                  <Text content={`Do you want delele user: ${item.name} ?`} />
                  <Button
                    content="Delete"
                    style={{
                      width: 50,
                      height: 30,
                      backgroundColor: "red",
                      borderRadius: 10,
                      marginLeft: 16,
                    }}
                    onClick={async () => {
                      deleteUser(item.userId);
                      setLoad(!load);
                    }}
                  />
                </div>
              }
              trigger={
                <Button
                  content="Delete"
                  style={{
                    width: 50,
                    height: 30,
                    borderRadius: 10,
                    marginLeft: 16,
                  }}
                />
              }
            />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default List;
