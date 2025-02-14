import React, { useState, useEffect } from "react";
import { IconBellFilled, IconUserCircle, IconWorld } from "@tabler/icons-react";
import logo from "../../../public/assets/logo.png";
import { Link } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";

const handleLogout = async () => {
    try {
        const token = getCookie("token");
        await DesaKajii.get("/user/logout", {
            params: { token },
        });
        document.cookie = "token=; Max-Age=0; path=/;";
        setIsLoggedIn(false);
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed", error);
    }
};

// Fungsi untuk mendapatkan nilai cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

const Dropdown = ({ isOpen, toggle, children, className }) => (
    <div
        className={`${
            isOpen ? "fixed" : "hidden"
        } z-[900] font-normal bg-white divide-y absolute top-24 divide-gray-100 rounded-lg shadow ${className}`}
    >
        <ul className="py-2 text-sm text-gray-700">{children}</ul>
    </div>
);

const DropdownItem = ({ children, onClick }) => (
    <li>
        <div className="block px-4 py-2 hover:bg-gray-100" onClick={onClick}>
            <span
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={onClick}
            >
                {children}
            </span>
        </div>
    </li>
);

const Navbar = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("token"));
    const [openDdown, setOpenDdown] = useState(false);
    const [openDdown2, setOpenDdown2] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };

    const toggleDdownEnter = () => {
        setOpenDdown(true);
        setOpenDdown2(false);
    };

    const toggleDdownLeave = () => {
        setOpenDdown(false);
    };

    const toggleDdown2Enter = () => {
        setOpenDdown2(true);
        setOpenDdown(false);
    };
    const toggleDdown2Leave = () => {
        setOpenDdown2(false);
    };

    const checkLoggedIn = async () => {
        const specificCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));
        var token = "";
        if (specificCookie) {
            const regex = new RegExp("token=", "g");
            token = specificCookie.replace(regex, "").trim();
        }

        const response = await DesaKajii.get("/user/check", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.info == "Token valid") {
            setIsLoggedIn(true);
        }
    };
    const getEmailAndUsername = async () => {
        const specificCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));
        var token = "";
        if (specificCookie) {
            const regex = new RegExp("token=", "g");
            token = specificCookie.replace(regex, "").trim();
        }

        const response = await DesaKajii.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
    };

    useEffect(() => {
        checkLoggedIn();
        getEmailAndUsername();
    }, []);

    return (
        <nav className="bg-primaryColor border-gray-200 px-5 md:h-300 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <a
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img src={logo} className="mr-3 h-20 md:h-28" alt="" />
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex flex-col font-medium p-2 md:p-4 mt-4 border border-t-0 rounded-t-none border-red-100 rounded-lg bg-primaryColor md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-primaryColor">
                        <li>
                            <a
                                href="/"
                                className="block py-2 px-3 focus:bg-white rounded-md focus:text-black bg-primaryColor text-white"
                                aria-current="page"
                                style={{ fontSize: "1.2rem" }}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/ikan-hias"
                                className="block py-2 px-3  focus:bg-white rounded-md focus:text-black bg-primaryColor text-white "
                                aria-current="page"
                                style={{ fontSize: "1.2rem" }}
                            >
                                Ikan Hias
                            </Link>
                        </li>
                        <li className="relative">
                            <button
                                className="flex w-full px-4 py-2 font-medium text-white rounded-md outline-none focus:outline-none "
                                style={{ fontSize: "1.2rem" }}
                                onMouseEnter={toggleDdownEnter}
                                onClick={toggleDdownEnter}
                            >
                                Layanan
                                <div className="mt-2">
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
                                </div>
                            </button>
                            {openDdown && (
                                <div
                                    className="right-0 px-1 py-1 mt-1 bg-white rounded-md shadow lg:absolute z-10"
                                    onMouseEnter={toggleDdownEnter}
                                    onMouseLeave={toggleDdownLeave}
                                >
                                    <ul className="space-y-2 lg:w-48">
                                        <li>
                                            <div className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black">
                                                <a href="/kegiatan">Kegiatan</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black">
                                                <a href="/homestay">Homestay</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black">
                                                <a href="/paket-wisata">
                                                    Paket Wisata
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        <li className="relative">
                            <button
                                className="flex w-full px-4 py-2 font-medium text-white rounded-md outline-none focus:outline-none "
                                style={{ fontSize: "1.2rem" }}
                                onMouseEnter={toggleDdown2Enter}
                                onClick={toggleDdown2Enter}
                            >
                                Informasi
                                <div className="mt-2">
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
                                </div>
                            </button>
                            {openDdown2 && (
                                <div
                                    className="right-0 px-2 py-1 mt-1 bg-white rounded-md shadow lg:absolute z-10"
                                    onMouseEnter={toggleDdown2Enter}
                                    onMouseLeave={toggleDdown2Leave}
                                >
                                    <ul className="space-y-2 lg:w-48">
                                        <li>
                                            <div className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black">
                                                <a href="/artikel">
                                                    Artikel & Berita
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black">
                                                <a href="/about">
                                                    Tentang Kami
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
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
                            {isLoggedIn && (
                                <>
                                    <div className="px-4 py-3 text-sm text-gray-900">
                                        <div>{username}</div>
                                        <div className="font-medium truncate">
                                            {email}
                                        </div>
                                    </div>
                                    <Link href="/account/update">
                                        <DropdownItem>
                                            Update Data Personal
                                        </DropdownItem>
                                    </Link>
                                    <Link href="/account/history">
                                        <DropdownItem>
                                            Riwayat Transaksi
                                        </DropdownItem>
                                    </Link>
                                    <Link href="#">
                                        <DropdownItem onClick={handleLogout}>
                                            Log out
                                        </DropdownItem>
                                    </Link>
                                </>
                            )}
                            {!isLoggedIn && (
                                <>
                                    <Link href="/register">
                                        <DropdownItem>Regristasi</DropdownItem>
                                    </Link>
                                    <Link href="/login">
                                        <DropdownItem>Login</DropdownItem>
                                    </Link>
                                </>
                            )}
                        </Dropdown>
                    </div>
                </div>

                {/* Mobile Responsive */}

                <div
                    className={`${
                        isMenuOpen ? "block" : "hidden"
                    } md:hidden w-full absolute left-0 right-0 top-24 z-50 borderrounded-md p-2 md:p-4`}
                >
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-red-100 rounded-lg bg-primaryColor md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-600">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-blackbg-primaryColor"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/ikan-hias"
                                className="block py-2 px-3 text-white focus:bg-white rounded-md focus:text-blackbg-primaryColor"
                                aria-current="page"
                            >
                                Ikan Hias
                            </Link>
                        </li>

                        <li className="relative">
                            <button
                                className="flex w-full px-4 py-2 font-medium text-white rounded-md outline-none focus:outline-none "
                                style={{ fontSize: "1.2rem" }}
                                onMouseEnter={toggleDdownEnter}
                                onClick={toggleDdownEnter}
                            >
                                Layanan
                                <div className="mt-2">
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
                                </div>
                            </button>
                            {openDdown && (
                                <div
                                    className="right-0 px-1 py-1 mt-1 bg-white rounded-md shadow lg:absolute z-10"
                                    onMouseEnter={toggleDdownEnter}
                                    onMouseLeave={toggleDdownLeave}
                                >
                                    <ul className="space-y-2 lg:w-48">
                                        <li>
                                            <a
                                                href="/kegiatan"
                                                className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                            >
                                                Kegiatan
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/homestay"
                                                className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                            >
                                                Homestay
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/paket-wisata"
                                                className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                            >
                                                Paket Wisata
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="relative">
                            <button
                                className="flex w-full px-4 py-2 font-medium text-white rounded-md outline-none focus:outline-none "
                                style={{ fontSize: "1.2rem" }}
                                onMouseEnter={toggleDdown2Enter}
                                onClick={toggleDdown2Enter}
                            >
                                Informasi
                                <div className="mt-2">
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
                                </div>
                            </button>
                            {openDdown2 && (
                                <div
                                    className="right-0 px-2 py-1 mt-1 bg-white rounded-md shadow lg:absolute z-10"
                                    onMouseEnter={toggleDdown2Enter}
                                    onMouseLeave={toggleDdown2Leave}
                                >
                                    <ul className="space-y-2 lg:w-48">
                                        <li>
                                            <a
                                                href="/artikel"
                                                className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                            >
                                                Berita & Artikel
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/about"
                                                className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                            >
                                                Tentang Kami
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
