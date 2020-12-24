import React, { useEffect, useState } from "react";
import { getCookie } from "../../controllers/localStorage";
import axios from "axios";

const List = ({ history }) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

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

  console.log(listUsers);
  return (
    <table>
      <tr>
        <th>Number</th>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      {listUsers.map((item) => (
        <tr>
          <td>{item.index}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <a href="/profile">Edit</a>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default List;
