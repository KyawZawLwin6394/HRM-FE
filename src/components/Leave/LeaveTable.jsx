import {
    Tooltip, Table, TableHeader, Modal, DropdownItem, ModalContent, Dropdown, DropdownTrigger, DropdownMenu, Kbd, Button, ModalFooter, Pagination, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { PlusIcon } from "../../assets/Icons/PlusIcon";

export default function LeaveTable() {
    const [leaveList, setLeaveList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);

    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return leaveList.slice(start, end);
    }, [page, leaveList]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(leaveList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };


    useEffect(() => {
        const getLeaves = async () => {
            await apiInstance.get(`leaves`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    setLeaveList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        getLeaves()
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
        console.log(setDelID)
        await apiInstance.delete('leave/' + delID)
            .then(() => {
                setLeaveList(leaveList.filter(item => item._id !== delID))
                onClose()
            })
    }

    return (
        <>
            <div className="flex gap-3 mb-3 flex-row-reverse">
                <Button color="primary" endContent={<PlusIcon />}>
                    <Link to='/leave/register'>Add New</Link>
                </Button>
                <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                            Working Days
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectionMode="single"

                    >
                        <DropdownItem key='M-F' value='M-F' className="capitalize">
                            Monday To Friday
                        </DropdownItem>
                        <DropdownItem key='M-S' value='M-S' className="capitalize">
                            Monday To Saturday
                        </DropdownItem>
                        <DropdownItem key='All Day' value='All Day' className="capitalize">
                            Every Day
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-default-400 text-small">Total {leaveList.length} Leaves</span>
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
                    <TableColumn key="Start Date">Start Date</TableColumn>
                    <TableColumn key="End Date">End Date</TableColumn>
                    <TableColumn key="Name">Name</TableColumn>
                    <TableColumn key="Position">Position</TableColumn>
                    <TableColumn key="Reason">Reason</TableColumn>
                    <TableColumn key="Leave Type">Leave Type</TableColumn>
                    <TableColumn key="Status">Status</TableColumn>
                    <TableColumn key="Action">Action</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Leaves to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.startDate?.split('T')[0]}</TableCell>
                            <TableCell>{item.endDate?.split('T')[0]}</TableCell>
                            <TableCell>{item.relatedUser?.givenName}</TableCell>
                            <TableCell>{item.relatedPosition?.name}</TableCell>
                            <TableCell>{item.reason}</TableCell>
                            <TableCell>{item.leaveType}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">

                                    <Tooltip content="Edit Leave">
                                        <Link to={`/leave/update/${item._id}`}>
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
                    ))}
                </TableBody>
            </Table>
            <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Leave</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this position?
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