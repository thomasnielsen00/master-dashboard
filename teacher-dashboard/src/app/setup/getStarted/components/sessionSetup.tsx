// "use client";

// import React, { useState } from "react";
// import styles from "./sessionSetup.module.css";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import TextField from "@mui/material/TextField";

// type student = {
//   name: string;
//   id: string;
// };

// type group = {
//   id: number;
//   group_number: number;
//   students: student[];
// };

// export default function SessionSetup() {
//   const [totalGroups, setTotalGroups] = useState(0);
//   const [groups, setGroups] = useState<group[]>([]);
//   const [student, setStudent] = useState("");

//   const addGroup = () => {
//     setTotalGroups((prev) => prev + 1);
//     setGroups((prevGroups) => [
//       ...prevGroups,
//       {
//         id: prevGroups.length + 1,
//         group_number: prevGroups.length + 1,
//         students: [], // No students initially
//       },
//     ]);
//   };

//   const removeGroup = () => {
//     setTotalGroups((prev) => Math.max(0, prev - 1));
//     setGroups((prevGroups) => prevGroups.slice(0, -1)); // Remove last group
//   };

//   const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTotal = Number(e.target.value);

//     if (newTotal < 0) return;

//     setTotalGroups(newTotal);

//     setGroups((prevGroups) => {
//       if (newTotal > prevGroups.length) {
//         const newGroups = Array.from(
//           { length: newTotal - prevGroups.length },
//           (_, i) => ({
//             id: prevGroups.length + i + 1,
//             group_number: prevGroups.length + i + 1,
//             students: [],
//           })
//         );
//         return [...prevGroups, ...newGroups];
//       } else {
//         return prevGroups.slice(0, newTotal);
//       }
//     });
//   };

//   const handleNameAdd = () => {};

//   console.log(groups);

//   return (
//     <div className={styles.container}>
//       <label htmlFor="input">Select number of groups: </label>
//       <button className={styles.minus} onClick={removeGroup}>
//         <RemoveIcon fontSize="small" />
//       </button>
//       <input
//         type="number"
//         min={0}
//         value={totalGroups}
//         onChange={handleGroupChange}
//         style={{
//           padding: "0.5rem",
//           marginBottom: "10px",
//           width: "60px",
//           border: "1px solid #ccc",
//         }}
//       />
//       <button className={styles.pluss} onClick={addGroup}>
//         <AddIcon fontSize="small" />
//       </button>
//       <div>
//         {groups.map((group) => (
//           <div
//             key={group.id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               marginBottom: "10px",
//             }}
//           >
//             <input
//               type="text"
//               min={0}
//               placeholder="Student name"
//               value={student}
//               onChange={(e) => setStudent(e.target.value)}
//               style={{
//                 padding: "0.1rem",
//                 borderRadius: 3,
//                 width: "60px",
//                 border: "1px solid #ccc",
//               }}
//             />

//             <h3>Group {group.group_number}</h3>
//             {group.students.map((student) => (
//               <div key={student.id}>{student.name}</div>
//             ))}
//             <p>Students:</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import styles from "./sessionSetup.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";

type student = {
  name: string;
  id: string;
};

type group = {
  id: number;
  group_number: number;
  students: student[];
};

export default function SessionSetup() {
  const [totalGroups, setTotalGroups] = useState(0);
  const [groups, setGroups] = useState<group[]>([]);
  const router = useRouter();
  const [studentInputs, setStudentInputs] = useState<{ [key: number]: string }>(
    {}
  );

  const addGroup = () => {
    setTotalGroups((prev) => prev + 1);
    setGroups((prevGroups) => [
      ...prevGroups,
      {
        id: prevGroups.length + 1,
        group_number: prevGroups.length + 1,
        students: [],
      },
    ]);
  };

  const removeGroup = () => {
    setTotalGroups((prev) => Math.max(0, prev - 1));
    setGroups((prevGroups) => prevGroups.slice(0, -1));
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = Number(e.target.value);
    if (newTotal < 0) return;

    setTotalGroups(newTotal);
    setGroups((prevGroups) => {
      if (newTotal > prevGroups.length) {
        const newGroups = Array.from(
          { length: newTotal - prevGroups.length },
          (_, i) => ({
            id: prevGroups.length + i + 1,
            group_number: prevGroups.length + i + 1,
            students: [],
          })
        );
        return [...prevGroups, ...newGroups];
      } else {
        return prevGroups.slice(0, newTotal);
      }
    });
  };

  const handleStudentChange = (groupId: number, value: string) => {
    setStudentInputs((prev) => ({ ...prev, [groupId]: value }));
  };

  const handleStudentAdd = (groupId: number) => {
    const rawName = studentInputs[groupId]?.trim();
    const name =
      rawName?.charAt(0).toUpperCase() + rawName?.slice(1).toLowerCase();
    if (!name) return;

    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              students: [...group.students, { id: crypto.randomUUID(), name }],
            }
          : group
      )
    );

    setStudentInputs((prev) => ({ ...prev, [groupId]: "" })); // Clear input
  };

  const handleStudentRemove = (groupId: number, studentId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              students: group.students.filter(
                (student) => student.id !== studentId
              ),
            }
          : group
      )
    );
  };

  const handleConfirmGroups = () => {
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupNumberContainer}>
        <label htmlFor="input">Select number of groups </label>
        <div className={styles.groupNumber}>
          <button className={styles.minus} onClick={removeGroup}>
            <RemoveIcon fontSize="small" />
          </button>
          <input
            type="number"
            min={0}
            value={totalGroups}
            onChange={handleGroupChange}
            className={styles.groupInput}
          />
          <button className={styles.pluss} onClick={addGroup}>
            <AddIcon fontSize="small" />
          </button>
        </div>
      </div>
      <Divider
        sx={{
          fontSize: 14,
          color: "#686666",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
        }}
      >
        Your groups
      </Divider>
      <div className={styles.groupsContainer}>
        {groups.map((group) => (
          <div key={group.id} className={styles.group}>
            <h3>Group {group.group_number}</h3>
            <Divider />
            <p>Students:</p>

            <input
              type="text"
              placeholder="Name"
              value={studentInputs[group.id] || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission if inside a form
                  handleStudentAdd(group.id);
                }
              }}
              onChange={(e) => handleStudentChange(group.id, e.target.value)}
              style={{
                padding: "0.1rem",
                borderRadius: 3,
                width: "120px",
                border: "1px solid #ccc",
              }}
            />
            <button onClick={() => handleStudentAdd(group.id)}>
              <AddIcon fontSize="small" />
            </button>

            {group.students.map((student) => (
              <div
                key={student.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {student.name}
                <button
                  onClick={() => handleStudentRemove(group.id, student.id)}
                >
                  <PersonRemoveIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      {totalGroups ? (
        <div className={styles.confirmButtonContainer}>
          <button
            className={styles.confirmButton}
            onClick={() => handleConfirmGroups()}
          >
            Confirm groups
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
