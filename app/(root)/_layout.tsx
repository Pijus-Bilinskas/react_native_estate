import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLAyout() {
    const {loading, isLogged} = useGlobalContext();

    if(loading){
        return(
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                    <ActivityIndicator className="text-primary-100" size="large"/>
            </SafeAreaView>
        )
    }

    if(!isLogged) return <Redirect href="/sign-in" />

    return <Slot />
}