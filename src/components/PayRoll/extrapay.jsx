
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";


export default function LeaveInputForm() {
    
    const variant = 'faded';
    const [employeeList, setEmployeeList] = useState([])
    const [position, setPosition] = useState(null)
    const leaveType = ['Casual', 'Medical', 'Vacation', 'Maternity'];
    const status = ['Approved', 'Declined'];
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [attachFile, setAttachFile] = useState(null);

    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const handleChange = (e) => {
        let array = [];
        for (const item of e) {
            array.push(item);
        }
        setAttachFile(array);
    };
    const [data, setData] = useState({
        startDate: null,
        endDate: null,
        relatedUser: null,
        relatedPosition: null,
        reason: null,
        leaveType: null,
        status: null
    });

    const handleEmployee = async (value) => {
        handleInputChange('relatedUser', value)
        const employee = employeeList.filter(item => item._id === value)
        handleInputChange('relatedPosition', employee[0].relatedPosition._id)
        setPosition(employee[0].relatedPosition)
    }

    const handleRegister = async () => {
        const formData = new FormData()
        formData.append('startDate', data.startDate)
        formData.append('endDate', data.endDate)
        formData.append('relatedUser', data.relatedUser)
        formData.append('relatedPosition', data.relatedPosition)
        formData.append('reason', data.reason)
        formData.append('leaveType', data.leaveType)
        formData.append('status', data.status)
        if (attachFile) {
            attachFile.forEach((item) => {
                formData.append("attach", item); // Assuming 'item' is a File object
            });
        }
        await apiInstance.post('leave', formData)

            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Registered'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const getEmployeeList = async () => {
            await apiInstance.get('users')
                .then(res => setEmployeeList(res.data.data))
        }
        getEmployeeList()

    }, [])

    return (
        <div className="gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="ID"
                    placeholder="Enter ID"
                    variant={variant}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Name"
                    placeholder="Enter name"
                    variant={variant}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Employee</label>
                    <select
                        onChange={(e) => handleEmployee(e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>Choose Employee</option>
                        {employeeList.map(item => (
                            <option key={item._id} value={item._id}>{item.givenName}</option>
                        ))}

                        {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Position</label>
                    <select
                        disabled
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option>{position ? position.name : 'Not Set'}</option>
                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Reason"
                    placeholder="Reason..."
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    variant={variant}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Type</label>
                    <select
                        onChange={(e) => handleInputChange('leaveType', e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>Choose Leave Type</option>
                        {leaveType.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                        {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 min-h-20">
                    <label className="text-sm font-semibold">Status</label>
                    <select
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>Choose Status</option>
                        {status.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                {/* <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="mt-3"></div>
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                </div> */}

            </div>

            <div className="flex justify-center gap-10 py-4">
                <Button color="danger" >
                    <Link to='/payroll'>
                        Cancel
                    </Link>
                </Button>
                <Button color="primary" onClick={() => handleRegister()}>Register</Button>
            </div>
        </div >
    )
}