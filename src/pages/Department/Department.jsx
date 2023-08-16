import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import DepartmentTable from "../../components/Department/DepartmentTable"; 
import { Link } from "react-router-dom";

export default function Department() {
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">
                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3 min-h-[890px]">
                        <CardHeader className="flex justify-between">
                            <div>

                            </div>
                            <div className="font-semibold text-medium font-nunito">
                                Department List
                            </div>
                            <Button color="primary">
                                <Link to='/department/register'>
                                    Add
                                </Link>

                            </Button>
                        </CardHeader>
                        <CardBody >
                            <DepartmentTable />
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter>
                            Copyright © 2023-2024 <b className='text-cyan-600'>K-win Technology</b> .All rights reserved.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}