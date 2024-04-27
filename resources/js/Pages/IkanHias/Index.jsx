import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardAll from "@/Components/CardAll";
import CustomButton from "@/Components/CustomButton";
import CardActivity from "@/Components/CardActivity";
import DesaKajii from "@/services/DesaKajii";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import { Link } from "@inertiajs/react";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function Index() {
    const [slideIndex, setSlideIndex] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (current, next) => setSlideIndex(next),
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [ikanHias, setIkanHias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kolamIkan, setKolamIkan] = useState([]);
    const [ikanTerbaik, setIkanTerbaik] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ikanHiasResponse = await DesaKajii.get(
                    "/katalog/ikan-hias"
                );
                setIkanHias(ikanHiasResponse.data.ikanhias);
                setIkanTerbaik(ikanHiasResponse.data.ikanhias);

                const kolamIkanResponse = await DesaKajii.get("/katalog/kolam");
                setKolamIkan(kolamIkanResponse.data.kolam);

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
        return ikanHias.slice(0, 4).map((item) => {
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

    const renderIkanTerbaik = () =>
        ikanTerbaik.map((item, index) => {
            const imageUrls = item.gambar.split(",");
            const imageTrim = imageUrls[0].trim();
            const imagePath = "http://localhost:8088/" + imageTrim;
            return (
                <div
                    key={index}
                    className={`slide ${index === slideIndex ? "active" : ""} ${
                        index === slideIndex
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-50"
                    }`}
                >
                    <img
                        src={imagePath}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-72 object-cover rounded-lg"
                    />
                </div>
            );
        });

    return (
        <div>
            <Navbar4 />
            <div>
                <h1 className="font-bold text-h3 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Ikan Hias Terbaik
                </h1>
                <div className="slider w-full h-96">
                    <Slider {...settings}>{renderIkanTerbaik()}</Slider>
                </div>
            </div>
            <div className="mx-12 md:mx-20">
                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        Semua Ikan Hias
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-5 ">
                        {renderIkanHias()}
                    </div>
                    <Link href="/ikan-hias-all">
                        <h5 className="underline text-2xl tracking-tight font-bold text-primaryColor">
                            Lihat Lainnya
                        </h5>
                    </Link>
                </div>

                <div className="mb-20">
                    <h2 className="font-bold text-h5 md:text-h2 mt-20 mb-3 md:mb-8">
                        Kolam Ikan
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-5 ">
                        {renderKolamIkan()}
                    </div>
                    <Link href="/kolam-ikan-all">
                        <h5 className="underline text-2xl tracking-tight font-bold text-primaryColor">
                            Lihat Lainnya
                        </h5>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
