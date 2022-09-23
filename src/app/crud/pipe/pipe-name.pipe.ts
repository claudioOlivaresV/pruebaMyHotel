import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeName'
})
export class PipeNamePipe implements PipeTransform {

  transform(programmer: any,): string {
    return programmer.name + ' ' + programmer.lastName;
  }

}
