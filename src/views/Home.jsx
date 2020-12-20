import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

// const Button = ({ iconName, title, onClick, className }) => {
//   return (
//     <button onClick={onClick} className={className}>
//       <i className={iconName} />
//       <span className="ml-3">{title}</span>
//     </button>
//   );
// };

const Content = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center" style={{paddingLeft: 280, paddingRight: 500}}>
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1" style={{marginTop: 30}} >
      </div>
    </div>
  );
};

function Home({ history }) {
  return (
    <div>
      <Header history={history}/>
      <Content/>
    </div>
  );
}

export default Home;
