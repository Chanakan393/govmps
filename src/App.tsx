import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import { useMemberStore } from './store/memberStore';
import './App.css';

export default function App() {
  const { importAllMembers } = useMemberStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            ระบบจัดการข้อมูลสมาชิกสภาผู้แทนราษฎรไทย
          </p>

          {/* Import Button */}
          <div className="flex justify-center">
            <button
              onClick={importAllMembers}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              นำเข้าข้อมูลทั้งหมด
            </button>
          </div>
        </div>

        {/* Form and List */}
        <div className="space-y-8">
          <MemberForm />
          <MemberList />
        </div>
      </div>
    </div>
  );
}