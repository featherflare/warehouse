/*
This function is to separate rack location number 
into a row, floor of rack, shelf and this is 
sum row and shelf together.

Then return array object.

----- data variable -----
Recieve the data of Location in type of String(10).

destination --> destination of pallet to pick up or put-away.
current --> user location now.

Updated 06-04-2021
*/

const CalcRackLocation = (destination, current) => {
    if (destination) {
        var row = destination.slice(0, 6);
        var floorRack = destination.slice(6, 8);
        var shelf = destination.slice(8, 10);
        var rackLocation = `${row}-${shelf}`;
    }
    
    if (current) {
        const currentLocation = `${current.slice(0, 6)}-${current.slice(8, 10)}`;
        const currentFloorRack = current.slice(6, 8);
        const rack = [
            {
                row: row,
                floorRack: floorRack,
                shelf: shelf,
                rackLocation: rackLocation,
                curLocation: currentLocation,
                curFloorRack: currentFloorRack
            }
        ]
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