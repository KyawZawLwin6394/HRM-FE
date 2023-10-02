import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarBrand,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Image } from '@nextui-org/react'
import { SearchIcon } from './search'
// import { Link } from 'react-router-dom'
import ThemeSwitch from '../ThemeSwitch/index'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiInstance from '../../util/api'
import Hr from '../../assets/hr1.png'


export default function NavBar() {
  const [imgUrl, setImgUrl] = useState('')
  const [user, setUser] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [setting, setSetting] = useState({})

  const handleInputChange = (fieldName, value) => {
    setSetting(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }

  const updateSetting = async () => {
    let payload = setting
    payload.id = '651a509cf4fb8a5371913a55' //setting main id to update
    await apiInstance.put('setting', payload) //main setting id
      .then(() => {
        alert('successful')
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  const logOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const location = useLocation()

  useEffect(() => {

    const userID = localStorage.getItem('id')
    const getUser = async () => {
      await apiInstance.get('user/' + userID)
        .then(res => {
          if (res.data.data.profile[0].imgUrl) {
            setImgUrl(res.data.data.profile[0].imgUrl)
          }
          setUser(res.data.data)
        })
    }
    const getSetting = async () => {
      await apiInstance.get('setting/' + '651a509cf4fb8a5371913a55') //main setting id
        .then(res => {
          setSetting(res.data.data[0])
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    }
    getSetting()
    getUser()
  }, [])
  // const NavCheck = location.pathname === '/'
  return (
    <>
      {location.pathname !== '/' && (
        <Navbar maxWidth='full' isBordered isBlurred={false} className='py-4 sticky-top'>
          {/* <h3>Hello</h3> */}

          <NavbarBrand>
            <div className='flex flex-row place-content-between'>
              <Image
                alt='nextui logo'
                height={40}
                radius='sm'
                src={Hr}
                width={40}
              />
              <div className='flex ml-4'>
                <p className='text-md m-auto'>HR Management</p>
              </div>
            </div>
          </NavbarBrand>

          <NavbarContent
            as='div'
            className='items-center mt-2 flex-grow'
            justify='end'
          >
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[28rem] h-8',
                input: 'text-small',
                inputWrapper:
                  'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
              }}
              placeholder='Type to search...'
              size='sm'
              startContent={<SearchIcon size={20} />}
              type='search'
            />

            <Dropdown placement='bottom-end mt-1'>
              <DropdownTrigger>
                <Avatar
                  as='button'
                  radius='sm'
                  className='transition-transform'
                  color='primary'
                  size='md'
                  src={`http://hrmbackend.kwintechnologykw11.com:5000/static/hrm${imgUrl}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='h-14 gap-2'>
                  <p className='font-semibold'>Signed in as</p>
                  <p className='font-semibold'>{user ? user.email : ''}</p>
                </DropdownItem>
                <DropdownItem key='system' color='primary' onClick={onOpen}>System Settings</DropdownItem>
                <DropdownItem key='logout' color='danger' onClick={logOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <ThemeSwitch />
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='outside'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Settings
                  </ModalHeader>
                  <ModalBody>
                    <Card
                      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                      shadow="none"
                      isBlurred>
                      <CardHeader>
                        <div className='font-semibold'>Location</div>
                      </CardHeader>
                      <CardBody>
                        {console.log(setting)}
                        <div className='flex flex-col gap-2'>
                          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                              type='number'
                              label='Latitude'
                              placeholder='Latitude'
                              labelPlacement='outside'
                              value={setting?.referenceLat}
                              onChange={(e) => handleInputChange('referenceLat', e.target.value)}
                              onWheel={(e) => e.preventDefault()} // Disable scrolling
                            />
                            <Input
                              type='number'
                              label='Longitude'
                              placeholder='Longitude'
                              labelPlacement='outside'
                              value={setting?.referenceLon}
                              onWheel={(e) => e.preventDefault()} // Disable scrolling
                              onChange={(e) => handleInputChange('referenceLon', e.target.value)}
                            />
                          </div>
                          <Input
                            type='text'
                            label='Address'
                            placeholder='Address'
                            labelPlacement='outside'
                            value={setting?.refAddress}
                            onChange={(e) => handleInputChange('refAddress', e.target.value)}
                          />
                        </div>
                      </CardBody>
                      <CardFooter></CardFooter>
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      No, Cancel
                    </Button>
                    <Button color="primary" onClick={updateSetting}>
                      Yes, Save Changes
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Navbar >


      )
      }
    </>
  )
}
