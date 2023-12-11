
import { Button, Input, Radio, RadioGroup, CheckboxGroup, CircularProgress } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CustomCheckbox } from "../Checkbox/CustomCheckbox";
import { ConstructionOutlined, Train } from "@mui/icons-material";


export default function PromotionRecordUpdateInputForm() {
    const variant = 'faded';
    const navigate = useNavigate();
    const id = useLocation().pathname.split("/")[3]
    
    const [employeeDetail, setEmployeeDetail] = useState([]);
    const [data,setData] = useState(null);
    
   
    
    // const handleCallDepartmentApi = async (value) => {
    //     apiInstance.get('users/department',
    //     {
    //         params:{ dep:value}
    //     })
    //     .then(
    //         res=> {
    //             setEmployeeList(res.data.data)
    //             setDepartmentSelect(res.data.data[0].relatedDepartment.name)
    //         }
    //         )
    // }

    // const handleInputEmployee = (value) => {
    //     let relatedPosition = employeeList.find(employee=>employee._id === value);
    //     setOldPosition(relatedPosition.relatedPosition.name);
    //     handleInputChange("oldPosition",relatedPosition.relatedPosition._id)
    // };

 
    const handleUpdate = async () => {
        let payload = data;
        // payload.employee = data.employee._id;
        // payload.oldPosition = data.oldPosition._id;
        // payload.newPosition = data.newPosition._id;
       
        apiInstance.put('promote/'+id,payload).then(res=>{ navigate("/promote")})
        
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
        const getPromotionRecordById = async () => {
            try {
              apiInstance.get("promote/" + id)
              .then((response)=>{
                const data = response.data.data[0];
                setData(data);
              })
              
            } catch (error) {
              console.error(error);
            }
          }
          
          getPromotionRecordById();
        
    }, [])
    const handleInputChange =  (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
         
        };
    

    return (
        <div className="gap-4">
         
             { data ? 
             <>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className="text-sm font-semibold ">Name </label>
                        <Input
                        type="text"
                        
                      //  label="Name"
                        value = {data.employee.givenName ? data.employee.givenName : " " }
                        placeholder="Name"
                        variant={variant}
                        labelPlacement="outside"
                        readOnly
                    />
                       
                    </div>
                    <Input
                        type="text"
                        label="Training"
                        placeholder="Training"
                        value = {data.training ? data.training : " "}
                        variant={variant}
                       onChange={(e)=>handleInputChange("training",e.target.value)}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        name="oldPosition"
                        label="Old Position"
                        placeholder="Old Position"
                        value = {data.oldPosition.name ? data.oldPosition.name : " "}
                        variant={variant}
                        labelPlacement="outside"             
                        readOnly
                    />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold }`}>New Position</label>
                        <Input
                        type="text"
                        name = "newPosition"
                        placeholder="New Position"
                        value = {data.newPosition.name ? data.newPosition.name : " " }
                        variant={variant}
                        labelPlacement="outside"             
                        readOnly
                    />
                </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                            type="text"
                            name="attendanceRecord"
                            label="Attendance Record"
                            placeholder="Attendance Record"
                            value = {data.attendanceRecord ? data.attendanceRecord : " "}
                            variant={variant}
                           onChange={(e)=>handleInputChange("attendanceRecord",e.target.value)}
                            labelPlacement="outside"
                        />
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                            type="file"
                            label="Offer Letter"
                            placeholder="Offer Letter"
                            variant={variant}
                            labelPlacement="outside"
                        />
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        name="otherContribution"
                        label="Other Contribution"
                        placeholder="Other Contribution"
                        value = {data.otherContribution ? data.otherContribution : " "}
                        variant={variant}
                        labelPlacement="outside"
                        onChange={(e)=>handleInputChange("otherContribution",e.target.value)}
                    /> 
                    <Input
                            type="text"
                            label="Performance"
                            placeholder="Performance"
                            name= "performance"
                            value = {data.performance ? data.performance : " "}
                            variant={variant}
                            onChange={(e)=>handleInputChange("performance",e.target.value)}
                            labelPlacement="outside"
                        />
                </div>

                <div className="flex justify-center gap-10 py-4">
                    <Button color="danger" >
                        <Link to='/promte'>
                            Cancel
                        </Link>
                    </Button>
                    <Button color="primary" onClick={handleUpdate}>Edit</Button>
                </div>
                </>
                : <div className="flex justify-center"> <CircularProgress color="warning" aria-label="Loading..."/></div>
                }
         
        </div >
    )
}