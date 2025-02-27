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
              <div className="flex flex-2 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 space-x-4 items-center">
                  
                <img
                    className="h-16 w-auto  p-2 "
                   src="data:image/png;base64,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"
                    alt="Genpact"
                  />
                  <b className='h-auto w-auto'>|</b>
                  <img
                    className="h-16 w-auto rounded p-2"
                   src="data:image/png;base64,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" 
                    alt="GoDaddy"
                  />
                 
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-5">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-opacity-25 text-white' : 'text-gray-300 hover:bg-opacity-25 hover:text-white',
                          'rounded-md px-3 py-6 text-lg font-medium'
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
                          className="h-14 w-14 rounded-full border-2"
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