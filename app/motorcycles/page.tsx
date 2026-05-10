import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function MotorcyclesPage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Мои мотоциклы</h1>
        <p className="text-gray-500 mb-8">Привет, {session.user?.name}</p>
        <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
          Мотоциклов пока нет. Скоро здесь появится кнопка добавления.
        </div>
      </div>
    </main>
  )
}