import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import FridgeDoor from './components/FridgeDoor';
import WordMagnet from './components/WordMagnet';
import { useMagnetStore } from './store/useMagnetStore';

export default function App() {
  const magnets = useMagnetStore((state) => state.magnets);
  const updateMagnet = useMagnetStore((state) => state.updateMagnet);
  const loadExpansionPack = useMagnetStore((state) => state.loadExpansionPack);

  const bankMagnets = magnets.filter((magnet) => magnet.status === 'bank');
  const fridgeMagnets = magnets.filter((magnet) => magnet.status === 'fridge');

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'fridge') {
      const translated = event.active.rect.current.translated;
      const fridgeRect = event.over.rect;

      if (!translated || !fridgeRect) return;

      const x = translated.left - fridgeRect.left;
      const y = translated.top - fridgeRect.top;

      updateMagnet(event.active.id as string, 'fridge', x, y);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-slate-50 p-8">
        <header className="mb-6 rounded-2xl bg-zinc-800 p-6 text-white print:hidden">
          <h1 className="text-2xl font-bold">Fridge Magnet Poetry</h1>
          <div className="mt-4 flex gap-4">
            <button
              onClick={loadExpansionPack}
              className="rounded-lg bg-amber-500 px-4 py-2 font-bold"
            >
              Load Expansion Pack
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-blue-600 px-4 py-2 font-bold"
            >
              Print
            </button>
          </div>
        </header>

        <div className="flex gap-8">
          <div className="w-72 rounded-xl bg-white p-4 shadow print:hidden">
            <h2 className="mb-4 text-lg font-bold">Word Bank</h2>
            <div className="flex flex-wrap gap-3">
              {bankMagnets.map((magnet) => (
                <WordMagnet key={magnet.id} magnet={magnet} />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <FridgeDoor>
              {fridgeMagnets.map((magnet) => (
                <WordMagnet key={magnet.id} magnet={magnet} />
              ))}
            </FridgeDoor>
          </div>
        </div>
      </div>
    </DndContext>
  );
}