import Sidebar from "../../components/Sidebar";
import { Tooltip, Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../../components/Table/editicon";
import { DeleteIcon } from "../../components/Table/deleteicon";
import { EyeIcon } from "../../components/Table/eyeicon";

export default function Position() {
    const [positionList, setPositionList] = useState([])


    useEffect(() => {
        const getPositions = async () => {
            await apiInstance.get(`positions`)
                .then(res => {
                    setPositionList(res.data.data)
                })
        }
        getPositions()
    }, [])

    const handleDelete = async () => {
        console.log(positionList)
    }

    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">
                <div className="body  py-1">
                    <Card className="rounded-sm shadow-md py-3 min-h-[890px]">
                        <CardHeader className="justify-between">
                            <div></div>
                            <div className='font-semibold'>Position List</div>
                            <Button size='sm' radius="sm" className="text-white shadow-sm" color='primary'>
                                <Link to='/position/register'>
                                    Add
                                </Link>
                            </Button>

                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                            <Table
                                isHeaderSticky
                                aria-label="Example table with client side sorting"
                                classNames={{
                                    base: "max-h-[719px] overflow-scroll",
                                    table: "min-h-[600px]",
                                }}
                            >
                                <TableHeader>
                                    <TableColumn key="no">No</TableColumn>
                                    <TableColumn key="name">Name</TableColumn>
                                    <TableColumn key="description">Description</TableColumn>
                                    <TableColumn key="workingDay">Working Days</TableColumn>
                                    <TableColumn key="workingFrom">From</TableColumn>
                                    <TableColumn key="workingUntil">To</TableColumn>
                                    <TableColumn key="casualLeaves">Casual Leave</TableColumn>
                                    <TableColumn key="medicalLeaves">Medical Leave</TableColumn>
                                    <TableColumn key="vacationLeaves">Vacation Leave</TableColumn>
                                    <TableColumn key="basicSalary">Salary</TableColumn>
                                    <TableColumn key="actions">Actions</TableColumn>
                                </TableHeader>
                                <TableBody
                                    emptyContent={"No Positions to display."}
                                >
                                    {positionList.map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{index++}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.workingDay}</TableCell>
                                            <TableCell>{item.workingFrom}</TableCell>
                                            <TableCell>{item.workingUntil}</TableCell>
                                            <TableCell>{item.casualLeaves}</TableCell>
                                            <TableCell>{item.medicalLeaves}</TableCell>
                                            <TableCell>{item.vacationLeaves}</TableCell>
                                            <TableCell>{item.basicSalary}</TableCell>
                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Tooltip content="Details">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EyeIcon />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip content="Edit user">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EditIcon />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete user">
                                                        <span data-key={item._id} className="text-lg text-danger cursor-pointer active:opacity-50" onClick={(e) => handleDelete(e)}>
                                                            <DeleteIcon />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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