import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  listProjects = null;
  proyec = {
    projectname: null,
    projectdescription: null,
    projectstatus: true,
  };

  constructor(private projectservice: ProjectService) { }

  ngOnInit(): void {
  }

  alta(){
    console.log(this.proyec);
    this.projectservice.insert(this.proyec).subscribe(data => {

    })
  }

  recuperarTodos()
  {
    this.projectservice.getdata().subscribe(result => {
      this.listProjects = result;
      console.log(this.listProjects);      
    });    
  }

}
