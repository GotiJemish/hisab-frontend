import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/utilities/ProtectedRoute';
import React from 'react'

const UserLayout = async ({ params, children }) => {
  const { user_id } = await params;
  return (

    <ProtectedRoute>
      <AdminLayout>
        {children}
        </AdminLayout>

    </ProtectedRoute>
  )
}

export default UserLayout