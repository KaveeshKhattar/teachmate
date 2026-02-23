"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AssessmentTrendChart } from "@/components/assessment-trend-chart";

type Assessment = {
  id: number;
  source: "TUITION" | "SCHOOL";
  subject: string;
  title: string | null;
  score: number;
  maxScore: number;
  takenAt: string;
  notes: string | null;
  createdByRole: "TEACHER" | "STUDENT";
};

type FormState = {
  subject: string;
  title: string;
  score: string;
  maxScore: string;
  takenAt: string;
  notes: string;
};

const emptyForm: FormState = {
  subject: "",
  title: "",
  score: "",
  maxScore: "",
  takenAt: "",
  notes: "",
};

function toDateInput(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function StudentProgressCenter() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadAssessments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/assessments");
      if (!res.ok) throw new Error("Failed");
      const payload = (await res.json()) as { assessments: Assessment[] };
      setAssessments(payload.assessments ?? []);
    } catch {
      setError("Could not load assessment history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAssessments();
  }, [loadAssessments]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        source: "SCHOOL",
        subject: form.subject,
        title: form.title,
        score: Number(form.score),
        maxScore: Number(form.maxScore),
        takenAt: new Date(form.takenAt).toISOString(),
        notes: form.notes,
      };

      const url = editingId ? `/api/assessments/${editingId}` : "/api/assessments";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");

      await loadAssessments();
      resetForm();
    } catch {
      setError("Could not save school assessment.");
    } finally {
      setSaving(false);
    }
  };

  const editRow = (assessment: Assessment) => {
    if (assessment.source !== "SCHOOL") return;
    setEditingId(assessment.id);
    setForm({
      subject: assessment.subject,
      title: assessment.title ?? "",
      score: String(assessment.score),
      maxScore: String(assessment.maxScore),
      takenAt: toDateInput(assessment.takenAt),
      notes: assessment.notes ?? "",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Test Tracker & Progress</CardTitle>
          <CardDescription>
            Add or edit your school test scores. Tuition scores are read-only and managed by your teacher.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={form.subject}
                onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                placeholder="Math"
              />
            </div>
            <div className="space-y-2">
              <Label>Test Name</Label>
              <Input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="School Unit Test 2"
              />
            </div>
            <div className="space-y-2">
              <Label>Test Date</Label>
              <Input
                type="date"
                value={form.takenAt}
                onChange={(event) => setForm((prev) => ({ ...prev, takenAt: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Score</Label>
              <Input
                type="number"
                value={form.score}
                onChange={(event) => setForm((prev) => ({ ...prev, score: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Score</Label>
              <Input
                type="number"
                value={form.maxScore}
                onChange={(event) => setForm((prev) => ({ ...prev, maxScore: event.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Notes</Label>
              <Input
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Lost marks in geometry proof"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex items-center gap-2">
            <Button onClick={onSubmit} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update School Score" : "Add School Score"}
            </Button>
            {editingId ? (
              <Button variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Score Trend</CardTitle>
          <CardDescription>Tuition and school performance trends are shown together.</CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentTrendChart assessments={assessments} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assessment History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading assessments...</p> : null}
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments
                  .slice()
                  .sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime())
                  .map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(assessment.takenAt))}
                      </TableCell>
                      <TableCell>
                        <Badge variant={assessment.source === "TUITION" ? "default" : "secondary"}>
                          {assessment.source}
                        </Badge>
                      </TableCell>
                      <TableCell>{assessment.subject}</TableCell>
                      <TableCell>{assessment.title ?? "-"}</TableCell>
                      <TableCell>
                        {assessment.score}/{assessment.maxScore}
                      </TableCell>
                      <TableCell>
                        {assessment.source === "SCHOOL" ? (
                          <Button size="sm" variant="outline" onClick={() => editRow(assessment)}>
                            Edit
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">Teacher only</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                {assessments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No assessments yet.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
