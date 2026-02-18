import React from "react";
import { ROW_HEIGHT } from "./utils";

export function useDragSlot(onDrop: (slot: UISlot, newStartMinutes: number) => void) {

    const draggingRef = React.useRef<{
        slot: UISlot;
        startY: number;
        originalStartMinutes: number;
    } | null>(null);

    const [dragState, setDragState] = React.useState<{
        slotId: string; // `${recurringScheduleId}-${date}`
        startMinutes: number;
        endMinutes: number;
    } | null>(null);

    // need a ref to read latest dragState inside mouseup closure
    const dragStateRef = React.useRef(dragState);
    React.useEffect(() => {
        dragStateRef.current = dragState;
    }, [dragState]);

    const didDragRef = React.useRef(false);

    const onMouseDown = React.useCallback(
        (e: React.MouseEvent, slot: UISlot) => {
            e.stopPropagation();
            draggingRef.current = {
                slot,
                startY: e.clientY,
                originalStartMinutes: slot.startMinutes,
            };

            function onMouseMove(e: MouseEvent) {
                if (!draggingRef.current) return;
                didDragRef.current = true; // ← add this
                const { slot, startY, originalStartMinutes } = draggingRef.current;
                const duration = slot.endMinutes - slot.startMinutes;

                const deltaY = e.clientY - startY;
                const deltaMinutes = Math.round(deltaY / ROW_HEIGHT) * 30;

                let newStart = originalStartMinutes + deltaMinutes;
                // clamp to day bounds
                newStart = Math.max(0, Math.min(23 * 60 + 30 - duration, newStart));
                // snap to 30
                newStart = Math.round(newStart / 30) * 30;

                setDragState({
                    slotId: `${slot.recurringScheduleId}-${slot.date}`,
                    startMinutes: newStart,
                    endMinutes: newStart + duration,
                });
            }

            function onMouseUp() {
                if (!draggingRef.current || !dragStateRef.current) {
                    draggingRef.current = null;
                    setDragState(null);
                    window.removeEventListener("mousemove", onMouseMove);
                    window.removeEventListener("mouseup", onMouseUp);
                    return;
                }

                // read latest dragState via ref
                onDrop(draggingRef.current.slot, dragStateRef.current!.startMinutes);
                draggingRef.current = null;
                setDragState(null);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            }

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        },
        []
    );



    return { onMouseDown, dragState, didDragRef };
}
