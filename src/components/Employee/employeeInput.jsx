import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import {
  Modal,
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";
import apiInstance from "../../util/api.js";
import Swal from "sweetalert2";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function EmployeeInput() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const variant = ["faded"];

  const emailRef = useRef();
  const passRef = useRef();
  const nrcRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();

  const DOBRef = useRef();
  const ECRef = useRef();
  const phoneRef = useRef();
  const passportRef = useRef();
  const EuBackRef = useRef();
  const [euCer, setEuCer] = useState(null);
  const workExpRef = useRef();
  const [cv, setCV] = useState(null);
   const [marriedFile, setMarriedFile] = useState(null);
  const [recLetter, setRecLetter] = useState(null);
  const [profile, setProfile] = useState(null);
  const [position, setPosition] = useState("");
  const firstInRef = useRef();
  const firstResRef = useRef();
  const secInRef = useRef();
  const secResRef = useRef();
  const fatherRef = useRef();
  const empDateRef = useRef();
  const genderRef = useRef();
  const married=useRef()
  const [directManager,setDirectManager]=useState('')
    const [directManagerID,setDirectManagerID]=useState('')
  const [description, setDescription] = useState("");
  const [otherDoc, setOtherDoc] = useState([]);
  const [positionID, setPositionID] = useState([]);
  const [positionList, setPositionList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [showMarried,setShowMarried]=useState(false)

  const handleChange = (e) => {
    let array = [];
    for (const item of e) {
      array.push(item);
    }
    setOtherDoc(array);
  };

  useEffect(() => {
    const getEmployee = async () => {
      await apiInstance
        .get(`positions`, { params: { limit: 80 } })
        .then((res) => {
          setPositionList(res.data.data);
          
        });
    };
    const getDeparttment = async () => {
      await apiInstance
        .get(`departments`, { params: { limit: 80 } })
        .then((res) => {
          setDepartmentList(res.data.data);
          console.log(res.data.data, "dep");
        });
    };
    getDeparttment()
    getEmployee()
  }, []);

  const handleDirectManager=(id)=>{
  setDirectManager(departmentList.filter(el=>el._id == id)[0].directManager.givenName)
  setDirectManagerID(departmentList.filter(el=>el._id == id)[0].directManager._id)

  }
  const handlefile = (e) => {
    if (e.target.files) {
      setCV(e.target.files[0]);
      console.log(e.target.files, "file cv");
    }
  };

    const handleMarriedFile = (e) => {
    if (e.target.files) {
      setMarriedFile(e.target.files[0]);

    }
  };


  const handleCer = (e) => {
    if (e.target.files) {
      setEuCer(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const handleRecLetter = (e) => {
    if (e.target.files) {
      setRecLetter(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const handleProfile = (e) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const handlePosition = (val) => {
    console.log(positionList.filter((el) => el._id === val)[0], "bas sal");

    setPositionID(positionList.filter((el) => el._id === val)[0]);

    setPosition(val);
  };
  const create = () => {
    console.log(otherDoc, "doc");

    const formData = new FormData();

    formData.append("givenName", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passRef.current.value);
    formData.append("NRC", nrcRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("DOB", DOBRef.current.value);
    formData.append("emergencyContact", ECRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("passportNo", passportRef.current.value);
    formData.append("educationBackground", EuBackRef.current.value);
    formData.append("edu", euCer);
    formData.append("workExperience", workExpRef.current.value);
    formData.append("cv", cv);
    formData.append("pf", profile);
    formData.append("relatedPosition", position);
    formData.append("basicSalary", positionID.basicSalary);
    formData.append("recLet", recLetter);
    formData.append("firstInterviewDate", firstInRef.current.value);
    formData.append("firstInterviewResult", firstResRef.current.value);
    formData.append("secondInterviewDate", secInRef.current.value);
    formData.append("secondInterviewResult", secResRef.current.value);
    formData.append("fatherName", fatherRef.current.value);
    formData.append("gender", genderRef.current.value);
    formData.append("employedDate", empDateRef.current.value);
     formData.append("married", marriedFile);
      formData.append("isMarried", married.current.value);
    formData.append("description", description);
     formData.append("directManager", directManagerID);
     formData.append("relatedDepartment", directManagerID);

    otherDoc.forEach((item) => {
      formData.append("other", item); // Assuming 'item' is a File object
    });

    console.log(formData, "formData");

    apiInstance
      .post("user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
          isRequired
          type="text"
          label="Password"
          ref={passRef}
          variant={variant}
          placeholder="Password.."
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
          onChange={handleCer}
          placeholder=" "
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
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

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Department</label>
          <select
            id="countries"
            onChange={(e)=>handleDirectManager(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Department</option>
      
            {departmentList.map((option)=>(
      <option key={option} value={option._id}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Direct Manager</label>
          <select
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            
            <option hidden value={directManagerID}>{directManager}</option>
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
          <label className="text-sm font-semibold">Position</label>
          <select
            id="countries"
            onChange={(e) => handlePosition(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Position</option>
            {positionList.map((option) => (
              <option key={option} value={option._id}>
                {option.name}
              </option>
            ))}
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
          value={positionID?.basicSalary}
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Leave Entitled</label>
          <div className="flex flex-row w-90 text-sm mt-2">
            <div>
              <label>Casual</label>
              <Input disabled value={positionID.casualLeaves} />
            </div>
            &nbsp;
            <div>
              <label>Medical</label>
              <Input disabled value={positionID.medicalLeaves} />
            </div>
            <div>
              <label>Vacation</label>
              <Input disabled value={positionID.vacationLeaves} />
            </div>
            &nbsp;
            <div>
              <label>
                <abbr
                  title="Maternity Male"
                  style={{ textDecoration: "none", border: "none" }}>
                  Male
                </abbr>
              </label>
              <Input disabled value={positionID.maternityLeaveMale} />
            </div>
            <div>
              <label>
                <abbr
                  title="Maternity Female"
                  style={{ textDecoration: "none", border: "none" }}>
                  Female
                </abbr>
              </label>
              <Input disabled value={positionID.maternityLeaveFemale} />
            </div>
          </div>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="w-1/3">
              <label className="text-sm font-semibold">Meal Allowance</label>
              <RadioGroup
                orientation="horizontal"
                className="mt-8"
                value={positionID ? positionID.isMealAllowance : ""}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </div>
            <Input
              className="mt-11"
              type="number"
              value={positionID ? positionID.mealAllowance : "Not Set"}
              placeholder="Meal Allowance"
              variant={variant}
              labelPlacement="outside"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="w-1/3">
              <label className="text-sm font-semibold">Married</label>
              <RadioGroup
                orientation="horizontal"
                className="mt-3"
                ref={married}>
                <Radio value={true} onClick={()=>setShowMarried(!showMarried)}>Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </div>
            {showMarried && (
              <Input
              className="mt-7"
              type="file"
              onChange={handleMarriedFile}
              value={positionID ? positionID.mealAllowance : "Not Set"}
              placeholder="Married Date"
              variant={variant}
              labelPlacement="outside"
            />
            )}
           
          </div>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="w-1/3">
              <label className="text-sm font-semibold">Travel Allowance</label>
              <RadioGroup
                orientation="horizontal"
                className="mt-3"
                value={positionID ? positionID.isTravelAllowance : ""}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </div>
            <Input
              className="mt-7"
              type="number"
              value={positionID ? positionID.travelAllowance : "Not Set"}
              placeholder="Travel Allowance"
              variant={variant}
              labelPlacement="outside"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
         <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="w-1/3">
              <label className="text-sm font-semibold">Yearly Bonus</label>
              <RadioGroup
                orientation="horizontal"
                className="mt-3"
                value={positionID ? positionID.isBonus : ""}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </div>
            <Input
              className="mt-7"
              type="number"
              value={positionID ? positionID.bonus : "Not Set"}
              placeholder="Bonus"
              variant={variant}
              labelPlacement="outside"
            />
          </div>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="w-1/3">
              <label className="text-sm font-semibold">Incentive</label>
              <RadioGroup
                orientation="horizontal"
                className="mt-3"
                value={positionID ? positionID.isIncentive : ""}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </div>
            <Input
              className="mt-7"
              type="number"
              value={positionID ? positionID.incentive : "Not Set"}
              placeholder="Incentive"
              variant={variant}
              labelPlacement="outside"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="file"
          onChange={handleRecLetter}
          label="Recommendation Letter"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="file"
          onChange={handleProfile}
          label="Profile"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>

      <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7">
        <label className="text-sm font-semibold">Other Document</label> &nbsp;
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant="shadow"
          className="rounded-xl px-4 py-0 text-left"
          onPress={onOpen}>
          +
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Other Document
                </ModalHeader>
                <ModalBody>
                  <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <FileUploader
                      multiple={true}
                      handleChange={handleChange}
                      name="file"
                      types={fileTypes}
                    />
                    {/* <p>
                  {otherDoc
                    ? `File name: ${otherDoc[0].name}`
                    : ""}
                </p> */}

                    <Input
                      type="text"
                      label="Description"
                      placeholder=""
                      onChange={(e) => setDescription(e.target.value)}
                      variant="faded"
                      className="mt-5"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7">
          {/* <p>{img[0]}</p>
          <img
            src={
              "http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/employee/other/OTH-" +
              img[0]
            }
            
          /> */}
        </div>
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <Button
          size="sm"
          color="primary"
          variant="shadow"
          className="rounded-xl px-4 py-0 text-left"
          onClick={create}>
          Register
        </Button>
        <Button
          size="sm"
          color="primary"
          variant="shadow"
          className="rounded-xl px-4 py-0 text-left">
          Cancel
        </Button>
      </div>
    </div>
  );
}
