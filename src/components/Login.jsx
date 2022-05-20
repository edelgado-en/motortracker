import { LockClosedIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

import { signInWithGooglePopup, auth } from "../utils/firebase/firebase.utils";

import * as api from "./apiService";

export default function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    await signInWithGooglePopup();

    const requestObject = {
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
    };

    try {
      const { response } = await api.signUser(requestObject);

      console.log(response);

      navigate("/");
    } catch (err) {
      console.log(err);
      //TODO: add toast
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col justify-center items-center py-12 space-y-8 min-h-screen sm:px-6 lg:px-8 lg:space-y-12">
          <div className="w-full sm:mx-auto sm:max-w-md justify-center text-center text-3xl">
            <span className="">MOTOR</span>
            <span className="">TRACKER</span>
          </div>
          <div
            className="space-y-4 w-full sm:mx-auto sm:max-w-md"
            aria-label="Sign in form"
          >
            <div className="py-8 px-4 bg-gray-100 border-t border-b border-gray-100 shadow sm:px-10 sm:rounded-lg sm:border-r sm:border-l">
              <div className="flex flex-col justify-center animate-fade-in">
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center border font-medium rounded relative text-base px-6 py-3 text-white border-pink-700 bg-pink-600 hover:bg-pink-700 hover:border-pink-800 shadow-sm justify-center border sm:py-10 sm:px-12 sm:text-2xl sm:font-semibold sm:rounded-lg"
                >
                  <span>Sign in with Google</span>
                </button>
                <div className="mt-6">
                  <p className="mt-6 text-xs text-gray-500 prose prose-sm">
                    By signing in, you agree to our{" "}
                    <a href="/" className="text-blue-500 mr-1">
                      Terms of Service
                    </a>
                    and
                    <a href="/" className="text-blue-500 ml-1">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
