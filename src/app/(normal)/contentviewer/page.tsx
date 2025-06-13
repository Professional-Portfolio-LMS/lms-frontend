"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface ContentViewerProps {}

interface ContentItem {
  id: string;
  title: string;
  type: "video" | "pdf" | "document" | "slide";
  url: string;
  description?: string;
  duration?: string;
  size?: string;
}

export default function ContentViewer(props: ContentViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams ? searchParams.get("id") : null;

  const [content, setContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setTimeout(() => {
          setContent({
            id: contentId || "1",
            title: "Equations in Motion: Celebrating Diversity in Science",
            type: "video",
            url: "/videos/sample.mp4",
            description:
              "Dive into a visually stunning journey where mathematical equations come to life through dynamic animations overlaying scenes of diverse scientists in action. From calculating formulas to collecting field samples, this video celebrates the universal language of mathematics and its vital role across scientific disciplines. Witness the seamless integration of abstract theory and practical exploration as equations dance across the screen, highlighting the brilliance and diversity of minds shaping the future of science.",
            duration: "15:30",
            size: "120 MB",
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load content");
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case "video":
        return (
          <div className="w-full">
            <video
              controls
              className="w-full rounded-xl border border-gray-300 shadow-lg"
              poster={content.url}
            >
              <source src={content.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "pdf":
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
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="p-8 rounded-xl shadow-md max-w-6xl mx-auto w-full">
          <div className="text-center text-lg font-medium text-gray-700">
            Loading content...
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="p-8 rounded-xl shadow-md max-w-6xl mx-auto w-full">
          <div className="text-center text-red-600">
            {error || "Content not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center py-6 sm:px-6 lg:px-8 bg-gray-50">
      <div className="p-8 rounded-2xl shadow-md max-w-6xl mx-auto w-full space-y-6">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm">
            ← Back to Hom6
          </Link>
        </div>

        <h1 className="text-center text-3xl font-bold mt-10 text-blue-900">
          {content.title}
        </h1>

        <div className="border-t pt-4 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
            {/* <span className="capitalize">Type: {content.type}</span>
            {content.duration && <span>Duration: {content.duration}</span>}
            {content.size && <span>Size: {content.size}</span>} */}
          </div>
          {content.description && (
            <p className="text-gray-700 text-justify">{content.description}</p>
          )}
        </div>

        <div className="flex justify-center">{renderContent()}</div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => window.open(content.url, "_blank")}
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
  );
}
