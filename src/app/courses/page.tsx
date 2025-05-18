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
  duration: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Chemistry',
    instructor: 'Dr. Alan Mendes',
    duration: '10 weeks',
    image: 'images/chemisty.jpg',
  },
  {
    id: 2,
    title: 'Physics',
    instructor: 'Prof. Sarah Newton',
    duration: '10 weeks',
    image: 'images/physics.jpg',
  },
  {
    id: 3,
    title: 'Biology',
    instructor: 'Dr. Lisa Green',
    duration: '10 weeks',
    image: 'images/biology.jpg',
  },
  {
    id: 4,
    title: 'Combined Mathematics',
    instructor: 'Mr. Kevin Tan',
    duration: '12 weeks',
    image: 'images/mathematics.jpg',
  },
  {
    id: 5,
    title: 'ICT',
    instructor: 'Mr. Kevin Tan',
    duration: '8 weeks',
    image: 'images/ict.webp',
  },
  {
    id: 6,
    title: 'Agriculture',
    instructor: 'Dr. Ethan Fields',
    duration: '9 weeks',
    image: 'images/agriculture.jpg',
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
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500 mb-4">Duration: {course.duration}</p>
              <div className="text-right">
                <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                  Enroll
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
