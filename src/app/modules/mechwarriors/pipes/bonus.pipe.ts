import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bonusText'
})
export class BonusTextPipe implements PipeTransform {
  transform(bonus: string | number, description: string): string {
    if (typeof bonus === 'string' || (typeof bonus === 'number' && bonus > 0)) {
      return description.replace('[bonus]', `${bonus}`);
    }
    return '';
  }
}
