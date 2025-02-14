import React, { useState, useEffect } from "react";
import CardActivity from "@/Components/CardActivity";
import CustomButton from "@/Components/CustomButton";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function Index() {
    const [hiburan, setHiburan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get("/kegiatan");
                setHiburan(response.data.kegiatan);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const renderHiburan = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return hiburan.map((item) => {
            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;
            const imagePath = "http://127.0.0.1:8088/" + item.gambar;
            return (
                <CardActivity
                    key={item.id_hiburan}
                    title={item.judul}
                    image={imagePath}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Pesan Sekarang"}
                            bgColor={"bg-red-600"}
                            font={"font-semibold"}
                            linkTo={`/booking/hiburan/${item.id_hiburan}`}
                        />
                    }
                />
            );
        });
    };
    return (
        <div>
            <Navbar4 />
            <div className="mx-12 md:mx-20">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Hiburan
                </h1>
                <div className="flex flex-wrap gap-3">{renderHiburan()}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
