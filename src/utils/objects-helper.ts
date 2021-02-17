import {UserType} from "../api/api";

const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
    obj[key];

type ObjectType = UserType;

type ObjPropType = keyof ObjectType;

export const updateObjectInArray = (items: ObjectType[], objProp: ObjPropType, itemId: any, newObjectProps: Object) => {
    return items.map(item => {
            const value = getKeyValue<ObjectType, keyof ObjectType>(objProp)(item);

            return value === itemId ?
                {...item, ...newObjectProps} :
                item
        }
    )
}