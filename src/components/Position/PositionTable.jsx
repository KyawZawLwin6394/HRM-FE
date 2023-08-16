import { Tooltip, Table, TableHeader, Modal, ModalContent, Button, ModalFooter, Pagination, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { EyeIcon } from "../Table/eyeicon";
import React from "react";

export default function PositionTable() {
    const [positionList, setPositionList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);

    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const rowsPerPage = 15;
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return positionList.slice(start, end);
    }, [page, positionList]);

    useEffect(() => {
        const getPositions = async () => {
            await apiInstance.get(`positions`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    setPositionList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        getPositions()
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
        await apiInstance.delete('position/' + delID)
            .then(() => {
                setPositionList(positionList.filter(item => item._id !== delID))
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
                    <TableColumn key="no">No</TableColumn>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                    <TableColumn key="workingDay">Working Days</TableColumn>
                    <TableColumn key="workingFrom">From</TableColumn>
                    <TableColumn key="workingUntil">To</TableColumn>
                    <TableColumn key="casualLeaves">Casual Leave</TableColumn>
                    <TableColumn key="medicalLeaves">Medical Leave</TableColumn>
                    <TableColumn key="vacationLeaves">Vacation Leave</TableColumn>
                    <TableColumn key="basicSalary">Salary</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Positions to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.workingDay}</TableCell>
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
                            <ModalHeader className="flex flex-col gap-1">Delete Position</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this position?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onClick={handleClose}>
                                    No, Cancel
                                </Button>
                                <Button color="danger" onPress={handleDelete}>
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