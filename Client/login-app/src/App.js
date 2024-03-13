// import React, { useState } from "react";
import React from "react";
import SignInBtn from "./components/SignInBtn";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import "./styles/style.css";
import "./App.css";
import loginServices from "./services/loginServices";

function App() {
  // const [user, setUser] = useState(null);
  const user = null;

  const microsoftLogin = () => {
    loginServices.microsoftLogin().then((res) => {
      console.log(res);
    });
  };

  const googleLogin = () => {
    loginServices.googleLogin().then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {user ? (
        <></>
      ) : (
        <>
          <div>
            <SignInBtn
              text="Microsoft"
              Icon={TfiMicrosoftAlt}
              func={microsoftLogin}
            />
            <SignInBtn text="Google" Icon={FaGoogle} func={googleLogin} />
            {/* <SignInBtn text="Facebook" Icon={FaFacebookF} func="signin" /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
