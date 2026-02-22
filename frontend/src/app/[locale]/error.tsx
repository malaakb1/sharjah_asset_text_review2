"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-5">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-sam-gray-900 mb-2">حدث خطأ</h2>
                <p className="text-sm text-sam-gray-500 mb-6">عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-2.5 rounded-xl bg-sam-red text-white text-sm font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25 cursor-pointer"
                >
                    حاول مرة أخرى
                </button>
            </div>
        </div>
    );
}
