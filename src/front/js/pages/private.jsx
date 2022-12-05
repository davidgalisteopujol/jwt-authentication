import React, {useContext} from "react";
import {Context } from "../store/appContext"

const Private = () => {
  
    const {store, actions} = useContext(Context)
    
    return (
        <div>
            {(store.token && store.token != "" && store.token !=undefined) ? 
            <h1 className="text-center">You are logged!!</h1> 
            :
            (<h2 className="text-center">You can't see this beacuse you are not logged in.Please login</h2>
            )}
        </div>
    )
}

export default Private;