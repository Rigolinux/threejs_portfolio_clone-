import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to='/' className="w-20 h-10 rounded-lg bg-white
            flex font-bold items-center justify-center shadow-md" 
            >
            <p className='blue-gradient_text'>
                Rigoberto
            </p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to='/' className={
                    ({ isActive }) => (isActive ? 'text-blue-500' : 'text-black-500')
                }>
                Home
            </NavLink>
            <NavLink to='/about' className={
                ({ isActive }) => (isActive ? 'text-blue-500' : 'text-black-500')
            }>
                About
            </NavLink>
            <NavLink to='/projects' className={
                ({ isActive }) => (isActive ? 'text-blue-500' : 'text-black-500')
            }>
                Projects
            </NavLink>
            <NavLink to='/contact' className={
                ({ isActive }) => (isActive ? 'text-blue-500' : 'text-black-500')
            }>
                Contact
            </NavLink>
        </nav>
    </header>
  )
}

export default Navbar