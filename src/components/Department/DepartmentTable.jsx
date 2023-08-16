import { Tooltip, Table, TableHeader, Modal, Pagination, ModalContent, Button, ModalFooter, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { EyeIcon } from "../Table/eyeicon";
import React from "react";

export default function DepartmentTable() {
    const [departmentList, setDepartmentList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const rowsPerPage = 15;
    const items = React.useMemo(() => {

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return departmentList.slice(start, end);
    }, [page, departmentList]);

    useEffect(() => {
        const getDepartments = async () => {
            await apiInstance.get(`departments`, { params: { limit: 80 } })
                .then(res => {
                    setDepartmentList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        getDepartments()
    }, [])

    const handleOpen = (event) => {
        onOpen();
        console.log(event.currentTarget.getAttribute('data-key'))
        setDelID(event.currentTarget.getAttribute('data-key'))
    }

    const handleClose = () => {
        onClose();
        setDelID(null)
    }

    const handleDelete = async () => {
        console.log(setDelID)
        await apiInstance.delete('department/' + delID)
            .then(() => {
                setDepartmentList(departmentList.filter(item => item._id !== delID))
                onClose()
            })
    }

    return (
        <>
            <Table
                isHeaderSticky
                aria-label="Example table with client side sorting"
                classNames={{
                    base: "max-h-[719px] ",
                    table: "min-h-[100px]",
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >

                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Function</TableColumn>
                    <TableColumn>Level</TableColumn>
                    <TableColumn>Reporting To</TableColumn>
                    <TableColumn>Department Manager</TableColumn>
                    <TableColumn>Assistant Manager</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Departments to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.function}</TableCell>
                            <TableCell>{item.level}</TableCell>
                            <TableCell>{item.reportingTo ? item.reportingTo.name : 'Not Set'}</TableCell>
                            <TableCell>{item.directManager ? item.directManager.givenName : 'Not Set'}</TableCell>
                            <TableCell>{item.assistantManager ? item.assistantManager.givenName : 'Not Set'}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Edit Department">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete Department">
                                        <span data-key={item._id} className="text-lg text-danger cursor-pointer active:opacity-50" onClick={(e) => handleOpen(e)}>
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Department</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this position?
                                </p>
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
    )
}