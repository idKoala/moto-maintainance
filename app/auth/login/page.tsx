"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Неверный email или пароль")
    } else {
      router.push("/motorcycles")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">Вход</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Нет аккаунта?{" "}
          <Link href="/auth/register" className="text-black underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
  )
}