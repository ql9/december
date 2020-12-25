import React from "react";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header.jsx";
import Post from "./components/Post.jsx";
import List from './components/UserManagement.jsx';

function Home({ history }) {
  return (
    <div>
      <Header history={history} />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <ToastContainer />
        <div
          className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
          style={{ marginTop: 30 }}
        >
          <List history={history} />
        </div>
      </div>
    </div>
  );
}

export default Home;
