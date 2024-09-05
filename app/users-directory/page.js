"use client";
import { useEffect, useState } from "react";
import UserCards from "@/components/UserCards";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function UsersDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t
  async function getAllUsers() {
    try {
      const airtablePat = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
      console.log("airtablePAT", airtablePat);
      if (!airtablePat) {
        throw new Error("AIRTABLE_PAT is not defined");
      }

      const response = await axios.get(
        "https://api.airtable.com/v0/appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t",
        {
          headers: {
            Authorization: `Bearer ${airtablePat}`,
          },
        }
      );
      console.log(response.data);
      setUsers(response.data.records);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
    console.log(users.length);
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1>All Users</h1>
        <Button>Add User</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {users.map((user) => (
                <UserCards key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </>
  );
}
