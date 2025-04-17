import { ProfileForm } from "@/components/profile-form"

export default function NewProfile() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Profile</h1>
      <ProfileForm />
    </div>
  )
}
