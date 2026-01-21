
import LoginForm from "@/components/form/login-form";
import RegisterForm from "@/components/form/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function RegisterPage(){
    return(
        <div className="flex justify-center items-center h-screen">
            <RegisterForm/>
        </div>
    )
}