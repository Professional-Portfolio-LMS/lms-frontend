'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/Badge"; 
import DataTable, { type Column } from '@/components/DataTable';
import {
  FileText, ClipboardList, ClipboardCopy, ClipboardPaste, NotebookPen, HelpCircle,
} from 'lucide-react';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
type GradeEntry = {
  activity: string;
  course: string;
  grade: string | number;
  remarks: string;
  subtext?: string;
};

type Sentiment = 'positive' | 'negative' | 'neutral';

type GradeWithSentiment = GradeEntry & {
  sentiment?: Sentiment;
};

type StudentGradeViewProps = {
  grades: GradeEntry[];
};

const getActivityIcon = (activity: string) => {
  const lower = activity.toLowerCase();
  if (lower.includes('assignment')) return <FileText className="inline-block mr-1 text-primary" size={35} />;
  if (lower.includes('quiz')) return <ClipboardList className="inline-block mr-1 text-primary" size={35} />;
  if (lower.includes('past paper')) return <ClipboardCopy className="inline-block mr-1 text-primary" size={35} />;
  if (lower.includes('model paper')) return <ClipboardPaste className="inline-block mr-1 text-primary" size={35} />;
  if (lower.includes('homework')) return <NotebookPen className="inline-block mr-1 text-primary" size={35} />;
  return <HelpCircle className="inline-block mr-1 text-muted-foreground" size={30} />;
};

const sentimentColorMap: Record<Sentiment, string> = {
  positive: "bg-green-200 text-green-800",
  negative: "bg-red-200 text-red-800",
  neutral: "bg-gray-200 text-gray-800",
};
const getGradeBadgeMeta = (grade: string | number) => {
  const raw = typeof grade === 'string' ? Number.parseFloat(grade) : grade;
  const score = raw;
  let scale = 100;

  if (score <= 10) {
    scale = 10;
  }

  const display = `${raw} / ${scale}`;

  if (score * (scale === 10 ? 10 : 1) >= 85) {
    return {
      className: 'bg-green-400 text-black',
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      display,
    };
  }if (score * (scale === 10 ? 10 : 1) >= 75) {
    return {
      className: 'bg-green-200 text-black',
      icon: <ThumbsUp className="w-4 h-4 mr-1" />,
      display,
    };
  }if (score * (scale === 10 ? 10 : 1) >= 65) {
    return {
      className: 'bg-yellow-300 text-black',
      icon: <AlertCircle className="w-4 h-4 mr-1" />,
      display,
    };
  }if (score * (scale === 10 ? 10 : 1) >= 55) {
    return {
      className: 'bg-orange-300 text-black',
      icon: <AlertTriangle className="w-4 h-4 mr-1" />,
      display,
    };
  }
    return {
      className: 'bg-red-300 text-black',
      icon: <ThumbsDown className="w-4 h-4 mr-1" />,
      display,
    };
};

const StudentGradeView: React.FC<StudentGradeViewProps> = ({ grades }) => {
  const [gradedData, setGradedData] = useState<GradeWithSentiment[]>(grades);

  useEffect(() => {
    async function classifyAll() {
      const classified = await Promise.all(
        grades.map(async (grade) => {
          const res = await fetch('/api/classify-sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remark: grade.remarks }),
          });
          const data = await res.json();
          return { ...grade, sentiment: data.sentiment as Sentiment };
        })
      );
      setGradedData(classified);
    }

    classifyAll();
  }, [grades]);

  const columns: Column[] = [
    { header: '', accessor: (row: GradeWithSentiment) => getActivityIcon(row.activity) },
    {
      header: 'Activity',
      accessor: (row: GradeWithSentiment) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.activity}</span>
          {row.subtext && <span className="text-xs text-muted-foreground">{row.subtext}</span>}
        </div>
      ),
    },
    {
      header: 'Course',
      accessor: (row: GradeWithSentiment) => (
        <span className="font-semibold text-[#00173d]">{row.course}</span>
      ),
    },
    {
      header: 'Grade',
      accessor: (row: GradeWithSentiment) => {
        const { className, icon, display } = getGradeBadgeMeta(row.grade);
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm ${className}`}>
            {icon}
            {display}
          </span>
        );
      },
    },
    {
      header: 'Remarks',
      accessor: (row: GradeWithSentiment) => (
        <div className="flex items-center gap-2">
          <span>{row.remarks}</span>
          {row.sentiment && (
            <span className={`text-xs px-2 py-1 rounded ${sentimentColorMap[row.sentiment]}`}>
              {row.sentiment}
            </span>
          )}
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={gradedData} className="mt-4" />;
};

export default StudentGradeView;

