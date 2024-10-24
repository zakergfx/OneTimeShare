import * as Var from "./Var.js"

export async function fetchGet(page) {
    let data = {}
    let headers = {
        'Content-Type': 'application/json',
    }

    const response = await fetch(Var.backendUrl + page, {
        method: "GET",
        headers: headers
    })
    if (response.ok) {
        data = await response.json()
    }
    else {
        try {
            data = (await response.json()).detail
        }
        catch {
            data = "Could not parse response as JSON"
        }
    }

    const msg = { "success": response.ok, "data": data }
    return msg
}

export async function fetchPost(page, data) {

    let headers = {
        'Content-Type': "application/json"
    };

    data = JSON.stringify(data)

    const response = await fetch(Var.backendUrl + page, {
        method: "POST",
        headers: headers,
        body: data
    })

    if (response.ok) {
        data = await response.json()
    }
    else {
        try {
            data = (await response.json()).detail

        }
        catch {
            data = "Could not parse response as JSON"

        }
    }

    if (data.detail) {
        data = data.detail
    }
    const msg = { "success": response.ok, "data": data }

    return msg
}

export async function fetchDelete(page) {

    const response = await fetch(Var.backendUrl + page, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const msg = { "success": response.ok }
    return msg
}
