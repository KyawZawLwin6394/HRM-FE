import {
    Tooltip,
    Table,
    TableHeader,
    Modal,
    DropdownItem,
    ModalContent,
    RadioGroup,
    Radio,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    Kbd,
    Input,
    Button,
    ModalFooter,
    Pagination,
    ModalHeader,
    ModalBody,
    useDisclosure,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
    Divider
} from '@nextui-org/react'
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import { useEffect } from 'react'
import apiInstance from '../../util/api'
import { EditIcon } from '../Table/editicon'
import { DeleteIcon } from '../Table/deleteicon'
import { Link } from 'react-router-dom'
import { ChevronDownIcon } from '../../assets/Icons/ChevronDownIcon'
import { SearchIcon } from '../Navbar/search'
import { convertAndDisplayTZ, convertToWeekDayNames } from '../../util/Util';
import { PlusIcon } from '../../assets/Icons/PlusIcon'

export default function AttendanceDetailPage() {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const disabled = false;
    const [isSearched, setIsSearched] = useState(true);
    const [isDepSelected, setIsDepSelected] = useState(true);
    const [attendanceList, setAttendanceList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [delID, setDelID] = useState(null)
    const [page, setPage] = React.useState(1)
    const [pages, setPages] = React.useState(1)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [departmentList, setDepartmentList] = React.useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [profile, setProfile] = useState({})
    const [month, setMonth] = useState('')
    const [payRoll, setPayroll] = useState({})
    const [img, setImg] = useState('https://placehold.co/250x250/png?text=User')
    const [filter, setFilter] = useState({
        dep: null,
        emp: null
    })

    const handleCalculate = async () => {
        await apiInstance.post('attendances/calculate', { dep: filter.dep, emp: filter.emp, month: month, basicSalary: profile.relatedPosition.basicSalary })
            .then(res => {
                setPayroll(res.data.data)
            })
            .catch(error => {
                setPayroll(error.response.data.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Calculation Failed',
                    text: error.response.data.message,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6'
                })
            })
    }

    const handleSearch = async () => {
        setIsSearched(false)
        await apiInstance.get('user/' + filter.emp).then(res => {
            setProfile(res.data.data)
            console.log(res.data.data, 'user')
            if (res.data.data.profile.length > 0) {
                setImg(`http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/${res.data.data.profile[0].imgUrl}`)
            } else {
                setImg(`https://placehold.co/250x250/png?text=User`)
            }
        })
        await apiInstance
            .get(`attendances/detail`, { params: { limit: 80, rowsPerPage: rowsPerPage, dep: filter.dep, emp: filter.emp, month: month } })
            .then(res => {
                setAttendanceList(res.data.data)
                setPages(res.data._metadata.page_count)
            })
    }

    const handleFilterInput = (value, name) => {
        setFilter(prev => ({ ...prev, [name]: value }))
    }

    const getEmployeeList = async (param) => {
        await apiInstance.get('users/department', { params: { dep: param } }).then(res => {
            setEmployeeList(res.data.data)
        })
    }

    const handleDepartmentDropDown = (value) => {
        handleFilterInput(value, 'dep')
        setIsDepSelected(false)
        getEmployeeList(value)
    }


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return attendanceList.slice(start, end)
    }, [page, attendanceList])


    const handleKeyDown = event => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    }

    const onRowsChange = event => {
        const newRowsPerPage = parseInt(event.target.value)
        setRowsPerPage(newRowsPerPage)
        setPages(Math.ceil(attendanceList.length / newRowsPerPage))
        setPage(1) // Reset the current page to 1 when rows per page changes
    }

    const handleCheck = async (val, id) => {
        const updatedItems = items.map(item => {
            if (item._id === id) {
                return { ...item, type: val };
            }
            return item;
        });
        setAttendanceList(updatedItems);
        await apiInstance
            .put('attendance', { type: val, id: id })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated'
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        const getAttendances = async () => {
            await apiInstance
                .get(`attendances/detail`, { params: { limit: 80, rowsPerPage: rowsPerPage, dep: filter.dep, emp: filter.emp, month: month } })
                .then(res => {
                    setAttendanceList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        const getDepartmentList = async () => {
            await apiInstance.get('departments').then(res => {
                setDepartmentList(res.data.data)
            })
        }

        getDepartmentList()
        getAttendances()
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, rowsPerPage])

    const handleOpen = event => {
        onOpen()
        console.log(event.currentTarget.getAttribute('data-key'))
        setDelID(event.currentTarget.getAttribute('data-key'))
    }

    const handleClose = () => {
        onClose()
        setDelID(null)
    }

    const handleDelete = async () => {
        console.log(setDelID)
        await apiInstance.delete('attendance/' + delID).then(() => {
            setAttendanceList(attendanceList.filter(item => item._id !== delID))
            onClose()
        })
    }

    //
    return (
        <>
            <div className='flex flex-row gap-5 justify-between '>
                <div className='flex gap-4 mb-3 flex-row'>
                    <Dropdown >
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button
                                endContent={<ChevronDownIcon className='text-small' />}
                                variant='flat'
                            >
                                Department
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(value) => handleDepartmentDropDown(value)}
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectionMode='single'
                        >
                            {departmentList.map(item => (
                                <DropdownItem
                                    key={item._id}
                                    value={item._id}
                                    className='capitalize'
                                >
                                    {item.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger isDisabled={isDepSelected} className='hidden sm:flex'>
                            <Button
                                endContent={<ChevronDownIcon className='text-small' />}
                                variant='flat'
                            >
                                Employee
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(value) => handleFilterInput(value, 'emp')}
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectionMode='single'
                        >
                            {employeeList.map(item => (
                                <DropdownItem
                                    key={item._id}
                                    value={item._id}
                                    className='capitalize'
                                >
                                    {item.givenName}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown >
                        <DropdownTrigger isDisabled={isDepSelected} className='hidden sm:flex'>
                            <Button
                                endContent={<ChevronDownIcon className='text-small' />}
                                variant='flat'
                            >
                                {month ? month : 'Month'}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(value) => setMonth(value)}
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectionMode='single'
                        >
                            {months.map(item => (
                                <DropdownItem
                                    key={item}
                                    value={item}
                                    className='capitalize'
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        color='primary'
                        isDisabled={isDepSelected}
                        endContent={<SearchIcon className='w-5 h-4' />}
                        onClick={() => handleSearch()}
                    >
                        Search
                    </Button>
                </div>
                <div className='flex gap-2 mb-3 flex-row'>
                    <Button color='primary' isDisabled={isSearched} onClick={handleCalculate}>
                        Calculate
                    </Button>
                    <Button endContent={<PlusIcon />} color='primary'>
                        <Link to='/att-add'>Add</Link>
                    </Button>
                </div>
            </div>
            <section>
                <div className='mb-3 p-auto flex gap-4 mt-3'>
                    <div className=''>
                        <Image className='flex-none' width={250} height={250} isZoomed src={img} ></Image>
                    </div>
                    <div className='flex-column flex-grow mt-4'>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Employee</span>
                            <Input
                                isDisabled={disabled}
                                size='sm'
                                type="text"
                                label="Name"
                                value={profile.givenName}
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Phone</span>
                            <Input
                                isDisabled={disabled}
                                size='sm'
                                type="text"
                                value={profile.phone}
                                label="Phone"
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Email</span>
                            <Input
                                isDisabled={disabled}
                                size='sm'
                                type="email"
                                value={profile.email}
                                label="Email"
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Basic Salary</span>
                            <Input
                                isDisabled={disabled}
                                size='sm'
                                type="text"
                                label="Basic Salary"
                                value={profile?.relatedPosition?.basicSalary}
                            />
                        </div>
                    </div>
                    <div className='flex-column flex-grow mt-4'>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Paid Leaves</span>
                            <Input
                                isDisabled={disabled}
                                size='lg'
                                type="email"
                                value={payRoll?.paid}
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Entitled Salary</span>
                            <Input
                                isDisabled={disabled}
                                size='lg'
                                type="email"
                                value={payRoll && payRoll.entitledSalary ? Math.round(payRoll?.entitledSalary) : ''}
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Total Attendances</span>
                            <Input
                                isDisabled={disabled}
                                size='lg'
                                type="email"
                                value={payRoll?.totalAttendance}
                            />
                        </div>
                        <div className='flex-row flex gap-2 mb-2'>
                            <span className='m-auto w-1/2'>Unpaid Leaves</span>
                            <Input
                                isDisabled={disabled}
                                size='lg'
                                type="email"
                                value={payRoll?.unpaid}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Divider className='my-3'></Divider>
            <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                    Total {attendanceList.length} Attendances
                </span>
                <label className='flex items-center text-default-400 text-small'>
                    Rows per page:
                    <select
                        className='bg-transparent outline-none text-default-400 text-small'
                        onChange={e => onRowsChange(e)}
                    >
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                    </select>
                </label>
            </div>
            <Table
                isHeaderSticky
                aria-label='Example table with client side sorting'
                classNames={{
                    base: 'max-h-[719px] ',
                    table: 'min-h-[100px]'
                }}
                bottomContent={
                    <div className='flex w-full justify-center'>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color='primary'
                            page={page}
                            total={pages}
                            onChange={page => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Day</TableColumn>
                    <TableColumn>Clock In</TableColumn>
                    <TableColumn>Clock Out</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>Attend Type</TableColumn>
                    <TableColumn>Source</TableColumn>
                    <TableColumn className='text-center'>
                        Check
                    </TableColumn>

                    <TableColumn key='action'>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No Positions to display.'}>
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.date ? convertAndDisplayTZ(item.date) : 'Not Set'}</TableCell>
                            <TableCell>{item.date ? convertToWeekDayNames(item.date) : 'Not Set'}</TableCell>
                            <TableCell>{item.clockIn}</TableCell>
                            <TableCell>{item.clockOut}</TableCell>
                            <TableCell>
                                {item.relatedUser ? item.relatedUser.givenName : 'Not Set'}
                            </TableCell>
                            <TableCell>
                                {item.relatedDepartment && item.relatedDepartment.name
                                    ? item.relatedDepartment.name
                                    : 'Not Set'}
                            </TableCell>
                            <TableCell>{item.attendType}</TableCell>
                            <TableCell>{item.source}</TableCell>
                            <TableCell>
                                <RadioGroup
                                    onValueChange={e => handleCheck(e, item._id)}
                                    orientation='horizontal'
                                    defaultValue={item.type}
                                >
                                    <Radio value='Attend' >Attend</Radio>
                                    <Radio value='Dismiss'>Dismiss</Radio>
                                </RadioGroup>
                            </TableCell>

                            <TableCell>
                                <div className='relative flex items-center gap-2'>
                                    <Tooltip content='Edit Position'>
                                        <Link to={'/att-update/' + item._id}>
                                            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip color='danger' content='Delete user'>
                                        <span
                                            data-key={item._id}
                                            className='text-lg text-danger cursor-pointer active:opacity-50'
                                            onClick={e => handleOpen(e)}
                                        >
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
                    {handleClose => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Delete Position
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this position?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='default' variant='light' onClick={handleClose}>
                                    No, Cancel
                                </Button>
                                <Button
                                    color='danger'
                                    onPress={() => handleDelete()}
                                    onKeyDown={handleKeyDown}
                                >
                                    Yes, I am sure
                                    <Kbd className='bg-danger-500' keys={['enter']}></Kbd>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
