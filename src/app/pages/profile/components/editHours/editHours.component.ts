import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'edit-hours',
  template: require('./editHours.component.html'),
  styles: [require('./editHours.component.css')]
})

// DISPLAYS THE TIME RANGE SELECTOR FOR A PARTICULAR DAY
export class EditHours {
  @Input()
  dayOfWeek: string;

  @Input()
  timeRanges: any;

  // One time chunk gets one label
  private timeChunks = _.range(6); 
  private halfHoursPerChunk = _.range(48 / this.timeChunks.length);

  // TIME BAR CODE
  // Numbers start from 0, and are incremented for every half hour
  mouseDown: boolean = false;
  rangeMin: number;
  rangeMax: number;
  currentHalfHourHover: number = -1; // Used to display the time range,
                                     // that the cursor is hovering over


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

  // Clear the time range
  clearClicked() {
    this.timeRanges.splice(0, this.timeRanges.length); 
  }

  // DELETE RANGE FUNCTIONS
  // Splits a single range into two depending on a delection
  private splitRange(i: number){
    let rangeStart = this.timeRanges[i][0];
    let rangeEnd = this.timeRanges[i][1];
    if (this.rangeMin - rangeStart >= 1)
      this.timeRanges.push([rangeStart, this.rangeMin - 1]);
    if (rangeEnd - this.rangeMax >= 1)
      this.timeRanges.push([this.rangeMax + 1, rangeEnd]);
    this.timeRanges.splice(i, 1); // DELETION
  }

  // Check if the cursor marked an area inside a range, which
  // therefore now needs to be split into two smaller rnages.
  private checkForDeletion() {
    for (var i = 0; i < this.timeRanges.length; i++){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart <= this.rangeMin && rangeEnd >= this.rangeMax){
        this.splitRange(i);        
        return false; // Do not add new range if deletion occured
      }
    }
    return true;
  }

  // ADD RANGE FUNCTIONS
  // Find the new range's starting point 
  // (rangeMin is dependent on only where the cursor stops,
  // but the actual new range to be considered may start earlier)
  private findNewRangeStart() {
    for (var i = 0; i < this.timeRanges.length; i++){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart < this.rangeMin && rangeEnd >= this.rangeMax - 1) // because of merging
        return rangeStart;
    }
    return this.rangeMin;
  }

  // Find the new range's ending point
  // (rangeMax is dependent on only where the cursor stops, but the actual
  // new range to be considered may end later)
  private findNewRangeEnd() {
    for (var i = this.timeRanges.length - 1; i >= 0; i--){
      let rangeStart = this.timeRanges[i][0];
      let rangeEnd = this.timeRanges[i][1];
      if (rangeStart <= this.rangeMax + 1 && rangeEnd > this.rangeMax)
        return rangeEnd;
    }
    return this.rangeMax;
  }

  // Check if the bigRange "engulfs" the smallrange
  private isSubrange(smallRange: any, bigRange: any){
     return bigRange[0] <= smallRange[0] && bigRange[1] >= smallRange[1];
  }

  // Sorts time ranges by the start time (thereby allowing easy overlap detection)
  private compareFn(x, y){
    if (x[0] < y[0]) return -1;
    else return 1;
  }

  // Add the time range to this.timeRanges
  private addRange() {
    var rangeToAdd = [this.findNewRangeStart(), this.findNewRangeEnd()];

    // If one subrange is completely encompassed by another, remove it
    for (var i = this.timeRanges.length - 1; i >= 0; i--){
      if (this.isSubrange(this.timeRanges[i], rangeToAdd))
        this.timeRanges.splice(i, 1); 
    }

    this.timeRanges.push(rangeToAdd);
    this.timeRanges.sort(this.compareFn);
  }

  // CONVERSION FUNCTIONS 
  // Converts a number to its corresponding time string
  private timeToString(halfHour: number){
    if (halfHour % 2 == 1)
      return (Math.floor(halfHour / 2)).toString() + ":30";
    else
      return (halfHour / 2).toString() + ":00";
  }

  // Converts a time range to a string
  private getTimeString(i: number){
    return this.timeToString(this.timeRanges[i][0]) + " to " + this.timeToString(this.timeRanges[i][1] + 1);
  }

  // Creates the benchmark labels that sit on top of the strip
  getTimeLabel(timeChunk: number){
    let displayHour = (timeChunk * this.halfHoursPerChunk.length) / 2;
    if (displayHour < 10)
      return displayHour + ":00";
    return displayHour + ":00";
  }

  // Gets the time label for the time range that the cursor is currently hovering over
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

  // Event listeners: rangeMin and rangeMax will define the new range
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

  isHighlighted(halfHour: number){
    // Highlight the range that is currently be created
    if (this.mouseDown && this.inRange(halfHour, this.rangeMin, this.rangeMax)){
      return true;
    } 

    // Highlight the exiting ranges
    for (var i = 0; i < this.timeRanges.length; i++){
      if(this.inRange(halfHour, this.timeRanges[i][0], this.timeRanges[i][1])){
        return true;
      }
    }
    return false;
  } 

  // STYLING OF THE TIME RANGE STRIP
  getBorderStyle(halfHour: number){
    if (halfHour % 2 == 0)
      return '1px 0px 1px 1px';
    return '1px 1px 1px 0px';
  }

    // HELPER FUNCTION
  // printTimeRanges(){
  //   for (var i = 0; i < this.timeRanges.length; i++)
  //     console.log(this.timeRanges[i][0] + "  " + this.timeRanges[i][1]);
  //   console.log("------------------");
  // }

}










