'use client'

import dynamic from 'next/dynamic'

// Dynamic import to prevent SSR issues with browser APIs
const UserInfo = dynamic(() => import('./user-info'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading...</div>
})

interface UserInfoClientProps {
  user: string
}

const UserInfoClient: React.FC<UserInfoClientProps> = ({ user }) => {
  return <UserInfo user={user} />
}

export default UserInfoClient