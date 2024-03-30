import React, { useState, useEffect } from "react";
import CardActivity from "@/Components/CardActivity";
import CustomButton from "@/Components/CustomButton";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";

function Index() {
    const [kegiatans, setKegiatans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get("/kegiatan");
                setKegiatans(response.data.kegiatan);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderKegiatan = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return kegiatans.map((item) => {
            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;

            return (
                <CardActivity
                    key={item.id_kegiatan}
                    title={item.judul}
                    image={item.gambar}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Pesan Sekarang"}
                            bgColor={"bg-red-600"}
                            font={"font-semibold"}
                        />
                    }
                />
            );
        });
    };

    return (
        <div className="mx-12 md:mx-20">
            <h1 className="font-bold text-h2 md:text-h1 mt-20 flex justify-center mb-12 md:mb-16">
                Kegiatan Menarik
            </h1>
            <div className="flex flex-wrap gap-3">{renderKegiatan()}</div>
        </div>
    );
}

export default Index;
