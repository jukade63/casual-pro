import SingleJobPost from "@/components/SingleJobPost";

export default function page({ params }: { params: { id: string } }) {
  return (
    <SingleJobPost id={params.id}/>
  )
}
