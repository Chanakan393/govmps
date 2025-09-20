import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { create } from 'zustand';
import { useEffect } from 'react';

// --- type Member ยุบไว้ในไฟล์นี้ ---
type Member = {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    photoUrl?: string;
    workHistory?: string;
    achievements?: string;
    ministerPosition?: string;
    ministry?: string;
    party: string;
};

// --- สร้าง store แบบ Zustand ---
type MemberStore = {
    members: Member[];
    editingMember: Member | null;
    addOrUpdateMember: (data: Omit<Member, 'id'>) => void;
    setEditingMember: (member: Member | null) => void;
    deleteMember: (id: number) => void;
};

const useMemberStore = create<MemberStore>((set, get) => ({
    members: [],
    editingMember: null,
    addOrUpdateMember: (data) => {
        const { members, editingMember } = get();
        if (editingMember) {
            set({
                members: members.map(m => m.id === editingMember.id ? { ...m, ...data } : m),
                editingMember: null
            });
        } else {
            set({ members: [...members, { ...data, id: Date.now() }] });
        }
    },
    setEditingMember: (member) => set({ editingMember: member }),
    deleteMember: (id) => set({ members: get().members.filter(m => m.id !== id) }),
}));

// --- Zod Schema ---
const schema = z.object({
    title: z.string().nonempty('กรุณาเลือกคำนำหน้า'),
    firstName: z.string().nonempty('กรุณากรอกชื่อ'),
    lastName: z.string().nonempty('กรุณากรอกนามสกุล'),
    photoUrl: z.string().url('กรุณากรอก URL รูปภาพ').optional(),
    workHistory: z.string().optional(),
    achievements: z.string().optional(),
    ministerPosition: z.string().optional(),
    ministry: z.string().optional(),
    party: z.string().nonempty('กรุณากรอกพรรค'),
});

type FormData = z.infer<typeof schema>;

export default function MemberForm() {
    const { addOrUpdateMember, editingMember, setEditingMember } = useMemberStore();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: editingMember || undefined
    });

    useEffect(() => {
        if (editingMember) {
            Object.entries(editingMember).forEach(([key, value]) => {
                setValue(key as keyof FormData, value as any);
            });
        }
    }, [editingMember, setValue]);

    const onSubmit = (data: FormData) => {
        addOrUpdateMember(data);
        reset();
    };

    const cancelEdit = () => {
        setEditingMember(null);
        reset();
    };

    const titleOptions = ["นาย", "นางสาว", "นาง", "ดร.", "ผศ.", "รศ.", "ศ.", "พญ.", "พ.", "น.", "ม."];

    const ministryOptions = [
        "สำนักนายกรัฐมนตรี",
        "กระทรวงกลาโหม",
        "กระทรวงการคลัง",
        "กระทรวงการต่างประเทศ",
        "กระทรวงการท่องเที่ยวและกีฬา",
        "กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์",
        "กระทรวงเกษตรและสหกรณ์",
        "กระทรวงคมนาคม",
        "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
        "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
        "กระทรวงพลังงาน",
        "กระทรวงพาณิชย์",
        "กระทรวงมหาดไทย",
        "กระทรวงยุติธรรม",
        "กระทรวงแรงงาน",
        "กระทรวงวัฒนธรรม",
        "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
        "กระทรวงศึกษาธิการ",
        "กระทรวงสาธารณสุข",
        "กระทรวงอุตสาหกรรม"
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-card mx-auto max-w-3xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* คำนำหน้า */}
                <div>
                    <label className="form-label">คำนำหน้า</label>
                    <select {...register('title')} className="form-select">
                        <option value="">-- เลือกคำนำหน้า --</option>
                        {titleOptions.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                </div>

                {/* ชื่อ */}
                <div>
                    <label className="form-label">ชื่อ</label>
                    <input {...register('firstName')} className="form-input" />
                    {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                </div>

                {/* นามสกุล */}
                <div>
                    <label className="form-label">นามสกุล</label>
                    <input {...register('lastName')} className="form-input" />
                    {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                </div>

                {/* พรรค */}
                <div>
                    <label className="form-label">พรรค</label>
                    <input {...register('party')} className="form-input" />
                    {errors.party && <p className="form-error">{errors.party.message}</p>}
                </div>

                {/* รูปภาพ */}
                <div className="md:col-span-2">
                    <label className="form-label">ลิงก์รูปภาพ</label>
                    <input {...register('photoUrl')} className="form-input" />
                    {errors.photoUrl && <p className="form-error">{errors.photoUrl.message}</p>}
                </div>

                {/* ประวัติการทำงาน */}
                <div className="md:col-span-2">
                    <label className="form-label">ประวัติการทำงาน</label>
                    <textarea {...register('workHistory')} className="form-textarea" />
                </div>

                {/* ผลงานเด่น */}
                <div className="md:col-span-2">
                    <label className="form-label">ผลงานเด่น</label>
                    <textarea {...register('achievements')} className="form-textarea" />
                </div>

                {/* ตำแหน่งรัฐมนตรี */}
                <div>
                    <label className="form-label">ตำแหน่งรัฐมนตรี</label>
                    <input {...register('ministerPosition')} className="form-input" />
                </div>

                {/* กระทรวง */}
                <div>
                    <label className="form-label">กระทรวง</label>
                    <select {...register('ministry')} className="form-select">
                        <option value="">-- เลือกกระทรวง --</option>
                        {ministryOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            {/* ปุ่ม */}
            <div className="flex justify-center space-x-4 mt-6">
                <button type="submit" className="btn-primary">
                    {editingMember ? 'แก้ไขสมาชิก' : 'เพิ่มสมาชิก'}
                </button>
                {editingMember && (
                    <button type="button" onClick={cancelEdit} className="btn-cancel">
                        ยกเลิก
                    </button>
                )}
            </div>
        </form>
    );
}
