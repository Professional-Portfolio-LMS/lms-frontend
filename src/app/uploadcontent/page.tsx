"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface UploadContentProps {
  courseId?: string;
}

interface UploadFile {
  file: File;
  preview?: string;
  type: 'video' | 'pdf' | 'document' | 'slide';
}

export default function UploadContent(props: UploadContentProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<'video' | 'pdf' | 'document' | 'slide'>('video');
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const fileType = getFileType(file);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setUploadedFiles(prev => [...prev, {
          file,
          preview: event.target?.result as string,
          type: fileType
        }]);
      };
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        setUploadedFiles(prev => [...prev, {
          file,
          type: fileType
        }]);
      }
    });
  };

  const getFileType = (file: File): 'video' | 'pdf' | 'document' | 'slide' => {
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.includes('presentation') || file.name.includes('.ppt')) return 'slide';
    return 'document';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      setError('Please upload at least one file');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // API call would go here
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('description', description);
      // formData.append('contentType', contentType);
      // uploadedFiles.forEach((uploadFile, index) => {
      //   formData.append(`files[${index}]`, uploadFile.file);
      // });
      
      // const response = await fetch('/api/upload-content', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // if (!response.ok) throw new Error('Upload failed');
      
      // Simulate upload for demonstration
      setTimeout(() => {
        setSuccess(true);
        setIsUploading(false);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
    }
  };

  const getAcceptedFileTypes = () => {
    switch (contentType) {
      case 'video':
        return 'video/*';
      case 'pdf':
        return '.pdf';
      case 'slide':
        return '.ppt,.pptx,.odp';
      default:
        return '.doc,.docx,.txt,.odt';
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto w-full">
        {/* Logo will be placed here - leave comment for manual placement */}
        {/* <div className="flex justify-center mb-6">
          <Image 
            src="/path-to-your-logo.png" 
            alt="Logo" 
            width={120} 
            height={80}
          />
        </div> */}
        
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-center text-2xl font-semibold mb-6">
          Upload Content to Course
        </h1>

        {success ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Upload successful!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your content has been uploaded successfully.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-sm font-medium text-green-800 hover:text-green-600"
                  >
                    Back to Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Content Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter content title"
              />
            </div>

            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={contentType}
                onChange={(e) => setContentType(e.target.value as typeof contentType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF Document</option>
                <option value="slide">Presentation/Slides</option>
                <option value="document">Document</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter content description"
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Files
              </label>
              <input
                id="file"
                name="file"
                type="file"
                multiple
                accept={getAcceptedFileTypes()}
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: {getAcceptedFileTypes()}
              </p>
            </div>

            {/* File Preview */}
            {uploadedFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((uploadFile, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center space-x-3">
                        {uploadFile.preview && (
                          <img 
                            src={uploadFile.preview} 
                            alt="Preview" 
                            className="h-12 w-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">{uploadFile.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {uploadFile.type} • {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isUploading || uploadedFiles.length === 0}
                className="w-full bg-blue-900 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Content'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}