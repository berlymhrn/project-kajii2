import React from "react";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import CustomButton from "@/Components/CustomButton";

function BookingForm2() {
    // const [name, setName] = useState(""); //stete untuk menyimpan input yg dimasukkan user di di textInput nama
    // const [telephone, setTelephone] = useState("");
    // const [email, setEmail] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [errors, setErrors] = useState({});

    return (
        <div className="mx-12 md:mx-20">
            <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                FORM PEMESANAN
            </h1>
            <div className="mb-12 md:mb-20">
                <form>
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
                    linkTo={"/booking/paymentMethod"}
                    // onClick={handleButton}
                />
            </div>
        </div>
    );
}

export default BookingForm2;
