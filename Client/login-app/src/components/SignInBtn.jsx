import React from "react";

function SignInBtn({ text, Icon, func }) {
  return (
    <div
      className="flex justify-center items-center gap-2 p-2 border-2 border-solid min-w-[300px] my-3 border-black w-auto cursor-pointer hover:scale-[1.02] ease-in-out dura-200"
      onClick={func}
    >
      {Icon && <Icon className={`text-3xl`} />}
      <p>Sign in with {text} </p>
    </div>
  );
}

export default SignInBtn;
