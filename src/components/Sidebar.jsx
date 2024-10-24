import {  useState } from 'react'
import { MdDashboardCustomize } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineBars } from 'react-icons/ai'
import { FaUserCog } from 'react-icons/fa'
const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <>

            <div className='bg-[#5D0911] text-white flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            {/* <img
                                src={logo}
                                alt='logo'
                                width='200'
                            /> */}
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none '
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>


            <div
                className={`z-10 md:fixed flex flex-col justify-between  overflow-x-hidden bg-[#5D0911] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto'>
                            <Link to='/'>
                                {/* <img
                                    
                                    src={logo}
                                    alt='logo'
                                    width='280'
                                /> */}
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col  justify-between flex-1 mt-6'>
                        <nav>
                            <ul className="">
                                <li><NavLink
                                    to='/'
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                                        }`
                                    }>
                                    <MdDashboardCustomize className='w-5 h-5 ' />
                                    <span className='mx-3 font-medium'>Dashboard</span>

                                </NavLink></li>

                                <li>
                                   
                                        <NavLink
                                            to='/set-smtp'
                                            end
                                            className={({ isActive }) =>
                                                `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                                                }`
                                            }>
                                            <MdDashboardCustomize className='w-5 h-5 ' />
                                            <span className='mx-3 font-medium'>SMTP Management</span>

                                        </NavLink>
                                
                                </li>

                                <li>
                                    
                                        <NavLink to='/add-student'
                                            className={({ isActive }) =>
                                                `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                                                }`
                                            }>
                                            <VscGitPullRequestGoToChanges className='w-5  h-5' />
                                            <span className='mx-3 font-medium'>User Management</span>

                                        </NavLink>
                            
                                </li>
                                <li>
                                    
                                        <NavLink to='/campaign'
                                            className={({ isActive }) =>
                                                `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                                                }`
                                            }>
                                            <VscGitPullRequestGoToChanges className='w-5  h-5' />
                                            <span className='mx-3 font-medium'>Campaign</span>

                                        </NavLink>
                            
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                   
                </div>
            </div>
        </>
    )
}

export default Sidebar