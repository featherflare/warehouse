/*
This function is calculate payload from server.
change variable of payload when mode 1 stage 3.

Updated - 08/03/64 - Aum
*/

const CalcPayload = (dataFromServer) => {
    let payload = [];

    if (dataFromServer.mode === 0) { // select mode page
        payload = [dataFromServer];
    } else if (dataFromServer.mode === 2) { // mode 2: Put-away mode
        if (dataFromServer.stage === 1) {
            if (dataFromServer.error_type === null || dataFromServer.error_type === 'ALREADY') {
                const { item_name, item_number, location } = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        error_type: dataFromServer.error_type,
                        item_number: item_number,
                        item_name: item_name,
                        location: location
                    }
                ];
            } else if (['UNVERIFY', 'NOT EXIST', 'NO ITEM'].includes(dataFromServer.error_type)) {
                const { item_number } = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        error_type: dataFromServer.error_type,
                        item_number: item_number,
                        item_name: null,
                        location: null
                    }
                ];
            } else if (['AMOUNT', 'NO LOCATION'].includes(dataFromServer.error_type)) {
                const { item_name, item_number } = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        error_type: dataFromServer.error_type,
                        item_number: item_number,
                        item_name: item_name,
                        location: null
                    }
                ];
            }
        } else {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 3) { // pick up mode
        if (dataFromServer.stage === 0) {
            if (dataFromServer.data.length !== 0) {
                const [{ order_number, pickup_id, pickup_type, item_name, location }] = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        hardware_status: dataFromServer.hardware_status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: order_number,
                        pickup_id: pickup_id,
                        pickup_type: pickup_type,
                        item_name: item_name,
                        location: location
                    }
                ];
            } else {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        hardware_status: dataFromServer.hardware_status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: null,
                        pickup_id: null,
                        pickup_type: null,
                        item_name: null,
                        location: null
                    }
                ];
            }
        } else if (dataFromServer.stage === 4) {
            if (dataFromServer.data.length !== 0) {
                const [{ order_number, pickup_id, pickup_type, item_name, location }] = dataFromServer.data;
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
            } else {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        total_pickup: dataFromServer.total_pickup,
                        done_pickup: dataFromServer.done_pickup,
                        order_number: null,
                        pickup_id: null,
                        pickup_type: null,
                        item_name: null,
                        location: null
                    }
                ];
            }
        } else {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 4) { // location transfer mode
        if (dataFromServer.stage === 0) {
            if (dataFromServer.data.length !== 0) {
                const [{ source, destination }] = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        hardware_status: dataFromServer.hardware_status,
                        total_location_transfer: dataFromServer.total_location_transfer,
                        done_location_transfer: dataFromServer.done_location_transfer,
                        source: source,
                        destination: destination
                    }
                ];
            } else {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        hardware_status: dataFromServer.hardware_status,
                        total_location_transfer: dataFromServer.total_location_transfer,
                        done_location_transfer: dataFromServer.done_location_transfer,
                        source: null,
                        destination: null
                    }
                ];
            }
        } else if (dataFromServer.stage === 4 && dataFromServer.status && 
            (dataFromServer.total_location_transfer - dataFromServer.done_location_transfer !== 0)) {
            if (dataFromServer.data.length !== 0) {
                const [{ source, destination }] = dataFromServer.data;
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        current_location: dataFromServer.current_location,
                        total_location_transfer: dataFromServer.total_location_transfer,
                        done_location_transfer: dataFromServer.done_location_transfer,
                        source: source,
                        destination: destination
                    }
            ];
            } else {
                payload = [
                    {
                        mode: dataFromServer.mode,
                        stage: dataFromServer.stage,
                        is_notify: dataFromServer.is_notify,
                        status: dataFromServer.status,
                        hardware_status: dataFromServer.hardware_status,
                        total_location_transfer: dataFromServer.total_location_transfer,
                        done_location_transfer: dataFromServer.done_location_transfer,
                        source: null,
                        destination: null
                    }
                ];
            }
        } else {
            payload = [dataFromServer];
        }
    } else if (dataFromServer.mode === 5) {
        payload = [dataFromServer];
    }

    return payload;
} 

export default CalcPayload;