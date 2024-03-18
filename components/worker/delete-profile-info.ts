"use server"
import { getSession } from "@/lib/api-requests/fetchers";
import { BACKEND_URL } from "@/lib/constants";

export const deleteProfileInfo = async (educationId: number, userId: number, section: string) => {
    const session = await getSession()
    try {
        const res = await fetch(`${BACKEND_URL}/${section}/${educationId}/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          return {
            message: data.message
          }
        }
      } catch (error) {
        console.log(error);
      }
}