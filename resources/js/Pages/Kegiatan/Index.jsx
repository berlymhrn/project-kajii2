import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CardActivity from "@/Components/CardActivity";
import CustomButton from "@/Components/CustomButton";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

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
            const imagePath = "http://127.0.0.1:8088/" + item.gambar;

            return (
                <CardActivity
                    key={item.id_kegiatan}
                    title={item.judul}
                    image={imagePath}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Pesan Sekarang"}
                            bgColor={"bg-red-600"}
                            font={"font-semibold"}
                            linkTo={`/booking/kegiatan/${item.id_kegiatan}`}
                        />
                    }
                />
            );
        });
    };

    return (
        <div>
            <Head>
                <title>Kegiatan</title>
                <meta
                    name="description"
                    content="Nikmati berbagai kegiatan menarik selama berkunjung ke Desa Kajii! Dari wisata memancing, bersepeda mengelilingi pedesaan yang indah, hingga berjalan-jalan santai di taman ikan koi yang menawan, kami menawarkan pengalaman yang tak terlupakan untuk semua pengunjung. Temukan pilihan kegiatan yang sesuai dengan minat dan keinginan Anda, dan buat kenangan yang berharga di Desa ini"
                />
            </Head>

            <Navbar4 />
            <div className="mx-12 md:mx-20">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Kegiatan Menarik
                </h1>
                <div className="flex flex-wrap gap-3">{renderKegiatan()}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
