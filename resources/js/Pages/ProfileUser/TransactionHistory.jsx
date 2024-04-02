import React, { useState, useEffect } from "react";
import CardTransaksi from "@/Components/CardTransaction";
import CustomButton from "@/Components/CustomButton";

function TransactionHistory() {
    return (
        <div className="mx-12 md:mx-20">
            <div className="mb-20 md:mb-32">
                <h1 className="font-bold text-h2 md:text-h1 mt-20 flex justify-center mb-12 md:mb-16">
                    History Transaksi
                </h1>
                <div className="flex flex-wrap gap-3">
                    <CardTransaksi
                        img={Profile2}
                        header={"Transaksi"}
                        time={"12 Desember 2012"}
                        title={"1.000.000"}
                        titleTruncatedFont={"font-bold"}
                        smallTitle={"Sisa pembayaran : IDR 100.000"}
                        action={
                            <CustomButton
                                text={"Batal"}
                                bgColor={"bg-red-600"}
                                font={"font-medium"}
                            />
                        }
                        anotherAction={
                            <CustomButton
                                text={"DP"}
                                linkTo={"#"}
                                bgColor={"bg-primaryColor"}
                                font={"font-medium"}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory;
