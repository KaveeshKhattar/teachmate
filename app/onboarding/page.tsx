"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation'

interface Teacher {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        imageUrl: string;
    };
}

export default function UnSafePage() {
    const router = useRouter();
    const { user } = useUser();
    const [role, setRole] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [board, setBoard] = useState<string>("");
    const [fees, setFees] = useState<string>("");
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSetRole = (value: string) => {
        setRole(value);
    };

    const handleSetBoard = (value: string) => {
        setBoard(value);
    };

    useEffect(() => {
        // Fetch teacher data from the API
        setLoading(true);
        const fetchTeachers = async () => {
            try {
                const response = await fetch("/api/teachers");
                if (!response.ok) {
                    throw new Error(`Failed to fetch teachers: ${response.statusText}`);
                }
                const data: Teacher[] = await response.json();

                // Set the data in state
                setTeachers(data);
                console.log("Teachers fetched:", data);
            } catch (error) {
                // Log the error if the fetch fails or if the response is invalid
                console.error("Error fetching teachers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const handleUpdate = async () => {
        setErrorMessage("");

        if (!user) {
            setErrorMessage("Please sign in and try again.");
            return;
        }

        if (role !== "STUDENT" && role !== "TEACHER") {
            setErrorMessage("Please select a role.");
            return;
        }

        if (role === "STUDENT" && !value) {
            setErrorMessage("Please select a teacher.");
            return;
        }

        setSaving(true);
        const metadata: Record<string, string | number> = {};

        // Add additional fields for students if role is "STUDENT"
        if (role === "STUDENT") {
            metadata.role = "STUDENT";
            metadata.grade = grade;
            metadata.school = school;
            metadata.board = board;
            metadata.fees = fees;
            metadata.teacher_id = value;
        } else {
            metadata.role = "TEACHER";
        }

        try {
            await user.update({
                unsafeMetadata: metadata,
            })
            .then(() => {
                console.log("User updated with unsafe metadata");
            });

            const profileRes = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  clerkUserId: user.id,
                  role: metadata.role,
                  email: user.emailAddresses?.[0]?.emailAddress,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  imageUrl: user.imageUrl,
                  grade: metadata.grade,
                  school: metadata.school,
                  board: metadata.board,
                  fees: metadata.fees,
                  teacherId: metadata.teacher_id,
                }),
              });

            if (!profileRes.ok) {
                const payload = await profileRes.json().catch(() => null);
                const apiError = payload?.error ?? "Could not save profile details.";
                const detailText =
                    payload?.details && typeof payload.details === "object"
                        ? ` ${JSON.stringify(payload.details)}`
                        : "";
                throw new Error(`${apiError}${detailText}`);
            }

            router.push(role === "STUDENT" ? "/student/dashboard" : "/teacher/dashboard");
        } catch (err) {
            console.error("Onboarding save error:", err);
            setErrorMessage(
                err instanceof Error ? err.message : "Failed to save onboarding details."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-3 sm:p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Add Additional Fields to Profile</CardTitle>
                    <CardDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Role</Label>
                            <Select onValueChange={handleSetRole}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="STUDENT">Student</SelectItem>
                                        <SelectItem value="TEACHER">Teacher</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {role === "STUDENT" && (
                            <div className="grid w-full items-center gap-4 mt-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Grade</Label>
                                    <Input
                                        id="name"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        placeholder="Grade"
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">School</Label>
                                    <Input
                                        id="name"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        placeholder="School"
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Board</Label>
                                    <Select onValueChange={handleSetBoard}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Board" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Boards</SelectLabel>
                                                <SelectItem value="CBSE">CBSE</SelectItem>
                                                <SelectItem value="ICSE">ICSE</SelectItem>
                                                <SelectItem value="IB">IB/IGCSE</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="fees">Fees</Label>
                                    <Input
                                        id="fees"
                                        value={fees}
                                        onChange={(e) => setFees(e.target.value)}
                                        placeholder="Fees"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {value ? (
                                                    <div className="flex items-center">
                                                        <Image
                                                            src={
                                                                teachers.find(
                                                                    (teacher) =>
                                                                        teacher.user.id.toString() === value
                                                                )?.user.imageUrl || ""
                                                            }
                                                            alt={
                                                                teachers.find(
                                                                    (teacher) =>
                                                                        teacher.user.id.toString() === value
                                                                )?.user.firstName || "Teacher"
                                                            }
                                                            width={20}
                                                            height={20}
                                                            className="mr-2"
                                                        />
                                                        <span>
                                                            {
                                                                teachers.find(
                                                                    (teacher) =>
                                                                        teacher.user.id.toString() === value
                                                                )?.user.firstName
                                                            }{" "}
                                                            {
                                                                teachers.find(
                                                                    (teacher) =>
                                                                        teacher.user.id.toString() === value
                                                                )?.user.lastName
                                                            }
                                                        </span>
                                                    </div>
                                                ) : (
                                                    "Select teacher..."
                                                )}

                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[250px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search teacher..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No teacher found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {teachers.map((teacher) => (
                                                            <CommandItem
                                                                key={teacher.user.id}
                                                                value={teacher.user.id.toString()}
                                                                onSelect={(currentValue) => {
                                                                    // Set the selected teacher's ID in the value state
                                                                    setValue(
                                                                        currentValue === value ? "" : currentValue
                                                                    );
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {/* Display teacher's name */}
                                                                <Image
                                                                    src={teacher.user.imageUrl}
                                                                    alt={teacher.user.firstName}
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                                {`${teacher.user.firstName} ${teacher.user.lastName}`}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        value === teacher.user.id.toString()
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="space-y-2">
                        {errorMessage ? (
                            <p className="text-sm text-destructive">{errorMessage}</p>
                        ) : null}
                        <Button onClick={handleUpdate} disabled={loading || saving}>
                            {loading ? "Loading..." : saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
