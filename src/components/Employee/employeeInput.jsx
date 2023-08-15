import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import {Modal, Button, useDisclosure} from "@nextui-org/react"
import OtherDoc from './otherDocInput'
import {useRef,useState} from 'react'

import apiInstance from '../../util/api.js'
import  Swal  from 'sweetalert2';

export default function EmployeeInput() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const variant = ["faded"];

  const emailRef = useRef()
  const passRef = useRef()
  const nrcRef=useRef()
  const nameRef=useRef()
  const addressRef=useRef()
  // const ageRef=useRef()
  const DOBRef=useRef()
  const ECRef=useRef()
  const phoneRef=useRef()
  const passportRef=useRef()
  const EuBackRef=useRef()
  const EuCerRef=useRef()
  const workExpRef=useRef()
  const [cv,setCV]=useState(null)
  // const otheRef=useRef()
  const recLetterRef=useRef()
  const firstInRef=useRef()
  const firstResRef=useRef()
  const secInRef=useRef()
  const secResRef=useRef()
  const fatherRef=useRef()
  const empDateRef=useRef()
  const genderRef=useRef()

const handlefile=(e)=>{
  if(e.target.files){
    setCV(e.target.files[0])
    console.log(e.target.files,'file')
  }
}
  //array list
  // const [userList,setUserList]=useState([])
  const create = () => {
console.log(cv,'cv')
    const data = {
      givenName:nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      NRC:nrcRef.current.value,
      address:addressRef.current.value,
      DOB:DOBRef.current.value,
      emergencyContact:ECRef.current.value,
      phone:phoneRef.current.value,
      passportNo:passportRef.current.value,
      educationBackground:EuBackRef.current.value,
      educationCertificate:EuCerRef.current.value,
      workExperience:workExpRef.current.value,
      cv:cv,
      recommendationLetter:recLetterRef.current.value,
      firstInterviewDate:firstInRef.current.value,
      firstInterviewResult:firstResRef.current.value,
      secondInterviewDate:secInRef.current.value,
      secondInterviewResult:secResRef.current.value,
      fatherName:fatherRef.current.value,
      gender:genderRef.current.value,
      employedDate:empDateRef.current.value,



    }
    alert(JSON.stringify(data))
    apiInstance
      .post('user', data,{headers:{
        "Content-Type":"multipart/form-data",
      }})
      .then(
function(){
             Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
   
        })
      .catch(
        (error) => { alert(error) }
      )

  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Name"
          placeholder="Name"
          ref={nameRef}
          variant={variant}
          labelPlacement="outside"
        />
        <Input
          type="number"
          label="Phone No"
          ref={phoneRef}
          placeholder="Phone Number"
          variant={variant}
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          label="Age/DOB"
          ref={DOBRef}
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          isRequired
          type="text"
          variant={variant}
          label="NRC"
          placeholder="NRC.."
          ref={nrcRef}
          labelPlacement="outside"
        />

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Passport No"
          placeholder="Passport Number.."
          labelPlacement="outside"
          ref={passportRef}
          variant={variant}
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Gender</label>
          <select
          ref={genderRef}
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          isRequired
          type="email"
          variant={variant}
          ref={emailRef}
          label="Personal Email"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="text"
          label="Password"
          ref={passRef}
          variant={variant}
          placeholder="Password.."
          labelPlacement="outside"
        />

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Address"
            placeholder="Address.."
            labelPlacement="outside"
            ref={addressRef}
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="file"
            label="CV"
            variant={variant}
            onChange={handlefile}
            placeholder=" "
            labelPlacement="outside"
          />
        </div>

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          variant={variant}
          ref={EuBackRef}
          label="Education Background"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="file"
          label="Education Certificate"
          variant={variant}
          ref={EuCerRef}
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          ref={firstInRef}
          label="First Interview Date"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="text"
          label="First Interview Result"
          ref={firstResRef}
          placeholder="..."
          labelPlacement="outside"
          variant={variant}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4">
          <Input
            type="date"
            label="Second Interview Date"
            ref={secInRef}
            placeholder=" "
            labelPlacement="outside"
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            ref={secResRef}
            label="Second Interview Result"
            variant={variant}
            placeholder="..."
            labelPlacement="outside"
          />
        </div>


      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Department</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Department</option>
            <option value="US">Ma Ma</option>
            <option value="CA">Hla Hla</option>

          </select>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Position</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Position</option>
            <option value="US">Ma Ma</option>
            <option value="CA">Ha Hla</option>

          </select>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input

          type="text"
          variant={variant}
          label="Father Name"
          placeholder=" "
          ref={fatherRef}
          labelPlacement="outside"
        />
        <Input
          type="date"
          label="Employed Date"
          placeholder=" "
          ref={empDateRef}
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input

          type="tel"
          variant={variant}
          label="Emergecy Contact"
          ref={ECRef}
          placeholder=" "
          labelPlacement="outside"
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Direct Manager</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Direct Manager</option>
            <option value="US">Ma Ma</option>
            <option value="CA">Ha Hla</option>

          </select>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          ref={workExpRef}
          label="Work Experience"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />

        <Input
          type="number"
          label="Basic Salary"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Leave Entitled</label>
          <RadioGroup orientation="horizontal">
            <Radio value="ca">Casul</Radio>
            <Radio value="me">Medical</Radio>
            <Radio value="va">Vacation</Radio>
            <Radio value="ma">Maternity</Radio>
          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Meal Allowance</label>
          <RadioGroup orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Married</label>
          <RadioGroup orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Travel Allowance</label>
          <RadioGroup orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Yearly Bonus</label>
          <RadioGroup orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>

          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Incentive</label>
          <RadioGroup orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>

          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
          type="file"
          ref={recLetterRef}
          label="Recommendation Letter"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
     <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7">
        <label className="text-sm font-semibold">Other Document</label> &nbsp;
        <Button isIconOnly size='sm' color='primary' variant='shadow'
          className='rounded-xl px-4 py-0 text-left' onPress={onOpen}>+</Button>
           <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
           <OtherDoc/>
           </Modal>
      </div>
      </div>
     
  
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">

        <Button size='sm' color='primary' variant='shadow'
          className='rounded-xl px-4 py-0 text-left' onClick={create}>Register</Button>
        <Button size='sm' color='primary' variant='shadow'
          className='rounded-xl px-4 py-0 text-left'>Cancel</Button>
      </div>
    </div>
  );
}