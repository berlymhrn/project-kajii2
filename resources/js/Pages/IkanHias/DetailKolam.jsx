import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import CarouselComponent from "@/Components/Carousel";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import TextSkeleton from "@/Components/loading/TextSkeleton";
import CustomButton from "@/Components/CustomButton";
import Feature from "@/Components/ListFeature";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function DetailKolamIkan() {
    const { props } = usePage();
    const { id } = props;
    const [detailKolam, setDetailKolam] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get(`/katalog/kolam${id}`);
                setDetailKolam(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const renderImage = () => {
        if (loading || !detailKolam.gambar) {
            return <CardTransSkeleton />;
        }
        const imageArray = detailKolam.gambar.split(",");
        const cleanedImages = imageArray.map(
            (image) => "http://127.0.0.1:8088/" + image.trim()
        );
        return <CarouselComponent images={cleanedImages} />;
    };

    const renderJenisIkan = () => {
        if (loading || !detailKolam.jenis_ikan) {
            return <TextSkeleton />;
        }
        const jenisIkanArray = detailKolam.jenis_ikan
            .split(",")
            .map((jenis_ikan) => jenis_ikan.trim());
        return <Feature featureTitle={jenisIkanArray} />;
    };

    return (
        <div>
            <Navbar4 />
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
                                {detailKolam.nama}
                            </h2>
                        )}
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
                                {detailKolam.deskripsi}
                            </p>
                        )}
                    </div>

                    <div className="mb-20">
                        <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                            Jenis Ikan Budidaya
                        </h2>
                        <p className="text-p18 md:text-h5 font-medium">
                            {renderJenisIkan()}
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
            <Footer />
        </div>
    );
}

export default DetailKolamIkan;
