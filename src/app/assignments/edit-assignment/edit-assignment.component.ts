import { Component } from '@angular/core';
import { Assignment } from '../assigment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [MatFormField,MatDatepickerModule,FormsModule,MatFormFieldModule,MatInputModule,MatButton],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent {
  assignment: Assignment | undefined;
 // Pour les champs de formulaire
 nomAssignment = '';
 dateDeRendu?: Date = undefined;
 

 constructor(
   private assignmentsService: AssignmentsService,
   private router: Router,private route: ActivatedRoute
 ) {}

ngOnInit():void{
  const id = +this.route.snapshot.params['id'];
  this.assignmentsService.getAssignment(id).subscribe(ass =>this.assignment=ass);
  console.log("query param");
  console.log(this.route.snapshot.queryParams);
  console.log('Fragment');
  console.log(this.route.snapshot.fragment)
}

 onSaveAssignment() {
   if (!this.assignment) return;
   if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

   // on récupère les valeurs dans le formulaire
   this.assignment.nom = this.nomAssignment;
  // this.assignment.dateDeRendu = this.dateDeRendu;
   this.assignmentsService
     .uppdateAssignment(this.assignment)
     .subscribe((message) => {
       console.log(message);

       // navigation vers la home page
       this.router.navigate(['/home']);
     });
 }

}
