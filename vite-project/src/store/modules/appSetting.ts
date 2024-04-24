import { defineStore } from 'pinia'

const useAppSetting = defineStore('appSetting',{
    state: () => {
        return {
            isFold:false,
        }

    },
})

export default useAppSetting;