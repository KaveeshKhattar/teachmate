import { auth, currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProfileAuthControls } from "@/components/profile-auth-controls";

type MetadataRole = {
  ROLE?: string;
  role?: string;
};

export async function SignedInProfileSection() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const unsafeMetadata = (user.unsafeMetadata ?? {}) as MetadataRole;
  const publicMetadata = (user.publicMetadata ?? {}) as MetadataRole;
  const role =
    unsafeMetadata.role ??
    unsafeMetadata.ROLE ??
    publicMetadata.role ??
    publicMetadata.ROLE ??
    "UNSET";
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "No name set";
  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress ?? "No email";

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Role</span>
          <Badge variant="secondary">{role}</Badge>
        </div>
        <div>
          <p className="text-muted-foreground">Name</p>
          <p className="font-medium">{fullName}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Email</p>
          <p className="font-medium break-all">{primaryEmail}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Clerk User ID</p>
          <p className="font-mono text-xs break-all">{user.id}</p>
        </div>
        <Separator />
        <ProfileAuthControls />
      </CardContent>
    </Card>
  );
}
