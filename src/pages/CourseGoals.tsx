import React, { useState, useRef, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  isPlatform,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { addOutline } from "ionicons/icons";
import EditModal from "../components/EditModal";
import EditableGoalItem from "../components/EditableGoalItem";
import CoursesContext from "../data/courses-context";

const CourseGoals: React.FC = () => {
  const [startDelete, setStartDelete] = useState(false);
  const [showToast, setShowToast] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [seletedGoal, setSelectedGoal] = useState() as any;
  const courseCtx = useContext(CoursesContext);

  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
  const selectedGoalIdRef = useRef<string | null>(null);

  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  const selectedCourse = courseCtx.courses.find((c) => c.id === selectedCourseId);

  const onDeleteHandler = (goalId: string) => {
    setShowToast('');
    setStartDelete(true);
    selectedGoalIdRef.current = goalId;
  };

  const onDeletingHandler = () => {
    setStartDelete(false);
    courseCtx.deleteGoal(selectedCourseId, selectedGoalIdRef.current!);
    setShowToast("Goal Deleted!!!");
  };

  const onCreateHandler = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionRef.current?.closeOpened();
    const goal = selectedCourse?.goals.find((g) => g.id === id);
    if (!goal) {
      return;
    }
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const onAddGoals = () => {
    setIsEditing(true);
    setSelectedGoal(null);
  };

  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };

  const addGoalHandler = (text: string) => {
    if (seletedGoal){
      courseCtx.updateGoal(selectedCourseId, seletedGoal.id, text );
    }
    else{
      courseCtx.addGoal(selectedCourseId,text);
    }
    
    setIsEditing(false);
  };

  let content = <h2 className="ion-text-center">No Goals Found!</h2>;
  if(!selectedCourse){
    content = <h2 className="ion-text-center">No Course Found!</h2>;
  }
  if (selectedCourse && selectedCourse.goals.length > 0){
    content = (
      <IonList>
      {selectedCourse.goals.map((goal) => (
      <EditableGoalItem key={goal.id}
      slidingOptionRef = {slidingOptionRef}
      onDeleteHandler = {onDeleteHandler.bind(null, goal.id)}
      onCreateHandler = {onCreateHandler.bind(null, goal.id)}
      text = {goal.text}
      />
      ))}
    </IonList>
    );
  }

  return (
    <React.Fragment>
      <EditModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        onSave={addGoalHandler}
        editedGoal={seletedGoal}
      />
      <IonToast
        isOpen={!!showToast}
        duration={2000} //!! - empty string to false and non empty string to true
       // onDidDismiss={() => setShowToast("")}
        message={showToast}
      />
      <IonAlert
        isOpen={startDelete}
        header="Are you sure!!!"
        message="Do you want to delete the goal"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartDelete(false);
            },
          },
          { text: "Yes", handler: onDeletingHandler },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : "No Course Found"}
            </IonTitle>{" "}
            {/* selectedCourse?.title -? means it could be null and it will not display if null */}
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={onAddGoals}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {content}
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={onAddGoals}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default CourseGoals;
