import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import { Link } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import DesaKajii from "@/services/DesaKajii";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};

        if (!email.trim()) {
            errors.email = "Email harus diisi";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Format Email tidak valid";
        } else if (email.trim().length > 255) {
            errors.email = "Email anda terlalu panjang";
        }

        if (!password.trim()) {
            errors.password = "Password harus diisi";
        } else if (password.trim().length > 255) {
            errors.password = "Password tidak boleh terlalu panjang";
        } else if (!/[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
            errors.password = "Setidaknya 8 karakter dengan angka dan simbol";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleButton = async (e) => {
        //function untuk submit form
        e.preventDefault();

        if (validateForm()) {
            try {
                const formData = {
                    email,
                    password,
                };

                const response = await DesaKajii.post("/user/login", formData);
                document.cookie = `token=${response.data.token};`;
                // Jika message dari response success maka redirect ke halaman sebelumnya
                if (response.data.message === "success") {
                    // Redirect ke halaman sebelumnya
                    window.history.back();
                }
            } catch (error) {
                console.error("Error submitting registeration", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-gray-100">
            <div className="w-full sm:max-w-md mt-0 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div>
                    <form>
                        <div>
                            <h5 className="w-full mb-6 font-bold text-h5 flex justify-center">
                                Login
                            </h5>
                        </div>

                        <div className="mb-4">
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

                        <div className="mb-4">
                            <InputLabel
                                labelFor="password"
                                labelText={
                                    <span>
                                        Password
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <div className="relative">
                                <TextInput
                                    inputId="password"
                                    inputType={
                                        showPassword ? "text" : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <IconEyeOff />
                                    ) : (
                                        <IconEye />
                                    )}
                                </button>
                                {errors.password && (
                                    <div className="text-red-500 absolute top-full left-0">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-10">
                            <CustomButton
                                text={"LOGIN"}
                                bgColor={"bg-primaryColor"}
                                onClick={handleButton}
                            />

                            <Link
                                href="/register"
                                className="flex w-full mt-2 items-center justify-start underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Belum memiliki akun?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
