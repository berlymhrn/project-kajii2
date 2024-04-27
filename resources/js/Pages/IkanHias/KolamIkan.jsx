import React, { useState, useEffect } from "react";
import CustomButton from "@/Components/CustomButton";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import CardAll from "@/Components/CardAll";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function KolamIkan() {
    const [kolamIkan, setKolamIkan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kolamIkanResponse = await DesaKajii.get("/katalog/kolam");
                setKolamIkan(kolamIkanResponse.data.kolam);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderKolamIkan = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return kolamIkan.slice(0, 4).map((item) => {
            let imageTrim = item.gambar;
            if (item.gambar.includes(",")) {
                const imgUrls = item.gambar.split(",");
                imageTrim = imgUrls[0].trim();
            }
            const imagePath = "http://localhost:8088/" + imageTrim;
            const truncatedDescription =
                item.deskripsi.length > 140
                    ? item.deskripsi.slice(0, 140) + "..."
                    : item.deskripsi;
            return (
                <CardAll
                    key={item.id_kolam}
                    title={item.nama}
                    img={imagePath}
                    titlePosition={"justify-center"}
                    smallTitle={truncatedDescription}
                    action={
                        <CustomButton
                            text={"Lihat Selengkapnya"}
                            linkTo={`/kolam-ikan/detail/${item.id_kolam}`}
                            bgColor={"bg-primaryColor"}
                            font={"font-semibold"}
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
                <h1 className="font-bold text-h3 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Kolam Ikan
                </h1>
                <div className="flex flex-wrap gap-3">{renderKolamIkan()}</div>
            </div>
            <Footer />
        </div>
    );
}

export default KolamIkan;
