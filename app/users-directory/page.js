"use client";
import { useEffect, useState } from "react";
import UserCards from "@/components/UserCards";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/UserForm";

export default function UsersDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profile, setProfile] = useState("");
  const [recordId, setRecordId] = useState("");

  const getAllUsers = async () => {
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
  };

  const saveUser = async () => {
    console.log("saveUser()");
  };

  const deleteUser = async () => {
    console.log("deleteUser()");
  };

  const updateUser = async () => {
    console.log("updateUser");
  };

  const searchUser = async () => {};

  useEffect(() => {
    getAllUsers();
    console.log(users.length);
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center ">
        <h1>All Users</h1>
        <UserForm
          type="add"
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          gender={gender}
          setGender={setGender}
          handleSubmit={saveUser}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {users.map((user) => (
                <UserCards
                  key={user.id}
                  user={user}
                  handleSubmit={updateUser}
                  handleDelete={deleteUser}
                />
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
