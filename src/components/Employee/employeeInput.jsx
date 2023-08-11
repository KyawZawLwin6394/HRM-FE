import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from '@nextui-org/react'
import { Textarea } from "@nextui-org/react";

export default function employeeInput() {
  const variant = ["faded"];
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Name"
          placeholder=" "
          variant={variant}
          labelPlacement="outside"
        />
        <Input
          type="file"
          label="CV"
          variant={variant}
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          label="Age/DOB"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="date"
          label="First Interview Date"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          isRequired
          type="number"
          variant={variant}
          label="NRC No"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="text"
          label="Interview Result"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="Passport No"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="date"
          label="Second Interview Date"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4">
          <RadioGroup isRequired label="Gender" orientation="horizontal">
            <Radio value="buenos-aires">Male</Radio>
            <Radio value="sydney">Female</Radio>
          </RadioGroup>
        </div>

        <Input
          type="date"
          label="Second Interview Date"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Textarea
            isRequired
            isReadOnly
            label="Address"
            labelPlacement="outside"
            placeholder="Enter your address"
            variant={variant}
            className="max-w-xl"
          />
        </div>
<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-4">
    <Input
          type="text"
          label="Interview Result"
          variant={variant}
          placeholder=" "
          labelPlacement="outside"
        />
</div>
    
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="Phone No"
          placeholder=" "
          variant={variant}
          labelPlacement="outside"
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label>Department</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose Department</option>
            <option value="US">Ma Ma</option>
            <option value="CA">Hla Hla</option>
        
          </select>
        </div>
      </div>
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          isRequired
          type="email"
          variant={variant}
          label="Personal Email"
          placeholder=" "
          labelPlacement="outside"
        />
         <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label>Direct Manager</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose Department</option>
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
          labelPlacement="outside"
        />
        <Input
          type="date"
          label="Employed Date"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          
          type="tel"
          variant={variant}
          label="Emergecy Contact"
          placeholder=" "
          labelPlacement="outside"
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label>Position</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose Department</option>
            <option value="US">Ma Ma</option>
            <option value="CA">Ha Hla</option>
        
          </select>
        </div>
      </div>
       <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Married</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>

        <Input
          type="number"
          label="Basic Salary"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      

        <Input
          type="text"
          label="Education Background"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
          <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Meal Allowance</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      

        <Input
          type="text"
          label="Work Experience"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
          <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Travel Allowance</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      

        <Input
          type="file"
          label="Education Certificate"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
          <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Meal Allowance</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
       <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      

        <Input
          type="file"
          label="Recommendation Letter"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
          <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Leave Entitled</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="ca">Casul</Radio>
            <Radio value="me">Medical</Radio>
            <Radio value="va">Vacation</Radio>
            <Radio value="ma">Maternity</Radio>
          </RadioGroup>
        </div>
      </div>
             <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      

               <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Yearly Bonus</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>
       
          </RadioGroup>
        </div>
          <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Incentive</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>
       
          </RadioGroup>
        </div>
      </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <label>Other Document</label> &nbsp;
        <Button isIconOnly size='sm' color='primary' variant='shadow'
                    className='rounded-xl px-4 py-0 text-left'>+</Button>
        </div>
           <div className="flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
  
        <Button  size='sm' color='primary' variant='shadow'
                    className='rounded-xl px-4 py-0 text-left'>Register</Button>
                     <Button size='sm' color='primary' variant='shadow'
                    className='rounded-xl px-4 py-0 text-left'>Cancel</Button>
        </div>
    </div>
  );
}
