import { Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'edit-hours',
  template: require('./editHours.component.html'),
  styles: [require('./editHours.component.css')]
})

export class EditHours {
  @Input()
  dayOfWeek: string;

  hoursInADay: number[] = _.range(24);

// TIME BAR CODE
  mouseDown: boolean = false;
  timeRanges: any = [];
  rangeMin: number;
  rangeMax: number;

  currentHourHover: number = null;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseUp(event) {
    this.mouseDown = false;
    this.addRange();
  }

    // HELPER FUNCTION
  // printTimeRanges(){
  //   for (var i = 0; i < this.timeRanges.length; i++)
  //     console.log(this.timeRanges[i][0] + "  " this.timeRanges[i][1]);
  //   console.log("------------------");
  // }

 private compareFn(x, y){
   if (x[0] < y[0]) return -1;
   else return 1;
 }

  private findNewRangeStart() {
    for (var i = 0; i < this.timeRanges.length; i++){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart < this.rangeMin && rangeEnd >= this.rangeMax - 1) // because of merging
        return rangeStart;
    }
    return this.rangeMin;
  }

  private findNewRangeEnd() {
    for (var i = this.timeRanges.length - 1; i >= 0; i--){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart <= this.rangeMax + 1 && rangeEnd > this.rangeMax)
        return rangeEnd;
    }
    return this.rangeMax;
  }

  private isSubrange(smallRange: any, bigRange: any){
     return bigRange[0] <= smallRange[0] && bigRange[1] >= smallRange[1];
  }

  private addRange() {

    var rangeToAdd = [this.findNewRangeStart(), this.findNewRangeEnd()];

    for (var i = this.timeRanges.length - 1; i >= 0; i--){
      if (this.isSubrange(this.timeRanges[i], rangeToAdd))
        this.timeRanges.splice(i, 1); // remove extraneous
    }

    this.timeRanges.push(rangeToAdd);
    this.timeRanges.sort(this.compareFn);
  }

  private getTimeString(i: number){
    return this.timeRanges[i][0].toString() + " to " + (this.timeRanges[i][1] + 1).toString();
  }

  getTime() {
    if (this.currentHourHover){
      for (var i = 0; i < this.timeRanges.length; i++){
        if (this.currentHourHover >= this.timeRanges[i][0] &&   
          this.currentHourHover <= this.timeRanges[i][1])
          return this.getTimeString(i);
      }
    }
    return "";
  }


  over(hour: number) {
    this.currentHourHover = hour;
    if (this.mouseDown) {
      if (hour < this.rangeMin)
        this.rangeMin = hour;
      if (hour > this.rangeMax)
        this.rangeMax = hour;
    }else {
      this.rangeMin = hour;
      this.rangeMax = hour;
    } 
  }

  leave(hour: number){
    this.currentHourHover = null;
  }

  private inRange(test: number, min: number, max: number){
    return (test >= min && test <= max);
  }

  isHighlighted(hour: number) {
    if (this.mouseDown && this.inRange(hour, this.rangeMin, this.rangeMax)){
      return true;
    } 

    for (var i = 0; i < this.timeRanges.length; i++){
      if(this.inRange(hour, this.timeRanges[i][0], this.timeRanges[i][1])){
        return true;
      }
    }
    return false;
  }  

}










