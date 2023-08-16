import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import PositionTable from "../../components/Position/PositionTable";

export default function Position() {

    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="flex-grow">
                <div className="body">
                    <Card className="rounded-sm shadow-md min-h-[890px]" >
                        <CardHeader className="justify-between">
                            <div></div>
                            <div className='font-semibold text-large font-nunito'>Position List</div>
                            <Button size='sm' radius="sm" className="text-white shadow-sm" color='primary'>
                                <Link to='/position/register'>
                                    Add
                                </Link>
                            </Button>

                        </CardHeader>
                        <CardBody>
                            <PositionTable />
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