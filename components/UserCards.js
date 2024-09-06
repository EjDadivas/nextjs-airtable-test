import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserForm } from "@/components/UserForm";

export default function UserCards({
  user,
  handleSubmit,
  handleDelete,
  type,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  gender,
  setGender,
  profile,
  setProfile,
}) {
  const handleChange = () => {
    setFirstName(user.fields.first_name);
    setLastName(user.fields.last_name);
    setEmail(user.fields.email);
    setGender(user.fields.gender);
    setProfile(user.fields.profile);
  };
  return (
    <Card>
      <CardHeader className="aspect-square bg-gray-400 rounded-xl">
        <Image
          className="m-auto"
          src={user.fields.profile}
          alt={user.fields.full_name}
          width={500}
          height={500}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <h1>
            {user.fields.first_name} {user.fields.last_name}
          </h1>
          <p>{user.fields.email}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4 justify-between">
          <UserForm
            type="edit"
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            gender={gender}
            setGender={setGender}
            handleSubmit={() => handleSubmit(user.id)}
            handleChange={handleChange}
            profile={profile}
            setProfile={setProfile}
          />
          <Button onClick={() => handleDelete(user.id)} className="w-full">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
