import React from "react";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import CustomButton from "@/Components/CustomButton";
import AxiosInstance from "@/services/AxiosInstance";

function BookingForm() {
    const [name, setName] = useState("");                   //stete untuk menyimpan input yg dimasukkan user di di textInput nama
    const [bithdate, setBithdate] = useState("");           //stete untuk menyimpan input yg dimasukkan user di di textInput tanggal lahir
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [errors, setErrors] = useState({});               //state untuk menyimpan error jika terjadi kesalahan input

    const validateForm = () => {                            //function untuk validasi form
        const errors = {};

        if (!name.trim()) {                                 // fungsi menggunakan method trim untuk menghilangkan spasi di awal dan akhir
            errors.name = "Nama Lengkap harus diisi";       //mengisi state errors.name dengan pesan error
        }

        if (!bithdate) {
            errors.bithdate = "Tanggal Lahir harus diisi";  //mengisi state errors.bithdate dengan pesan error
        } else {
            const selectedDate = new Date(bithdate);
            const today = new Date();

            if (selectedDate.toDateString() === today.toDateString()) {
                errors.bithdate = "Tanggal Lahir tidak boleh hari ini";
            }
        }

        if (!address.trim()) {
            errors.address = "Alamat harus diisi";
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

    const handleButton = async (e) => {                     //function untuk submit form
        e.preventDefault();

        if (validateForm()) {                              //memanggil function validateForm
            try {
                const formData = {
                    name,                                  //harus sama dgn nama tabel di database
                    bithdate,                              //harus sama dgn nama tabel di database
                    address,
                    telephone,
                    email,
                    bookingType,
                    checkIn,
                };

                const response = await AxiosInstance.post("/booking", formData);
                console.log(response.data);
            } catch (error) {
                console.error("Error submitting booking:", error);
            }
        }
    };

    return (
        <div className="mx-12 md:mx-20">
            <h1 className="font-bold text-h3 md:text-h2 mt-20 flex justify-center mb-12 md:mb-16">
                PEMESANAN
            </h1>
            <div className="mb-12 md:mb-20">
                <form>
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
                            onChange={(e) => setName(e.target.value)}            //untuk menyimpan perubahan jika user melakukan input
                        />
                        {errors.name && (                                        //menampilkan error jika terjadi kesalahan input
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <InputLabel
                            labelFor={"birth"}
                            labelText={
                                <span>
                                    Tanggal Lahir
                                    <span className="text-red-500">*</span>
                                </span>
                            }
                        />
                        <TextInput
                            inputId={"birth"}
                            inputType={"date"}
                            onChange={(e) => setBithdate(e.target.value)}
                        />
                        {errors.bithdate && (
                            <div className="text-red-500">
                                {errors.bithdate}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <InputLabel
                            labelFor={"alamat"}
                            labelText={
                                <span>
                                    Alamat
                                    <span className="text-red-500">*</span>
                                </span>
                            }
                        />
                        <TextInput
                            inputId={"alamat"}
                            inputType={"text"}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && (
                            <div className="text-red-500">{errors.address}</div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <div>
                            <InputLabel
                                labelFor={"contact"}
                                labelText={
                                    <span>
                                        No Telepon
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"contact"}
                                inputType={"text"}
                                onChange={(e) => setTelephone(e.target.value)}
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
                                        <span className="text-red-500">*</span>
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

                    <div className="grid grid-cols-2 gap-5 mb-5">
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
                                onChange={(e) => setBookingType(e.target.value)}
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
                </form>
            </div>
            <div className="mb-20">
                <CustomButton
                    text={"Submit"}
                    bgColor={"bg-primaryColor"}
                    font={"text-white"}
                    onClick={handleButton}
                />
            </div>
        </div>
    );
}

export default BookingForm;
