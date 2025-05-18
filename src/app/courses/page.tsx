import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

type Course = {
  id: number;
  title: string;
  instructor: string;
  year: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Chemistry',
    instructor: 'Dr. Alan Mendes',
    year: '2025 A/L',
    image: 'courses/chemisty.jpg',
  },
  {
    id: 2,
    title: 'Physics',
    instructor: 'Prof. Sarah Newton',
    year: '2025 A/L',
    image: 'courses/physics.jpg',
  },
  {
    id: 3,
    title: 'Biology',
    instructor: 'Dr. Lisa Green',
    year: '2025 A/L',
    image: 'courses/biology.jpg',
  },
  {
    id: 4,
    title: 'Combined Mathematics',
    instructor: 'Mr. Kevin Tan',
    year: '2025 A/L',
    image: 'courses/mathematics.jpg',
  },
  {
    id: 5,
    title: 'ICT',
    instructor: 'Mr. Kevin Tan',
    year: '2025 A/L',
    image: 'courses/ict.webp',
  },
  {
    id: 6,
    title: 'Agriculture',
    instructor: 'Dr. Ethan Fields',
    year: '2025 A/L',
    image: 'courses/agriculture.jpg',
  },
];

export default function CoursesPage() {
  return (
    <div className={`${poppins.className} p-8 text-lg leading-relaxed`}>
      <h1 className="text-3xl font-bold mb-6">COURSES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="block bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-sm text-gray-800">{course.instructor}</p>
              <p className="text-sm text-gray-500 mb-4">{course.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
