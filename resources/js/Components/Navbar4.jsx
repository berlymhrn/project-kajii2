import React, { useState } from "react";
import { IconBellFilled, IconUserCircle, IconWorld } from "@tabler/icons-react";
import logo from "../../../public/assets/logo.png";
import { Link } from "@inertiajs/react";

const Dropdown = ({ isOpen, toggle, children, className }) => (
    <div
        className={`${
            isOpen ? "block" : "hidden"
        } z-[900] font-normal bg-white divide-y absolute top-24 divide-gray-100 rounded-lg shadow ${className}`}
    >
        <ul className="py-2 text-sm text-gray-700">{children}</ul>
    </div>
);

const DropdownItem = ({ children, onClick }) => (
    <li>
        <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={onClick}
        >
            {children}
        </a>
    </li>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };

    return (
        <nav className="bg-primaryColor border-gray-200 p-5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <a
                        href="#"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img src={logo} className="mr-3 h-20 md:h-28" alt="" />
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-t-0 rounded-t-none border-red-100 rounded-lg bg-primaryColor md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-primaryColor">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-black dark:bg-primaryColor text-white "
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/ikan-hias"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-black dark:bg-primaryColor text-white "
                                aria-current="page"
                            >
                                Ikan Hias
                            </Link>
                        </li>
                        <li className="relative ">
                            <button
                                onClick={() => toggleDropdown("dropdown2")}
                                className="flex items-center justify-between w-full py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:w-auto"
                            >
                                Layanan
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <Dropdown
                                isOpen={openDropdown === "dropdown2"}
                                toggle={() => toggleDropdown("dropdown2")}
                                className="absolute top-full right-0 left-0 sm:static sm:left-auto sm:right-auto border border-gray-600 rounded-md  "
                            >
                                <Link href="/kegiatan">
                                    <DropdownItem>Kegiatan</DropdownItem>
                                </Link>
                                <Link href="/homestay">
                                    <DropdownItem>Homestay</DropdownItem>
                                </Link>
                                <Link href="/paket-wisata">
                                    <DropdownItem>Paket Wisata</DropdownItem>
                                </Link>
                            </Dropdown>
                        </li>

                        <li className="relative ">
                            <button
                                onClick={() => toggleDropdown("dropdown3")}
                                className="flex items-center justify-between w-full py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:w-auto"
                            >
                                Informasi
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <Dropdown
                                isOpen={openDropdown === "dropdown3"}
                                toggle={() => toggleDropdown("dropdown3")}
                                className="absolute top-full right-0 left-0 sm:static sm:left-auto sm:right-auto border border-gray-600 rounded-md  "
                            >
                                <Link href="/artikel">
                                    <DropdownItem>
                                        Berita & Artikel
                                    </DropdownItem>
                                </Link>
                                <Link href="/about">
                                    <DropdownItem>Tentang Kami</DropdownItem>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>
                </div>

                {/* Toggle */}
                <div className="flex gap-x-4">
                    <div className="flex items-center justify-end md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-expanded={isMenuOpen ? "true" : "false"}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            id="dropdownUserAvatarButton"
                            data-dropdown-toggle="dropdownAvatar"
                            className="flex text-sm rounded-full"
                            type="button"
                            onClick={toggleAccountDropdown}
                        >
                            <IconUserCircle size={40} className="text-white" />
                            <span className="sr-only">Open user menu</span>
                        </button>

                        <Dropdown
                            isOpen={isAccountDropdownOpen}
                            toggle={toggleAccountDropdown}
                            className="right-10 md:right-48 top-24"
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>zaza</div>
                                <div className="font-medium truncate">
                                    zaza123@gmail.com
                                </div>
                            </div>
                            <Link href="#">
                                <DropdownItem>Update Data Personal</DropdownItem>
                            </Link>
                            <Link href="/account/history">
                                <DropdownItem>Riwayat Transaksi</DropdownItem>
                            </Link>
                            <Link href="#">
                                <DropdownItem>Log out</DropdownItem>
                            </Link>
                        </Dropdown>
                    </div>
                </div>

                {/* Mobile Responsive */}

                <div
                    className={`${
                        isMenuOpen ? "block" : "hidden"
                    } md:hidden w-full absolute left-0 right-0 top-24 z-50 border border-gray-300 rounded-md`}
                >
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-t-0 rounded-t-none border-red-100 rounded-lg bg-primaryColor md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-600">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-black dark:bg-primaryColor text-white "
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/ikan-hias"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-black dark:bg-primaryColor text-white"
                                aria-current="page"
                            >
                                Ikan Hias
                            </Link>
                        </li>

                        <li className="relative ">
                            <button
                                onClick={() => toggleDropdown("dropdown2")}
                                className="flex items-center justify-between w-full py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:w-auto"
                            >
                                Layanan
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <Dropdown
                                isOpen={openDropdown === "dropdown2"}
                                toggle={() => toggleDropdown("dropdown2")}
                                className="absolute top-full right-0 left-0 sm:static sm:left-auto sm:right-auto border border-gray-600 rounded-md  "
                            >
                                <Link href="/kegiatan">
                                    <DropdownItem>Kegiatan</DropdownItem>
                                </Link>
                                <Link href="/homestay">
                                    <DropdownItem>Homestay</DropdownItem>
                                </Link>
                                <Link href="/paket-wisata">
                                    <DropdownItem>Paket Wisata</DropdownItem>
                                </Link>
                            </Dropdown>
                        </li>

                        <li className="relative ">
                            <button
                                onClick={() => toggleDropdown("dropdown3")}
                                className="flex items-center justify-between w-full py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:w-auto"
                            >
                                Informasi
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <Dropdown
                                isOpen={openDropdown === "dropdown3"}
                                toggle={() => toggleDropdown("dropdown3")}
                                className="absolute top-full right-0 left-0 sm:static sm:left-auto sm:right-auto border border-gray-600 rounded-md  "
                            >
                                <Link href="/artikel">
                                    <DropdownItem>
                                        Berita & Artikel
                                    </DropdownItem>
                                </Link>
                                <Link href="/about">
                                    <DropdownItem>Tentang Kami</DropdownItem>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
