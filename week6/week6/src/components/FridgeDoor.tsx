import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function FridgeDoor({ children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: 'fridge' });

  return (
    <div
      ref={setNodeRef}
      className={`relative h-[500px] w-full rounded-2xl border-4 border-dashed bg-slate-100 ${
        isOver ? 'border-blue-500' : 'border-slate-300'
      }`}
    >
      {children}
    </div>
  );
}