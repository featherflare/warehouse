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

destination --> destination of pallet to pick up or put-away.
current --> user location now.

@ OUTPUT
A-02: rackLocation
B-01: curLocation

Updated 15-04-2021
*/

const CalcRackLocation = (destination, current) => {
    if (destination) {
        var row = destination.slice(0, 1);
        var floorRack = destination.slice(1, 3);
        var shelf = destination.slice(3, 5);
        var rackLocation = `${row}-${shelf}`;
    }
    
    if (current) {
        const currentLocation = `${current.slice(0, 1)}-${current.slice(3, 5)}`;
        const currentFloorRack = current.slice(1, 3);
        const rack = [
            {
                row: row,
                floorRack: floorRack,
                shelf: shelf,
                rackLocation: rackLocation,
                curLocation: currentLocation,
                curFloorRack: currentFloorRack
            }
        ];
        return rack;
    } else {
        const rack = [
            {
                row: row,
                floorRack: floorRack,
                shelf: shelf,
                rackLocation: rackLocation,
            }
        ]
        return rack;
    }
}

export default CalcRackLocation;