import { PenLine } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 dark:text-white">

        <a href="/" className="text-xl font-bold">Thoughts</a>

        <div className="space-x-4 ">
            <a href="/create" className="hover:underline"><PenLine className='inline align-middle mr-1 h-4 w-4'/> Write Blog</a>
            <a href="/" className="hover:underline">Home</a>
            <a href="/profile" className="hover:underline">Profile</a>
            <a href="/signup" className="hover:underline">SignUp</a>
        </div>
        
    </nav>
  )
}

export default Navbar