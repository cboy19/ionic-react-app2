import React, {Suspense} from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";
import Courses from "./Courses";
//import AllGoals from "./AllGoals";
import CourseGoals from "./CourseGoals";
import { list, trophyOutline } from "ionicons/icons";

const AllGoals = React.lazy(() => import('./AllGoals'));

const CourseTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
      <Redirect path="/courses" to="/courses/list" exact/>
        <Switch>        
          <Route exact path="/courses/list" component={Courses} />
          <Route path="/courses/all-goals" exact 
            render = {() => (<Suspense fallback={<div>Loading...</div>}><AllGoals /></Suspense>)}
          />
          <Route path="/courses/:courseId"  component={CourseGoals} />      
        </Switch>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="allgoals" href="/courses/all-goals">
          <IonIcon icon={list} />
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses/list">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default CourseTabs;
