import React from "react";

function Payment() {
    const radios = [
        {
            name: "Pembayaran Depan Muka",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 20 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-cash"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                    <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
            ),
        },
        {
            name: "Mandiri",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                />
            ),
        },
        {
            name: "BCA",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                />
            ),
        },
        {
            name: "BNI",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                />
            ),
        },
        {
            name: "BRI",
            icon: (
                <img
                    alt="logo bank"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png"
                />
            ),
        },
        {
            name: "QRIS",
            icon: (
                <img
                    alt="logo bank"
                    src="https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png"
                />
            ),
        },
    ];
    return (
        <div className="min-h-screen px-4 md:px-12 lg:px-20">
            <h2 className="text-h3 md:text-h2 text-gray-800 font-semibold text-center">
                Pilih Metode Pembayaran
            </h2>
            <ul className="mt-6 space-y-3 w-full">
                {radios.map((item, idx) => (
                    <li key={idx}>
                        <label htmlFor={item.name} className="block relative">
                            <input
                                id={item.name}
                                type="radio"
                                defaultChecked={idx === 1}
                                name="payment"
                                className="sr-only peer"
                            />
                            <div className="w-full flex gap-x-3 items-start p-8 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                                <div className="flex-none w-20 h-6">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="leading-none text-gray-800 text-p18 md:text-h5 font-bold ml-8">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                            <div className="absolute top-8 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200"></div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Payment;
