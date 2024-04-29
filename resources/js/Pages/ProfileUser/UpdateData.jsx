import React, { useState, useEffect } from "react";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";
import axios from 'axios';

const UpdateData = () => {
    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [id_user, setId_user] = useState("");
    const [password, setPassword] = useState("");

    // Fungsi untuk mengambil token dari cookie
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

    const DesaKajii = axios.create({
        baseURL: 'https://example.com/api',
        // Konfigurasi lainnya...
      });
      
    // Efek samping untuk mengambil data pengguna dari server
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
                const userData = response.data.users[0];

                // Set nilai input langsung dari data pengguna
                setName(userData.nama);
                setEmail(userData.email);
                setTelephone(userData.no_telp);
                setId_user(userData.id_user);
                setPassword(userData.password);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    // Fungsi untuk validasi form
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

        if (!password.trim()) {
            errors.password = "Password harus diisi";
        } else if (password.trim().length > 255) {
            errors.password = "Password tidak boleh terlalu panjang";
        } else if (!/(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}/.test(password)) {
            errors.password = "Setidaknya 8 karakter dengan angka dan simbol";
        }
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // Fungsi untuk menangani pembaruan data
    const handleUpdateData = async () => {
        // Lakukan validasi form sebelum melakukan pembaruan data
        if (validateForm()) {
            try {
                const token = getCookieToken();
                if (!token) {
                    console.error("Token not found in cookies.");
                    return;
                }

                // Lakukan pembaruan data di sini
                // Misalnya, kirim permintaan HTTP ke server untuk menyimpan data yang diperbarui
                const response = await DesaKajii.put(
                    "/user",
                    {
                        id_user,
                        nama: name,
                        email,
                        no_telp: telephone,
                        password,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Data berhasil diperbarui:", response.data);
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        } else {
            console.log(
                "Form tidak valid. Tidak dapat melakukan pembaruan data."
            );
        }
    };

    return (
        <div>
            <Navbar4 />
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Update Data Pengguna
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact" className="block">
                            No Telepon <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="contact"
                            type="text"
                            onChange={(e) => setTelephone(e.target.value)}
                            value={telephone}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.telephone && (
                            <div className="text-red-500">
                                {errors.telephone}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.email && (
                            <div className="text-red-500">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="nama" className="block">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="nama"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password || ""}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.password && (
                            <div className="text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button
                        className="w-40 p-2 bg-primaryColor text-white rounded-md hover:bg-green-700"
                        onClick={handleUpdateData}
                    >
                        Ubah Data
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateData;
