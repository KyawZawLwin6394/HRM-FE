import { loginFields } from "../../constant/formfield";
import FormAction from "../../components/Login/formAction";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./eyefilledicon";
import { EyeSlashFilledIcon } from "./eyeslashicon";
import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom'
import apiInstance from '../../util/api.js'
import { MailFilledIcon } from './mailicon';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate=useNavigate()
  const emailRef = useRef()
  const passRef = useRef()
  const handleSubmit = (e) => {
    console.log('Clicked')
    e.preventDefault();
    const data={
      email:emailRef.current.value,
      password:passRef.current.value
    }
    // alert(JSON.stringify(data))
    apiInstance
      .post('auth/login', data)
      .then(
       function(res){
        // alert('success')
        console.log(res.data,'data')
        if(res.data.user.email === 'rootuser@gmail.com' && res.data.user.name === 'RootUser'){
  navigate('/home')
        }else{
          navigate('/')
        }
      
            })
      .catch( 
       ()=>{alert('error')}
    )
  };

  //Handle Login API Integration here

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input variant={"underlined"} type="email" label="Email" ref={emailRef}   endContent={
            <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }/>
        <Input
          variant={"underlined"}
          ref={passRef}
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
        <FormAction handleSubmit={()=>handleSubmit()} text="Login" />
      </div>
    </form>
  );
}
