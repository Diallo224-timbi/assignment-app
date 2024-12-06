import { NgModule, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from './assigment.model'
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { AssignmentDetailComponent} from "./assignment-detail/assignment-detail.component";
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-assignments',
  standalone: true,
  
  imports: [CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule, MatList, MatListItem, MatDivider,
    MatListModule, 
    RouterModule,MatIcon,MatPaginator],
    

  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

// pagination
   // Liste des assignments
  totalDocs: number = 0;     // Total des documents
  totalPages: number = 0;    // Total des pages
  currentPage: number = 1;   // Page actuelle
  pageSize: number = 10;     // Nombre d'assignments par page
  nextPage!: number;          // Page suivante
  prevPage!: number;          // Page précédente
  hasPrevPage: boolean = false;  // Vérifie si il y a une page précédente
  hasNextPage: boolean = false;  // Vérifie si il y a une page suivante


  titre = "Formulaire d'ajout du devoire";
  
  boutonDesactive = true;
  formVisible = false;

    assignmentSelectionne!: Assignment; 
  

    assignments!: Assignment[];
  

    assignmentClique(assignment:Assignment) {
       this.assignmentSelectionne = assignment;
    }

    onAddAssignmentBtnClick() {
      //this.formVisible=true
    }
      /*onNouvelAssignment(event:Assignment) {
        //this.assignments.push(event)
        this.assignmentsService.addAssignment(event)
        .subscribe(message=>console.log(message));
        this.formVisible=false
      }*/
      onSupprimeAssignment() {
          this.assignments = this.assignments.filter(a => a !== this.assignmentSelectionne);
        }

        // les services

        ;

        constructor(private assignmentsService: AssignmentsService,private route:ActivatedRoute) {}
        
          ngOnInit(){
            
            this.loadAssignments();
            //this.assignments = this.assignmentsService.getAssignments();
            //this.getAssignments();
            // pour assurer la pagination
           /*this.assignmentsService.getAssignmentPagine(this.page, this.limit).subscribe(
            data=>{
              this.assignments = data.docs;
              this.totalDocs = data.totalDocs;
              this.totalPage = data.totalPage;
              this.nextPage = data.nextPage;
              this.prevPage = data.prevPage;
              this.hasPrevPage = data.hasPrevPage;
              this.hasNextPage = data.hasNextPage;
              console.log("données reçues")
            }
           ) */
      
          }

      getAssignments(){
            this.assignmentsService.getAssignments()
            .subscribe(assignments => this.assignments =assignments);
      }
      peuplerBd(): void{
        this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
          console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES");
      });
      window.location.reload();

    }
// Pagination

// Charge les assignments depuis le service
loadAssignments(): void {
  this.assignmentsService.getAssignmentPagine(this.currentPage, this.pageSize).subscribe(data => {
    this.assignments = data.docs;
    this.totalDocs = data.totalDocs;
    this.totalPages = data.totalPages;
    this.nextPage = data.nextPage;
    this.prevPage = data.prevPage;
    this.hasPrevPage = data.hasPrevPage;
    this.hasNextPage = data.hasNextPage;
    console.log("Données reçues : ", data);
  });
}

// Méthode de gestion du changement de page (appelée par mat-paginator)
onPageChange(event: any) {
  this.currentPage = event.pageIndex + 1; // L'index des pages commence à 0, donc on ajoute 1
  this.pageSize = event.pageSize;
  this.loadAssignments(); // Recharger les assignments avec les nouveaux paramètres de pagination
}
goToNextPage(): void {
  if (this.hasNextPage) {
    this.currentPage++;
    this.loadAssignments();
  }
}

// Navigue vers la première page
goToPreviousPage(): void {
  if (this.hasPrevPage) {
    this.currentPage--;
    this.loadAssignments();
  }
}
goToFirstPage(): void {
  this.currentPage = 1;
  this.loadAssignments();
}

// Navigue vers la dernière page
goToLastPage(): void {
  this.currentPage = this.totalPages;
  this.loadAssignments();
}
}
