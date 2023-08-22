import {
  Popover,
  PopoverTrigger,
  PopoverContent,
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
  Button,
  ModalFooter,
  Pagination,
  ModalHeader,
  ModalBody,
  useDisclosure,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import Swal from 'sweetalert2'

import React, { useState } from 'react'

import { useEffect } from 'react'
import apiInstance from '../../util/api'
import { EditIcon } from '../Table/editicon'
import { DeleteIcon } from '../Table/deleteicon'

import { Link } from 'react-router-dom'
import { ChevronDownIcon } from '../../assets/Icons/ChevronDownIcon'
// import { PlusIcon } from "../../assets/Icons/PlusIcon";
import { SearchIcon } from '../Navbar/search'
import { FileUploader } from 'react-drag-drop-files'
import { TfiImport } from 'react-icons/tfi'
import { BsCloudArrowUpFill, BsPlusSquareDotted } from 'react-icons/bs'

export default function AttendanceTable () {
  //   const [selected, setSelected] = React.useState('')
  const [attendanceList, setAttendanceList] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [delID, setDelID] = useState(null)
  const [popOverOpen, setPopOverOpen] = useState(false)
  const [otherDoc, setOtherDoc] = useState([])
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [departmentList, setDepartmentList] = React.useState([])
  const [attendance, setAttendance] = useState([])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return attendanceList.slice(start, end)
  }, [page, attendanceList])

  const handleChange = e => {
    let array = []
    for (const item of e) {
      array.push(item)
    }
    setOtherDoc(array)
  }

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
  const handleInputChange = (fieldName, value) => {
    setAttendance(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }

  const handleCheck = async (id, radio) => {
    const attendance = attendanceList.filter(el => el._id === id)
    console.log(radio, 'ty')
    if (radio === 'Attend') {
      //   setSelected('Attend')
      let data = attendance
      data.id = id
      data.type = radio

      await apiInstance
        .put('attendance', data)
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
    if (radio === 'Dismiss') {
      let data = attendanceList.filter(el => el._id === id)
      data.id = id
      data.type = radio

      await apiInstance
        .put('attendance', data)
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
  }
  const handleExcelImport = async () => {
    setPopOverOpen(false)
    const formData = new FormData()
    formData.append('other', otherDoc)
    console.log(formData)
  }

  useEffect(() => {
    const getPositions = async () => {
      await apiInstance
        .get(`attendances`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
        .then(res => {
          setAttendanceList(res.data.data)
          console.log(res.data.data, 'att')
          setPages(res.data._metadata.page_count)
        })
    }
    const getDepartmentList = async () => {
      await apiInstance.get('departments').then(res => {
        setDepartmentList(res.data.data)
      })
    }
    getDepartmentList()
    getPositions()
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

  return (
    <>
      <div className='flex flex-row gap-5 justify-between'>
        <div className='flex gap-4 mb-3 flex-row'>
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Department
              </Button>
            </DropdownTrigger>
            <DropdownMenu
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
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              <DropdownItem key='M-F' value='M-F' className='capitalize'>
                All
              </DropdownItem>
              <DropdownItem key='M-S' value='M-S' className='capitalize'>
                Attend
              </DropdownItem>
              <DropdownItem
                key='All Day'
                value='All Day'
                className='capitalize'
              >
                Dismiss
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color='primary'
            endContent={<SearchIcon className='w-5 h-4' />}
          >
            Search
          </Button>
        </div>
        <div className='flex gap-2 mb-3 flex-row'>
          <Popover
            isOpen={popOverOpen}
            placement='bottom'
            offset={20}
            showArrow
          >
            <PopoverTrigger>
              <Button
                color='primary'
                onClick={() => setPopOverOpen(true)}
                endContent={<TfiImport />}
              >
                Import
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mx-auto my-auto'>
                <div className='mt-7'></div>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name='file'
                  types={['JPG', 'PNG', 'GIF']}
                  className='py-3'
                />
                <div className='py-4 flex flex-row justify-between'>
                  <Button
                    color='danger'
                    variant='light'
                    onClick={() => setPopOverOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    color='primary'
                    endContent={<BsCloudArrowUpFill />}
                    onPress={onClose}
                    onClick={() => handleExcelImport()}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Link to='/att-add'>
            <Button endContent={<BsPlusSquareDotted />} color='primary'>
              Add
            </Button>
          </Link>
        </div>
      </div>
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
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
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
          <TableColumn key='no'>No</TableColumn>
          <TableColumn key='date'>Date</TableColumn>
          <TableColumn key='time'>Time</TableColumn>
          <TableColumn key='relatedUser'>Name</TableColumn>
          <TableColumn key='relatedDepartment'>Department</TableColumn>
          <TableColumn key='type'>Type</TableColumn>
          <TableColumn key='source'>Source</TableColumn>
          <TableColumn key='source' className='text-center'>
            Check
          </TableColumn>

          <TableColumn key='action'>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No Positions to display.'}>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.date?.split('T')[0]}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                {item.relatedUser ? item.relatedUser.givenName : 'Not Set'}
              </TableCell>
              <TableCell>
                {item.relatedDepartment && item.relatedDepartment.name
                  ? item.relatedDepartment.name
                  : 'Not Set'}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.source}</TableCell>
              <TableCell>
                <RadioGroup
                  //   color={selected === 'Attend' ? 'success' : 'danger'}
                  //   value={selected}
                  onChange={e => handleInputChange(handleCheck, e.target.value)}
                  orientation='horizontal'
                >
                  <Radio value='Attend'>Attend</Radio>
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
