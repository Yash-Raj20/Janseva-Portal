/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/User/AuthContext";
import axios from "../../../api/User/axios";
import { toast } from "react-toastify";
import {
  Activity,
  BadgeCheck,
  Cake,
  CalendarDays,
  LayoutList,
  ListChecks,
  ListTodo,
  MailCheck,
  MapPin,
  MonitorCheck,
  PersonStanding,
  Phone,
  UserRoundPen,
  X,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    dob: "",
    gender: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!user) return;
    axios
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        const User = res.data.user;
        setProfile(res.data);
        setEditData({
          name: User.name,
          phone: User.phone || "",
          location: User.location || "",
          bio: User.bio || "",
          gender: User.gender || "",
          dob: User.dob ? User.dob : "",
        });
        setError(null);
      })
      .catch(() => setError("Failed to load profile. Please try again later."))
      .finally(() => setLoading(false));
  }, [user]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (selectedImage) formData.append("profileImage", selectedImage);

      const res = await axios.put("/auth/profile", formData, {
        withCredentials: true,
      });
      setProfile((prev) => ({ ...prev, user: res.data.user }));
      toast.success("Profile updated successfully");
      setShowEditModal(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <Message text="Please log in to view your profile." />;
  if (loading) return <Message text="Loading profile..." />;
  if (error) return <Message text={error} error />;

  const User = profile?.user || {};
  const problems = profile?.problems || [];
  const stats = {
    total: problems.length,
    pending: problems.filter(
      (p) => p.status !== "Resolved" && p.status !== "Process"
    ).length,
    process: problems.filter((p) => p.status === "Process").length,
    solved: problems.filter((p) => p.status === "Resolved").length,
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-200 to-white text-[#0C2218]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 p-4">
        <img
          src={
            (User && User.profileImage) ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              User.name
            )}&background=0C2218&color=fff&size=128`
          }
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-full border-4 border-[#0C2218] shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{User.name}</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-700 max-w-lg md:max-w-lg lg:max-w-5xl">
            {User.bio ||
              "Add your bio. This will help others know more about you."}
          </p>
          <button
            onClick={() => setShowEditModal(true)}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#0C2218] text-white rounded-md hover:bg-[#103028] transition text-sm"
          >
            <UserRoundPen size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        >
          <FormFields
            editData={editData}
            setEditData={setEditData}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            fileError={fileError}
            setFileError={setFileError}
          />
        </Modal>
      )}

      {/* Info Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          icon={<MailCheck size={22} />}
          label="Email"
          value={User?.email || "Not Provide"}
        />
        <InfoRow
          icon={<Phone size={22} />}
          label="Phone"
          value={User.phone || "N/A"}
        />
        <InfoRow
          icon={<MapPin size={22} />}
          label="Location"
          value={User.location || "Not specified"}
        />
        <InfoRow
          icon={<CalendarDays size={22} />}
          label="Joined"
          value={new Date(User.createdAt).toLocaleDateString()}
        />
        <InfoRow
          icon={<Cake size={22} />}
          label="Date of Birth"
          value={
            User.dob
              ? new Date(User.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not specified"
          }
        />

        <InfoRow
          icon={<PersonStanding size={22} />}
          label="Gender"
          value={User.gender}
        />
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Issues Raised"
          count={stats.total}
          icon={<ListTodo size={28} />}
        />
        <StatCard
          title="Issues Pending"
          count={stats.pending}
          icon={<ListChecks size={28} />}
          color="bg-yellow-100"
        />
        <StatCard
          title="Issues Under Process"
          count={stats.process}
          icon={<LayoutList size={28} />}
          color="bg-blue-100"
        />
        <StatCard
          title="Issues Solved"
          count={stats.solved}
          icon={<BadgeCheck size={28} />}
          color="bg-green-100"
        />
      </div>

      {/* Achievements */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Achievements</h3>
        <div className="flex gap-3 flex-wrap">
          {["5 Issues Resolved", "Early Adopter", "Community Helper"].map(
            (a, i) => (
              <span
                key={i}
                className="bg-yellow-300 px-3 py-1 rounded-full text-sm"
              >
                {a}
              </span>
            )
          )}
        </div>
      </div>

      {/* Activity */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityList
          title="Recent Activity"
          icon={<Activity size={20} />}
          items={problems.slice(0, 5).map((p, i) => ({
            key: i,
            text: `${p.status === "Solved" ? "Solved" : "Created"} "${
              p.title
            }"`,
            date: new Date(p.updatedAt || p.createdAt).toLocaleDateString(),
          }))}
        />

        <ActivityList
          title="Login & Device Activity"
          icon={<MonitorCheck size={20} />}
          items={(User.loginActivity || []).map((a, i) => ({
            key: i,
            text: `${a.device || "Unknown Device"} - ${
              a.location || "Unknown Location"
            }`,
            date: new Date(a.timestamp).toLocaleString(),
          }))}
        />
      </div>
    </div>
  );
}

const Message = ({ text, error }) => (
  <div
    className={`p-6 min-h-screen flex items-center justify-center ${
      error ? "text-red-600" : "text-gray-600"
    }`}
  >
    {text}
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-zinc-100 rounded-xl shadow-sm">
    {icon}
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-gray-600">{value}</p>
    </div>
  </div>
);

const StatCard = ({ title, count, icon, color = "bg-gray-200" }) => (
  <div className={`p-4 rounded-2xl shadow-sm ${color}`}>
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  </div>
);

const ActivityList = ({ title, icon, items }) => (
  <div className="bg-zinc-200 p-4 rounded-2xl shadow-sm">
    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 border-b border-gray-400 pb-2">
      {icon} {title}
    </h3>
    {items.length ? (
      <ul className="space-y-3">
        {items.map(({ key, text, date }) => (
          <li
            key={key}
            className="bg-zinc-100 p-3 rounded-lg text-sm hover:shadow transition-shadow duration-300"
          >
            <span className="font-medium">{text}</span> -{" "}
            <span className="text-gray-600">{date}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-600">No data available.</p>
    )}
  </div>
);

const Modal = ({ onClose, onSubmit, children }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto hide-scrollbar">
    <div className="bg-white rounded-xl shadow-lg w-full mt-52 max-w-2xl p-6 relative">
      <button
        onClick={onClose}
        title="Close"
        className="absolute top-3 right-3 p-1 bg-gray-200 rounded-full hover:bg-red-600 hover:text-white transition-all"
      >
        <X size={18} />
      </button>
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  </div>
);

const FormFields = ({
  editData,
  setEditData,
  setSelectedImage,
  selectedImage,
  fileError,
  setFileError,
}) => (
  <>
    {["name", "phone", "location", "bio", "dob", "gender"].map((field) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {field.replace("dob", "Date of Birth").replace("bio", "Bio")}
        </label>
        {field === "bio" ? (
          <textarea
            value={editData[field]}
            onChange={(e) =>
              setEditData({ ...editData, [field]: e.target.value })
            }
            rows="3"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        ) : field === "gender" ? (
          <select
            value={editData[field]}
            onChange={(e) =>
              setEditData({ ...editData, gender: e.target.value })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        ) : (
          <input
            type={field === "dob" ? "date" : "text"}
            value={
              field === "dob" && editData[field]
                ? editData[field].split("T")[0]
                : editData[field] || ""
            }
            onChange={(e) =>
              setEditData({ ...editData, [field]: e.target.value })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        )}
      </div>
    ))}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size > 10 * 1024 * 1024) {
              setFileError("File size should not exceed 10 MB");
              setSelectedImage(null);
            } else {
              setFileError("");
              setSelectedImage(file);
            }
          }
        }}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
      />

      {selectedImage && !fileError && (
        <p className="mt-1 text-xs text-gray-500">
          Selected: {selectedImage.name}
        </p>
      )}

      {fileError && <p className="mt-1 text-xs text-red-500">{fileError}</p>}
    </div>
    <div className="pt-4">
      <button
        type="submit"
        className="w-full rounded-lg bg-[#0C2218] px-4 py-2 text-white hover:bg-[#0f291d]"
      >
        Save Changes
      </button>
    </div>
  </>
);
