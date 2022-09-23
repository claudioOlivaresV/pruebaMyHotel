import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Countries } from 'src/app/shared/interfaces/interfaces';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  countries: Countries[] = [
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Perú', viewValue: 'Perú' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
  ];
  form: FormBuilder | any;
  language: string = '';
  skills: string [] = [];

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private services: ServicesService
  ) {
    let form = this.formBuilder.group({
      name: [this.data.programmer ? this.data.programmer.name : '', Validators.required],
      lastName: [this.data.programmer ? this.data.programmer.lastName : '', Validators.required],
      admissionDate: [this.data.programmer ? new Date(this.data.programmer.admissionDate) : '', Validators.required],
      country: [this.data.programmer ? this.data.programmer.country : '', Validators.required]
    })
    this.form = form;
  }

  ngOnInit(): void {
    console.log(this.data);
    if(!this.data.add) {
      this.skills = this.data.programmer.skills;
    }
  }
  add() {
    if (this.language.length) {
      if (this.data.add) {
        this.skills.push(this.language)
      } else {
        this.data.programmer.skills.push(this.language)
      }
      this.language = '';
    } else {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.open('Ingrese un témino', 'Ok', {
      duration: 1500
    });
  }

  save() {
    let date = moment(this.form.controls.admissionDate.value).format('MM-DD-YY, LT');
    console.log(date);
    const programmer = {
      id: this.data.add ? (this.data.total + 1) : this.data.programmer.id,
      name: this.form.controls.name.value,
      lastName: this.form.controls.lastName.value,
      admissionDate: date,
      country: this.form.controls.country.value,
      skills: this.skills
    }
    if (this.data.add) {
      this.services.add(programmer);
    } else {
      this.services.edit(programmer)
    }

  }
  removeSkill(isAdd: boolean, skill: string) {
    if (isAdd) {
      const position = this.skills.indexOf(skill);
      this.skills.splice(position, 1)
    } else {
      const position = this.data.programmer.skills.indexOf(skill);
      this.data.programmer.skills.splice(position, 1)
    }
  }


}
