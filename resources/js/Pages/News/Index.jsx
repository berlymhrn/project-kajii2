import React, { useState, useEffect } from "react";
import CardTransaksi from "@/Components/CardTransaction";
import CustomButton from "@/Components/CustomButton";
import CardTransSkeleton from "@/Components/loading/CardTransSkeleton";
import DesaKajii from "@/services/DesaKajii";
import NoData from "../../../../public/assets/noData.png";
import Navbar4 from "@/Components/Navbar4";
import Footer from "@/Components/Footer";


function Index() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get("/artikel");
                setNews(response.data.artikel);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderNews = () => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }, (_, index) => (
                        <CardTransSkeleton key={index} />
                    ))}
                </>
            );
        } else if (news.length === 0) {
            return <img src={NoData} alt="No data" />;
        } else {
            return news.map((item) => {
                const imgUrls = item.gambar.split(",");
                const imageTrim = imgUrls[0].trim();
                const imagePath = "http://localhost:8088/" + imageTrim;

                const dateParts = item.dibuat.split("-");
                const formattedDate = `${dateParts[2]}-${
                    dateParts[1]
                }-20${dateParts[0].slice(2)}`;

                return (
                    <CardTransaksi
                        key={item.id_artikel}
                        img={imagePath}
                        header={item.judul}
                        time={formattedDate}
                        title={item.deskripsi}
                        titleTruncatedFont={"font-medium"}
                        action={
                            <div>
                                <CustomButton
                                    text={"Lanjut membaca"}
                                    linkTo={`/artikel/${item.id_artikel}`}
                                    bgColor={"bg-primaryColor"}
                                    font={"font-bold"}
                                />
                            </div>
                        }
                    />
                );
            });
        }
    };

    return (
        <div>
            <Navbar4 />
            <div className="mx-12 md:mx-20 ">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                    Berita & Artikel
                </h1>
                <div className="flex flex-wrap gap-3 mb-2">{renderNews()}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
