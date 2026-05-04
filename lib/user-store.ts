"use client"

export interface AuthUser {
  name: string
  email: string
  password: string
  createdAt: string
}

const FAVORITES_KEY = "verdara:favorites"
const AUTH_USER_KEY = "verdara:auth-user"
const SESSION_KEY = "verdara:session-email"

function canUseStorage() {
  return typeof window !== "undefined"
}

function readJSON<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFavorites(): string[] {
  return readJSON<string[]>(FAVORITES_KEY, [])
}

export function isFavorite(perfumeId: string): boolean {
  return getFavorites().includes(perfumeId)
}

export function toggleFavorite(perfumeId: string): string[] {
  const favorites = getFavorites()
  const nextFavorites = favorites.includes(perfumeId)
    ? favorites.filter((id) => id !== perfumeId)
    : [...favorites, perfumeId]

  writeJSON(FAVORITES_KEY, nextFavorites)
  if (canUseStorage()) {
    window.dispatchEvent(new Event("favorites-updated"))
  }
  return nextFavorites
}

export function registerUser(name: string, email: string, password: string): { ok: boolean; message: string } {
  const normalizedEmail = email.trim().toLowerCase()
  const existing = getRegisteredUser()
  if (existing?.email === normalizedEmail) {
    return { ok: false, message: "Este e-mail já está cadastrado." }
  }

  const user: AuthUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  }

  writeJSON(AUTH_USER_KEY, user)
  if (canUseStorage()) {
    window.localStorage.setItem(SESSION_KEY, normalizedEmail)
  }
  return { ok: true, message: "Cadastro realizado com sucesso." }
}

export function loginUser(email: string, password: string): { ok: boolean; message: string } {
  const normalizedEmail = email.trim().toLowerCase()
  const user = getRegisteredUser()

  if (!user || user.email !== normalizedEmail || user.password !== password) {
    return { ok: false, message: "E-mail ou senha inválidos." }
  }

  if (canUseStorage()) {
    window.localStorage.setItem(SESSION_KEY, normalizedEmail)
  }
  return { ok: true, message: "Login realizado com sucesso." }
}

export function logoutUser() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(SESSION_KEY)
}

export function getRegisteredUser(): AuthUser | null {
  return readJSON<AuthUser | null>(AUTH_USER_KEY, null)
}

export function getLoggedUser(): AuthUser | null {
  if (!canUseStorage()) return null
  const sessionEmail = window.localStorage.getItem(SESSION_KEY)
  const user = getRegisteredUser()
  if (!sessionEmail || !user) return null
  return user.email === sessionEmail ? user : null
}
