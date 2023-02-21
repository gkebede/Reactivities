import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { Result } from "../models/result";
import { store } from "../stores/store";
import { router } from "./router/Routes";

 
function sleep(delay: number) {
    return new Promise((resolve) => {

        setTimeout(resolve, delay)
    })
}



axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {

    await sleep(1000);

    return response;

}, ( error: AxiosError ) => {

    //to make the data obj availabel in response  error.response
             // OR
    // USE error.response as AxiosResponse TO GET THE EXACT LOCATION OF THE data obj from the orign         
    const {data, status, config} =  error.response as AxiosResponse

    switch (status) {
        case 400: 
        if(config.method === 'get' && data.errors.hasOwnProperty){
            router.navigate('/not-found')
        }
        if(data.errors){
        const modalStateError = [];

        for(const key in data.errors){
           modalStateError.push(data.errors[key]);
        }

        throw modalStateError.flat();
    
    }else {
        toast.error(data);
    }
        break;
        case 401: 
        toast.error('unauthorised');
        break;
        case 403: 
        toast.error('forbidden');
        break;
        case 404: 
        router.navigate('/not-found');
        break;
        case 500: 
        store.commonStore.setServerError(data);
        router.navigate('/server-error');
        break;
    }  

    return Promise.reject(error);
})


const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Activities = {

    list: () => requests.get<Result>(`/activities`),
    //list: () => requests.get<Activity[]>(`/activities`),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<Result>(`/activities/`, activity),
    update: (activity: Activity) => requests.put<Activity>(`/activities/${activity.id}`, activity ),
    delete: (id: string) => requests.delete<Activity>(`/activities/${id}`),
    
}

const agent = {

    Activities

}

export default agent;


