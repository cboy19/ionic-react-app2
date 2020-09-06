import React from 'react';
import { IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { create, trash } from 'ionicons/icons';

const EditableGoalItem: React.FC<{
    slidingOptionRef: React.Ref<HTMLIonItemSlidingElement>;
    onDeleteHandler: () => void;
    onCreateHandler: (event: React.MouseEvent) => void;
    text: string;

}> = (props) => {

    return (
        <IonItemSliding  ref={props.slidingOptionRef}>
        <IonItemOptions side="start">
          <IonItemOption onClick={props.onDeleteHandler} color="danger">
            <IonIcon slot="icon-only" icon={trash} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem>
          <IonLabel>{props.text}</IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption
            onClick={props.onCreateHandler}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    );
};

export default EditableGoalItem;