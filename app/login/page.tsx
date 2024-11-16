'use client'
import { useSearchParams } from 'next/navigation'
import { login, signup } from './action'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">ログイン</h1>
        
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div className="flex gap-4">
            <button
              formAction={login}
              className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              ログイン
            </button>
            <button
              formAction={signup}
              className="flex-1 rounded border px-4 py-2 hover:bg-gray-50"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}