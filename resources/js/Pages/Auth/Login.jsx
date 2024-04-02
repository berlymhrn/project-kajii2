import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import { Link } from "@inertiajs/react";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-gray-100">
            <div className="w-full sm:max-w-md mt-0 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div>
                    <form>
                        <div>
                            <h5 className="w-full mb-6 font-bold text-h5 flex justify-center">
                                Login
                            </h5>
                        </div>

                        <div>
                            <InputLabel
                                labelText="Email"
                                // htmlFor="email"
                                // value="Email"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                // value={data.email}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                // isFocused={true}
                                // onChange={(e) =>
                                //     setData("email", e.target.value)
                                // }
                            />

                            {/* <InputError
                                message={errors.email}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                labelText="Password"
                                // htmlFor="password"
                                // value="Password"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                // value={data.password}
                                className="mt-1 block w-full"
                                // autoComplete="current-password"
                                // onChange={(e) =>
                                //     setData("password", e.target.value)
                                // }
                            />

                            {/* <InputError
                                message={errors.password}
                                className="mt-2"
                            /> */}

                            {/* {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )} */}
                        </div>

                        {/* <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div> */}

                        <div className="mt-10">
                            <CustomButton
                                className="flex w-full items-center justify-center bg-primaryColor"
                                // disabled={processing}
                                text={"LOGIN"}
                                bgColor={"bg-primaryColor"}
                            />

                            <Link
                                // href={route("register")}
                                className="flex w-full mt-2 items-center justify-center underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Belum memiliki akun?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
