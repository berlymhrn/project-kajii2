import React, { useState,useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import { Link } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import DesaKajii from "@/services/DesaKajii";
import Alert from "@/Components/Alert";


export default function Register() {
    const [nama, setNama] = useState("");
    const [username, setUsername] = useState("");
    const [no_telp, setNoTelpon] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};
        if (!username.trim()) {
            errors.username = "Username harus diisi";
        } else if (username.trim().length > 255) {
            errors.username = "Username tidak boleh terlalu panjang";
        }

        if (!nama.trim()) {
            errors.nama = "Nama Lengkap harus diisi";
        } else if (nama.trim().length > 255) {
            errors.nama = "Nama tidak boleh terlalu panjang";
        }

        if (!no_telp.trim()) {
            errors.no_telp = "Nomor Kontak harus diisi";
        } else if (!/^\d{10,}$/.test(no_telp)) {
            errors.no_telp = "Setidaknya 10 angka";
        } else if (no_telp.trim().length > 255) {
            errors.no_telp = "Telpon anda terlalu panjang";
        }

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
        } else if (
            !/(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)
        ) {
            errors.password = "Setidaknya 8 karakter dengan angka dan simbol";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const handleButton = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const formData = {
                    nama,
                    username,
                    email,
                    no_telp,
                    password,
                };

                const response = await DesaKajii.post(
                    "/user/register",
                    formData
                );

                console.log(response.data);
                setRegistrationSuccess(true);
                window.location.href = "/login";

            } catch (error) {
                if (error.response) {
                    const { data, status } = error.response;

                    if (
                        status === 400 &&
                        data.info === "Email yang anda masukkan sudah ada"
                    ) {
                        setErrors({ email: data.info });
                    } else {
                        console.error("Error submitting registration", error);
                        setErrors({
                            general: "Terjadi kesalahan saat pendaftaran.",
                        });
                    }
                } else {
                    console.error("Error submitting registration", error);
                    setErrors({
                        general: "Terjadi kesalahan saat pendaftaran.",
                    });
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-gray-100">
            <div className="flex justify-end">
                {registrationSuccess && (
                    <Alert type="success" message="Registrasi berhasil!" />
                )}
            </div>
            <div className="w-full sm:max-w-md mt-0 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div>
                    <form>
                        <div>
                            <h1 className="w-full mb-14 font-bold text-h3 flex justify-center">
                                Register
                            </h1>
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                labelFor={"name"}
                                labelText={
                                    <span>
                                        Nama Lengkap
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"name"}
                                inputType={"text"}
                                onChange={(e) => setNama(e.target.value)}
                            />
                            {errors.nama && (
                                <div className="text-red-500">
                                    {errors.nama}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                labelFor={"username"}
                                labelText={
                                    <span>
                                        Username
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"username"}
                                inputType={"text"}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && (
                                <div className="text-red-500">
                                    {errors.username}
                                </div>
                            )}
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
                                labelFor={"telepon"}
                                labelText={
                                    <span>
                                        No Telepon
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                inputId={"telepon"}
                                inputType={"text"}
                                onChange={(e) => setNoTelpon(e.target.value)}
                            />
                            {errors.no_telp && (
                                <div className="text-red-500">
                                    {errors.no_telp}
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
                                        <IconEye />
                                    ) : (
                                        <IconEyeOff />
                                    )}
                                </button>
                                {errors.password && (
                                    <div className="text-red-500 absolute top-full left-0">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-20 mb-6 flex flex-col">
                            <CustomButton
                                text={"REGISTER"}
                                bgColor={"bg-primaryColor"}
                                onClick={handleButton}
                                width={"w-full"}
                            />

                            <Link
                                href="/login"
                                className="flex justify-center mt-2 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sudah memiliki akun?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
