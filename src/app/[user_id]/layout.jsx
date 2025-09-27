import ProtectedRoute from '@/utilities/ProtectedRoute';
import React from 'react'

const ClientLayout = async({params,children}) => {
const { user_id } = params;
  return (
      <AuthProvider>
    <main className="bg-theme text-theme min-h-screen flex items-center justify-center">
      {user_id}
      <ProtectedRoute>
      {children}
      </ProtectedRoute>
    </main>
    </AuthProvider>
  )
}

export default ClientLayout