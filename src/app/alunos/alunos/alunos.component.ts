import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'actions'];
  dataSource: MatTableDataSource<Aluno>;

  constructor(
    private service: AlunosService,
    private route:ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService,
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.alunos = results;
      this.dataSource = new MatTableDataSource(this.alunos)
    });
  }

  onAdd(): void {
    this.router.navigate(['create'], { queryParams:{ returnUrl: this.router.url }, relativeTo: this.route});
  }

  onEdit(aluno: Aluno): void {
    this.router.navigate(['edit', aluno.id], { queryParams:{ returnUrl: this.router.url }, relativeTo: this.route});
  }

  onRemove(aluno: Aluno): void {
    this.alunosService.delete(aluno.id).subscribe((deletar)=>{
      const index = this.alunos.indexOf(aluno);
      this.alunos.splice(index,1);
      console.log(this.alunos, aluno)
      this.dataSource.data = this.alunos;
    });
  }

}
