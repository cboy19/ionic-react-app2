import React, { useState } from "react";
import CouresesContext, { Course, Goal } from "./courses-context";

const CoursesContextProvider: React.FC = (props) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "2",
      title: "React - Complete guide",
      enrolled: new Date("03/02/2020"),
      goals: [
        { id: "B1", text: "finish the goal" },
        { id: "B2", text: "complete ASAP" },
      ],
      included: true,
    },
  ]);

  const addCourse = (title: string, date: Date) => {
    const newCourse: Course = {
      id: Math.random.toString().trim(),
      title,
      enrolled: date,
      goals: [],
      included: true,
    };

    setCourses((prevCourses) => {
      return prevCourses.concat(newCourse);
    });
  };

  const addGoal = (courseId: string, text: string) => {
    const newGoal: Goal = {
      id: Math.random().toString(),
      text: text,
    };

    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updateCourseGoals = updatedCourses[updatedCourseIndex].goals.concat(
        newGoal
      );
      // avoid mutating the oringina objects or arrays instead copy those
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updateCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  const deleteCourse = () => {};

  const deleteGoal = (courseId: string, goalId: string) => {
    setCourses((prevCourses) => {
      const updateCourses = [...prevCourses];
      const updateCourseIndex = updateCourses.findIndex(
        (course) => course.id === courseId
      );
      const updateCourse = { ...updateCourses[updateCourseIndex] };
      const updateGoal = updateCourse.goals.filter(
        (goal) => goal.id !== goalId
      );
      updateCourse.goals = updateGoal;
      updateCourses[updateCourseIndex] = updateCourse;
      return updateCourses;
    });
  };

  const updateGoal = (courseId: string, goalId: string, text: string) => {
    setCourses((prevCourses) => {
      const updateCourses = [...prevCourses];
      const updateCourseIndex = updateCourses.findIndex(
        (course) => course.id === courseId
      );
      const updateCourse = { ...updateCourses[updateCourseIndex] };
      const updateGoal = updateCourse.goals.slice();
      const updateGoalIndex = updateGoal.findIndex(
        (goal) => goal.id === goalId
      );
      const updatedGoal = { ...updateGoal[updateGoalIndex], text };
      updateGoal[updateGoalIndex] = updatedGoal;
      updateCourse.goals = updateGoal;
      updateCourses[updateCourseIndex] = updateCourse;
      return updateCourses;
    });
  };

  const changeCourseFilter = (courseId: string, isIncluded: boolean) => {
    setCourses((prevCourses) => {
      const updateCourses = [...prevCourses];
      const updateCourseIndex = updateCourses.findIndex(
        (course) => course.id === courseId
      );
      const updateCourse = {...updateCourses[updateCourseIndex], included: isIncluded};
      updateCourses[updateCourseIndex] = updateCourse;
      return updateCourses;
    });
  };

  return (
    <CouresesContext.Provider
      value={{
        courses, // same as  courses: courses if the names are same
        addCourse, // same as  addCourse: addCourse if the names are same
        addGoal: addGoal,
        deleteCourse: deleteCourse,
        deleteGoal: deleteGoal,
        updateGoal: updateGoal,
        changeCourseFilter
      }}
    >
      {props.children}
    </CouresesContext.Provider>
  );
};

export default CoursesContextProvider;
