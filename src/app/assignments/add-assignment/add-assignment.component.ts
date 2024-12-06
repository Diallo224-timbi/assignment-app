import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignment } from '../assigment.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule, 
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl:'./add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  //evenement qu'on envera au père avec la soumission du formulaire
 
  //@Output() nouvelAssignment = new EventEmitter<Assignment>() 

  id!: number;
  nomDevoir!: string;
  dateRendu!: Date;

 

  constructor(private assignmentServices:AssignmentsService,private router:Router){}

  generateRandomId(): number {
    // Génère un ID aléatoire entre 1 et 1000 par exemple
    return Math.floor(Math.random() * 1000) + 1;
  }
  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.id = this.generateRandomId(); 
    newAssignment.nom = this.nomDevoir; 
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu= false
    //this.assignments.push(newAssignment)  
    //this.nouvelAssignment.emit(newAssignment)
    
    this.assignmentServices.addAssignment(newAssignment)
    .subscribe(message=>console.log(message));
   // this.router.navigate(['/home'])
   console.log("je suis "+ newAssignment.dateDeRendu)
  }

}
