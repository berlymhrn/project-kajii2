import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
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

    const handleButton = () => {
        window.location.href = "https://wa.me/6288225208880";
    };

    return (
        <div>
            <Head>
                <title>Detail Kolam Ikan Hias</title>
                <meta
                    name="description"
                    content="Nikmati keindahan kolam ikan di Desa Kajii! Temukan berbagai jenis kolam ikan yang menakjubkan, mulai dari kolam koi yang indah hingga kolam untuk budidaya ikan hias eksotis. Saksikan keindahan alam yang mengelilingi kolam, dan rasakan kedamaian yang ditawarkan oleh lingkungan yang alami dan menenangkan. Jadikan kunjungan Anda ke kolam ikan di Desa Kajii sebagai pengalaman yang mempesona dan menginspirasi."
                />
            </Head>
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
                        <div className="text-p18 md:text-h5 font-medium">
                            {renderJenisIkan()}
                        </div>
                    </div>
                    <div className="mb-20">
                        <CustomButton
                            text={"Hubungi Penjual"}
                            bgColor={"bg-red-600"}
                            font={"font-semibold"}
                            onClick={handleButton}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailKolamIkan;
