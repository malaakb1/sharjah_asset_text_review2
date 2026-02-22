export default function Loading() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-sam-gray-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sam-red animate-spin" />
                </div>
                <p className="text-sm font-medium text-sam-gray-500 animate-pulse">
                    جارٍ التحميل...
                </p>
            </div>
        </div>
    );
}
