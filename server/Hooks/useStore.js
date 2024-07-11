import { create } from 'zustand'
const userModel = require('../models/Users');

const useStore = create((set) => ({
    user :"",
    userName : "",
    actions: {
        setUser: (user) => set({ user }),
        setUserName: (userName) => set({ userName }),
    }
}))