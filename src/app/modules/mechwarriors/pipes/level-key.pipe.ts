import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelKey'
})
export class LevelKeyPipe implements PipeTransform {
  transform(maxLevel = 10): string[] {
    const result = [];
    for (let i = 0; i < maxLevel; i++) {
      result.push(`Level ${i + 1}`);
    }
    return result;
  }
}
