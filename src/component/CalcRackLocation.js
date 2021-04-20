/*
This function is to separate rack location number 
into a row, floor of rack, shelf and this is 
sum row and shelf together.

Then return array object.

----- data variable -----
Recieve the data of Location in type of String(5).

@ INPUT
A0102:
A - row
01 - floorRack
02 - column

destinationA --> destinationA of pallet to pick up or put-away.
current --> user location now.

@ OUTPUT
A-02: rackLocation
B-01: curLocation

Updated 15-04-2021
*/

const CalcRackLocation = (destinationA, current, destinationB) => {
    var rack = [
        {
            row: null,
            floorRack: null,
            shelf: null,
            rackLocation: null,
        }
    ]

    if (destinationA) {
        var rowA = destinationA.slice(0, 1);
        var floorRackA = destinationA.slice(1, 3);
        var shelfA = destinationA.slice(3, 5);
        var rackLocationA = `${rowA}-${shelfA}`;
    } 
    
    if (destinationB) {
        var rowB = destinationB.slice(0, 1);
        var floorRackB = destinationB.slice(1, 3);
        var shelfB = destinationB.slice(3, 5);
        var rackLocationB = `${rowB}-${shelfB}`;
    }

    if (current) {
        var currentLocation = `${current.slice(0, 1)}-${current.slice(3, 5)}`;
        var currentFloorRack = current.slice(1, 3);
    }

    if (destinationA && destinationB && current) {
        rack = [
            {
                rowA: rowA,
                floorRackA: floorRackA,
                shelfA: shelfA,
                rackLocationA: rackLocationA,
                rowB: rowB,
                floorRackB: floorRackB,
                shelfB: shelfB,
                rackLocationB: rackLocationB,
                curLocation: currentLocation,
                curFloorRack: currentFloorRack
            }
        ];
    } else if (destinationA && current) {
        rack = [
            {
                row: rowA,
                floorRack: floorRackA,
                shelf: shelfA,
                rackLocation: rackLocationA,
                curLocation: currentLocation,
                curFloorRack: currentFloorRack
            }
        ];
    } else if (destinationA && destinationB) {
        rack = [
            {
                rowA: rowA,
                floorRackA: floorRackA,
                shelfA: shelfA,
                rackLocationA: rackLocationA,
                rowB: rowB,
                floorRackB: floorRackB,
                shelfB: shelfB,
                rackLocationB: rackLocationB,
            }
        ];
    } else if (destinationA && !current && !destinationB) {
        rack = [
            {
                row: rowA,
                floorRack: floorRackA,
                shelf: shelfA,
                rackLocation: rackLocationA,
            }
        ];
    }
    return rack;
}

export default CalcRackLocation;