import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, Kbd, Modal, Pagination, ModalContent, Button, ModalFooter, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import React from "react";
import { SearchIcon } from "../Navbar/search";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { Link } from "react-router-dom";
import ExtraPay from './extrapay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

export default function PayrollTable() {
    const functions = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [payrollList, setPayrollList] = useState([])
    const { isOpen, onClose } = useDisclosure();
    const { isOpen: isOpenExtra, onOpen: onOpenExtra, onClose: onCloseExtra } = useDisclosure();
    const [departmentList, setDepartmentList] = useState([]);
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [month, setMonth] = useState('')
    const [departmentID, setDepartmentID] = useState('')

    const filterPayrollList = async () => {
        await apiInstance.get('payrolls', { params: { month: month, relatedDepartment: departmentID } })
            .then(res => {
                setPayrollList(res.data.data)
            })
    }

    const handlePayrollCalculation = async () => {
        await apiInstance.get('payrolls/calculate', { params: { month: month, relatedDepartment: departmentID } })
            .then(res => {
                setPayrollList(res.data.data)
            })
    }

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return payrollList.slice(start, end);
    }, [page, payrollList]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(payrollList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };

    useEffect(() => {
        const getPayrolls = async () => {
            await apiInstance.get(`payrolls`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    setPayrollList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        const getDepartments = async () => {
            await apiInstance.get('departments')
                .then(res => {
                    setDepartmentList(res.data.data)
                })
        }
        getDepartments()
        getPayrolls()
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, rowsPerPage])

    //     const handleOpen = (event) => {
    // onOpen()
    //         console.log(event.currentTarget.getAttribute('data-key'))
    //         setDelID(event.currentTarget.getAttribute('data-key'))
    //     }
    const handleExtraOpen = () => {
        onOpenExtra()
    }

    const handleClose = () => {
        onClose();
        setDelID(null)
    }

    const handleDelete = async () => {
        console.log(setDelID)
        await apiInstance.delete('payroll/' + delID)
            .then(() => {
                setPayrollList(payrollList.filter(item => item._id !== delID))
                onClose()
            })
    }

    return (
        <>
            <div className="flex flex-row gap-3 justify-between">
                <div className="flex gap-3 mb-3 flex-row">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                {month ? month : 'Month'}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectionMode="single"
                            onAction={(key) => setMonth(key)}

                        >
                            {functions.map(item => (
                                <DropdownItem key={item} value={item} className="capitalize">
                                    {item}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                Department
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(key) => setDepartmentID(key)}
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectionMode="single"
                        >
                            {departmentList.map(item => (
                                <DropdownItem key={item._id} value={item._id} className="capitalize">
                                    {item.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" endContent={<SearchIcon className='w-5 h-4' />} onClick={filterPayrollList}>
                        Search
                    </Button>

                </div>
                <div className="flex gap-3">

                    <Button color="primary" endContent={<PlusIcon />} onClick={handlePayrollCalculation}>
                        Calculate

                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-default-400 text-small">Total {payrollList.length} Payrolls</span>
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
                    <TableColumn>No</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Position</TableColumn>
                    <TableColumn>Payroll</TableColumn>
                    <TableColumn>Basic Salary</TableColumn>
                    <TableColumn>Total Attendance</TableColumn>
                    <TableColumn>Paid Leaves</TableColumn>
                    <TableColumn>Unpaid Leaves</TableColumn>
                    <TableColumn>Entitled Salary</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Payrolls to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.relatedUser?.givenName}</TableCell>
                            <TableCell>{item?.relatedUser?.relatedPosition?.name}</TableCell>
                            <TableCell>{item?.relatedUser?.relatedDepartment?.name}</TableCell>
                            <TableCell>{item?.relatedUser?.relatedPosition?.basicSalary}</TableCell>
                            <TableCell className="text-center">{item.totalAttendance}</TableCell>
                            <TableCell className="text-center">{item.paidLeaves}</TableCell>
                            <TableCell className="text-center">{item.unpaidLeaves}</TableCell>
                            <TableCell className="text-center">{item.entitledSalary}</TableCell>
                            <TableCell>  <div className="flex gap-1">
                                <Tooltip content="Payslip">
                                    <Button variant='light' size='sm' isIconOnly onClick={handleExtraOpen} >
                                        <Link to={'/payslip/' + item._id} className="m-auto">
                                            <FontAwesomeIcon icon={faFileInvoice} size="xl" />
                                        </Link>
                                    </Button>
                                </Tooltip>
                                <Tooltip content='Extra'>
                                    <Button variant='light' size='sm' isIconOnly startContent={<FontAwesomeIcon icon={faHandHoldingDollar} size="xl" />} onClick={handleExtraOpen} >
                                    </Button>
                                </Tooltip>

                            </div></TableCell>
                            {/* <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Edit Payroll">
                                        <Link to={`/payroll/update/${item._id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete Payroll">
                                        <span data-key={item._id} className="text-lg text-danger cursor-pointer active:opacity-50" onClick={(e) => handleOpen(e)}>
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose} >
                <ModalContent >
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Payroll</ModalHeader>
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
                                    <Kbd className="bg-danger-500" keys={['enter']}></Kbd>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal backdrop='blur' isOpen={isOpenExtra} onClose={onCloseExtra} size='lg' >
                <ModalContent >
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Extra Pay</ModalHeader>
                            <ModalBody>
                                <ExtraPay />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}