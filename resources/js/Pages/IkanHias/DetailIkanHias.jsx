import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import CarouselComponent from "@/Components/Carousel";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import TextSkeleton from "@/Components/loading/TextSkeleton";
import CustomButton from "@/Components/CustomButton";

function DetailIkanHias() {
    const { props } = usePage();
    const { id } = props;
    const [detailIkanHias, setDetailIkanHias] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get(`/ikan-hias/${id}`);
                setDetailIkanHias(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const renderImage = () => {
        if (loading || !detailIkanHias.gambar) {
            return <CardTransSkeleton />;
        }
        const imageArray = detailIkanHias.gambar.split(",");
        const cleanedImages = imageArray.map((image) => image.trim());
        return <CarouselComponent images={cleanedImages} limit={5} />;
    };

    const renderHarga = () => {
        if (loading || !detailIkanHias.harga) {
            return <TextSkeleton />;
        }
        const hargaFormatted = detailIkanHias.harga.toLocaleString("id-ID");
        const hargaCurrency = `IDR ${hargaFormatted}/malam`;
        return hargaCurrency;
    };

    const renderPerawatan = () => {
        if (loading || !detailIkanHias.perawatan) {
            return <TextSkeleton />;
        }
        const perawatanArray = detailIkanHias.perawatan
            .split(",")
            .map((perawatan, index) => `${index + 1}.) ${perawatan.trim()}`);
        return (
            <ul>
                {perawatanArray.map((perawatan, index) => (
                    <li key={index}>{perawatan}</li>
                ))}
            </ul>
        );
    };
    return (
        <div className="mx-12 md:mx-20">
            <div className="mt-20">
                {renderImage()}
                <div className="flex flex-col justify-center items-center">
                    {loading ? (
                        <>
                            <div className="bg-gray-200 h-6 w-2/4 rounded-full animate-pulse mb-3 mt-10"></div>
                            <div className="bg-gray-200 h-6 w-1/4 rounded-full animate-pulse"></div>
                        </>
                    ) : (
                        <h2 className="font-bold text-h5 md:text-h2 mt-10 mb-2">
                            {detailIkanHias.judul}
                        </h2>
                    )}
                    <p className="font-medium text-h5 md:text-h3 text-gray-600">
                        {renderHarga()}
                    </p>
                </div>
            </div>
            <div>
                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        Deskripsi
                    </h2>
                    {loading ? (
                        <TextSkeleton />
                    ) : (
                        <p className="text-p18 md:text-h5 font-medium">
                            {detailIkanHias.deskripsi}
                        </p>
                    )}
                </div>

                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        perawatan ikan hias
                    </h2>
                    <p className="text-p18 md:text-h5 font-medium">
                        {renderPerawatan()}
                    </p>
                </div>
                <div className="mb-20">
                    <CustomButton
                        text={"Hubungi Penjual"}
                        bgColor={"bg-red-600"}
                        font={"font-semibold"}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailIkanHias;
