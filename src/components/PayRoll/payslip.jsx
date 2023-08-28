import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  
} from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LeaveInputForm() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const getEmployeeList = async () => {
      await apiInstance
        .get("users")
        .then((res) => setEmployeeList(res.data.data));
    };
    getEmployeeList();
  }, []);

  return (
    <div className="gap-4">
      <Card className="shadow-lg">
        <CardHeader className="text-2xl font-semibold justify-center">
          Payslip For August
        </CardHeader>
        <CardBody style={{ margin:'auto 30px' }}>
             <table className="hover:table-fixed">
      <thead>
       
      </thead>
      <tbody style={{ marginTop:'5em' }}>
        <tr key="1" >
          <th className='text-lg'>ID</th>
      <td></td>
            <td className='text-lg'>KS-107</td>
        </tr>
        <tr key="1" >
          <th className='text-lg'>Name</th>
<td></td>
            <td className='text-lg'>Kaung Set Hein</td>
        </tr>
                <tr key="1" >
          <th className='text-lg'>Position</th>
<td></td>
            <td className='text-lg'>React Devloper</td>
        </tr>
                <tr key="1" >
          <th className='text-lg'>Total Attendance Days</th>
       

            <td className='text-lg'>3 Days</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Paid Leave Days</th>
       

            <td className='text-lg'>1 Days</td>
            <td className='text-lg'>1000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Unpaid Leave Days</th>
       

            <td className='text-lg'>3 Days</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Meal Allowance Days</th>
       

            <td className='text-lg'>3 Days</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Total Attendance Days</th>
       

            <td className='text-lg'>3 Days</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Travel Allowance Days</th>
       

            <td className='text-lg'>3 Days</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Incentice</th>
       

            <td className='text-lg'>Reason</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Bonus</th>
       

            <td className='text-lg'>Reason</td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Sub Total</th>
       

            <td className='text-lg'></td>
            <td className='text-lg'>3000</td>
        </tr>
            <tr key="1" >
          <th className='text-lg'>Income Tax</th>
       

            <td className='text-lg'>%</td>
            <td className='text-lg'>3000</td>
          
               
        </tr>
        <div className='py-3'>
 <div style={{ borderBottom: "1px solid"}}>
      {/* <div style={{ borderBottom: "1px solid"}} className=''></div> */}
        </div>
        </div>
       
           <tr key="1">
          <th className='text-lg'>Net Salary</th>
       

            <td className='text-lg'></td>
            <td className='text-lg'>30000</td>
        </tr>
      </tbody>
    </table>
        </CardBody>
        <CardFooter>
          <div className="block w-full">
            <div className="">
              <div
                className="grid grid-cols-3 gap-14"
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "10em",
                }}
                id="printtop
">
                <div>
                  Checked By
                  <div
                    className="mt-10 "
                    style={{ borderBottom: "1px solid" }}></div>
                </div>
                <div>
                  Recieved By
                  <div
                    className="mt-10 "
                    style={{ borderBottom: "1px solid" }}></div>
                </div>
                <div>
                  Approved By
                  <div
                    className="mt-10"
                    style={{
                      borderBottom: "1px solid",
                    }}></div>
                </div>
              </div>
            </div>
            <div></div>
            <div className="text-center mt-20">
              <Button color="primary">Print</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
