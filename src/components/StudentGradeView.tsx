'use client';

import type React from 'react';
import {
  FileText,
  ClipboardList,
  ClipboardCopy,
  ClipboardPaste,
  NotebookPen,
  HelpCircle,
} from 'lucide-react';
import DataTable, { type Column } from '@/components/DataTable';

type GradeEntry = {
  activity: string;
  course: string;
  grade: string | number;
  remarks: string;
  subtext?: string;
};

type StudentGradeViewProps = {
  grades: GradeEntry[];
};

const getSubtext = (activity: string) => {
  if (activity.toLowerCase().includes('assignment')) return '2 attempts submitted';
  if (activity.toLowerCase().includes('quiz')) return '1 attempt recorded';
  return '';
};

const getActivityIcon = (activity: string) => {
  const lower = activity.toLowerCase();
  if (lower.includes('assignment')) {
    return <FileText className="inline-block mr-1 text-primary" size={35} />;
  }
  if (lower.includes('quiz')) {
    return <ClipboardList className="inline-block mr-1 text-primary" size={35} />;
  }
  if (lower.includes('past paper')) {
    return <ClipboardCopy className="inline-block mr-1 text-primary" size={35} />;
  }
  if (lower.includes('model paper')) {
    return <ClipboardPaste className="inline-block mr-1 text-primary" size={35} />;
  }
  if (lower.includes('homework')) {
    return <NotebookPen className="inline-block mr-1 text-primary" size={35} />;
  }
  return <HelpCircle className="inline-block mr-1 text-muted-foreground" size={30} />;
};

const StudentGradeView: React.FC<StudentGradeViewProps> = ({ grades }) => {
  const columns: Column[] = [
    {
      header: '',
      accessor: (row: GradeEntry) => getActivityIcon(row.activity),
    },
    {
      header: 'Activity',
      accessor: (row: GradeEntry) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-semibold">{row.activity}</span>
            {row.subtext && (
              <span className="text-xs text-muted-foreground">{row.subtext}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: 'Course',
      accessor: (row: GradeEntry) => (
        <span className="font-semibold text-[#00173d]">{row.course}</span>
      ),
    },
    {
      header: 'Grade',
      accessor: 'grade',
    },
    {
      header: 'Remarks',
      accessor: 'remarks',
    },
  ];

  return <DataTable columns={columns} data={grades} className="mt-4" />;
};

export default StudentGradeView;