import React from "react";

function BookingDetail() {
    return (
        <div>
            {/* Invoice */}
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-12 md:mx-20 my-4 sm:my-10">
                {/* Grid */}
                <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200">
                    <div>
                        <h2 className="text-h5 md:text-h3 font-semibold">
                            Detail Pemesanan
                        </h2>
                    </div>
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-3">
                    <div>
                        <div className="grid space-y-3">
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Nama Pemesan:
                                </dt>
                                <dd className="text-gray-800">
                                    <a
                                        className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                                        href="#"
                                    >
                                        sara@site.com
                                    </a>
                                </dd>
                            </dl>
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Tanggal Lahir
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    10 Jan 2023
                                </dd>
                            </dl>
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Alamat
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    <address className="not-italic font-normal">
                                        280 Suzanne Throughway,
                                        <br />
                                        Breannabury, OR 45801,
                                        <br />
                                        United States
                                        <br />
                                    </address>
                                </dd>
                            </dl>
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Nomer Kontak:
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    ADUQ2189H1-0038
                                </dd>
                            </dl>
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Email:
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    USD - US Dollar
                                </dd>
                            </dl>
                        </div>
                    </div>
                    {/* Col */}
                    <div>
                        <div className="grid space-y-3">
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Tanggal Pemesanan:
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    10 Jan 2023
                                </dd>
                            </dl>
                            <dl className="grid sm:flex gap-x-3 text-sm">
                                <dt className="min-w-36 max-w-[200px] text-gray-500">
                                    Tanggal Check In:
                                </dt>
                                <dd className="font-medium text-gray-800">
                                    Send invoice
                                </dd>
                            </dl>
                        </div>
                    </div>
                    {/* Col */}
                </div>
                {/* End Grid */}
                {/* Table */}
                <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                    <div class="hidden sm:grid sm:grid-cols-5">
                        <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                            Item
                        </div>
                        <div class="text-start text-xs font-medium text-gray-500 uppercase">
                            Qty
                        </div>
                        <div class="text-start text-xs font-medium text-gray-500 uppercase">
                            Rate
                        </div>
                        <div class="text-end text-xs font-medium text-gray-500 uppercase">
                            Amount
                        </div>
                    </div>

                    <div class="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div class="col-span-full sm:col-span-2">
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Item
                            </h5>
                            <p class="font-medium text-gray-800 dark:text-gray-200">
                                Design UX and UI
                            </p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Qty
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">1</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Rate
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">5</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Amount
                            </h5>
                            <p class="sm:text-end text-gray-800 dark:text-gray-200">
                                $500
                            </p>
                        </div>
                    </div>

                    <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div class="col-span-full sm:col-span-2">
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Item
                            </h5>
                            <p class="font-medium text-gray-800 dark:text-gray-200">
                                Web project
                            </p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Qty
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">1</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Rate
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">24</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Amount
                            </h5>
                            <p class="sm:text-end text-gray-800 dark:text-gray-200">
                                $1250
                            </p>
                        </div>
                    </div>

                    <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div class="col-span-full sm:col-span-2">
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Item
                            </h5>
                            <p class="font-medium text-gray-800 dark:text-gray-200">
                                SEO
                            </p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Qty
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">1</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Rate
                            </h5>
                            <p class="text-gray-800 dark:text-gray-200">6</p>
                        </div>
                        <div>
                            <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Amount
                            </h5>
                            <p class="sm:text-end text-gray-800 dark:text-gray-200">
                                $2000
                            </p>
                        </div>
                    </div>
                </div>
                {/* End Table */}
                {/* Flex */}
                <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl sm:text-end space-y-2">
                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">
                                    Subotal:
                                </dt>
                                <dd className="col-span-2 font-medium text-gray-800">
                                    $2750.00
                                </dd>
                            </dl>
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">
                                    Total:
                                </dt>
                                <dd className="col-span-2 font-medium text-gray-800">
                                    $2750.00
                                </dd>
                            </dl>
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">
                                    Tax:
                                </dt>
                                <dd className="col-span-2 font-medium text-gray-800">
                                    $39.00
                                </dd>
                            </dl>
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">
                                    Amount paid:
                                </dt>
                                <dd className="col-span-2 font-medium text-gray-800">
                                    $2789.00
                                </dd>
                            </dl>
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">
                                    Due balance:
                                </dt>
                                <dd className="col-span-2 font-medium text-gray-800">
                                    $0.00
                                </dd>
                            </dl>
                        </div>
                        {/* End Grid */}
                    </div>
                </div>
                {/* End Flex */}
            </div>
            {/* End Invoice */}
        </div>
    );
}

export default BookingDetail;
