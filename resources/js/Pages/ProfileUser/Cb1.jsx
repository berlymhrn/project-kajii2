import React, { useState, useEffect } from "react";


const InputLabel = ({ labelFor, labelText }) => (
    <label htmlFor={labelFor}>{labelText}</label>
);

const TextInput = ({ inputId, inputType, onChange, value }) => (
    <input id={inputId} type={inputType} onChange={onChange} value={value} />
);

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
                        Authorization: "Bearer",
                    },
                });

                if (
                    !response ||
                    !response.data ||
                    !response.data.users ||
                    response.data.users.length === 0
                ) {
                    console.error("User data not found for the token.");
                    return;
                }

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

    return (
        <div>
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
                        value={telephone}
                    />
                    {errors.telephone && (
                        <div className="text-red-500">{errors.telephone}</div>
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
                        value={email}
                    />
                    {errors.email && (
                        <div className="text-red-500">{errors.email}</div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
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
                        <div className="text-red-500">{errors.name}</div>
                    )}
                </div>
                <div>
                    <InputLabel
                        labelFor={"password"}
                        labelText={
                            <span>
                                Password
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    />
                    <TextInput
                        inputId={"password"}
                        inputType={"text"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {errors.password && (
                        <div className="text-red-500">{errors.password}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateData;
