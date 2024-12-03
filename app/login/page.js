'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  })
  const [error, setError] = useState('') // State for the error message

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const user = {
    name: "197408182006042025",
    password: "d1nkesb7b@"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name === user.name && formData.password === user.password) {
      setError('') // Clear any previous error
      console.log("login success")
      router.push('/dashboard')
    } else {
      setError('Username Atau Password Salah') // Set error message
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-accentdarken">SiCandi</h1>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">NIP</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan NIP"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>} {/* Error message */}
              </div>
              <Button type="submit" className="w-full bg-accent text-white hover:bg-accentdarken mt-4">Log in</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
