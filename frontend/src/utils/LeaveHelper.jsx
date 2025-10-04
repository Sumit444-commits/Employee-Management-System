import { useNavigate } from "react-router-dom";

export const leaveColumns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:"170px"
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width:"80px"
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width:"120px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true"
  },
];

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(`/admin-dashboard/leave/${id}`);
      }}
      className="px-3 py-1 text-white bg-blue-600"
    >
      View
    </button>
  );
};
