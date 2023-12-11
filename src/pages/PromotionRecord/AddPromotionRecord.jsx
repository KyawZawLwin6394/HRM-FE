import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import PositionInputForm from "../../components/Position/PositionInput";
import PromotionRecordInputForm from "../../components/PromotionRecord/PromotionRecordInput";

export default function AddPromotionRecord() {    
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">

                <div className="body  py-1">
                    <Card className="rounded-sm shadow-md py-3 min-h-[890px]">
                        <CardHeader className="justify-center">
                            <div className='font-semibold'>Add Promotion</div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                           <PromotionRecordInputForm />
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