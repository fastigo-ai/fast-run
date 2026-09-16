import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { api } from '@/lib/api';

interface ResumeUploadAreaProps {
  value?: string;
  fileName?: string;
  onChange: (url: string, fileName: string) => void;
  onRemove?: () => void;
}

export const ResumeUploadArea: React.FC<ResumeUploadAreaProps> = ({
  value,
  fileName,
  onChange,
  onRemove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showConfigTip, setShowConfigTip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cloudinary credentials status
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const isConfigured = Boolean(
    cloudName &&
    cloudName !== 'your_cloud_name'
  );

  /**
   * Flow implementation:
   * A: Applicant selects/drops resume file
   * B: Backend validates file type (.pdf, .docx, .doc) and size (<= 10MB)
   * C -> D: If invalid, backend responds with 400 Bad Request, caught here and displayed
   * C -> E: If valid, backend uploads to Cloudinary and returns secure resume_url
   */
  const handleFile = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(15);

    // Smooth progress simulation while backend validates and uploads to Cloudinary
    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) return 85;
        return prev + 15;
      });
    }, 180);

    try {
      // Step B, C, E: Send file to backend endpoint for type/size validation and Cloudinary upload
      const result = await api.applications.uploadResume(file);

      clearInterval(progressTimer);
      setUploadProgress(100);

      // Successfully validated and uploaded to Cloudinary
      onChange(result.resume_url, result.file_name || file.name);
    } catch (err: any) {
      clearInterval(progressTimer);
      console.error('Resume upload error from backend:', err);
      // Step D: Show upload error
      setUploadError(
        err.message || 'File validation failed on server. Please upload a valid PDF or DOC under 10MB.'
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange('', '');
    }
  };

  return (
    <div className="space-y-2">
      {/* Field Label Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Resume / Curriculum Vitae (CV) *
        </label>
        
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              isConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-sky-50 text-[#0070AD] border-sky-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {isConfigured ? 'Cloudinary Live' : 'Cloudinary Ready'}
          </span>

          <button
            type="button"
            onClick={() => setShowConfigTip(!showConfigTip)}
            className="text-slate-400 hover:text-[#0070AD] transition-colors"
            title="Cloudinary Setup Info"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cloudinary Setup Drawer Tip */}
      {showConfigTip && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1 animate-fade-in">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <span>Cloudinary Credentials Setup</span>
          </p>
          <p className="text-[11px] text-slate-500">
            You can drop your Cloudinary credentials into your root <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[10px]">.env</code> file:
          </p>
          <div className="bg-slate-900 text-sky-300 p-2 rounded-lg font-mono text-[10px] select-all overflow-x-auto">
            VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name<br />
            VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
          </div>
          <p className="text-[10px] text-slate-400">
            Uploads will automatically route to your Cloudinary storage once populated.
          </p>
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleManualSelect}
        className="hidden"
      />

      {/* Upload Box or Completed State */}
      {!value ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl p-6 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${
            isDragging
              ? 'border-[#0070AD] bg-sky-50/70 scale-[1.01]'
              : 'border-slate-200 bg-slate-50/70 hover:border-[#0070AD]/60 hover:bg-slate-50'
          }`}
        >
          {isUploading ? (
            <div className="py-2 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#0070AD] animate-spin" />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Uploading to Cloudinary... ({uploadProgress}%)
                </p>
                <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#0070AD] rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-[#0070AD] mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                <span className="text-[#0070AD] underline underline-offset-2">Click to upload</span> or drag and drop resume
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Supports PDF, DOCX, DOC, PNG, JPG (Max file size: 10MB)
              </p>
            </>
          )}
        </div>
      ) : (
        /* Uploaded File Pill Card */
        <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-xs flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {fileName || 'Uploaded_Resume.pdf'}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-sm">
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-[#0070AD] hover:bg-sky-50 rounded-lg transition-colors"
              title="Preview / View Resume"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Remove resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadArea;
