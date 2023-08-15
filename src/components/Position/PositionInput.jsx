
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import apiInstance from "../../util/api";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function PositionInputForm() {
    const variant = 'faded';
    const name = useRef();
    const description = useRef();
    const workingFrom = useRef();
    const workingUntil = useRef();
    const basicSalary = useRef();
    const relatedDepartment = useRef();
    const casualLeaves = useRef();
    const workingDays = useRef();
    const medicalLeave = useRef();
    const vacationLeave = useRef();
    const mleaveMale = useRef();
    const mleaveFemale = useRef();
    const isTravel = useRef();
    const travel = useRef();
    const isMeal = useRef();
    const meal = useRef();
    const isIncentive = useRef();
    const incentive = useRef();
    const incentiveCond = useRef();
    const isBonus = useRef();
    const bonus = useRef();
    const bonusCond = useRef();
    const [departmentList, setDepartmentList] = useState([])

    const handleRegister = async () => {
        let data = {
            name: name.current.value,
            description: description.current.value,
            workingFrom: workingFrom.current.value,
            workingUntil: workingUntil.current.value,
            basicSalary: basicSalary.current.value,
            relatedDepartment: relatedDepartment.current.value,
            casualLeaves: casualLeaves.current.value,
            workingDays: workingDays.current.value,
            medicalLeaves: medicalLeave.current.value,
            vacationLeaves: vacationLeave.current.value,
            maternityLeaveMale: mleaveMale.current.value,
            maternityLeaveFemale: mleaveFemale.current.value,
            isTravelAllowance: isTravel.current.value,
            travelAllowance: travel.current.value,
            isMealAllowance: isMeal.current.value,
            mealAllowance: meal.current.value,
            isIncentive: isIncentive.current.value,
            incentiveCondition: incentiveCond.current.value,
            incentive: incentive.current.value,
            isBonus: isBonus.current.value,
            bonusCondition: bonusCond.current.value,
            bonus: bonus.current.value
        }
        await apiInstance.post('position', data)
            .then(res => {
                Swal.fire({
                    icon:'success',
                    title:'Successfully Registered'
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
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Name"
                    placeholder="Name"
                    variant={variant}
                    ref={name}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Description"
                    placeholder="Description"
                    variant={variant}
                    ref={description}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Working From"
                    placeholder="9:00AM"
                    variant={variant}
                    ref={workingFrom}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Working Until"
                    placeholder="5:00PM"
                    ref={workingUntil}
                    variant={variant}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="Number"
                    label="Basic Salary"
                    placeholder="$.."
                    ref={basicSalary}
                    variant={variant}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Department</label>
                    <select
                        ref={relatedDepartment}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>Choose Department</option>
                        {departmentList.map(item => (
                            <option value={item._id}>{item.name}</option>
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
                    placeholder="$.."
                    variant={variant}
                    ref={casualLeaves}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Working Days</label>
                    <select
                        ref={workingDays}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>Choose Working Days</option>

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
                    type="Number"
                    label="Medical Leave"
                    placeholder="Days"
                    variant={variant}
                    ref={medicalLeave}
                    labelPlacement="outside"
                />
                <Input
                    type="Number"
                    label="Vacation Leave"
                    placeholder="Days"
                    variant={variant}
                    ref={vacationLeave}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="Number"
                    label="Maternity Leave: Male"
                    placeholder="Days"
                    variant={variant}
                    ref={mleaveMale}
                    labelPlacement="outside"
                />
                <Input
                    type="Number"
                    label="Maternity Leave: Male: Female"
                    placeholder="Days"
                    variant={variant}
                    ref={mleaveFemale}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Travel Allowance</label>
                        <RadioGroup orientation="horizontal" className="mt-2" ref={isTravel}>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="Number"
                        label="Travel Allowance"
                        placeholder="Travel Allowance"
                        ref={travel}
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Meal Allowance</label>
                        <RadioGroup orientation="horizontal" className="mt-2" ref={isMeal}>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="Number"
                        ref={meal}
                        label="Meal Allowance"
                        placeholder="Meal Allowance"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>

            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Incentive</label>
                        <RadioGroup orientation="horizontal" className="mt-2" ref={isIncentive}>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="text"
                        label="Incentive Condition"
                        ref={incentiveCond}
                        placeholder="Incentive Condition"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <Input
                    type="Number"
                    ref={incentive}
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
                        <RadioGroup orientation="horizontal" className="mt-2" ref={isBonus}>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="text"
                        ref={bonusCond}
                        label="Bonus Condition"
                        placeholder="Bonus Condition"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <Input
                    type="Number"
                    ref={bonus}
                    label="Bonus Value"
                    placeholder="$.."
                    variant={variant}
                    labelPlacement="outside"
                />

            </div>

            <div className="flex justify-center gap-10 py-4">
                <Button color="default">Cancel</Button>
                <Button color="primary" onClick={() => handleRegister()}>Register</Button>
            </div>
        </div>
    )
}