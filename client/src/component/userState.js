import { atom, useRecoilState, selector } from 'recoil';



export const userState = atom({
    key: 'userState',
    default : null
})

export const getUserState = selector({
    key: 'getUserState',
    get: ({get}) => {
        const user = get(userState);
        return user;
    }
})

