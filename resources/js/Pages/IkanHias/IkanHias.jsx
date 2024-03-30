import React, { useState, useEffect } from "react";
import CustomButton from "@/Components/CustomButton";
import CardActivity from "@/Components/CardActivity";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";

function IkanHias() {
    const [ikanHias, setIkanHias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ikanHiasResponse = await DesaKajii.get("/ikan-hias");
                setIkanHias(ikanHiasResponse.data.ikanHias);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderIkanHias = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return ikanHias.map((item) => {
            const imgUrls = item.gambar.split(",");
            const imageTrim = imgUrls[0].trim();

            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;

            return (
                <CardActivity
                    key={item.id_ikan_hias}
                    title={item.judul}
                    image={imageTrim}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Lihat Detail"}
                            linkTo={`/ikan-hias/detail/${item.id_ikan_hias}`}
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
            <h1 className="font-bold text-h3 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                Ikan Hias
            </h1>
            <div className="flex flex-wrap gap-3">{renderIkanHias()}</div>
        </div>
    );
}

export default IkanHias;
