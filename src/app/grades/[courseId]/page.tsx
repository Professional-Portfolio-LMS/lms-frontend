'use client';

import React, { useState } from 'react';
import AlphabetFilter from '@/components/AlphabeticFilter';
import { useParams } from 'next/navigation';

const dummyParticipants = [
  'Alice Anderson',
  'Bob Brown',
  'Charlie Chaplin',
  'David Duke',
  'Eve Evans',
  'Frank Foster',
  'Grace Green',
  'Hannah Hall',
  'Isaac Ivy',
  'Jack Johnson',
  'Karen King',
  'Liam Lee',
];

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
    const [firstNameLetter, setFirstNameLetter] = useState('');
  const [surnameLetter, setSurnameLetter] = useState('');

  const filteredParticipants = dummyParticipants.filter((fullName) => {
    const [firstName, lastName] = fullName.split(' ');
    const firstMatch = !firstNameLetter || firstName.startsWith(firstNameLetter);
    const lastMatch = !surnameLetter || lastName?.startsWith(surnameLetter);
    return firstMatch && lastMatch;
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course: {courseId}</h1>

      <div className="mb-4">
        <p className="font-semibold mb-2">Filter By:</p>

        <div className="flex flex-wrap gap-2">
          {/* First Name Filter */}
          <div className="flex flex-col min-w-[200px]">
            <span className="font-semibold mb-1">First Name:</span>
            <AlphabetFilter
              title=""
              selectedLetter={firstNameLetter}
              onSelect={setFirstNameLetter}
            />
          </div>

          {/* Surname Filter */}
          <div className="flex flex-col min-w-[200px]">
            <span className="font-semibold mb-1">Surname:</span>
            <AlphabetFilter
              title=""
              selectedLetter={surnameLetter}
              onSelect={setSurnameLetter}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {filteredParticipants.length === 0 ? (
          <p className="text-gray-500">No participants found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredParticipants.map((participant) => (
              <li
                key={participant}
                className="px-4 py-2 bg-white shadow rounded text-gray-800"
              >
                {participant}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
