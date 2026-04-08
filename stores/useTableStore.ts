import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { normalizeTable } from '@/lib/table';

interface TableStore {
  /** The active table number set from a QR code scan. Null = walk-in / unknown. */
  activeTable: string | null;
  /** True when the table was set via QR scan (vs manual entry). Kept for display logic. */
  fromQR: boolean;
  setTable: (raw: string | null, fromQR?: boolean) => void;
  clearTable: () => void;
}

export const useTableStore = create<TableStore>()(
  persist(
    (set) => ({
      activeTable: null,
      fromQR: false,

      setTable: (raw, fromQR = false) => {
        const normalised = normalizeTable(raw);
        set({ activeTable: normalised, fromQR: normalised !== null ? fromQR : false });
      },

      clearTable: () => {
        set({ activeTable: null, fromQR: false });
      },
    }),
    {
      name: 'latina-table',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
