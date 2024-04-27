import React, { useState, useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import heroSection from "../../../../public/assets/heroSection.png";
import CustomButton from "@/Components/CustomButton";
import Review from "@/Components/Review";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Faq from "@/Components/Faq";
import CarouselComponent from "@/Components/Carousel";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import CardAll from "@/Components/CardAll";
import Feature from "@/Components/ListFeature";
import CardActivity from "@/Components/CardActivity";
import TextSkeleton from "@/Components/loading/TextSkeleton";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import FaqSkeleton from "@/Components/loading/FaqSkeleton";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";

function Index() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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

    const [loading, setLoading] = useState(true);
    const [profileDesc, setProfileDesc] = useState("");
    const [promo, setPromo] = useState([]);
    const [paketWisata, setPaketWisata] = useState([]);
    const [homestay, setHomestay] = useState([]);
    const [review, setReview] = useState([]);
    const [faq, setFaq] = useState([]);
    const [kegiatan, setKegiatan] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileDescResponse = await DesaKajii.get("/profile");
                setProfileDesc(profileDescResponse.data.profile.deskripsi);

                // const promoResponse = await DesaKajii.get("/promo");
                // setPromo(promoResponse.data.promo);

                const paketWisataResponse = await DesaKajii.get(
                    "/paket-wisata"
                );
                setPaketWisata(paketWisataResponse.data.paket);

                const homestayResponse = await DesaKajii.get("/homestay");
                setHomestay(homestayResponse.data.homestay);

                const reviewResponse = await DesaKajii.get("/ulasan");
                setReview(reviewResponse.data.ulasan);

                const faqResponse = await DesaKajii.get("/faq");
                setFaq(faqResponse.data.faq);

                const kegiatanResponse = await DesaKajii.get("/kegiatan");
                setKegiatan(kegiatanResponse.data.kegiatan);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // const renderPromo = () => {
    //     if (loading) {
    //         return <CardTransSkeleton />;
    //     }
    //     const images = promo.map((item) => item.gambar);
    //     return <CarouselComponent images={images} limit={3} />;
    // };

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
        return paketWisata.slice(0, 4).map((item) => {
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
                            bgColor={"bg-red-600"}
                            font={"font-semibold"}
                            linkTo={`/booking/paket-wisata/${item.id_paket_wisata}`}
                        />
                    }
                />
            );
        });
    };

    const renderHomestay = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return homestay.slice(0, 4).map((item) => {
            const imgUrls = item.gambar.split(",");
            const imageTrim = imgUrls[0].trim();
            const imagePath = "http://127.0.0.1:8088/" + imageTrim;

            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;

            return (
                <CardAll
                    key={item.id_homestay}
                    img={imagePath}
                    title={item.nama}
                    titlePosition={"justify-start"}
                    smallTitle={"Jl. lorem ipsum dolor sit amet"}
                    price={hargaCurrency}
                    action={
                        <CustomButton
                            text={"Lihat Homestay"}
                            linkTo={`/homestay/detail/${item.id_homestay}`}
                            bgColor={"bg-primaryColor"}
                            font={"font-semibold"}
                        />
                    }
                />
            );
        });
    };

    const renderKegiatan = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MiniCardSkeleton key={index} />
                    ))}
                </>
            );
        }
        return kegiatan.slice(0, 4).map((item) => {
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

    const renderReview = () => {
        return review.map((item, index) => {
            const imagePath = "http://127.0.0.1:8088/" + item.profil;
            return (
                <div key={index} className="pb-2">
                    <Review
                        key={item.id_ulasan}
                        img={imagePath}
                        name={item.nama}
                        review={item.ulasan}
                    />
                </div>
            );
        });
    };

    const renderFaq = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 4 }, (_, index) => (
                        <FaqSkeleton key={index} />
                    ))}
                </>
            );
        }
        return faq.map((item) => (
            <Faq
                key={item.id_faq}
                question={item.pertanyaan}
                answer={item.jawaban}
            />
        ));
    };

    const scrollInto = useRef(null);
    const handleButtonClick = (event) => {
        event.preventDefault();
        scrollInto.current.scrollIntoView({ behavior: "smooth" });
    };

    console.log(document.cookie);

    return (
        <div>
            <Head>
                <title>Home</title>
                <meta name="" content="" />
            </Head>
            <Navbar4 />
            <a
                href="https://wa.me/6288225208880"
                className="fixed bottom-10 right-10 bg-primaryColor rounded-full p-4 z-10"
            >
                <IconBrandWhatsapp className="text-white w-10 h-10" />
            </a>
            <div className="bg-white min-h-screen relative mb-14 md:mb-16 lg:mb-24">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="relative z-10 lg:col-span-7 mx-7 md:mx-20 mt-40 md:mt-20 ">
                        <h1 className="mb-4 font-bold tracking-tight text-h4 md:text-display xl:text-display text-white ">
                            Selamat Datang Di Desa Kajii
                        </h1>
                        <p className="mb-14 md:mb-20 font-medium tracking-tight text-p12 text-white md:text-h5 mr-2">
                            ISI DGN TAGLINE/LAINNYA. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Sequi, deserunt! Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Eos, quod.
                        </p>
                        <CustomButton
                            text={"Jelajahi Sekarang"}
                            bgColor={"bg-primaryColor"}
                            font={"font-bold"}
                            onClick={handleButtonClick}
                        />
                    </div>
                    <div className="absolute inset-0 z-0 lg:mt-0 lg:col-span-5 lg:flex lg:items-center">
                        <img
                            className="object-cover w-full h-full"
                            src={heroSection}
                            alt="mockup"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-12 md:mx-20 ">
                <div className="mb-20 md:mb-32" ref={scrollInto}>
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Apa Itu Desa Kajii?
                    </h2>
                    {loading ? (
                        <TextSkeleton />
                    ) : (
                        <p className="text-p18 md:text-h5 font-medium mb-5">
                            {profileDesc}
                        </p>
                    )}
                    <CustomButton
                        text={"Lihat Selengkapnya"}
                        linkTo={"/about"}
                        bgColor={"bg-primaryColor"}
                        font={"font-semibold"}
                    />
                </div>

                {/* <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Hanya Untuk Kamu!
                    </h2>
                    {renderPromo()}
                </div> */}

                <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Pilihan Kegiatan
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {renderKegiatan()}
                    </div>
                    <Link href="/kegiatan">
                        <h5 className="underline text-2xl tracking-tight font-bold text-primaryColor">
                            Lihat Lainnya
                        </h5>
                    </Link>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Pilihan Paket Wisata
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {renderPaketWisata()}
                    </div>
                    <Link href="/paket-wisata">
                        <h5 className="underline text-2xl tracking-tight font-bold text-primaryColor">
                            Lihat Lainnya
                        </h5>
                    </Link>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Pilihan Homestay
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {renderHomestay()}
                    </div>
                    <Link href="/homestay">
                        <h5 className="underline text-2xl tracking-tight font-bold text-primaryColor">
                            Lihat Lainnya
                        </h5>
                    </Link>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Ulasan Pengunjung
                    </h2>
                    <Slider {...settings}>{renderReview()}</Slider>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-h5 md:text-h2 font-bold mb-3 md:mb-8">
                        Pertanyaan Paling Sering Ditanyakan
                    </h2>
                    {renderFaq()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
