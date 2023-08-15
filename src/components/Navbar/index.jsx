import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { SearchIcon } from "./search";
// import { Link } from 'react-router-dom'
import Theme from "../ThemeSwitch/index";
import { useLocation,useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate=useNavigate()
  const logOut=()=>{
navigate('/')
  }
  const location = useLocation();
  // const NavCheck = location.pathname === '/'
  return (
    <>
      {location.pathname !== "/" && (
        <Navbar className="justify-between">
          {/* <h3>Hello</h3> */}

          <div className="flex flex-row place-content-between">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex ml-4">
              <p className="text-md m-auto">HR Management</p>
            </div>
          </div>

          <NavbarContent as="div" className="items-center mt-2" justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[28rem] h-8",
                input: "text-small",
                inputWrapper:
                  "font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={20} />}
              type="search"
            />

            <Dropdown placement="bottom-end mt-1">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">kaungsethein91@gmail.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={logOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <Theme />
        </Navbar>
      )}
    </>
  );
}
