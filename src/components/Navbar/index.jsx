import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarBrand
} from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { SearchIcon } from './search'
// import { Link } from 'react-router-dom'
import ThemeSwitch from '../ThemeSwitch/index'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiInstance from '../../util/api'
import Hr from '../../assets/hr1.png'

export default function NavBar () {
  const [imgUrl, setImgUrl] = useState('')
  const [user, setUser] = useState(null)

  const logOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const location = useLocation()

  useEffect(() => {
    const userID = localStorage.getItem('id')
    const getUser = async () => {
      await apiInstance.get('user/' + userID).then(res => {
        if (res.data.data.profile[0].imgUrl) {
          setImgUrl(res.data.data.profile[0].imgUrl)
        }
        setUser(res.data.data)
      })
    }
    getUser()
  }, [])
  // const NavCheck = location.pathname === '/'
  return (
    <>
      {location.pathname !== '/' && (
        <Navbar maxWidth='full' isBordered isBlurred={false}>
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
                <DropdownItem key='settings'>My Settings</DropdownItem>
                <DropdownItem key='team_settings'>Team Settings</DropdownItem>
                <DropdownItem key='analytics'>Analytics</DropdownItem>
                <DropdownItem key='system'>System</DropdownItem>
                <DropdownItem key='configurations'>Configurations</DropdownItem>
                <DropdownItem key='help_and_feedback'>
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key='logout' color='danger' onClick={logOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <ThemeSwitch />
        </Navbar>
      )}
    </>
  )
}
