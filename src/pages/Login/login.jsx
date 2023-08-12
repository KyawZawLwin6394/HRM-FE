import { Card } from '@nextui-org/react'
import Header from '../../components/Login/header'
import Login from '../../components/Login/inputlogin'
import { motion, useTime, useTransform } from "framer-motion";

export default function LoginPage () {
   const time = useTime();
  const rotate = useTransform(time, [0, 8000], [0, 70], { clamp: false });
  return (
    <>
     <div className="example-container float-right">
      <motion.div style={{ rotate }} />
    </div>
 {/* <div className="example-container float-none">
      <motion.div style={{ rotate }} />
    </div>
 <div className="example-container justify-items-start">
      <motion.div style={{ rotate }} />
    </div> */}

    <div className='flex justify-center'>

      <Card
        isFooterBlurred
        radius='sm'
        className='border-none mt-8  py-10 px-10 max-w-[400px] gap-4 '
      >
        <Header
          heading='Login to your account'
          paragraph="Welcome To HRM"
         
        />
        <Login />
      </Card>
    </div>
    </>
  )
}
