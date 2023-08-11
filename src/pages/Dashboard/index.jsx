import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Nav from '../../components/Navbar/index'
// import Table from '../../components/Table/table'
export default function Dashboard() {
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-4">
                <div className="head bg-white rounded-lg shadow-md min-w-[1080px]">  <Nav /></div>
                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3">
                        <CardHeader className="font-semibold">
                            Dashboard
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                           {/* <Table/> */}
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