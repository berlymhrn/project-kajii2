import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import CarouselComponent from "@/Components/Carousel";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import TextSkeleton from "@/Components/loading/TextSkeleton";
import Feature from "@/Components/ListFeature";
import CustomButton from "@/Components/CustomButton";

function DetailHomestay() {
    const { props } = usePage();
    const { id } = props;
    const [detailHomestay, setDetailHomestay] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get(`/homestay/${id}`);
                setDetailHomestay(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const renderImage = () => {
        if (loading || !detailHomestay.gambar) {
            return <CardTransSkeleton />;
        }
        const imageArray = detailHomestay.gambar.split(",");
        const cleanedImages = imageArray.map(
            (image) => "http://127.0.0.1:8088/" + image.trim()
        );
        return <CarouselComponent images={cleanedImages} limit={5} />;
    };

    const renderHarga = () => {
        if (loading || !detailHomestay.harga) {
            return <TextSkeleton />;
        }
        const hargaFormatted = detailHomestay.harga.toLocaleString("id-ID");
        const hargaCurrency = `IDR ${hargaFormatted}/malam`;
        return hargaCurrency;
    };

    const renderFasilitas = () => {
        if (loading || !detailHomestay.fasilitas) {
            return <TextSkeleton />;
        }
        const fasilitasArray = detailHomestay.fasilitas
            .split(",")
            .map((fasilitas) => fasilitas.trim());
        return <Feature featureTitle={fasilitasArray} />;
    };

    const renderPeraturan = () => {
        if (loading || !detailHomestay.peraturan) {
            return <TextSkeleton />;
        }
        const peraturanArray = detailHomestay.peraturan
            .split(",")
            .map((peraturan, index) => `${index + 1}.) ${peraturan.trim()}`);
        return (
            <ul>
                {peraturanArray.map((peraturan, index) => (
                    <li key={index}>{peraturan}</li>
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
                            {detailHomestay.nama}
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
                            {detailHomestay.deskripsi}
                        </p>
                    )}
                </div>

                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        Fasilitas
                    </h2>
                    {renderFasilitas()}
                </div>

                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        Peraturan Homestay
                    </h2>
                    <p className="text-p18 md:text-h5 font-medium">
                        {renderPeraturan()}
                    </p>
                </div>
                <div className="mb-20">
                    <CustomButton
                        text={"Pesan Sekarang"}
                        bgColor={"bg-red-600"}
                        font={"font-semibold"}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailHomestay;
