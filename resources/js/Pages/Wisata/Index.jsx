import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CardAll from "@/Components/CardAll";
import CustomButton from "@/Components/CustomButton";
import Feature from "@/Components/ListFeature";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import DesaKajii from "@/services/DesaKajii";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

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
                .map((fasilitas) => fasilitas.trim());

            const formatCurrency = (amount) => {
                const formattedAmount = amount.toLocaleString("id-ID");
                return `IDR ${formattedAmount}`;
            };
            const hargaCurrency = formatCurrency(item.harga);
            const promoCurrency =
                item.promo !== 0 ? formatCurrency(item.promo) : null;

            let imageTrim = item.gambar;
            if (item.gambar.includes(",")) {
                const imgUrls = item.gambar.split(",");
                imageTrim = imgUrls[0].trim();
            }
            const imagePath = "http://127.0.0.1:8088/" + imageTrim;

            return (
                <CardAll
                    key={item.id_paket_wisata}
                    title={item.judul}
                    titlePosition={"justify-center"}
                    smallTitlePosition={"justify-center"}
                    smallTitle={item.waktu}
                    img={imagePath}
                    capt={"Fasilitas"}
                    feature={<Feature featureTitle={fasilitasArray} />}
                    price={hargaCurrency}
                    discount={promoCurrency}
                    action={
                        <CustomButton
                            text={"Pesan Sekarang"}
                            linkTo={`/booking/paket-wisata/${item.id_paket_wisata}`}
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
                <title>Paket Wisata</title>
                <meta
                    name="description"
                    content="Temukan wisata seru di Jogja. Dapatkan pengalaman petualangan yang tak terlupakan dengan berbagai aktivitas menarik seperti memancing, bersepeda, membatik, membuat wayang. Temukan pilihan paket wisata yang sesuai dengan keinginan Anda dengan harga yang bervariasi"
                />
            </Head>
            <Navbar4 />
            <div className="mx-12 md:mx-20 ">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    PAKET WISATA
                </h1>
                <div className="flex flex-wrap gap-3">
                    {renderPaketWisata()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
