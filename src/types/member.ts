export type Member = {
  id: number;
  title: string;        // คำนำหน้า
  firstName: string;
  lastName: string;
  photoUrl?: string;    // รูปถ่าย
  workHistory?: string; // ประวัติการทำงาน
  achievements?: string; // ผลงานที่ผ่านมา
  ministerPosition?: string; // ตำแหน่งรัฐมนตรี
  ministry?: string;        // กระทรวง
  party: string;            // สังกัดพรรค
};