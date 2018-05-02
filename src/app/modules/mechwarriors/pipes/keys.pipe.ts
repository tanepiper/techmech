import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysOf'
})
export class KeysOfPipe implements PipeTransform {
  transform(keyObject: object = {}): string[] {
    return Object.keys(keyObject || {});
  }
}
