"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";


interface Student {
    id: number;
    grade?: string;
    school?: string;
    board?: string;
    fees?: number;
    numOfClassesPerWeek?: number;
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
    };
}

export default function TeacherStudentsTable() {
    const { user, isLoaded } = useUser();
    const [students, setStudents] = useState<Student[]>([]);
    const [open, setOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const [fees, setFees] = useState("");
    const [classesPerWeek, setClassesPerWeek] = useState("");

    useEffect(() => {
        if (!isLoaded || !user) return;

        async function fetchStudents() {
            const res = await fetch(`/api/students?clerkUserId=${user?.id}`);
            const data = await res.json();
            setStudents(data);
        }

        fetchStudents();
    }, [isLoaded, user]);

    if (!isLoaded) return <div>Loading user...</div>;
    if (!user) return <div>Please sign in to see your students.</div>;

    const handleDelete = async (studentId: number) => {
        if (!confirm("Are you sure you want to delete this student?")) return;

        // Call your API to delete
        await fetch(`/api/students/${studentId}`, { method: "DELETE" });

        // Remove deleted student from state
        setStudents(students.filter((s) => s.id !== studentId));
    };


    

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setFees(student.fees?.toString() ?? "");
        setClassesPerWeek(student.numOfClassesPerWeek?.toString() ?? "");
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editingStudent) return;

        const res = await fetch(`/api/students/${editingStudent.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fees: fees === "" ? null : Number(fees),
                numOfClassesPerWeek:
                    classesPerWeek === "" ? null : Number(classesPerWeek),
            }),
        });

        if (!res.ok) return;

        const updated = await res.json();

        setStudents((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
        );

        setOpen(false);
        setEditingStudent(null);
    };


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Board</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Classes / week</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.user.firstName} {student.user.lastName}</TableCell>
                            <TableCell>{student.grade}</TableCell>
                            <TableCell>{student.school}</TableCell>
                            <TableCell>{student.board}</TableCell>
                            <TableCell>{student.fees}</TableCell>
                            <TableCell>{student.numOfClassesPerWeek}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(student)}
                                    >
                                        Edit
                                    </Button>

                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit student</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm">Fees</label>
                            <Input
                                type="number"
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm">Number of classes per week</label>
                            <Input
                                type="number"
                                value={classesPerWeek}
                                onChange={(e) => setClassesPerWeek(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    );
}
