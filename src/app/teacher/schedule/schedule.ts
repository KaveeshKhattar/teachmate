// // Define constants
// const DAYS: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const SLOTS_PER_DAY: number[] = [2, 2, 2, 2, 2]; // Number of slots for each day
// const STUDENTS: number = 2;

// // Define the number of slots required for each student (some students need 2, others need 3)
// const slotsRequired: { [key: number]: number } = {
//     "1": 3,
//     "2": 2
// };

// // Initialize the schedule and availability
// const schedule: { [key: number]: [number, number][] } = {}; // Schedule for each student
// for (let i = 1; i <= STUDENTS; i++) {
//     schedule[i] = [];
// }








// const slotCapacity: number[][] = SLOTS_PER_DAY.map(slots => Array(slots).fill(0)); // Track the number of students assigned to each slot



// function isValidSchedule(studentId: number, day: number, slot: number): boolean {
//     console.log("checking if schedule is valid...");
//     // Ensure the student hasn't exceeded their required slots
//     if (schedule[studentId]?.length >= slotsRequired[studentId]) return false;

//     // Ensure the student is not assigned multiple slots on the same day
//     const daysScheduled = new Set(schedule[studentId]?.map(([d, _]) => d)); // eslint-disable-line @typescript-eslint/no-unused-vars
//     if (daysScheduled.has(day)) return false;

//     // Ensure the slot can accommodate another student (up to 5 students per slot)
//     if (slotCapacity[day][slot] >= 5) return false;

//     return true;
// }

// function assignSlots(studentId: number): boolean {
//     console.log("fetching schedule...");
//     // Base case: all students are scheduled
//     if (studentId > STUDENTS) return true;

//     // Try every slot (day, time) and assign a slot to the current student
//     for (let day = 0; day < DAYS.length; day++) {
//         for (let slot = 0; slot < SLOTS_PER_DAY[day]; slot++) {  // Adjust the range to reflect slots per day
//             console.log("schedule: ", schedule);
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
// function formatSchedule(): void {
//     console.log("formatting schedule...");
//     const formattedSchedule: { [key: string]: string[] } = {};

//     for (const studentId in schedule) {
//         const slots = schedule[+studentId];
//         for (const [day, slot] of slots) {
//             const daySlotKey = `${DAYS[day]}: Slot ${slot + 1}`;
//             if (!formattedSchedule[daySlotKey]) formattedSchedule[daySlotKey] = [];
//             formattedSchedule[daySlotKey].push(`Student ${studentId}`);
//         }
//     }
//     console.log("formattedSchedule: ", formattedSchedule);
// }

// // Main function to start assigning slots
// function scheduleStudents() {
//     // Initialize variables
//     console.log("slotCapacity: ", slotCapacity);

//     // Start assigning slots from student 1
//     if (assignSlots(1)) {
//         // Format and return the final schedule
//         formatSchedule();
//     } else {
//         return "It's not possible to schedule all students with the given slot requirements.";
//     }
// }