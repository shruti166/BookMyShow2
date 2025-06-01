import { LoginForm } from '@/components/LoginForm'

export default function PageLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600 text-center">Please sign in to your account</p>
          </div>
          <LoginForm />
          <div className="px-8 pb-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
