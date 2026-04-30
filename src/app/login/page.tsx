'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SpaceBackground from '@/components/SpaceBackground'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        alert(`로그인 성공! ${data.user.username}님, 환영합니다!`)
        router.push('/welcome')
      } else {
        alert(data.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="main-container background-glow">
      <SpaceBackground />
      <div className="glass-card">
        <header>
          <h1>로그인</h1>
          <p className="subtitle">우주 여행을 시작하려면 계정에 로그인하세요.</p>
        </header>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        <footer>
          <p>
            계정이 없으신가요? <Link href="/signup">회원가입</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
