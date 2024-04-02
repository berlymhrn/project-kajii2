import React, { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import CustomButton from "@/Components/CustomButton";
import { usePage } from "@inertiajs/react";

function BookingForm2() {
     const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [errors, setErrors] = useState({});

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

        if (!bookingType.trim()) {
            errors.bookingType = "Jenis Booking harus diisi";
        }

        if (!checkIn) {
            errors.checkIn = "Tanggal Check In harus diisi";
        } else {
            const selectedDate = new Date(checkIn);
            const today = new Date();

            if (selectedDate <= today) {
                errors.checkIn = "Tanggal Check In harus setelah hari ini";
            }
        }
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleButton = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const bookingData = { name, telephone, email, bookingType, checkIn };
            window.location.href = "/booking/paymentMethod";
        }
    };

    return (
        <div className="mx-12 md:mx-20">
            <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                FORM PEMESANAN
            </h1>
            <div className="mb-12 md:mb-20">
                <form>
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
                                inputType={"text"}
                                onChange={(e) =>
                                    setBookingType(e.target.value)
                                }
                            />
                            {errors.bookingType && (
                                <div className="text-red-500">
                                    {errors.bookingType}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                labelFor={"checkIn"}
                                labelText={
                                    <span>
                                        Check In
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"checkIn"}
                                inputType={"date"}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                            {errors.checkIn && (
                                <div className="text-red-500">
                                    {errors.checkIn}
                                </div>
                            )}
                        </div>
                    </div>
                    <h4 className="text-h5 md:text-2xl font-bold mb-3">
                        Harga
                    </h4>
                    <h3 className="text-h5 md:text-2xl font-semibold">Rp </h3>
                </form>
            </div>

            <div className="mb-20">
                <CustomButton
                    text={"Selanjutnya"}
                    bgColor={"bg-primaryColor"}
                    font={"text-white font-bold"}
                    onClick={handleButton}
                />
            </div>
        </div>
    );
}

export default BookingForm2;
