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
import { Image } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";
import apiInstance from "../../util/api.js";
import Swal from "sweetalert2";
import { FileUploader } from "react-drag-drop-files";
import { useLocation } from "react-router-dom";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function EmployeeInput() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const variant = ["faded"];

  const [other, setOther] = useState([]);
  const addressRef = useRef();

  const [euCer, setEuCer] = useState(null);
  const [recLetter, setRecLetter] = useState(null);
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const EmpID = location.pathname.split("/")[2];
  const [positionList, setPositionList] = useState([]);
  const [directManager, setDirectManager] = useState("");
  const [directManagerID, setDirectManagerID] = useState("");
  const [marriedFile, setMarriedFile] = useState(null);
  const [positionID, setPositionID] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [showMarried, setShowMarried] = useState(false);
  const [employee, setEmployee] = useState([])

  const handleChange = (e) => {
    let array = [];
    for (const item of e) {
      array.push(item);
    }
    setOther(array);
  };
  
  useEffect(() => {
    const getPosition = async () => {
      await apiInstance
        .get(`positions`, { params: { limit: 80 } })
        .then((res) => {
          setPositionList(res.data.data);
          setPositionID(positionList.filter((el) => el._id === res.data.data.relatedPosition ? res.data.data.relatedPosition._id : '')[0]);
          console.log(res.data.data, "po");
        });
    };

    const getEmployee = async () => {
      await apiInstance
        .get("user/" + EmpID, { params: { limit: 80 } })
        .then((res) => {
          //   setEmpList(res.data.data);
          console.log(res.data.data, "heee");
          setEmployee(res.data.data)
          setDirectManager(res.data.data.relatedDepartment.directManager.givenName)
          setDirectManagerID(res.data.data.relatedDepartment.directManager._id)
          setPositionID(res.data.data.relatedPosition)
          if (res.data.data.other) {
            setOther(res.data.data.other);
          }
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
    getDeparttment();
    getEmployee();
    getPosition();
  }, []);

  const handleMarriedFile = (e) => {
    if (e.target.files) {
      setMarriedFile(e.target.files[0]);
    }
  };

  const handlePosition = (val) => {
    console.log(positionList.filter((el) => el._id === val)[0], "bas sal");
    setPositionID(positionList.filter((el) => el._id === val)[0]);
    handleInputChange('relatedPosition', val)
  };
  const handleDirectManager = (id) => {
    setDirectManager(
      departmentList.filter((el) => el._id == id)[0].directManager.givenName
    );
    setDirectManagerID(
      departmentList.filter((el) => el._id == id)[0].directManager._id
    );
    handleInputChange('relatedDepartment', id)
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


  const handleInputChange = (fieldName, value) => {
    setEmployee(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    console.log(marriedFile, 'marriedFile')
    formData.append("givenName", employee.givenName);
    formData.append("email", employee.email);
    formData.append("NRC", employee['NRC']);
    formData.append("address", employee.address);
    formData.append("DOB", employee['DOB']);
    formData.append("emergencyContact", employee.emergencyContact);
    formData.append("phone", employee.phone);
    formData.append("passportNo", employee.passportNo);
    formData.append("educationBackground", employee.educationBackground);
    formData.append("edu", euCer);
    formData.append("workExperience", employee.workExperience);
    formData.append("cv", employee.cv);
    formData.append("pf", profile);
    formData.append("relatedPosition", employee.relatedPosition);
    formData.append("recLet", recLetter);
    formData.append("firstInterviewDate", employee.firstInterviewDate);
    formData.append("firstInterviewResult", employee.firstInterviewResult);
    formData.append("secondInterviewDate", employee.secondInterviewDate);
    formData.append("secondInterviewResult", employee.secondInterviewResult);
    formData.append("fatherName", employee.fatherName);
    formData.append("gender", employee.gender);
    formData.append("employedDate", employee.employedDate);
    if (marriedFile) formData.append("married", marriedFile);
    formData.append("isMarried", employee.isMarried)
    formData.append("description", employee.description);
    formData.append("directManager", employee.directManager);
    formData.append("relatedDepartment", employee.relatedDepartment);
    other.forEach((item) => {
      formData.append("other", item); // Assuming 'item' is a File object
    });
    await apiInstance.put('user', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Edited'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  console.log(other, 'this is other')
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Name"
          value={employee.givenName}
          onChange={(e) => handleInputChange('givenName', e.target.value)}
          placeholder="Name"
          variant={variant}
          labelPlacement="outside"
        />
        <Input
          type="number"
          label="Phone No"
          onChange={(e) => handleInputChange('phone', e.target.value)}
          value={employee.phone}
          placeholder="Phone Number"
          variant={variant}
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          label="Age/DOB"
          value={employee.DOB?.split('T')[0]}
          onChange={(e) => handleInputChange('DOB', e.target.value)}
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
          value={employee.NRC}
          onChange={(e) => handleInputChange('NRC', e.target.value)}
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          label="Passport No"
          placeholder="Passport Number.."
          labelPlacement="outside"
          value={employee.passportNo}
          onChange={(e) => handleInputChange('passportNo', e.target.value)}
          variant={variant}
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Gender</label>
          <select

            onChange={(e) => handleInputChange('gender', e.target.value)}
            id="countries"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden value={employee.gender}>{employee.gender}</option>
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
          value={employee.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          label="Personal Email"
          placeholder=" "
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="text"
          label="Password"

          onChange={(e) => handleInputChange('password', e.target.value)}
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
            value={employee.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            labelPlacement="outside"
            ref={addressRef}
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="file"
            accept=".pdf,.png,.jpeg,.jpg"
            label="CV"
            variant={variant}
            onChange={(e) => handleInputChange('cv', e.target.files[0])}
            placeholder=" "
            labelPlacement="outside"
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          variant={variant}
          value={employee.educationBackground}
          onChange={(e) => handleInputChange('educationBackground', e.target.value)}
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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="date"
          value={employee.firstInterviewDate?.split('T')[0]}
          onChange={(e) => handleInputChange('firstInterviewDate', e.target.value)}
          label="First Interview Date"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant={variant}
        />
        <Input
          type="text"
          label="First Interview Result"
          onChange={(e) => handleInputChange('firstInterviewResult', e.target.value)}
          value={employee.firstInterviewResult}
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
            value={employee.secondInterviewDate?.split('T')[0]}
            onChange={(e) => handleInputChange('secondInterviewDate', e.target.value)}
            placeholder=" "
            labelPlacement="outside"
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            onChange={(e) => handleInputChange('secondInterviewResult', e.target.value)}
            value={employee.secondInterviewResult}
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
            onChange={(e) => handleDirectManager(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>{employee.relatedDepartment ? employee.relatedDepartment.name : 'Not Set'}</option>

            {departmentList.map((option) => (
              <option key={option} value={option._id}>
                {option.name}
              </option>
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
          onChange={(e) => handleInputChange('fatherName', e.target.value)}
          value={employee.fatherName}
          placeholder=" "

          labelPlacement="outside"
        />
        <Input
          type="date"
          label="Employed Date"
          placeholder=" "
          onChange={(e) => handleInputChange('employedDate', e.target.value)}
          value={employee.employedDate?.split('T')[0]}
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="tel"
          variant={variant}
          label="Emergecy Contact"
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          value={employee.emergencyContact}
          placeholder=" "
          labelPlacement="outside"
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Position</label>
          <select
            id="countries"
            onChange={(e) => handlePosition(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>{employee.relatedPosition ? employee.relatedPosition.name : 'Not Set'}</option>
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
          onChange={(e) => handleInputChange('workExperience', e.target.value)}
          value={employee.workExperience}
          label="Work Experience"
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />

        <Input
          type="number"
          label="Basic Salary"
          value={positionID ? positionID.basicSalary : ''}
          placeholder=" "
          labelPlacement="outside"
          variant={variant}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
          <label className="text-sm font-semibold">Leave Entitled</label>
          <div className="flex flex-row text-sm mt-1 gap-2">
            <div>
              <label>Casual</label>
              <Input disabled value={positionID?.casualLeaves} className="py-1" />
            </div>
            <div>
              <label>Medical</label>
              <Input disabled value={positionID?.medicalLeaves} className="py-1" />
            </div>
            <div>
              <label>Vacation</label>
              <Input disabled value={positionID?.vacationLeaves} className="py-1" />
            </div>
            <div>
              <label>
                <abbr
                  title="Maternity Male"
                  style={{ textDecoration: "none", border: "none" }}>
                  Male
                </abbr>
              </label>
              <Input disabled value={positionID?.maternityLeaveMale} className="py-1" />
            </div>
            <div>
              <label>
                <abbr
                  title="Maternity Female"
                  style={{ textDecoration: "none", border: "none" }}>
                  Female
                </abbr>
              </label>
              <Input disabled value={positionID?.maternityLeaveFemale} className="py-1" />
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
                onChange={(e) => handleInputChange('isMarried', e.target.value)}
                value={employee.isMarried}>
                <Radio
                  value={true}
                  onClick={() => setShowMarried(!showMarried)}>
                  Yes
                </Radio>
                <Radio value={false}>No</Radio>
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
                      onChange={handleChange}
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
                      onChange={(e) => handleInputChange('description', e.target.value)}
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
        <div className="flex mt-5">
          {other.map((item) => (
            <>
              <Image
                src={
                  "http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/" +
                  item.imgUrl
                }
                style={{ width: "200px", height: "150px" }}
                // className='object-contain max-w-full max-h-full'

                alt={item.fileName}
              />
              &nbsp;
            </>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
        <Button
          size="sm"
          color="primary"
          variant="shadow"
          className="rounded-xl px-4 py-0 text-left"
          onClick={() => handleUpdate()}>
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
