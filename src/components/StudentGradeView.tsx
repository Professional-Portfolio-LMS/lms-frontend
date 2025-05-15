'use client';

import type React from 'react';
import {
  FileText,
  ClipboardList,
  BookOpen,
  ClipboardCopy, 
  HelpCircle,
  ClipboardPaste,
  NotebookPen,
} from 'lucide-react';

type GradeEntry = {
  activity: string;
  course: string;
  grade: string | number;
  remarks: string;
};

type StudentGradeViewProps = {
  grades: GradeEntry[];
};

const getActivityIcon = (activity: string) => {
  const lower = activity.toLowerCase();
  if(lower.includes('assignment')){
    return <FileText size= {24} className="inline-block mr-1" />; 
  }
  if(lower.includes('quiz')){
    return <ClipboardList size = {24} className="inline-block mr-1" />;
  }
  if(lower.includes('past paper')){
    return <ClipboardCopy size = {24} className="inline-block mr-1" />; 
  }
  if(lower.includes('model paper')){
    return <ClipboardPaste size = {24} className="inline-block mr-1" />; 
  }
  if(lower.includes('homework')){
    return <NotebookPen size = {24} className="inline-block mr-1" />; 
  }
  return <HelpCircle size={24} className="inline-block mr-1" />;
}

const StudentGradeView: React.FC<StudentGradeViewProps> = ({ grades }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-[50px] px-2 py-2 border-b text-center"><span className="sr-only">Type</span></th>
            <th className="px-4 py-2 border-b">Activity</th>
            <th className="px-4 py-2 border-b">Course</th>
            <th className="px-4 py-2 border-b">Grade</th>
            <th className="px-4 py-2 border-b">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((entry, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-2 border-b text-center align-middle">
                {getActivityIcon(entry.activity)}
              </td>
              <td className="px-4 py-2 border-b">{entry.activity}</td>
              <td className="px-4 py-2 border-b">{entry.course}</td>
              <td className="px-4 py-2 border-b">{entry.grade}</td>
              <td className="px-4 py-2 border-b">{entry.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGradeView;
