import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Nav from '../../components/Navbar/index'
import Table from '../../components/Table/table'
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import apiInstance from "../../util/api";


export default function Employee() {

    useEffect(() => {
        const getEmployeeLists = async () => {
            await apiInstance.get('users').then(response => { console.log(response.data.data, 'here') })
        }
        getEmployeeLists()
    }, [])
    
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-4">
                <div className="head bg-white rounded-lg shadow-md min-w-[1080px]">  <Nav /></div>
                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3">
                        <CardHeader className="justify-between">
                            <div></div>
                            <div className='font'>Employee List</div>
                            <Link to='/emp-add'> <Button size='sm' radius="sm" className="bg-gradient-to-tr from-pink-500 to-green-500 text-white shadow-sm ">
                                Add
                            </Button></Link>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                            <Table />
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