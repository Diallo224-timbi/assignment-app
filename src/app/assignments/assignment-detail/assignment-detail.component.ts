import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Assignment } from '../assigment.model';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule,
            MatCard,
            MatCardTitle,
            MatCardSubtitle,
            MatCheckboxModule,MatButtonModule,MatTooltip,MatCardActions
          ],
    templateUrl: './assignment-detail.component.html',
    styleUrl: './assignment-detail.component.css'
  })
export class AssignmentDetailComponent implements OnInit {
  @Output() supprimerAssignment = new EventEmitter<Assignment>() 
 
  /*@Input()*/ assignmentTransmis!:Assignment;
  //authService: any;
  rendu!: boolean;

  

  constructor(private assignmentsService: AssignmentsService, private route:ActivatedRoute,
    private router:Router, private authService: AuthService) {
      //this.assignmentsService = new AssignmentsService();
      this.assignmentsService.uppdateAssignment(this.assignmentTransmis)
      .subscribe(message=>console.log(message))
  }
  onAssignmentRendu(){
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu=true;
      this.assignmentsService.uppdateAssignment(this.assignmentTransmis).subscribe(message=>{
        console.log(message)
        this.router.navigate(['/home'])
      })
    }
   
  }
  onDelElem(){
    const newAssignment = new Assignment();
    //this.assignments.push(newAssignment) 
    this.supprimerAssignment.emit(newAssignment)
  }
  onDelete(){
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message)=>console.log(message));

     if(!this.assignmentTransmis)return ;

     this.router.navigate(['/home']);
  }

onClickEdit(){
  this.router.navigate(["/assignment",this.assignmentTransmis.id,"edit"],
    {queryParams:{nomDevoir:this.assignmentTransmis.nom},fragment:"edition"}
  );
}

  ngOnInit(): void{
    this.getAssignment()
  }

  getAssignment(){
    const id = Number (this.route.snapshot.params['id']);
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => this.assignmentTransmis = assignment);

  }
  isAdmin():boolean{
    /*if(this.authService.isAdmine()){
      return this.authService.isLogged() && this.authService.isAdmine();
    }
    return true;*/
    return this.authService.isLogged() && this.authService.isAdmine();
  }
  canEdit(): boolean {
    return this.authService.isLogged() && this.authService.isAdmine();
  }
}
