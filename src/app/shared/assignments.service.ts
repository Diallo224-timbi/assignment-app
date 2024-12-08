import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assigment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient} from '@angular/common/http';
import { bdInitialAssignments } from './data';
@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[]=[]
  
backenURL = "https://backendrender-f73d.onrender.com/api/assignments"
  constructor(private logginService: LoggingService,private http: HttpClient ) { }
  
  /*getAssignment(id:number):Observable<Assignment>{
    const a =this.assignments.find(a => a.id === id) as Assignment;
    return of (a);  
  }
  getAssignments():Observable<Assignment[]>{
    return of (this.assignments);  
  }*/
  // interaction avec Mongo Db
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backenURL);
  }
  getAssignment(id:Number):Observable<Assignment>{
    return this.http.get<Assignment>(this.backenURL+'/'+ id)
  }
  
  addAssignment(assignment:Assignment):Observable<any>{
    //this.assignments.push(assignment);
    //this.logginService.log(assignment.nom,"ajouté")
    //return of("Assignmet ajouté");
    return this.http.post<Assignment>(this.backenURL,assignment)
  }

  uppdateAssignment(assigment:Assignment):Observable<any>{
    //return of('Assignment service: assignment modifié')
    //this.logginService.log(assigment.nom,"Modifié");
    return this.http.put<Assignment>(this.backenURL,assigment)

  }
  updateRendu(assigmentRendu:Assignment):Observable<any>{
    return this.http.put<Assignment>(this.backenURL,assigmentRendu.rendu)
  }

  deleteAssignment(assigment:Assignment):Observable<any>{
  
    return this.http.delete<Assignment>(this.backenURL+"/"+assigment._id);
    
    
    
  }
  
  // peupler la base de donnée

  peuplerBDavecForkJoin():Observable<any>{
    let appelsVersAddAssignment: Observable<any> [] =[];
    bdInitialAssignments.forEach(a =>{
      const nouvelAssignment = new Assignment;
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu= new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
      console.log("ok");
    })
    return forkJoin(appelsVersAddAssignment);
  }
  peuplerBD() {
    bdInitialAssignments.forEach(a => {
        let nouvelAssignment = new Assignment();
        nouvelAssignment.nom = a.nom;
        nouvelAssignment.id = a.id;
        nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
        nouvelAssignment.rendu = a.rendu;
   
        this.addAssignment(nouvelAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }
  getAssignmentPagine(page:number,limit:number): Observable<any>{
    return this.http.get<any>(this.backenURL + '?page=' + page + '&limit=' + limit);
  }
   
}
