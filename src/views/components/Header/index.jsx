import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { signout } from '../../../controllers/auth';
import {  toast } from 'react-toastify';

const Header = ({ history }) => {
  return (
    <div
      style={{
        height: 75,
        background: '#FFFFFF',
        padding: '20px',
        paddingLeft: 350,
        paddingRight: 350,
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <h1 style={{ flex: 10, fontSize: 30 }}>December</h1>
      <button
        style={{ flex: 0.5, marginRight: 16 }}
        onClick={() => window.location.reload()}
      >
        <i class="fas fa-home fa-2x"></i>
      </button>
      <button style={{ marginRight: 16 }} onClick={() => {
        history.push('/profile');
      }}>
        <Avatar image="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/123186595_2725889600960212_6879897414847047841_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=P71PedJT8aMAX_cWTJA&_nc_ht=scontent.fsgn5-5.fna&oh=2f67c49d3b958dc9d575473742975d5e&oe=60022975" />
      </button>
      <button
        style={{ flex: 0.5, marginRight: 16 }}
        onClick={() => {
            signout(() => {
              toast.error('Signout Successfully');
              history.push('/login');
            });
          }}
      >
        <i class="fas fa-sign-out-alt fa-2x"></i>
      </button>
    </div>
  );
};

export default Header;
