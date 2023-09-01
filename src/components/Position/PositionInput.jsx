
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function PositionInputForm() {
    const variant = 'faded';
    const [departmentList, setDepartmentList] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const [data, setData] = useState({
        name: null,
        description: null,
        workingFrom: null,
        workingUntil: null,
        basicSalary: null,
        relatedDepartment: null,
        casualLeaves: null,
        workingDay: null,
        medicalLeaves: null,
        vacationLeaves: null,
        maternityLeaveMale: null,
        maternityLeaveFemale: null,
        isTravelAllowance: null,
        travelAllowance: null,
        isMealAllowance: null,
        mealAllowance: null,
        isIncentive: null,
        incentiveCondition: null,
        incentive: null,
        isBonus: null,
        bonusCondition: null,
        bonus: null
    });

    const handleRegister = async () => {

        await apiInstance.post('position', data)
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
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        getDepartmentList()
    }, [])

    return (
        <div className="gap-4">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="Name"
                        variant={variant}
                        validationState={errors.name && errors.name.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('name', { required: true, onChange: (e) => handleInputChange('name', e.target.value) })}
                    />
                    <Input
                        type="text"
                        label="Description"
                        placeholder="Description"
                        variant={variant}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Working From"
                        placeholder="9:00AM"
                        variant={variant}
                        validationState={errors.workingFrom && errors.workingFrom.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('workingFrom', { required: true, onChange: (e) => handleInputChange('workingFrom', e.target.value) })}
                    />
                    <Input
                        type="text"
                        label="Working Until"
                        placeholder="5:00PM"
                        validationState={errors.workingUntil && errors.workingUntil.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('workingUntil', { required: true, onChange: (e) => handleInputChange('workingUntil', e.target.value) })}
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="Number"
                        label="Basic Salary"
                        placeholder="$.."
                        validationState={errors.basicSalary && errors.basicSalary.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('basicSalary', { required: true, onChange: (e) => handleInputChange('basicSalary', e.target.value) })}
                    />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>Department</label>
                        <select
                            {...register('relatedDepartment', { required: true, onChange: (e) => handleInputChange('relatedDepartment', e.target.value) })}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Department</option>
                            {departmentList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="Number"
                        label="Casual Leaves"
                        placeholder="Days"
                        variant={variant}
                        validationState={errors.casualLeaves && errors.casualLeaves.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('casualLeaves', { required: true, onChange: (e) => handleInputChange('casualLeaves', e.target.value) })}
                    />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold $ ${errors.workingDay && errors.workingDay.type === 'required' ? 'text-[#f31260]' : ''}`}>Working Days</label>
                        <select
                            {...register('workingDay', { required: true, onChange: (e) => handleInputChange('workingDay', e.target.value) })}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Working Days</option>

                            <option value='M-F'>Mon-Fri</option>
                            <option value='M-S'>Mon-Sat</option>
                            <option value='All Day'>Every Day</option>

                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        validationState={errors.medicalLeaves && errors.medicalLeaves.type === 'required' ? 'invalid' : 'valid'}
                        type="Number"
                        label="Medical Leave"
                        placeholder="Days"
                        variant={variant}
                        labelPlacement="outside"
                        {...register('medicalLeaves', { required: true, onChange: (e) => handleInputChange('medicalLeaves', e.target.value) })}
                    />
                    <Input
                        type="Number"
                        label="Vacation Leave"
                        placeholder="Days"
                        variant={variant}
                        onChange={(e) => handleInputChange('vacationLeaves', e.target.value)}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="Number"
                        label="Maternity Leave: Male"
                        placeholder="Days"
                        variant={variant}
                        onChange={(e) => handleInputChange('maternityLeaveMale', e.target.value)}
                        labelPlacement="outside"
                    />
                    <Input
                        type="Number"
                        label="Maternity Leave: Male: Female"
                        placeholder="Days"
                        variant={variant}
                        onChange={(e) => handleInputChange('maternityLeaveFemale', e.target.value)}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <div className="w-1/3">
                            <label className={`text-sm font-semibold`}>Incentive</label>
                            <RadioGroup
                                orientation="horizontal"
                                className="mt-2"
                                validationState={errors.isIncentive && errors.isIncentive.type === 'required' ? 'invalid' : 'valid'}
                            >
                                <Radio id="isIncentive" value={true} {...register('isIncentive', { required: true, onChange: (e) => handleInputChange('isIncentive', e.target.value) })}>Yes</Radio>
                                <Radio id="isIncentive" value={false} {...register('isIncentive', { required: true, onChange: (e) => handleInputChange('isIncentive', e.target.value) })}>No</Radio>
                            </RadioGroup>
                        </div>
                        <Input
                            type="text"
                            label="Incentive Condition"
                            onChange={(e) => handleInputChange('incentiveCondition', e.target.value)}
                            placeholder="Incentive Condition"
                            variant={variant}
                            labelPlacement="outside"
                        />
                    </div>
                    <Input
                        type="Number"
                        onChange={(e) => handleInputChange('incentive', e.target.value)}
                        label="Incentive Value"
                        placeholder="$.."
                        variant={variant}
                        labelPlacement="outside"
                    />

                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <div className="w-1/3">
                            <label className="text-sm font-semibold">Bonus</label>
                            <RadioGroup orientation="horizontal" className="mt-2">
                                <Radio value={true} onChange={(e) => handleInputChange('isBonus', e.target.value)}>Yes</Radio>
                                <Radio value={false} onChange={(e) => handleInputChange('isBonus', e.target.value)}>No</Radio>
                            </RadioGroup>
                        </div>
                        <Input
                            type="text"
                            onChange={(e) => handleInputChange('bonusCondition', e.target.value)}
                            label="Bonus Condition"
                            placeholder="Bonus Condition"
                            variant={variant}
                            labelPlacement="outside"
                        />
                    </div>
                    <Input
                        type="Number"
                        onChange={(e) => handleInputChange('bonus', e.target.value)}
                        label="Bonus Value"
                        placeholder="$.."
                        variant={variant}
                        labelPlacement="outside"
                    />

                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <div className="w-1/3">
                            <label className="text-sm font-semibold">Travel Allowance</label>
                            <RadioGroup orientation="horizontal" className="mt-2">
                                <Radio value={true} onChange={(e) => handleInputChange('isTravelAllowance', e.target.value)}>Yes</Radio>
                                <Radio value={false} onChange={(e) => handleInputChange('isTravelAllowance', e.target.value)}>No</Radio>
                            </RadioGroup>
                        </div>
                        <Input
                            type="Number"
                            label="Travel Allowance"
                            placeholder="Travel Allowance"
                            onChange={(e) => handleInputChange('travelAllowance', e.target.value)}
                            variant={variant}
                            labelPlacement="outside"
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <div className="w-1/3">
                            <label className="text-sm font-semibold">Meal Allowance</label>
                            <RadioGroup orientation="horizontal" className="mt-2" >
                                <Radio value={true} onChange={(e) => handleInputChange('isMealAllowance', e.target.value)}>Yes</Radio>
                                <Radio value={false} onChange={(e) => handleInputChange('isMealAllowance', e.target.value)}>No</Radio>
                            </RadioGroup>
                        </div>
                        <Input
                            type="Number"
                            onChange={(e) => handleInputChange('mealAllowance', e.target.value)}
                            label="Meal Allowance"
                            placeholder="Meal Allowance"
                            variant={variant}
                            labelPlacement="outside"
                        />
                    </div>

                </div>

                <div className="flex justify-center gap-10 py-4">
                    <Button color="danger" >
                        <Link to='/position'>
                            Cancel
                        </Link>
                    </Button>
                    <Button color="primary" type="submit">Register</Button>
                </div>
            </form >
        </div >
    )
}