import {
    Tooltip, Table, TableHeader, Modal, Chip, DropdownItem, ModalContent, Dropdown, DropdownTrigger, DropdownMenu, Kbd, Button, ModalFooter, Pagination, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { PlusIcon } from "../../assets/Icons/PlusIcon";

export default function PromotionRecordTable() {
    const [promotionList, setPromotionList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);

    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return promotionList.slice(start, end);
    }, [page, promotionList]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(promotionList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };


    useEffect(() => {
        const getPromotionRecord = async () => {
            apiInstance.get(`promote`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    setPromotionList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        getPromotionRecord()
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, rowsPerPage])

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
        
        await apiInstance.delete('promote/' + delID)
            .then(() => {
                setPromotionList(promotionList.filter(item => item._id !== delID))
                onClose()
            })
    }

    return (
        <>
            <div className="flex gap-3 mb-3 flex-row-reverse">
                <Button color="primary" endContent={<PlusIcon />}>
                    <Link to='/promote-add'>Add New</Link>
                </Button>
               
              
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-default-400 text-small">Total {promotionList.length} Promotion Record</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={(e) => onRowsChange(e)}
                    >

                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
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
                    <TableColumn key="oldPosition">Old Position</TableColumn>
                    <TableColumn key="newPosition" className="text-center">New Position</TableColumn>
                    <TableColumn key="performance">Performance</TableColumn>
                    <TableColumn key="training">Training</TableColumn>
                    <TableColumn key="attendance">Attendance Record</TableColumn>
                    <TableColumn key="otherContribution">Other Contribution</TableColumn>
                    <TableColumn key="edit and delete">Edit And Delete</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Promotion to display."}
                >
                    {/* {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Chip variant="faded" color={item.workingDay.includes('Mon') ? 'primary' : 'danger'}>Mon</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Tue') ? 'primary' : 'danger'}>Tue</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Wed') ? 'primary' : 'danger'}>Wed</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Thu') ? 'primary' : 'danger'}>Thu</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Fri') ? 'primary' : 'danger'}>Fri</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Sat') ? 'primary' : 'danger'}>Sat</Chip>
                                    <Chip variant="faded" color={item.workingDay.includes('Sun') ? 'primary' : 'danger'}>Sun</Chip>
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

                                    <Tooltip content="Edit Position">
                                        <Link to={`/position/update/${item._id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Link>

                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user">
                                        <span data-key={item._id} className="text-lg text-danger cursor-pointer active:opacity-50" onClick={(e) => handleOpen(e)}>
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))} */}
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.employee?.givenName}</TableCell>
                            <TableCell>{item.oldPosition?.name}</TableCell>
                            <TableCell>{item.newPosition?.name}</TableCell>
                            <TableCell>{item.performance}</TableCell>
                            <TableCell>{item.training}</TableCell>
                            <TableCell>{item.attendanceRecord}</TableCell>
                            <TableCell>{item.otherContribution}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">

                                    <Tooltip content="Edit Promotion Record">
                                        <Link to={`/promote/update/${item._id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Link>

                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete Promotion Record">
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
                            <ModalHeader className="flex flex-col gap-1">Delete Promotion Record</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this promotion record?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onClick={handleClose}>
                                    No, Cancel
                                </Button>
                                <Button color="danger" onPress={() => handleDelete()} onKeyDown={handleKeyDown}>
                                    Yes, I am sure
                                    <Kbd className="bg-danger-500" keys={['enter']}>
                                    </Kbd>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}