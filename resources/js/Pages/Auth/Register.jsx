import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import { Link } from "@inertiajs/react";

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-gray-100">
            <div className="w-full sm:max-w-md mt-0 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div>
                    <form>
                        <div>
                            <h5 className="w-full mb-6 font-bold text-h5 flex justify-center">
                                Register
                            </h5>
                        </div>

                        <div>
                            <InputLabel
                                labelText="Nama"
                                htmlFor="name"
                                value="Name"
                            />

                            <TextInput
                                id="name"
                                name="name"
                                // value={data.name}
                                className="mt-1 block w-full"
                                // autoComplete="name"
                                // isFocused={true}
                                // onChange={(e) =>
                                //     setData("name", e.target.value)
                                // }
                                // required
                            />

                            {/* <InputError
                                message={errors.name}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                labelText="Email"
                                htmlFor="password"
                                value="Password"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                // value={data.password}
                                className="mt-1 block w-full"
                                // autoComplete="new-password"
                                // onChange={(e) =>
                                //     setData("password", e.target.value)
                                // }
                                // required
                            />

                            {/* <InputError
                                message={errors.password}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                labelText="Telephone"
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                // value={data.password_confirmation}
                                className="mt-1 block w-full"
                                // autoComplete="new-password"
                                // onChange={(e) =>
                                //     setData(
                                //         "password_confirmation",
                                //         e.target.value
                                //     )
                                // }
                                // required
                            />

                            {/* <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                labelText="Password"
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                // value={data.password_confirmation}
                                className="mt-1 block w-full"
                                // autoComplete="new-password"
                                // onChange={(e) =>
                                //     setData(
                                //         "password_confirmation",
                                //         e.target.value
                                //     )
                                // }
                                // required
                            />

                            {/* <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                labelText="Ulang Password"
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                // value={data.password_confirmation}
                                className="mt-1 block w-full"
                                // autoComplete="new-password"
                                // onChange={(e) =>
                                //     setData(
                                //         "password_confirmation",
                                //         e.target.value
                                //     )
                                // }
                                // required
                            />

                            {/* <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-10">
                            <CustomButton
                                className="flex w-full items-center justify-center bg-primaryColor"
                                // disabled={processing}
                                text={"REGISTER"}
                                bgColor={"bg-primaryColor"}
                            />

                            <Link
                                // href={route("register")}
                                className="flex w-full mt-2 items-center justify-center underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sudah memiliki akun?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
