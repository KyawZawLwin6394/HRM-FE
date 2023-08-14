import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import apiInstance from "../../util/api";
// import { EditIcon } from "../../components/Table/editicon";
// import { DeleteIcon } from "../../components/Table/deleteicon";
// import { EyeIcon } from "../../components/Table/eyeicon";
// import { columns, users } from "../../components/Table/data";
import React from "react";
import { useAsyncList } from "@react-stately/data";

export default function Position() {

    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList({
        async load({ signal, cursor }) {
            console.log(cursor)
            if (cursor) {
                setPage((prev) => prev + 1);
            }

            // If no cursor is available, then we're loading the first page.
            // Otherwise, the cursor is the next URL to load, as returned from the previous page.
            const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", { signal });
            let json = await res.json();

            if (!cursor) {
                setIsLoading(false);
            }
            return {
                items: json.results,
                cursor: json.next,
            };
        },
    });

    const hasMore = page < 9;
    
    useEffect(() => {
        const getPositionLists = async () => {
            await apiInstance.get('positions').then(response => { console.log(response.data.data, 'here') })
        }
        getPositionLists()
    }, [])

    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3">

                <div className="body  py-1">
                    <Card className="flex w-full rounded-sm shadow-md py-3 min-w-[1080px]">
                        <CardHeader className="justify-between">
                            <div></div>
                            <div className='font-semibold'>Position List</div>
                            <Button size='sm' radius="sm" className="text-white shadow-sm" color='primary'>
                                <Link to='/emp-add'>
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
                                    hasMore && !isLoading ? (
                                        <div className="flex w-full justify-center">
                                            <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                                                {list.isLoading && <Spinner color="white" size="sm" />}
                                                Load More
                                            </Button>
                                        </div>
                                    ) : null
                                }
                                classNames={{
                                    base: "max-h-[520px] overflow-scroll",
                                    table: "min-h-[420px]",
                                }}
                            >
                                <TableHeader>
                                    <TableColumn key="name">Name</TableColumn>
                                    <TableColumn key="height">Height</TableColumn>
                                    <TableColumn key="mass">Mass</TableColumn>
                                    <TableColumn key="birth_year">Birth year</TableColumn>
                                </TableHeader>
                                <TableBody
                                    isLoading={isLoading}
                                    items={list.items}
                                    loadingContent={<Spinner label="Loading..." />}
                                >
                                    {(item) => (
                                        <TableRow key={item.name}>
                                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
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
        </div>
    )
}