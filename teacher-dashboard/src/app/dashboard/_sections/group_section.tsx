"use client";

import React, { useState, useEffect } from "react";
import styles from "./group_section.module.css";
import GroupDetails from "../_components/groupDetail";
import {
  fetchGroupsWithDetails,
  GroupDetailsType,
} from "../../../api/groupsApi";
import { useSessionContext } from "../../../context/SessionContext";

const statusOrder = {
  error: 1,
  warning: 2,
  success: 3,
};

// fix color type, neutral should be green, groups with two red should be red, groups wiht 3 yellow should be yellow, groups with 1 red and 1 yellow should be red

export default function GroupSection() {
  const [groups, setGroups] = useState<GroupDetailsType[]>([]);
  const { sessionId } = useSessionContext();

  const sortedGroups = [...groups].sort(
    // @ts-ignore
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  useEffect(() => {
    fetchGroupsWithDetails(sessionId)
      .then((groups: GroupDetailsType[]) => {
        setGroups(groups);
        console.log("Groups loaded:", groups);
      })
      .catch((err) => {
        console.error("Error loading groups:", err);
      });
  }, []);

  return (
    <section className={styles.containter}>
      <h2 className={styles.title}>Group Overview</h2>
      {sortedGroups.map((group, index) => (
        <GroupDetails
          key={index}
          status={group.status}
          progress_value={group.progress_value}
          progress={group.progress}
          group_number={group.group_number}
          engagement={group.engagement}
          AiSuggestions={group.AiSuggestions}
          // @ts-ignore
          students={group.students}
          ClassEngagementAvg={group.classEngagementAvg}
          ClassProgressionAvg={group.classProgressionAvg}
        />
      ))}
    </section>
  );
}
