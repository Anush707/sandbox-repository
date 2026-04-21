import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Magnet } from '../types/magnet';

interface Props {
  magnet: Magnet;
}

export default function WordMagnet({ magnet }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: magnet.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    position: magnet.status === 'fridge' ? 'absolute' as const : 'relative' as const,
    left: magnet.status === 'fridge' ? `${magnet.x}px` : undefined,
    top: magnet.status === 'fridge' ? `${magnet.y}px` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-md border bg-white px-3 py-2 shadow cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {magnet.word}
    </div>
  );
}