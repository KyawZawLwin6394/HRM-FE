import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import { Tree, TreeNode } from 'react-organizational-chart';
import orgData from './orgData.json';
import { useEffect, useState } from "react";

export default function DepartmentChart() {

    const [orgHierarchy, setOrgHierarchy] = useState(null);

    useEffect(() => {
        setOrgHierarchy(orgData);
    }, []);

    const renderTreeNodes = (node) => {
        if (!node) {
            return null;
        }

        const renderedChildren = node.children?.map(childNode => renderTreeNodes(childNode));

        return (
            <TreeNode label={
                <div className="mx-auto max-w-[200px] items-center border rounded-md border-white">
                    <Card isBlurred shadow="md" className="max-h-[100px]">
                        <CardBody className="overflow-hidden m-0">
                            <label className="text-center mx-auto">
                                {node.label}
                            </label>
                        </CardBody>
                    </Card>
                </div>
            }>
                {renderedChildren}
            </TreeNode>
        );
    };


    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">
                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3 min-h-[860px] ">
                        <CardHeader className="flex justify-center">
                            <div className="font-semibold text-medium">
                                Department Chart
                            </div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody >
                            {orgHierarchy && (
                                <Tree
                                    lineWidth={'2px'}
                                    lineColor={'#0070f0'}
                                    lineBorderRadius={'10px'}
                                    label={
                                        <div className="mx-auto max-w-[200px] items-center border rounded-md border-white">
                                            <Card isBlurred shadow="md" className="max-h-[100px]">
                                                <CardBody className="overflow-hidden m-0">
                                                    <label className="text-center mx-auto">
                                                        {orgHierarchy.label}
                                                    </label>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    }
                                >
                                    {orgHierarchy.children.map(childNode => renderTreeNodes(childNode))}
                                </Tree>
                            )}
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