import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function DepartmentInputForm() {
  const variant = "faded";
  const [departmentList, setDepartmentList] = useState([]);

  const handleInputChange = (fieldName, value) => {
    setData((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const [data, setData] = useState({
    name: null,
    time: null,
    date: null,
    source: null,
    type: null,
    relatedDepartment: null,
  });

  const handleRegister = async () => {
    await apiInstance
      .post("attendance", data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Registered",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getDepartmentList = async () => {
      await apiInstance
        .get("departments")
        .then((res) => setDepartmentList(res.data.data));
    };
    getDepartmentList();
  }, []);

  return (
    <div className="gap-3">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <Input
          type="text"
          label="Name"
          placeholder="Name"
          variant={variant}
          onChange={(e) => handleInputChange("name", e.target.value)}
          labelPlacement="outside"
        />
        <Input
          type="time"
          label="Time"
          placeholder="Time"
          variant={variant}
          onChange={(e) => handleInputChange("time", e.target.value)}
          labelPlacement="outside"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <label className="text-sm font-semibold">Date</label>
          <Input
            type="date"
            variant={variant}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Source</label>
          <select
            onChange={(e) => handleInputChange("source", e.target.value)}
            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Source</option>

            <option value="Excel">Excel</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Type</label>
          <select
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Source</option>

            <option value="Attend">Attend</option>
            <option value="Dismiss">Dismiss</option>
          </select>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Department</label>
          <select
            onChange={(e) =>
              handleInputChange("relatedDepartment", e.target.value)
            }
            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Department</option>
            {departmentList.map((option) => (
              <option key={option} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-10 py-4">
        <Button color="danger">
          <Link to="/attendance">Cancel</Link>
        </Button>
        <Button color="primary" onClick={() => handleRegister()}>
          Register
        </Button>
      </div>
    </div>
  );
}
