import React, { useState, useRef } from "react";
import {
  IonModal,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime,
  IonText,
} from "@ionic/react";

const CreateCourseModel: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (title: string, date:Date) => void;
}> = (props) => {
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);

  const saveHandle = () => {
    const enteredTitle = titleRef.current!.value; //! typescript know this value is allways avaliable
    const enteredDate = dateRef.current?.value; //? typescript doesnt know if this value is allways avaliable
    if (
      !enteredTitle ||
      !enteredDate ||
      enteredTitle.toString().trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      setError("Please enter a valid title and date");
      return;
    }
    setError('');
    props.onSave(enteredTitle.toString(), new Date (enteredDate));
  };
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Enter Course Title</IonLabel>
                <IonInput
                  ref={titleRef}
                  type="text"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Enter Enrollment Date</IonLabel>
                <IonDatetime ref={dateRef} displayFormat="MM/DD/YYYY" />
              </IonItem>
            </IonCol>
          </IonRow>
          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                color="secondary"
                expand="block"
                onClick={saveHandle}
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default CreateCourseModel;
