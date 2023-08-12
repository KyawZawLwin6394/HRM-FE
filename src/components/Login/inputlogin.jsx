import { loginFields } from "../../constant/formfield";
import FormAction from "../../components/Login/formAction";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./eyefilledicon";
import { EyeSlashFilledIcon } from "./eyeslashicon";
import React from "react";
import { MailFilledIcon } from './mailicon';
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input variant={"underlined"} type="email" label="Email"   endContent={
            <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }/>
        <Input
          variant={"underlined"}
          type={isVisible ? "text" : "password"}
          label="Password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      </div>

      <div className="mt-3">
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </div>
    </form>
  );
}
