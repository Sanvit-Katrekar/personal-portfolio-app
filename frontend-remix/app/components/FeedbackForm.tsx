import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "~/components/ui/form"
  import { Input } from "~/components/ui/input"

"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useToast } from "~/hooks/use-toast"
import { BACKEND_BASE_URL } from "~/config/constants"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Bro come on don't put your name as a single character.",
  }).max(50, {
    message: "Bro like who are you what is your name."
  }),
  position: z.string().min(2, {
    message: "Bro what is this 1 character position change your job.",
  }).max(50, {
    message: "Bro like who are you what is your position bruh."
  }),
  comment: z.string().min(2, {
    message: "Appreciate your feedback! But atleast 2 characters bro come on.",
  }).max(200, {
    message: "Chill bro I appreciate your feedback but like 200+ chars? Calm down."
  }),
})

export default function FeedbackForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      axios.post(`${BACKEND_BASE_URL}/feedback`,
        values
      )
      .then(function (response) {
        toast({
          title: "Success",
          description: "Feedback submitted successfully!",
        })
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
        <div className="w-full max-w-md space-y-4 my-10">
            <Card>
                <CardHeader className="flex flex-col items-center">
                    <CardTitle>Feedback</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs font-normal">
                        Hallo there, leave a comment for me below!
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    This is your public display job position.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                    <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Add in your comments here, this will be publicly available to view.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="flex justify-center items-center gap-2 text-sm font-medium">
                                <Button type="submit">Submit</Button>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-sm font-medium">
                                <span>Your feedback is</span>
                                <span className="text-[#f0ad4e]">Neutral</span>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
  }


/*
export default function FeedbackForm() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Feedback</CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs font-normal">
            Hallo there, leave a comment for me below!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          
          <Textarea placeholder="Enter your feedback..." className="min-h-[100px]" />
          <div className="flex items-center gap-4">
            <Button size="sm">Submit</Button>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>Your feedback is</span>
              <span className="text-[#f0ad4e]">Neutral</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
  */