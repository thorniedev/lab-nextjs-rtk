import Image from "next/image";
import { getImageProxySrc } from "@/lib/utils";
import { userType } from "../../types/userType";

type Props = {
  user: userType;
};

export default function UserCard({ user }: Props) {
  return (
    <div className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white/100 text-center">
      
      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <Image
          src={getImageProxySrc(
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          )}
          alt="User Avatar"
          width={80}
          height={80}
          unoptimized
          className="rounded-full border"
        />
      </div>

      {/* Name */}
      <h3 className="font-bold text-lg text-gray-800">
        {user.name.firstname} {user.name.lastname}
      </h3>

      {/* Username */}
      <p className="text-sm text-gray-500">@{user.username}</p>

      {/* Info */}
      <div className="mt-3 text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-semibold">City:</span> {user.address.city}
        </p>
      </div>
    </div>
  );
}
