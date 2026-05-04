"use client"

import { FormEvent, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getLoggedUser, loginUser, logoutUser, registerUser } from "@/lib/user-store"
import { User } from "lucide-react"

type Mode = "login" | "register"

export default function PerfilPage() {
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loggedName, setLoggedName] = useState<string | null>(null)
  const [loggedEmail, setLoggedEmail] = useState<string | null>(null)

  useEffect(() => {
    const user = getLoggedUser()
    if (user) {
      setLoggedName(user.name)
      setLoggedEmail(user.email)
    }
  }, [])

  const resetForm = () => {
    setName("")
    setEmail("")
    setPassword("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      setMessage("Preencha todos os campos obrigatórios.")
      return
    }

    if (mode === "register") {
      const result = registerUser(name, email, password)
      setMessage(result.message)
      if (result.ok) {
        const user = getLoggedUser()
        setLoggedName(user?.name ?? null)
        setLoggedEmail(user?.email ?? null)
        resetForm()
      }
      return
    }

    const result = loginUser(email, password)
    setMessage(result.message)
    if (result.ok) {
      const user = getLoggedUser()
      setLoggedName(user?.name ?? null)
      setLoggedEmail(user?.email ?? null)
      resetForm()
    }
  }

  const handleLogout = () => {
    logoutUser()
    setLoggedName(null)
    setLoggedEmail(null)
    setMessage("Você saiu da sua conta.")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">Perfil</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Entre na sua conta para acompanhar seus favoritos e continuar sua jornada olfativa.
            </p>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            {loggedEmail ? (
              <Card>
                <CardHeader>
                  <CardTitle>Conta conectada</CardTitle>
                  <CardDescription>Você está autenticado neste navegador.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{loggedName}</p>
                  <p className="text-sm text-muted-foreground pt-2">E-mail</p>
                  <p className="font-medium">{loggedEmail}</p>
                  <Button variant="outline" className="mt-4" onClick={handleLogout}>
                    Sair
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{mode === "login" ? "Entrar" : "Criar conta"}</CardTitle>
                  <CardDescription>
                    {mode === "login"
                      ? "Use seu e-mail e senha para acessar sua conta."
                      : "Cadastre-se em poucos segundos para salvar seus perfumes favoritos."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-2 gap-2">
                    <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>
                      Login
                    </Button>
                    <Button variant={mode === "register" ? "default" : "outline"} onClick={() => setMode("register")}>
                      Registro
                    </Button>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {mode === "register" && (
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    <Input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="w-full" type="submit">
                      {mode === "login" ? "Entrar" : "Criar conta"}
                    </Button>
                  </form>

                  {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
