
import { Button, Input, Radio, RadioGroup, CheckboxGroup } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CustomCheckbox } from "../Checkbox/CustomCheckbox";
import { Train } from "@mui/icons-material";


export default function PromotionRecordInputForm() {
    const variant = 'faded';
    const navigate = useNavigate();
    

    const [oldPosition, setOldPosition] = useState([]);
    const [departmentSelect, setDepartmentSelect] = useState();
    const [departmentList, setDepartmentList] = useState([]);
    const [allPositionList, setAllPositionList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const { form, register, handleSubmit, formState: { errors } } = useForm();
    const [offerLetter, setOfferLetter] =useState(null);

    

    const handleOfferLetter = e => {
       setOfferLetter(e.target.files[0])
       console.log("offer letter is ",e.target.files[0])
       
    }
   
    const handleInputChange = async (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
       
        };
    
    const handleCallDepartmentApi = async (value) => {
        apiInstance.get('users/department',
        {
            params:{ dep:value}
        })
        .then(
            res=> {
                setEmployeeList(res.data.data)
                setDepartmentSelect(res.data.data[0].relatedDepartment.name)
            }
            )
    }

    const handleInputEmployee = (value) => {
        let relatedPosition = employeeList.find(employee=>employee._id === value);
        setOldPosition(relatedPosition.relatedPosition.name);
        handleInputChange("oldPosition",relatedPosition.relatedPosition._id)
    };

    const [data, setData] = useState({
        employee : null,
        oldPosition : null,
        newPosition : null,
        training : null,
        attendanceRecord : null,
        otherContribution : null,
        offerLetter:null,
        file:null,
        performance : null
    });

    const handleRegister = async () => {
        const formData = new FormData();
       formData.append("file",offerLetter)
       formData.append("data",data)
       console.log("formData is "+JSON.stringify(formData))
        let payload = data;
        apiInstance.post('promote',payload, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res=>{})
        
        apiInstance.put('user',{id:payload.employee,relatedPosition:payload.newPosition})
        .then(//res=>  navigate("/promote")
        )
    //    if (groupSelected) payload.workingDay = groupSelected
    //     await apiInstance.post('position', payload)
    //         .then(() => {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Successfully Registered'
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
     }

    useEffect(() => {
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        getDepartmentList()
        const getPositionList = async () => {
            await apiInstance.get('positions')
                .then(res => setAllPositionList(res.data.data))
        }
        getPositionList()
    }, [])

    return (
        <div className="gap-4">
            <form onSubmit={handleSubmit(handleRegister)} encType="multipart/formdata">
            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>Department</label>
                        {departmentSelect ?
                         <Input
                         type="text"
                         value = {departmentSelect}
                         variant={variant}
                         labelPlacement="outside"
                         {...register('department')}
                         readOnly/>
                        :
                        <select
                            value = {departmentSelect}
                            placeholder={departmentSelect}
                            {...register('department', { required: true, onChange: (e) => {
                                handleCallDepartmentApi(e.target.value) }})}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option value=""></option>
                            {departmentList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}
                          
                        </select>
                 }
                
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>Name</label>
                        <select
                            {...register('employee', { required: true, onChange: (e) =>{ 
                                handleInputEmployee( e.target.value)
                                 handleInputChange('employee', e.target.value)
                                 }})}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=""></option>
                            {employeeList?.map(item => (
                                <option key={item._id} value={item._id}>{item.givenName}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                       
                    </div>
                    <Input
                        type="text"
                        label="Training"
                        placeholder="Training"
                        variant={variant}
                        {...register('training', { required: true,
                        onChange:(e)=>handleInputChange("training",e.target.value)})}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Old Position"
                        placeholder="Old Position"
                        value = {oldPosition}
                        variant={variant}
                        labelPlacement="outside"             
                        readOnly
                    />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>New Position</label>
                        <select
                            {...register('newPosition', { required: true,
                                onChange:(e)=>handleInputChange("newPosition",e.target.value)
                            })}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                             <option value=""></option>
                            {allPositionList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                            type="text"
                            label="Attendance Record"
                            placeholder="Attendance Record"
                            variant={variant}
                            {...register('attendanceRecord', { required: true,
                                onChange:(e)=>handleInputChange("attendanceRecord",e.target.value)})}
                            labelPlacement="outside"
                        />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                            type="file"
                            label="Offer Letter"
                            placeholder="Offer Letter"
                            variant={variant}
                            labelPlacement="outside"
                            onChange={handleOfferLetter}
                            // {...register('offerLetter', { required: true,
                            //     onChange:(e)=>handleOfferLetter("offerLetter",e)})}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Other Contribution"
                        placeholder="Other Contribution"
                        variant={variant}
                        validationState={errors.casualLeaves && errors.casualLeaves.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('otherContribution', { required: true,
                            onChange:(e)=>handleInputChange("otherContribution",e.target.value)})}
                    /> 
                    <Input
                            type="text"
                            label="Performance"
                            placeholder="Performance"
                            variant={variant}
                            {...register('performance', { required: true,
                                onChange:(e)=>handleInputChange("performance",e.target.value)})}
                            labelPlacement="outside"
                        />
                </div>

                <div className="flex justify-center gap-10 py-4">
                    <Button color="danger" >
                        <Link to='/promte'>
                            Cancel
                        </Link>
                    </Button>
                    <Button color="primary" type="submit">Promote</Button>
                </div>
            </form >
        </div >
    )
}