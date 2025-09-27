import React from 'react'

const ClientLayout = ({children}) => {
  return (
    <main className="bg-theme text-theme min-h-screen flex items-center justify-center">
      {children}
    </main>
  )
}

export default ClientLayout