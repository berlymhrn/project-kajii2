import React, { useState, useEffect } from "react";
import TimelineComponent from "@/Components/Timeline";
import DesaKajii from "@/services/DesaKajii";
import TextSkeleton from "@/Components/loading/TextSkeleton";
import TimelineSkeleton from "@/Components/loading/TimelineSkeleton";

function Index() {
    const [profileDesc, setProfileDesc] = useState(""); //string kosong karena langsung mengambil deskripsi saja
    const [timeline, setTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get("/profile");
                const data = response.data;

                setProfileDesc(data.profile.deskripsi);
                setTimeline(data.timeline);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderTimeline = () => {
        if (isLoading) {
            return (
                <>
                    {Array.from({ length: 4 }, (_, index) => (
                        <TimelineSkeleton key={index} />
                    ))}
                </>
            );
        }
        return timeline.map((item) => {
            const dateParts = item.tanggal.split("-");
            const bulan = {
                "01": "Januari",
                "02": "Februari",
                "03": "Maret",
                "04": "April",
                "05": "Mei",
                "06": "Juni",
                "07": "Juli",
                "08": "Agustus",
                "09": "September",
                10: "Oktober",
                11: "November",
                12: "Desember",
            };
            const formattedDate = `${dateParts[2]} ${
                bulan[dateParts[1]]
            } 20${dateParts[0].slice(2)}`;
            return (
                <TimelineComponent
                    key={item.id_timeline}
                    title={item.judul}
                    date={formattedDate}
                    description={item.deskripsi}
                    imgSrc={item.gambar}
                />
            );
        });
    };

    return (
        <div className="mx-12 md:mx-20 ">
            <h1 className="font-bold text-h2 md:text-h1 mt-20 text-center mb-12 md:mb-16">
                Tentang Kami
            </h1>
            {isLoading ? (
                <TextSkeleton />
            ) : (
                <p className="font-medium text-p18 md:text-h5 mb-20 md:mb-32">
                    {profileDesc}
                </p>
            )}
            <h2 className="font-bold text-h2 mb-12 md:mb-16">Timeline</h2>
            <ol className="relative border-s border-primaryColor">
                {renderTimeline()}
            </ol>
        </div>
    );
}

export default Index;
