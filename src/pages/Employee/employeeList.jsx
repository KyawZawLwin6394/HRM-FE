import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Table from "../../components/Employee/employeeList";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import apiInstance from "../../util/api";

export default function Employee() {
  useEffect(() => {
    const getEmployeeLists = async () => {
      await apiInstance.get("users").then((response) => {
        console.log(response.data.data, "here");
      });
    };
    getEmployeeLists();
  }, []);

  useEffect(() => {
    const getEmployeeLists = async () => {
      await apiInstance.get("users").then((response) => {
        console.log(response.data.data, "here");
      });
    };
    getEmployeeLists();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className=" flex-grow">
          <div className="">
            <Card className="rounded-sm shadow-md py-3 min-h-[890px]">
              <CardHeader className="justify-between">
                <div></div>
                <div className="font-semibold">Employee List</div>
                <Link
                  to="/emp-add"
                  className="bg-blue-600 px-5 py-1 rounded-md hover:bg-blue-400 hover:shadow-xl text-white">
                  <span className="text-sm">Add</span>
                </Link>
              </CardHeader>
              <CardBody className="">
                <Table />
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
    </>
  );
}
