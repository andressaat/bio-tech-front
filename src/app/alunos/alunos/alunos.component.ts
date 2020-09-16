import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[] = [];
  displayedColumns: string[] = ['id', 'nome', 'actions'];

  constructor(
    private service: AlunosService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.alunos = results;
    });
  }

  onAdd(): void {
    this.router.navigate(['create'],{relativeTo:this.route});
  }

  onEdit(product: Aluno): void {
    console.log(product);
  }

  onRemove(product: Aluno): void {
    console.log(product);
  }

}
