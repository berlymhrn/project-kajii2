import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import CustomButton from "@/Components/CustomButton";
import { usePage } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import ModalAlert from "@/Components/ModalAlert ";

function BookingForm2() {
    const { props } = usePage();
    const { entityType, id } = props;

    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [judul, setJudul] = useState("");
    const [id_jenis, setId_jenis] = useState("");
    const [price, setPrice] = useState("");
    const [check_in, setCheck_in] = useState("");
    const [errors, setErrors] = useState({});
    const [id_user, setId_user] = useState("");

    const radios = [
        {
            name: "Pembayaran Depan Muka",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 20 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-cash"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                    <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
            ),
        },
        {
            name: "Mandiri",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                />
            ),
        },
        {
            name: "BCA",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                />
            ),
        },
        {
            name: "BNI",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                />
            ),
        },
        {
            name: "BRI",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png"
                />
            ),
        },
        {
            name: "QRIS",
            icon: (
                <img
                    alt="logo bank"
                    src="https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png"
                />
            ),
        },
    ];

    //get user data from cookie
    const getCookieToken = () => {
        const specificCookie = document.cookie
            .split(";")
            .find((row) => row.trim().startsWith("token="));
        if (specificCookie) {
            const regex = new RegExp("token=", "g");
            const token = specificCookie.replace(regex, "").trim();
            return token;
        }
        return null;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookieToken();
                if (!token) {
                    console.error("Token not found in cookies.");
                    return;
                }

                const response = await DesaKajii.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setName(response.data.nama);
                setEmail(response.data.email);
                setTelephone(response.data.no_telp);
                setId_user(response.data.id_user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    //fetch judul & harga based on url
    useEffect(() => {
        if (!entityType || !id) return;
        const fetchData = async () => {
            try {
                let response;
                if (entityType === "kegiatan") {
                    response = await DesaKajii.get(`/kegiatan/${id}`);
                } else if (entityType === "paket-wisata") {
                    response = await DesaKajii.get(`/paket-wisata/${id}`);
                } else if (entityType === "hiburan") {
                    response = await DesaKajii.get(`/hiburan/${id}`);
                } else if (entityType === "homestay") {
                    response = await DesaKajii.get(`/homestay/${id}`);
                }
                // Set id_jenis
                const resp = await DesaKajii.get("/transaksi/jenis-booking");
                const jenisBooking = resp.data.jenis.find(
                    (jenis) => jenis.nama === response.data.judul
                );
                setId_jenis(jenisBooking.id_jenis);
                setJudul(response.data.judul);
                setPrice(response.data.harga);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [entityType, id]);

    //validasi form
    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Nama Lengkap harus diisi";
        }

        if (!telephone.trim()) {
            errors.telephone = "Nomor Kontak harus diisi";
        }

        if (!email.trim()) {
            errors.email = "Email harus diisi";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Format Email tidak valid";
        }

        if (!judul.trim()) {
            errors.judul = "Jenis Booking harus diisi";
        }

        if (!check_in) {
            errors.check_in = "Tanggal Check In harus diisi";
        } else {
            const selectedDate = new Date(check_in);
            const today = new Date();

            if (selectedDate <= today) {
                errors.check_in = "Tanggal Check In harus setelah hari ini";
            }
        }
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    //modal form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    //button pesan
    const handleButton = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            openModal();
        }
    };

    //post data transaksi
    const handleConfirm = async () => {
        try {
            const response = await DesaKajii.post("/transaksi/post", {
                id_user,
                id_jenis,
                check_in,
            });
            console.log("Response:", response.data);
            window.location.href = "/account/history";
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="mx-12 md:mx-20">
            <Head>
                <title>Pemesanan</title>
            </Head>
            <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                FORM PEMESANAN
            </h1>
            <div className="mb-12 md:mb-16">
                <form className="mb-12 md:mb-16">
                    <h4 className="text-h5 md:text-2xl font-bold mb-3">
                        Detail Kontak
                    </h4>
                    <div className="mb-16">
                        <div className="mb-5">
                            <InputLabel
                                labelFor={"nama"}
                                labelText={
                                    <span>
                                        Nama Lengkap
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"nama"}
                                inputType={"text"}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <InputLabel
                                    labelFor={"contact"}
                                    labelText={
                                        <span>
                                            No Telepon
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                />
                                <TextInput
                                    inputId={"contact"}
                                    inputType={"text"}
                                    onChange={(e) =>
                                        setTelephone(e.target.value)
                                    }
                                    value={telephone}
                                />
                                {errors.telephone && (
                                    <div className="text-red-500">
                                        {errors.telephone}
                                    </div>
                                )}
                            </div>

                            <div>
                                <InputLabel
                                    labelFor={"email"}
                                    labelText={
                                        <span>
                                            Email
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                />
                                <TextInput
                                    inputId={"email"}
                                    inputType={"email"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                {errors.email && (
                                    <div className="text-red-500">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <h4 className="text-h5 md:text-2xl font-bold mb-3">
                        Detail Pemesanan
                    </h4>
                    <div className="grid grid-cols-2 gap-5 mb-16">
                        <div>
                            <InputLabel
                                labelFor={"booking"}
                                labelText={
                                    <span>
                                        Jenis Booking
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"booking"}
                                value={judul}
                                // inputType={"text"}
                                // onChange={(e) => setJudul(e.target.value)}
                                disabled
                            />
                            {errors.judul && (
                                <div className="text-red-500">
                                    {errors.judul}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                labelFor={"check_in"}
                                labelText={
                                    <span>
                                        Check In
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"check_in"}
                                inputType={"date"}
                                onChange={(e) => setCheck_in(e.target.value)}
                            />
                            {errors.check_in && (
                                <div className="text-red-500">
                                    {errors.check_in}
                                </div>
                            )}
                        </div>
                    </div>
                    <h4 className="text-h5 md:text-2xl font-bold mb-3">
                        Harga
                    </h4>
                    <h3 className="text-h5 md:text-2xl font-semibold">
                        Rp {price}
                    </h3>
                </form>
                <h4 className="text-h5 md:text-2xl font-bold mb-3">
                    Pilih Metode Pembayaran
                </h4>
                <ul className="space-y-3 w-1/2">
                    {radios.map((item, idx) => (
                        <li key={idx}>
                            <label
                                htmlFor={item.name}
                                className="block relative"
                            >
                                <input
                                    id={item.name}
                                    type="radio"
                                    defaultChecked={idx === 1}
                                    name="payment"
                                    className="sr-only peer"
                                />
                                <div className="w-full flex gap-x-3 items-start p-8 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                                    <div className="flex-none w-20 h-6">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="leading-none text-gray-800 text-p18 md:text-h5 font-semibold ml-8">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="absolute top-8 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200"></div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-20">
                <CustomButton
                    text={"PESAN SEKARANG"}
                    bgColor={"bg-primaryColor"}
                    font={"text-white font-bold"}
                    onClick={handleButton}
                />
                {isModalOpen && (
                    <ModalAlert
                        alertMessage={
                            "Apakah Anda sudah yakin? Mohon periksa kembali detail pesanan Anda sebelum melanjutkan"
                        }
                        action1={"Ya, Sudah yakin"}
                        handleConfirm={handleConfirm}
                        action2={"Kembali"}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </div>
    );
}

export default BookingForm2;
