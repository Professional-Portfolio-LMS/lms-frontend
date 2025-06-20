import { User } from "../app/(normal)/courses/[courseId]/assignments/[assignmentId]/submissions/page";

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  if (user.role == "STUDENT") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Enrolled Courses</h2>
            <p className="text-2xl font-semibold text-[#00173d]">4</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Upcoming Assignments</h2>
            <p className="text-2xl font-semibold text-[#00173d]">2</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Pending Grades</h2>
            <p className="text-2xl font-semibold text-[#00173d]">1</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="bg-white shadow rounded-lg p-4 border">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <p className="font-medium">OS Assignment 1</p>
                <p className="text-sm text-gray-600">
                  Submitted on June 14, 2025
                </p>
              </li>
              <li className="py-3">
                <p className="font-medium">DBMS Lab Report</p>
                <p className="text-sm text-gray-600">
                  Submitted on June 10, 2025
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Announcements</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded">
            <p className="font-medium">📢 Midterm Exams</p>
            <p className="text-sm">
              Midterms start on June 25. Refer LMS for the schedule.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (user.role === "INSTRUCTOR") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back{user?.name ? `, Prof. ${user.name.split(" ")[0]}` : ""}!
          👋
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Courses You're Teaching</h2>
            <p className="text-2xl font-semibold text-[#00173d]">3</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Pending Submissions</h2>
            <p className="text-2xl font-semibold text-[#00173d]">12</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-sm text-gray-500">Assignments Due Soon</h2>
            <p className="text-2xl font-semibold text-[#00173d]">4</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Recent Instructor Activity
          </h2>
          <div className="bg-white shadow rounded-lg p-4 border">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <p className="font-medium">Reviewed OS Assignment 1</p>
                <p className="text-sm text-gray-600">June 17, 2025</p>
              </li>
              <li className="py-3">
                <p className="font-medium">Published DBMS Lab Grades</p>
                <p className="text-sm text-gray-600">June 15, 2025</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Post New Announcement</h2>
          <div className="bg-white p-4 rounded-lg shadow border">
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Type your announcement here..."
            />
            <button className="bg-[#00173d] text-white px-4 py-2 rounded hover:bg-blue-700">
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
