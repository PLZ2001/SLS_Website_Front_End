import {API_STATUS, SERVER_PORT, SERVER_URL} from "../config";

const api_submit_files = async (post_id: string, files: { name: string, url: string, file: File }[], files_order: number[]) => {
    try {
        const form_data = new FormData();
        for (let i = 0; i < files_order.length; i++) {
            form_data.append(files[files_order[i]].name, files[files_order[i]].file);
        }
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_files/' + post_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: form_data
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_user_profile_with_student_id = async (student_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_user_profile_with_student_id/' + student_id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_user_profile = async () => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_user_profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_new_post = async (post_id: string, title: string, content: string, time: number, files: { category: string, name: string, display_name: string }[], category: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_new_post/' + post_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "time": String(time),
                    "files": files,
                    "category": category
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_posts = async (p: number, s: number, search: string, category: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_posts',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "pieces": String(p),
                    "sequence": String(s),
                    "search": search,
                    "category": category
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_sls_members = async () => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_sls_members', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_read_image_files_in_folder = async (folder_category: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/read_image_files_in_folder/' + folder_category, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_login_info = async (student_id: string, password: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_login_info',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"student_id": student_id, "password": password})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_comments_of_comments = async (comment_id: string, p: number, s: number) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_comments_of_comments/' + comment_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"pieces": String(p), "sequence": String(s)})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_comment_with_id = async (comment_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_comment_with_id/' + comment_id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_new_comment = async (is_commenting_on_post: boolean, post_or_comment_id_commented_on: string, comment_id: string, content: string, time: number, files: { category: string, name: string }[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_new_comment/' + comment_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "object_commented_on": is_commenting_on_post ? "post" : "comment",
                    "post_or_comment_id_commented_on": post_or_comment_id_commented_on,
                    "content": content,
                    "time": String(time),
                    "files": files
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_post_with_id = async (post_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_post_with_id/' + post_id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_comments = async (post_id: string, p: number, s: number) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_comments/' + post_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"pieces": String(p), "sequence": String(s)})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_signup_info = async (student_id: string, name: string, password: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_signup_info',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"student_id": student_id, "name": name, "password": password})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_an_action = async (action_category: string, is_acting_on_post: boolean, post_or_comment_id_acted_on: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_an_action',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "action_category": action_category,
                    "object_acted_on": is_acting_on_post ? "post" : "comment",
                    "post_or_comment_id_acted_on": post_or_comment_id_acted_on
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_posts_with_student_id = async (p: number, s: number, student_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_posts_with_student_id/' + student_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"pieces": String(p), "sequence": String(s)})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_favorite_posts_with_student_id = async (p: number, s: number, student_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_favorite_posts_with_student_id/' + student_id,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"pieces": String(p), "sequence": String(s)})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_sls_member_profile = async () => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_sls_member_profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_sls_member_profile_update = async (email: string, phone_number: string, url: string, introduction: string, paper_years: string[], papers: string[][]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_sls_member_profile_update',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "email": email,
                    "phone_number": phone_number,
                    "url": url,
                    "introduction": introduction,
                    "paper_years": paper_years,
                    "papers": papers
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_sls_member_profile_with_student_id = async (student_id: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_sls_member_profile_with_student_id/' + student_id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_sls_member_image = async (files: { name: string, file: File }[], files_order: number[]) => {
    try {
        const form_data = new FormData();
        for (let i = 0; i < files_order.length; i++) {
            form_data.append(files[files_order[i]].name, files[files_order[i]].file);
        }
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_sls_member_image',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: form_data
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_admin_login_info = async (student_id: string, password: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_admin_login_info',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"student_id": student_id, "password": password})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_new_sls_member = async (sls_member_category: string, name: string, student_id: string, description: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_new_sls_member/' + sls_member_category,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"name": name, "student_id": student_id, "description": description})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_admin_profile = async () => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_admin_profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_sls_member_removing = async (sls_member_category: string, student_ids: string[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_sls_member_removing/' + sls_member_category,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"student_ids": student_ids})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_post_removing = async (post_ids: string[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_post_removing',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"post_ids": post_ids})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_comment_removing = async (comment_ids: string[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_comment_removing',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"comment_ids": comment_ids})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_sls_member_moving = async (sls_member_category: string, sls_member_category_target: string, student_ids: string[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_sls_member_moving/' + sls_member_category,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "sls_member_category_target": sls_member_category_target,
                    "student_ids": student_ids
                })
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_photo_removing = async (file_paths: string[]) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_photo_removing',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"file_paths": file_paths})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_images = async (files: { name: string, file: File }[], files_order: number[], folder_category: string) => {
    try {
        const form_data = new FormData();
        for (let i = 0; i < files_order.length; i++) {
            form_data.append(files[files_order[i]].name, files[files_order[i]].file);
        }
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_images/' + folder_category,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: form_data
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_text = async (category: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_text/' + category, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_new_text = async (text: string, time: number, category: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_new_text/' + category,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"text": text, "time": time})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_get_fsmap = async (path: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/get_fsmap',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"path": path})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

const api_submit_change_password_info = async (student_id: string, old_password: string, new_password: string) => {
    try {
        const response = await fetch('http://' + SERVER_URL + ':' + SERVER_PORT + '/submit_change_password_info',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify({"student_id": student_id, "old_password": old_password, "new_password": new_password})
            })
        const result = await response.json()
        if (result.status == "SUCCESS") {
            return {"status": API_STATUS.SUCCESS, "data": result.data};
        } else if (result.status == "FAILURE_WITH_REASONS") {
            return {"status": API_STATUS.FAILURE_WITH_REASONS, "reasons": result.reasons};
        } else {
            return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    } catch (error: any) {
        return {"status": API_STATUS.FAILURE_WITHOUT_REASONS};
    }
}

export {
    api_submit_files,
    api_get_user_profile_with_student_id,
    api_get_user_profile,
    api_submit_new_post,
    api_get_posts,
    api_get_sls_members,
    api_read_image_files_in_folder,
    api_submit_login_info,
    api_get_comments_of_comments,
    api_get_comment_with_id,
    api_submit_new_comment,
    api_get_post_with_id,
    api_get_comments,
    api_submit_signup_info,
    api_submit_an_action,
    api_get_posts_with_student_id,
    api_get_favorite_posts_with_student_id,
    api_get_sls_member_profile,
    api_submit_sls_member_profile_update,
    api_get_sls_member_profile_with_student_id,
    api_submit_sls_member_image,
    api_submit_admin_login_info,
    api_submit_new_sls_member,
    api_get_admin_profile,
    api_submit_sls_member_removing,
    api_submit_post_removing,
    api_submit_comment_removing,
    api_submit_sls_member_moving,
    api_submit_photo_removing,
    api_submit_images,
    api_get_text,
    api_submit_new_text,
    api_get_fsmap,
    api_submit_change_password_info,
}