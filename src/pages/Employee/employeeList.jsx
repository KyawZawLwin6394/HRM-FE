import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
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
            <div className="py-3">
                
                <div className="body  py-1">
                    <Card className="flex w-full rounded-sm shadow-md py-3 min-w-[1080px]">
                        <CardHeader className="justify-between">
                            <div></div>
                            <div className='font-semibold'>Employee List</div>
                            <Button size='sm' radius="sm" className="text-white shadow-sm" color='primary'>
       <Link to='/emp-add'> 
                                Add
                         </Link>
                            </Button>
                     
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