import { defineStore } from 'pinia'

const useAppSetting = defineStore('appSetting',{
    state: () => {
        return {
            isFold:false,
            refresh:false
        }

    },
})

export default useAppSetting;