import { createContext, useContext } from "react";
import { ActivityStore } from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {

    activityStore : ActivityStore;
    commonStore : CommonStore;
    userStore : UserStore;
    modalStore: ModalStore;
}


export const store : Store = {
   

    activityStore : new ActivityStore(),
    commonStore : new CommonStore(),
    userStore :  new UserStore(),
    modalStore: new ModalStore(),

}

// the following code is how to instantiate the store and use it in react Context

export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext);
}

