export interface UserDropdownProps {
  handleOpenLogout: () => void;
  userData?: {
    pic: string;
    name: string;
    email: string;
    username: string;
    _id: string;
  };
  userType: "Professor" | "Admin" | "Student";
}
