import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";

export default function ProfileAccount() {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-gray-100">
            <h5 className="w-full mb-6 font-bold text-h5 flex justify-center">
                Informasi Akun
            </h5>

            <div className="flex flex-row items-center justify-center px-2">
                <TextInput />
                <TextInput />
            </div>
        </div>
    );
}
