import React, { useState, useEffect } from "react";
import CardAll from "@/Components/CardAll";
import CustomButton from "@/Components/CustomButton";
import MiniCardSkeleton from "@/Components/loading/MiniCardSkeleton";
import DesaKajii from "@/services/DesaKajii";
import Navbar4 from "@/Components/Navbar4";

function Index() {
    const [homestay, setHomestay] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const homestayResponse = await DesaKajii.get("/homestay");
                setHomestay(homestayResponse.data.homestay);

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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
        return homestay.map((item) => {
            const imgUrls = item.gambar.split(",");
            const imageTrim = imgUrls[0].trim();

            const hargaFormatted = item.harga.toLocaleString("id-ID");
            const hargaCurrency = `IDR ${hargaFormatted}`;
            return (
                <CardAll
                    key={item.id_homestay}
                    img={imageTrim}
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

    return (
        <div>
            <Navbar4 />

            <div className="mx-12 md:mx-20 ">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 flex justify-center mb-12 md:mb-16">
                    HOMESTAY
                </h1>
                <div className="flex flex-wrap gap-3">{renderHomestay()}</div>
            </div>
        </div>
    );
}

export default Index;
