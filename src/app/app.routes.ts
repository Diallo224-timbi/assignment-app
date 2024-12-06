import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LogginComponent } from './loggin/loggin.component';

export const routes: Routes = [
    
    {path:'home',component:AssignmentsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'add',component:AddAssignmentComponent},
    {path:'assignments/:id',component:AssignmentDetailComponent},
    {path:'login', component: LogginComponent },
    {path:'assignment/:id/edit',component:EditAssignmentComponent},
  
]
