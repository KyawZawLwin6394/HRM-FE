import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

import { Button } from "@nextui-org/react";
// import {Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Input from "../../components/Employee/employeeInput";
export default function employeeAdd() {
  return (
    <div className="flex">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="py-4 min-w-[1080px]">
     
        <div className="body  py-1">
          <Card className="rounded-md shadow-md py-3">
            <CardHeader className="justify-between">
              <Button
                variant="light"
                className="rounded-none px-4 py-0 text-left">
                <Link to="/emp">Back</Link>
              </Button>
              <div className="font-semibold">Employee List</div>
              <div></div>
            </CardHeader>
            <Divider></Divider>
            <CardBody>
              <Input />
            </CardBody>
            <Divider></Divider>
            <CardFooter>
              Copyright © 2023-2024{" "}
              <b className="text-cyan-600">K-win Technology</b> .All rights
              reserved.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
