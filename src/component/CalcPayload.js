/*
This function is calculate payload from server.
change variable of payload when mode 1 stage 3.

Updated - 08/03/64 - Aum
*/

const CalcPayload = (dataFromServer) => {
    let payload = [];

    // mode 0 select mode
    if (dataFromServer.mode === 0) {
        payload = [dataFromServer];
    } else if (dataFromServer.mode === 1) { // mode 1
        // only have stage 3
        if (dataFromServer.stage === 3) {
            const [{ item_number, item_name }] = dataFromServer.data;
            payload = [
                {
                    mode: dataFromServer.mode,
                    stage: dataFromServer.stage,
                    is_notify: dataFromServer.is_notify,
                    status: dataFromServer.status,
                    error_type: dataFromServer.error_type,
                    item_name: item_name,
                    item_number: item_number
                }
            ];
        } else {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 2) { // mode 2: Put-away mode
        if (dataFromServer.stage === 0) {
            const [{ location, item_number, item_name }] = dataFromServer.data;
            payload = [
                {
                    mode: dataFromServer.mode,
                    stage: dataFromServer.stage,
                    is_notify: dataFromServer.is_notify,
                    status: dataFromServer.status,
                    item_number: item_number,
                    item_name: item_name,
                    location: location
                }
            ];
        } else if (dataFromServer.stage === 1) {
            payload = [dataFromServer];
        } else if (dataFromServer.stage === 2) {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 3) {
        if (dataFromServer.stage === 0) {
            const [{ order_number, pickup_id, pickup_type, item_name, location }] = dataFromServer.data;
            if (pickup_type === 'FULL') {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: order_number,
                        pickup_id: pickup_id,
                        pickup_type: pickup_type,
                        item_name: item_name,
                        location: location
                    }
                ];
            } else if (pickup_type === 'SHOPPING') {
                const [{ amount }] = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: order_number,
                        pickup_id: pickup_id,
                        pickup_type: pickup_type,
                        item_name: item_name,
                        location: location,
                        amount: amount
                    }
                ];
            }
        } else if (dataFromServer.stage === 4) {
            const [{ order_number, pickup_id, pickup_type, item_name, location }] = dataFromServer.data;
            if (pickup_type === 'FULL') {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: order_number,
                        pickup_id: pickup_id,
                        pickup_type: pickup_type,
                        item_name: item_name,
                        location: location
                    }
                ];
            } else if (pickup_type === 'SHOPPING') {
                const [{ amount }] = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: order_number,
                        pickup_id: pickup_id,
                        pickup_type: pickup_type,
                        item_name: item_name,
                        location: location,
                        amount: amount
                    }
                ];
            }
        } else {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 4) {

    } else if (dataFromServer.mode === 5) {

    }

    return payload;
} 

export default CalcPayload;