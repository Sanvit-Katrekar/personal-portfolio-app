import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";
import { getSession, commitSession } from "~/sessions.server";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { BACKEND_BASE_URL } from "~/config/constants";

import { useToast } from "~/hooks/use-toast"
import { useEffect } from "react";

export let action: ActionFunction = async ({ request }) => {

  let formData = await request.formData();
  let password = formData.get("password");

  try {
    await axios.post(`${BACKEND_BASE_URL}/login`, { password });
    let session = await getSession(request.headers.get("Cookie"));
    session.set("auth", "authenticated");
    return redirect("/admin", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return { error };
  }
};

export default function Login() {

  const { toast } = useToast();

  let actionData: any = useActionData();
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Imposter Detected",
        description: "Invalid password. What are you doing, imposter.",
      });
    }
  }, [actionData, toast]);
  return (
    <div className="flex justify-center items-center h-[90vh]">
    <Card className="w-[25vw]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter the admin password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full my-10">
            Login
          </Button>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}
