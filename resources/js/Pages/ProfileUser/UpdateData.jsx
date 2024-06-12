import React, { useState, useEffect } from "react";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";
import DesaKajii from "@/services/DesaKajii";

const UpdateData = () => {
    const [nama, setNama] = useState("");
    const [no_telp, setNoTelpon] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [id_user, setId_user] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                setNama(response.data.nama);
                setEmail(response.data.email);
                setNoTelpon(response.data.no_telp);
                setUsername(response.data.username);
                setId_user(response.data.id_user);
                setPassword(response.data.pass);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

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
            !/(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}/.test(password)
        ) {
            errors.password = "Setidaknya 8 karakter dengan angka dan simbol";
        }
        
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // const handleButton = async (e) => {
    //     e.preventDefault();

    //     if (validateForm()) {
    //         // try {
    //             const formData = {
    //                 nama,
    //                 email,
    //                 no_telp,
    //                 username,
    //             };

    //             const response = await DesaKajii.post(
    //                 /user/update/${id_user},
    //                 formData
    //             );

    //             console.log(response.data);
    //         } catch (error) {
    //             if (error.response) {
    //                 const { data, status } = error.response;

    //                 if (
    //                     status === 400 &&
    //                     data.info === "Email yang anda masukkan sudah ada"
    //                 ) {
    //                     setErrors({ email: data.info });
    //                 } else {
    //                     console.error("Error Update Data", error);
    //                     setErrors({
    //                         general: "Terjadi kesalahan saat ubah data.",
    //                     });
    //                 }
    //             } else {
    //                 console.error("Error Updating data", error);
    //                 setErrors({
    //                     general: "Terjadi kesalahan saat update data.",
    //                 });
    //             }
    //         }
    //     }
    // };

    const handleButton = async () => {
        if (!validateForm()) return; // Validasi form sebelum pengiriman data

        try {
            const token = getCookieToken();
            if (!token) {
                console.error("Token not found in cookies.");
                return;
            }


            const response = await DesaKajii.post(`/user/update/${id_user}`, {
                username,
                nama,
                no_telp,
                email,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            console.log("Data berhasil diubah:", response.data);
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;

                if (
                    status === 400 &&
                    data.info === "Email yang anda masukkan sudah ada"
                ) {
                    setErrors({ email: data.info });
                } else {
                    console.error("Error Update Data", error);
                    setErrors({
                        general: "Terjadi kesalahan saat ubah data.",
                    });
                }
            } else {
                console.error("Error Updating data", error);
                setErrors({
                    general: "Terjadi kesalahan saat update data.",
                });
            }
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
                            onChange={(e) => setNoTelpon(e.target.value)}
                            value={no_telp}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.no_telp && (
                            <div className="text-red-500">{errors.no_telp}</div>
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
                            onChange={(e) => setNama(e.target.value)}
                            value={nama}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.nama && (
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="username" className="block">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            type="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.username && (
                            <div className="text-red-500">
                                {errors.username}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block">
                            password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
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
                        onClick={handleButton}
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