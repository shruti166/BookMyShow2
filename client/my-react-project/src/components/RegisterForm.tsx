import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import api from "@/utils/axios"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),

});

type RegisterResponse = {
  success: boolean;
  message: string;
  error?: string;
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted with values:', { ...values, password: '***' });
    
    try {
      setIsLoading(true)
      setError("")
      
      console.log('Making registration request to:', '/users/register');
      const response = await api.post<RegisterResponse>('/users/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      console.log('Registration response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed')
      }

      // Show success message
      alert('Registration successful! Please login.')
      
      // Redirect to login page
      navigate('/login')
      
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err instanceof Error) {
        if ('response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
          const axiosError = err as { response: { data: { message?: string } } }
          console.error('Server error response:', axiosError.response.data);
          setError(axiosError.response.data.message || "Registration failed. Please try again.")
        } else {
          console.error('Client error:', err.message);
          setError(err.message || "Registration failed. Please try again.")
        }
      } else {
        console.error('Unknown error:', err);
        setError("An unexpected error occurred")
      }
      // Clear password fields on error
      form.setValue('password', '')
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          console.log('Form submit event triggered');
          form.handleSubmit(onSubmit)(e);
        }} 
        className="space-y-4 px-8 pb-8"
      >
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your name" 
                  {...field} 
                  className="h-10"
                  disabled={isLoading}
                  autoComplete="name"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
                  {...field} 
                  className="h-10"
                  disabled={isLoading}
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  {...field} 
                  className="h-10"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
   
       
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}