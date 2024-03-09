"use server"
import { getSession } from "@/lib/api-requests/fetchers";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(applicationId: number, jobPostId: number, status: string) {
    const session = await getSession();
    try {
        await fetch(`${BACKEND_URL}/applications/${applicationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({ jobPostId, status }),
        });
    } catch (error) {
        console.log(error);

    }
    revalidatePath("/business/job-posts");


}

export async function acceptApplication(applicationId: number, jobPostId: number) {
    await updateApplicationStatus(applicationId, jobPostId, "accepted");
}

export async function rejectApplication(applicationId: number, jobPostId: number) {
    await updateApplicationStatus(applicationId, jobPostId, "rejected");
}
