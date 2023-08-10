import Sidebar from "../../components/Sidebar";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

export default function Dashboard() {
    return (
        <div className="flex bg-gray-800 w-full ">
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3">
                <Navbar className="bg-white rounded-md shadow-md"> This is the nav bar</Navbar>
                <div className="body w-full py-1">
                    <Card className="rounded-md shadow-md py-3">
                        <CardHeader className="font-semibold">
                            Employee List
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                            Here is the table
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter>
                            This is the footer
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}