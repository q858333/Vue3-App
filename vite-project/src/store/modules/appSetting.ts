import { defineStore } from 'pinia'

const useAppSetting = defineStore('appSetting',{
    state: () => {
        return {
            isExtend:false,
        }

    },
})

export default useAppSetting;