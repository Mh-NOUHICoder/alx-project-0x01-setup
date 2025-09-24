// components/common/UserModal.tsx
import React, { useEffect, useState } from "react";
import { UserModalProps, UserData, UserProps } from "@/interfaces";

const defaultUser = (): UserData => ({
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
  company: { name: "", catchPhrase: "", bs: "" },
});

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit, initialUser }) => {
  const [user, setUser] = useState<UserData>(defaultUser());

  useEffect(() => {
    if (initialUser) setUser(prev => ({ ...prev, ...initialUser } as UserData));
  }, [initialUser]);

  // top-level fields
  const handleChange = (field: keyof Omit<UserData, "address" | "company">, value: any) => {
    setUser(prev => ({ ...prev, [field]: value } as UserData));
  };

  // address fields (simple)
  const handleAddressChange = (field: keyof UserData["address"], value: string) => {
    setUser(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
  };

  // company fields (simple)
  const handleCompanyChange = (field: keyof UserData["company"], value: string) => {
    setUser(prev => ({ ...prev, company: { ...prev.company, [field]: value } }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user.name.trim() || !user.email.trim()) {
      alert("Name and email are required");
      return;
    }

    // ensure we pass a full UserProps (with id) as interfaces expect
    const fullUser: UserProps = {
      ...(user as UserProps),
      id: (user.id as number) ?? Math.floor(Date.now() / 1000),
    };

    onSubmit(fullUser);
    setUser(defaultUser());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mx-4"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add User</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Full name</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              placeholder="e.g. Leanne Graham"
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
              autoComplete="name"
            />
          </label>

          {/* Username */}
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Username</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              placeholder="e.g. Bret"
              value={user.username}
              onChange={(e) => handleChange("username", e.target.value)}
              autoComplete="username"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Email</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              placeholder="you@example.com"
              type="email"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
              autoComplete="email"
            />
          </label>

          {/* Phone */}
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Phone</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              placeholder="e.g. 1-770-736-8031"
              value={user.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              autoComplete="tel"
            />
          </label>

          {/* Website (full width) */}
          <label className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-600 mb-1">Website</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              placeholder="e.g. hildegard.org"
              value={user.website}
              onChange={(e) => handleChange("website", e.target.value)}
              autoComplete="url"
            />
          </label>

          {/* Address: street, city, zipcode */}
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Street</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g. Kulas Light"
              value={user.address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">City</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g. Gwenborough"
              value={user.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-600 mb-1">Zipcode</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g. 92998-3874"
              value={user.address.zipcode}
              onChange={(e) => handleAddressChange("zipcode", e.target.value)}
            />
          </label>

          {/* Company */}
          <label className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-600 mb-1">Company</span>
            <input
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g. Romaguera-Crona"
              value={user.company.name}
              onChange={(e) => handleCompanyChange("name", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              setUser(defaultUser());
            }}
            className="px-4 py-2 rounded-full border text-gray-700"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-full bg-blue-600 text-white shadow">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
