import { useMemberStore } from '../store/memberStore';

export default function MemberList() {
  const { members, setEditingMember, deleteMember } = useMemberStore();

  if (members.length === 0)
    return <p className="text-center text-gray-500">ยังไม่มีข้อมูลสมาชิก</p>;

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">รูป</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ชื่อ-นามสกุล</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ตำแหน่ง/กระทรวง</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">พรรค</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {m.photoUrl ? (
                  <img src={m.photoUrl} alt={`${m.firstName} ${m.lastName}`} className="w-16 h-16 object-cover rounded-full" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    ไม่มีรูป
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{`${m.title} ${m.firstName} ${m.lastName}`}</td>
              <td className="px-4 py-2">
                {m.ministerPosition ? `${m.ministerPosition} / ${m.ministry}` : '-'}
              </td>
              <td className="px-4 py-2">{m.party}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => setEditingMember(m)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteMember(m.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
