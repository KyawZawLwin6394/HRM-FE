import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Input
} from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LeaveInputForm() {
  const print = () => {
    // document.getElementById('printtop').style({ marginTop: '100px' })

    // document.getElementById('printtop').style.position = 'running(footer)'

    let printContents = document.getElementById("print").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
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
      <Card className="shadow-lg" id="print">
        <CardHeader className="text-3xl font-semibold justify-center">
          Payslip For Month
        </CardHeader>
        <CardBody className='justify-center' >
          {/* <table className="table-fixed">
            <tbody style={{ marginTop: "5em" }} className='space-y-10'>
              <tr key="1" className='text-lg'>
                <th>ID</th>
                <td></td>
                <td>KS-107</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Name</th>
                <td></td>
                <td>Kaung Set Hein</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Position</th>
                <td></td>
                <td>React Devloper</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Total Attendance Days</th>

                <td>3 Days</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Paid Leave Days</th>

                <td>1 Days</td>
                <td>1000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Unpaid Leave Days</th>

                <td>3 Days</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Meal Allowance Days</th>

                <td>3 Days</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Total Attendance Days</th>

                <td>3 Days</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Travel Allowance Days</th>

                <td>3 Days</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Incentice</th>

                <td>Reason</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Bonus</th>

                <td>Reason</td>
                <td>3000</td>
              </tr>
              <tr key="1" className='text-lg'>
                <th>Sub Total</th>

                <td></td>
                <td>3000</td>
              </tr>
              <tr key="1" style={{ borderBottom: "1px solid"}} className='text-lg'>
                <th>Income Tax</th>

                <td>%</td>
                <td>3000</td>
                 
              </tr>
            

              <tr key="1" className='text-lg'>
                <th>Net Salary</th>

                <td ></td>
                <td >30000</td>
              </tr>
            </tbody>
          </table> */}
          <table className='text-center sm:text-left'>

  <thead style={{ border:'1px solid'}} className='justify-center text-2xl'>
    <tr>
      <th className='py-3 px-3 '>Name : Kaung Set Hein</th>
      <th className='py-3 px-3 text-end'> ID : 107</th>
      <th></th>
    </tr>
  </thead>
  <tbody style={{ border:'1px solid'}} className='text-xl' >
    <tr>
      <td className='py-3 px-3'>Position</td>
      <td style={{ borderLeft:'1px solid'}} className='px-3'></td>
      <td style={{ borderBottom:'1px solid'}} className='px-3'>React Developer</td>
    </tr>
    <tr>
      <td className='py-3 px-3'>Total Attendance Days</td>
      <td style={{ border:'1px solid'}} className='px-3'>22 Days</td>
      <td style={{ border:'1px solid'}} className='px-3'>180000 MMK</td>
    </tr>
    <tr>
      <td className='py-3 px-3'>Paid Leave Days</td>
      <td style={{ border:'1px solid'}} className='px-3'>3 Days</td>
      <td style={{ border:'1px solid'}} className='px-3'>25000 MMK</td>
    </tr>
      <tr>
      <td className=''></td>
      <td style={{ borderBottom:'1px solid'}} className='px-3'></td>
      <td style={{ borderBottom:'1px solid'}} className='px-3 text-center sm:text-left'>Net Salary : 155000 MMK</td>
    </tr>
  </tbody>
</table>
<div className='flex gap-4 mt-3'>
  <p>
    Month : Aug
  </p>
  <p>
    Year : 2023
  </p>
</div>
           {/* <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
           <label >ID</label>
                <Input
                    type="text"
                    value='Kaung Set Hein'
                    className='font-semibold'
                    // variant={variant}
                    // onChange={(e) => handleInputChange('startDate', e.target.value)}
                    labelPlacement="outside"
                   
                />
            </div> */}

        </CardBody>
        <CardFooter>
          <div className="block w-full">
            <div className="">
              <div
                className="grid grid-cols-3 gap-14"
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "5em",
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
          </div>
        </CardFooter>
      </Card>
      <div className="text-center mt-20">
        <Button color="primary" onClick={print}>
          Print
        </Button>
      </div>
    </div>
  );
}
