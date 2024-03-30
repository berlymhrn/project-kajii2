import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function Faq({ question, answer }) {
    return (
        <div className="w-full px-4 pt-2">
            <div className="w-full max-w-full rounded-2xlp-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primaryColor p-4 text-left text-p12 md:text-h5 font-medium text-white ">
                                <span>{question}</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-7 w-7 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-p12 md:text-p18 font-medium text-gray-700">
                                {answer}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}

export default Faq;
