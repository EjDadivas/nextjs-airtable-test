import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function UserCards({ key, user }) {
  return (
    <Card key={key}>
      <CardHeader>
        <Image
          src={user.fields.profile}
          alt={user.fields.full_name}
          width={500}
          height={500}
        />
      </CardHeader>
      <CardContent>
        <div className="flex">
          <h1>
            {user.fields.first_name} {user.fields.last_name}
          </h1>
          <p>{user.fields.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
