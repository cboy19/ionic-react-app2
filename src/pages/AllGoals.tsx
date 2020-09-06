import React, {useContext} from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonLabel } from '@ionic/react';
// import { useHistory } from 'react-router-dom';

import courseContext from '../data/courses-context';
import { countReset } from 'console';

const AllGoals: React.FC = (props) => {

    const courseCtx = useContext(courseContext);

    const goals = courseCtx.courses.filter(course => {
        return course.included;
    }).map(course => {
        return course.goals.map( goal => {
            return {...goal, courseTitle: course.title};
        });
    }).reduce((goalArr, nestedGoals) => {
        let updatedGoalArr = goalArr;
        for (const goal of nestedGoals){
            updatedGoalArr = updatedGoalArr.concat(goal);
        }
        return updatedGoalArr;
    }, []);

    // const history = useHistory();
/*     const onClickHandler = () => {
        history.push('/course-goals');
    }; */
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>
                    All Goals
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {goals.length === 0 && <h2 className="ion-text-center">No Goals Found!</h2>}
            {goals.length > 0 && <IonList>
                {goals.map( goal => (<IonItem key={goal.id}>
                <IonLabel> 
                <h3>{goal.text}</h3> 
                <p>{goal.courseTitle}</p>
                </IonLabel>   
                </IonItem>))}
            </IonList>}
        </IonContent>
        </IonPage>
    );
}

export default AllGoals;