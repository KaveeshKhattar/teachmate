"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TeacherStudent {
    id: number;
    grade?: string | null;
    school?: string | null;
    board?: string | null;
    fees?: number | null;
    numOfClassesPerWeek?: number | null;
    user: {
        firstName?: string | null;
        lastName?: string | null;
        email: string;
    };
}

export default function TeacherStudentsTable({
    initialStudents,
}: {
    initialStudents: TeacherStudent[];
}) {
    const [students, setStudents] = useState<TeacherStudent[]>(initialStudents);
    const [open, setOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<TeacherStudent | null>(null);
    const [fees, setFees] = useState("");
    const [classesPerWeek, setClassesPerWeek] = useState("");
    const [error, setError] = useState<string | null>(null);
    const getStudentName = (student: TeacherStudent) =>
        [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student";

    const handleDelete = async (studentId: number) => {
        if (!confirm("Are you sure you want to delete this student?")) return;
        setError(null);

        const response = await fetch(`/api/students/${studentId}`, { method: "DELETE" });
        if (!response.ok) {
            setError("Could not delete student. Please try again.");
            return;
        }

        setStudents((prev) => prev.filter((student) => student.id !== studentId));
    };

    const handleEdit = (student: TeacherStudent) => {
        setEditingStudent(student);
        setFees(student.fees?.toString() ?? "");
        setClassesPerWeek(student.numOfClassesPerWeek?.toString() ?? "");
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editingStudent) return;
        setError(null);

        const response = await fetch(`/api/students/${editingStudent.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fees: fees === "" ? null : Number(fees),
                numOfClassesPerWeek: classesPerWeek === "" ? null : Number(classesPerWeek),
            }),
        });

        if (!response.ok) {
            setError("Could not update student details. Please try again.");
            return;
        }

        const updated = await response.json();
        setStudents((prev) => prev.map((student) => (student.id === updated.id ? updated : student)));
        setOpen(false);
        setEditingStudent(null);
    };

    return (
        <>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <div className="space-y-3 md:hidden">
                {students.map((student) => (
                    <Card key={student.id}>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                {getStudentName(student)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><span className="text-muted-foreground">Grade:</span> {student.grade ?? "-"}</p>
                            <p><span className="text-muted-foreground">School:</span> {student.school ?? "-"}</p>
                            <p><span className="text-muted-foreground">Board:</span> {student.board ?? "-"}</p>
                            <p><span className="text-muted-foreground">Fees:</span> {student.fees ?? "-"}</p>
                            <p><span className="text-muted-foreground">Classes/week:</span> {student.numOfClassesPerWeek ?? "-"}</p>
                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(student)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="hidden overflow-x-auto rounded-lg border md:block">
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
                                <TableCell>{getStudentName(student)}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell>{student.school}</TableCell>
                                <TableCell>{student.board}</TableCell>
                                <TableCell>{student.fees}</TableCell>
                                <TableCell>{student.numOfClassesPerWeek}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(student)}>
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
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit student</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm">Fees</label>
                            <Input type="number" value={fees} onChange={(event) => setFees(event.target.value)} />
                        </div>

                        <div>
                            <label className="text-sm">Number of classes per week</label>
                            <Input
                                type="number"
                                value={classesPerWeek}
                                onChange={(event) => setClassesPerWeek(event.target.value)}
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
