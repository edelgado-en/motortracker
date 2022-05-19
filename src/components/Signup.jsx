
import { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useNavigate } from "react-router-dom";
import UserPool from '../UserPool';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleOnSignup = (e) => {
        e.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                navigate('/');
            }
        });
    }

    const handleOnLogin = () => {
      navigate('/');
  }

    return (
        <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up your account</h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
              </div>
                <div style={{ marginTop: '20px' }}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className='flex'>
                <span className="block text-sm font-medium text-gray-700" style={{ display: '' }}>Already have an account?</span>
                <a href="#" onClick={handleOnLogin} className="font-medium text-indigo-600 hover:text-indigo-500" style={{ marginLeft: '5px', marginTop: '-3px' }}>
                    Log in
                </a>
              </div>

              <div>
                <button
                  onClick={handleOnSignup}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
}

export default Signup;