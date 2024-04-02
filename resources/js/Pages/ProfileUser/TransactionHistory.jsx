import React, { useState, useEffect } from "react";
import CardTransaksi from "@/Components/CardTransaction";
import CustomButton from "@/Components/CustomButton";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import DesaKajii from "@/services/DesaKajii";

function TransactionHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const historyResponse = await DesaKajii.get(
                    "/transaksi/get?user"
                );
                setHistory(historyResponse.data.Data);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderHistory = () => {
        if (loading) {
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
            const formattedDate = `${dateParts[2]}-${
                dateParts[1]
            }-20${dateParts[0].slice(2)}`;

            const sisaPembayaran = item.harga - item.dibayarkan;
            const sisaPembayaranFormated = `Sisa Pembayaran : IDR ${sisaPembayaran.toLocaleString(
                "id-ID"
            )}`;

            return (
                <CardTransaksi
                    key={item.id_user}
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
        <div className="mx-12 md:mx-20">
            <div className="mb-20 md:mb-32">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    History Transaksi
                </h1>
                <div className="flex flex-wrap gap-3">{renderHistory()}</div>
            </div>
        </div>
    );
}

export default TransactionHistory;
