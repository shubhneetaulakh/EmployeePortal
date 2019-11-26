import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let values = [];
    for (let itr in value) {
      values.push(value[itr]);
    }
    return values;
  }
}