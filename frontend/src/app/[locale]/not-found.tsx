import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sam-gray-100 mb-5">
                    <span className="text-2xl font-bold text-sam-gray-400">404</span>
                </div>
                <h2 className="text-xl font-bold text-sam-gray-900 mb-2">الصفحة غير موجودة</h2>
                <p className="text-sm text-sam-gray-500 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
                <Link
                    href="/"
                    className="inline-flex px-6 py-2.5 rounded-xl bg-sam-red text-white text-sm font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
                >
                    العودة للرئيسية
                </Link>
            </div>
        </div>
    );
}
