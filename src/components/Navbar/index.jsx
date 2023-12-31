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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { SearchIcon } from './search'
// import { Link } from 'react-router-dom'
import ThemeSwitch from '../ThemeSwitch/index'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiInstance from '../../util/api'
import Hr from '../../assets/hr1.png'
import { EyeFilledIcon } from './EyeFilledIcon'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import Swal from 'sweetalert2'

export default function NavBar () {
  const [imgUrl, setImgUrl] = useState('')
  const [user, setUser] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [setting, setSetting] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [fstPenalty, setFstPenalty] = useState({})
  const [secPenalty, setSecPenalty] = useState({})
  const [thdPenalty, setThdPenalty] = useState({})
  const [fnlPenalty, setFnlPenalty] = useState({})

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleInputChange = (fieldName, value) => {
    setSetting(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }

  const handleFirstPenalty = (fieldName, value) => {
    setFstPenalty(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }
  const handleSecPenalty = (fieldName, value) => {
    setSecPenalty(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }
  const handleThirdPenalty = (fieldName, value) => {
    setThdPenalty(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }
  const handleFinalPenalty = (fieldName, value) => {
    setFnlPenalty(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }))
  }

  const updatePenalty = async () => {
    let payload = {}
    payload.id = '651a47a7e259234bf081204c' //setting main id to update
    if (fstPenalty) payload.fstpenalty = fstPenalty
    if (secPenalty) payload.secpenalty = secPenalty
    if (thdPenalty) payload.thdpenalty = thdPenalty
    if (fnlPenalty) payload.fnlpenalty = fnlPenalty
    await apiInstance.put('setting', payload).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `This is the updated penalty: ${res.data}`,
        confirmButtonText: 'OK'
      })
    })
  }

  const resetPassword = async () => {
    console.log('reseting password')
    let payload = {}
    payload.id = '651a47a7e259234bf081204c' //setting main id to update
    if (email) payload.email = email
    if (password) payload.password = password
    await apiInstance.put('users/reset', payload).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `This is the updated password: ${res.data.newPassword}`,
        confirmButtonText: 'OK'
      })
    })
  }

  const updateSetting = async () => {
    let payload = setting
    payload.id = '651a47a7e259234bf081204c' //setting main id to update
    await apiInstance
      .put('setting', payload) //main setting id
      .then(() => {
        alert('successful')
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  const handleSettings = async () => {
    getSetting()
    onOpen()
  }

  const getSetting = async () => {
    await apiInstance
      .get('setting/' + '651a47a7e259234bf081204c') //main setting id
      .then(res => {
        setSetting(res.data.data[0])
        setFnlPenalty(res.data.data[0].fnlpenalty)
        setFstPenalty(res.data.data[0].fstpenalty)
        setSecPenalty(res.data.data[0].secpenalty)
        setThdPenalty(res.data.data[0].thdpenalty)
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  const logOut = async () => {
    await apiInstance.get('auth/logout').then(res => {
      if (res.data.auth !== false) {
        alert('Logout Unsuccessful!')
      }
      window.location.reload()
      localStorage.removeItem('token')
    })
  }
  const location = useLocation()

  useEffect(() => {
    const userID = localStorage.getItem('id')
    const getUser = async () => {
      console.log(userID)
      await apiInstance.get('user/' + userID).then(res => {
        setUser(res.data.data)
        setEmail(res.data.data.email)
        console.log(res.data.data)
        if (res.data.data.profile[0].imgUrl) {
          setImgUrl(res.data.data.profile[0].imgUrl)
        }
      })
    }
    if (userID !== undefined) getUser()
  }, [])
  // const NavCheck = location.pathname === '/'
  return (
    <>
      {location.pathname !== '/' && (
        <Navbar
          maxWidth='full'
          isBordered
          isBlurred={false}
          className='py-4 sticky-top'
        >
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
                <p className='text-md m-auto'>K-WIN HRM</p>
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
                <DropdownItem
                  key='system'
                  color='primary'
                  onClick={handleSettings}
                >
                  System Settings
                </DropdownItem>
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
            size='xl'
          >
            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    Settings
                  </ModalHeader>
                  <ModalBody>
                    <Card
                      className='border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]'
                      shadow='none'
                      isBlurred
                    >
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
                              onChange={e =>
                                handleInputChange(
                                  'referenceLat',
                                  e.target.value
                                )
                              }
                              onWheel={e => e.preventDefault()} // Disable scrolling
                            />
                            <Input
                              type='number'
                              label='Longitude'
                              placeholder='Longitude'
                              labelPlacement='outside'
                              value={setting?.referenceLon}
                              onChange={e =>
                                handleInputChange(
                                  'referenceLon',
                                  e.target.value
                                )
                              }
                              onWheel={e => e.preventDefault()} // Disable scrolling
                            />
                          </div>
                          <Input
                            type='text'
                            label='Address'
                            placeholder='Address'
                            labelPlacement='outside'
                            value={setting?.refAddress}
                            onChange={e =>
                              handleInputChange('refAddress', e.target.value)
                            }
                          />
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color='danger'
                          variant='light'
                          onPress={onClose}
                        >
                          No, Cancel
                        </Button>
                        <Button color='primary' onClick={updateSetting}>
                          Yes, Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card
                      className='border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]'
                      shadow='none'
                      isBlurred
                    >
                      <CardHeader>
                        <div className='font-semibold'>Time Penalty</div>
                      </CardHeader>
                      <CardBody>
                        <div className='flex flex-col gap-2'>
                          <label className='font-semibold text-medium'>
                            First Penalty
                          </label>
                          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                              type='text'
                              placeholder='Time'
                              value={fstPenalty.pTime}
                              onChange={e =>
                                handleFirstPenalty('pTime', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Percent'
                              value={fstPenalty.pPercent}
                              onChange={e =>
                                handleFirstPenalty('pPercent', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Amount'
                              value={fstPenalty.pAmount} // Disable scrolling
                              onChange={e =>
                                handleFirstPenalty('pAmount', e.target.value)
                              }
                            />
                          </div>

                          <label className='font-semibold text-medium'>
                            Second Penalty
                          </label>
                          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                              type='text'
                              placeholder='Time'
                              value={secPenalty.pTime}
                              onChange={e =>
                                handleSecPenalty('pTime', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Percent'
                              value={secPenalty.pPercent}
                              onChange={e =>
                                handleSecPenalty('pPercent', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Amount'
                              value={secPenalty.pAmount} // Disable scrolling
                              onChange={e =>
                                handleSecPenalty('pAmount', e.target.value)
                              }
                            />
                          </div>

                          <label className='font-semibold text-medium'>
                            Third Penalty
                          </label>
                          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                              type='text'
                              placeholder='Time'
                              value={thdPenalty.pTime}
                              onChange={e =>
                                handleThirdPenalty('pTime', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Percent'
                              value={thdPenalty?.pPercent}
                              onChange={e =>
                                handleThirdPenalty('pPercent', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Amount'
                              value={thdPenalty.pAmount} // Disable scrolling
                              onChange={e =>
                                handleThirdPenalty('pAmount', e.target.value)
                              }
                            />
                          </div>

                          <label className='font-semibold text-medium'>
                            Final Penalty
                          </label>
                          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                              placeholder='Time'
                              value={fnlPenalty.pTime || ''} // Use the state value
                              onChange={e =>
                                handleFinalPenalty('pTime', e.target.value)
                              }
                            />
                            <Input
                              type='number'
                              placeholder='Percent'
                              value={fnlPenalty.pPercent}
                              onChange={e =>
                                handleFinalPenalty('pPercent', e.target.value)
                              } // Disable scrolling
                            />
                            <Input
                              type='number'
                              placeholder='Amount'
                              value={fnlPenalty.pAmount} // Disable scrolling
                              onChange={e =>
                                handleFinalPenalty('pAmount', e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {console.log(fnlPenalty)}
                      </CardBody>
                      <CardFooter>
                        <Button
                          color='danger'
                          variant='light'
                          onPress={onClose}
                        >
                          No, Cancel
                        </Button>
                        <Button color='primary' onClick={updatePenalty}>
                          Yes, Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card
                      className='border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]'
                      shadow='none'
                      isBlurred
                    >
                      <CardHeader>
                        <div className='font-semibold'>Account Update</div>
                      </CardHeader>
                      <CardBody>
                        <div className='flex flex-col gap-2'>
                          <Input
                            label='Email'
                            placeholder='Email'
                            labelPlacement='outside'
                            value={user ? user.email : 'Not Set'}
                            variant='bordered'
                            onChange={e => setEmail(e.target.value)}
                          />
                          <Input
                            label='Password'
                            variant='bordered'
                            placeholder='Enter your password'
                            labelPlacement='outside'
                            endContent={
                              <button
                                className='focus:outline-none'
                                type='button'
                                onClick={toggleVisibility}
                              >
                                {isVisible ? (
                                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                ) : (
                                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                )}
                              </button>
                            }
                            type={isVisible ? 'text' : 'password'}
                            className='w-full'
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div className='flex'>
                          <Button
                            color='danger'
                            variant='light'
                            onPress={onClose}
                          >
                            No, Cancel
                          </Button>
                          <Button color='primary' onClick={resetPassword}>
                            Yes, Update Password
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Navbar>
      )}
    </>
  )
}
