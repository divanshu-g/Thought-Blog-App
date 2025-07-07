import { PenLine } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 dark:text-white">

        <h1 className="text-xl font-bold">Thoughts</h1>

        <div className="space-x-4 ">
            <a href="/create" className="hover:underline"><PenLine className='inline '/> Write Blog</a>
            <a href="/" className="hover:underline">Home</a>
            <a href="/profile" className="hover:underline">Profile</a>
            <a href="/settings" className="hover:underline">Settings</a>
        </div>
        
    </nav>
  )
}

export default Navbar