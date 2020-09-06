import React, {useState, useContext} from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonMenuButton,
  IonIcon,
  isPlatform,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import CreateCourseModel from "../components/CreateCourseModel";
import CourseItem from "../components/CourseItem";
import CoursesContext from '../data/courses-context';

export const COURSE_DATA = [
  {
    id: "1",
    title: "Ionic + React - Complete guide",
    enrolled: new Date("03/02/2020"),
    goals: [
      {id: 'A1', text: 'finish the goal'},
      {id: 'A2', text: 'complete ASAP'}
    ]
  },
  {
    id: "2",
    title: "React - Complete guide",
    enrolled: new Date("03/02/2020"),
    goals: [
      {id: 'B1', text: 'finish the goal'},
      {id: 'B2', text: 'complete ASAP'}
    ]
  },
  {
    id: "3",
    title: "JavaScript - Complete guide",
    enrolled: new Date("03/02/2020"),
    goals: [
      {id: 'C1', text: 'finish the goal'},
      {id: 'C2', text: 'complete ASAP'}
    ]
  },
];

const Courses: React.FC = (props) => {
  // const history = useHistory();
  /*     const onClickHandler = () => {
        history.push('/course-goals');
    }; */

  const [course, setCourse] = useState(false);
  const courseCtx = useContext(CoursesContext);

  const onAddCourse = () => {
    setCourse(true);
  };  

  const onCancelHandler = () => {
    setCourse(false);
  };

  const onSaveHandler = (title: string, date: Date) => {
    courseCtx.addCourse(title, date);
    setCourse(false);
  }


  return (
    <React.Fragment>
    <CreateCourseModel show={course} 
                        onCancel={onCancelHandler} 
                        onSave={onSaveHandler}
                        />
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
        {!isPlatform('android') && <IonButtons slot="end">
          <IonButton onClick={onAddCourse}> 
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>}
      </IonHeader>
      <IonContent>
        {/*     <h2>This is a courses page</h2>
            <div>
                <IonButton routerLink="/course-goals">Course Goals</IonButton>
       */}{" "}
        {/* <IonButton onClick={onClickHandler}>Course Goals</IonButton> */}
        {/* </div> */}
        <IonGrid>
          {courseCtx.courses.map((course) => (
            <IonRow key={course.id}>
              <IonCol size-md="4" offset-md="4">
                <CourseItem course={course} />
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton color="secondary" onClick={onAddCourse}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
    </React.Fragment>
  );
};

export default Courses;
