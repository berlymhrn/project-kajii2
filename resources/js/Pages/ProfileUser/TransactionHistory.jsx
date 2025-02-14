import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CardTransaksi from "@/Components/CardTransaction";
import CustomButton from "@/Components/CustomButton";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import DesaKajii from "@/services/DesaKajii";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";
import { IconBrandWhatsapp } from "@tabler/icons-react";

function TransactionHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id_user, setId_user] = useState("");

    //get transaction history user from token cookie
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

                // Get user data from cookie
                const response = await DesaKajii.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.id_user) {
                    setId_user(response.data.id_user);

                    // Get transaction history for the user
                    const historyResponse = await DesaKajii.get(
                        `/transaksi/get?user=${response.data.id_user}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const transactions = historyResponse.data;
                    const formattedTransactions = transactions.map(
                        (transaction) => ({
                            harga: transaction.harga,
                            dibayarkan: transaction.dibayarkan,
                            status: transaction.status,
                            jenis_booking: transaction.jenis_booking,
                            check_in: transaction.check_in,
                            img: transaction.gambar,
                        })
                    );

                    setHistory(formattedTransactions);
                    setLoading(false);
                } else {
                    console.error("User data not found or incomplete.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const renderHistory = () => {
        if (loading || !history) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <CardTransSkeleton key={index} />
                    ))}
                </>
            );
        }
        return history.map((item) => {
            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;

            const dateParts = item.check_in.split("-");
            const formattedDate = `Check In : ${dateParts[2]}-${
                dateParts[1]
            }-20${dateParts[0].slice(2)}`;

            const sisaPembayaran = item.harga - item.dibayarkan;
            const sisaPembayaranFormated = `Sisa Pembayaran : IDR ${sisaPembayaran.toLocaleString(
                "id-ID"
            )}`;
            const imagePath = "http://127.0.0.1:8088/" + item.img;

            return (
                <CardTransaksi
                    key={item.id_transaksi}
                    img={imagePath}
                    title={hargaCurrency}
                    header={item.jenis_booking}
                    time={formattedDate}
                    smallTitle={sisaPembayaranFormated}
                    action={
                        item.status !== "Batal" ? (
                            <CustomButton
                                text={"Batal"}
                                bgColor={"bg-red-600"}
                                font={"font-medium"}
                            />
                        ) : null
                    }
                    anotherAction={
                        <CustomButton
                            text={item.status}
                            bgColor={
                                item.status === "Process"
                                    ? "bg-yellow-500"
                                    : item.status === "DP"
                                    ? "bg-purple-500"
                                    : item.status === "Batal"
                                    ? "bg-red-600"
                                    : "bg-primaryColor"
                            }
                            font={"font-medium"}
                        />
                    }
                />
            );
        });
    };

    return (
        <div className="">
            <Head>
                <title>History Transaksi</title>
            </Head>
            <Navbar4 />
            <div className="mx-12 md:mx-20">
                <a
                    href="https://wa.me/6288225208880"
                    className="fixed bottom-10 right-10 bg-primaryColor rounded-full p-4 z-50"
                >
                    <IconBrandWhatsapp className="text-white w-10 h-10" />
                </a>
                <div className="mb-20 md:mb-32">
                    <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                        History Transaksi
                    </h1>
                    <h5 className="text-red-700 text-h5 mb-3">*Diharapkan setelah melakukan pemesanan segera untuk menghubungi admin untuk konfirmasi pembayaran.</h5>
                    <div className="flex flex-wrap gap-3">
                        {renderHistory()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TransactionHistory;
