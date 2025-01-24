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
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, inputValues, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response);
        toast.success(response?.data?.message, { autoClose: 2000 });
        setinputValues({});
      })

      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 2000 });
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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your informaton to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    type="full-name"
                    placeholder="Finn Allen"
                    required name="name"
                    value={inputValues.name || ""}
                    onChange={handleChange}
                  />
                </div>
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
                  </div>
                  <Input id="password" placeholder="*****" type="password" required name="password"
                    value={inputValues.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create An Account
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
