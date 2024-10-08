"use client"
import React from 'react';
import withAuth from '@/components/withAuth';
import ACCESS_ENUM from '@/access/accessEnum';

const UserPage =  () => {
  return (
    <div id="user">
      用户管理
    </div>
  );
}

export default withAuth(UserPage,[ACCESS_ENUM.ADMIN]);