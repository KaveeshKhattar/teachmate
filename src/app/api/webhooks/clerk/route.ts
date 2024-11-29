import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occurred", {
            status: 400,
        });
    }

    const eventType = evt.type;
    console.log("************************************************CALLED****************************************");
    console.log(eventType);

    if (eventType === "user.created") {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        if (!id || !email_addresses) {
            return new Response("Error occurred -- missing data", {
                status: 400,
            });
        }

        const user = {
            clerkUserId: id,
            email: email_addresses[0].email_address,
            ...(first_name ? { firstName: first_name } : {}),
            ...(last_name ? { lastName: last_name } : {}),
            ...(image_url ? { imageUrl: image_url } : {}),
        };

        console.log("User data prepared:", user);

        await prisma.user.create({
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
                clerkUserId: user.clerkUserId,
            },
        });
    } else if (eventType === "user.updated") {
        console.log("event data for update: ", evt.data);
        const {
            id,
            email_addresses,
            first_name,
            last_name,
            image_url,
            unsafe_metadata,
        } = evt.data;

        if (!id || !email_addresses) {
            return new Response("Error occurred -- missing data", {
                status: 400,
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { clerkUserId: id },
        });

        if (!existingUser) {
            return new Response("User not found for update", { status: 404 });
        }
        
        const { tempRole } = unsafe_metadata;

        const updatedUserData = {
            email: email_addresses[0].email_address,
            ...(first_name ? { firstName: first_name } : {}),
            ...(last_name ? { lastName: last_name } : {}),
            ...(image_url ? { imageUrl: image_url } : {}),
            ...(tempRole ? { tempRole: tempRole } : {}),
        };

        await prisma.user.update({
            where: { clerkUserId: id },
            data: updatedUserData,
        });

        const { role, grade, school, board, teacher_id } = unsafe_metadata;
        const teacher_id_number = Number(teacher_id);

        if (role === "STUDENT") {
            try {
                const student = await prisma.student.upsert({
                    where: {
                        userId: existingUser.id, // Find student by userId
                    },
                    update: {
                        grade: typeof grade === "string" ? grade : null,
                        school: typeof school === "string" ? school : null,
                        board: typeof board === "string" ? board : null,
                        teacherId: teacher_id_number,
                    },
                    create: {
                        userId: existingUser.id,
                        grade: typeof grade === "string" ? grade : null,
                        school: typeof school === "string" ? school : null,
                        board: typeof board === "string" ? board : null,
                        teacherId: teacher_id_number,
                    },
                });

                console.log("Student data synced successfully:", student);
            } catch (error) {
                console.error("Error syncing student data:", error);
            }
        } else if (role === "TEACHER") {
            try {
                const teacher = await prisma.teacher.upsert({
                    where: {
                        userId: existingUser.id, // Find teacher by userId
                    },
                    update: {
                        userId: existingUser.id, // Update board
                    },
                    create: {
                        userId: existingUser.id, // Create teacher if it doesn't exist
                    },
                });

                console.log("Teacher data synced successfully:", teacher);
            } catch (error) {
                console.error("Error syncing teacher data:", error);
            }
        }
    } else if (eventType === "user.deleted") {
        const { id } = evt.data;

        if (!id) {
            return new Response("Error occurred -- missing user ID", {
                status: 400,
            });
        }

        const userToDelete = await prisma.user.findUnique({
            where: { clerkUserId: id },
        });

        if (!userToDelete) {
            return new Response("User not found for deletion", { status: 404 });
        }

        if (userToDelete.role === "STUDENT") {
            await prisma.student.delete({
                where: { userId: userToDelete.id },
            });
        } else if (userToDelete.role === "TEACHER") {
            await prisma.teacher.delete({
                where: { userId: userToDelete.id },
            });
        }

        // Delete the user from the database
        await prisma.user.delete({
            where: { clerkUserId: id },
        });

        console.log(`User with ID ${id} deleted successfully.`);
    }

    return new Response("", { status: 200 });
}
