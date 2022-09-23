import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/shared/interfaces/interfaces';
import { AddComponent } from '../add/add.component';
import { RemoveComponent } from '../remove/remove.component';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  programmers = [];
  filterProgramer: any = [];
  value = '';

  status: Status = {
    loading: false,
    error: false
  }
  sortShow = true;



  constructor(
    public dialog: MatDialog,
    private services: ServicesService,
    private _snackBar: MatSnackBar,
  ) {
    this.filterProgramer = this.programmers;
  }

  ngOnInit(): void {
    this.services.customMessage.subscribe((programmers: any) => {
      this.programmers = programmers;
      this.filterProgramer = programmers;
    });

    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
    }, 1500);
  }
  openRemove(programmer: any) {
    const dialogRef = this.dialog.open(RemoveComponent, {
      data: programmer.name
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.remove(programmer.id);
        this.status.loading = true;
        setTimeout(() => {
          this.status.loading = false;
          this.openSnackBar(programmer.name, 'eliminado')
        }, 1500);
      }
    });
  }
  openAddEdit(type: boolean, programmer: any | null, total?: number) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '80%',
      data: { add: type, programmer, total },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.status.loading = true;
        setTimeout(() => {
          this.status.loading = false;
          this.openSnackBar(type ? 'Programador' : programmer.name, type ? 'agregado' : 'editado')
        }, 1500);
      }
    });
    
  }
  applyFilter() {
    this.filterProgramer = this.programmers.filter((programmer: any) => programmer.name.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()));
  }
  remove(id: number) {
    this.services.remove(id);
  }
  openSnackBar(name: string, acction: string) {
    this._snackBar.open( name +' fue '+ acction+'!', 'Ok', {
      duration: 2500
    });
  }
  sort() {
    if(!this.sortShow)
    {
      this.filterProgramer = this.filterProgramer.sort((a:any, b:any) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.filterProgramer = this.filterProgramer.sort((a:any, b:any) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase();
        if (nameB < nameA) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;
        }
        return 0;
      });

    }
    this.sortShow = !this.sortShow;
  }


}
