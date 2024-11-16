'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const cookieStore = cookies()
  
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('メールアドレスとパスワードを入力してください')
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error('メールアドレスまたはパスワードが正しくありません')
    }

    revalidatePath('/', 'layout')
    return redirect('/', { status: 303 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'ログインに失敗しました'
    return redirect('/login?error=' + encodeURIComponent(message), {
      status: 303,
    })
  }
}

export async function signup(formData: FormData) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('メールアドレスとパスワードを入力してください')
    }

    const supabase = createClient()

    // サインアップ処理
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError || !authData.user) {
      throw new Error('登録できませんでした。もう一度お試しください。')
    }

    // プロフィールデータの作成
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

    if (profileError) {
      // プロフィール作成エラー時はユーザーも削除
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw new Error('プロフィールの作成に失敗しました')
    }

    revalidatePath('/', 'layout')
    return redirect('/login?error=' + encodeURIComponent('確認メールを送信しました。メールをご確認ください。'), {
      status: 303,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '登録に失敗しました'
    return redirect('/login?error=' + encodeURIComponent(message), {
      status: 303,
    })
  }
}