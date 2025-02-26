import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Spin Zone', href: '/wheel', current: false },
  { name: 'Champion\'s Corner', href: '/leaderboard', current: false },
  { name: 'My Rewards Hub', href: '/dashboard', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <Disclosure as="nav" className="nav-gradient">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-18 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-opacity-25 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 space-x-4 items-center">
                  
                <img
                    className="h-16 w-auto "
                   src="data:image/png;base64,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" 
                    alt="Your Company"
                  />
                  <b className=' w-auto'>|</b>
                  <img
                    className="h-12 w-auto"
                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaqVGwXfboLlsa3uQAI8Yim-rx9MrsRYED-w&s" 
                    alt="Your Company"
                  />
                 
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-opacity-25 text-white' : 'text-gray-300 hover:bg-opacity-25 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-opacity-25 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              My Rewards Hub
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-opacity-25 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-opacity-25 text-white' : 'text-gray-300 hover:bg-opacity-25 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}