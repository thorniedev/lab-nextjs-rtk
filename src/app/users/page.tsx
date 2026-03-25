import { userType } from "../../types/userType";
import UserCard from "../../components/user/UserCard";
import Link from "next/link";
import { fetchData } from "@/data/fetchData";

export default async function UsersPage() {



  const users : userType[] = await fetchData("users");

  return (
    <main>
      <section className="w-full mx-auto my-10">
        <h2 className="font-bold text-[24px] text-blue-700 uppercase text-center">
          Users Page
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <UserCard user={user} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
