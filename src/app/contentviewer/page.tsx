"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ContentViewerProps {
  // Add any props you might need
}

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'document' | 'slide';
  url: string;
  description?: string;
  duration?: string;
  size?: string;
}

export default function ContentViewer(props: ContentViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams ? searchParams.get('id') : null;
  
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch content details based on ID
    const fetchContent = async () => {
      try {
        // API call would go here
        // const response = await fetch(`/api/content/${contentId}`);
        // const data = await response.json();
        // setContent(data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setContent({
            id: contentId || '1',
            title: 'Sample Video Content',
            type: 'video',
            url: '/api/placeholder/800/450',
            description: 'This is a sample video content for demonstration purposes.',
            duration: '15:30',
            size: '120 MB'
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load content');
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case 'video':
        return (
          <div className="w-full">
            <video 
              controls 
              className="w-full rounded-lg"
              poster={content.url}
            >
              <source src={content.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div className="w-full">
            <iframe
              src={content.url}
              className="w-full h-96 rounded-lg border"
              title={content.title}
            />
          </div>
        );
      default:
        return (
          <div className="w-full">
            <img 
              src={content.url} 
              alt={content.title}
              className="w-full rounded-lg"
            />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto w-full">
          <div className="text-center">Loading content...</div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto w-full">
          <div className="text-center text-red-600">{error || 'Content not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto w-full">
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
          Content Viewer
        </h1>

        <div className="space-y-6">
          {/* Content Info */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-medium mb-2">{content.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="capitalize">Type: {content.type}</span>
              {content.duration && <span>Duration: {content.duration}</span>}
              {content.size && <span>Size: {content.size}</span>}
            </div>
            {content.description && (
              <p className="mt-2 text-gray-700">{content.description}</p>
            )}
          </div>

          {/* Content Display */}
          <div className="flex justify-center">
            {renderContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.open(content.url, '_blank')}
              className="bg-blue-900 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-800 transition"
            >
              Open in New Tab
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}