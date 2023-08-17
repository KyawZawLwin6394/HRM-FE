import {
  Tooltip,
  Table,
  TableHeader,
  Modal,
  ModalContent,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { EyeIcon } from "../Table/eyeicon";

export default function EmployeeTable() {
  const [empList, setEmpList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delID, setDelID] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      await apiInstance.get(`users`, { params: { limit: 80 } }).then((res) => {
        setEmpList(res.data.data);
        console.log(res.data.data, "emp");
      });
    };
    getEmployee();
  }, []);

  const handleOpen = (event) => {
    onOpen();
    console.log(event.currentTarget.getAttribute("data-key"));
    setDelID(event.currentTarget.getAttribute("data-key"));
  };

  const handleClose = () => {
    onClose();
    setDelID(null);
  };

  const handleDelete = async () => {
    console.log(setDelID);
    await apiInstance.delete("position/" + delID).then(() => {
      setEmpList(empList.filter((item) => item._id !== delID));
      onClose();
    });
  };

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with client side sorting"
        classNames={{
          base: "max-h-[719px] ",
          table: "min-h-[100px]",
        }}>

        <TableHeader>
          <TableColumn key="no">No</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="description">Position</TableColumn>
          <TableColumn key="workingFrom"></TableColumn>
          <TableColumn key="workingUntil">To</TableColumn>
          <TableColumn key="casualLeaves">Casual Leave</TableColumn>
          <TableColumn key="medicalLeaves">Medical Leave</TableColumn>
          <TableColumn key="vacationLeaves">Vacation Leave</TableColumn>
          <TableColumn key="basicSalary">Salary</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Positions to display."}>
          {empList.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {" "}
                <User
                  avatarProps={{
                    radius: "lg",
                    src:
                      "http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/" +
                      item.profile?.imgUrl,
                  }}
                  description={item.email}
                  name={item.givenName}>
                  {item.email}
                </User>
              </TableCell>
              <TableCell>
                {" "}
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">Position</p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {item.position}
                  </p>
                </div>
              </TableCell>

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
                    <span
                      data-key={item._id}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={(e) => handleOpen(e)}>
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Position
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this position?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onClick={handleClose}>
                  No, Cancel
                </Button>
                <Button color="danger" onPress={() => handleDelete()}>
                  Yes, I am sure
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
