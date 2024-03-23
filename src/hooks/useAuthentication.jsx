import {db} from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError("")

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            var systemErrorMessage;

            if(error.message.includes("Password")) {
                systemErrorMessage = "Password must have at least six characters"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already in use"
            } else {
                systemErrorMessage = "Some error occurred"
            }
        }
        setError(systemErrorMessage)
        setLoading(false)
    }

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    const login = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        let systemErrorMessage;

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found"
            } else if(error.message.includes("wrong-password")) {
                systemErrorMessage = "Wrong password"
            } else {
                systemErrorMessage = "Something went wrong"
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return() => setCancelled(true)
    },[])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}