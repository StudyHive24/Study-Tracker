"use client"

import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function UserAuth() {
  return (
    <div className="flex justify-center place-content-center">
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login to StudyHive</CardTitle>
            <CardDescription>
              Enter your Email and Password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create an Account to use StudyHive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="email" placeholder="madhukaabhishek" />
            </div>
          <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="pass" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirm password</Label>
              <Input id="confirmpass" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>

  )
}

