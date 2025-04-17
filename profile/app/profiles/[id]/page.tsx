import { ProfileForm } from "@/components/profile-form"

export default function EditProfile({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile #{params.id}</h1>
      <ProfileForm id={params.id} />
    </div>
  )
}
