import {Result} from "~/types";


export const safeTry = async <T>(promise: Promise<T>) : Promise<Result<T , Error>>    => {

    try {
        const data = await promise

        return [ true , data , "" ]
    }catch (e) {
        return [ false, e as any , (e as any).message ]
    }
}