import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  User
} from '@nextui-org/react'
import BadgeIcon from '@mui/icons-material/Badge'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  const itemClasses = {
    base: ' px-2 w-full',
    title: 'font-normal text-medium text-left',
    trigger: 'data-[hover=true]:bg-default-100 round',
    indicator: 'text-medium px-1 py-1',
    content: 'text-small px-2 text-left'
  }
  return (
    <>
      <div className='sidebar w-full grid grid-cols-1 grid-flow-col py-3 px-2'>
        <div className='nav-bar flex-grow'>
          <Card className='w-[250px] max-h rounded-lg'>
            <CardHeader className='flex gap-3'>
              <div className='flex flex-row'>
                <Image
                  alt='nextui logo'
                  height={40}
                  radius='sm'
                  src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                  width={40}
                />
                <div className='flex ml-4'>
                  <p className='text-md m-auto'>HR Management</p>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className='px-0 py-0 m-0'>

              <Accordion
                isCompact={true}
                selectionMode='multiple'
                variant='splited'
                itemClasses={itemClasses}
              >

                {/* Employee */}
                <AccordionItem key='1' aria-label='Employee' title='Employee'>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Employee List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Employee Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

                {/* Position */}
                <AccordionItem key='2' aria-label='Position' title='Position'>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Position List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Position Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

                {/* Department */}
                <AccordionItem key='3' aria-label='Department' title='Department'>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Department List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Department Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

                {/* Attendance */}
                <AccordionItem key='4' aria-label='Attendance' title='Attendance' >
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Attendance List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Attendance Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

                {/* Leave */}
                <AccordionItem key='5' aria-label='Leave' title='Leave'>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Leave List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Leave Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

                {/* Payslip */}
                <AccordionItem key='6' aria-label='Payslip' title='Payslip'>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-0 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>
                      <span className='m-auto'>Payslip List</span>
                    </Link>
                  </Button>
                  <Divider></Divider>
                  <Button
                    variant='light'
                    className='rounded-none px-4 py-1 text-left'
                    startContent={<BadgeIcon />}
                  >
                    <Link>

                      <span className='m-auto'>Payslip Update</span>
                    </Link>
                  </Button>
                </AccordionItem>

              </Accordion>
              <Divider></Divider>
            </CardBody>
            <Divider />
            <CardFooter>
              <User
                name='Jane Doe'
                description='Product Designer'
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                }}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
