'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SpaceBackground from '@/components/SpaceBackground'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birthdate: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          birthdate: formData.birthdate,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
        router.push('/login')
      } else {
        alert(data.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('Signup error:', error)
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
          <h1>회원가입</h1>
          <p className="subtitle">새로운 탐험을 위해 계정을 생성하세요.</p>
        </header>
        
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">이름</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
        
        <footer>
          <p>
            이미 계정이 있으신가요? <Link href="/login">로그인</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
