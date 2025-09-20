import { create } from 'zustand';
import mpsData from '../data/mps.json'; // manual import JSON

export type Member = {
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

// --- Zustand store ---
type MemberStore = {
  members: Member[];
  editingMember: Member | null;
  addOrUpdateMember: (data: Omit<Member, 'id'>) => void;
  setEditingMember: (member: Member | null) => void;
  deleteMember: (id: number) => void;
  importAllMembers: () => void;
};

export const useMemberStore = create<MemberStore>((set, get) => ({
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

  importAllMembers: () => {
    // manual import JSON
    set({ members: mpsData as Member[] });
  }
}));
