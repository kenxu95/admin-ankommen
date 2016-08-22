import { Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'edit-hours',
  template: require('./editHours.component.html'),
  styles: [require('./editHours.component.css')]
})

export class EditHours {
  @Input()
  dayOfWeek: string;

  halfHoursInADay: number[] = _.range(24 * 2);

// TIME BAR CODE
  mouseDown: boolean = false;
  timeRanges: any = [];
  rangeMin: number;
  rangeMax: number;

  currentHalfHourHover: number = -1;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseUp(event) {
    this.mouseDown = false;
    if (this.checkForDeletion()){
      this.addRange();
    }
  }

  private splitRange(i: number){
    let rangeStart = this.timeRanges[i][0];
    let rangeEnd = this.timeRanges[i][1];
    if (this.rangeMin - rangeStart >= 1)
      this.timeRanges.push([rangeStart, this.rangeMin - 1]);
    if (rangeEnd - this.rangeMax >= 1)
      this.timeRanges.push([this.rangeMax + 1, rangeEnd]);
    this.timeRanges.splice(i, 1); // DELETION
  }

  private checkForDeletion() {
    for (var i = 0; i < this.timeRanges.length; i++){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart <= this.rangeMin && rangeEnd >= this.rangeMax){
        this.splitRange(i);        
        return false;
      }
    }
    return true;
  }
    // HELPER FUNCTION
  // printTimeRanges(){
  //   for (var i = 0; i < this.timeRanges.length; i++)
  //     console.log(this.timeRanges[i][0] + "  " + this.timeRanges[i][1]);
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

  private timeToString(halfHour: number){
    if (halfHour % 2 == 1)
      return (Math.floor(halfHour / 2)).toString() + ":30";
    else
      return (halfHour / 2).toString() + ":00";
  }

  private getTimeString(i: number){
    return this.timeToString(this.timeRanges[i][0]) + " to " + this.timeToString(this.timeRanges[i][1] + 1);
  }

  getTime() {
    if (this.currentHalfHourHover >= 0){
      for (var i = 0; i < this.timeRanges.length; i++){
        if (this.currentHalfHourHover >= this.timeRanges[i][0] &&   
          this.currentHalfHourHover <= this.timeRanges[i][1])
          return this.getTimeString(i);
      }
    }
    return "";
  }

  over(halfHour: number) {
    this.currentHalfHourHover = halfHour;
    if (this.mouseDown) {
      if (halfHour < this.rangeMin)
        this.rangeMin = halfHour;
      if (halfHour > this.rangeMax)
        this.rangeMax = halfHour;
    }else {
      this.rangeMin = halfHour;
      this.rangeMax = halfHour;
    } 
  }

  leave(halfHour: number){
    this.currentHalfHourHover = -1;
  }


  private inRange(test: number, min: number, max: number){
    return (test >= min && test <= max);
  }

  isHighlighted(halfHour: number) {
    if (this.mouseDown && this.inRange(halfHour, this.rangeMin, this.rangeMax)){
      return true;
    } 

    for (var i = 0; i < this.timeRanges.length; i++){
      if(this.inRange(halfHour, this.timeRanges[i][0], this.timeRanges[i][1])){
        return true;
      }
    }
    return false;
  } 

  getBorderStyle(halfHour: number){
    if (halfHour % 2 == 0)
      return '1px 0px 1px 1px';
    return '1px 1px 1px 0px';
  }



}










