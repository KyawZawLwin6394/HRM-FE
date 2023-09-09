import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Payslip from "../../components/PayRoll/payslip";

export default function PaySlip() {

    return (
        <div className='flex'>
            <div className="sidebar  w-full md:w-32 lg:w-48"><Sidebar /></div>
            <div className="flex-grow  w-full md:w-32 lg:w-48">
                <div className="body">
                    <Card className="rounded-sm shadow-md py-3 min-h-[490px]" >
                        <CardHeader className="flex justify-center">
                            {/* <label className="font-semibold font-nunito">
                                Payslip For Aug
                            </label> */}
                        </CardHeader>
                        <CardBody>
                            < Payslip />
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter>
                            Copyright © 2023-2024 <b className='text-cyan-600'>K-win Technology</b> .All rights reserved.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div >
    )
}