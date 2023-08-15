import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import apiInstance from "../../util/api";
import React from "react";
import { useAsyncList } from "@react-stately/data";
// import { EditIcon } from "../../components/Table/editicon";
// import { DeleteIcon } from "../../components/Table/deleteicon";
// import { EyeIcon } from "../../components/Table/eyeicon";
// import { columns, users } from "../../components/Table/data";

export default function Position() {

    const [page, setPage] = React.useState(10);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadable, setLoadable] = useState(true);
    let list = useAsyncList({
        async load({ cursor }) {
            // If no cursor is available, then we're loading the first page.
            // Otherwise, the cursor is the next URL to load, as returned from the previous page.
            const response = await apiInstance.get(cursor || 'positions?limit=10&skip=0')
            if (!cursor) {
                setIsLoading(false);
            }
            setPage((prev) => prev + 10);
            response.data.data.length === 0 ? setLoadable(false) : setLoadable(true)
            return {
                items: response.data.data,
                cursor: `positions?limit=10&skip=${page}`,
            };
        },
    });


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
                                bottomContent={
                                    loadable && !isLoading ? (
                                        <div className="flex w-full justify-center">
                                            <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                                                {list.isLoading && <Spinner color="white" size="sm" />}
                                                Load More
                                            </Button>
                                        </div>
                                    ) : null
                                }
                                classNames={{
                                    base: "max-h-[719px] overflow-scroll",
                                    table: "min-h-[600px]",
                                }}
                            >
                                <TableHeader>
                                    <TableColumn key="name">Name</TableColumn>
                                    <TableColumn key="description">Description</TableColumn>
                                    <TableColumn key="workingDay">Working Days</TableColumn>
                                    <TableColumn key="workingFrom">From</TableColumn>
                                    <TableColumn key="workingUntil">To</TableColumn>
                                    <TableColumn key="casualLeaves">Casual Leave</TableColumn>
                                    <TableColumn key="medicalLeaves">Medical Leave</TableColumn>
                                    <TableColumn key="vacationLeaves">Vacation Leave</TableColumn>
                                    <TableColumn key="basicSalary">Salary</TableColumn>
                                </TableHeader>
                                <TableBody
                                    emptyContent={"No Positions to display."}
                                    isLoading={isLoading}
                                    items={list.items}
                                    loadingContent={<Spinner label="Loading..." />}
                                >
                                    {(item) => (
                                        <TableRow key={item._id}>
                                            {(columnKey,) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
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