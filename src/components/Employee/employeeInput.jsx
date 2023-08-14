import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import {Modal, Button, useDisclosure} from "@nextui-org/react"
import OtherDoc from './otherDocInput'
export default function EmployeeInput() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const variant = ["faded"];
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Name"
          placeholder="Name"
          variant={variant}
          labelPlacement="outside"
        />
        <Input
          type="number"
          label="Phone No"
          placeholder="Phone Number"
          variant={variant}
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
          isRequired
          type="text"
          variant={variant}
          label="NRC"
          placeholder="NRC.."
          labelPlacement="outside"
        />

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Passport No"
          placeholder="Passport Number.."
          labelPlacement="outside"
          variant={variant}
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Gender</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Gender</option>
            <option value="US">Male</option>
            <option value="CA">Female</option>

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
        <Input
          type="text"
          label="Password"
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
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="file"
            label="CV"
            variant={variant}
            placeholder=" "
            labelPlacement="outside"
          />
        </div>

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          variant={variant}
          label="Education Background"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="file"
          label="Education Certificate"
          variant={variant}
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          label="First Interview Date"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="text"
          label="First Interview Result"
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
            placeholder=" "
            labelPlacement="outside"
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
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
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="ca">Casul</Radio>
            <Radio value="me">Medical</Radio>
            <Radio value="va">Vacation</Radio>
            <Radio value="ma">Maternity</Radio>
          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Meal Allowance</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Married</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Travel Allowance</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="buenos-aires">Yes</Radio>
            <Radio value="sydney">No</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Yearly Bonus</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>

          </RadioGroup>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Incentive</label>
          <RadioGroup isRequired orientation="horizontal">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>

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
          className='rounded-xl px-4 py-0 text-left'>Register</Button>
        <Button size='sm' color='primary' variant='shadow'
          className='rounded-xl px-4 py-0 text-left'>Cancel</Button>
      </div>
    </div>
  );
}