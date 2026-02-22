"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
    CloudUpload,
    FileText,
    Trash2,
} from "lucide-react";
import type { SimulatedFile } from "@/data/submissionCriteria";

interface FileUploadAreaProps {
    files: SimulatedFile[];
    onChange: (files: SimulatedFile[]) => void;
    maxFiles: number;
}

const ACCEPTED_TYPES = ".pdf,.pptx,.docx,.xlsx,.jpg,.jpeg,.png";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUploadArea({ files, onChange, maxFiles }: FileUploadAreaProps) {
    const t = useTranslations("submission");
    const inputRef = useRef<HTMLInputElement>(null);
    const isAtLimit = maxFiles > 0 && files.length >= maxFiles;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;

        const newFiles: SimulatedFile[] = [];
        for (let i = 0; i < selected.length; i++) {
            const file = selected[i];
            if (file.size > MAX_FILE_SIZE) continue;
            if (maxFiles > 0 && files.length + newFiles.length >= maxFiles) break;

            newFiles.push({
                id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
                name: file.name,
                size: file.size,
                type: file.type,
            });
        }

        onChange([...files, ...newFiles]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleRemove = (id: string) => {
        onChange(files.filter((f) => f.id !== id));
    };

    return (
        <div className="space-y-3">
            {!isAtLimit && (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="w-full border-2 border-dashed border-sam-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-sam-red/40 hover:bg-sam-red-light/30 transition-all cursor-pointer"
                >
                    <CloudUpload className="w-8 h-8 text-sam-gray-400" />
                    <span className="text-sm font-medium text-sam-gray-600">{t("criteria.dragDropText")}</span>
                    <span className="text-xs text-sam-gray-400">{t("criteria.acceptedTypes")}</span>
                    {maxFiles > 0 && (
                        <span className="text-xs text-sam-gray-400">
                            {files.length} / {maxFiles}
                        </span>
                    )}
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                multiple
                className="hidden"
                onChange={handleFileSelect}
            />

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 bg-sam-gray-50 rounded-lg px-3 py-2.5 border border-sam-gray-100"
                        >
                            <FileText className="w-5 h-5 text-sam-gray-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-sam-gray-700 truncate">{file.name}</p>
                                <p className="text-xs text-sam-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(file.id)}
                                className="p-1.5 text-sam-gray-400 hover:text-sam-red transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
