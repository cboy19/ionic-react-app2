import React from "react";

export interface Course {
  id: string;
  title: string;
  enrolled: Date;
  goals: Goal[];
  included: boolean;
}

export interface Goal {
  id: string;
  text: string;
}

interface CourseContext {
  courses: Course[];
  addCourse: (title: string, date: Date) => void;
  addGoal: (courseId: string, text: string) => void;
  deleteCourse: () => void;
  deleteGoal: (courseId: string, goalId: string) => void;
  updateGoal: (courseId: string, goalId: string, text: string) => void;
  changeCourseFilter: (courseId: string, isIncluded:boolean) => void;
}

const CoursesContext = React.createContext<CourseContext>({
  courses: [],
  addCourse: () => {},
  addGoal: () => {},
  deleteCourse: () => {},
  deleteGoal: () => {},
  updateGoal: () => {},
  changeCourseFilter: () => {}
});


export default CoursesContext;