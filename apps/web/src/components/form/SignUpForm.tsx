"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            {/* <Label className="sr-only" htmlFor="email">
              Email
            </Label> */}
            <p>Nama</p>
            <Input
              id="name"
              placeholder="John Doe"
              type="name"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <p>Username</p>
            <Input
              id="username"
              placeholder="johndoe"
              type="name"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <p>Email</p>
            <Input
              id="email"
              placeholder="email@email.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <p>Password</p>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <p>Kode Referral (Jika ada)</p>
            <Input
              id="refCode"
              placeholder="FRESHMART123"
              type="refCode"
              autoCorrect="off"
              disabled={isLoading}
            />
          {/* <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login dengan Email
          </Button> */}
          <Button variant="outline" onClick={onSubmit} className="my-1">
            Daftar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
             Atau daftar dengan metode lain 
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background px-2 text-muted-foreground">
          Sudah punya akun?
          <Link href="/auth/signin"> Login disini</Link>
        </span>
      </div>
    </div>
  )
}