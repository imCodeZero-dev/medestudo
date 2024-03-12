import styles from "./TagsManagement.module.css";
import { TagsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

// import { useCookies } from "react-cookie";

import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useTagsManagement } from "./hook";

import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";

const TagsManagement = ({}: TagsManagementProps) => {
  const { localeTitles } = useLocale();
  // const [cookies] = useCookies(["admin"]);
  const { control } = useTagsManagement();
  // console.log("cookies", cookies);

  const headers = ["ID", "Title", "Created On", "Status", "Action"];
  const data = [
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },

    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Clinic",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Medical",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title: "Surgery",
    },
  ];
  const handleStatusToggle = (data: any) => {
    console.log("handleStatusToggle", data);
  };

  return (
    <AdminLayout>
      <div className={styles["TagsManagement"]}>
        <div className={styles["TagsManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_TAGS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
        </div>

        <div className={styles["TagsManagement-section"]}>
          <CustomTable
            headers={headers}
            data={data}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={true}
            title={localeTitles?.TITLE_TAGS}
            showHeader
            handleStatusToggle={handleStatusToggle}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default function TagsManagementServices() {
  return (
    <AdminRoutes>
      <TagsManagement />
    </AdminRoutes>
  );
}
