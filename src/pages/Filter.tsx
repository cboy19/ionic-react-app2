import React, { useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButtons,
  IonLabel,
  IonItem,
  IonList,
  IonToggle,
} from "@ionic/react";

import CourseContext from "../data/courses-context";

const Filter: React.FC = () => {
  const courseCtx = useContext(CourseContext);

  const courseFilterHandler = (event: CustomEvent) => {
    courseCtx.changeCourseFilter(event.detail.value, event.detail.checked);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {courseCtx.courses.map((course) => (
            <IonItem key={course.id}>
              <IonLabel>{course.title}</IonLabel>
              <IonToggle 
              checked={course.included}
              value={course.id} 
              onIonChange={courseFilterHandler} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Filter;
