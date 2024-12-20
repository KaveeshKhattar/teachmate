// type Schedule = { [studentId: number]: [number, number][] }; // Student ID maps to (day, slot) pairs
// type SlotCapacity = number[][]; // Matrix to track the number of students assigned to each slot

// // Constants
// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const SLOTS_PER_DAY = [2, 2, 2, 2, 2];  // Number of slots for each day
// const STUDENTS = 17;

// // Number of slots required for each student
// const slotsRequired: { [key: number]: number } = {
//     1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3,
//     11: 3, 12: 3, 13: 3, 14: 2, 15: 2, 16: 2, 17: 2
// };

// // Initialize the schedule and availability
// let schedule: Schedule = {};
// let slotCapacity: SlotCapacity = [];

// // Initialize the slot capacity
// function initializeSlotCapacity() {
//     slotCapacity = SLOTS_PER_DAY.map(slots => Array(slots).fill(0));  // Each slot starts with 0 students
// }

// // Validate if the slot assignment is valid
// function isValidSchedule(studentId: number, day: number, slot: number): boolean {
//     // Ensure the student hasn't exceeded their required slots
//     if (schedule[studentId]?.length >= slotsRequired[studentId]) return false;

//     // Ensure the student is not assigned multiple slots on the same day
//     const daysScheduled = new Set(schedule[studentId]?.map(([d, _]) => d));
//     if (daysScheduled.has(day)) return false;

//     // Ensure the slot can accommodate another student (up to 5 students per slot)
//     if (slotCapacity[day][slot] >= 5) return false;

//     return true;
// }

// // The backtracking function to assign slots to the students
// function assignSlots(studentId: number): boolean {
//     // Base case: all students are scheduled
//     if (studentId > STUDENTS) return true;

//     // Try every slot (day, time) and assign a slot to the current student
//     for (let day = 0; day < DAYS.length; day++) {
//         for (let slot = 0; slot < SLOTS_PER_DAY[day]; slot++) {  // Adjust the range to reflect slots per day

//             if (isValidSchedule(studentId, day, slot)) {
//                 // Assign the slot to the student
//                 if (!schedule[studentId]) schedule[studentId] = [];
//                 schedule[studentId].push([day, slot]);
//                 slotCapacity[day][slot] += 1;  // Increment student count for this slot

//                 // If the student has reached their required slots, move to the next student
//                 if (schedule[studentId].length === slotsRequired[studentId]) {
//                     if (assignSlots(studentId + 1)) return true;
//                 } else {
//                     // If the student still needs more slots, try other available slots
//                     if (assignSlots(studentId)) return true;
//                 }

//                 // Backtrack: undo the assignment
//                 schedule[studentId].pop();
//                 slotCapacity[day][slot] -= 1;  // Decrement student count for this slot
//             }
//         }
//     }
//     return false;
// }

// // Format the schedule for better readability
// function formatSchedule(): { [key: string]: string[] } {
//     const formattedSchedule: { [key: string]: string[] } = {};

//     for (const studentId in schedule) {
//         const slots = schedule[+studentId];
//         for (const [day, slot] of slots) {
//             const daySlotKey = `${DAYS[day]}: Slot ${slot + 1}`;
//             if (!formattedSchedule[daySlotKey]) formattedSchedule[daySlotKey] = [];
//             formattedSchedule[daySlotKey].push(`Student ${studentId}`);
//         }
//     }

//     return formattedSchedule;
// }

// // Main function to start assigning slots
// function scheduleStudents(): { [key: string]: string[] } | string {
//     // Initialize variables
//     schedule = {};
//     initializeSlotCapacity();

//     // Start assigning slots from student 1
//     if (assignSlots(1)) {
//         // Format and return the final schedule
//         return formatSchedule();
//     } else {
//         return "It's not possible to schedule all students with the given slot requirements.";
//     }
// }

// // Export the function for use in your Next.js API or other components
// export default scheduleStudents;