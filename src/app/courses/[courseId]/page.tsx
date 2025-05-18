import { notFound } from 'next/navigation';

const courses = [
  {
    id: 1,
    title: 'Chemistry',
    instructor: 'Dr. Alan Mendes',
    year: '2025 A/L',
    image: 'chemisty.jpg',
  },
  {
    id: 2,
    title: 'Physics',
    instructor: 'Prof. Sarah Newton',
    year: '2025 A/L',
    image: 'physics.jpg',
  },
  {
    id: 3,
    title: 'Biology',
    instructor: 'Dr. Lisa Green',
    year: '2025 A/L',
    image: 'biology.jpg',
  },
  {
    id: 4,
    title: 'Combined Mathematics',
    instructor: 'Mr. Kevin Tan',
    year: '2025 A/L',
    image: 'mathematics.jpg',
  },
  {
    id: 5,
    title: 'ICT',
    instructor: 'Mr. Kevin Tan',
    year: '2025 A/L',
    image: 'ict.webp',
  },
  {
    id: 6,
    title: 'Agriculture',
    instructor: 'Dr. Ethan Fields',
    year: '2025 A/L',
    image: 'agriculture.jpg',
  },
];

export default async function SpecificCoursePage({ params }: { params: { courseId: string } }) {
  const values = await params;
  const courseId = parseInt(values.courseId);
  const course = courses.find((c) => c.id === courseId);

  if (!course) return (
    <div className="min-h-screen flex items-start justify-center font-poppins">
      <div className="p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-lg text-gray-600">
          Sorry, the course you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-lg mb-2">
        {course.instructor}
      </p>
      <p className="text-md">
        {course.year}
      </p>
    </div>
  );
}
