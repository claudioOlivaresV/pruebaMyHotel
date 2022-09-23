import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  data: any = [
    {
      id: 1,
      name: 'Claudio',
      lastName: 'Olivares',
      admissionDate: '09-23-22, 12:00 AM',
      country: 'Chile',
      skills: [
        'JavaScrip',
        'CSS',
        'HTML'
      ]

    },
    {
      id: 2,
      name: 'Kevin',
      lastName: 'Figueroa',
      admissionDate: '02-01-22, 11:00 AM',
      country: 'Chile',
      skills: [
        'PHP',
        'Java'
      ]

    },
    {
      id: 3,
      name: 'Camilo',
      lastName: 'Contreras',
      admissionDate: '10-14-20, 12:00 AM',
      country: 'Chile',
      skills: [
        'Node',
        'Java'
      ]

    },
  ];
  private programmer = new BehaviorSubject<any[]>(this.data);

  public customMessage = this.programmer;
  constructor() { }

  public remove(id: number): void {
    const position = this.data.map((programmer: any) => programmer.id).indexOf(id);
    this.data.splice(position, 1)
  }
  public edit(programmer: any): void {
    const position = this.data.map((programmer: any) => programmer.id).indexOf(programmer.id);
    this.data[position] = programmer;
    
  }

  public add(progammer: any): void {
    this.data.push(progammer);
  }
}
