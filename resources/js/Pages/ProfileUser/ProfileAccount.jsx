import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";

export default function ProfileAccount() {
    return (
        <div className="mx-12 md:mx-20 ">
            <h1 className="font-bold text-h2 md:text-h1 mt-20 flex justify-center mb-12 md:mb-16">
                Profile Akun
            </h1>
            {/* <div className="mb-20 md:mb-2">
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="m-2">
                        <InputLabel labelText={"Nama"} />
                        <TextInput />
                    </div>
                    <div className="m-2">
                        <InputLabel labelText={"Email"} />
                        <TextInput />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    <div className="m-2">
                        <InputLabel labelText={"Alamat"} />
                        <TextInput className={"w-full"} />
                    </div>
                    <div className="m-2">
                        <InputLabel labelText={"Telephone"} />
                        <TextInput />
                    </div>
                </div>
            </div> */}
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                    <InputLabel
                        labelFor={"contact"}
                        labelText={
                            <span>
                                Nama
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    />
                    <TextInput inputId={"contact"} inputType={"text"} />
                </div>

                <div>
                    <InputLabel
                        labelFor={"email"}
                        labelText={
                            <span>
                                Alamat
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    />
                    <TextInput inputId={"email"} inputType={"email"} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                    <InputLabel
                        labelFor={"contact"}
                        labelText={
                            <span>
                                Email
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    />
                    <TextInput inputId={"contact"} inputType={"text"} />
                </div>

                <div>
                    <InputLabel
                        labelFor={"email"}
                        labelText={
                            <span>
                                No Telepon
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    />
                    <TextInput inputId={"email"} inputType={"email"} />
                </div>
            </div>

            <div className="mt-6">
                <CustomButton
                    className="flex w-full items-center justify-center bg-primaryColor"
                    // disabled={processing}
                    text={"Ubah Data"}
                    bgColor={"bg-primaryColor"}
                />
            </div>
        </div>
    );
}
