import { RegisterForm } from '@/components/RegisterForm'

export default function PageRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Create Account</h1>
            <p className="mt-2 text-sm text-gray-600 text-center">Join us and start your journey</p>
          </div>
          <RegisterForm />
          <div className="px-8 pb-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
