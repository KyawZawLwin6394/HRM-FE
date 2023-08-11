import { Input } from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
export default function employeeInput() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="Email"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="file"
          label="CV"
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
        />
        <Input
          type="date"
          label="First Interview Date"
          placeholder="you@example.com"
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="NRC No"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="text"
          label="Interview Result"
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="Passport No"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          type="date"
          label="Second Interview Date"
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
       <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4">
      
   <RadioGroup
      label="Gender"
      orientation="horizontal"
    >
      <Radio value="buenos-aires">Male</Radio>
      <Radio value="sydney">Female</Radio>

    </RadioGroup>
            </div>

     
        <Input
          type="date"
          label="Second Interview Date"
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
<Textarea
      isReadOnly
      label="Address"
      variant="bordered"
      labelPlacement="outside"
      placeholder="Enter your address"
     
      className="max-w-xs"
    />
      </div>
       
        <Input
          type="text"
          label="Interview Result"
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          label="Phone No"
          placeholder=" "
          labelPlacement="outside"
        />
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            
        </div>
        
      </div>
      
    </div>
  );
}
