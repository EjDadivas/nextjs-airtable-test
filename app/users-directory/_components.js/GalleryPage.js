"use client";
import { useEffect, useState } from "react";
import UserCards from "@/components/UserCards";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/UserForm";

export default function GalleryPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profile, setProfile] = useState("");
  const [recordId, setRecordId] = useState("");
  const [error, setError] = useState("");

  const getAllUsers = async () => {
    try {
      const airtablePat = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
      console.log("airtablePAT", airtablePat);
      if (!airtablePat) {
        throw new Error("AIRTABLE_PAT is not defined");
      }
      const response = await axios.get(
        "https://api.airtable.com/v0/appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t?view=viw8yEN4VrWplyRU2",
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
    setLoading(true); // Start loading
    try {
      const airtablePat = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
      if (!airtablePat) {
        throw new Error("AIRTABLE_PAT is not defined");
      }

      const userData = {
        fields: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          profile: profile,
        },
      };

      // Update existing user
      const response = await axios.post(
        `https://api.airtable.com/v0/appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${airtablePat}`,
          },
        }
      );
      console.log("User updated:", response.data);

      // After saving, fetch users again to refresh the list
      await getAllUsers();
      // Reset user details and recordId after saving
      onOpenAdd();
    } catch (error) {
      console.error("Error saving user:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteUser = async (id) => {
    setLoading(true); // Start loading
    try {
      const airtablePat = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
      if (!airtablePat) {
        throw new Error("AIRTABLE_PAT is not defined");
      }
      await axios.delete(
        `https://api.airtable.com/v0/appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t/${id}`,
        {
          headers: {
            Authorization: `Bearer ${airtablePat}`,
          },
        }
      );
      // After deletion, fetch users again
      await getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const updateUser = async (recordId) => {
    console.log("updateUser", recordId);
    setLoading(true); // Start loading

    try {
      const airtablePat = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
      console.log("airtablePAT", airtablePat);
      if (!airtablePat) {
        throw new Error("AIRTABLE_PAT is not defined");
      }
      const response = await axios.patch(
        `https://api.airtable.com/v0/appR3ShiTapFwS5bb/tblQMbaeFRQ7Cty5t/${recordId}`,
        {
          fields: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            gender: gender,
            profile: profile,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${airtablePat}`,
          },
        }
      );
      getAllUsers();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const onOpenAdd = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setGender("");
    setProfile("");
  };
  const searchUser = async () => {};

  //initial useEffect
  useEffect(() => {
    getAllUsers();
    console.log(users.length);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log(`Users updated: ${users.length}`);
    }
  }, [users]);
  return (
    <div className="p-12">
      <div className="w-full flex justify-between items-center mb-12">
        <h1>All Users</h1>
        <UserForm
          type="add"
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          profile={profile}
          setProfile={setProfile}
          gender={gender}
          setGender={setGender}
          handleSubmit={saveUser}
          handleChange={onOpenAdd}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {users.map((user) => (
                <div key={user.id}>
                  <UserCards
                    user={user}
                    handleSubmit={updateUser}
                    handleDelete={deleteUser}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    gender={gender}
                    setGender={setGender}
                    profile={profile}
                    setProfile={setProfile}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}
