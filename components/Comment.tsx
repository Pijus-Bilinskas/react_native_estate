import { Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Models } from 'react-native-appwrite';
import icons from '@/constants/icons';

interface Props {
    item: Models.Document;
}

const Comment = ({ item }: Props) => {
    return(
        <View className='flex flex-col items-start'>
            <View className='flex flex-row items-center'>
                <Image source={{ uri: item.avatar }} className='siez-14 rounded-full' />
                <Text className='text-base text-black-300 text-start font-rubik-bold ml-3'>
                    {item.name}
                </Text>
            </View>

            <View className='text-black-200 text-base font-rubik mt-2'>
                <Text className='font-rubik text-base text-black-200'>
                {item.review}
                </Text>
            </View>

            <View className='flex flex-row items-center w-full justify-between mt-4'>
                <View className='flex flex-row items-center'>
                    <Image source={icons.heart} className='size-5' tintColor={"#0061FF"} />
                    <Text className='text-black-300 text-sm font-rubik-medium ml-2'>120</Text>
                </View>
                <Text className='text-black-100 text-sm font-rubik'>
                    {new Date(item.$createdAt).toDateString()}
                </Text>
            </View>
        </View>
    )
}

export default Comment;