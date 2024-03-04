import Contact from "@/components/business/worker-info/Contact";
import Education from "@/components/business/worker-info/Education";
import Experience from "@/components/business/worker-info/Experience";
import Skill from "@/components/business/worker-info/Skill";
import { Card } from "@/components/ui/card";
import { getWorkerById } from "@/lib/api-requests/fetchers";

export default async function page({ params }: { params: { id: string } }) {
  const worker: Worker = await getWorkerById(+params.id);

  return (
    <Card className="max-w-5xl my-4 mx-auto p-2 space-y-2 ">
      <Contact user={worker.user} />
      <Experience experiences={worker.experiences} />
      <Education  education={worker.education}/>
      <Skill skills={worker.skills}/>
    </Card>
  );
}
