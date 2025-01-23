import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegisterPage({ className, ...props }) {

  const [inputValues, setinputValues] = useState({});



  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/v1/users/login", inputValues, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response);
        toast.success(response?.data?.message ,{autoClose:2000});
        setinputValues({});
      })

      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message ,{autoClose:2000});
        setinputValues({});
      })
  }

  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputValues(values => ({ ...values, [name]: value }));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
               
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Finn@example.com"
                    required name="email"
                    value={inputValues.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                  </div>
                  <Input id="password" placeholder="*****" type="password" required name="password"
                    value={inputValues.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                Login
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




