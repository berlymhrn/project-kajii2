import React, { useState, useEffect } from "react";
import CardAll from "@/Components/CardAll";
import CustomButton from "@/Components/CustomButton";
import Feature from "@/Components/ListFeature";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import DesaKajii from "@/services/DesaKajii";
import Navbar4 from "@/Components/Navbar4";

function Index() {
    const [paketWisata, setPaketWisata] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paketWisataResponse = await DesaKajii.get(
                    "/paket-wisata"
                );
                setPaketWisata(paketWisataResponse.data.paket);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderPaketWisata = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return paketWisata.map((item) => {
            const fasilitasArray = item.fasilitas
                .split(",")
                .map((fasilitas) => fasilitas.trim())
                .slice(0, 10);
            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;
            let imageTrim = item.gambar;
            if (item.gambar.includes(",")) {
                const imgUrls = item.gambar.split(",");
                imageTrim = imgUrls[0].trim();
            }

            return (
                <CardAll
                    key={item.id_paket_wisata}
                    title={item.judul}
                    titlePosition={"justify-center"}
                    smallTitlePosition={"justify-center"}
                    smallTitle={item.waktu}
                    img={imageTrim}
                    capt={"Fasilitas"}
                    feature={<Feature featureTitle={fasilitasArray} />}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Pesan Sekarang"}
                            linkTo={"/coba"}
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
            <Navbar4 />

            <div className="mx-12 md:mx-20 ">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 flex justify-center mb-12 md:mb-16">
                    PAKET WISATA
                </h1>
                <div className="flex flex-wrap gap-3">
                    {renderPaketWisata()}
                </div>
            </div>
        </div>
    );
}

export default Index;
