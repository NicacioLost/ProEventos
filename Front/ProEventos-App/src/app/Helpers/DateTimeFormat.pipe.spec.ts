import { DateTimeFormatPipe } from './../helpers/DateTimeFormat.pipe';

describe('Pipe: DateTimeFormat', () => {
  it('create an instance', () => {
    const pipe = new DateTimeFormatPipe('pt-br');
    expect(pipe).toBeTruthy();
  });
});
