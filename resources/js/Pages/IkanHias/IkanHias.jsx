import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CustomButton from "@/Components/CustomButton";
import CardActivity from "@/Components/CardActivity";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function IkanHias() {
    const [ikanHias, setIkanHias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ikanHiasResponse = await DesaKajii.get(
                    "/katalog/ikan-hias"
                );
                setIkanHias(ikanHiasResponse.data.ikanhias);

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
            const imagePath = "http://localhost:8088/" + imageTrim;

            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;

            return (
                <CardActivity
                    key={item.id_ikan_hias}
                    title={item.judul}
                    image={imagePath}
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
        <div>
            <Head>
                <title>Ikan Hias</title>
                <meta
                    name="description"
                    content="Temukan koleksi lengkap ikan hias yang dijual dan nikmati pengalaman memilih ikan favorit Anda di Desa Kajii! Jelajahi berbagai jenis ikan eksotis, seperti ikan koi, guppy, dll yang tersedia di kolam kami. Saksikan keindahan ikan hias yang beragam dan temukan yang paling cocok untuk menambah keindahan akuarium Anda di rumah. Jadikan kunjungan Anda ke Desa Kajii sebagai pengalaman berbelanja yang menyenangkan dan memuaskan!"
                />
            </Head>
            <Navbar4 />
            <div className="mx-12 md:mx-20">
                <h1 className="font-bold text-h3 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Ikan Hias
                </h1>
                <div className="flex flex-wrap gap-3">{renderIkanHias()}</div>
            </div>
            <Footer />
        </div>
    );
}

export default IkanHias;
