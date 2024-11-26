// Annguyen
'use client';

import axios from 'axios';
import { Banner, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

export function ResetPassword() {
    // Email người dùng quên mật khẩu
    const [email, setEmail] = useState('');
    // Hiển thị lỗi
    const [errorMessage, setErrorMessage] = useState('');
    // loading khi bất đồng bộ
    const [isLoading, setIsLoading] = useState(false);

    // Hàm gọi api xử lý send otp
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Bật loading bất đồng bộ
        setIsLoading(true);

        try {
            // Gọi api, send email người dùng nhập
            const response = await axios.post('http://localhost:8080/login/forgot-password', { email });

            console.log(response);
            
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please check your network connection or try again later.');
        } finally {
            setIsLoading(false);
            setErrorMessage('');
        }
    };

    return (
        <div className="">
            <div className="flex w-full items-center justify-between bg-cover h-[100vh] bg-center bg-no-repeat bg-[url('https://cdn.viettablet.com/images/news/62/mang-xa-hoi-la-gi-1.jpg')] border-b border-gray-200 bg-gray-50 p-4  dark:border-gray-600 dark:bg-gray-700 ">
                <div className="mx-auto flex w-full shrink-0 items-center  sm:w-auto flex-col ">
                    <form className="flex w-full flex-col items-center md:flex-row md:gap-x-3" onSubmit={handleSubmit}>
                        <Label
                            htmlFor="email"
                            className="mb-2 mr-auto shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400 md:m-0 md:mb-0"
                        >
                            Nhập username
                        </Label>
                        <TextInput
                            id="email"
                            placeholder="Enter your email"
                            // Xử lý ghi lại email khi người dùng nhập
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                            // Khi bất đồng bộ đang xử lý -> disable
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading}>
                            Submit
                        </Button>
                    </form>
                    {/* nếu có lỗi -> hiển thị ra  */}
                    {errorMessage && (
                        <div className="mt-4 text-center bg-red-200 text-red-500 dark:text-red-400">{errorMessage}</div>
                    )}
                </div>
                <Banner.CollapseButton
                    color="gray"
                    className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
                >
                    <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
            </div>
        </div>
    );
}
