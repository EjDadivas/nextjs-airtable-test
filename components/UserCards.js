import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UserCards({ key, user, handleSubmit, handleDelete }) {
  return (
    <Card key={key}>
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
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
          <Button onClick={handleDelete} className="w-full" variant="outline">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
