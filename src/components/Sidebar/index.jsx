import { Accordion, AccordionItem } from '@nextui-org/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faBuildingUser, faCalendarDays, faCalendarXmark, faHandHoldingDollar, faMoneyCheckDollar, faUsers } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardBody,
  CardFooter,
  Divider,

} from '@nextui-org/react'
import BadgeIcon from '@mui/icons-material/Badge'
import { Link } from 'react-router-dom'



export default function Sidebar () {
  const itemClasses = {
    base: ' px-2 w-full',
    title: 'font-normal text-medium text-left',
    trigger: 'data-[hover=true]:bg-default-100 round',
    indicator: 'text-medium px-1 py-1',
    content: 'text-small px-2 text-left'
  }
  return (
    <>
      <div className='sidebar w-full grid grid-cols-1 grid-flow-col px-1'>
        <div className='nav-bar flex-grow'>
          <Card className='w-[250px] max-h rounded-sm'>
            <Divider />
            <CardBody className='px-0 py-0 m-0'>
              <Accordion
                isCompact={true}
                selectionMode='multiple'
                variant='splited'
                itemClasses={itemClasses}
                defaultExpandedKeys={['1', '2', '3', '4', '5', '6']}
              >
                {/* Employee */}
                <AccordionItem key='1' title='Master'>
                  <Link to='/emp'>
                    <div className='hover:bg-default-100 px-4 py-3 m-auto'>
                      <FontAwesomeIcon icon={faUsers} size='xl' />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Employee</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/attendance'>

                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faCalendarDays} size='xl' />

                      &nbsp;&nbsp;
                      <span className='m-2 font-medium'>Attendance</span>
                    </div>
                  </Link>

                  <Divider></Divider>
                  <Link to='/position'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faBriefcase} size='xl' />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Position</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/department'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faBuildingUser} size='xl' />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Department</span>
                    </div>
                  </Link>

                  <Divider></Divider>
                  <Link to='/leave'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faCalendarXmark} size='xl' />

                      &nbsp;&nbsp;
                      <span className='m-auto'>Leave</span>
                    </div>
                  </Link>

                  <Divider></Divider>
                  <Link to='/payroll'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faMoneyCheckDollar} size='xl' />

                      &nbsp;&nbsp;
                      <span className='m-auto'>Pay Roll</span>
                    </div>
                  </Link>
                </AccordionItem>

                {/* Position */}
                <AccordionItem key='2' aria-label='Position' title='Position'>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Position</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Position Update</span>
                    </div>
                  </Link>
                </AccordionItem>

                {/* Department */}
                <AccordionItem
                  key='3'
                  aria-label='Department'
                  title='Department'
                >
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Department</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Department Update</span>
                    </div>
                  </Link>
                </AccordionItem>

                {/* Attendance */}
                <AccordionItem
                  key='4'
                  aria-label='Attendance'
                  title='Attendance'
                >
                  <Link to='/attendance'>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Attendance</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/att-detail'>
                    <div className='hover:bg-default-100 px-4 py-2'>
                    <FontAwesomeIcon icon={faHandHoldingDollar} size='xl' />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Payroll Detail</span>
                    </div>
                  </Link>
                </AccordionItem>

                {/* Leave */}
                <AccordionItem key='5' aria-label='Leave' title='Leave'>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Leave List</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Leave Update</span>
                    </div>
                  </Link>
                </AccordionItem>

                {/* Payslip */}
                <AccordionItem key='6' aria-label='Payslip' title='Payslip'>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>PaySlip List</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link>
                    <div className='hover:bg-default-100 px-4 py-2'>
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <span className='m-auto'>Payslip Update</span>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
              <Divider></Divider>
            </CardBody>
            <Divider />
            <CardFooter>
              {/* <User
                name='Alice'
                description='Product Designer'
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                }}
              /> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
