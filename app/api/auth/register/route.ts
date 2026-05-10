import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const { displayName, email, password } = await request.json()

  if (!displayName || !email || !password) {
    return NextResponse.json(
      { error: "Все поля обязательны" },
      { status: 400 }
    )
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Пароль должен быть не короче 6 символов" },
      { status: 400 }
    )
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: "Пользователь с таким email уже существует" },
      { status: 400 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { displayName, email, passwordHash },
  })

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
}