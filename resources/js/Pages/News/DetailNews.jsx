import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import DesaKajii from "@/services/DesaKajii";
import { IconChevronLeft } from "@tabler/icons-react";
import TextSkeleton from "@/Components/loading/TextSkeleton";

function DetailNews() {
    const { props } = usePage();
    const { id } = props;
    const [detailNews, setDetailNews] = useState({});
    const [recomendation, setRecomendation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const response = await DesaKajii.get(`/artikel/${id}`);
                setDetailNews(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchRecomendation = async () => {
            try {
                const responseRecomendation = await DesaKajii.get("/artikel");
                const recomendation = responseRecomendation.data;

                setRecomendation(recomendation.artikel);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecomendation();
    }, []);

    const dateParts = detailNews.dibuat ? detailNews.dibuat.split("-") : [];
    const formattedDate =
        dateParts.length === 3
            ? `${dateParts[2]}-${dateParts[1]}-20${dateParts[0].slice(2)}`
            : "";

            const renderRecomendation = () => {
                const sortedRecomendation = [...recomendation].sort((a, b) => b.id_artikel - a.id_artikel); // mengurutkan array recomendasi berdasarkan id terbaru
                const latestNewsList = sortedRecomendation.slice(0, 5);
                return latestNewsList.map((latestNews) => {
                    const imgUrls = latestNews.gambar.split(",");
                    const imageTrim = imgUrls[0].trim();
                    const dateParts = latestNews.dibuat.split("-");
                    const formattedDate = `${dateParts[2]}-${dateParts[1]}-20${dateParts[0].slice(2)}`;

                    return (
                        <div key={latestNews.id_artikel}>
                            <a
                                className="group flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                href={`/artikel/${latestNews.id_artikel}`}
                            >
                                <span className="block w-28 h-16 rounded-lg bg-gray-200 group-hover:bg-white/20">
                                    <img
                                        className="object-cover w-full h-full rounded-lg"
                                        src={imageTrim}
                                        alt="Image Description"
                                    />
                                </span>
                                <span className="flex flex-col">
                                    <span className="text-p16 font-medium text-gray-800">
                                        {latestNews.judul}
                                    </span>
                                    <span className="text-p12 font-medium text-gray-500">
                                        {formattedDate}
                                    </span>
                                </span>
                            </a>
                        </div>
                    );
                });
            };


    return (
        <div className="max-w-[85rem] sm:px-6 lg:px-8 mx-12 md:mx-20 ">
            <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
                <div className="lg:col-span-2">
                    <div className="py-8 lg:pe-8">
                        <div className="space-y-5 lg:space-y-8">
                            <a
                                className="inline-flex items-center gap-x-1.5 text-p18 text-gray-600 decoration-2 hover:underline decoration-primaryColor"
                                href="/artikel"
                            >
                                <IconChevronLeft />
                                Kembali
                            </a>

                            {loading ? (
                                <div className="bg-gray-200 h-10 w-3/4 rounded-full animate-pulse"></div>
                            ) : (
                                <h1 className="text-h3 tracking-tight font-bold md:text-h1">
                                    {detailNews.judul}
                                </h1>
                            )}

                            <div className="flex items-center gap-x-5">
                                {loading ? (
                                    <div className="bg-gray-200 h-5 w-1/4 rounded-full animate-pulse"></div>
                                ) : (
                                    detailNews.dibuat && (
                                        <div>
                                            <p className="text-p16 text-gray-800">
                                                {formattedDate}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="text-center">
                                <div className="grid lg:grid-cols-2 gap-3">
                                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                        <figure className="relative w-full h-60">
                                            {loading || !detailNews.gambar ? (
                                                <div className="bg-gray-200 w-full h-full rounded-xl animate-pulse"></div>
                                            ) : (
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                    src={
                                                        detailNews.gambar.split(
                                                            ","
                                                        )[0]
                                                    }
                                                    alt="Image Artikel/Berita"
                                                />
                                            )}
                                        </figure>

                                        <figure className="relative w-full h-60">
                                            {loading ||
                                            !detailNews.gambar ||
                                            !detailNews.gambar.split(",")[1] ? (
                                                <div className="bg-gray-200 w-full h-full rounded-xl animate-pulse"></div>
                                            ) : (
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                    src={
                                                        detailNews.gambar.split(
                                                            ","
                                                        )[1]
                                                    }
                                                    alt="Image Artikel/Berita"
                                                />
                                            )}
                                        </figure>
                                    </div>
                                    <figure className="relative w-full h-72 sm:h-96 lg:h-full">
                                        {loading ||
                                        !detailNews.gambar ||
                                        !detailNews.gambar.split(",")[2] ? (
                                            <div className="bg-gray-200 w-full h-full rounded-xl animate-pulse"></div>
                                        ) : (
                                            <img
                                                className="size-full absolute top-0 start-0 object-cover rounded-xl "
                                                src={
                                                    detailNews.gambar.split(
                                                        ","
                                                    )[2]
                                                }
                                                alt="Image Artikel/Berita"
                                            />
                                        )}
                                    </figure>
                                </div>
                            </div>

                            {loading ? (
                                <TextSkeleton />
                            ) : (
                                <p className="font-medium text-p18 md:text-h5">
                                    {detailNews.deskripsi}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-28 md:mt-64">
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="text-p18 md:text-h5 font-bold text-gray-800">
                            Baca Berita & Artikel Lainnya
                        </h3>

                        <div className="mt-6 space-y-6">
                            {renderRecomendation()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailNews;
