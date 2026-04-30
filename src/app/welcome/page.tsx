'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SpaceBackground from '@/components/SpaceBackground'

interface User {
  username: string
  email: string
  birthdate?: string
}

export default function WelcomePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }

  if (!user) return null

  return (
    <main className="main-container background-glow">
      <SpaceBackground />
      <div className="glass-card welcome-container">
        {/* Border animations from legacy */}
        <span className="border-line line-top"></span>
        <span className="border-line line-right"></span>
        <span className="border-line line-bottom"></span>
        <span className="border-line line-left"></span>

        <header>
          <h1>우주 탐험에 오신 것을 환영합니다!</h1>
          <p className="subtitle">{user.username}님, 이제 은하계를 여행할 준비가 되었습니다.</p>
        </header>

        <div className="user-info" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>접속 이메일: {user.email}</p>
          {user.birthdate && <p style={{ color: 'var(--text-muted)' }}>생년월일: {user.birthdate}</p>}
        </div>

        <button onClick={handleLogout} className="btn btn-secondary" style={{ marginTop: '3rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          로그아웃
        </button>
      </div>

      <style jsx>{`
        .welcome-container {
          position: relative;
          overflow: hidden;
        }
        .border-line {
          position: absolute;
          display: block;
        }
        .line-top {
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6));
          animation: animate-top 8s linear infinite;
        }
        @keyframes animate-top {
          0% { left: -100%; }
          25%, 100% { left: 100%; }
        }
        .line-right {
          top: -100%;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.6));
          animation: animate-right 8s linear infinite;
          animation-delay: 2s;
        }
        @keyframes animate-right {
          0% { top: -100%; }
          25%, 100% { top: 100%; }
        }
        .line-bottom {
          bottom: 0;
          right: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(270deg, transparent, rgba(255, 255, 255, 0.6));
          animation: animate-bottom 8s linear infinite;
          animation-delay: 4s;
        }
        @keyframes animate-bottom {
          0% { right: -100%; }
          25%, 100% { right: 100%; }
        }
        .line-left {
          bottom: -100%;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(360deg, transparent, rgba(255, 255, 255, 0.6));
          animation: animate-left 8s linear infinite;
          animation-delay: 6s;
        }
        @keyframes animate-left {
          0% { bottom: -100%; }
          25%, 100% { bottom: 100%; }
        }
      `}</style>
    </main>
  )
}
