"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const displayName = (form.elements.namedItem("displayName") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error)
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="displayName"
            type="text"
            placeholder="Имя"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
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
            placeholder="Пароль (минимум 6 символов)"
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Уже есть аккаунт?{" "}
          <Link href="/auth/login" className="text-black underline">
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}